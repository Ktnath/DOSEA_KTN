import { describe, expect, it } from 'vitest';
import type { Drug } from '../../types';
import { legacyDrugToDrugV2 } from './legacyAdapter';

describe('legacyDrugToDrugV2', () => {
  it('convertit un médicament Paracétamol legacy vers DrugV2', () => {
    const paracetamol: Drug = {
      id: 1,
      name: 'Paracétamol',
      class: 'Antalgique / Antipyrétique',
      recommendedDoseMgPerKg: 15,
      maxDoseMg: 1000,
      maxDailyDoseMg: 3000,
      frequencyPerDay: 4,
      minIntervalHours: 6,
      route: 'Orale / Rectale',
      concentrationMgPerMl: 30,
      indications: 'Douleur légère à modérée, fièvre',
      notes: 'PO: 10-15 mg/kg/dose q6-8h. (Source: CHU Ste-Justine 2018)',
      system: 'Antalgie / Antipyrétique',
    };

    const result = legacyDrugToDrugV2(paracetamol);

    expect(result.dci).toBe('Paracétamol');
    expect(result.displayName).toBe('Paracétamol');
    expect(result.validationStatus).toBe('draft');
    expect(result.dosingRules).toHaveLength(1);

    const [rule] = result.dosingRules;
    expect(rule.doseMgPerKg).toBe(15);
    expect(rule.maxDoseMg).toBe(1000);
    expect(rule.maxDailyDoseMg).toBe(3000);
    expect(rule.frequencyPerDay).toBe(4);
    expect(rule.validationStatus).toBe('draft');
  });

  it('crée une concentration si concentrationMgPerMl existe', () => {
    const drug: Drug = {
      name: 'Avec Concentration',
      class: 'Test',
      recommendedDoseMgPerKg: 5,
      maxDoseMg: 100,
      route: 'Orale',
      concentrationMgPerMl: 30,
      notes: 'Notes sans source explicite',
    };

    const result = legacyDrugToDrugV2(drug);

    expect(result.forms).toHaveLength(1);
    expect(result.forms[0].concentrations).toHaveLength(1);
    expect(result.forms[0].concentrations[0]).toEqual({
      label: '30 mg/mL',
      value: 30,
      unit: 'mg/mL',
      isDefault: true,
    });
  });

  it('ne crée aucune concentration si concentrationMgPerMl est absent', () => {
    const drug: Drug = {
      name: 'Sans Concentration',
      class: 'Test',
      recommendedDoseMgPerKg: 5,
      maxDoseMg: 100,
      route: 'IV',
    };

    const result = legacyDrugToDrugV2(drug);

    expect(result.forms[0].concentrations).toEqual([]);
  });

  it("n'invente aucune référence si les notes ne contiennent pas de source structurée avec une année", () => {
    const drugSansSource: Drug = {
      name: 'Test Sans Source',
      class: 'Test',
      recommendedDoseMgPerKg: 5,
      maxDoseMg: 100,
      route: 'IV',
      notes: 'Notes cliniques diverses sans source identifiable',
    };

    const result = legacyDrugToDrugV2(drugSansSource);

    expect(result.references).toEqual([]);
    expect(result.dosingRules[0].references).toEqual([]);
    expect(result.dosingRules[0].notes).toBe('Notes cliniques diverses sans source identifiable');
  });

  it("n'invente aucune référence en l'absence totale de notes", () => {
    const drug: Drug = {
      name: 'Test Minimal',
      class: 'Test',
      recommendedDoseMgPerKg: 5,
      maxDoseMg: 100,
      route: 'IV',
    };

    const result = legacyDrugToDrugV2(drug);

    expect(result.references).toEqual([]);
    expect(result.dosingRules[0].references).toEqual([]);
  });

  it('met le validationStatus à draft par défaut', () => {
    const drug: Drug = {
      name: 'Med',
      class: 'Test',
      recommendedDoseMgPerKg: 1,
      maxDoseMg: 10,
      route: 'PO',
    };

    const result = legacyDrugToDrugV2(drug);

    expect(result.validationStatus).toBe('draft');
    expect(result.dosingRules[0].validationStatus).toBe('draft');
  });
});
