/**
 * Recherche et assemblage des règles V2 (module pur, sans dépendance UI ni IA).
 *
 * Assemble pour chaque entrée brute de `dosing_rules_v2.validated.json` :
 * - la donnée source (`raw`),
 * - l'encodage manuel des conditions (`./encoding/manualConditionEncoding`),
 * - les alertes cliniques associées (`clinicalWarnings.generated.ts`).
 *
 * Le statut `status` (DosingRuleStatus) est un statut de qualité de
 * l'encodage, distinct du statut d'évaluation (calculated/blocked/...) :
 * il vaut 'requires_manual_review' dès que l'encodage porte au moins une
 * note de revue manuelle (`manualReviewNotes`), 'blocked' si aucune branche
 * ne peut produire de dose calculable (toutes marquées
 * `doseAmountUnresolvedFromSource`), 'validated' sinon.
 */

import { DOSEA_DOSING_RULES_V2_VALIDATED } from '@/data/dosingRulesV2/dosingRules.generated';
import { DOSEA_CLINICAL_WARNINGS_V2 } from '@/data/dosingRulesV2/clinicalWarnings.generated';
import { manualConditionEncoding } from './encoding/manualConditionEncoding';
import { normalizeDrugName } from './normalize';
import type {
  ClinicalWarningV2,
  DosingRuleStatus,
  DosingRuleV2,
  DosingRuleV2Raw,
  RuleComplexity,
} from './types';

function mapRuleComplexity(rawType: DosingRuleV2Raw['dose_expression']['rule_type']): RuleComplexity {
  switch (rawType) {
    case 'simple_or_semi_simple':
      return 'simple';
    case 'semi_structured':
      return 'semi_structured';
    case 'conditional_or_algorithmic':
      return 'conditional';
  }
}

function buildWarnings(ruleId: string): ClinicalWarningV2[] {
  return DOSEA_CLINICAL_WARNINGS_V2.filter((w) => w.rule_id === ruleId).map((w) => ({
    ruleId: w.rule_id,
    drugName: w.drug_name,
    flags: [...w.flags],
    warningText: w.warning_text,
  }));
}

function computeStatus(manualReviewNotes: string[], branches: DosingRuleV2['branches']): DosingRuleStatus {
  if (branches.length > 0 && branches.every((b) => b.doseAmountUnresolvedFromSource)) {
    return 'blocked';
  }
  if (manualReviewNotes.length > 0) {
    return 'requires_manual_review';
  }
  return 'validated';
}

function buildDosingRuleV2(raw: DosingRuleV2Raw): DosingRuleV2 {
  const encoding = manualConditionEncoding[raw.rule_id];
  const branches = encoding?.branches ?? [];
  const manualReviewNotes = encoding?.manualReviewNotes ?? [];
  const sourceUrl = raw.sources.drive_urls[0];

  return {
    id: raw.rule_id,
    drugName: raw.drug.name,
    aliases: raw.drug.aliases,
    clinicalSystem: raw.drug.clinical_system || undefined,
    therapeuticClass: raw.drug.class || undefined,
    route: raw.clinical_context.routes,
    indications: raw.clinical_context.indications,
    sourceName: raw.sources.declared_source_label || undefined,
    sourceUrl,
    rawDoseText: raw.dose_expression.raw_current_posology,
    validatedDoseText: raw.dose_expression.validated_posology_text,
    conditionsToEncode: raw.dose_expression.conditions_to_encode_text || undefined,
    ruleComplexity: mapRuleComplexity(raw.dose_expression.rule_type),
    status: computeStatus(manualReviewNotes, branches),
    warnings: buildWarnings(raw.rule_id),
    branches,
    manualReviewNotes,
    doNotUseAsBlindSingleMgPerKg: raw.implementation.do_not_use_as_blind_single_mg_per_kg,
    raw,
  };
}

/** Toutes les règles V2, assemblées une seule fois (donnée statique). */
export const ALL_DOSING_RULES_V2: DosingRuleV2[] = DOSEA_DOSING_RULES_V2_VALIDATED.map((raw) =>
  buildDosingRuleV2(JSON.parse(JSON.stringify(raw)) as DosingRuleV2Raw),
);

const RULES_BY_NORMALIZED_NAME = new Map<string, DosingRuleV2>();
for (const rule of ALL_DOSING_RULES_V2) {
  for (const alias of rule.aliases) {
    RULES_BY_NORMALIZED_NAME.set(normalizeDrugName(alias), rule);
  }
}

const RULES_BY_ID = new Map<string, DosingRuleV2>(ALL_DOSING_RULES_V2.map((r) => [r.id, r]));

/** Recherche une règle V2 par son identifiant (`rule_id`). */
export function findDosingRuleById(ruleId: string): DosingRuleV2 | undefined {
  return RULES_BY_ID.get(ruleId);
}

/** Recherche une règle V2 par nom exact (ou alias exact) de médicament, insensible aux accents/casse. */
export function findDosingRuleByDrugName(drugName: string): DosingRuleV2 | undefined {
  return RULES_BY_NORMALIZED_NAME.get(normalizeDrugName(drugName));
}

/**
 * Recherche les règles V2 dont le nom ou un alias contient le terme recherché
 * (recherche partielle, pour l'autocomplétion). Retourne au plus `limit` résultats,
 * triés par position de la correspondance puis ordre alphabétique du nom.
 */
export function findDosingRulesBySearchTerm(searchTerm: string, limit = 10): DosingRuleV2[] {
  const normalizedTerm = normalizeDrugName(searchTerm);
  if (!normalizedTerm) {
    return [];
  }

  const matches: { rule: DosingRuleV2; matchIndex: number }[] = [];
  const seenRuleIds = new Set<string>();

  for (const rule of ALL_DOSING_RULES_V2) {
    if (seenRuleIds.has(rule.id)) continue;
    let bestIndex = -1;
    for (const alias of rule.aliases) {
      const index = normalizeDrugName(alias).indexOf(normalizedTerm);
      if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
        bestIndex = index;
      }
    }
    if (bestIndex !== -1) {
      matches.push({ rule, matchIndex: bestIndex });
      seenRuleIds.add(rule.id);
    }
  }

  matches.sort((a, b) => a.matchIndex - b.matchIndex || a.rule.drugName.localeCompare(b.rule.drugName));
  return matches.slice(0, limit).map((m) => m.rule);
}
