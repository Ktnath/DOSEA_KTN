import { runClinicalSafetyChecks } from '../safety';
import type { ClinicalAlert } from '../safety';
import { calculateDose } from './calculateDose';
import { calculateVolume } from './calculateVolume';
import { checkDoseSafety } from './safetyChecks';
import { explainDose } from './explainDose';
import { DoseExplanation, DoseResult, SafetyCheckResult, VolumeResult } from './types';

/**
 * Entrée unique du calcul de prescription : regroupe le contexte patient, la
 * posologie du médicament et les éléments nécessaires aux alertes cliniques.
 */
export interface PrescriptionCalculationInput {
  weightKg: number;
  ageDays?: number;

  doseMgPerKg: number;
  maxDoseMg?: number;
  maxDailyDoseMg?: number;
  frequencyPerDay?: number;
  intervalHours?: number;
  concentrationMgPerMl?: number;

  drugName?: string;
  drugClass?: string;
  drugSubClass?: string;
}

export interface PrescriptionCalculationResult {
  dose: DoseResult;
  volume?: VolumeResult;
  doseSafety: SafetyCheckResult;
  explanation: DoseExplanation;
  clinicalAlerts: ClinicalAlert[];
}

/**
 * Point d'entrée unique pour la page Calculator : compose le moteur de dose
 * (src/domain/dosing) et le ClinicalSafetyEngine (src/domain/safety) en un
 * seul résultat exploitable par l'UI. Aucun calcul n'est effectué ici en
 * dehors de l'appel aux fonctions pures déjà testées de ces deux moteurs.
 */
export function calculatePrescription(
  input: PrescriptionCalculationInput
): PrescriptionCalculationResult {
  const doseInput = {
    weightKg: input.weightKg,
    doseMgPerKg: input.doseMgPerKg,
    maxDoseMg: input.maxDoseMg,
    maxDailyDoseMg: input.maxDailyDoseMg,
    frequencyPerDay: input.frequencyPerDay,
  };

  const dose = calculateDose(doseInput);
  const doseSafety = checkDoseSafety(dose);
  const explanation = explainDose(doseInput, dose);

  const volume =
    input.concentrationMgPerMl !== undefined
      ? calculateVolume({ doseMg: dose.doseMg, concentrationMgPerMl: input.concentrationMgPerMl })
      : undefined;

  const clinicalAlerts = runClinicalSafetyChecks({
    weightKg: input.weightKg,
    ageDays: input.ageDays,
    drugName: input.drugName,
    drugClass: input.drugClass,
    drugSubClass: input.drugSubClass,
    doseMg: dose.doseMg,
    maxDoseMg: input.maxDoseMg,
    dailyDoseMg: dose.dailyDoseMg,
    maxDailyDoseMg: input.maxDailyDoseMg,
    concentrationMgPerMl: input.concentrationMgPerMl,
  });

  return { dose, volume, doseSafety, explanation, clinicalAlerts };
}
