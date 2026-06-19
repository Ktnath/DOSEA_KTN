import { AlertSeverity, ClinicalAlert, ClinicalSafetyInput } from './types';

const NEONATAL_AGE_MAX_DAYS = 28;
const VERY_LOW_WEIGHT_KG = 2.5;

const AMINOGLYCOSIDE_PATTERN = /aminosid|aminoglycosid/i;
const CEFTRIAXONE_PATTERN = /ceftriaxone/i;

function alert(
  severity: AlertSeverity,
  code: string,
  message: string,
  extra?: { rationale?: string; source?: string }
): ClinicalAlert {
  return { severity, code, message, ...extra };
}

function checkWeight(input: ClinicalSafetyInput): ClinicalAlert[] {
  const { weightKg } = input;

  if (weightKg <= 0) {
    return [
      alert('blocker', 'WEIGHT_INVALID', 'Le poids du patient doit être strictement positif.'),
    ];
  }

  if (weightKg < VERY_LOW_WEIGHT_KG) {
    return [
      alert(
        'warning',
        'WEIGHT_VERY_LOW_NEONATAL',
        `Poids très bas (${weightKg} kg) : vérifier la posologie néonatale adaptée.`,
        { rationale: 'Un poids inférieur à 2,5 kg correspond à un nouveau-né de faible poids, pour lequel les posologies standards peuvent ne pas s\'appliquer.' }
      ),
    ];
  }

  return [];
}

function checkAge(input: ClinicalSafetyInput): ClinicalAlert[] {
  if (input.ageDays === undefined || input.ageDays >= NEONATAL_AGE_MAX_DAYS) {
    return [];
  }

  return [
    alert(
      'warning',
      'AGE_NEWBORN',
      `Patient nouveau-né (${input.ageDays} jour(s)) : vérifier les posologies et contre-indications spécifiques au nouveau-né.`,
      { rationale: 'Avant 28 jours de vie, la maturation rénale et hépatique est incomplète, ce qui modifie la pharmacocinétique de nombreux médicaments.' }
    ),
  ];
}

function checkMaxDose(input: ClinicalSafetyInput): ClinicalAlert[] {
  const { doseMg, maxDoseMg } = input;

  if (doseMg === undefined || maxDoseMg === undefined || doseMg <= maxDoseMg) {
    return [];
  }

  return [
    alert(
      'danger',
      'DOSE_EXCEEDS_MAX',
      `La dose calculée (${doseMg} mg) dépasse la dose maximale autorisée par administration (${maxDoseMg} mg).`
    ),
  ];
}

function checkMaxDailyDose(input: ClinicalSafetyInput): ClinicalAlert[] {
  const { dailyDoseMg, maxDailyDoseMg } = input;

  if (dailyDoseMg === undefined || maxDailyDoseMg === undefined || dailyDoseMg <= maxDailyDoseMg) {
    return [];
  }

  return [
    alert(
      'danger',
      'DAILY_DOSE_EXCEEDS_MAX',
      `La dose journalière estimée (${dailyDoseMg} mg) dépasse la dose maximale journalière autorisée (${maxDailyDoseMg} mg).`
    ),
  ];
}

function checkConcentrationForVolume(input: ClinicalSafetyInput): ClinicalAlert[] {
  if (!input.wantsVolume || input.concentrationMgPerMl !== undefined) {
    return [];
  }

  return [
    alert(
      'blocker',
      'CONCENTRATION_MISSING_FOR_VOLUME',
      'Impossible de calculer un volume en mL : la concentration de la préparation est inconnue.'
    ),
  ];
}

function checkCeftriaxoneNeonatal(input: ClinicalSafetyInput): ClinicalAlert[] {
  const { drugName, ageDays } = input;

  if (!drugName || !CEFTRIAXONE_PATTERN.test(drugName)) {
    return [];
  }

  if (ageDays === undefined || ageDays >= NEONATAL_AGE_MAX_DAYS) {
    return [];
  }

  return [
    alert(
      'danger',
      'CEFTRIAXONE_NEONATAL_CONTRAINDICATION',
      'Ceftriaxone chez un nouveau-né (< 28 jours) : vérifier les contre-indications néonatales avant administration.',
      {
        rationale:
          'La ceftriaxone est contre-indiquée chez le nouveau-né, notamment en cas d\'administration concomitante (ou rapprochée) de calcium IV, en raison du risque de précipitation calcique potentiellement fatale. Risque accru d\'ictère nucléaire par compétition avec la bilirubine sur l\'albumine.',
      }
    ),
  ];
}

function checkAminoglycosideMonitoring(input: ClinicalSafetyInput): ClinicalAlert[] {
  const { drugClass, drugSubClass } = input;
  const isAminoglycoside =
    (!!drugClass && AMINOGLYCOSIDE_PATTERN.test(drugClass)) ||
    (!!drugSubClass && AMINOGLYCOSIDE_PATTERN.test(drugSubClass));

  if (!isAminoglycoside) {
    return [];
  }

  return [
    alert(
      'warning',
      'AMINOGLYCOSIDE_MONITORING',
      'Aminoside : surveillance de la fonction rénale et dosage thérapeutique (TDM) recommandés.',
      {
        rationale:
          'Les aminosides présentent une marge thérapeutique étroite et un risque de néphrotoxicité et d\'ototoxicité ; un suivi de la fonction rénale et, si possible, un dosage des concentrations plasmatiques (therapeutic drug monitoring) sont recommandés.',
      }
    ),
  ];
}

/**
 * Génère les alertes de sécurité clinique autour d'un calcul de dose.
 *
 * Moteur pur et déterministe : aucune dépendance React, aucun appel IA. Les
 * alertes renvoyées ne se substituent pas au jugement clinique du
 * professionnel de santé et ne remplacent ni n'inventent aucune posologie.
 */
export function runClinicalSafetyChecks(input: ClinicalSafetyInput): ClinicalAlert[] {
  return [
    ...checkWeight(input),
    ...checkAge(input),
    ...checkMaxDose(input),
    ...checkMaxDailyDose(input),
    ...checkConcentrationForVolume(input),
    ...checkCeftriaxoneNeonatal(input),
    ...checkAminoglycosideMonitoring(input),
  ];
}
