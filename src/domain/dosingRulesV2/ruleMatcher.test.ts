import { describe, expect, it } from 'vitest';
import {
  ALL_DOSING_RULES_V2,
  findDosingRuleByDrugName,
  findDosingRuleById,
  findDosingRulesBySearchTerm,
} from './ruleMatcher';

describe('ALL_DOSING_RULES_V2', () => {
  it('charge les 80 règles validées', () => {
    expect(ALL_DOSING_RULES_V2).toHaveLength(80);
  });

  it("n'a jamais de statut 'blocked' au niveau règle (aucune branche n'est totalement non résolue dans la base actuelle)", () => {
    for (const rule of ALL_DOSING_RULES_V2) {
      expect(rule.status).not.toBe('blocked');
    }
  });

  it('attache les notes de revue manuelle quand elles existent', () => {
    const phenobarbital = findDosingRuleByDrugName('phenobarbital');
    expect(phenobarbital).toBeDefined();
    expect(Array.isArray(phenobarbital?.manualReviewNotes)).toBe(true);
  });
});

describe('alertes cliniques (DOSEA_CLINICAL_WARNINGS_V2 assemblées sur chaque règle)', () => {
  it('attache à chaque règle uniquement les alertes correspondant à son rule_id', () => {
    const paracetamol = findDosingRuleById('dosea_v2_001_paracetamol');
    expect(paracetamol?.warnings.length).toBeGreaterThan(0);
    for (const warning of paracetamol?.warnings ?? []) {
      expect(warning.ruleId).toBe('dosea_v2_001_paracetamol');
    }
  });

  it('ne perd aucune alerte clinique de la base source (CLAUDE.md: ne jamais supprimer une alerte clinique)', () => {
    for (const rule of ALL_DOSING_RULES_V2) {
      expect(rule.warnings.length).toBeGreaterThan(0);
    }
  });
});

describe('findDosingRuleById', () => {
  it('retrouve une règle par son rule_id exact', () => {
    const rule = findDosingRuleById('dosea_v2_001_paracetamol');
    expect(rule?.drugName).toBe('Paracétamol');
  });

  it('retourne undefined pour un id inconnu', () => {
    expect(findDosingRuleById('inconnu')).toBeUndefined();
  });
});

describe('findDosingRuleByDrugName', () => {
  it('retrouve une règle par nom exact', () => {
    const rule = findDosingRuleByDrugName('Paracétamol');
    expect(rule?.id).toBe('dosea_v2_001_paracetamol');
  });

  it('est insensible aux accents et à la casse', () => {
    expect(findDosingRuleByDrugName('paracetamol')?.id).toBe('dosea_v2_001_paracetamol');
    expect(findDosingRuleByDrugName('PARACÉTAMOL')?.id).toBe('dosea_v2_001_paracetamol');
  });

  it('retrouve une règle par alias', () => {
    const rule = findDosingRuleByDrugName('gentamicine');
    expect(rule).toBeDefined();
    expect(rule?.drugName).toBe('Gentamicine');
  });

  it('retourne undefined pour un médicament absent de la base', () => {
    expect(findDosingRuleByDrugName('molecule-inexistante-xyz')).toBeUndefined();
  });
});

describe('findDosingRulesBySearchTerm', () => {
  it('retourne un tableau vide pour un terme vide', () => {
    expect(findDosingRulesBySearchTerm('')).toEqual([]);
  });

  it('trouve les correspondances partielles, triées par position de la correspondance', () => {
    const results = findDosingRulesBySearchTerm('para');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].drugName).toBe('Paracétamol');
  });

  it('respecte la limite demandée', () => {
    const results = findDosingRulesBySearchTerm('a', 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it('ne retourne pas de doublons quand plusieurs alias correspondent au même médicament', () => {
    const results = findDosingRulesBySearchTerm('fer');
    const ids = results.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
