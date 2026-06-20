/**
 * Point d'entrée public du moteur clinique V2 (base "dosing_rules_v2.validated.json").
 * Module pur, sans dépendance UI ni IA — voir ./types.ts pour le contrat de données
 * et CLAUDE.md pour les règles médicales non négociables.
 */

export { normalizeDrugName } from './normalize';

export {
  ALL_DOSING_RULES_V2,
  findDosingRuleById,
  findDosingRuleByDrugName,
  findDosingRulesBySearchTerm,
} from './ruleMatcher';

export { evaluateDosingRule } from './evaluateDosingRule';

export { explainDosingRule } from './explainDosingRule';
export type { ExplainDosingRuleInput } from './explainDosingRule';

export { getRequiredFieldsForRule } from './requiredFields';
export type { RequiredClinicalField } from './requiredFields';

export type {
  ClinicalWarningV2,
  DoseAmount,
  DoseAmountKind,
  DoseBranch,
  DoseBranchCondition,
  DoseBranchRole,
  DoseSchedule,
  DosingRuleConditionEncoding,
  DosingRuleEvaluationInput,
  DosingRuleEvaluationResult,
  DosingRuleEvaluationStatus,
  DosingRuleStatus,
  DosingRuleV2,
  DosingRuleV2Raw,
  RuleComplexity,
} from './types';
