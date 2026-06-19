import { describe, expect, it } from 'vitest';
import { calculatePrescription } from './calculatePrescription';
import { DosingError } from './types';

describe('calculatePrescription', () => {
  it('calcule la dose, le résumé et ne renvoie aucun volume sans concentration', () => {
    const result = calculatePrescription({ weightKg: 10, doseMgPerKg: 15 });

    expect(result.dose.doseMg).toBe(150);
    expect(result.dose.wasCapped).toBe(false);
    expect(result.volume).toBeUndefined();
    expect(result.doseSafety.level).toBe('ok');
    expect(result.explanation.formula).toBe('150 mg = 10 kg × 15 mg/kg');
    expect(result.clinicalAlerts).toHaveLength(0);
  });

  it('calcule le volume en mL quand la concentration est fournie', () => {
    const result = calculatePrescription({
      weightKg: 10,
      doseMgPerKg: 15,
      concentrationMgPerMl: 30,
    });

    expect(result.volume?.volumeMl).toBe(5);
  });

  it('plafonne la dose et remonte une alerte warning de dépassement', () => {
    const result = calculatePrescription({
      weightKg: 100,
      doseMgPerKg: 15,
      maxDoseMg: 1000,
    });

    expect(result.dose.doseMg).toBe(1000);
    expect(result.dose.wasCapped).toBe(true);
    expect(result.doseSafety.level).toBe('warning');
  });

  it('remonte une alerte danger pour la dose journalière maximale dépassée', () => {
    const result = calculatePrescription({
      weightKg: 10,
      doseMgPerKg: 15,
      frequencyPerDay: 4,
      maxDailyDoseMg: 500,
    });

    expect(result.dose.dailyDoseMg).toBe(600);
    expect(result.doseSafety.level).toBe('danger');
    const codes = result.clinicalAlerts.map((a) => a.code);
    expect(codes).toContain('DAILY_DOSE_EXCEEDS_MAX');
  });

  it('remonte une alerte nouveau-né quand ageDays < 28', () => {
    const result = calculatePrescription({
      weightKg: 3,
      doseMgPerKg: 15,
      ageDays: 5,
    });

    const codes = result.clinicalAlerts.map((a) => a.code);
    expect(codes).toContain('AGE_NEWBORN');
  });

  it('remonte une alerte danger ceftriaxone chez le nouveau-né', () => {
    const result = calculatePrescription({
      weightKg: 3,
      doseMgPerKg: 50,
      ageDays: 5,
      drugName: 'Ceftriaxone',
    });

    const codes = result.clinicalAlerts.map((a) => a.code);
    expect(codes).toContain('CEFTRIAXONE_NEONATAL_CONTRAINDICATION');
  });

  it('propage une DosingError si le poids est invalide', () => {
    expect(() => calculatePrescription({ weightKg: 0, doseMgPerKg: 15 })).toThrow(DosingError);
  });
});
