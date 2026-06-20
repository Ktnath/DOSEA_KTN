/**
 * Schéma Zod de la donnée source brute `dosing_rules_v2.validated.json` (un
 * `DosingRuleV2Raw` par entrée). Sert uniquement à valider la forme des
 * données copiées verbatim depuis le package validé — ne réinterprète,
 * n'arrondit ni ne complète aucune valeur clinique.
 */

import { z } from 'zod';

export const DosingRuleV2RawSchema = z.object({
  rule_id: z.string().min(1),
  source_excel_row_id: z.number().int().nullable(),
  drug: z.object({
    name: z.string().min(1),
    class: z.string(),
    subclass: z.string(),
    clinical_system: z.string(),
    aliases: z.array(z.string()),
  }),
  validated: z.object({
    status: z.string(),
    validator: z.string(),
    validation_date: z.string(),
    decision_review: z.string(),
    source_status: z.string(),
  }),
  clinical_context: z.object({
    routes: z.array(z.string()),
    indications: z.array(z.string()),
    dilution_or_administration: z.string(),
  }),
  dose_expression: z.object({
    raw_current_posology: z.string(),
    validated_posology_text: z.string(),
    structured_parameters_from_review_table: z.object({
      dose_app_mg_per_kg: z.number().nullable(),
      max_per_dose_mg: z.number().nullable(),
      max_per_day_mg: z.number().nullable(),
      frequency_per_day: z.number().nullable(),
      minimum_interval_hours: z.number().nullable(),
      concentration_mg_per_ml: z.number().nullable(),
    }),
    rule_type: z.enum(['simple_or_semi_simple', 'semi_structured', 'conditional_or_algorithmic']),
    encoding_dimensions: z.array(z.string()),
    conditions_to_encode_text: z.string(),
  }),
  sources: z.object({
    declared_source_label: z.string(),
    drive_urls: z.array(z.string()),
    source_section_or_page_text: z.string(),
  }),
  safety: z.object({
    safety_flags: z.array(z.string()),
    reviewer_comment: z.string(),
    app_status: z.string(),
  }),
  implementation: z.object({
    target_engine: z.string(),
    recommended_encoding_status: z.string(),
    requires_manual_programming_of_conditions: z.boolean(),
    do_not_use_as_blind_single_mg_per_kg: z.boolean(),
  }),
});

export const DosingRulesV2FileSchema = z.object({
  schema_version: z.string().optional(),
  generated_at: z.string().optional(),
  input_file: z.string().optional(),
  validation_basis: z.string().optional(),
  important_warning: z.string().optional(),
  records_count: z.number().int(),
  rules: z.array(DosingRuleV2RawSchema),
});

export const ClinicalWarningV2RawSchema = z.object({
  rule_id: z.string().min(1),
  drug_name: z.string().min(1),
  flags: z.array(z.string()),
  warning_text: z.string(),
});
