import type { Drug } from '../../types';
import type { DosingRule, DrugConcentration, DrugForm, DrugV2, MedicalReference, ValidationStatus } from './types';

/** Statut imposé à toute conversion automatique : une conversion n'est pas une revue clinique. */
const LEGACY_VALIDATION_STATUS: ValidationStatus = 'draft';

const SOURCE_PATTERN = /\(Source\s*:\s*([^)]+)\)/i;
const YEAR_PATTERN = /\b(19|20)\d{2}\b/;

let legacyReferenceCounter = 0;

/**
 * Extrait une référence structurée des notes legacy (ex: "(Source: CHU Ste-Justine 2018)").
 * Une référence n'est créée que si une organisation ET une année sont identifiables dans
 * le texte : le champ `year` de MedicalReference est obligatoire et ne doit jamais être
 * inventé. Si la source n'est pas structurée de cette façon, aucune référence n'est créée.
 */
function extractReferenceFromNotes(notes: string | undefined, drugId: string): MedicalReference | undefined {
  if (!notes) {
    return undefined;
  }
  const sourceMatch = notes.match(SOURCE_PATTERN);
  if (!sourceMatch) {
    return undefined;
  }
  const sourceText = sourceMatch[1].trim();
  const yearMatch = sourceText.match(YEAR_PATTERN);
  if (!yearMatch) {
    return undefined;
  }
  const year = Number(yearMatch[0]);
  const organization = sourceText.replace(YEAR_PATTERN, '').trim();

  return {
    id: `legacy-ref-${drugId}-${legacyReferenceCounter++}`,
    title: sourceText,
    organization: organization || sourceText,
    year,
  };
}

function buildLegacyConcentration(drug: Drug): DrugConcentration[] {
  if (drug.concentrationMgPerMl === undefined) {
    return [];
  }
  return [
    {
      label: `${drug.concentrationMgPerMl} mg/mL`,
      value: drug.concentrationMgPerMl,
      unit: 'mg/mL',
      isDefault: true,
    },
  ];
}

function buildLegacyForm(drug: Drug): DrugForm {
  return {
    form: drug.concentrationMgPerMl !== undefined ? 'Liquide' : 'Non spécifiée',
    route: drug.route,
    concentrations: buildLegacyConcentration(drug),
  };
}

function buildLegacyDosingRule(drug: Drug, id: string, reference: MedicalReference | undefined): DosingRule {
  return {
    id,
    indication: drug.indications ?? drug.class,
    route: drug.route,
    doseMgPerKg: drug.recommendedDoseMgPerKg,
    maxDoseMg: drug.maxDoseMg,
    maxDailyDoseMg: drug.maxDailyDoseMg,
    frequencyPerDay: drug.frequencyPerDay,
    minIntervalHours: drug.minIntervalHours,
    references: reference ? [reference] : [],
    validationStatus: LEGACY_VALIDATION_STATUS,
    notes: drug.notes,
  };
}

/**
 * Convertit un `Drug` legacy (src/types.ts, lu depuis public/data/drugs.json)
 * vers le modèle clinique versionné `DrugV2` (src/domain/medicalModel/types.ts).
 *
 * Aucune donnée clinique n'est inventée ou déduite : le médicament legacy devient
 * un DrugV2 avec une seule forme (déduite de la route et de la concentration
 * existantes) et une seule règle de dosage générique, reprenant exactement les
 * valeurs d'origine. Les champs absents du legacy (bornes d'âge/poids, terme,
 * ajustement rénal/hépatique...) restent `undefined` plutôt que d'être supposés.
 * Une référence structurée n'est créée que si les notes contiennent une mention
 * de source explicite avec une année ; sinon les notes sont conservées telles
 * quelles sur la règle de dosage, sans inventer de référence précise.
 */
export function legacyDrugToDrugV2(drug: Drug): DrugV2 {
  const id = drug.id !== undefined ? `legacy-${drug.id}` : `legacy-${drug.name}`;
  const reference = extractReferenceFromNotes(drug.notes, id);

  return {
    id,
    dci: drug.name,
    displayName: drug.name,
    class: drug.class,
    subClass: drug.subClass,
    system: drug.system,
    forms: [buildLegacyForm(drug)],
    dosingRules: [buildLegacyDosingRule(drug, `${id}-rule-0`, reference)],
    references: reference ? [reference] : [],
    validationStatus: LEGACY_VALIDATION_STATUS,
    version: 1,
  };
}
