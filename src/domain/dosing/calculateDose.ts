import { DoseInput, DoseResult, DosingError } from './types';

/**
 * Calcule la dose en mg à partir du poids et de la dose recommandée en mg/kg.
 *
 * Règle de plafonnement choisie : si la dose brute dépasse maxDoseMg, la dose
 * finale est plafonnée à maxDoseMg (comportement déterministe et sécuritaire),
 * et `wasCapped` est renseigné pour permettre à l'appelant de signaler le
 * plafonnement (voir safetyChecks.ts pour l'alerte associée).
 */
export function calculateDose(input: DoseInput): DoseResult {
  const { weightKg, doseMgPerKg, maxDoseMg, maxDailyDoseMg, frequencyPerDay } = input;

  if (!(weightKg > 0)) {
    throw new DosingError('INVALID_WEIGHT', 'Le poids du patient doit être strictement positif.');
  }

  if (!(doseMgPerKg > 0)) {
    throw new DosingError(
      'INVALID_DOSE_PER_KG',
      'La dose recommandée (mg/kg) doit être strictement positive.'
    );
  }

  const rawDoseMg = weightKg * doseMgPerKg;
  const wasCapped = maxDoseMg !== undefined && rawDoseMg > maxDoseMg;
  const doseMg = wasCapped ? (maxDoseMg as number) : rawDoseMg;

  let dailyDoseMg: number | undefined;
  let exceedsMaxDailyDose = false;
  if (frequencyPerDay !== undefined) {
    dailyDoseMg = doseMg * frequencyPerDay;
    if (maxDailyDoseMg !== undefined && dailyDoseMg > maxDailyDoseMg) {
      exceedsMaxDailyDose = true;
    }
  }

  return {
    rawDoseMg,
    doseMg,
    wasCapped,
    dailyDoseMg,
    exceedsMaxDailyDose,
  };
}
