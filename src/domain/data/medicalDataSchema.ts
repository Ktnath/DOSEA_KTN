import { z } from 'zod';
import type { Drug, Protocol } from '../../types';

/**
 * Schéma de validation des données médicales versionnées (public/data/*.json).
 *
 * Ce module ne calcule ni n'invente aucune posologie : il vérifie uniquement
 * que les données déjà présentes sont structurellement et cliniquement
 * cohérentes (champs requis, doses positives, traçabilité de la source).
 */

/**
 * Une dose de 0 (recommendedDoseMgPerKg / maxDoseMg) n'est acceptée que pour
 * les médicaments à dose fixe non pondérale (ex: Nystatine en badigeonnage),
 * et uniquement si les notes le justifient explicitement. Sans cette mention,
 * une dose à 0 est traitée comme une donnée invalide plutôt que comme une
 * posologie réelle.
 */
const ZERO_DOSE_JUSTIFICATION_PATTERN = /pas de dose mg\/kg/i;

function hasZeroDoseJustification(notes: string | undefined): boolean {
  return !!notes && ZERO_DOSE_JUSTIFICATION_PATTERN.test(notes);
}

const DilutionInfoSchema = z.object({
  fluid: z.string().min(1, 'dilution.fluid ne doit pas être vide'),
  standardConcentrationMgPerMl: z.number().positive().optional(),
  bolusTimeMinutes: z.number().positive().optional(),
  continuousInfusion: z.boolean().optional(),
});

const DrugBaseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'name ne doit pas être vide'),
  class: z.string().min(1, 'class ne doit pas être vide'),
  subClass: z.string().optional(),
  system: z.string().optional(),
  dilution: DilutionInfoSchema.optional(),
  recommendedDoseMgPerKg: z.number().nonnegative('recommendedDoseMgPerKg doit être >= 0'),
  maxDoseMg: z.number().nonnegative('maxDoseMg doit être >= 0'),
  maxDailyDoseMg: z.number().positive('maxDailyDoseMg doit être > 0 si présent').optional(),
  frequencyPerDay: z.number().positive('frequencyPerDay doit être > 0 si présent').optional(),
  minIntervalHours: z.number().positive('minIntervalHours doit être > 0 si présent').optional(),
  route: z.string().min(1, 'route ne doit pas être vide'),
  indications: z.string().optional(),
  notes: z.string().min(1, 'notes (avec source clinique) requis'),
  concentrationMgPerMl: z.number().positive('concentrationMgPerMl doit être > 0 si présent').optional(),
});

export const DrugSchema = DrugBaseSchema.superRefine((drug, ctx) => {
  if (drug.recommendedDoseMgPerKg === 0 && !hasZeroDoseJustification(drug.notes)) {
    ctx.addIssue({
      code: 'custom',
      path: ['recommendedDoseMgPerKg'],
      message:
        "recommendedDoseMgPerKg doit être > 0, sauf si notes justifie explicitement une dose fixe (ex: 'Pas de dose mg/kg')",
    });
  }
  if (drug.maxDoseMg === 0 && !hasZeroDoseJustification(drug.notes)) {
    ctx.addIssue({
      code: 'custom',
      path: ['maxDoseMg'],
      message:
        "maxDoseMg doit être > 0, sauf si notes justifie explicitement une dose fixe (ex: 'Pas de dose mg/kg')",
    });
  }
});

export const DrugsFileSchema = z.array(DrugSchema).min(1, 'drugs.json ne doit pas être vide');

const ProtocolDrugRefSchema = z.object({
  drugName: z.string().min(1, 'drugName ne doit pas être vide'),
  indicationOverride: z.string().optional(),
});

export const ProtocolSchema = z.object({
  id: z.string().min(1, 'id ne doit pas être vide'),
  name: z.string().min(1, 'name ne doit pas être vide'),
  description: z.string().min(1, 'description ne doit pas être vide'),
  source: z.string().min(1, 'source ne doit pas être vide'),
  drugs: z.array(ProtocolDrugRefSchema).min(1, 'drugs doit contenir au moins un médicament'),
});

export const ProtocolsFileSchema = z.array(ProtocolSchema).min(1, 'protocols.json ne doit pas être vide');

/**
 * Vérifie que chaque `drugName` référencé par un protocole correspond bien à
 * un médicament existant dans drugs.json (par nom exact, tel qu'utilisé par
 * l'application pour résoudre un protocole vers ses médicaments).
 */
export function checkProtocolDrugReferences(
  protocols: Pick<Protocol, 'id' | 'name' | 'drugs'>[],
  drugs: Pick<Drug, 'name'>[],
): string[] {
  const knownDrugNames = new Set(drugs.map((drug) => drug.name));
  const errors: string[] = [];

  for (const protocol of protocols) {
    for (const drugRef of protocol.drugs) {
      if (!knownDrugNames.has(drugRef.drugName)) {
        errors.push(
          `protocole "${protocol.name}" (${protocol.id}): médicament "${drugRef.drugName}" introuvable dans drugs.json`,
        );
      }
    }
  }

  return errors;
}
