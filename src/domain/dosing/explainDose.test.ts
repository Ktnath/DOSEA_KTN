import { describe, expect, it } from 'vitest';
import { calculateDose } from './calculateDose';
import { explainDose } from './explainDose';

describe('explainDose', () => {
  it('explique une dose non plafonnée avec sa formule', () => {
    const input = { weightKg: 10, doseMgPerKg: 15 };
    const result = calculateDose(input);
    const explanation = explainDose(input, result);

    expect(explanation.formula).toBe('150 mg = 10 kg × 15 mg/kg');
    expect(explanation.doseMg).toBe(150);
    expect(explanation.wasCapped).toBe(false);
    expect(explanation.summary).toContain('150 mg');
  });

  it('explique une dose plafonnée en mentionnant le maximum autorisé', () => {
    const input = { weightKg: 100, doseMgPerKg: 15, maxDoseMg: 1000 };
    const result = calculateDose(input);
    const explanation = explainDose(input, result);

    expect(explanation.wasCapped).toBe(true);
    expect(explanation.rawDoseMg).toBe(1500);
    expect(explanation.doseMg).toBe(1000);
    expect(explanation.summary).toContain('1500');
    expect(explanation.summary).toContain('1000');
  });

  it('inclut la dose journalière et la fréquence quand fournies', () => {
    const input = { weightKg: 10, doseMgPerKg: 15, frequencyPerDay: 4, maxDailyDoseMg: 3000 };
    const result = calculateDose(input);
    const explanation = explainDose(input, result);

    expect(explanation.frequencyPerDay).toBe(4);
    expect(explanation.dailyDoseMg).toBe(600);
    expect(explanation.maxDailyDoseMg).toBe(3000);
  });
});
