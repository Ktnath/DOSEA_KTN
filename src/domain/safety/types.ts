/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance UI,
 * aucun appel IA. Module pur, déterministe et testable.
 */

/** Niveau de criticité d'une alerte clinique, du simple repère au blocage. */
export type AlertSeverity = 'info' | 'warning' | 'danger' | 'blocker';

/** Une alerte de sécurité générée autour d'un calcul de dose. */
export interface ClinicalAlert {
  severity: AlertSeverity;
  /** Identifiant stable de la règle ayant déclenché l'alerte (ex: "AGE_NEWBORN"). */
  code: string;
  /** Message destiné à l'affichage à l'utilisateur. */
  message: string;
  /** Explication clinique du pourquoi de l'alerte, si utile. */
  rationale?: string;
  /** Référence de la source clinique justifiant la règle, si applicable. */
  source?: string;
}

/** Entrée du moteur de sécurité clinique : contexte patient, médicament et dose calculée. */
export interface ClinicalSafetyInput {
  /** Poids du patient en kilogrammes. */
  weightKg: number;
  /** Âge du patient en jours, si connu (nécessaire pour détecter un nouveau-né). */
  ageDays?: number;

  /** Nom du médicament, utilisé pour les règles spécifiques (ex: ceftriaxone). */
  drugName?: string;
  /** Classe thérapeutique du médicament (ex: "Antibiotique"). */
  drugClass?: string;
  /** Sous-classe thérapeutique du médicament (ex: "Aminoside"). */
  drugSubClass?: string;

  /** Dose calculée pour une administration, en mg. */
  doseMg?: number;
  /** Dose maximale autorisée par administration, en mg. */
  maxDoseMg?: number;
  /** Dose journalière estimée, en mg. */
  dailyDoseMg?: number;
  /** Dose maximale journalière autorisée, en mg. */
  maxDailyDoseMg?: number;

  /** Vrai si l'utilisateur souhaite un volume en mL plutôt qu'une dose en mg. */
  wantsVolume?: boolean;
  /** Concentration de la préparation, en mg/mL, si disponible. */
  concentrationMgPerMl?: number;
}
