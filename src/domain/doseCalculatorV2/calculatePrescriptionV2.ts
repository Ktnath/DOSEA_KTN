/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance IA.
 * Point d'entrée unique pour l'UI côté V2 : exécute l'évaluation
 * déterministe (`evaluateDosingRule`) puis, uniquement si le statut est
 * 'calculated' et que la dose est exploitable pour l'ordonnance, construit
 * l'enregistrement `Prescription` correspondant via `mapDosingRuleToPrescription`.
 * Ne lève jamais d'exception pour un statut clinique normal (calculated /
 * requires_clinical_choice / blocked / not_found) : seule l'absence de mg
 * exploitable sur un résultat 'calculated' est signalée via
 * `prescriptionError`, pour permettre à l'UI d'afficher un message clair
 * sans bloquer l'affichage du texte validé et de l'explication.
 */
import { evaluateDosingRule } from '../dosingRulesV2/evaluateDosingRule';
import type { DosingRuleEvaluationInput, DosingRuleEvaluationResult } from '../dosingRulesV2/types';
import type { Prescription } from '../../types';
import { DosingRuleV2MappingError, mapDosingRuleToPrescription } from './mapDosingRuleToPrescription';

export interface CalculatePrescriptionV2Input extends DosingRuleEvaluationInput {
  patientId?: string;
  patientAgeYears: number;
}

export interface CalculatePrescriptionV2Result {
  evaluation: DosingRuleEvaluationResult;
  /** Présent uniquement quand evaluation.status === 'calculated' et que la dose est exploitable pour l'ordonnance (en mg). */
  prescriptionRecord?: Omit<Prescription, 'date' | 'id'>;
  /** Message expliquant pourquoi prescriptionRecord est absent malgré un statut 'calculated' (ex: dose exprimée uniquement en mL). */
  prescriptionError?: string;
}

export function calculatePrescriptionV2(input: CalculatePrescriptionV2Input): CalculatePrescriptionV2Result {
  const { patientId, patientAgeYears, ...evaluationInput } = input;
  const evaluation = evaluateDosingRule(evaluationInput);

  if (evaluation.status !== 'calculated' || evaluationInput.weightKg === undefined) {
    return { evaluation };
  }

  try {
    const prescriptionRecord = mapDosingRuleToPrescription({
      evaluation,
      patientWeightKg: evaluationInput.weightKg,
      patientAgeYears,
      patientId,
    });
    return { evaluation, prescriptionRecord };
  } catch (error) {
    if (error instanceof DosingRuleV2MappingError) {
      return { evaluation, prescriptionError: error.message };
    }
    throw error;
  }
}
