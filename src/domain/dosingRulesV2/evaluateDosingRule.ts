/**
 * Évaluation déterministe d'une règle de dose V2 (module pur, sans dépendance
 * UI ni IA — voir CLAUDE.md : le moteur de dose doit être déterministe,
 * testable et traçable, et ne jamais inventer de posologie).
 *
 * Principes de résolution des branches (tri-état match / excluded /
 * indeterminate par dimension clinique) :
 * - Une dimension non contrainte par la branche ne participe pas à la
 *   décision (la branche s'applique par défaut sur cette dimension).
 * - Une dimension contrainte mais sans valeur fournie en entrée rend la
 *   branche "indeterminate" sur cette dimension (champ requis manquant).
 * - Les bornes numériques (poids, âges) sont inclusives aux deux extrémités
 *   (voir DoseBranchCondition dans ./types.ts) ; lorsque ceci crée une
 *   collision exacte entre le plafond d'une branche et le plancher d'une
 *   branche sœur sur la même valeur d'entrée (ex. bornes de tranche d'âge
 *   postmenstruel contiguës), la branche ancrée par le plancher (Min) est
 *   préférée — cela reproduit fidèlement la sémantique "< X" / "≥ X" du
 *   texte source sans avoir à coder une distinction inclusif/exclusif par
 *   champ dans le schéma de données.
 * - Entre une branche par défaut (sans condition sur une dimension) et une
 *   branche sœur strictement plus spécifique (qui ajoute une contrainte
 *   satisfaite), la branche la plus spécifique est retenue.
 * - Les branches de rôles 'loading' / 'maintenance' / 'titration' présentes
 *   simultanément (rôles distincts, toutes appliquables) sont traitées comme
 *   les phases successives d'un même traitement, jamais comme des
 *   alternatives concurrentes.
 * - Toute ambiguïté restante (plusieurs branches concurrentes à dosage
 *   différent) ou tout champ manquant nécessaire à la décision aboutit à
 *   `requires_clinical_choice`, jamais à un choix arbitraire.
 */

import { findDosingRuleByDrugName } from './ruleMatcher';
import { explainDosingRule } from './explainDosingRule';
import { normalizeDrugName } from './normalize';
import type {
  DoseAmount,
  DoseBranch,
  DoseBranchCondition,
  DoseBranchRole,
  DosingRuleEvaluationInput,
  DosingRuleEvaluationResult,
  DosingRuleV2,
} from './types';

type DimensionState = 'match' | 'excluded' | 'indeterminate' | 'unconstrained';

interface NumericDimension {
  minKey: keyof DoseBranchCondition;
  maxKey: keyof DoseBranchCondition;
  missingFieldName: string;
  getInputValue: (input: DosingRuleEvaluationInput) => number | undefined;
}

const NUMERIC_DIMENSIONS: NumericDimension[] = [
  { minKey: 'weightMinKg', maxKey: 'weightMaxKg', missingFieldName: 'weightKg', getInputValue: (i) => i.weightKg },
  { minKey: 'ageMinDays', maxKey: 'ageMaxDays', missingFieldName: 'ageDays', getInputValue: (i) => i.ageDays },
  {
    minKey: 'postnatalAgeMinDays',
    maxKey: 'postnatalAgeMaxDays',
    missingFieldName: 'ageDays',
    getInputValue: (i) => i.ageDays,
  },
  {
    minKey: 'gestationalAgeMinWeeks',
    maxKey: 'gestationalAgeMaxWeeks',
    missingFieldName: 'gestationalAgeWeeks',
    getInputValue: (i) => i.gestationalAgeWeeks,
  },
  {
    minKey: 'postMenstrualAgeMinWeeks',
    maxKey: 'postMenstrualAgeMaxWeeks',
    missingFieldName: 'postMenstrualAgeWeeks',
    getInputValue: (i) => i.postMenstrualAgeWeeks,
  },
];

const SEQUENCE_ROLES: DoseBranchRole[] = ['loading', 'maintenance', 'titration'];

function evaluateSetDimension(values: string[] | undefined, inputValue: string | undefined): DimensionState {
  if (!values || values.length === 0) return 'unconstrained';
  if (!inputValue) return 'indeterminate';
  const normalizedInput = normalizeDrugName(inputValue);
  return values.some((v) => normalizeDrugName(v) === normalizedInput) ? 'match' : 'excluded';
}

function evaluateNumericDimension(dim: NumericDimension, condition: DoseBranchCondition, input: DosingRuleEvaluationInput): DimensionState {
  const min = condition[dim.minKey] as number | undefined;
  const max = condition[dim.maxKey] as number | undefined;
  if (min === undefined && max === undefined) return 'unconstrained';
  const value = dim.getInputValue(input);
  if (value === undefined) return 'indeterminate';
  if (min !== undefined && value < min) return 'excluded';
  if (max !== undefined && value > max) return 'excluded';
  return 'match';
}

interface BranchMatch {
  branch: DoseBranch;
  state: 'match' | 'excluded' | 'indeterminate';
  missingFields: Set<string>;
  specificity: number;
}

function matchBranch(branch: DoseBranch, input: DosingRuleEvaluationInput): BranchMatch {
  const missingFields = new Set<string>();
  let specificity = 0;
  const states: DimensionState[] = [];

  const routeState = evaluateSetDimension(branch.condition.routes, input.route);
  states.push(routeState);
  if (routeState !== 'unconstrained') specificity++;
  if (routeState === 'indeterminate') missingFields.add('route');

  const indicationState = evaluateSetDimension(branch.condition.indications, input.indication);
  states.push(indicationState);
  if (indicationState !== 'unconstrained') specificity++;
  if (indicationState === 'indeterminate') missingFields.add('indication');

  for (const dim of NUMERIC_DIMENSIONS) {
    const state = evaluateNumericDimension(dim, branch.condition, input);
    states.push(state);
    if (state !== 'unconstrained') specificity++;
    if (state === 'indeterminate') missingFields.add(dim.missingFieldName);
  }

  let overall: 'match' | 'excluded' | 'indeterminate';
  if (states.includes('excluded')) overall = 'excluded';
  else if (states.includes('indeterminate')) overall = 'indeterminate';
  else overall = 'match';

  return { branch, state: overall, missingFields, specificity };
}

/** Résout les collisions exactes plancher/plafond entre branches sœurs toutes deux "match" (voir en-tête du fichier). */
function applyBoundaryTieBreak(matched: BranchMatch[], input: DosingRuleEvaluationInput): BranchMatch[] {
  if (matched.length < 2) return matched;
  const excluded = new Set<DoseBranch>();
  for (const dim of NUMERIC_DIMENSIONS) {
    const value = dim.getInputValue(input);
    if (value === undefined) continue;
    for (const candidate of matched) {
      const candidateMax = candidate.branch.condition[dim.maxKey] as number | undefined;
      if (candidateMax !== value) continue;
      const hasMinAnchoredSibling = matched.some(
        (sibling) => sibling !== candidate && (sibling.branch.condition[dim.minKey] as number | undefined) === value,
      );
      if (hasMinAnchoredSibling) excluded.add(candidate.branch);
    }
  }
  const remaining = matched.filter((m) => !excluded.has(m.branch));
  return remaining.length > 0 ? remaining : matched;
}

/** Ne retient que les branches les plus spécifiques (le plus de dimensions contraintes) quand cela résout l'ambiguïté. */
function applySpecificityResolution(matched: BranchMatch[]): BranchMatch[] {
  if (matched.length < 2) return matched;
  const maxSpecificity = Math.max(...matched.map((m) => m.specificity));
  return matched.filter((m) => m.specificity === maxSpecificity);
}

function isTreatmentSequence(matched: BranchMatch[]): boolean {
  if (matched.length < 2) return false;
  const roles = matched.map((m) => m.branch.role);
  if (!roles.every((r) => SEQUENCE_ROLES.includes(r))) return false;
  // Plusieurs charges successives (ex. "charges additionnelles") sont cumulatives, pas concurrentes.
  // En revanche, deux branches "maintenance" ou deux "titration" simultanées resteraient ambiguës.
  const nonLoadingRoles = roles.filter((r) => r !== 'loading');
  return new Set(nonLoadingRoles).size === nonLoadingRoles.length;
}

function requiresWeight(kind: DoseAmount['kind']): boolean {
  return kind === 'mg_per_kg' || kind === 'mg_per_kg_per_day' || kind === 'g_per_kg' || kind === 'mg_per_kg_per_hour' || kind === 'ml_per_kg';
}

function toTrueMg(value: number, unit: DoseAmount['displayUnit']): number | undefined {
  switch (unit) {
    case 'mg':
      return value;
    case 'mcg':
      return value / 1000;
    case 'g':
      return value * 1000;
    case 'mL':
      return undefined;
  }
}

function fromTrueMg(value: number, unit: 'mg' | 'mcg' | 'g'): number {
  switch (unit) {
    case 'mg':
      return value;
    case 'mcg':
      return value * 1000;
    case 'g':
      return value / 1000;
  }
}

function round(value: number, decimals = 3): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatNumber(value: number): string {
  return round(value, 3).toString();
}

function formatRange(min: number, max: number, unit: string): string {
  const minStr = formatNumber(min);
  const maxStr = formatNumber(max);
  return minStr === maxStr ? `${minStr} ${unit}` : `${minStr}-${maxStr} ${unit}`;
}

interface BranchAmountComputation {
  /** Quantité native (unité d'affichage de la branche), après application des plafonds éventuels. */
  nativeMin: number;
  nativeMax: number;
  unit: DoseAmount['displayUnit'];
  /** Quantité convertie en mg réels (toujours, indépendamment de l'unité d'affichage), si l'unité est convertible en masse (mg/mcg/g). undefined pour les volumes (mL). */
  trueMgMin?: number;
  trueMgMax?: number;
  /** Quantité par kg en mg réels, uniquement pour les branches exprimées par kg et convertibles en masse. */
  trueMgPerKgMin?: number;
  trueMgPerKgMax?: number;
  wasCapped: boolean;
}

function computeBranchAmount(branch: DoseBranch, weightKg: number | undefined): BranchAmountComputation {
  const { amount } = branch;
  const isPerKg = requiresWeight(amount.kind);
  const w = isPerKg ? (weightKg as number) : 1;

  let nativeMin = amount.valueMin * w;
  let nativeMax = amount.valueMax * w;

  let trueMgMin = toTrueMg(nativeMin, amount.displayUnit);
  let trueMgMax = toTrueMg(nativeMax, amount.displayUnit);

  let wasCapped = false;
  if (branch.maxPerDoseMg !== undefined && trueMgMax !== undefined) {
    if (trueMgMax > branch.maxPerDoseMg) {
      trueMgMax = branch.maxPerDoseMg;
      wasCapped = true;
    }
    if (trueMgMin !== undefined && trueMgMin > branch.maxPerDoseMg) {
      trueMgMin = branch.maxPerDoseMg;
      wasCapped = true;
    }
  }

  if (wasCapped && trueMgMin !== undefined && trueMgMax !== undefined && (amount.displayUnit === 'mg' || amount.displayUnit === 'mcg' || amount.displayUnit === 'g')) {
    nativeMin = fromTrueMg(trueMgMin, amount.displayUnit);
    nativeMax = fromTrueMg(trueMgMax, amount.displayUnit);
  }

  const trueMgPerKgMin = isPerKg && trueMgMin !== undefined && weightKg ? trueMgMin / weightKg : undefined;
  const trueMgPerKgMax = isPerKg && trueMgMax !== undefined && weightKg ? trueMgMax / weightKg : undefined;

  return {
    nativeMin,
    nativeMax,
    unit: amount.displayUnit,
    trueMgMin,
    trueMgMax,
    trueMgPerKgMin,
    trueMgPerKgMax,
    wasCapped,
  };
}

function buildFrequencyText(branch: DoseBranch): string | undefined {
  const { schedule } = branch;
  if (schedule.intervalUnresolvedFromSource) {
    return 'Intervalle non précisé par la source : décision clinique requise.';
  }
  const parts: string[] = [];
  if (schedule.fixedScheduleHours && schedule.fixedScheduleHours.length > 0) {
    parts.push(`Horaire fixe : H${schedule.fixedScheduleHours.join('/H')}`);
  }
  const isSingleAdministrationRole = branch.role === 'loading' || branch.role === 'rescue';
  if (schedule.intervalHoursMin !== undefined) {
    const { intervalHoursMin: min, intervalHoursMax: max = min } = schedule;
    if (max < 1) {
      const minuteMin = round(min * 60, 1);
      const minuteMax = round(max * 60, 1);
      parts.push(minuteMin === minuteMax ? `q${minuteMin}min` : `q${minuteMin}-${minuteMax}min`);
    } else {
      parts.push(min === max ? `q${formatNumber(min)}h` : `q${formatNumber(min)}-${formatNumber(max)}h`);
    }
  } else if (schedule.frequencyPerDayMin !== undefined) {
    const { frequencyPerDayMin: min, frequencyPerDayMax: max = min } = schedule;
    if (isSingleAdministrationRole && min === 1 && max === 1) {
      parts.push('Dose unique');
    } else {
      parts.push(min === max ? `${min} fois/jour` : `${min}-${max} fois/jour`);
    }
  }
  if (schedule.durationText) {
    parts.push(schedule.durationText);
  }
  return parts.length > 0 ? parts.join('. ') : undefined;
}

function buildMaxDoseText(branch: DoseBranch): string | undefined {
  const parts: string[] = [];
  if (branch.maxPerDoseMg !== undefined) parts.push(`Max ${formatNumber(branch.maxPerDoseMg)} mg/prise`);
  if (branch.maxPerDayMg !== undefined) parts.push(`Max ${formatNumber(branch.maxPerDayMg)} mg/jour`);
  if (branch.maxPerDayMgPerKg !== undefined) parts.push(`Max ${formatNumber(branch.maxPerDayMgPerKg)} mg/kg/jour`);
  return parts.length > 0 ? parts.join(', ') : undefined;
}

function describeBranchCondition(branch: DoseBranch, input: DosingRuleEvaluationInput): string[] {
  const { condition } = branch;
  const lines: string[] = [];
  if (condition.routes && condition.routes.length > 0) {
    lines.push(`Voie : ${input.route ?? condition.routes.join(' / ')}`);
  }
  if (condition.indications && condition.indications.length > 0) {
    lines.push(`Indication : ${input.indication ?? condition.indications.join(' / ')}`);
  }
  if (condition.weightMinKg !== undefined || condition.weightMaxKg !== undefined) {
    lines.push(`Poids : ${formatBoundText(condition.weightMinKg, condition.weightMaxKg, 'kg')}`);
  }
  if (condition.gestationalAgeMinWeeks !== undefined || condition.gestationalAgeMaxWeeks !== undefined) {
    lines.push(`Âge gestationnel : ${formatBoundText(condition.gestationalAgeMinWeeks, condition.gestationalAgeMaxWeeks, 'sem')}`);
  }
  if (condition.postMenstrualAgeMinWeeks !== undefined || condition.postMenstrualAgeMaxWeeks !== undefined) {
    lines.push(`Âge postmenstruel : ${formatBoundText(condition.postMenstrualAgeMinWeeks, condition.postMenstrualAgeMaxWeeks, 'sem')}`);
  }
  if (condition.postnatalAgeMinDays !== undefined || condition.postnatalAgeMaxDays !== undefined) {
    lines.push(`Âge postnatal : ${formatBoundText(condition.postnatalAgeMinDays, condition.postnatalAgeMaxDays, 'j')}`);
  }
  if (condition.ageMinDays !== undefined || condition.ageMaxDays !== undefined) {
    lines.push(`Âge : ${formatBoundText(condition.ageMinDays, condition.ageMaxDays, 'j')}`);
  }
  if (condition.freeTextCondition) {
    lines.push(`Condition non chiffrée : ${condition.freeTextCondition}`);
  }
  return lines;
}

function formatBoundText(min: number | undefined, max: number | undefined, unit: string): string {
  if (min !== undefined && max !== undefined) return `${min}-${max} ${unit}`;
  if (min !== undefined) return `≥ ${min} ${unit}`;
  if (max !== undefined) return `< ${max} ${unit}`;
  return '';
}

const ROLE_DISPLAY_PRIORITY: DoseBranchRole[] = ['maintenance', 'titration', 'loading', 'standard', 'rescue', 'prophylaxis', 'reversal', 'nebulization', 'inhaler', 'continuous_infusion'];

function pickPrimaryBranch(branches: DoseBranch[]): DoseBranch {
  for (const role of ROLE_DISPLAY_PRIORITY) {
    const found = branches.find((b) => b.role === role);
    if (found) return found;
  }
  return branches[0];
}

function notFoundResult(drugName: string): DosingRuleEvaluationResult {
  return {
    status: 'not_found',
    doseText: '',
    appliedConditions: [],
    warnings: [],
    explanation: `Aucune règle de dosage V2 trouvée pour "${drugName}".`,
  };
}

function blockedResult(
  rule: DosingRuleV2,
  input: DosingRuleEvaluationInput,
  reason: string,
  appliedConditions: string[] = [],
): DosingRuleEvaluationResult {
  return {
    status: 'blocked',
    ruleId: rule.id,
    drugName: rule.drugName,
    doseText: rule.validatedDoseText,
    route: input.route,
    indication: input.indication,
    appliedConditions,
    warnings: rule.warnings,
    sourceName: rule.sourceName,
    sourceUrl: rule.sourceUrl,
    explanation: explainDosingRule({
      rule,
      input,
      status: 'blocked',
      selectedBranches: [],
      appliedConditions,
      doseText: rule.validatedDoseText,
      blockedReason: reason,
    }),
  };
}

function requiresClinicalChoiceResult(
  rule: DosingRuleV2,
  input: DosingRuleEvaluationInput,
  missingFields: string[],
  candidateBranches: DoseBranch[],
): DosingRuleEvaluationResult {
  const appliedConditions = candidateBranches.flatMap((b) => describeBranchCondition(b, input));
  return {
    status: 'requires_clinical_choice',
    ruleId: rule.id,
    drugName: rule.drugName,
    doseText: rule.validatedDoseText,
    route: input.route,
    indication: input.indication,
    appliedConditions,
    missingFields: missingFields.length > 0 ? missingFields : undefined,
    warnings: rule.warnings,
    sourceName: rule.sourceName,
    sourceUrl: rule.sourceUrl,
    explanation: explainDosingRule({
      rule,
      input,
      status: 'requires_clinical_choice',
      selectedBranches: candidateBranches,
      appliedConditions,
      doseText: rule.validatedDoseText,
      missingFields,
    }),
  };
}

/** Évalue de manière déterministe une règle de dose V2 pour une entrée patient donnée. */
export function evaluateDosingRule(input: DosingRuleEvaluationInput): DosingRuleEvaluationResult {
  const rule = findDosingRuleByDrugName(input.drugName);
  if (!rule) {
    return notFoundResult(input.drugName);
  }

  if (rule.branches.length === 0) {
    return blockedResult(rule, input, 'Aucune branche de dose encodée pour cette règle.');
  }

  const matches = rule.branches.map((b) => matchBranch(b, input));
  const matched = matches.filter((m) => m.state === 'match');
  const indeterminate = matches.filter((m) => m.state === 'indeterminate');

  if (matched.length === 0) {
    if (indeterminate.length > 0) {
      const missingFields = [...new Set(indeterminate.flatMap((m) => [...m.missingFields]))];
      return requiresClinicalChoiceResult(rule, input, missingFields, indeterminate.map((m) => m.branch));
    }
    return blockedResult(
      rule,
      input,
      'Aucune branche de la règle ne correspond aux paramètres fournis (poids, âge, voie ou indication hors des bornes définies par la source).',
    );
  }

  let resolved = applyBoundaryTieBreak(matched, input);
  resolved = applySpecificityResolution(resolved);

  let selectedBranches: DoseBranch[];
  if (resolved.length === 1) {
    selectedBranches = [resolved[0].branch];
  } else if (isTreatmentSequence(resolved)) {
    selectedBranches = resolved.map((m) => m.branch);
  } else {
    // Ambiguïté réelle entre branches concurrentes à dosage potentiellement différent.
    const missingFields = [...new Set(indeterminate.flatMap((m) => [...m.missingFields]))];
    return requiresClinicalChoiceResult(rule, input, missingFields, resolved.map((m) => m.branch));
  }

  // Une branche indéterminée à dosage distinct subsiste alors qu'une branche par défaut a "gagné" :
  // on exige la clarification plutôt que de choisir silencieusement le cas par défaut.
  if (resolved.length === 1 && indeterminate.length > 0) {
    const competing = indeterminate.filter((m) => !isTreatmentSequence([resolved[0], m]) || m.branch.role === resolved[0].branch.role);
    if (competing.length > 0) {
      const missingFields = [...new Set(competing.flatMap((m) => [...m.missingFields]))];
      return requiresClinicalChoiceResult(rule, input, missingFields, [resolved[0].branch, ...competing.map((m) => m.branch)]);
    }
  }

  const anyUnresolvedAmount = selectedBranches.some((b) => b.doseAmountUnresolvedFromSource);
  const anyUnresolvedInterval = selectedBranches.some((b) => b.schedule.intervalUnresolvedFromSource);

  const appliedConditions = selectedBranches.flatMap((b) => describeBranchCondition(b, input));

  if (anyUnresolvedAmount) {
    const maxDoseText = selectedBranches.map(buildMaxDoseText).filter(Boolean).join(' ; ') || undefined;
    return {
      status: 'blocked',
      ruleId: rule.id,
      drugName: rule.drugName,
      doseText: rule.validatedDoseText,
      maxDoseText,
      route: input.route,
      indication: input.indication,
      appliedConditions,
      warnings: rule.warnings,
      sourceName: rule.sourceName,
      sourceUrl: rule.sourceUrl,
      explanation: explainDosingRule({
        rule,
        input,
        status: 'blocked',
        selectedBranches,
        appliedConditions,
        doseText: rule.validatedDoseText,
        maxDoseText,
        blockedReason:
          "La source ne donne qu'un plafond, sans dose par administration chiffrée : le moteur ne peut pas déduire une dose unitaire sans l'inventer.",
      }),
    };
  }

  const primaryBranch = pickPrimaryBranch(selectedBranches);

  if (requiresWeight(primaryBranch.amount.kind) && input.weightKg === undefined) {
    return requiresClinicalChoiceResult(rule, input, ['weightKg'], selectedBranches);
  }

  const computation = computeBranchAmount(primaryBranch, input.weightKg);
  const frequencyText = selectedBranches.map(buildFrequencyText).filter(Boolean).join(' ; ') || undefined;
  const maxDoseText = selectedBranches.map(buildMaxDoseText).filter(Boolean).join(' ; ') || undefined;

  const doseMg = computation.trueMgMax;
  const doseMgMin = computation.trueMgMin;
  const doseMgMax = computation.trueMgMax;
  const doseMgPerKg = computation.trueMgPerKgMax;
  const doseMgPerKgMin = computation.trueMgPerKgMin;
  const doseMgPerKgMax = computation.trueMgPerKgMax;

  const doseTextParts: string[] = [];
  for (const branch of selectedBranches) {
    const c = branch === primaryBranch ? computation : computeBranchAmount(branch, input.weightKg);
    const rolePrefix = branch.role !== 'standard' ? `${roleLabel(branch.role)} : ` : '';
    doseTextParts.push(`${rolePrefix}${formatRange(c.nativeMin, c.nativeMax, c.unit)}`);
  }
  const doseText = doseTextParts.join(' ; ');

  const status = anyUnresolvedInterval ? 'blocked' : 'calculated';

  return {
    status,
    ruleId: rule.id,
    drugName: rule.drugName,
    doseMg,
    doseMgMin,
    doseMgMax,
    doseMgPerKg,
    doseMgPerKgMin,
    doseMgPerKgMax,
    doseText,
    frequencyText,
    maxDoseText,
    route: input.route,
    indication: input.indication,
    wasCapped: selectedBranches.some((b) => computeBranchAmount(b, input.weightKg).wasCapped),
    appliedConditions,
    warnings: rule.warnings,
    sourceName: rule.sourceName,
    sourceUrl: rule.sourceUrl,
    explanation: explainDosingRule({
      rule,
      input,
      status,
      selectedBranches,
      appliedConditions,
      doseText,
      frequencyText,
      maxDoseText,
      doseMgPerKgMin,
      doseMgPerKgMax,
      wasCapped: selectedBranches.some((b) => computeBranchAmount(b, input.weightKg).wasCapped),
      blockedReason: anyUnresolvedInterval
        ? "L'intervalle entre les administrations n'est pas précisé par la source pour cette branche : décision clinique requise avant prescription."
        : undefined,
    }),
  };
}

function roleLabel(role: DoseBranchRole): string {
  switch (role) {
    case 'loading':
      return 'Charge';
    case 'maintenance':
      return 'Entretien';
    case 'titration':
      return 'Titration';
    case 'rescue':
      return 'Urgence';
    case 'prophylaxis':
      return 'Prophylaxie';
    case 'reversal':
      return 'Réversion';
    case 'nebulization':
      return 'Nébulisation';
    case 'inhaler':
      return 'Inhalateur';
    case 'continuous_infusion':
      return 'Perfusion continue';
    case 'standard':
      return 'Standard';
  }
}
