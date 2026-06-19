import { describe, expect, it } from 'vitest';
import type { Drug } from '../../types';
import { legacyDrugToDrugV2 } from './legacyAdapter';

describe('legacyDrugToDrugV2', () => {
  it('convertit un médicament oral simple en DrugV2 avec une forme et une indication', () => {
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

    expect(result.id).toBe('legacy-1');
    expect(result.legacyId).toBe(1);
    expect(result.name).toBe('Paracétamol');
    expect(result.forms).toHaveLength(1);
    expect(result.forms[0].route).toBe('Orale / Rectale');
    expect(result.forms[0].concentrationMgPerMl).toBe(30);

    expect(result.indications).toHaveLength(1);
    const [indication] = result.indications;
    expect(indication.label).toBe('Douleur légère à modérée, fièvre');
    expect(indication.doseMgPerKg).toBe(15);
    expect(indication.maxDosePerIntakeMg).toBe(1000);
    expect(indication.maxDailyDoseMg).toBe(3000);
    expect(indication.frequencyPerDay).toBe(4);
    expect(indication.intervalHours).toBe(6);
    expect(indication.source).toBe('CHU Ste-Justine 2018');
    expect(indication.validationStatus).toBe('draft');
  });

  it("n'invente pas de source si les notes ne contiennent aucune mention explicite", () => {
    const drugSansSource: Drug = {
      name: 'Test Sans Source',
      class: 'Test',
      recommendedDoseMgPerKg: 5,
      maxDoseMg: 100,
      route: 'IV',
    };

    const result = legacyDrugToDrugV2(drugSansSource);

    expect(result.indications[0].source).toBe('Source non spécifiée (import legacy)');
  });

  it('ne déduit aucune contre-indication ou précaution absente du legacy', () => {
    const drug: Drug = {
      name: 'Test Minimal',
      class: 'Test',
      recommendedDoseMgPerKg: 5,
      maxDoseMg: 100,
      route: 'IV',
    };

    const result = legacyDrugToDrugV2(drug);

    expect(result.indications[0].contraindications).toEqual([]);
    expect(result.indications[0].precautions).toEqual([]);
    expect(result.indications[0].ageMinMonths).toBeUndefined();
    expect(result.indications[0].ageMaxMonths).toBeUndefined();
    expect(result.indications[0].weightMinKg).toBeUndefined();
    expect(result.indications[0].weightMaxKg).toBeUndefined();
    expect(result.indications[0].sourceDate).toBeUndefined();
  });

  it('préserve les informations de dilution IV existantes', () => {
    const gentamicine: Drug = {
      id: 12,
      name: 'Gentamicine',
      class: 'Antibiotique',
      subClass: 'Aminoside',
      recommendedDoseMgPerKg: 3.2,
      maxDoseMg: 120,
      frequencyPerDay: 1,
      minIntervalHours: 18,
      route: 'IV / IM',
      indications: 'Sepsis néonatal, infections graves à Gram négatif',
      notes: 'Cpmin visée 0,5-1 mg/L. (Source: CHU Ste-Justine)',
      system: 'Infectiologie',
      dilution: {
        fluid: 'NaCl 0.9% ou G5%',
        bolusTimeMinutes: 30,
        continuousInfusion: false,
      },
    };

    const result = legacyDrugToDrugV2(gentamicine);

    expect(result.dilution).toEqual(gentamicine.dilution);
    expect(result.subClass).toBe('Aminoside');
    expect(result.indications[0].source).toBe('CHU Ste-Justine');
  });

  it("génère un identifiant basé sur le nom si le médicament legacy n'a pas d'id", () => {
    const drugSansId: Drug = {
      name: 'Sans Id',
      class: 'Test',
      recommendedDoseMgPerKg: 1,
      maxDoseMg: 10,
      route: 'PO',
    };

    const result = legacyDrugToDrugV2(drugSansId);

    expect(result.id).toBe('legacy-Sans Id');
    expect(result.legacyId).toBeUndefined();
  });
});
