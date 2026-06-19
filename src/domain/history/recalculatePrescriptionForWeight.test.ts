import { describe, expect, it } from 'vitest';
import { recalculatePrescriptionForWeight } from './recalculatePrescriptionForWeight';
import { DosingError } from '../dosing/types';
import type { Drug, Prescription } from '../../types';

const drug: Drug = {
  id: 1,
  name: 'Paracétamol',
  class: 'Antalgique',
  recommendedDoseMgPerKg: 15,
  maxDoseMg: 1000,
  concentrationMgPerMl: 30,
  route: 'PO',
};

const basePrescription: Prescription & { drug: Drug } = {
  drugId: 1,
  drugName: 'Paracétamol',
  patientWeightKg: 10,
  patientAgeYears: 2,
  indication: 'Fièvre',
  calculatedDoseMg: 150,
  calculatedVolumeMl: 5,
  concentrationMgPerMl: 30,
  source: 'Notes officielles du médicament',
  explanationFormula: '10 x 15',
  explanationSummary: 'ancien résumé',
  date: '2024-01-01T00:00:00.000Z',
  drug,
};

describe('recalculatePrescriptionForWeight', () => {
  it('recalcule la dose et le volume via le moteur déterministe lors d\'un changement de poids', () => {
    const updated = recalculatePrescriptionForWeight({
      prescription: basePrescription,
      weightKg: 20,
      ageYears: 3,
    });

    expect(updated.calculatedDoseMg).toBe(300);
    expect(updated.calculatedVolumeMl).toBe(10);
    expect(updated.patientWeightKg).toBe(20);
    expect(updated.patientAgeYears).toBe(3);
    expect(updated.drugId).toBe(basePrescription.drugId);
    expect(updated.drugName).toBe(basePrescription.drugName);
    expect(updated.indication).toBe(basePrescription.indication);
    expect(updated.source).toBe(basePrescription.source);
    expect(updated.drug).toBe(drug);
  });

  it('plafonne via le moteur déterministe au lieu d\'un calcul manuel', () => {
    const updated = recalculatePrescriptionForWeight({
      prescription: basePrescription,
      weightKg: 100,
      ageYears: 3,
    });

    expect(updated.calculatedDoseMg).toBe(1000);
  });

  it('lève une DosingError pour un poids invalide sans modifier la prescription appelante', () => {
    expect(() =>
      recalculatePrescriptionForWeight({
        prescription: basePrescription,
        weightKg: 0,
        ageYears: 3,
      })
    ).toThrow(DosingError);

    expect(basePrescription.calculatedDoseMg).toBe(150);
  });
});
