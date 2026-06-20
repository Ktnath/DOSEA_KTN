import { describe, expect, it } from 'vitest';
import { evaluateDosingRule } from './evaluateDosingRule';

describe('evaluateDosingRule — médicament inconnu', () => {
  it("retourne 'not_found' pour un médicament absent de la base", () => {
    const result = evaluateDosingRule({ drugName: 'molecule-inexistante-xyz' });
    expect(result.status).toBe('not_found');
  });
});

describe('evaluateDosingRule — paracétamol (branches par voie + branche conditionnelle PMA)', () => {
  it("demande un choix clinique quand la voie n'est pas précisée", () => {
    const result = evaluateDosingRule({ drugName: 'paracetamol', weightKg: 10 });
    expect(result.status).toBe('requires_clinical_choice');
    expect(result.missingFields).toContain('route');
  });

  it("demande l'âge postmenstruel quand la voie orale est précisée (branche prématuré concurrente indéterminée)", () => {
    const result = evaluateDosingRule({ drugName: 'paracetamol', weightKg: 10, route: 'Orale' });
    expect(result.status).toBe('requires_clinical_choice');
    expect(result.missingFields).toContain('postMenstrualAgeWeeks');
  });

  it('calcule la dose orale standard (q6-8h) quand le PMA est fourni et hors zone prématuré', () => {
    const result = evaluateDosingRule({
      drugName: 'paracetamol',
      weightKg: 10,
      route: 'Orale',
      postMenstrualAgeWeeks: 45,
    });
    expect(result.status).toBe('calculated');
    expect(result.doseMgMin).toBe(100);
    expect(result.doseMgMax).toBe(150);
    expect(result.frequencyText).toBe('q6-8h');
    expect(result.maxDoseText).toContain('1000 mg/prise');
    expect(result.maxDoseText).toContain('3000 mg/jour');
    expect(result.wasCapped).toBe(false);
  });

  it('applique le calendrier q8h fixe pour la branche prématuré (PMA < 37 sem)', () => {
    const result = evaluateDosingRule({
      drugName: 'paracetamol',
      weightKg: 10,
      route: 'Orale',
      postMenstrualAgeWeeks: 30,
    });
    expect(result.status).toBe('calculated');
    expect(result.frequencyText).toBe('q8h');
    expect(result.doseMgMin).toBe(100);
    expect(result.doseMgMax).toBe(150);
  });

  it('calcule la dose rectale fixe (20 mg/kg) sans dépendre du PMA', () => {
    const result = evaluateDosingRule({ drugName: 'paracetamol', weightKg: 5, route: 'Rectale' });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBe(100);
    expect(result.frequencyText).toBe('q6-8h');
  });

  it('plafonne la dose au maximum par prise quand la dose brute le dépasse', () => {
    const result = evaluateDosingRule({
      drugName: 'paracetamol',
      weightKg: 80,
      route: 'Orale',
      postMenstrualAgeWeeks: 45,
    });
    expect(result.status).toBe('calculated');
    expect(result.wasCapped).toBe(true);
    expect(result.doseMgMax).toBe(1000);
    expect(result.doseMgMin).toBe(800);
  });
});

describe('evaluateDosingRule — gentamicine (bandes PMA exclusives avec bornes partagées)', () => {
  it('sélectionne la bande <30 sem', () => {
    const result = evaluateDosingRule({ drugName: 'gentamicine', weightKg: 2, postMenstrualAgeWeeks: 25 });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBeCloseTo(7.6, 5);
    expect(result.frequencyText).toBe('q36h');
  });

  it('résout la borne partagée à 30 sem en faveur de la bande 30-39 (règle Min gagne le partage de borne)', () => {
    const result = evaluateDosingRule({ drugName: 'gentamicine', weightKg: 3, postMenstrualAgeWeeks: 30 });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBeCloseTo(9.6, 5);
    expect(result.frequencyText).toBe('q24h');
  });

  it('résout la borne partagée à 39 sem en faveur de la bande 30-39 (≥40 ne commence qu’à 40)', () => {
    const result = evaluateDosingRule({ drugName: 'gentamicine', weightKg: 3, postMenstrualAgeWeeks: 39 });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBeCloseTo(9.6, 5);
    expect(result.frequencyText).toBe('q24h');
  });

  it('sélectionne la bande ≥40 sem', () => {
    const result = evaluateDosingRule({ drugName: 'gentamicine', weightKg: 4, postMenstrualAgeWeeks: 45 });
    expect(result.status).toBe('calculated');
    expect(result.doseMg).toBe(12);
    expect(result.frequencyText).toBe('q12-18h');
  });

  it("demande l'âge postmenstruel quand il est absent (trois branches indéterminées)", () => {
    const result = evaluateDosingRule({ drugName: 'gentamicine', weightKg: 3 });
    expect(result.status).toBe('requires_clinical_choice');
    expect(result.missingFields).toContain('postMenstrualAgeWeeks');
  });
});

describe('evaluateDosingRule — phénobarbital (séquence charge + charge additionnelle + entretien)', () => {
  it('combine les branches de charge et d’entretien en une seule séquence de traitement', () => {
    const result = evaluateDosingRule({ drugName: 'phenobarbital', weightKg: 4 });
    expect(result.status).toBe('calculated');
    expect(result.doseText).toContain('Charge : 80 mg');
    expect(result.doseText).toContain('Charge : 40 mg');
    expect(result.doseText).toContain('Entretien :');
    expect(result.frequencyText).toContain('Dose unique');
    expect(result.frequencyText).toContain('q20-30min');
    expect(result.frequencyText).toContain('q12h');
  });

  it('demande le poids quand il est absent (toutes les branches dépendent du poids)', () => {
    const result = evaluateDosingRule({ drugName: 'phenobarbital' });
    expect(result.status).toBe('requires_clinical_choice');
    expect(result.missingFields).toContain('weightKg');
  });
});

describe('evaluateDosingRule — acyclovir (deux bandes PMA avec bornes partagées à 32 sem)', () => {
  it('sélectionne la bande <32 sem (q12h)', () => {
    const result = evaluateDosingRule({ drugName: 'acyclovir', weightKg: 3, postMenstrualAgeWeeks: 20 });
    expect(result.status).toBe('calculated');
    expect(result.frequencyText).toBe('q12h');
    expect(result.maxDoseText).toContain('800 mg/prise');
  });

  it('résout la borne partagée à 32 sem en faveur de la bande ≥32 (q8h)', () => {
    const result = evaluateDosingRule({ drugName: 'acyclovir', weightKg: 3, postMenstrualAgeWeeks: 32 });
    expect(result.status).toBe('calculated');
    expect(result.frequencyText).toBe('q8h');
  });
});

describe('evaluateDosingRule — explication et traçabilité (CLAUDE.md)', () => {
  it('inclut toujours le texte validé de la source et la source dans l’explication, même en cas de calcul', () => {
    const result = evaluateDosingRule({
      drugName: 'paracetamol',
      weightKg: 10,
      route: 'Orale',
      postMenstrualAgeWeeks: 45,
    });
    expect(result.explanation).toContain('Texte validé (source)');
    expect(result.sourceName).toBeDefined();
  });

  it('inclut le texte validé de la source même quand un choix clinique est requis', () => {
    const result = evaluateDosingRule({ drugName: 'paracetamol', weightKg: 10 });
    expect(result.explanation).toContain('Texte validé (source)');
  });
});
