import { describe, expect, it } from 'vitest';
import { MISSING_PILOT_DRUG_NAMES, PILOT_DRUG_NAMES, pilotDrugsV2 } from './pilotDrugs.v2';

describe('pilotDrugsV2', () => {
  it('signale explicitement les médicaments pilotes absents de la base legacy, le cas échéant', () => {
    expect(MISSING_PILOT_DRUG_NAMES).toEqual([]);
  });

  it('contient les 10 médicaments pilotes attendus', () => {
    expect(PILOT_DRUG_NAMES).toHaveLength(10);
    const dciList = pilotDrugsV2.map((drug) => drug.dci);
    for (const name of PILOT_DRUG_NAMES) {
      if (!MISSING_PILOT_DRUG_NAMES.includes(name)) {
        expect(dciList).toContain(name);
      }
    }
  });

  it('chaque médicament a au moins une dosingRule', () => {
    for (const drug of pilotDrugsV2) {
      expect(drug.dosingRules.length).toBeGreaterThan(0);
    }
  });

  it('chaque dosingRule est en draft', () => {
    for (const drug of pilotDrugsV2) {
      for (const rule of drug.dosingRules) {
        expect(rule.validationStatus).toBe('draft');
      }
    }
  });

  it("aucune entrée n'est validated", () => {
    for (const drug of pilotDrugsV2) {
      expect(drug.validationStatus).not.toBe('validated');
      for (const rule of drug.dosingRules) {
        expect(rule.validationStatus).not.toBe('validated');
      }
    }
  });

  it('chaque médicament a une version', () => {
    for (const drug of pilotDrugsV2) {
      expect(typeof drug.version).toBe('number');
      expect(drug.version).toBeGreaterThan(0);
    }
  });

  it('le fichier est sérialisable en JSON', () => {
    expect(() => JSON.stringify(pilotDrugsV2)).not.toThrow();
    const parsed = JSON.parse(JSON.stringify(pilotDrugsV2));
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(pilotDrugsV2.length);
  });
});
