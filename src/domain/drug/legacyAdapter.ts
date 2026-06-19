import type { Drug } from '../../types';
import type { DrugFormV2, DrugV2, IndicationDoseV2, ValidationStatus } from './types';

const LEGACY_SOURCE_FALLBACK = 'Source non spécifiée (import legacy)';
const SOURCE_PATTERN = /\(Source\s*:\s*([^)]+)\)/i;

/** Statut imposé à toute conversion automatique : une conversion n'est pas une revue clinique. */
const LEGACY_VALIDATION_STATUS: ValidationStatus = 'draft';

function buildLegacyId(drug: Drug): string {
  return `legacy-${drug.id ?? drug.name}`;
}

/** Extrait la source citée dans les notes legacy (ex: "(Source: CHU Ste-Justine 2018)"). */
function extractSourceFromNotes(notes?: string): string {
  if (!notes) {
    return LEGACY_SOURCE_FALLBACK;
  }
  const match = notes.match(SOURCE_PATTERN);
  return match ? match[1].trim() : LEGACY_SOURCE_FALLBACK;
}

function buildLegacyForm(drug: Drug, id: string): DrugFormV2 {
  return {
    id,
    label: drug.concentrationMgPerMl
      ? `${drug.name} ${drug.concentrationMgPerMl} mg/mL`
      : drug.name,
    route: drug.route,
    concentrationMgPerMl: drug.concentrationMgPerMl,
  };
}

function buildLegacyIndication(drug: Drug, id: string): IndicationDoseV2 {
  return {
    id,
    label: drug.indications ?? drug.class,
    route: drug.route,
    doseMgPerKg: drug.recommendedDoseMgPerKg,
    maxDosePerIntakeMg: drug.maxDoseMg,
    maxDailyDoseMg: drug.maxDailyDoseMg,
    frequencyPerDay: drug.frequencyPerDay,
    intervalHours: drug.minIntervalHours,
    contraindications: [],
    precautions: [],
    source: extractSourceFromNotes(drug.notes),
    validationStatus: LEGACY_VALIDATION_STATUS,
    notes: drug.notes,
  };
}

/**
 * Convertit un `Drug` legacy (src/types.ts, lu depuis public/data/drugs.json)
 * vers le modèle clinique versionné `DrugV2`.
 *
 * Aucune donnée clinique n'est inventée ou déduite : chaque médicament legacy
 * devient un DrugV2 avec une seule forme et une seule indication, reprenant
 * exactement les valeurs d'origine. Les champs absents du legacy (âge/poids
 * min/max, durée, contre-indications, précautions, date de source) restent
 * `undefined` ou vides plutôt que d'être supposés. Le statut de validation
 * est toujours `'draft'`, car cette conversion automatique ne constitue pas
 * une revue clinique au sens du modèle versionné.
 */
export function legacyDrugToDrugV2(drug: Drug): DrugV2 {
  const baseId = buildLegacyId(drug);

  return {
    id: baseId,
    legacyId: drug.id,
    name: drug.name,
    class: drug.class,
    subClass: drug.subClass,
    system: drug.system,
    forms: [buildLegacyForm(drug, `${baseId}-form-0`)],
    indications: [buildLegacyIndication(drug, `${baseId}-indication-0`)],
    dilution: drug.dilution,
  };
}
