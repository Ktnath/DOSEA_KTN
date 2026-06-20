import { describe, expect, it } from 'vitest';
import { normalizeDrugName } from './normalize';

describe('normalizeDrugName', () => {
  it('met en minuscules et retire les accents', () => {
    expect(normalizeDrugName('Phénobarbital')).toBe('phenobarbital');
    expect(normalizeDrugName('Acyclovir')).toBe('acyclovir');
  });

  it('retire le contenu entre parenthèses', () => {
    expect(normalizeDrugName('Fer (sulfate ferreux)')).toBe('fer');
  });

  it('normalise les apostrophes en espaces', () => {
    expect(normalizeDrugName("N'Acétylcystéine")).toBe('n acetylcysteine');
  });

  it('réduit les espaces multiples et retire les espaces de bord', () => {
    expect(normalizeDrugName('  Paracétamol   sirop  ')).toBe('paracetamol sirop');
  });

  it("traite des entrées équivalentes à des accents/casses différentes de façon identique", () => {
    expect(normalizeDrugName('GENTAMICINE')).toBe(normalizeDrugName('gentamicine'));
    expect(normalizeDrugName('Ibuprofène')).toBe(normalizeDrugName('ibuprofene'));
  });
});
