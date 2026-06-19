import { DoseInput, DoseResult, DoseExplanation } from './types';

/** Construit une explication traçable du calcul : formule, dose/kg, plafond, fréquence. */
export function explainDose(input: DoseInput, result: DoseResult): DoseExplanation {
  const { weightKg, doseMgPerKg, maxDoseMg, maxDailyDoseMg, frequencyPerDay } = input;
  const { rawDoseMg, doseMg, wasCapped, dailyDoseMg } = result;

  const formula = `${doseMg} mg = ${weightKg} kg × ${doseMgPerKg} mg/kg`;

  const summary = wasCapped
    ? `Dose calculée à ${rawDoseMg} mg, plafonnée à ${doseMg} mg (maximum autorisé : ${maxDoseMg} mg).`
    : `Dose calculée : ${doseMg} mg (${weightKg} kg × ${doseMgPerKg} mg/kg).`;

  return {
    formula,
    weightKg,
    doseMgPerKg,
    rawDoseMg,
    doseMg,
    wasCapped,
    maxDoseMg,
    maxDailyDoseMg,
    dailyDoseMg,
    frequencyPerDay,
    summary,
  };
}
