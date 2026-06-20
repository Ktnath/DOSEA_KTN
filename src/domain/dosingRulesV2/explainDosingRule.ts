/**
 * Construction du texte d'explication d'un résultat d'évaluation V2 (module
 * pur). Par exigence CLAUDE.md, toute dose affichée doit pouvoir expliquer :
 * formule, dose/kg, plafond, fréquence, source — ce module assemble ce texte
 * à partir des données déjà calculées par `evaluateDosingRule`, sans
 * recalculer ni réinterpréter aucune valeur.
 */

import type { DoseBranch, DoseBranchRole, DosingRuleEvaluationInput, DosingRuleEvaluationStatus, DosingRuleV2 } from './types';

export interface ExplainDosingRuleInput {
  rule: DosingRuleV2;
  input: DosingRuleEvaluationInput;
  status: DosingRuleEvaluationStatus;
  selectedBranches: DoseBranch[];
  appliedConditions: string[];
  doseText: string;
  frequencyText?: string;
  maxDoseText?: string;
  doseMgPerKgMin?: number;
  doseMgPerKgMax?: number;
  wasCapped?: boolean;
  missingFields?: string[];
  blockedReason?: string;
}

const MISSING_FIELD_LABELS: Record<string, string> = {
  weightKg: 'le poids',
  ageDays: "l'âge en jours",
  ageMonths: "l'âge en mois",
  gestationalAgeWeeks: "l'âge gestationnel",
  postMenstrualAgeWeeks: "l'âge postmenstruel",
  indication: "l'indication clinique",
  route: "la voie d'administration",
};

function formatPerKg(min: number | undefined, max: number | undefined): string | undefined {
  if (min === undefined || max === undefined) return undefined;
  const minStr = round(min).toString();
  const maxStr = round(max).toString();
  return minStr === maxStr ? `${minStr} mg/kg` : `${minStr}-${maxStr} mg/kg`;
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function roleLabel(role: DoseBranchRole): string {
  switch (role) {
    case 'loading':
      return 'dose de charge';
    case 'maintenance':
      return "dose d'entretien";
    case 'titration':
      return 'dose de titration';
    case 'rescue':
      return "dose d'urgence";
    case 'prophylaxis':
      return 'dose de prophylaxie';
    case 'reversal':
      return 'dose de réversion';
    case 'nebulization':
      return 'nébulisation';
    case 'inhaler':
      return 'inhalateur';
    case 'continuous_infusion':
      return 'perfusion continue';
    case 'standard':
      return 'dose standard';
  }
}

/** Construit le texte d'explication complet pour un résultat d'évaluation V2. */
export function explainDosingRule(ctx: ExplainDosingRuleInput): string {
  const lines: string[] = [];
  const { rule, input, status } = ctx;

  lines.push(`Médicament : ${rule.drugName}.`);

  if (status === 'not_found') {
    return `Aucune règle de dosage V2 trouvée pour "${input.drugName}".`;
  }

  if (ctx.appliedConditions.length > 0) {
    lines.push(`Conditions appliquées : ${ctx.appliedConditions.join(' ; ')}.`);
  }

  if (status === 'calculated' || (status === 'blocked' && ctx.selectedBranches.length > 0 && !ctx.blockedReason?.includes('plafond'))) {
    for (const branch of ctx.selectedBranches) {
      const label = roleLabel(branch.role);
      if (input.weightKg !== undefined && branch.amount.kind !== 'fixed_mg' && branch.amount.kind !== 'fixed_volume_ml') {
        lines.push(
          `Formule (${label}) : ${input.weightKg} kg × ${branch.amount.valueMin}-${branch.amount.valueMax} ${branch.amount.displayUnit}/kg.`,
        );
      } else {
        lines.push(`${label} : ${branch.amount.valueMin}-${branch.amount.valueMax} ${branch.amount.displayUnit} (dose fixe, non dépendante du poids).`);
      }
    }
  }

  const perKg = formatPerKg(ctx.doseMgPerKgMin, ctx.doseMgPerKgMax);
  if (perKg) {
    lines.push(`Dose/kg retenue : ${perKg}.`);
  }

  if (ctx.maxDoseText) {
    lines.push(`Plafond : ${ctx.maxDoseText}.`);
  }

  if (ctx.wasCapped) {
    lines.push('Dose plafonnée au maximum autorisé par la source (dose brute supérieure au plafond).');
  }

  if (ctx.frequencyText) {
    lines.push(`Fréquence/intervalle : ${ctx.frequencyText}`);
  }

  if (status === 'requires_clinical_choice') {
    const missingLabels = (ctx.missingFields ?? []).map((f) => MISSING_FIELD_LABELS[f] ?? f);
    if (missingLabels.length > 0) {
      lines.push(
        `Choix clinique requis : ${missingLabels.join(', ')} doit être précisé pour départager les branches possibles de cette règle.`,
      );
    } else {
      lines.push('Choix clinique requis : plusieurs branches de cette règle restent possibles avec les informations fournies.');
    }
  }

  if (status === 'blocked' && ctx.blockedReason) {
    lines.push(`Calcul bloqué : ${ctx.blockedReason}`);
  }

  lines.push(`Texte validé (source) : ${rule.validatedDoseText}`);

  if (rule.sourceName) {
    lines.push(`Source : ${rule.sourceName}${rule.sourceUrl ? ` (${rule.sourceUrl})` : ''}.`);
  }

  return lines.join('\n');
}
