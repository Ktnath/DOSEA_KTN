/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance UI,
 * aucun appel IA. Module pur, déterministe et testable.
 *
 * Construit l'enregistrement d'historique à partir du résultat du moteur de
 * dose (PrescriptionCalculationResult), sans recalculer ni reformuler quoi
 * que ce soit : ce module ne fait que projeter les champs déjà calculés.
 */
import type { PrescriptionCalculationResult } from '../dosing/calculatePrescription';
import type { Prescription, PrescriptionAlertRecord } from '../../types';

export interface BuildPrescriptionRecordInput {
  drugId: number;
  drugName: string;
  /** Identifiant patient anonymisé, facultatif. Ne doit jamais contenir de nom. */
  patientId?: string;
  patientWeightKg: number;
  patientAgeYears: number;
  /** Indication clinique retenue pour ce calcul, si disponible (ex: protocole). */
  indication?: string;
  /** Concentration utilisée pour le calcul du volume, si applicable. */
  concentrationMgPerMl?: number;
  /** Source / règle clinique justifiant la posologie (ex: notes du médicament). */
  source?: string;
  result: PrescriptionCalculationResult;
}

export function buildPrescriptionRecord(
  input: BuildPrescriptionRecordInput
): Omit<Prescription, 'date' | 'id'> {
  const alerts: PrescriptionAlertRecord[] = input.result.clinicalAlerts.map((a) => ({
    severity: a.severity,
    code: a.code,
    message: a.message,
  }));

  return {
    drugId: input.drugId,
    drugName: input.drugName,
    patientId: input.patientId,
    patientWeightKg: input.patientWeightKg,
    patientAgeYears: input.patientAgeYears,
    indication: input.indication,
    calculatedDoseMg: input.result.dose.doseMg,
    calculatedVolumeMl: input.result.volume?.volumeMl,
    concentrationMgPerMl: input.concentrationMgPerMl,
    alerts,
    source: input.source,
    explanationFormula: input.result.explanation.formula,
    explanationSummary: input.result.explanation.summary,
  };
}
