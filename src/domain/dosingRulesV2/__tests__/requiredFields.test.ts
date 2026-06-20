import { describe, expect, it } from 'vitest';
import { findDosingRuleByDrugName } from '../ruleMatcher';
import { getRequiredFieldsForRule } from '../requiredFields';

function requiredFieldsFor(drugName: string) {
  const rule = findDosingRuleByDrugName(drugName);
  if (!rule) throw new Error(`Règle introuvable pour ${drugName}`);
  return getRequiredFieldsForRule(rule);
}

describe('getRequiredFieldsForRule — Artésunate (bug rapporté)', () => {
  it('requiert le poids, l’indication et la voie', () => {
    const fields = requiredFieldsFor('Artésunate');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('indication');
    expect(fields).toContain('route');
  });

  it('ne requiert jamais l’âge gestationnel ni l’âge postmenstruel (absents du texte validé)', () => {
    const fields = requiredFieldsFor('Artésunate');
    expect(fields).not.toContain('gestationalAgeWeeks');
    expect(fields).not.toContain('postMenstrualAgeWeeks');
    expect(fields).not.toContain('renalFunction');
  });
});

describe('getRequiredFieldsForRule — Gentamicine (bandes PMA + surveillance rénale)', () => {
  it('requiert le poids et l’âge postmenstruel (bandes par PMA)', () => {
    const fields = requiredFieldsFor('Gentamicine');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('postMenstrualAgeWeeks');
  });

  it('requiert la fonction rénale (aminoside)', () => {
    const fields = requiredFieldsFor('Gentamicine');
    expect(fields).toContain('renalFunction');
  });
});

describe('getRequiredFieldsForRule — Ampicilline (intervalle dépendant du PMA, non chiffré)', () => {
  it('requiert le poids, l’indication et l’âge postmenstruel', () => {
    const fields = requiredFieldsFor('Ampicilline');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('indication');
    expect(fields).toContain('postMenstrualAgeWeeks');
  });
});

describe('getRequiredFieldsForRule — Ceftriaxone (contre-indication calcium néonatale)', () => {
  it('requiert le poids, l’âge (seuil néonatal ≥14j) et la co-administration de calcium', () => {
    const fields = requiredFieldsFor('Ceftriaxone');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('ageDays');
    expect(fields).toContain('calciumCoAdministration');
  });

  it('ne requiert pas l’âge gestationnel ni l’âge postmenstruel', () => {
    const fields = requiredFieldsFor('Ceftriaxone');
    expect(fields).not.toContain('gestationalAgeWeeks');
    expect(fields).not.toContain('postMenstrualAgeWeeks');
  });
});

describe('getRequiredFieldsForRule — Salbutamol (nébulisation/inhalateur, plusieurs voies)', () => {
  it('requiert le poids, l’indication et la voie ; jamais d’âge gestationnel/PMA', () => {
    const fields = requiredFieldsFor('Salbutamol');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('route');
    expect(fields).not.toContain('gestationalAgeWeeks');
    expect(fields).not.toContain('postMenstrualAgeWeeks');
  });
});

describe('getRequiredFieldsForRule — Diazépam (voies IV/Rectal, indications multiples)', () => {
  it('requiert le poids, l’indication et la voie', () => {
    const fields = requiredFieldsFor('Diazépam');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('indication');
    expect(fields).toContain('route');
    expect(fields).not.toContain('gestationalAgeWeeks');
    expect(fields).not.toContain('postMenstrualAgeWeeks');
  });
});

describe('getRequiredFieldsForRule — Adrénaline (indications multiples, doses fixes mg/kg)', () => {
  it('requiert le poids et l’indication ; jamais d’âge gestationnel/PMA', () => {
    const fields = requiredFieldsFor('Adrénaline (Épinéphrine)');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('indication');
    expect(fields).not.toContain('gestationalAgeWeeks');
    expect(fields).not.toContain('postMenstrualAgeWeeks');
  });
});

describe('getRequiredFieldsForRule — Hydrocortisone (séquence charge/entretien, sans seuil d’âge)', () => {
  it('requiert le poids, l’indication, la phase de dose et la dose de charge', () => {
    const fields = requiredFieldsFor('Hydrocortisone');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('indication');
    expect(fields).toContain('dosePhase');
    expect(fields).toContain('loadingDose');
  });

  it('ne requiert aucun âge (aucun seuil chiffré dans le texte source)', () => {
    const fields = requiredFieldsFor('Hydrocortisone');
    expect(fields).not.toContain('ageDays');
    expect(fields).not.toContain('gestationalAgeWeeks');
    expect(fields).not.toContain('postMenstrualAgeWeeks');
  });
});

describe('getRequiredFieldsForRule — Vancomycine (charge/entretien + PMA + glycopeptide)', () => {
  it('requiert le poids, l’âge postmenstruel et la fonction rénale', () => {
    const fields = requiredFieldsFor('Vancomycine');
    expect(fields).toContain('weightKg');
    expect(fields).toContain('postMenstrualAgeWeeks');
    expect(fields).toContain('renalFunction');
  });
});
