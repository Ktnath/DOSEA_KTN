import { z } from 'zod';

/**
 * Schéma de validation Zod pour le modèle médical V2 (`DrugV2`, voir ./types.ts).
 *
 * Ce module ne calcule ni n'invente aucune posologie : il vérifie uniquement
 * que les données pilotes déjà présentes (src/domain/medicalModel/pilotDrugs.v2.ts)
 * sont structurellement et cliniquement cohérentes (champs requis, doses
 * positives, traçabilité des sources avant validation finale).
 */

export const ValidationStatusSchema = z.enum(['draft', 'reviewed', 'validated', 'disabled']);

export const MedicalReferenceSchema = z.object({
  id: z.string().min(1, 'id ne doit pas être vide'),
  title: z.string().min(1, 'title ne doit pas être vide'),
  organization: z.string().min(1, 'organization ne doit pas être vide'),
  year: z.number(),
  url: z.string().optional(),
  documentName: z.string().optional(),
  page: z.string().optional(),
  excerpt: z.string().optional(),
  accessedAt: z.string().optional(),
  validatedBy: z.string().optional(),
  validationDate: z.string().optional(),
});

export const DrugConcentrationSchema = z.object({
  label: z.string().min(1, 'concentration.label ne doit pas être vide'),
  value: z.number().positive('concentration.value doit être > 0'),
  unit: z.string().min(1, 'concentration.unit ne doit pas être vide'),
  isDefault: z.boolean().optional(),
});

export const DrugFormSchema = z.object({
  form: z.string().min(1, 'form ne doit pas être vide'),
  route: z.string().min(1, 'route ne doit pas être vide'),
  concentrations: z.array(DrugConcentrationSchema),
  notes: z.string().optional(),
});

/**
 * Une dosingRule en `validated` doit pouvoir justifier sa dose : au moins une
 * référence structurée est requise. Les statuts `draft`/`reviewed`/`disabled`
 * peuvent exister avec une source incomplète, mais doivent alors rester à ce
 * statut moins strict.
 */
export const DosingRuleSchema = z
  .object({
    id: z.string().min(1, 'dosingRule.id ne doit pas être vide'),
    indication: z.string().min(1, 'dosingRule.indication ne doit pas être vide'),
    route: z.string().min(1, 'dosingRule.route ne doit pas être vide'),

    ageMinDays: z.number().optional(),
    ageMaxDays: z.number().optional(),
    weightMinKg: z.number().optional(),
    weightMaxKg: z.number().optional(),
    gestationalAgeMinWeeks: z.number().optional(),

    doseMgPerKg: z.number().positive('dosingRule.doseMgPerKg doit être > 0 si présent').optional(),
    doseMgPerKgPerDay: z
      .number()
      .positive('dosingRule.doseMgPerKgPerDay doit être > 0 si présent')
      .optional(),
    fixedDoseMg: z.number().positive('dosingRule.fixedDoseMg doit être > 0 si présent').optional(),

    maxDoseMg: z.number().positive('dosingRule.maxDoseMg doit être > 0 si présent').optional(),
    maxDailyDoseMg: z
      .number()
      .positive('dosingRule.maxDailyDoseMg doit être > 0 si présent')
      .optional(),

    frequencyPerDay: z
      .number()
      .positive('dosingRule.frequencyPerDay doit être > 0 si présent')
      .optional(),
    minIntervalHours: z
      .number()
      .positive('dosingRule.minIntervalHours doit être > 0 si présent')
      .optional(),
    duration: z.string().optional(),

    renalAdjustment: z.string().optional(),
    hepaticAdjustment: z.string().optional(),

    references: z.array(MedicalReferenceSchema),
    validationStatus: ValidationStatusSchema,
    notes: z.string().optional(),
  })
  .superRefine((rule, ctx) => {
    if (rule.validationStatus === 'validated' && rule.references.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['references'],
        message:
          "dosingRule.validationStatus 'validated' nécessite au moins une référence structurée (references)",
      });
    }
  });

export const SafetyWarningRuleSchema = z.object({
  code: z.string().min(1, 'safetyWarning.code ne doit pas être vide'),
  severity: z.enum(['info', 'warning', 'danger', 'blocker']),
  conditionLabel: z.string().min(1, 'safetyWarning.conditionLabel ne doit pas être vide'),
  message: z.string().min(1, 'safetyWarning.message ne doit pas être vide'),
  rationale: z.string().optional(),
  references: z.array(MedicalReferenceSchema).optional(),
});

export const DrugV2Schema = z
  .object({
    id: z.string().optional(),
    dci: z.string().min(1, 'dci ne doit pas être vide'),
    displayName: z.string().min(1, 'displayName ne doit pas être vide'),
    commercialNames: z.array(z.string()).optional(),
    class: z.string().min(1, 'class ne doit pas être vide'),
    subClass: z.string().optional(),
    system: z.string().optional(),

    forms: z.array(DrugFormSchema).min(1, 'forms doit contenir au moins une forme'),
    dosingRules: z.array(DosingRuleSchema).min(1, 'dosingRules doit contenir au moins une règle'),
    safetyWarnings: z.array(SafetyWarningRuleSchema).optional(),

    references: z.array(MedicalReferenceSchema),
    validationStatus: ValidationStatusSchema,
    version: z.number(),
    lastUpdatedAt: z.string().optional(),
  })
  .superRefine((drug, ctx) => {
    if (drug.validationStatus === 'validated' && drug.references.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['references'],
        message:
          "validationStatus 'validated' nécessite au moins une référence structurée (references)",
      });
    }
  });

export const PilotDrugsV2FileSchema = z.array(DrugV2Schema);
