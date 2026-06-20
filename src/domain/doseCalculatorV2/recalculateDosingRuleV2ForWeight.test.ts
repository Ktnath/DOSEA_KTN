import { describe, expect, it } from 'vitest';
import type { Prescription } from '../../types';
import { DosingRuleV2MappingError } from './mapDosingRuleToPrescription';
import { recalculateDosingRuleV2ForWeight } from './recalculateDosingRuleV2ForWeight';

function basePrescription(): Prescription {
  return {
    drugId: 'dosea_v2_001_paracetamol',
    drugName: 'Paracétamol',
    patientWeightKg: 10,
    patientAgeYears: 2,
    calculatedDoseMg: 150,
    source: 'CHU Ste-Justine 2018',
    explanationFormula: '100-150 mg',
    explanationSummary: 'x',
    engineVersion: 'v2',
    date: new Date().toISOString(),
  };
}

describe('recalculateDosingRuleV2ForWeight', () => {
  it('recalcule la dose proportionnellement au nouveau poids en repassant par evaluateDosingRule, sans calcul manuel', () => {
    const updated = recalculateDosingRuleV2ForWeight({
      prescription: basePrescription(),
      v2Input: { drugName: 'paracetamol', route: 'Orale', postMenstrualAgeWeeks: 45 },
      weightKg: 20,
      ageYears: 3,
    });

    expect(updated.calculatedDoseMg).toBe(300);
    expect(updated.patientWeightKg).toBe(20);
    expect(updated.patientAgeYears).toBe(3);
    expect(updated.drugId).toBe('dosea_v2_001_paracetamol');
  });

  it('conserve le contexte clinique déjà retenu (voie, âge postmenstruel) lors du recalcul, sans redemander de choix clinique', () => {
    const updated = recalculateDosingRuleV2ForWeight({
      prescription: basePrescription(),
      v2Input: { drugName: 'paracetamol', route: 'Rectale' },
      weightKg: 5,
    });

    expect(updated.calculatedDoseMg).toBe(100);
  });

  it('lève une DosingRuleV2MappingError si le nouveau poids fait perdre la résolution automatique de la branche (choix clinique requis)', () => {
    expect(() =>
      recalculateDosingRuleV2ForWeight({
        prescription: basePrescription(),
        v2Input: { drugName: 'paracetamol' },
        weightKg: 20,
      }),
    ).toThrow(DosingRuleV2MappingError);
  });
});
