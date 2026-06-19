import { describe, expect, it } from 'vitest';
import { calculateDose } from './calculateDose';
import { checkDoseSafety } from './safetyChecks';

describe('checkDoseSafety', () => {
  it("renvoie 'ok' sans message quand aucune limite n'est dépassée", () => {
    const result = calculateDose({ weightKg: 10, doseMgPerKg: 15, maxDoseMg: 1000 });
    const safety = checkDoseSafety(result);
    expect(safety.level).toBe('ok');
    expect(safety.messages).toHaveLength(0);
  });

  it("renvoie 'warning' quand la dose a été plafonnée", () => {
    const result = calculateDose({ weightKg: 100, doseMgPerKg: 15, maxDoseMg: 1000 });
    const safety = checkDoseSafety(result);
    expect(safety.level).toBe('warning');
    expect(safety.messages.length).toBeGreaterThan(0);
  });

  it("renvoie 'danger' (alerte forte) quand la dose journalière maximale est dépassée", () => {
    const result = calculateDose({
      weightKg: 10,
      doseMgPerKg: 15,
      frequencyPerDay: 4,
      maxDailyDoseMg: 500,
    });
    const safety = checkDoseSafety(result);
    expect(safety.level).toBe('danger');
    expect(safety.messages.length).toBeGreaterThan(0);
  });

  it("priorise 'danger' sur 'warning' si les deux conditions sont réunies", () => {
    const result = calculateDose({
      weightKg: 100,
      doseMgPerKg: 15,
      maxDoseMg: 1000,
      frequencyPerDay: 4,
      maxDailyDoseMg: 500,
    });
    const safety = checkDoseSafety(result);
    expect(safety.level).toBe('danger');
    expect(safety.messages.length).toBe(2);
  });
});
