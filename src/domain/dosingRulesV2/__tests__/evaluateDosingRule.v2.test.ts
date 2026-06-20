import { describe, expect, it } from 'vitest';
import { evaluateDosingRule } from '../evaluateDosingRule';

describe('evaluateDosingRule — Artésunate (bandes de poids OMS ajoutées le 2026-06-20)', () => {
  it('calcule 3 mg/kg pour un poids < 20 kg (54 mg à 18 kg)', () => {
    const result = evaluateDosingRule({ drugName: 'Artésunate', weightKg: 18, route: 'IV' });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBe(54);
    expect(result.doseMgPerKg).toBe(3);
    expect(result.appliedConditions.some((c) => c.includes('< 20 kg'))).toBe(true);
  });

  it('calcule 2,4 mg/kg pour un poids ≥ 20 kg (48 mg à 20 kg, borne partagée tranchée par Min)', () => {
    const result = evaluateDosingRule({ drugName: 'Artésunate', weightKg: 20, route: 'IV' });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBe(48);
    expect(result.doseMgPerKg).toBe(2.4);
    expect(result.appliedConditions.some((c) => c.includes('≥ 20 kg'))).toBe(true);
  });

  it('demande le poids quand il est absent (toutes les branches IV/IM en dépendent)', () => {
    const result = evaluateDosingRule({ drugName: 'Artésunate', route: 'IV' });
    expect(result.status).toBe('requires_clinical_choice');
    expect(result.missingFields).toContain('weightKg');
  });
});

describe('evaluateDosingRule — Gentamicine (bandes par PMA)', () => {
  it("demande l'âge postmenstruel quand il est absent", () => {
    const result = evaluateDosingRule({ drugName: 'Gentamicine', weightKg: 3 });
    expect(result.status).toBe('requires_clinical_choice');
    expect(result.missingFields).toContain('postMenstrualAgeWeeks');
  });
});

describe('evaluateDosingRule — Ceftriaxone (avertissement calcium néonatal)', () => {
  it("conserve l'avertissement calcium/ictère néonatal dans les résultats calculés", () => {
    const result = evaluateDosingRule({ drugName: 'Ceftriaxone', weightKg: 3, ageDays: 5, indication: 'Méningite' });
    expect(result.status).toBe('calculated');
    expect(result.warnings.some((w) => /calcium/i.test(w.warningText))).toBe(true);
  });
});

describe('evaluateDosingRule — Diazépam (plafond IV)', () => {
  it('plafonne la dose IV à 10 mg/prise (40 kg, convulsions)', () => {
    const result = evaluateDosingRule({ drugName: 'Diazépam', weightKg: 40, route: 'IV', indication: 'Convulsions' });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBe(10);
    expect(result.wasCapped).toBe(true);
    expect(result.maxDoseText).toContain('10 mg/prise');
  });
});

describe('evaluateDosingRule — Adrénaline (Épinéphrine) (plafond IM)', () => {
  // Plafond réel de la source pour la branche anaphylaxie/IM : 1 mg/prise (et non 0,5 mg,
  // qui correspond à une autre molécule du jeu de données — voir rapport de livraison).
  it('plafonne la dose IM à 1 mg/prise (150 kg, choc anaphylactique)', () => {
    const result = evaluateDosingRule({ drugName: 'Adrénaline (Épinéphrine)', weightKg: 150, route: 'IM', indication: 'choc anaphylactique' });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBe(1);
    expect(result.wasCapped).toBe(true);
    expect(result.maxDoseText).toContain('1 mg/prise');
  });
});

describe('evaluateDosingRule — médicament inconnu', () => {
  it("retourne 'not_found' pour un médicament absent de la base", () => {
    const result = evaluateDosingRule({ drugName: 'molecule-inexistante-xyz' });
    expect(result.status).toBe('not_found');
  });
});
