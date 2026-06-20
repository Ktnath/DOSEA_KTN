/**
 * Validation du package clinique V2 ("dosing_rules_v2.validated.json", validé
 * par Dr KAPTO le 2026-06-20) :
 * - conformité de schéma de la donnée source brute et des alertes cliniques,
 * - couverture complète de l'encodage manuel des conditions (80/80 règles),
 * - robustesse du moteur déterministe (`evaluateDosingRule`) sur l'ensemble
 *   de la base réelle (aucune exception, quel que soit le statut retourné),
 * - récapitulatif des points nécessitant une validation/clarification
 *   clinique humaine (`manualReviewNotes`), pour suivi par Dr KAPTO.
 *
 * N'altère, n'arrondit ni n'invente aucune donnée clinique : ce script lit
 * uniquement les modules déjà construits par le domaine V2.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { ClinicalWarningV2RawSchema, DosingRulesV2FileSchema } from '../src/domain/dosingRulesV2/dosingRuleV2Schema';
import { manualConditionEncoding } from '../src/domain/dosingRulesV2/encoding/manualConditionEncoding';
import { ALL_DOSING_RULES_V2 } from '../src/domain/dosingRulesV2/ruleMatcher';
import { evaluateDosingRule } from '../src/domain/dosingRulesV2/evaluateDosingRule';
import { DOSEA_CLINICAL_WARNINGS_V2 } from '../src/data/dosingRulesV2/clinicalWarnings.generated';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data', 'dosingRulesV2');

let hasError = false;

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - [${issue.path.length > 0 ? issue.path.join('.') : '(racine)'}] ${issue.message}`)
    .join('\n');
}

// 1. Schéma de la donnée source brute.
const sourceRaw = JSON.parse(readFileSync(path.join(dataDir, 'dosing_rules_v2.validated.json'), 'utf-8'));
const sourceResult = DosingRulesV2FileSchema.safeParse(sourceRaw);
if (!sourceResult.success) {
  hasError = true;
  console.error(`FAIL dosing_rules_v2.validated.json (${sourceResult.error.issues.length} erreur(s)):`);
  console.error(formatIssues(sourceResult.error));
} else {
  console.log(`OK   dosing_rules_v2.validated.json (${sourceResult.data.rules.length} règle(s) conformes au schéma)`);
}

// 2. Schéma des alertes cliniques.
const warningsResult = z.array(ClinicalWarningV2RawSchema).safeParse(DOSEA_CLINICAL_WARNINGS_V2);
if (!warningsResult.success) {
  hasError = true;
  console.error(`FAIL clinicalWarnings.generated.ts (${warningsResult.error.issues.length} erreur(s)):`);
  console.error(formatIssues(warningsResult.error));
} else {
  console.log(`OK   clinicalWarnings.generated.ts (${warningsResult.data.length} alerte(s) conformes au schéma)`);
}

// 3. Couverture complète de l'encodage manuel des conditions (toutes les
//    règles source doivent avoir un encodage, même vide/à blocages connus).
if (sourceResult.success) {
  const sourceRuleIds = new Set(sourceResult.data.rules.map((r) => r.rule_id));
  const encodedRuleIds = new Set(Object.keys(manualConditionEncoding));
  const missingEncoding = [...sourceRuleIds].filter((id) => !encodedRuleIds.has(id));
  const extraEncoding = [...encodedRuleIds].filter((id) => !sourceRuleIds.has(id));

  if (missingEncoding.length > 0) {
    hasError = true;
    console.error(`FAIL encodage manuel manquant pour ${missingEncoding.length} règle(s):`);
    missingEncoding.forEach((id) => console.error(`  - ${id}`));
  }
  if (extraEncoding.length > 0) {
    hasError = true;
    console.error(`FAIL encodage manuel pour des rule_id absents de la source (${extraEncoding.length}):`);
    extraEncoding.forEach((id) => console.error(`  - ${id}`));
  }
  if (missingEncoding.length === 0 && extraEncoding.length === 0) {
    console.log(`OK   encodage manuel des conditions présent pour les ${sourceRuleIds.size} règles (couverture 1:1)`);
  }
}

// 4. Robustesse du moteur déterministe sur l'ensemble de la base réelle.
let crashes = 0;
const statusCounts: Record<string, number> = {};
const REPRESENTATIVE_INPUTS = [
  { weightKg: 3, ageDays: 5, gestationalAgeWeeks: 32, postMenstrualAgeWeeks: 34 },
  { weightKg: 10, ageDays: 365, gestationalAgeWeeks: 40, postMenstrualAgeWeeks: 92 },
];

for (const rule of ALL_DOSING_RULES_V2) {
  for (const base of REPRESENTATIVE_INPUTS) {
    for (const route of [undefined, ...(rule.route ?? [])]) {
      for (const indication of [undefined, ...(rule.indications ?? [])]) {
        try {
          const result = evaluateDosingRule({ drugName: rule.drugName, route, indication, ...base });
          statusCounts[result.status] = (statusCounts[result.status] ?? 0) + 1;
        } catch (error) {
          crashes += 1;
          console.error(`CRASH ${rule.id} route=${route} indication=${indication}: ${(error as Error).message}`);
        }
      }
    }
  }
}

if (crashes > 0) {
  hasError = true;
  console.error(`FAIL moteur déterministe: ${crashes} exception(s) levée(s) sur la base réelle.`);
} else {
  console.log(`OK   moteur déterministe: 0 exception sur ${Object.values(statusCounts).reduce((a, b) => a + b, 0)} évaluations. Répartition des statuts: ${JSON.stringify(statusCounts)}`);
}

// 5. Récapitulatif des points nécessitant une validation/clarification clinique humaine.
const rulesWithReviewNotes = ALL_DOSING_RULES_V2.filter((r) => r.manualReviewNotes.length > 0);
console.log(`INFO ${rulesWithReviewNotes.length}/${ALL_DOSING_RULES_V2.length} règle(s) nécessitent une revue clinique manuelle (status='requires_manual_review'):`);
for (const rule of rulesWithReviewNotes) {
  console.log(`  - ${rule.id} (${rule.drugName}):`);
  for (const note of rule.manualReviewNotes) {
    console.log(`      • ${note}`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log('Validation du package clinique V2: succès.');
