/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance UI,
 * aucun appel IA. Module pur, déterministe et testable.
 *
 * Projette un résultat d'évaluation V2 (`DosingRuleEvaluationResult`, statut
 * 'calculated') vers le type `Prescription` partagé avec le moteur V1, sans
 * recalculer ni reformuler aucune valeur clinique. Lève une erreur (jamais
 * un "best guess") si le résultat n'est pas dans un état exploitable pour
 * l'ordonnance — notamment les branches exprimées uniquement en volume (mL)
 * sans équivalent en mg dans le texte source, que le modèle `Prescription`
 * (calculatedDoseMg: number obligatoire) ne peut pas représenter.
 */
import type { Prescription, PrescriptionAlertRecord } from '../../types';
import type { DosingRuleEvaluationResult } from '../dosingRulesV2/types';

export class DosingRuleV2MappingError extends Error {}

export interface MapDosingRuleToPrescriptionInput {
  evaluation: DosingRuleEvaluationResult;
  patientWeightKg: number;
  patientAgeYears: number;
  /** Identifiant patient anonymisé, facultatif. Jamais un nom. */
  patientId?: string;
}

export function mapDosingRuleToPrescription(
  input: MapDosingRuleToPrescriptionInput,
): Omit<Prescription, 'date' | 'id'> {
  const { evaluation } = input;

  if (evaluation.status !== 'calculated' || evaluation.ruleId === undefined) {
    throw new DosingRuleV2MappingError(
      "Impossible de construire une prescription : le calcul V2 n'est pas dans l'état 'calculated'.",
    );
  }

  if (evaluation.doseMg === undefined) {
    throw new DosingRuleV2MappingError(
      'Cette dose est exprimée uniquement en volume (mL) par le texte source, sans équivalent en mg : ' +
        "ajout à l'ordonnance standard non disponible pour cette branche. Voir le texte validé et l'explication détaillée.",
    );
  }

  const alerts: PrescriptionAlertRecord[] = evaluation.warnings.map((w) => ({
    severity: 'warning',
    code: w.flags.join(','),
    message: w.warningText,
  }));

  return {
    drugId: evaluation.ruleId,
    drugName: evaluation.drugName ?? '',
    patientId: input.patientId,
    patientWeightKg: input.patientWeightKg,
    patientAgeYears: input.patientAgeYears,
    indication: evaluation.indication,
    calculatedDoseMg: evaluation.doseMg,
    alerts,
    source: evaluation.sourceName,
    explanationFormula: evaluation.doseText,
    explanationSummary: evaluation.explanation,
    engineVersion: 'v2',
  };
}
