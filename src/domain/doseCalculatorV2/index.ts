/** Point d'entrée de l'adaptateur entre le moteur V2 (src/domain/dosingRulesV2) et le modèle Prescription partagé avec le moteur V1. */

export { calculatePrescriptionV2 } from './calculatePrescriptionV2';
export type { CalculatePrescriptionV2Input, CalculatePrescriptionV2Result } from './calculatePrescriptionV2';

export { DosingRuleV2MappingError, mapDosingRuleToPrescription } from './mapDosingRuleToPrescription';
export type { MapDosingRuleToPrescriptionInput } from './mapDosingRuleToPrescription';

export { recalculateDosingRuleV2ForWeight } from './recalculateDosingRuleV2ForWeight';
export type { RecalculateDosingRuleV2ForWeightInput } from './recalculateDosingRuleV2ForWeight';
