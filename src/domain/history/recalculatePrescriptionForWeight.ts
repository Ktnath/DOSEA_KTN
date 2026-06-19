/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance UI,
 * aucun appel IA. Module pur, déterministe et testable.
 *
 * Recalcule une prescription active suite à un changement de poids/âge en
 * passant systématiquement par calculatePrescription : aucune dose n'est
 * recalculée manuellement ici.
 */
import { calculatePrescription } from '../dosing/calculatePrescription';
import { buildPrescriptionRecord } from './buildPrescriptionRecord';
import type { Drug, Prescription } from '../../types';

export interface RecalculatePrescriptionForWeightInput {
  prescription: Prescription & { drug: Drug };
  weightKg: number;
  ageYears?: number | null;
}

/** Peut lever une DosingError (src/domain/dosing/types) si les entrées sont invalides. */
export function recalculatePrescriptionForWeight(
  input: RecalculatePrescriptionForWeightInput
): Prescription & { drug: Drug } {
  const { prescription, weightKg, ageYears } = input;
  const drug = prescription.drug;

  const result = calculatePrescription({
    weightKg,
    ageDays: ageYears != null ? Math.round(ageYears * 365.25) : undefined,
    doseMgPerKg: drug.recommendedDoseMgPerKg,
    maxDoseMg: drug.maxDoseMg,
    maxDailyDoseMg: drug.maxDailyDoseMg,
    frequencyPerDay: drug.frequencyPerDay,
    intervalHours: drug.minIntervalHours,
    concentrationMgPerMl: drug.concentrationMgPerMl,
    drugName: drug.name,
    drugClass: drug.class,
    drugSubClass: drug.subClass,
  });

  const record = buildPrescriptionRecord({
    drugId: prescription.drugId,
    drugName: prescription.drugName,
    patientId: prescription.patientId,
    patientWeightKg: weightKg,
    patientAgeYears: ageYears ?? prescription.patientAgeYears,
    indication: prescription.indication,
    concentrationMgPerMl: prescription.concentrationMgPerMl,
    source: prescription.source,
    result,
  });

  return {
    ...prescription,
    ...record,
    drug,
  };
}
