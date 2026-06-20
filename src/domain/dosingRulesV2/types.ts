/**
 * Types du moteur clinique V2 (base "dosing_rules_v2.validated.json", validée
 * par Dr KAPTO le 2026-06-20). Module pur, sans dépendance UI ni IA.
 *
 * Important : la base source ne contient pas de conditions numériques déjà
 * structurées par tranche (poids/âge) pour la plupart des médicaments — ces
 * conditions sont encodées séparément dans ./encoding à partir du texte
 * source validé (`raw_current_posology` / `validated_posology_text`), champ
 * par champ, sans ajouter aucun seuil non explicitement présent dans ce texte.
 */

/** Une des 80 entrées brutes de dosing_rules_v2.validated.json. */
export interface DosingRuleV2Raw {
  rule_id: string;
  source_excel_row_id: number | null;
  drug: {
    name: string;
    class: string;
    subclass: string;
    clinical_system: string;
    aliases: string[];
  };
  validated: {
    status: string;
    validator: string;
    validation_date: string;
    decision_review: string;
    source_status: string;
  };
  clinical_context: {
    routes: string[];
    indications: string[];
    dilution_or_administration: string;
  };
  dose_expression: {
    raw_current_posology: string;
    validated_posology_text: string;
    structured_parameters_from_review_table: {
      dose_app_mg_per_kg: number | null;
      max_per_dose_mg: number | null;
      max_per_day_mg: number | null;
      frequency_per_day: number | null;
      minimum_interval_hours: number | null;
      concentration_mg_per_ml: number | null;
    };
    rule_type: 'simple_or_semi_simple' | 'semi_structured' | 'conditional_or_algorithmic';
    encoding_dimensions: string[];
    conditions_to_encode_text: string;
  };
  sources: {
    declared_source_label: string;
    drive_urls: string[];
    source_section_or_page_text: string;
  };
  safety: {
    safety_flags: string[];
    reviewer_comment: string;
    app_status: string;
  };
  implementation: {
    target_engine: string;
    recommended_encoding_status: string;
    requires_manual_programming_of_conditions: boolean;
    do_not_use_as_blind_single_mg_per_kg: boolean;
  };
}

/** Rôle clinique d'une branche de dose au sein d'une règle. */
export type DoseBranchRole =
  | 'standard'
  | 'loading'
  | 'maintenance'
  | 'titration'
  | 'nebulization'
  | 'inhaler'
  | 'continuous_infusion'
  | 'rescue'
  | 'prophylaxis'
  | 'reversal';

/** Type de quantité de dose pour une branche. */
export type DoseAmountKind =
  | 'mg_per_kg'
  | 'fixed_mg'
  | 'mg_per_kg_per_day'
  | 'g_per_kg'
  | 'fixed_volume_ml'
  | 'mg_per_kg_per_hour'
  | 'ml_per_kg';

/** Quantité de dose, supportant un intervalle min-max tel qu'exprimé dans le texte source (jamais réduit à une valeur unique). */
export interface DoseAmount {
  kind: DoseAmountKind;
  /** Toujours renseigné. Égal à valueMax si la source ne donne pas d'intervalle. */
  valueMin: number;
  valueMax: number;
  /** Unité d'affichage telle qu'exprimée dans la source (mg, mcg, g, mL). */
  displayUnit: 'mg' | 'mcg' | 'g' | 'mL';
}

/** Calendrier d'administration d'une branche. */
export interface DoseSchedule {
  frequencyPerDayMin?: number;
  frequencyPerDayMax?: number;
  intervalHoursMin?: number;
  intervalHoursMax?: number;
  /** Heures fixes depuis le début du traitement (ex: H0/H12/H24 pour l'artésunate). */
  fixedScheduleHours?: number[];
  /** Vrai si le texte source mentionne un intervalle qui dépend d'une condition (ex: âge postmenstruel) sans donner les valeurs précises pour cette branche. */
  intervalUnresolvedFromSource?: boolean;
  durationText?: string;
}

/**
 * Conditions cliniques d'application d'une branche. Toutes optionnelles : une branche sans condition s'applique par défaut.
 * Convention de bornes (cohérente avec le texte source) : les bornes *MinX sont inclusives (le texte source utilise
 * "≥" ou une borne basse fermée), les bornes *MaxX sont exclusives lorsque le texte source utilise "<" (ex: "<30 sem"
 * encodé en postMenstrualAgeMaxWeeks: 30 signifie strictement inférieur à 30).
 */
export interface DoseBranchCondition {
  routes?: string[];
  indications?: string[];
  weightMinKg?: number;
  weightMaxKg?: number;
  ageMinDays?: number;
  ageMaxDays?: number;
  gestationalAgeMinWeeks?: number;
  gestationalAgeMaxWeeks?: number;
  postMenstrualAgeMinWeeks?: number;
  postMenstrualAgeMaxWeeks?: number;
  postnatalAgeMinDays?: number;
  postnatalAgeMaxDays?: number;
  /** Description textuelle d'une condition non numérisable (ex: "si accès IV impossible"), affichée mais non évaluée automatiquement. */
  freeTextCondition?: string;
}

/** Une branche de dose : une combinaison (conditions -> dose + calendrier) extraite du texte validé. */
export interface DoseBranch {
  id: string;
  role: DoseBranchRole;
  condition: DoseBranchCondition;
  amount: DoseAmount;
  schedule: DoseSchedule;
  maxPerDoseMg?: number;
  maxPerDayMg?: number;
  /** Plafond journalier exprimé en mg/kg/jour dans la source, quand aucun plafond fixe en mg n'est donné. */
  maxPerDayMgPerKg?: number;
  concentrationMgPerMl?: number;
  /**
   * Vrai si la source ne donne qu'un plafond journalier (mg/kg/jour ou mg/jour)
   * sans dose par administration clairement chiffrée pour cette branche : le
   * moteur ne doit alors jamais déduire une dose par prise (cela reviendrait à
   * inventer une posologie), et doit bloquer le calcul en affichant le texte
   * validé et le plafond connu.
   */
  doseAmountUnresolvedFromSource?: boolean;
  /** Note clinique préservée verbatim depuis le texte source pour cette branche. */
  sourceNote?: string;
}

/** Encodage des conditions d'une règle, dérivé manuellement du texte source. Ne remplace jamais le texte validé, qui reste affiché intégralement. */
export interface DosingRuleConditionEncoding {
  ruleId: string;
  branches: DoseBranch[];
  /** Points nécessitant une validation/clarification clinique humaine avant utilisation en production (ex: seuils référencés mais non chiffrés dans le texte source). */
  manualReviewNotes: string[];
}

export type DosingRuleStatus = 'validated' | 'requires_manual_review' | 'blocked';
export type RuleComplexity = 'simple' | 'semi_structured' | 'conditional' | 'algorithmic';

/** Alerte clinique associée à une règle V2 (issue de clinicalWarnings.generated.ts). */
export interface ClinicalWarningV2 {
  ruleId: string;
  drugName: string;
  flags: string[];
  warningText: string;
}

/** Représentation normalisée d'une règle de dose V2, combinant la donnée brute, l'encodage des conditions et les alertes. */
export interface DosingRuleV2 {
  id: string;
  drugName: string;
  aliases: string[];
  clinicalSystem?: string;
  therapeuticClass?: string;
  route?: string[];
  indications?: string[];
  sourceName?: string;
  sourceUrl?: string;
  rawDoseText: string;
  validatedDoseText: string;
  conditionsToEncode?: string;
  ruleComplexity: RuleComplexity;
  status: DosingRuleStatus;
  warnings: ClinicalWarningV2[];
  branches: DoseBranch[];
  manualReviewNotes: string[];
  doNotUseAsBlindSingleMgPerKg: boolean;
  raw: DosingRuleV2Raw;
}

/** Entrée du moteur d'évaluation déterministe. */
export interface DosingRuleEvaluationInput {
  drugName: string;
  weightKg?: number;
  ageDays?: number;
  ageMonths?: number;
  gestationalAgeWeeks?: number;
  postMenstrualAgeWeeks?: number;
  indication?: string;
  route?: string;
}

export type DosingRuleEvaluationStatus =
  | 'calculated'
  | 'requires_clinical_choice'
  | 'blocked'
  | 'not_found';

/** Résultat de l'évaluation déterministe d'une règle de dose V2. */
export interface DosingRuleEvaluationResult {
  status: DosingRuleEvaluationStatus;
  ruleId?: string;
  drugName?: string;
  /** Dose calculée en mg. Si la branche exprime un intervalle, doseMgMin/doseMgMax diffèrent et doseMg vaut doseMgMax (la borne sécuritaire haute) après plafonnement. */
  doseMg?: number;
  doseMgMin?: number;
  doseMgMax?: number;
  doseMgPerKg?: number;
  doseMgPerKgMin?: number;
  doseMgPerKgMax?: number;
  doseText: string;
  frequencyText?: string;
  maxDoseText?: string;
  route?: string;
  indication?: string;
  wasCapped?: boolean;
  appliedConditions: string[];
  /** Champs requis manquants pour lever l'ambiguïté ou débloquer le calcul. */
  missingFields?: string[];
  warnings: ClinicalWarningV2[];
  sourceName?: string;
  sourceUrl?: string;
  explanation: string;
}
