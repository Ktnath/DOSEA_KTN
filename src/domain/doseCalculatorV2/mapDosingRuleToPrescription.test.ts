import { describe, expect, it } from 'vitest';
import { evaluateDosingRule } from '../dosingRulesV2/evaluateDosingRule';
import { DosingRuleV2MappingError, mapDosingRuleToPrescription } from './mapDosingRuleToPrescription';

describe('mapDosingRuleToPrescription', () => {
  it('projette un résultat calculated vers un enregistrement Prescription complet, sans recalculer aucune valeur', () => {
    const evaluation = evaluateDosingRule({
      drugName: 'paracetamol',
      weightKg: 10,
      route: 'Orale',
      postMenstrualAgeWeeks: 45,
    });

    const record = mapDosingRuleToPrescription({
      evaluation,
      patientWeightKg: 10,
      patientAgeYears: 2,
      patientId: 'ANON-1',
    });

    expect(record.drugId).toBe('dosea_v2_001_paracetamol');
    expect(record.drugName).toBe('Paracétamol');
    expect(record.calculatedDoseMg).toBe(150);
    expect(record.patientWeightKg).toBe(10);
    expect(record.patientAgeYears).toBe(2);
    expect(record.patientId).toBe('ANON-1');
    expect(record.engineVersion).toBe('v2');
    expect(record.source).toBe('CHU Ste-Justine 2018');
    expect(record.explanationFormula).toBe('100-150 mg');
    expect(record.explanationSummary).toContain('Texte validé (source)');
  });

  it('reporte les alertes cliniques sans en perdre ni en reformuler le texte (CLAUDE.md: ne supprime aucune alerte)', () => {
    const evaluation = evaluateDosingRule({
      drugName: 'paracetamol',
      weightKg: 10,
      route: 'Orale',
      postMenstrualAgeWeeks: 45,
    });

    const record = mapDosingRuleToPrescription({ evaluation, patientWeightKg: 10, patientAgeYears: 2 });

    expect(record.alerts).toHaveLength(evaluation.warnings.length);
    expect(record.alerts?.[0].message).toBe(evaluation.warnings[0].warningText);
  });

  it("lève une DosingRuleV2MappingError quand le statut n'est pas 'calculated'", () => {
    const evaluation = evaluateDosingRule({ drugName: 'paracetamol', weightKg: 10 });
    expect(evaluation.status).toBe('requires_clinical_choice');

    expect(() => mapDosingRuleToPrescription({ evaluation, patientWeightKg: 10, patientAgeYears: 2 })).toThrow(
      DosingRuleV2MappingError,
    );
  });

  it('lève une DosingRuleV2MappingError pour une branche exprimée uniquement en mL (sans équivalent mg dans la source)', () => {
    const evaluation = evaluateDosingRule({
      drugName: 'acetylcysteine',
      weightKg: 8,
      route: 'Rectal',
    });
    expect(evaluation.status).toBe('calculated');
    expect(evaluation.doseMg).toBeUndefined();

    expect(() => mapDosingRuleToPrescription({ evaluation, patientWeightKg: 8, patientAgeYears: 1 })).toThrow(
      DosingRuleV2MappingError,
    );
  });
});
