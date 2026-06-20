/**
 * Encodage manuel des conditions cliniques pour les 80 règles de
 * `dosing_rules_v2.validated.json`, dérivé exclusivement du texte source validé
 * (`raw_current_posology` / `validated_posology_text`), champ par champ.
 *
 * Règles de construction (appliquées uniformément, voir aussi les commentaires
 * de ./../types.ts) :
 * - Aucun seuil numérique n'est ajouté s'il n'est pas explicitement présent dans
 *   le texte source. Quand un seuil est référencé sans valeur chiffrée (ex.
 *   "intervalle selon âge postmenstruel" sans bornes), la branche est marquée
 *   `intervalUnresolvedFromSource` et un point est ajouté à `manualReviewNotes`.
 * - Quand seul un plafond journalier est donné sans dose par administration
 *   chiffrée, la branche est marquée `doseAmountUnresolvedFromSource` : le
 *   moteur ne doit jamais diviser ce plafond pour inventer une dose unitaire.
 * - Les plafonds `maxPerDoseMg` / `maxPerDayMg` proviennent par défaut de
 *   `structured_parameters_from_review_table` (max_per_dose_mg / max_per_day_mg)
 *   lorsque le texte source ne donne pas lui-même un plafond explicite différent
 *   : il s'agit de plafonds de sécurité (qui ne peuvent que réduire une dose déjà
 *   calculée vers une borne plus sûre), pas de la dose elle-même — leur usage
 *   n'enfreint donc pas l'interdiction d'inventer une posologie. Quand le texte
 *   source donne lui-même un plafond explicite (ex. diazépam "Max 10 mg/dose"),
 *   ce dernier est utilisé.
 * - Convention de bornes : *MinX inclusif, *MaxX exclusif quand le texte source
 *   utilise "<" (voir DoseBranchCondition dans ../types.ts). Pour les bandes
 *   explicites de type "A-B kg" ou "A-Bkg", les deux bornes sont inclusives.
 * - Les qualificatifs cliniques non chiffrables (ex. "à terme", "prématuré" sans
 *   seuil, "si toléré") sont conservés via `freeTextCondition` ou `sourceNote`,
 *   jamais convertis en seuil numérique inventé.
 */

import type {
  DoseAmount,
  DoseAmountKind,
  DoseBranch,
  DoseBranchCondition,
  DoseBranchRole,
  DoseSchedule,
  DosingRuleConditionEncoding,
} from '../types';

function amt(
  kind: DoseAmountKind,
  min: number,
  max: number = min,
  displayUnit: DoseAmount['displayUnit'] = 'mg',
): DoseAmount {
  return { kind, valueMin: min, valueMax: max, displayUnit };
}

interface BranchOptions {
  role?: DoseBranchRole;
  condition?: DoseBranchCondition;
  schedule?: DoseSchedule;
  maxPerDoseMg?: number;
  maxPerDayMg?: number;
  maxPerDayMgPerKg?: number;
  concentrationMgPerMl?: number;
  doseAmountUnresolvedFromSource?: boolean;
  sourceNote?: string;
}

function branch(id: string, amount: DoseAmount, options: BranchOptions = {}): DoseBranch {
  return {
    id,
    role: options.role ?? 'standard',
    condition: options.condition ?? {},
    amount,
    schedule: options.schedule ?? {},
    maxPerDoseMg: options.maxPerDoseMg,
    maxPerDayMg: options.maxPerDayMg,
    maxPerDayMgPerKg: options.maxPerDayMgPerKg,
    concentrationMgPerMl: options.concentrationMgPerMl,
    doseAmountUnresolvedFromSource: options.doseAmountUnresolvedFromSource,
    sourceNote: options.sourceNote,
  };
}

function rule(ruleId: string, branches: DoseBranch[], manualReviewNotes: string[] = []): DosingRuleConditionEncoding {
  return { ruleId, branches, manualReviewNotes };
}

function interval(min: number, max: number = min): DoseSchedule {
  return { intervalHoursMin: min, intervalHoursMax: max };
}

function freq(min: number, max: number = min): DoseSchedule {
  return { frequencyPerDayMin: min, frequencyPerDayMax: max };
}

function freqInterval(freqMin: number, freqMax: number, hMin: number, hMax: number = hMin): DoseSchedule {
  return { frequencyPerDayMin: freqMin, frequencyPerDayMax: freqMax, intervalHoursMin: hMin, intervalHoursMax: hMax };
}

export const manualConditionEncoding: Record<string, DosingRuleConditionEncoding> = {
  // 001 — Paracétamol
  dosea_v2_001_paracetamol: rule(
    'dosea_v2_001_paracetamol',
    [
      branch('po-standard', amt('mg_per_kg', 10, 15), {
        condition: { routes: ['Orale'] },
        schedule: interval(6, 8),
        maxPerDoseMg: 1000,
        maxPerDayMg: 3000,
      }),
      branch('po-premature', amt('mg_per_kg', 10, 15), {
        condition: { routes: ['Orale'], postMenstrualAgeMaxWeeks: 37 },
        schedule: interval(8, 8),
        maxPerDoseMg: 1000,
        maxPerDayMg: 3000,
        sourceNote: "Intervalle fixé à q8h si < 37 sem (le texte source ne précise pas s'il s'agit de l'âge gestationnel ou postmenstruel).",
      }),
      branch('ir-standard', amt('mg_per_kg', 20, 20), {
        condition: { routes: ['Rectale'] },
        schedule: interval(6, 8),
        maxPerDoseMg: 1000,
        maxPerDayMg: 3000,
      }),
    ],
    [
      "Seuil de 37 semaines (modification de l'intervalle PO chez le prématuré) non qualifié explicitement comme âge gestationnel ou postmenstruel dans le texte source : encodé en postMenstrualAgeMaxWeeks par défaut, à confirmer cliniquement.",
    ],
  ),

  // 002 — Ibuprofène
  dosea_v2_002_ibuprofene: rule(
    'dosea_v2_002_ibuprofene',
    [
      branch('po-general', amt('mg_per_kg_per_day', 0, 0), {
        condition: { routes: ['Orale'] },
        schedule: freq(3, 3),
        maxPerDayMgPerKg: 40,
        doseAmountUnresolvedFromSource: true,
        sourceNote: 'Max 40 mg/kg/jour répartis en 3 prises (dose unitaire mg/kg non chiffrée explicitement dans le texte source).',
      }),
      branch('canal-arteriel-charge', amt('mg_per_kg', 10, 10), {
        role: 'loading',
        condition: { indications: ['Canal artériel'] },
        schedule: freq(1, 1),
        sourceNote: 'Canal artériel (IV néonatal) : dose de charge unique.',
      }),
      branch('canal-arteriel-maintien', amt('mg_per_kg', 5, 5), {
        role: 'maintenance',
        condition: { indications: ['Canal artériel'] },
        schedule: { frequencyPerDayMin: 1, frequencyPerDayMax: 1, intervalHoursMin: 24, intervalHoursMax: 24, durationText: '2 doses au total après la charge' },
      }),
    ],
    [
      "Voie IV mentionnée pour le canal artériel bien que clinical_context.routes ne déclare que 'Orale' : à confirmer.",
      'Dose unitaire PO non chiffrée pour la posologie générale (seul le plafond journalier 40 mg/kg/j est donné dans le texte source) : calcul de dose par prise bloqué pour cette branche.',
    ],
  ),

  // 003 — Amoxicilline
  dosea_v2_003_amoxicilline: rule(
    'dosea_v2_003_amoxicilline',
    [
      branch('infection-standard', amt('mg_per_kg_per_day', 80, 90), {
        schedule: freq(2, 3),
        sourceNote: 'OMA, pneumonie.',
      }),
      branch('prophylaxie-urinaire', amt('mg_per_kg_per_day', 20, 20), {
        role: 'prophylaxis',
        condition: { indications: ['prophylaxie urinaire'] },
        schedule: freq(1, 1),
      }),
    ],
    [],
  ),

  // 004 — Salbutamol (nébulisation)
  dosea_v2_004_salbutamol_nebulisation: rule(
    'dosea_v2_004_salbutamol_nebulisation',
    [
      branch('nebulisation', amt('mg_per_kg', 0.1, 0.15), {
        role: 'nebulization',
        condition: { routes: ['Nébulisation'] },
        schedule: interval(2, 6),
        maxPerDoseMg: 5,
        maxPerDayMg: 20,
      }),
      branch('aerosol-doseur', amt('fixed_mg', 100, 200, 'mcg'), {
        role: 'inhaler',
        condition: { routes: ['Inhalation'] },
        schedule: interval(2, 6),
        maxPerDoseMg: 5,
        maxPerDayMg: 20,
      }),
      branch('hyperkaliemie', amt('fixed_mg', 0.4, 0.4), {
        condition: { indications: ['hyperkaliémie'] },
        role: 'nebulization',
        schedule: interval(2, 2),
        maxPerDoseMg: 5,
      }),
    ],
    [],
  ),

  // 005 — Ampicilline
  dosea_v2_005_ampicilline: rule(
    'dosea_v2_005_ampicilline',
    [
      branch('sepsis', amt('mg_per_kg', 50, 50), {
        condition: { indications: ['Sepsis néonatal'] },
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDayMgPerKg: 300,
      }),
      branch('meningite-strepto-b', amt('mg_per_kg_per_day', 200, 300), {
        condition: { indications: ['méningite à streptocoques B'] },
        schedule: { frequencyPerDayMin: 3, frequencyPerDayMax: 4, intervalHoursMin: 6, intervalHoursMax: 8, intervalUnresolvedFromSource: true },
        maxPerDayMgPerKg: 300,
      }),
    ],
    [
      "Intervalle d'administration mentionné comme dépendant de l'âge postmenstruel mais aucune borne numérique par tranche n'est donnée dans le texte source ; intervalle q6-8h (méningite) conservé tel qu'écrit, à valider cliniquement selon l'âge postmenstruel réel. Pour le sepsis, aucun intervalle n'est donné du tout.",
    ],
  ),

  // 006 — Gentamicine
  dosea_v2_006_gentamicine: rule(
    'dosea_v2_006_gentamicine',
    [
      branch('pma-lt30', amt('mg_per_kg', 3.8, 3.8), {
        condition: { postMenstrualAgeMaxWeeks: 30 },
        schedule: interval(36, 36),
        sourceNote: 'Cpmin visée 0,5-1 mg/L.',
      }),
      branch('pma-30-39', amt('mg_per_kg', 3.2, 3.2), {
        condition: { postMenstrualAgeMinWeeks: 30, postMenstrualAgeMaxWeeks: 39 },
        schedule: interval(24, 24),
        sourceNote: 'Cpmin visée 0,5-1 mg/L.',
      }),
      branch('pma-ge40', amt('mg_per_kg', 3, 3), {
        condition: { postMenstrualAgeMinWeeks: 40 },
        schedule: interval(12, 18),
        sourceNote: 'Cpmin visée 0,5-1 mg/L.',
      }),
    ],
    [],
  ),

  // 007 — Céfotaxime
  dosea_v2_007_cefotaxime: rule(
    'dosea_v2_007_cefotaxime',
    [
      branch('pma-lt30', amt('mg_per_kg', 50, 50), {
        condition: { postMenstrualAgeMaxWeeks: 30 },
        schedule: interval(12, 12),
      }),
      branch('pma-ge37', amt('mg_per_kg', 50, 50), {
        condition: { postMenstrualAgeMinWeeks: 37 },
        schedule: interval(6, 8),
        sourceNote: 'Même dose pour la méningite.',
      }),
    ],
    [
      "Tranche d'âge postmenstruel 30-37 semaines non couverte par le texte source (qui ne donne que <30 sem et ≥37 sem) : intervalle indéterminé pour cette tranche, nécessite validation clinique.",
    ],
  ),

  // 008 — Ceftriaxone
  dosea_v2_008_ceftriaxone: rule(
    'dosea_v2_008_ceftriaxone',
    [
      branch('infection-standard', amt('mg_per_kg', 50, 50), {
        schedule: freqInterval(1, 1, 24, 24),
        maxPerDoseMg: 4000,
        maxPerDayMg: 4000,
        sourceNote: 'Contre-indiqué avec le calcium IV chez le nouveau-né.',
      }),
      branch('meningite', amt('mg_per_kg', 80, 100), {
        condition: { indications: ['Méningite'], postnatalAgeMinDays: 14 },
        schedule: freqInterval(1, 1, 24, 24),
        maxPerDoseMg: 4000,
        maxPerDayMg: 4000,
        sourceNote: 'Contre-indiqué avec le calcium IV chez le nouveau-né.',
      }),
    ],
    [],
  ),

  // 009 — Ceftazidime
  dosea_v2_009_ceftazidime: rule(
    'dosea_v2_009_ceftazidime',
    [
      branch('standard', amt('mg_per_kg', 50, 50), {
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 2000,
      }),
    ],
    [
      "Intervalle non chiffré dans le texte source (dépend entièrement de l'âge postmenstruel, sans valeurs précisées) : choix clinique requis pour la fréquence d'administration.",
    ],
  ),

  // 010 — Céfazoline
  dosea_v2_010_cefazoline: rule(
    'dosea_v2_010_cefazoline',
    [
      branch('standard', amt('mg_per_kg', 25, 25), {
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 1000,
      }),
      branch('infection-grave-terme', amt('mg_per_kg', 50, 50), {
        condition: { postnatalAgeMinDays: 7, freeTextCondition: 'enfant à terme' },
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 1000,
      }),
    ],
    [
      "Intervalle non chiffré dans le texte source (dépend de l'âge postmenstruel) pour les deux branches.",
      "Qualificatif 'enfant à terme' non traduit en seuil numérique d'âge gestationnel précis ; seul le critère >7 jours postnatal est encodé numériquement.",
    ],
  ),

  // 011 — Cloxacilline
  dosea_v2_011_cloxacilline: rule(
    'dosea_v2_011_cloxacilline',
    [
      branch('infection', amt('mg_per_kg', 25, 25), {
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 2000,
      }),
      branch('infection-severe', amt('mg_per_kg', 50, 50), {
        condition: { indications: ['abcès', 'ostéomyélite', 'cellulite', 'méningite'] },
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 2000,
      }),
    ],
    [
      'Fréquence/intervalle non précisés dans le texte source validé pour la cloxacilline (les valeurs figurant dans la table structurée ne sont pas confirmées par le texte validé).',
    ],
  ),

  // 012 — Vancomycine
  dosea_v2_012_vancomycine: rule(
    'dosea_v2_012_vancomycine',
    [
      branch('charge', amt('mg_per_kg', 15, 15), {
        role: 'loading',
        schedule: freq(1, 1),
      }),
      branch('maintien', amt('mg_per_kg', 10, 10), {
        role: 'maintenance',
        schedule: { intervalHoursMin: 6, intervalHoursMax: 12, intervalUnresolvedFromSource: true },
        maxPerDoseMg: 1000,
        sourceNote: 'Cpmin visée : sepsis 10-15 mg/L, méningite 15-20 mg/L.',
      }),
    ],
    [
      "Intervalle de maintien situé entre 6 et 12h selon l'âge postmenstruel, sans tranches précises dans le texte source : choix clinique requis pour l'intervalle exact.",
    ],
  ),

  // 013 — Métronidazole
  dosea_v2_013_metronidazole: rule(
    'dosea_v2_013_metronidazole',
    [
      branch('charge', amt('mg_per_kg', 15, 15), {
        role: 'loading',
        schedule: freq(1, 1),
      }),
      branch('maintien', amt('mg_per_kg', 7.5, 7.5), {
        role: 'maintenance',
        schedule: { intervalHoursMin: 8, intervalHoursMax: 48, intervalUnresolvedFromSource: true },
        maxPerDoseMg: 500,
        maxPerDayMg: 1500,
        sourceNote: 'Passer à la voie orale dès que possible.',
      }),
    ],
    [
      "Intervalle de maintien très large (8 à 48h) selon l'âge postmenstruel sans tranches précisées : choix clinique requis.",
    ],
  ),

  // 014 — Méropénem
  dosea_v2_014_meropenem: rule(
    'dosea_v2_014_meropenem',
    [
      branch('infection', amt('mg_per_kg', 20, 30), {
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 1000,
        sourceNote: 'Usage restreint, autorisation infectiologue requise.',
      }),
      branch('meningite-pseudomonas', amt('mg_per_kg', 40, 40), {
        condition: { indications: ['méningite', 'Pseudomonas'] },
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 1000,
        sourceNote: 'Usage restreint, autorisation infectiologue requise.',
      }),
    ],
    ['Fréquence/intervalle non précisés dans le texte source pour le méropénem.'],
  ),

  // 015 — Pipéracilline + Tazobactam
  dosea_v2_015_piperacilline_tazobactam: rule(
    'dosea_v2_015_piperacilline_tazobactam',
    [
      branch('standard', amt('mg_per_kg', 50, 100), {
        condition: { indications: ['Entérocolite nécrosante grade II-III', 'pneumonie sous ventilation'] },
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 4000,
        sourceNote: 'Dose habituelle 75 mg/kg.',
      }),
    ],
    ["Intervalle non chiffré (dépend de l'âge postmenstruel) : choix clinique requis."],
  ),

  // 016 — Linézolide
  dosea_v2_016_linezolide: rule(
    'dosea_v2_016_linezolide',
    [
      branch('premature', amt('mg_per_kg', 10, 10), {
        condition: { gestationalAgeMaxWeeks: 34, postnatalAgeMaxDays: 7 },
        schedule: interval(12, 12),
        maxPerDoseMg: 600,
        sourceNote: "Utiliser l'âge gestationnel (et non postmenstruel) pour ce seuil.",
      }),
      branch('autres', amt('mg_per_kg', 10, 10), {
        schedule: interval(8, 8),
        maxPerDoseMg: 600,
        sourceNote: "S'applique si l'enfant n'est pas (<34 sem gestationnel ET <7j postnatal) — cf branche spécifique.",
      }),
    ],
    [],
  ),

  // 017 — Rifampicine
  dosea_v2_017_rifampicine: rule(
    'dosea_v2_017_rifampicine',
    [
      branch('standard', amt('mg_per_kg', 5, 10), {
        schedule: interval(12, 12),
        maxPerDoseMg: 600,
        sourceNote: 'En synergie anti-staphylococcique.',
      }),
    ],
    [],
  ),

  // 018 — Cotrimoxazole (TMP-SMX)
  dosea_v2_018_cotrimoxazole_tmp_smx: rule(
    'dosea_v2_018_cotrimoxazole_tmp_smx',
    [
      branch('traitement', amt('mg_per_kg', 4, 4), {
        condition: { postnatalAgeMinDays: 14 },
        schedule: interval(12, 12),
        maxPerDoseMg: 320,
        sourceNote: 'Dose exprimée en composante triméthoprime (TMP).',
      }),
      branch('prophylaxie', amt('mg_per_kg_per_day', 2, 2), {
        role: 'prophylaxis',
        condition: { indications: ['prophylaxie urinaire néonatale'], postnatalAgeMinDays: 14 },
        schedule: freq(1, 1),
        maxPerDayMg: 320,
        sourceNote: 'Dose exprimée en composante triméthoprime (TMP).',
      }),
    ],
    [],
  ),

  // 019 — Cefuroxime
  dosea_v2_019_cefuroxime: rule(
    'dosea_v2_019_cefuroxime',
    [
      branch('standard', amt('mg_per_kg', 50, 50), {
        schedule: { intervalUnresolvedFromSource: true },
        maxPerDoseMg: 1500,
      }),
    ],
    [
      "Intervalle non chiffré dans le texte source (dépend entièrement de l'âge postmenstruel) ; choix clinique requis pour la fréquence.",
    ],
  ),

  // 020 — Céfoxitine
  dosea_v2_020_cefoxitine: rule(
    'dosea_v2_020_cefoxitine',
    [
      branch('standard', amt('mg_per_kg_per_day', 90, 100), {
        schedule: freqInterval(3, 3, 8, 8),
        sourceNote: 'Peu référencé en néonatologie — utiliser avec prudence.',
      }),
    ],
    [],
  ),

  // 021 — Fluconazole
  dosea_v2_021_fluconazole: rule(
    'dosea_v2_021_fluconazole',
    [
      branch('charge', amt('mg_per_kg', 25, 25), {
        role: 'loading',
        schedule: freq(1, 1),
      }),
      branch('maintien', amt('mg_per_kg', 6, 12), {
        role: 'maintenance',
        condition: { indications: ['Candidose systémique'] },
        schedule: interval(24, 24),
        maxPerDoseMg: 400,
        sourceNote: "Dose modulée 'selon l'âge' dans la fourchette 6-12 mg/kg. Réduire si insuffisance rénale (non quantifié).",
      }),
      branch('prophylaxie', amt('mg_per_kg', 3, 3), {
        role: 'prophylaxis',
        condition: { indications: ['prophylaxie antifongique néonatale'] },
        schedule: { intervalHoursMin: 24, intervalHoursMax: 72, intervalUnresolvedFromSource: true },
      }),
    ],
    [
      "Dose de maintien (6-12mg/kg) modulée 'selon l'âge' sans tranches numériques précisées dans le texte source.",
      'Intervalle de prophylaxie (24-72h) large sans tranches précises : choix clinique requis.',
      "Réduction de dose en cas d'insuffisance rénale mentionnée mais non quantifiée.",
    ],
  ),

  // 022 — Amphotéricine B (Fungizone)
  dosea_v2_022_amphotericine_b_fungizone: rule(
    'dosea_v2_022_amphotericine_b_fungizone',
    [
      branch('standard', amt('mg_per_kg', 1, 1), {
        schedule: interval(24, 24),
        maxPerDoseMg: 50,
        sourceNote: 'Toujours préciser le TYPE (Fungizone ≠ Ambisome, dosages très différents). Perfuser en 2h.',
      }),
    ],
    [],
  ),

  // 023 — Amphotéricine B liposomale (Ambisome)
  dosea_v2_023_amphotericine_b_liposomale_ambisome: rule(
    'dosea_v2_023_amphotericine_b_liposomale_ambisome',
    [
      branch('standard', amt('mg_per_kg', 5, 5), {
        schedule: interval(24, 24),
        maxPerDoseMg: 250,
        sourceNote: 'Dose 5x supérieure à la Fungizone — ne pas confondre les deux formes. Perfuser en 2h.',
      }),
    ],
    [],
  ),

  // 024 — Acyclovir
  dosea_v2_024_acyclovir: rule(
    'dosea_v2_024_acyclovir',
    [
      branch('pma-lt32', amt('mg_per_kg', 20, 20), {
        condition: { postMenstrualAgeMaxWeeks: 32 },
        schedule: interval(12, 12),
        maxPerDoseMg: 800,
        sourceNote: 'Perfuser en 1h. Maintenir hydratation suffisante (néphrotoxicité).',
      }),
      branch('pma-ge32', amt('mg_per_kg', 20, 20), {
        condition: { postMenstrualAgeMinWeeks: 32 },
        schedule: interval(8, 8),
        maxPerDoseMg: 800,
        sourceNote: 'Perfuser en 1h. Maintenir hydratation suffisante (néphrotoxicité).',
      }),
    ],
    [],
  ),

  // 025 — Morphine
  dosea_v2_025_morphine: rule(
    'dosea_v2_025_morphine',
    [
      branch('iv', amt('mg_per_kg', 0.05, 0.1), {
        condition: { routes: ['IV'] },
        schedule: interval(3, 4),
        maxPerDoseMg: 15,
        sourceNote: 'Sevrage progressif en cas de traitement prolongé.',
      }),
      branch('po', amt('mg_per_kg', 0.1, 0.2), {
        condition: { routes: ['Orale'] },
        schedule: interval(4, 6),
        maxPerDoseMg: 15,
        sourceNote: 'Dose IV = 1/2 à 1/3 de la dose PO pour effet équivalent. Sevrage progressif en cas de traitement prolongé.',
      }),
      branch('perfusion', amt('mg_per_kg_per_hour', 0.01, 0.02), {
        role: 'continuous_infusion',
        condition: { routes: ['IV'] },
      }),
    ],
    [],
  ),

  // 026 — Fentanyl
  dosea_v2_026_fentanyl: rule(
    'dosea_v2_026_fentanyl',
    [
      branch('analgesie', amt('mg_per_kg', 1, 2, 'mcg'), {
        condition: { indications: ['Analgésie'] },
        schedule: interval(2, 3),
        maxPerDoseMg: 0.1,
        sourceNote: "Administrer IV lentement (5 min). Sevrage progressif si usage > 5-7 jours.",
      }),
      branch('intubation', amt('mg_per_kg', 3, 5, 'mcg'), {
        condition: { indications: ['intubation'] },
        schedule: freq(1, 1),
        maxPerDoseMg: 0.1,
      }),
      branch('perfusion', amt('mg_per_kg_per_hour', 0.5, 5, 'mcg'), {
        role: 'continuous_infusion',
        sourceNote: 'Sevrage progressif si usage > 5-7 jours.',
      }),
    ],
    [],
  ),

  // 027 — Midazolam
  dosea_v2_027_midazolam: rule(
    'dosea_v2_027_midazolam',
    [
      branch('iv-im', amt('mg_per_kg', 0.05, 0.1), {
        condition: { routes: ['IV', 'IM'] },
        schedule: interval(2, 4),
        maxPerDoseMg: 5,
      }),
      branch('po-ir', amt('mg_per_kg', 0.2, 0.4), {
        condition: { routes: ['Orale', 'Rectal'] },
        maxPerDoseMg: 5,
      }),
      branch('perfusion-standard', amt('mg_per_kg_per_hour', 0.01, 0.06), {
        role: 'continuous_infusion',
      }),
      branch('perfusion-convulsions', amt('mg_per_kg_per_hour', 0.06, 0.4), {
        role: 'continuous_infusion',
        condition: { indications: ['convulsions réfractaires'] },
      }),
    ],
    ["Fréquence non précisée dans le texte source pour la voie PO/IR (dose unique mentionnée sans intervalle)."],
  ),

  // 028 — Kétamine
  dosea_v2_028_ketamine: rule(
    'dosea_v2_028_ketamine',
    [
      branch('iv', amt('mg_per_kg', 1, 2), {
        condition: { routes: ['IV'] },
        sourceNote: 'Administrer lentement. Toujours avec atropine 0,02 mg/kg. Contre-indiqué si HTIC. Préparer le matériel de réanimation.',
        maxPerDoseMg: 100,
      }),
      branch('im', amt('mg_per_kg', 5, 8), {
        condition: { routes: ['IM'] },
        sourceNote: 'Toujours avec atropine 0,02 mg/kg. Contre-indiqué si HTIC. Préparer le matériel de réanimation.',
        maxPerDoseMg: 100,
      }),
    ],
    ['Fréquence/répétition non précisée dans le texte source (sédation procédurale, dose généralement unique).'],
  ),

  // 029 — Diazépam
  dosea_v2_029_diazepam: rule(
    'dosea_v2_029_diazepam',
    [
      branch('convulsions', amt('mg_per_kg', 0.3, 0.5), {
        role: 'rescue',
        condition: { routes: ['IV', 'Rectal'], indications: ['Convulsions', "état de mal épileptique"] },
        maxPerDoseMg: 10,
        sourceNote: 'Peut être répété une fois après 10 minutes si nécessaire.',
      }),
      branch('tetanos', amt('mg_per_kg_per_hour', 0, 0), {
        role: 'continuous_infusion',
        condition: { indications: ['tétanos'] },
        doseAmountUnresolvedFromSource: true,
        sourceNote: 'Perfusion continue possible pour le tétanos ; débit non chiffré dans le texte source.',
      }),
    ],
    ['Débit de perfusion continue pour le tétanos non chiffré dans le texte source.'],
  ),

  // 030 — Lorazépam
  dosea_v2_030_lorazepam: rule(
    'dosea_v2_030_lorazepam',
    [
      branch('convulsions', amt('mg_per_kg', 0.1, 0.1), {
        role: 'rescue',
        condition: { routes: ['IV', 'IM'], indications: ['Convulsions réfractaires'] },
        schedule: { frequencyPerDayMin: 2, frequencyPerDayMax: 2 },
        maxPerDoseMg: 4,
        sourceNote: 'Répété q5-10min PRN, maximum 2 doses.',
      }),
      branch('sedation', amt('mg_per_kg', 0.05, 0.1), {
        condition: { routes: ['Orale', 'IV'], indications: ['agitation sévère', 'sédation préprocédurale'] },
        maxPerDoseMg: 4,
        sourceNote: 'Si PO en préexamen : administrer 45-60 minutes avant.',
      }),
    ],
    [],
  ),

  // 031 — Phénobarbital
  dosea_v2_031_phenobarbital: rule(
    'dosea_v2_031_phenobarbital',
    [
      branch('charge-initiale', amt('mg_per_kg', 20, 20), {
        role: 'loading',
        schedule: freq(1, 1),
        sourceNote: 'Administrer en 20 minutes.',
      }),
      branch('charge-additionnelle', amt('mg_per_kg', 10, 10), {
        role: 'loading',
        schedule: interval(20 / 60, 30 / 60),
        sourceNote: 'Charges additionnelles répétables jusqu’à un total cumulé de 40 mg/kg (charge initiale incluse).',
      }),
      branch('maintien', amt('mg_per_kg_per_day', 3, 5), {
        role: 'maintenance',
        schedule: freqInterval(2, 2, 12, 12),
        maxPerDoseMg: 200,
        maxPerDayMg: 300,
      }),
    ],
    [],
  ),

  // 032 — Phénytoïne
  dosea_v2_032_phenytoine: rule(
    'dosea_v2_032_phenytoine',
    [
      branch('charge', amt('mg_per_kg', 15, 20), {
        role: 'loading',
        sourceNote: 'Perfuser en 30 minutes (dilution NaCl 0,9% stricte, 5 mg/mL).',
      }),
      branch('maintien', amt('mg_per_kg_per_day', 4, 8), {
        role: 'maintenance',
        schedule: freqInterval(2, 2, 12, 12),
        maxPerDoseMg: 300,
        sourceNote: 'Absorption orale erratique chez le nouveau-né — voie IV préférée.',
      }),
    ],
    [],
  ),

  // 033 — Lévétiracétam
  dosea_v2_033_levetiracetam: rule(
    'dosea_v2_033_levetiracetam',
    [
      branch('charge', amt('mg_per_kg', 40, 40), {
        role: 'loading',
        schedule: freq(1, 1),
      }),
      branch('maintien-initial', amt('mg_per_kg', 10, 10), {
        role: 'maintenance',
        schedule: interval(12, 12),
        maxPerDoseMg: 1500,
        sourceNote: 'Peut être augmentée à 20 mg/kg q12h après 3 jours si nécessaire (cf branche titration).',
      }),
      branch('maintien-titre', amt('mg_per_kg', 20, 20), {
        role: 'titration',
        condition: { freeTextCondition: 'après 3 jours de traitement si réponse insuffisante' },
        schedule: interval(12, 12),
        maxPerDoseMg: 1500,
      }),
    ],
    [],
  ),

  // 034 — Topiramate
  dosea_v2_034_topiramate: rule(
    'dosea_v2_034_topiramate',
    [
      branch('charge', amt('mg_per_kg', 10, 10), {
        role: 'loading',
        schedule: freq(1, 1),
      }),
      branch('maintien', amt('mg_per_kg_per_day', 3, 5), {
        role: 'maintenance',
        schedule: freq(1, 2),
        maxPerDoseMg: 200,
        maxPerDayMg: 400,
      }),
    ],
    [],
  ),

  // 035 — Adrénaline (Épinéphrine)
  dosea_v2_035_adrenaline_epinephrine: rule(
    'dosea_v2_035_adrenaline_epinephrine',
    [
      branch('reanimation', amt('mg_per_kg', 0.01, 0.01), {
        role: 'rescue',
        condition: { routes: ['IV', 'IO'], indications: ['Arrêt cardiaque'] },
        schedule: interval(3 / 60, 5 / 60),
        maxPerDoseMg: 1,
        sourceNote: 'Concentration 1:10000 (0,1 mg/mL) ; équivaut à 0,1 mL/kg.',
      }),
      branch('anaphylaxie', amt('mg_per_kg', 0.01, 0.01), {
        role: 'rescue',
        condition: { indications: ['choc anaphylactique'] },
        maxPerDoseMg: 1,
        sourceNote: 'Concentration 1:1000 (1 mg/mL), voie IM.',
      }),
      branch('croup-nebulisation', amt('mg_per_kg', 0.5, 0.5), {
        role: 'nebulization',
        condition: { indications: ['croup sévère', 'bronchospasme sévère'] },
        maxPerDoseMg: 5,
      }),
    ],
    [
      "Voie IM utilisée pour l'anaphylaxie alors que clinical_context.routes ne déclare que IV/IO/Nébulisation : à confirmer.",
    ],
  ),

  // 036 — Atropine
  dosea_v2_036_atropine: rule(
    'dosea_v2_036_atropine',
    [
      branch('iv', amt('mg_per_kg', 0.02, 0.02), {
        maxPerDoseMg: 0.5,
        sourceNote: 'Pré-intubation : administrer 5-10 minutes avant.',
      }),
      branch('endotracheal', amt('mg_per_kg', 0.04, 0.06), {
        condition: { freeTextCondition: "si accès IV impossible" },
        maxPerDoseMg: 0.5,
      }),
    ],
    [],
  ),

  // 037 — Furosémide
  dosea_v2_037_furosemide: rule(
    'dosea_v2_037_furosemide',
    [
      branch('iv', amt('mg_per_kg', 0.5, 1), {
        condition: { routes: ['IV'] },
        schedule: interval(12, 24),
        maxPerDoseMg: 40,
        maxPerDayMg: 80,
      }),
      branch('perfusion', amt('mg_per_kg_per_hour', 0.1, 0.4), {
        role: 'continuous_infusion',
        condition: { routes: ['IV'] },
      }),
      branch('po', amt('mg_per_kg', 0, 0), {
        condition: { routes: ['Orale'] },
        doseAmountUnresolvedFromSource: true,
        sourceNote: 'Dose PO environ 2x la dose IV pour effet équivalent (multiplicateur non appliqué automatiquement).',
      }),
    ],
    [
      "Dose orale donnée uniquement de façon relative ('~2x la dose IV') sans valeur absolue mg/kg dans le texte source : calcul bloqué pour cette voie.",
    ],
  ),

  // 038 — Spironolactone
  dosea_v2_038_spironolactone: rule(
    'dosea_v2_038_spironolactone',
    [
      branch('standard', amt('mg_per_kg', 1, 1), {
        schedule: interval(12, 12),
        maxPerDoseMg: 25,
        maxPerDayMg: 50,
        sourceNote: 'Souvent associé au furosémide.',
      }),
    ],
    [],
  ),

  // 039 — Hydrochlorothiazide
  dosea_v2_039_hydrochlorothiazide: rule(
    'dosea_v2_039_hydrochlorothiazide',
    [
      branch('standard', amt('mg_per_kg', 1, 1), {
        schedule: interval(12, 12),
        maxPerDoseMg: 25,
        maxPerDayMg: 50,
      }),
    ],
    [],
  ),

  // 040 — Captopril
  dosea_v2_040_captopril: rule(
    'dosea_v2_040_captopril',
    [
      branch('initiale', amt('mg_per_kg', 0.01, 0.05), {
        condition: { postnatalAgeMaxDays: 7, freeTextCondition: 'ou prématuré' },
        schedule: freqInterval(3, 3, 8, 8),
        sourceNote: 'Risque d’hypotension — débuter aux plus faibles doses.',
      }),
      branch('eventail', amt('mg_per_kg', 0.1, 1), {
        role: 'titration',
        schedule: freqInterval(3, 3, 8, 8),
        maxPerDoseMg: 6.25,
        sourceNote: 'Risque d’hypotension.',
      }),
    ],
    [
      "Le critère 'prématuré' (sans seuil numérique d'âge gestationnel précisé) n'est pas encodé numériquement ; seul le critère <7 jours postnatal l'est.",
    ],
  ),

  // 041 — Propranolol
  dosea_v2_041_propranolol: rule(
    'dosea_v2_041_propranolol',
    [
      branch('cardio', amt('mg_per_kg_per_day', 1, 5), {
        condition: { routes: ['Orale'], indications: ['Tachyarythmies', 'Fallot'] },
        schedule: freq(3, 3),
        maxPerDoseMg: 40,
        maxPerDayMg: 120,
      }),
      branch('hemangiomes', amt('mg_per_kg_per_day', 2.2, 3.4), {
        condition: { routes: ['Orale'], indications: ['hémangiomes'] },
        schedule: freq(2, 2),
        maxPerDoseMg: 40,
        maxPerDayMg: 120,
      }),
      branch('iv', amt('mg_per_kg', 0.01, 0.15), {
        condition: { routes: ['IV'] },
        sourceNote: 'Dose ~10x plus faible que la dose orale équivalente.',
      }),
    ],
    ['Fréquence/intervalle IV non précisé dans le texte source.'],
  ),

  // 042 — Nifédipine
  dosea_v2_042_nifedipine: rule(
    'dosea_v2_042_nifedipine',
    [
      branch('standard', amt('mg_per_kg', 0.05, 0.25), {
        schedule: interval(4, 6),
        maxPerDoseMg: 10,
        sourceNote: 'PRN.',
      }),
    ],
    [],
  ),

  // 043 — Amlodipine
  dosea_v2_043_amlodipine: rule(
    'dosea_v2_043_amlodipine',
    [
      branch('standard', amt('mg_per_kg', 0.05, 0.2), {
        schedule: interval(12, 12),
        maxPerDoseMg: 5,
        sourceNote: '0,05 mg/kg en dose initiale, jusqu’à 0,1-0,2 mg/kg/dose en entretien selon tolérance.',
      }),
    ],
    [],
  ),

  // 044 — Hydralazine
  dosea_v2_044_hydralazine: rule(
    'dosea_v2_044_hydralazine',
    [
      branch('po', amt('mg_per_kg', 0.25, 1), {
        condition: { routes: ['Orale'] },
        schedule: interval(6, 8),
      }),
      branch('iv', amt('mg_per_kg', 0.1, 0.5), {
        condition: { routes: ['IV'] },
        schedule: interval(6, 8),
        sourceNote: 'Maximum 2 mg/kg/dose en IV. Doses IV ~2x plus faibles que PO.',
      }),
    ],
    [],
  ),

  // 045 — Dexaméthasone
  dosea_v2_045_dexamethasone: rule(
    'dosea_v2_045_dexamethasone',
    [
      branch('dbp-dart', amt('mg_per_kg_per_day', 0.15, 0.15), {
        condition: { indications: ['Dysplasie bronchopulmonaire'] },
        schedule: freq(1, 1),
        maxPerDoseMg: 8,
        sourceNote: 'Protocole DART : 3 jours puis décroissance (schéma de décroissance non chiffré).',
      }),
      branch('oedeme-preextubation', amt('mg_per_kg', 0.25, 0.25), {
        condition: { indications: ['œdème laryngé'] },
        schedule: interval(8, 12),
        maxPerDoseMg: 8,
        sourceNote: '3 doses au total.',
      }),
      branch('croup', amt('mg_per_kg', 0.6, 0.6), {
        condition: { indications: ['croup'] },
        schedule: freq(1, 1),
        maxPerDoseMg: 8,
        sourceNote: 'Dose unique (MSF).',
      }),
    ],
    ["Schéma de décroissance après les 3 jours de protocole DART (DBP) non chiffré dans le texte source."],
  ),

  // 046 — Hydrocortisone
  dosea_v2_046_hydrocortisone: rule(
    'dosea_v2_046_hydrocortisone',
    [
      branch('hypotension-charge', amt('mg_per_kg', 1, 1), {
        role: 'loading',
        condition: { indications: ['Hypotension réfractaire'] },
        schedule: freq(1, 1),
      }),
      branch('hypotension-maintien', amt('mg_per_kg', 0.5, 0.5), {
        role: 'maintenance',
        condition: { indications: ['Hypotension réfractaire'] },
        schedule: interval(6, 12),
        maxPerDoseMg: 100,
      }),
      branch('choc-surrenalien-charge', amt('mg_per_kg', 2, 2), {
        role: 'loading',
        condition: { indications: ['choc surrénalien'] },
        schedule: freq(1, 1),
      }),
      branch('choc-surrenalien-maintien', amt('mg_per_kg', 1, 1), {
        role: 'maintenance',
        condition: { indications: ['choc surrénalien'] },
        schedule: interval(6, 6),
        maxPerDoseMg: 100,
      }),
      branch('physiologique', amt('mg_per_kg_per_day', 1, 1), {
        condition: { indications: ['insuffisance surrénalienne'] },
        schedule: freq(2, 2),
        maxPerDoseMg: 100,
      }),
      branch('stress', amt('mg_per_kg_per_day', 2, 3), {
        condition: { indications: ['DBP'] },
        sourceNote: 'Dose de stress = 2 à 3x la dose physiologique (1 mg/kg/jour).',
        maxPerDoseMg: 100,
      }),
    ],
    [],
  ),

  // 047 — Prednisolone
  dosea_v2_047_prednisolone: rule(
    'dosea_v2_047_prednisolone',
    [
      branch('standard', amt('mg_per_kg_per_day', 1, 2), {
        condition: { indications: ['Asthme aigu', 'croup'] },
        maxPerDoseMg: 60,
        maxPerDayMg: 60,
        sourceNote: 'Durée 3-5 jours. Alternative si dexaméthasone indisponible.',
      }),
    ],
    [
      'Fréquence de répartition de la dose journalière (1-2 mg/kg/jour) non précisée dans le texte source.',
    ],
  ),

  // 048 — Artéméther-Luméfantrine (ACT)
  dosea_v2_048_artemether_lumefantrine_act: rule(
    'dosea_v2_048_artemether_lumefantrine_act',
    [
      branch('5-14kg', amt('fixed_mg', 20, 20), {
        condition: { weightMinKg: 5, weightMaxKg: 14 },
        schedule: { frequencyPerDayMin: 2, frequencyPerDayMax: 2, fixedScheduleHours: [0, 8, 24, 36, 48, 60] },
        sourceNote: '1 comprimé (20mg artéméther/120mg luméfantrine). Donner avec un aliment gras.',
      }),
      branch('15-24kg', amt('fixed_mg', 40, 40), {
        condition: { weightMinKg: 15, weightMaxKg: 24 },
        schedule: { frequencyPerDayMin: 2, frequencyPerDayMax: 2, fixedScheduleHours: [0, 8, 24, 36, 48, 60] },
        sourceNote: '2 comprimés. Donner avec un aliment gras.',
      }),
      branch('25-34kg', amt('fixed_mg', 60, 60), {
        condition: { weightMinKg: 25, weightMaxKg: 34 },
        schedule: { frequencyPerDayMin: 2, frequencyPerDayMax: 2, fixedScheduleHours: [0, 8, 24, 36, 48, 60] },
        sourceNote: '3 comprimés. Donner avec un aliment gras.',
      }),
    ],
    [
      "Produit combiné (artéméther+luméfantrine) en comprimés à bande de poids fixe : la dose est exprimée par nombre de comprimés et non en mg/kg pur. Aucune bande au-delà de 34 kg n'est donnée dans le texte source disponible.",
    ],
  ),

  // 049 — Artésunate
  // Tranches de poids (<20 kg = 3 mg/kg ; ≥20 kg = 2,4 mg/kg) ajoutées le 2026-06-20,
  // source OMS (WHO Guidelines for the treatment of malaria), validées par Dr KAPTO.
  dosea_v2_049_artesunate: rule(
    'dosea_v2_049_artesunate',
    [
      branch('iv-im-lt20kg', amt('mg_per_kg', 3, 3), {
        condition: { routes: ['IV', 'IM'], weightMaxKg: 20 },
        schedule: { fixedScheduleHours: [0, 12, 24], intervalHoursMin: 24, intervalHoursMax: 24, durationText: 'Minimum 24h de traitement IV/IM avant relais PO par ACT.' },
        maxPerDoseMg: 120,
      }),
      branch('iv-im-ge20kg', amt('mg_per_kg', 2.4, 2.4), {
        condition: { routes: ['IV', 'IM'], weightMinKg: 20 },
        schedule: { fixedScheduleHours: [0, 12, 24], intervalHoursMin: 24, intervalHoursMax: 24, durationText: 'Minimum 24h de traitement IV/IM avant relais PO par ACT.' },
        maxPerDoseMg: 120,
      }),
      branch('rectal', amt('mg_per_kg', 10, 10), {
        role: 'rescue',
        condition: { freeTextCondition: 'si accès IV impossible' },
      }),
    ],
    [
      "Schéma horaire de l'artésunate rectal non précisé dans le texte source (utilisé uniquement si accès IV impossible).",
    ],
  ),

  // 050 — Quinine
  dosea_v2_050_quinine: rule(
    'dosea_v2_050_quinine',
    [
      branch('charge', amt('mg_per_kg', 20, 20), {
        role: 'loading',
        sourceNote: 'Sel de quinine, perfusion sur 4 heures.',
      }),
      branch('maintien', amt('mg_per_kg', 10, 10), {
        role: 'maintenance',
        schedule: interval(8, 8),
        maxPerDoseMg: 600,
        sourceNote: 'Perfusion en D10% ou NaCl 0,9%. Surveiller la glycémie (risque d’hypoglycémie).',
      }),
    ],
    [],
  ),

  // 051 — Ondansétron
  dosea_v2_051_ondansetron: rule(
    'dosea_v2_051_ondansetron',
    [
      branch('standard', amt('mg_per_kg', 0.15, 0.15), {
        condition: { routes: ['IV', 'Orale'] },
        schedule: interval(8, 8),
        maxPerDoseMg: 4,
        maxPerDayMg: 16,
      }),
    ],
    [],
  ),

  // 052 — Oméprazole
  dosea_v2_052_omeprazole: rule(
    'dosea_v2_052_omeprazole',
    [
      branch('standard', amt('mg_per_kg_per_day', 0.5, 1.5), {
        schedule: freq(1, 2),
        maxPerDoseMg: 20,
        maxPerDayMg: 40,
      }),
    ],
    [],
  ),

  // 053 — Ranitidine
  dosea_v2_053_ranitidine: rule(
    'dosea_v2_053_ranitidine',
    [
      branch('po', amt('mg_per_kg', 2, 2), {
        condition: { routes: ['Orale'] },
        schedule: interval(12, 12),
        maxPerDoseMg: 150,
        maxPerDayMg: 300,
        sourceNote: 'Passer à q8h si réponse clinique incomplète (cf branche titration).',
      }),
      branch('po-titration', amt('mg_per_kg', 2, 2), {
        role: 'titration',
        condition: { routes: ['Orale'], freeTextCondition: 'réponse incomplète à q12h' },
        schedule: interval(8, 8),
        maxPerDoseMg: 150,
        maxPerDayMg: 300,
      }),
      branch('iv-premature', amt('mg_per_kg', 1.5, 1.5), {
        condition: { routes: ['IV'], freeTextCondition: 'prématuré' },
        schedule: interval(12, 12),
        maxPerDoseMg: 150,
        maxPerDayMg: 300,
      }),
      branch('iv-terme', amt('mg_per_kg', 1.5, 1.5), {
        condition: { routes: ['IV'], freeTextCondition: 'à terme' },
        schedule: interval(8, 8),
        maxPerDoseMg: 150,
        maxPerDayMg: 300,
      }),
    ],
    [
      "Les qualificatifs 'prématuré' / 'à terme' (branches IV) ne sont pas accompagnés de seuils numériques d'âge gestationnel précis dans le texte source.",
    ],
  ),

  // 054 — Lansoprazole
  dosea_v2_054_lansoprazole: rule(
    'dosea_v2_054_lansoprazole',
    [
      branch('standard', amt('mg_per_kg_per_day', 0.5, 1.5), {
        schedule: freq(1, 2),
        maxPerDoseMg: 30,
        sourceNote: 'Prescrire en multiples de 3,75 mg.',
      }),
      branch('jeune-age', amt('mg_per_kg_per_day', 0.5, 1.5), {
        condition: { postnatalAgeMaxDays: 70 },
        doseAmountUnresolvedFromSource: true,
        sourceNote: "Doses plus faibles si <10 sem (ampleur de la réduction non chiffrée). Prescrire en multiples de 3,75 mg.",
      }),
    ],
    [
      "'<10 sem' interprété comme âge postnatal (le texte source ne précise pas explicitement gestationnel/postmenstruel/postnatal) ; l'ampleur de la réduction de dose n'est pas chiffrée.",
    ],
  ),

  // 055 — Métoclopramide
  dosea_v2_055_metoclopramide: rule(
    'dosea_v2_055_metoclopramide',
    [
      branch('standard', amt('mg_per_kg', 0.1, 0.1), {
        condition: { routes: ['Orale', 'IV'] },
        schedule: interval(6, 8),
        maxPerDoseMg: 10,
        sourceNote: 'Risque de syndrome extrapyramidal.',
      }),
    ],
    [],
  ),

  // 056 — Dompéridone
  dosea_v2_056_domperidone: rule(
    'dosea_v2_056_domperidone',
    [
      branch('standard', amt('mg_per_kg', 0.25, 0.25), {
        schedule: freqInterval(3, 3, 8, 8),
        maxPerDoseMg: 10,
      }),
    ],
    [],
  ),

  // 057 — Naloxone
  dosea_v2_057_naloxone: rule(
    'dosea_v2_057_naloxone',
    [
      branch('complet', amt('mg_per_kg', 0.1, 0.1), {
        role: 'rescue',
        condition: { indications: ['Intoxication aux opiacés'] },
        schedule: interval(2 / 60, 3 / 60),
        maxPerDoseMg: 2,
        sourceNote: 'Renversement complet (surdosage).',
      }),
      branch('partiel', amt('mg_per_kg', 0.01, 0.01), {
        role: 'rescue',
        condition: { indications: ['dépression respiratoire post-opioïde'] },
        schedule: interval(2 / 60, 3 / 60),
        maxPerDoseMg: 2,
        sourceNote: 'Renversement partiel.',
      }),
    ],
    [],
  ),

  // 058 — Flumazénil
  dosea_v2_058_flumazenil: rule(
    'dosea_v2_058_flumazenil',
    [
      branch('standard', amt('mg_per_kg', 0.01, 0.01), {
        role: 'rescue',
        schedule: interval(1 / 60, 1 / 60),
        maxPerDoseMg: 0.2,
        sourceNote: 'IV direct rapide PRN. Maximum 5 doses.',
      }),
    ],
    [],
  ),

  // 059 — Vitamine K (Phytonadione)
  dosea_v2_059_vitamine_k_phytonadione: rule(
    'dosea_v2_059_vitamine_k_phytonadione',
    [
      branch('premature-lt28', amt('fixed_mg', 0.5, 0.5), {
        condition: { routes: ['IV'], gestationalAgeMaxWeeks: 28 },
        schedule: freq(1, 1),
        sourceNote: 'Dose unique à la naissance.',
      }),
      branch('terme-ge28', amt('fixed_mg', 1, 1), {
        condition: { routes: ['IM'], gestationalAgeMinWeeks: 28 },
        schedule: freq(1, 1),
        sourceNote: 'Dose unique à la naissance.',
      }),
      branch('po-alternative', amt('fixed_mg', 2, 2), {
        condition: { routes: ['Orale'], freeTextCondition: 'si voie IM refusée' },
        schedule: { durationText: '3 doses : à la naissance, puis entre 2 et 4 semaines, puis entre 6 et 8 semaines.' },
      }),
      branch('hemorragie', amt('fixed_mg', 1, 2), {
        role: 'rescue',
        condition: { routes: ['IV'], indications: ['hémorragies'] },
        schedule: freq(1, 1),
      }),
    ],
    [],
  ),

  // 060 — Fer (sulfate ferreux)
  dosea_v2_060_fer_sulfate_ferreux: rule(
    'dosea_v2_060_fer_sulfate_ferreux',
    [
      branch('haut-risque', amt('mg_per_kg_per_day', 4, 4), {
        condition: { weightMaxKg: 1.5, postnatalAgeMinDays: 14, freeTextCondition: 'ou <30 sem ou RCIU' },
        schedule: freq(1, 1),
      }),
      branch('poids-intermediaire', amt('mg_per_kg_per_day', 2, 4), {
        condition: { weightMinKg: 1.5, weightMaxKg: 2, freeTextCondition: 'au congé (sortie d’hospitalisation)' },
        maxPerDoseMg: 60,
        maxPerDayMg: 60,
      }),
    ],
    [
      "Les critères '<30 sem' et 'RCIU' ne sont encodés qu'à titre indicatif (freeTextCondition) en plus du critère de poids <1,5kg qui sert de déclencheur numérique principal ; une saisie combinée poids+âge gestationnel serait nécessaire pour une discrimination automatique complète.",
    ],
  ),

  // 061 — Caféine (citrate)
  dosea_v2_061_cafeine_citrate: rule(
    'dosea_v2_061_cafeine_citrate',
    [
      branch('charge', amt('mg_per_kg', 10, 10), {
        role: 'loading',
        schedule: freq(1, 1),
        sourceNote: 'Dose exprimée en caféine base (10 mg citrate = 5 mg base).',
      }),
      branch('maintien', amt('mg_per_kg_per_day', 5, 5), {
        role: 'maintenance',
        schedule: freqInterval(1, 1, 24, 24),
        maxPerDoseMg: 200,
        sourceNote: 'Débuter 12-24h après la charge.',
      }),
    ],
    [
      "'Doses plus élevées chez bébés plus âgés' mentionné sans seuils d'âge ni valeurs chiffrées : non encodé.",
    ],
  ),

  // 062 — Succinylcholine
  dosea_v2_062_succinylcholine: rule(
    'dosea_v2_062_succinylcholine',
    [
      branch('standard', amt('mg_per_kg', 2, 2), {
        schedule: freq(1, 1),
        maxPerDoseMg: 150,
        sourceNote: 'Administrer juste avant l’intubation. Utilisé en association avec atropine et fentanyl pour l’intubation en séquence rapide.',
      }),
    ],
    [],
  ),

  // 063 — Rocuronium
  dosea_v2_063_rocuronium: rule(
    'dosea_v2_063_rocuronium',
    [
      branch('bolus', amt('mg_per_kg', 1, 1), {
        condition: { routes: ['IV', 'IM'] },
        schedule: interval(0.5, 1),
        maxPerDoseMg: 100,
      }),
      branch('perfusion', amt('mg_per_kg_per_hour', 0.2, 1), {
        role: 'continuous_infusion',
      }),
    ],
    [],
  ),

  // 064 — Gluconate de calcium 10%
  dosea_v2_064_gluconate_de_calcium_10: rule(
    'dosea_v2_064_gluconate_de_calcium_10',
    [
      branch('hypocalcemie-symptomatique', amt('mg_per_kg', 100, 200), {
        condition: { routes: ['IV'], indications: ['Hypocalcémie'], freeTextCondition: 'voie centrale recommandée' },
        schedule: { durationText: 'Perfuser en 10-30 minutes.' },
        maxPerDoseMg: 2000,
      }),
      branch('reanimation', amt('mg_per_kg', 60, 60), {
        role: 'rescue',
        condition: { routes: ['IV'], indications: ['réanimation'] },
        schedule: { durationText: 'Perfuser en 5-10 minutes.' },
        maxPerDoseMg: 2000,
      }),
      branch('entretien-po', amt('mg_per_kg_per_day', 20, 60), {
        condition: { routes: ['Orale'] },
        schedule: freqInterval(3, 4, 6, 8),
        sourceNote: 'Exprimé en calcium élémentaire.',
      }),
    ],
    [],
  ),

  // 065 — Albumine humaine
  dosea_v2_065_albumine_humaine: rule(
    'dosea_v2_065_albumine_humaine',
    [
      branch('solution-5', amt('g_per_kg', 0.5, 1, 'g'), {
        condition: { freeTextCondition: 'Solution à 5% disponible' },
        concentrationMgPerMl: 50,
        sourceNote: 'Solution à 5% : équivaut à 10-20 mL/kg, perfuser en 30-60 minutes.',
      }),
      branch('solution-25', amt('g_per_kg', 0.5, 1, 'g'), {
        condition: { freeTextCondition: 'Solution à 25% disponible' },
        concentrationMgPerMl: 250,
        sourceNote: 'Solution à 25% : équivaut à 2-4 mL/kg, perfuser en 1-2h.',
      }),
    ],
    [],
  ),

  // 066 — Énoxaparine
  dosea_v2_066_enoxaparine: rule(
    'dosea_v2_066_enoxaparine',
    [
      branch('traitement-lt37', amt('mg_per_kg', 2, 2), {
        condition: { gestationalAgeMaxWeeks: 37, indications: ['Thrombose veineuse', 'embolie pulmonaire'] },
        schedule: interval(12, 12),
        sourceNote: 'Surveillance des taux anti-Xa requise pour ajustement de dose.',
      }),
      branch('traitement-ge37', amt('mg_per_kg', 1.7, 1.7), {
        condition: { gestationalAgeMinWeeks: 37, indications: ['Thrombose veineuse', 'embolie pulmonaire'] },
        schedule: interval(12, 12),
        maxPerDoseMg: 80,
        sourceNote: 'Surveillance des taux anti-Xa requise pour ajustement de dose.',
      }),
      branch('prophylaxie', amt('mg_per_kg', 0.85, 1), {
        role: 'prophylaxis',
        schedule: interval(12, 12),
        sourceNote: 'Surveillance des taux anti-Xa requise pour ajustement de dose.',
      }),
    ],
    [
      "Seuil de 37 semaines non qualifié explicitement (gestationnel vs postmenstruel) dans le texte source ; encodé par défaut comme âge gestationnel, à confirmer.",
    ],
  ),

  // 067 — Acétylcystéine (NAC)
  dosea_v2_067_acetylcysteine_nac: rule(
    'dosea_v2_067_acetylcysteine_nac',
    [
      branch('nebulisation', amt('fixed_volume_ml', 1, 1), {
        role: 'nebulization',
        condition: { routes: ['Nébulisation'] },
        schedule: interval(6, 8),
        sourceNote: 'Solution à 20%, diluée dans 3 mL de NaCl 0,9%. Prémédication par salbutamol recommandée.',
      }),
      branch('po', amt('fixed_volume_ml', 1, 5), {
        condition: { routes: ['Orale'] },
        schedule: freq(1, 4),
        sourceNote: 'Solution diluée à 5-10%.',
      }),
      branch('lavement', amt('ml_per_kg', 5, 10, 'mL'), {
        condition: { routes: ['Rectal'] },
        sourceNote: 'Bouchon méconial.',
      }),
    ],
    [],
  ),

  // 068 — Adénosine
  dosea_v2_068_adenosine: rule(
    'dosea_v2_068_adenosine',
    [
      branch('standard', amt('mg_per_kg', 0.05, 0.3), {
        condition: { indications: ['Tachycardie supraventriculaire'] },
        schedule: interval(2 / 60, 2 / 60),
        maxPerDoseMg: 12,
        sourceNote: 'Dose initiale 0,05-0,1 mg/kg ; augmenter par paliers de 0,05-0,1 mg/kg toutes les 2 minutes si nécessaire, jusqu’à un maximum de 0,3 mg/kg/dose. Flush au NaCl immédiatement après administration.',
      }),
    ],
    [],
  ),

  // 069 — Sildénafil
  dosea_v2_069_sildenafil: rule(
    'dosea_v2_069_sildenafil',
    [
      branch('po-initiale', amt('mg_per_kg_per_day', 1, 1), {
        condition: { routes: ['Orale'] },
        schedule: freqInterval(4, 4, 6, 6),
        sourceNote: 'Dose initiale ; peut être augmentée de 1 mg/kg/jour toutes les 48-72h jusqu’à un maximum de 4-8 mg/kg/jour (cf branche titration).',
      }),
      branch('po-titration', amt('mg_per_kg_per_day', 4, 8), {
        role: 'titration',
        condition: { routes: ['Orale'] },
        schedule: freq(4, 4),
        sourceNote: 'Augmentation progressive par paliers de 1 mg/kg/jour tous les 48-72h.',
      }),
      branch('iv', amt('mg_per_kg_per_hour', 0.03, 0.067), {
        role: 'continuous_infusion',
        condition: { routes: ['IV'] },
      }),
    ],
    [],
  ),

  // 070 — Bosentan
  dosea_v2_070_bosentan: rule(
    'dosea_v2_070_bosentan',
    [
      branch('initiale', amt('mg_per_kg', 1, 1), {
        schedule: interval(12, 12),
        sourceNote: 'Prescrire en multiples de 2,5 mg.',
      }),
      branch('apres-1-mois', amt('mg_per_kg', 2, 2), {
        role: 'titration',
        condition: { postnatalAgeMinDays: 30, freeTextCondition: 'si toléré' },
        schedule: interval(12, 12),
        maxPerDoseMg: 62.5,
        sourceNote: 'Prescrire en multiples de 2,5 mg.',
      }),
    ],
    [],
  ),

  // 071 — Sotalol
  dosea_v2_071_sotalol: rule(
    'dosea_v2_071_sotalol',
    [
      branch('initiale', amt('mg_per_kg_per_day', 2, 2), {
        schedule: freq(2, 3),
        maxPerDoseMg: 160,
        maxPerDayMg: 320,
      }),
      branch('titration', amt('mg_per_kg_per_day', 2, 8), {
        role: 'titration',
        schedule: freq(2, 3),
        maxPerDoseMg: 160,
        maxPerDayMg: 320,
        sourceNote: "Augmentation par paliers de 1-2 mg/kg/jour tous les 2-3 jours. Les schémas de titration agressifs comportent un risque accru de toxicité.",
      }),
    ],
    [],
  ),

  // 072 — Digoxine
  dosea_v2_072_digoxine: rule(
    'dosea_v2_072_digoxine',
    [
      branch('charge-po', amt('mg_per_kg', 30, 30, 'mcg'), {
        role: 'loading',
        condition: { routes: ['Orale'], freeTextCondition: 'nouveau-né à terme' },
        schedule: { durationText: 'Dose de charge totale répartie en 3 prises sur 24h (50%, puis 25%, puis 25% de la dose totale).' },
        maxPerDoseMg: 0.25,
      }),
      branch('maintien-po', amt('mg_per_kg_per_day', 8, 10, 'mcg'), {
        role: 'maintenance',
        condition: { routes: ['Orale'] },
        schedule: freqInterval(2, 2, 12, 12),
        maxPerDoseMg: 0.25,
      }),
      branch('maintien-iv', amt('mg_per_kg_per_day', 0, 0, 'mcg'), {
        role: 'maintenance',
        condition: { routes: ['IV'] },
        doseAmountUnresolvedFromSource: true,
        maxPerDoseMg: 0.25,
        sourceNote: 'Dose IV = 2/3 à 3/4 de la dose orale équivalente (8-10 mcg/kg/jour) ; non calculée automatiquement par prudence (médicament à marge thérapeutique étroite). Attention aux unités mcg.',
      }),
    ],
    [
      'Dose IV de maintien donnée uniquement par un facteur multiplicatif relatif à la dose PO (digoxine = marge thérapeutique étroite) : calcul bloqué pour cette branche, nécessite un choix clinique explicite.',
    ],
  ),

  // 073 — Nystatine
  dosea_v2_073_nystatine: rule(
    'dosea_v2_073_nystatine',
    [
      branch('buccal', amt('fixed_volume_ml', 0.5, 1), {
        condition: { routes: ['Orale (badigeonnage)'] },
        schedule: freqInterval(4, 4, 6, 6),
        sourceNote: 'Pas de dose mg/kg (dose fixe volumétrique).',
      }),
      branch('topique', amt('fixed_volume_ml', 0, 0), {
        condition: { routes: ['Topique'] },
        schedule: freq(4, 4),
        doseAmountUnresolvedFromSource: true,
        sourceNote: 'Quantité topique non chiffrée dans le texte source.',
      }),
    ],
    [
      "Quantité pour l'application topique non précisée dans le texte source (seul le badigeonnage buccal a un volume chiffré).",
    ],
  ),

  // 074 — Ursodiol (Acide ursodéoxycholique)
  dosea_v2_074_ursodiol_acide_ursodeoxycholique: rule(
    'dosea_v2_074_ursodiol_acide_ursodeoxycholique',
    [
      branch('standard', amt('mg_per_kg', 10, 10), {
        schedule: freqInterval(3, 3, 8, 8),
        maxPerDoseMg: 300,
        maxPerDayMg: 900,
      }),
    ],
    [],
  ),

  // 075 — Oxybutynine
  dosea_v2_075_oxybutynine: rule(
    'dosea_v2_075_oxybutynine',
    [
      branch('standard', amt('mg_per_kg', 0.1, 0.2), {
        schedule: interval(8, 12),
        maxPerDoseMg: 5,
        sourceNote: "Les doses les plus élevées de l'intervalle sont réservées aux enfants nés à terme (qualificatif non chiffré numériquement).",
      }),
    ],
    [
      "'Enfants à terme' mentionné sans seuil d'âge gestationnel numérique permettant de distinguer automatiquement la portion haute de l'intervalle de dose.",
    ],
  ),

  // 076 — Diazoxide
  dosea_v2_076_diazoxide: rule(
    'dosea_v2_076_diazoxide',
    [
      branch('standard', amt('mg_per_kg_per_day', 5, 15), {
        schedule: freqInterval(3, 3, 8, 8),
        maxPerDoseMg: 150,
        maxPerDayMg: 450,
      }),
    ],
    [],
  ),

  // 077 — Glucagon
  dosea_v2_077_glucagon: rule(
    'dosea_v2_077_glucagon',
    [
      branch('hypoglycemie', amt('mg_per_kg', 0.03, 0.03), {
        role: 'rescue',
        condition: { indications: ['Hypoglycémie sévère réfractaire'] },
        schedule: interval(1, 4),
        maxPerDoseMg: 1,
      }),
      branch('beta-bloquants', amt('mg_per_kg', 0.15, 0.15), {
        role: 'rescue',
        condition: { indications: ['surdosage bêta-bloquants'] },
        schedule: interval(0.5, 0.5),
        maxPerDoseMg: 1,
      }),
    ],
    [],
  ),

  // 078 — Pantoprazole
  dosea_v2_078_pantoprazole: rule(
    'dosea_v2_078_pantoprazole',
    [
      branch('standard', amt('mg_per_kg_per_day', 1, 2), {
        schedule: freq(1, 2),
        maxPerDoseMg: 40,
      }),
      branch('charge-optionnelle', amt('mg_per_kg', 2, 2), {
        role: 'loading',
        condition: { freeTextCondition: 'optionnelle, avant perfusion continue' },
        schedule: freq(1, 1),
      }),
      branch('perfusion', amt('mg_per_kg_per_hour', 0.2, 0.2), {
        role: 'continuous_infusion',
        sourceNote: '± dose de charge de 2 mg/kg IV avant le début de la perfusion continue (optionnelle, selon contexte clinique).',
      }),
    ],
    [],
  ),

  // 079 — Clonidine
  dosea_v2_079_clonidine: rule(
    'dosea_v2_079_clonidine',
    [
      branch('lt35', amt('mg_per_kg_per_day', 2, 2, 'mcg'), {
        condition: { gestationalAgeMaxWeeks: 35 },
        schedule: freq(3, 4),
        maxPerDoseMg: 0.1,
        maxPerDayMg: 0.3,
      }),
      branch('ge35', amt('mg_per_kg_per_day', 5, 5, 'mcg'), {
        condition: { gestationalAgeMinWeeks: 35 },
        schedule: freq(4, 4),
        maxPerDoseMg: 0.1,
        maxPerDayMg: 0.3,
      }),
      branch('titration', amt('mg_per_kg_per_day', 2, 12, 'mcg'), {
        role: 'titration',
        maxPerDoseMg: 0.1,
        maxPerDayMg: 0.3,
        sourceNote: 'Augmentation par paliers de 1 mcg/kg/jour jusqu’à un maximum de 12 mcg/kg/jour. Sevrage progressif sur 7-14 jours en cas d’arrêt.',
      }),
    ],
    [
      "Seuil de '35 semaines' non qualifié explicitement dans le texte source (supposé âge gestationnel par convention clinique néonatale) ; à confirmer.",
    ],
  ),

  // 080 — Acétazolamide
  dosea_v2_080_acetazolamide: rule(
    'dosea_v2_080_acetazolamide',
    [
      branch('standard', amt('mg_per_kg', 5, 5), {
        condition: { routes: ['IV', 'Orale'] },
        schedule: interval(8, 12),
        maxPerDoseMg: 250,
        sourceNote: 'PRN.',
      }),
    ],
    [],
  ),
};
