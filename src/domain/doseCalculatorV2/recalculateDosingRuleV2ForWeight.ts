/**
 * Domaine clinique isolé : aucune dépendance React, aucune dépendance IA.
 * Module pur, déterministe et testable.
 *
 * Recalcule une prescription V2 active suite à un changement de poids/âge en
 * repassant systématiquement par `evaluateDosingRule` avec le contexte
 * clinique (route, indication, âges) déjà retenu lors de l'ajout initial à
 * l'ordonnance : aucune dose n'est recalculée manuellement ici, et aucun
 * choix clinique déjà fait par le praticien n'est ré-ouvert silencieusement.
 */
import { evaluateDosingRule } from '../dosingRulesV2/evaluateDosingRule';
import type { DosingRuleEvaluationInput } from '../dosingRulesV2/types';
import type { Prescription } from '../../types';
import { DosingRuleV2MappingError, mapDosingRuleToPrescription } from './mapDosingRuleToPrescription';

export interface RecalculateDosingRuleV2ForWeightInput {
  prescription: Prescription;
  /** Contexte clinique (route, indication, âges) déjà retenu lors de l'ajout initial à l'ordonnance. */
  v2Input: DosingRuleEvaluationInput;
  weightKg: number;
  ageYears?: number | null;
}

/**
 * Peut lever une DosingRuleV2MappingError si le nouveau poids ne permet plus
 * de recalculer automatiquement la dose (ex: bascule vers une branche
 * désormais ambiguë, ou exprimée uniquement en mL).
 */
export function recalculateDosingRuleV2ForWeight(
  input: RecalculateDosingRuleV2ForWeightInput,
): Prescription {
  const { prescription, v2Input, weightKg, ageYears } = input;

  const evaluation = evaluateDosingRule({ ...v2Input, weightKg });

  if (evaluation.status !== 'calculated') {
    throw new DosingRuleV2MappingError(
      `Le nouveau poids (${weightKg} kg) ne permet plus de calculer cette dose automatiquement ` +
        `(statut: ${evaluation.status}). Retirez ce médicament et ré-ajoutez-le après avoir précisé les informations cliniques nécessaires.`,
    );
  }

  const record = mapDosingRuleToPrescription({
    evaluation,
    patientWeightKg: weightKg,
    patientAgeYears: ageYears ?? prescription.patientAgeYears,
    patientId: prescription.patientId,
  });

  return {
    ...prescription,
    ...record,
  };
}
