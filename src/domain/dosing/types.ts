/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance UI,
 * aucun appel IA. Module pur, déterministe et testable.
 */

/** Erreur levée pour toute entrée clinique invalide (poids, concentration, etc.). */
export class DosingError extends Error {
  readonly code: DosingErrorCode;

  constructor(code: DosingErrorCode, message: string) {
    super(message);
    this.name = 'DosingError';
    this.code = code;
  }
}

export type DosingErrorCode =
  | 'INVALID_WEIGHT'
  | 'INVALID_DOSE_PER_KG'
  | 'INVALID_CONCENTRATION'
  | 'INVALID_DOSE_MG';

export interface DoseInput {
  /** Poids du patient en kilogrammes. Doit être strictement positif. */
  weightKg: number;
  /** Dose recommandée en mg/kg. Doit être strictement positive. */
  doseMgPerKg: number;
  /** Dose maximale par administration, en mg (plafond). */
  maxDoseMg?: number;
  /** Dose maximale cumulée sur 24h, en mg. */
  maxDailyDoseMg?: number;
  /** Nombre de prises par jour, utilisé pour estimer la dose journalière. */
  frequencyPerDay?: number;
}

export interface DoseResult {
  /** Dose brute calculée (poids × mg/kg), avant plafonnement. */
  rawDoseMg: number;
  /** Dose finale après application éventuelle du plafond maxDoseMg. */
  doseMg: number;
  /** Vrai si la dose brute a été plafonnée à maxDoseMg. */
  wasCapped: boolean;
  /** Dose journalière estimée (doseMg × frequencyPerDay), si frequencyPerDay fourni. */
  dailyDoseMg?: number;
  /** Vrai si la dose journalière estimée dépasse maxDailyDoseMg. */
  exceedsMaxDailyDose: boolean;
}

export interface VolumeInput {
  /** Dose à administrer, en mg. */
  doseMg: number;
  /** Concentration de la préparation, en mg/mL. Doit être strictement positive. */
  concentrationMgPerMl: number;
}

export interface VolumeResult {
  /** Volume à administrer, en mL, arrondi à 2 décimales. */
  volumeMl: number;
}

export type SafetyLevel = 'ok' | 'warning' | 'danger';

export interface SafetyCheckResult {
  level: SafetyLevel;
  messages: string[];
}

export interface DoseExplanation {
  /** Formule littérale utilisée pour le calcul. */
  formula: string;
  weightKg: number;
  doseMgPerKg: number;
  rawDoseMg: number;
  doseMg: number;
  wasCapped: boolean;
  maxDoseMg?: number;
  maxDailyDoseMg?: number;
  dailyDoseMg?: number;
  frequencyPerDay?: number;
  /** Résumé en langage clair destiné à l'affichage. */
  summary: string;
}
