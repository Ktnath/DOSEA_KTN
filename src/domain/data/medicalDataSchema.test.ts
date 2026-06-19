import { describe, expect, it } from 'vitest';
import drugsFixture from '../../../public/data/drugs.json';
import protocolsFixture from '../../../public/data/protocols.json';
import {
  checkProtocolDrugReferences,
  DrugSchema,
  DrugsFileSchema,
  ProtocolSchema,
  ProtocolsFileSchema,
} from './medicalDataSchema';

function validDrug(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Paracétamol',
    class: 'Antalgique / Antipyrétique',
    route: 'Orale',
    recommendedDoseMgPerKg: 15,
    maxDoseMg: 1000,
    notes: '(Source: CHU Ste-Justine 2018)',
    ...overrides,
  };
}

function validProtocol(overrides: Record<string, unknown> = {}) {
  return {
    id: 'p-test',
    name: 'Protocole Test',
    description: 'Description du protocole de test.',
    source: 'Guide MSF',
    drugs: [{ drugName: 'Paracétamol' }],
    ...overrides,
  };
}

describe('DrugSchema', () => {
  it('accepte un médicament valide', () => {
    expect(DrugSchema.safeParse(validDrug()).success).toBe(true);
  });

  it('rejette un name vide', () => {
    expect(DrugSchema.safeParse(validDrug({ name: '' })).success).toBe(false);
  });

  it('rejette une class vide', () => {
    expect(DrugSchema.safeParse(validDrug({ class: '' })).success).toBe(false);
  });

  it('rejette une route vide', () => {
    expect(DrugSchema.safeParse(validDrug({ route: '' })).success).toBe(false);
  });

  it('rejette recommendedDoseMgPerKg = 0 sans justification dans notes', () => {
    const result = DrugSchema.safeParse(validDrug({ recommendedDoseMgPerKg: 0 }));
    expect(result.success).toBe(false);
  });

  it('accepte recommendedDoseMgPerKg = 0 si notes justifie une dose fixe (cas Nystatine)', () => {
    const result = DrugSchema.safeParse(
      validDrug({
        recommendedDoseMgPerKg: 0,
        maxDoseMg: 0,
        notes: "Pas de dose mg/kg (dose fixe volumétrique). (Source: CHU Ste-Justine)",
      }),
    );
    expect(result.success).toBe(true);
  });

  it('rejette recommendedDoseMgPerKg négatif', () => {
    expect(DrugSchema.safeParse(validDrug({ recommendedDoseMgPerKg: -5 })).success).toBe(false);
  });

  it('rejette maxDoseMg = 0 sans justification', () => {
    expect(DrugSchema.safeParse(validDrug({ maxDoseMg: 0 })).success).toBe(false);
  });

  it('rejette frequencyPerDay = 0 quand présent', () => {
    expect(DrugSchema.safeParse(validDrug({ frequencyPerDay: 0 })).success).toBe(false);
  });

  it('accepte frequencyPerDay absent', () => {
    expect(DrugSchema.safeParse(validDrug()).success).toBe(true);
  });

  it('rejette concentrationMgPerMl négatif', () => {
    expect(DrugSchema.safeParse(validDrug({ concentrationMgPerMl: -1 })).success).toBe(false);
  });

  it('rejette une dose NaN', () => {
    expect(DrugSchema.safeParse(validDrug({ recommendedDoseMgPerKg: Number.NaN })).success).toBe(false);
  });

  it('rejette une dose null', () => {
    expect(DrugSchema.safeParse(validDrug({ maxDoseMg: null })).success).toBe(false);
  });

  it('rejette notes absentes (pas de source de traçabilité)', () => {
    const drug = validDrug();
    delete (drug as Record<string, unknown>).notes;
    expect(DrugSchema.safeParse(drug).success).toBe(false);
  });
});

describe('DrugsFileSchema', () => {
  it('rejette un tableau vide', () => {
    expect(DrugsFileSchema.safeParse([]).success).toBe(false);
  });

  it('valide l\'intégralité de public/data/drugs.json', () => {
    const result = DrugsFileSchema.safeParse(drugsFixture);
    if (!result.success) {
      throw new Error(JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });
});

describe('ProtocolSchema', () => {
  it('accepte un protocole valide', () => {
    expect(ProtocolSchema.safeParse(validProtocol()).success).toBe(true);
  });

  it('rejette un id vide', () => {
    expect(ProtocolSchema.safeParse(validProtocol({ id: '' })).success).toBe(false);
  });

  it('rejette une source vide', () => {
    expect(ProtocolSchema.safeParse(validProtocol({ source: '' })).success).toBe(false);
  });

  it('rejette un protocole sans médicament', () => {
    expect(ProtocolSchema.safeParse(validProtocol({ drugs: [] })).success).toBe(false);
  });

  it('rejette un drugName vide', () => {
    expect(ProtocolSchema.safeParse(validProtocol({ drugs: [{ drugName: '' }] })).success).toBe(false);
  });
});

describe('ProtocolsFileSchema', () => {
  it('valide l\'intégralité de public/data/protocols.json', () => {
    const result = ProtocolsFileSchema.safeParse(protocolsFixture);
    if (!result.success) {
      throw new Error(JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });
});

describe('checkProtocolDrugReferences', () => {
  it('ne retourne aucune erreur quand tous les médicaments référencés existent', () => {
    const protocols = [validProtocol()];
    const drugs = [validDrug()];
    expect(checkProtocolDrugReferences(protocols, drugs)).toHaveLength(0);
  });

  it('signale un médicament référencé mais absent de drugs.json', () => {
    const protocols = [validProtocol({ drugs: [{ drugName: 'Inexistant' }] })];
    const drugs = [validDrug()];
    const errors = checkProtocolDrugReferences(protocols, drugs);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('Inexistant');
  });

  it('ne signale aucune erreur pour les données réelles de public/data', () => {
    const drugsResult = DrugsFileSchema.safeParse(drugsFixture);
    const protocolsResult = ProtocolsFileSchema.safeParse(protocolsFixture);
    if (!drugsResult.success || !protocolsResult.success) {
      throw new Error('Les fixtures réelles doivent déjà être valides pour ce test.');
    }
    expect(checkProtocolDrugReferences(protocolsResult.data, drugsResult.data)).toHaveLength(0);
  });
});
