import { describe, expect, it } from 'vitest';
import { calculatePrescription } from '../dosing/calculatePrescription';
import { buildPrescriptionRecord } from './buildPrescriptionRecord';

describe('buildPrescriptionRecord', () => {
  it('projette le résultat du moteur de dose sans rien recalculer', () => {
    const result = calculatePrescription({
      weightKg: 10,
      doseMgPerKg: 15,
      maxDoseMg: 1000,
      concentrationMgPerMl: 30,
      drugName: 'Paracétamol',
    });

    const record = buildPrescriptionRecord({
      drugId: 1,
      drugName: 'Paracétamol',
      patientWeightKg: 10,
      patientAgeYears: 2,
      indication: 'Fièvre',
      concentrationMgPerMl: 30,
      source: 'Notes officielles du médicament',
      result,
    });

    expect(record.drugId).toBe(1);
    expect(record.drugName).toBe('Paracétamol');
    expect(record.patientId).toBeUndefined();
    expect(record.patientWeightKg).toBe(10);
    expect(record.patientAgeYears).toBe(2);
    expect(record.indication).toBe('Fièvre');
    expect(record.calculatedDoseMg).toBe(result.dose.doseMg);
    expect(record.calculatedVolumeMl).toBe(result.volume?.volumeMl);
    expect(record.concentrationMgPerMl).toBe(30);
    expect(record.source).toBe('Notes officielles du médicament');
    expect(record.explanationFormula).toBe(result.explanation.formula);
    expect(record.explanationSummary).toBe(result.explanation.summary);
    expect(record.alerts).toEqual([]);
  });

  it('inclut un identifiant patient anonymisé optionnel et les alertes cliniques', () => {
    const result = calculatePrescription({
      weightKg: 2,
      ageDays: 5,
      doseMgPerKg: 50,
      maxDoseMg: 1000,
      drugName: 'Ceftriaxone',
      drugClass: 'Antibiotique',
    });

    const record = buildPrescriptionRecord({
      drugId: 2,
      drugName: 'Ceftriaxone',
      patientId: 'ANON-0F3A',
      patientWeightKg: 2,
      patientAgeYears: 0,
      result,
    });

    expect(record.patientId).toBe('ANON-0F3A');
    expect(record.alerts?.length).toBe(result.clinicalAlerts.length);
    expect(record.alerts?.[0]).toEqual({
      severity: result.clinicalAlerts[0].severity,
      code: result.clinicalAlerts[0].code,
      message: result.clinicalAlerts[0].message,
    });
  });

  it('est sérialisable en JSON (round-trip) pour la persistance locale', () => {
    const result = calculatePrescription({ weightKg: 10, doseMgPerKg: 15 });

    const record = buildPrescriptionRecord({
      drugId: 3,
      drugName: 'Ibuprofène',
      patientWeightKg: 10,
      patientAgeYears: 3,
      result,
    });

    const serialized = JSON.stringify(record);
    const parsed = JSON.parse(serialized);

    expect(parsed).toEqual(record);
  });
});
