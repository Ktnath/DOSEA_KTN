import { describe, expect, it } from 'vitest';
import { runClinicalSafetyChecks } from './clinicalSafetyEngine';
import { ClinicalSafetyInput } from './types';

function baseInput(overrides: Partial<ClinicalSafetyInput> = {}): ClinicalSafetyInput {
  return {
    weightKg: 10,
    ...overrides,
  };
}

function codesOf(alerts: ReturnType<typeof runClinicalSafetyChecks>): string[] {
  return alerts.map((a) => a.code);
}

describe('runClinicalSafetyChecks', () => {
  it("ne renvoie aucune alerte pour un cas standard sans facteur de risque", () => {
    const alerts = runClinicalSafetyChecks(baseInput());
    expect(alerts).toHaveLength(0);
  });

  it('1. signale un blocker quand le poids est <= 0', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ weightKg: 0 }));
    expect(codesOf(alerts)).toContain('WEIGHT_INVALID');
    expect(alerts.find((a) => a.code === 'WEIGHT_INVALID')?.severity).toBe('blocker');
  });

  it('1. signale un blocker quand le poids est négatif', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ weightKg: -3 }));
    expect(alerts.find((a) => a.code === 'WEIGHT_INVALID')?.severity).toBe('blocker');
  });

  it('2. signale un warning néonatal quand le poids est < 2.5 kg', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ weightKg: 2.1 }));
    const a = alerts.find((alert) => alert.code === 'WEIGHT_VERY_LOW_NEONATAL');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('warning');
  });

  it("2. n'émet pas de warning poids bas pour un poids >= 2.5 kg", () => {
    const alerts = runClinicalSafetyChecks(baseInput({ weightKg: 2.5 }));
    expect(codesOf(alerts)).not.toContain('WEIGHT_VERY_LOW_NEONATAL');
  });

  it('3. signale un warning nouveau-né quand l\'âge est < 28 jours', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ ageDays: 10 }));
    const a = alerts.find((alert) => alert.code === 'AGE_NEWBORN');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('warning');
  });

  it("3. n'émet pas de warning nouveau-né à partir de 28 jours", () => {
    const alerts = runClinicalSafetyChecks(baseInput({ ageDays: 28 }));
    expect(codesOf(alerts)).not.toContain('AGE_NEWBORN');
  });

  it('4. signale un danger quand la dose calculée dépasse maxDoseMg', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ doseMg: 1200, maxDoseMg: 1000 }));
    const a = alerts.find((alert) => alert.code === 'DOSE_EXCEEDS_MAX');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('danger');
  });

  it("4. n'émet pas d'alerte quand la dose est égale ou inférieure à maxDoseMg", () => {
    const alerts = runClinicalSafetyChecks(baseInput({ doseMg: 1000, maxDoseMg: 1000 }));
    expect(codesOf(alerts)).not.toContain('DOSE_EXCEEDS_MAX');
  });

  it('5. signale un danger quand la dose journalière potentielle dépasse maxDailyDoseMg', () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ dailyDoseMg: 4000, maxDailyDoseMg: 3000 })
    );
    const a = alerts.find((alert) => alert.code === 'DAILY_DOSE_EXCEEDS_MAX');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('danger');
  });

  it("5. n'émet pas d'alerte quand la dose journalière respecte le plafond", () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ dailyDoseMg: 3000, maxDailyDoseMg: 3000 })
    );
    expect(codesOf(alerts)).not.toContain('DAILY_DOSE_EXCEEDS_MAX');
  });

  it('6. signale un blocker quand un volume en mL est demandé sans concentration connue', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ wantsVolume: true }));
    const a = alerts.find((alert) => alert.code === 'CONCENTRATION_MISSING_FOR_VOLUME');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('blocker');
  });

  it('6. ne bloque pas le volume quand la concentration est connue', () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ wantsVolume: true, concentrationMgPerMl: 30 })
    );
    expect(codesOf(alerts)).not.toContain('CONCENTRATION_MISSING_FOR_VOLUME');
  });

  it('7. signale un danger pour la ceftriaxone chez un nouveau-né < 28 jours', () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ drugName: 'Ceftriaxone', ageDays: 5 })
    );
    const a = alerts.find((alert) => alert.code === 'CEFTRIAXONE_NEONATAL_CONTRAINDICATION');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('danger');
    expect(a?.rationale).toMatch(/calcium/i);
  });

  it("7. ne signale pas l'alerte ceftriaxone si l'âge est >= 28 jours", () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ drugName: 'Ceftriaxone', ageDays: 60 })
    );
    expect(codesOf(alerts)).not.toContain('CEFTRIAXONE_NEONATAL_CONTRAINDICATION');
  });

  it("7. ne signale pas l'alerte ceftriaxone pour un autre médicament", () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ drugName: 'Paracétamol', ageDays: 5 })
    );
    expect(codesOf(alerts)).not.toContain('CEFTRIAXONE_NEONATAL_CONTRAINDICATION');
  });

  it('8. signale un warning de surveillance pour les aminosides (via subClass)', () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ drugClass: 'Antibiotique', drugSubClass: 'Aminoside' })
    );
    const a = alerts.find((alert) => alert.code === 'AMINOGLYCOSIDE_MONITORING');
    expect(a).toBeDefined();
    expect(a?.severity).toBe('warning');
  });

  it('8. signale un warning de surveillance pour les aminosides (via class)', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ drugClass: 'Aminoglycoside' }));
    expect(codesOf(alerts)).toContain('AMINOGLYCOSIDE_MONITORING');
  });

  it("8. n'émet pas l'alerte aminoside pour une autre classe", () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({ drugClass: 'Antalgique / Antipyrétique' })
    );
    expect(codesOf(alerts)).not.toContain('AMINOGLYCOSIDE_MONITORING');
  });

  it('cumule plusieurs alertes indépendantes simultanément', () => {
    const alerts = runClinicalSafetyChecks(
      baseInput({
        weightKg: 2,
        ageDays: 3,
        drugName: 'Ceftriaxone',
        doseMg: 100,
        maxDoseMg: 50,
      })
    );
    const codes = codesOf(alerts);
    expect(codes).toContain('WEIGHT_VERY_LOW_NEONATAL');
    expect(codes).toContain('AGE_NEWBORN');
    expect(codes).toContain('CEFTRIAXONE_NEONATAL_CONTRAINDICATION');
    expect(codes).toContain('DOSE_EXCEEDS_MAX');
  });

  it('le blocker poids supprime le warning poids bas redondant', () => {
    const alerts = runClinicalSafetyChecks(baseInput({ weightKg: 0 }));
    expect(codesOf(alerts)).not.toContain('WEIGHT_VERY_LOW_NEONATAL');
  });
});
