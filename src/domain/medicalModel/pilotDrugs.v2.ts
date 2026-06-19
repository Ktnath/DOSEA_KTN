/**
 * FICHIER PILOTE — DrugV2 pour 10 médicaments prioritaires.
 *
 * ⚠️ NON UTILISÉ EN PRODUCTION.
 * ⚠️ NÉCESSITE UNE VALIDATION MÉDICALE HUMAINE avant toute utilisation clinique.
 * ⚠️ NE CONSTITUE PAS UNE SOURCE DE VÉRITÉ CLINIQUE.
 *
 * Ce module génère une première représentation V2 (`DrugV2`, voir ./types.ts)
 * pour 10 médicaments pilotes, en convertissant tel quel les entrées déjà
 * présentes dans `public/data/drugs.json` via `legacyDrugToDrugV2`. Aucune
 * posologie, indication ou source n'est inventée, modifiée ou enrichie ici :
 * toutes les valeurs proviennent strictement de la base legacy existante.
 *
 * Toutes les entrées (médicaments et règles de dosage) restent au statut
 * `validationStatus: 'draft'`, conformément à `legacyDrugToDrugV2`, qui impose
 * ce statut à toute conversion automatique.
 *
 * La base actuelle `public/data/drugs.json` n'est ni modifiée ni remplacée
 * par ce fichier ; cette base pilote est strictement séparée et destinée à
 * la revue médicale humaine.
 */
import drugsFixture from '../../../public/data/drugs.json';
import type { Drug } from '../../types';
import { legacyDrugToDrugV2 } from './legacyAdapter';
import type { DrugV2 } from './types';

/** Noms (exacts ou proches) des 10 médicaments pilotes, tels qu'ils apparaissent dans drugs.json. */
export const PILOT_DRUG_NAMES = [
  'Paracétamol',
  'Ibuprofène',
  'Amoxicilline',
  'Ceftriaxone',
  'Ampicilline',
  'Gentamicine',
  'Diazépam',
  'Artésunate',
  'Adrénaline (Épinéphrine)',
  'Salbutamol (nébulisation)',
] as const;

const legacyDrugs = drugsFixture as Drug[];

function findLegacyDrug(name: string): Drug | undefined {
  return legacyDrugs.find((drug) => drug.name === name);
}

/**
 * Liste des noms pilotes absents de la base legacy actuelle (`public/data/drugs.json`).
 * Doit normalement être vide ; sert de signal explicite si la base legacy change.
 */
export const MISSING_PILOT_DRUG_NAMES: string[] = PILOT_DRUG_NAMES.filter(
  (name) => findLegacyDrug(name) === undefined,
);

/**
 * Base pilote DrugV2 : conversion directe des 10 médicaments prioritaires
 * trouvés dans la base legacy, sans aucune donnée ajoutée ou modifiée.
 */
export const pilotDrugsV2: DrugV2[] = PILOT_DRUG_NAMES.map(findLegacyDrug)
  .filter((drug): drug is Drug => drug !== undefined)
  .map(legacyDrugToDrugV2);
