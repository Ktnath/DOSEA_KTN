import { describe, expect, it } from 'vitest';
import { calculatePrescriptionV2 } from './calculatePrescriptionV2';

describe('calculatePrescriptionV2', () => {
  it('retourne evaluation + prescriptionRecord quand le calcul est résolu et exploitable en mg', () => {
    const result = calculatePrescriptionV2({
      drugName: 'paracetamol',
      weightKg: 10,
      route: 'Orale',
      postMenstrualAgeWeeks: 45,
      patientAgeYears: 2,
    });

    expect(result.evaluation.status).toBe('calculated');
    expect(result.prescriptionRecord).toBeDefined();
    expect(result.prescriptionRecord?.calculatedDoseMg).toBe(150);
    expect(result.prescriptionRecord?.engineVersion).toBe('v2');
    expect(result.prescriptionError).toBeUndefined();
  });

  it("ne retourne pas de prescriptionRecord quand un choix clinique est requis (n'invente jamais de valeur par défaut)", () => {
    const result = calculatePrescriptionV2({ drugName: 'paracetamol', weightKg: 10, patientAgeYears: 2 });

    expect(result.evaluation.status).toBe('requires_clinical_choice');
    expect(result.prescriptionRecord).toBeUndefined();
    expect(result.prescriptionError).toBeUndefined();
  });

  it('retourne not_found sans prescriptionRecord pour un médicament absent de la base', () => {
    const result = calculatePrescriptionV2({ drugName: 'molecule-inexistante-xyz', patientAgeYears: 2 });
    expect(result.evaluation.status).toBe('not_found');
    expect(result.prescriptionRecord).toBeUndefined();
  });

  it('retourne un prescriptionError explicite pour une branche exprimée uniquement en mL, sans bloquer l’affichage de l’évaluation', () => {
    const result = calculatePrescriptionV2({
      drugName: 'acetylcysteine',
      weightKg: 8,
      route: 'Rectal',
      patientAgeYears: 1,
    });

    expect(result.evaluation.status).toBe('calculated');
    expect(result.prescriptionRecord).toBeUndefined();
    expect(result.prescriptionError).toBeDefined();
    expect(result.prescriptionError).toContain('mL');
  });

  it("n'expose pas de prescriptionRecord si le poids du patient n'a pas été fourni", () => {
    const result = calculatePrescriptionV2({ drugName: 'paracetamol', route: 'Rectale', patientAgeYears: 2 });
    expect(result.prescriptionRecord).toBeUndefined();
  });
});
