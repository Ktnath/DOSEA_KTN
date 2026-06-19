import { describe, expect, it } from 'vitest';
import { calculateDose } from './calculateDose';
import { DosingError } from './types';

describe('calculateDose', () => {
  it('calcule 150 mg pour du Paracétamol 15 mg/kg chez un patient de 10 kg', () => {
    const result = calculateDose({ weightKg: 10, doseMgPerKg: 15 });
    expect(result.doseMg).toBe(150);
    expect(result.rawDoseMg).toBe(150);
    expect(result.wasCapped).toBe(false);
  });

  it('plafonne la dose si elle dépasse maxDoseMg', () => {
    const result = calculateDose({ weightKg: 100, doseMgPerKg: 15, maxDoseMg: 1000 });
    expect(result.rawDoseMg).toBe(1500);
    expect(result.doseMg).toBe(1000);
    expect(result.wasCapped).toBe(true);
  });

  it("ne plafonne pas si la dose est égale ou inférieure à maxDoseMg", () => {
    const result = calculateDose({ weightKg: 10, doseMgPerKg: 15, maxDoseMg: 1000 });
    expect(result.doseMg).toBe(150);
    expect(result.wasCapped).toBe(false);
  });

  it('signale un dépassement de la dose journalière maximale', () => {
    const result = calculateDose({
      weightKg: 10,
      doseMgPerKg: 15,
      frequencyPerDay: 4,
      maxDailyDoseMg: 500,
    });
    expect(result.dailyDoseMg).toBe(600);
    expect(result.exceedsMaxDailyDose).toBe(true);
  });

  it('ne signale pas de dépassement journalier si la dose quotidienne reste dans la limite', () => {
    const result = calculateDose({
      weightKg: 10,
      doseMgPerKg: 15,
      frequencyPerDay: 4,
      maxDailyDoseMg: 3000,
    });
    expect(result.dailyDoseMg).toBe(600);
    expect(result.exceedsMaxDailyDose).toBe(false);
  });

  it('lève une erreur si le poids est négatif ou nul', () => {
    expect(() => calculateDose({ weightKg: 0, doseMgPerKg: 15 })).toThrow(DosingError);
    expect(() => calculateDose({ weightKg: -5, doseMgPerKg: 15 })).toThrow(DosingError);
  });

  it('lève une erreur si la dose recommandée (mg/kg) est négative ou nulle', () => {
    expect(() => calculateDose({ weightKg: 10, doseMgPerKg: 0 })).toThrow(DosingError);
    expect(() => calculateDose({ weightKg: 10, doseMgPerKg: -1 })).toThrow(DosingError);
  });
});
