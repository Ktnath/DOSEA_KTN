import { describe, expect, it } from 'vitest';
import { DrugV2Schema, PilotDrugsV2FileSchema } from './medicalModelSchema';
import { pilotDrugsV2 } from './pilotDrugs.v2';
import type { DrugV2 } from './types';

function validDrug(): DrugV2 {
  return {
    dci: 'Paracétamol',
    displayName: 'Paracétamol',
    class: 'Antalgique',
    forms: [
      {
        form: 'suspension',
        route: 'orale',
        concentrations: [{ label: '24mg/mL', value: 24, unit: 'mg/mL' }],
      },
    ],
    dosingRules: [
      {
        id: 'rule-1',
        indication: 'Fièvre',
        route: 'orale',
        doseMgPerKg: 15,
        maxDoseMg: 1000,
        frequencyPerDay: 4,
        references: [],
        validationStatus: 'draft' as const,
      },
    ],
    references: [],
    validationStatus: 'draft' as const,
    version: 1,
  };
}

describe('DrugV2Schema', () => {
  it('accepte un médicament minimal valide en draft', () => {
    const result = DrugV2Schema.safeParse(validDrug());
    expect(result.success).toBe(true);
  });

  it('rejette un dci vide', () => {
    const drug = validDrug();
    drug.dci = '';
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it('rejette un médicament sans aucune forme', () => {
    const drug = validDrug();
    drug.forms = [];
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it('rejette un médicament sans aucune dosingRule', () => {
    const drug = validDrug();
    drug.dosingRules = [];
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it('rejette une dosingRule avec indication vide', () => {
    const drug = validDrug();
    drug.dosingRules[0].indication = '';
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it('rejette une dosingRule avec doseMgPerKg <= 0', () => {
    const drug = validDrug();
    drug.dosingRules[0].doseMgPerKg = 0;
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it('rejette une concentration avec value <= 0', () => {
    const drug = validDrug();
    drug.forms[0].concentrations[0].value = 0;
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it("rejette une dosingRule 'validated' sans références structurées", () => {
    const drug = validDrug();
    drug.dosingRules[0].validationStatus = 'validated';
    drug.dosingRules[0].references = [];
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it("accepte une dosingRule 'validated' avec au moins une référence structurée", () => {
    const drug = validDrug();
    drug.dosingRules[0].validationStatus = 'validated';
    drug.dosingRules[0].references = [
      { id: 'ref-1', title: 'Guide clinique', organization: 'OMS', year: 2020 },
    ];
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(true);
  });

  it("rejette un médicament 'validated' sans références structurées", () => {
    const drug = validDrug();
    drug.validationStatus = 'validated';
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(false);
  });

  it('accepte une dosingRule draft avec source incomplète (sans références)', () => {
    const drug = validDrug();
    drug.dosingRules[0].validationStatus = 'draft';
    drug.dosingRules[0].references = [];
    const result = DrugV2Schema.safeParse(drug);
    expect(result.success).toBe(true);
  });
});

describe('PilotDrugsV2FileSchema', () => {
  it('valide la base pilote DrugV2 réelle', () => {
    const result = PilotDrugsV2FileSchema.safeParse(pilotDrugsV2);
    expect(result.success).toBe(true);
  });
});
