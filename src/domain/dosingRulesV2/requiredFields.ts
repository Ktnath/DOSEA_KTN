/**
 * Détermine, pour une règle V2 donnée, la liste des champs cliniques
 * effectivement nécessaires à son calcul ou à sa désambiguïsation — module
 * pur, sans dépendance UI ni IA.
 *
 * Signal primaire (fiable) : les conditions numériques/discrètes réellement
 * encodées dans `rule.branches` (poids, âge postnatal, âge gestationnel, âge
 * postmenstruel, voie, indication, rôle de branche).
 *
 * Signal secondaire (mots-clés) : recherche ciblée sur `rawDoseText` +
 * `validatedDoseText` uniquement — jamais sur `conditionsToEncode`, qui est
 * un texte d'encodage générique partagé par la quasi-totalité des 80 règles
 * (mentionnant systématiquement « âge gestationnel / postmenstruel / postnatal »)
 * et qui, utilisé comme signal, ferait réapparaître le bug initial (l'Artésunate
 * réclamant à tort un âge gestationnel/postmenstruel).
 */

import type { DoseBranch, DoseBranchCondition, DosingRuleV2 } from './types';

export type RequiredClinicalField =
  | 'weightKg'
  | 'ageDays'
  | 'ageMonths'
  | 'ageYears'
  | 'gestationalAgeWeeks'
  | 'postMenstrualAgeWeeks'
  | 'indication'
  | 'route'
  | 'concentration'
  | 'renalFunction'
  | 'calciumCoAdministration'
  | 'loadingDose'
  | 'treatmentDay'
  | 'dosePhase';

/** Ordre d'affichage logique dans l'UI (identité patient -> contexte clinique -> phase -> détails d'administration). */
const FIELD_DISPLAY_ORDER: RequiredClinicalField[] = [
  'weightKg',
  'ageDays',
  'ageMonths',
  'ageYears',
  'gestationalAgeWeeks',
  'postMenstrualAgeWeeks',
  'indication',
  'route',
  'dosePhase',
  'loadingDose',
  'treatmentDay',
  'concentration',
  'renalFunction',
  'calciumCoAdministration',
];

const WEIGHT_DEPENDENT_AMOUNT_KINDS = new Set(['mg_per_kg', 'mg_per_kg_per_day', 'g_per_kg', 'mg_per_kg_per_hour', 'ml_per_kg']);

const GESTATIONAL_AGE_KEYWORDS = /âge gestationnel|age gestationnel|semaines? de gestation|gestational age/i;
const POSTMENSTRUAL_AGE_KEYWORDS = /âge postmenstruel|âge post-menstruel|\bpma\b|postmenstrual age/i;
/** Mention explicite d'un seuil d'âge civil en mois, exprimée avec un opérateur de comparaison ou le mot « âge » à proximité (évite les faux positifs type « après 1 mois » qui désignent un délai de traitement, pas un âge). */
const AGE_MONTHS_KEYWORDS = /(?:[<≤≥>]|âge)[^.]{0,10}\d+\s*mois\b|\d+\s*mois\b[^.]{0,10}âge/i;
const AGE_YEARS_KEYWORDS = /(?:[<≤≥>]|âge)[^.]{0,10}\d+\s*ans?\b|\d+\s*ans?\b[^.]{0,10}âge/i;
const RENAL_FUNCTION_KEYWORDS = /fonction rénale|insuffisance rénale|clairance|créatinine|néphrotoxiq|élimination rénale/i;
const RENAL_MONITORING_SUBCLASSES = new Set(['aminoside', 'glycopeptide']);
const CALCIUM_KEYWORDS = /calcium/i;
const CONCENTRATION_KEYWORDS = /concentration(?:s)? disponible|plusieurs concentrations|selon la concentration|selon la forme disponible/i;
const TREATMENT_DAY_KEYWORDS = /\bJ\s?\d+(?:\s?[-–]\s?J?\d+)*\b|x\s?\d+(?:\s?[-–]\s?\d+)?\s?j(?:ours?)?\b|décroissance/i;

function someBranchCondition(branches: DoseBranch[], predicate: (condition: DoseBranchCondition) => boolean): boolean {
  return branches.some((b) => predicate(b.condition));
}

function isWeightRequired(rule: DosingRuleV2): boolean {
  return rule.branches.some(
    (b) => WEIGHT_DEPENDENT_AMOUNT_KINDS.has(b.amount.kind) || b.condition.weightMinKg !== undefined || b.condition.weightMaxKg !== undefined,
  );
}

function isRouteRequired(rule: DosingRuleV2): boolean {
  if ((rule.route?.length ?? 0) > 1) return true;
  return someBranchCondition(rule.branches, (c) => c.routes !== undefined && c.routes.length > 0);
}

function isIndicationRequired(rule: DosingRuleV2): boolean {
  if ((rule.indications?.length ?? 0) > 1) return true;
  return someBranchCondition(rule.branches, (c) => c.indications !== undefined && c.indications.length > 0);
}

function isAgeDaysRequired(rule: DosingRuleV2): boolean {
  return someBranchCondition(
    rule.branches,
    (c) =>
      c.ageMinDays !== undefined ||
      c.ageMaxDays !== undefined ||
      c.postnatalAgeMinDays !== undefined ||
      c.postnatalAgeMaxDays !== undefined,
  );
}

function isGestationalAgeRequired(rule: DosingRuleV2, sourceText: string): boolean {
  if (someBranchCondition(rule.branches, (c) => c.gestationalAgeMinWeeks !== undefined || c.gestationalAgeMaxWeeks !== undefined)) {
    return true;
  }
  return GESTATIONAL_AGE_KEYWORDS.test(sourceText);
}

function isPostMenstrualAgeRequired(rule: DosingRuleV2, sourceText: string): boolean {
  if (someBranchCondition(rule.branches, (c) => c.postMenstrualAgeMinWeeks !== undefined || c.postMenstrualAgeMaxWeeks !== undefined)) {
    return true;
  }
  return POSTMENSTRUAL_AGE_KEYWORDS.test(sourceText);
}

function isRenalFunctionRequired(rule: DosingRuleV2, sourceText: string): boolean {
  const subclass = rule.raw.drug.subclass?.toLowerCase().trim();
  if (subclass && RENAL_MONITORING_SUBCLASSES.has(subclass)) return true;
  return RENAL_FUNCTION_KEYWORDS.test(sourceText);
}

function isCalciumCoAdministrationRequired(rule: DosingRuleV2, sourceText: string): boolean {
  // Le produit "calcium" lui-même n'a pas besoin d'être averti de sa propre co-administration.
  if (CALCIUM_KEYWORDS.test(rule.drugName)) return false;
  return CALCIUM_KEYWORDS.test(sourceText);
}

function isLoadingDoseRequired(rule: DosingRuleV2): boolean {
  return rule.branches.some((b) => b.role === 'loading');
}

function isDosePhaseRequired(rule: DosingRuleV2): boolean {
  const sequenceRoles = new Set(rule.branches.map((b) => b.role).filter((r) => r === 'loading' || r === 'maintenance' || r === 'titration'));
  return sequenceRoles.size > 1;
}

function isTreatmentDayRequired(sourceText: string): boolean {
  return TREATMENT_DAY_KEYWORDS.test(sourceText);
}

function isConcentrationRequired(sourceText: string): boolean {
  return CONCENTRATION_KEYWORDS.test(sourceText);
}

/**
 * Calcule les champs cliniques requis pour une règle V2 donnée. Source de
 * vérité unique pour l'UI : aucun champ ne doit être affiché par défaut
 * sans figurer dans le résultat de cette fonction (voir CLAUDE.md : ne
 * jamais afficher de champ hors-sujet).
 */
export function getRequiredFieldsForRule(rule: DosingRuleV2): RequiredClinicalField[] {
  const sourceText = `${rule.rawDoseText}\n${rule.validatedDoseText}`;
  const fields = new Set<RequiredClinicalField>();

  if (isWeightRequired(rule)) fields.add('weightKg');
  if (isAgeDaysRequired(rule)) fields.add('ageDays');
  if (AGE_MONTHS_KEYWORDS.test(sourceText)) fields.add('ageMonths');
  if (AGE_YEARS_KEYWORDS.test(sourceText)) fields.add('ageYears');
  if (isGestationalAgeRequired(rule, sourceText)) fields.add('gestationalAgeWeeks');
  if (isPostMenstrualAgeRequired(rule, sourceText)) fields.add('postMenstrualAgeWeeks');
  if (isIndicationRequired(rule)) fields.add('indication');
  if (isRouteRequired(rule)) fields.add('route');
  if (isDosePhaseRequired(rule)) fields.add('dosePhase');
  if (isLoadingDoseRequired(rule)) fields.add('loadingDose');
  if (isTreatmentDayRequired(sourceText)) fields.add('treatmentDay');
  if (isConcentrationRequired(sourceText)) fields.add('concentration');
  if (isRenalFunctionRequired(rule, sourceText)) fields.add('renalFunction');
  if (isCalciumCoAdministrationRequired(rule, sourceText)) fields.add('calciumCoAdministration');

  return FIELD_DISPLAY_ORDER.filter((f) => fields.has(f));
}
