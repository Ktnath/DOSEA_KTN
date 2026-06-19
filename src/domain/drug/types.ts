import type { DilutionInfo } from '../../types';

/**
 * Modèle clinique versionné pour les médicaments (DrugV2).
 *
 * Ce module est additif : il ne remplace pas `Drug` (src/types.ts), qui reste
 * la source de vérité lue depuis `public/data/drugs.json`. DrugV2 est une
 * étape de migration progressive permettant de représenter, à terme :
 * plusieurs indications par médicament, plusieurs formes/concentrations,
 * une dose distincte par indication (avec bornes d'âge/poids, plafonds,
 * intervalle, durée, contre-indications, précautions) et une traçabilité
 * de la source clinique et de son statut de validation.
 */

/** Cycle de vie d'une donnée clinique, du brouillon à la désactivation. */
export type ValidationStatus = 'draft' | 'reviewed' | 'validated' | 'disabled';

/** Une forme galénique disponible pour un médicament (ex: suspension, comprimé, injectable). */
export interface DrugFormV2 {
  id: string;
  label: string;
  /** Voie(s) d'administration compatible(s) avec cette forme. */
  route: string;
  /** Concentration en mg/mL, pertinente pour les formes liquides. */
  concentrationMgPerMl?: number;
  /** Unité de la forme (ex: "mg", "mL", "UI"). */
  unit?: string;
}

/**
 * Une dose pour une indication clinique donnée. Chaque indication porte sa
 * propre traçabilité (source, date, statut de validation) car deux
 * indications d'un même médicament peuvent provenir de sources différentes
 * ou avoir des niveaux de revue clinique différents.
 */
export interface IndicationDoseV2 {
  id: string;
  /** Libellé clinique de l'indication (ex: "Sepsis néonatal"). */
  label: string;
  /** Voie d'administration utilisée pour cette indication. */
  route: string;

  /** Dose en mg/kg, si applicable. */
  doseMgPerKg?: number;
  /** Dose fixe en mg, si la posologie n'est pas pondérale. */
  doseFixedMg?: number;

  /** Bornes d'âge d'application de cette dose, en mois. */
  ageMinMonths?: number;
  ageMaxMonths?: number;
  /** Bornes de poids d'application de cette dose, en kg. */
  weightMinKg?: number;
  weightMaxKg?: number;

  /** Dose maximale autorisée par prise, en mg. */
  maxDosePerIntakeMg?: number;
  /** Dose maximale autorisée sur 24h, en mg. */
  maxDailyDoseMg?: number;
  /** Nombre de prises recommandé par jour. */
  frequencyPerDay?: number;
  /** Intervalle minimal entre deux prises, en heures. */
  intervalHours?: number;
  /** Durée indicative du traitement, en jours. */
  durationDays?: number;

  contraindications: string[];
  precautions: string[];

  /** Source clinique de cette dose (ex: "CHU Ste-Justine 2018"). Jamais déduite ni inventée. */
  source: string;
  /** Date de la source, au format ISO (YYYY-MM-DD), si connue. */
  sourceDate?: string;
  validationStatus: ValidationStatus;

  notes?: string;
}

/** Médicament au format clinique versionné, avec plusieurs formes et indications. */
export interface DrugV2 {
  id: string;
  /** Identifiant du Drug legacy d'origine, si ce DrugV2 a été migré automatiquement. */
  legacyId?: number;
  name: string;
  class: string;
  subClass?: string;
  system?: string;

  forms: DrugFormV2[];
  indications: IndicationDoseV2[];

  /** Info de dilution IV, reprise du modèle legacy (DilutionInfo de src/types.ts). */
  dilution?: DilutionInfo;
}
