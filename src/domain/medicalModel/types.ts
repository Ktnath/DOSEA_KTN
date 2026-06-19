/**
 * Modèle médical V2 extensible pour les médicaments et posologies.
 *
 * Ce module est additif : il ne remplace pas `Drug` (src/types.ts), qui reste
 * la source de vérité lue depuis `public/data/drugs.json`. Il pose les bases
 * d'un modèle plus riche où un médicament peut avoir plusieurs formes, plusieurs
 * concentrations et plusieurs règles de dosage selon l'indication, la voie,
 * l'âge, le poids, le terme, la fonction rénale, etc.
 */

/** Cycle de vie d'une donnée clinique, du brouillon à la désactivation. */
export type ValidationStatus = 'draft' | 'reviewed' | 'validated' | 'disabled';

/** Référence clinique tracée (document officiel, guide, RCP, etc.). Jamais inventée. */
export interface MedicalReference {
  id: string;
  title: string;
  organization: string;
  year: number;
  url?: string;
  documentName?: string;
  page?: string;
  excerpt?: string;
  accessedAt?: string;
  validatedBy?: string;
  validationDate?: string;
}

/** Une concentration disponible pour une forme galénique donnée. */
export interface DrugConcentration {
  label: string;
  value: number;
  /** Unité de la concentration, ex: "mg/mL". */
  unit: string;
  isDefault?: boolean;
}

/** Une forme galénique disponible pour un médicament (ex: suspension, comprimé, injectable). */
export interface DrugForm {
  form: string;
  route: string;
  concentrations: DrugConcentration[];
  notes?: string;
}

/**
 * Une règle de dosage pour une indication/voie/population donnée.
 * Plusieurs règles peuvent coexister pour un même médicament.
 */
export interface DosingRule {
  id: string;
  indication: string;
  route: string;

  ageMinDays?: number;
  ageMaxDays?: number;
  weightMinKg?: number;
  weightMaxKg?: number;
  gestationalAgeMinWeeks?: number;

  doseMgPerKg?: number;
  doseMgPerKgPerDay?: number;
  fixedDoseMg?: number;

  maxDoseMg?: number;
  maxDailyDoseMg?: number;

  frequencyPerDay?: number;
  minIntervalHours?: number;
  duration?: string;

  renalAdjustment?: string;
  hepaticAdjustment?: string;

  /** Sources cliniques justifiant cette règle. Jamais déduites ni inventées. */
  references: MedicalReference[];
  validationStatus: ValidationStatus;
  notes?: string;
}

/** Une alerte de sécurité associée à une condition clinique. */
export interface SafetyWarningRule {
  code: string;
  severity: 'info' | 'warning' | 'danger' | 'blocker';
  conditionLabel: string;
  message: string;
  rationale?: string;
  references?: MedicalReference[];
}

/** Médicament au format clinique versionné V2, avec plusieurs formes et règles de dosage. */
export interface DrugV2 {
  id?: string;
  dci: string;
  displayName: string;
  commercialNames?: string[];
  class: string;
  subClass?: string;
  system?: string;

  forms: DrugForm[];
  dosingRules: DosingRule[];
  safetyWarnings?: SafetyWarningRule[];

  /** Sources cliniques générales du médicament. Jamais déduites ni inventées. */
  references: MedicalReference[];
  validationStatus: ValidationStatus;
  version: number;
  lastUpdatedAt?: string;
}
