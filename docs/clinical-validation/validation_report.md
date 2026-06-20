# DOSEA – Rapport de génération V2 validée

- Date de génération : 2026-06-20T11:59:53
- Fichier source : `DOSEA_revue_manuelle_posologies_VALIDEE_2026-06-20.xlsx`
- Nombre de médicaments/règles : **80**
- Validation clinique : **toutes les propositions IA du premier passage ont été validées par Dr KAPTO le 2026-06-20**.

## Principe

Ce paquet transforme le fichier de revue manuelle validé en base clinique structurée pour encodage dans le moteur DOSEA V2. Les sources n’ont pas été recherchées à nouveau : les libellés et URLs proviennent du fichier de revue validé.

## Comptages

### Types de règles
- conditional_or_algorithmic: 66
- simple_or_semi_simple: 10
- semi_structured: 4

### Classes thérapeutiques principales
- Antibiotique: 17
- Antifongique: 4
- Antiépileptique: 4
- Antihypertenseur: 4
- Corticoïde: 3
- Antipaludéen: 3
- Inhibiteur de la pompe à protons: 3
- Analgésique opioïde: 2
- Antiépileptique / Sédatif: 2
- Antalgique / Antipyrétique: 1
- AINS: 1
- Bronchodilatateur: 1
- Antiviral: 1
- Sédatif: 1
- Anesthésique dissociatif: 1
- Catécholamine / Vasopresseur: 1
- Anticholinergique: 1
- Diurétique de l'anse: 1
- Diurétique épargneur de potassium: 1
- Diurétique thiazidique: 1
- Bêta-bloquant: 1
- Antiémétique: 1
- Anti-H2: 1
- Prokinétique / Antiémétique: 1
- Prokinétique: 1
- Antagoniste opioïde: 1
- Antagoniste benzodiazépine: 1
- Vitamine: 1
- Supplément: 1
- Méthylxanthine: 1
- Curare dépolarisant: 1
- Curare non dépolarisant: 1
- Électrolyte: 1
- Soluté de remplissage: 1
- Anticoagulant: 1
- Mucolytique / Antidote: 1
- Antiarythmique: 1
- Inhibiteur PDE5: 1
- Antagoniste des récepteurs de l'endothéline: 1
- Antiarythmique / Bêta-bloquant: 1
- Inotrope / Antiarythmique: 1
- Hépatoprotecteur: 1
- Antispasmodique urinaire: 1
- Antihypoglycémiant: 1
- Hormone hyperglycémiante: 1
- Alpha-2 agoniste: 1
- Inhibiteur de l'anhydrase carbonique: 1

### Alertes de sécurité générées
- maximum_dose_required: 80
- unit_sensitive: 66
- dilution_or_infusion_sensitive: 56
- neonatal_or_prematurity_context: 47
- emergency_drug: 10
- renal_or_level_monitoring: 4
- clinical_contraindication_or_interaction: 3
- restricted_or_specialist_use: 1

### Sources déclarées
- CHU Ste-Justine: 61
- CHU Ste-Justine + MSF: 10
- MSF: 8
- CHU Ste-Justine 2018: 1

## Fichiers générés
- `dosing_rules_v2.validated.json`
- `dosing_rules_v2.index.json`
- `dosing_rules_v2.schema.json`
- `drug_aliases.generated.json`
- `clinical_warnings.generated.json`
- `dosingRules.generated.ts`
- `drugAliases.generated.ts`
- `clinicalWarnings.generated.ts`
- `dosing_rules_v2.validated.csv`

## Garde-fous à conserver dans le code

- Ne pas convertir les textes validés en dose unique mg/kg sans encoder les conditions.
- Toute règle avec `do_not_use_as_blind_single_mg_per_kg = true` doit passer par un évaluateur conditionnel.
- Les règles néonatales doivent vérifier âge gestationnel, âge postnatal/postmenstruel et poids quand disponibles.
- Les médicaments avec dilution/perfusion doivent afficher les modalités d’administration avant validation de prescription.
- Les médicaments avec unité sensible doivent verrouiller l’unité active et éviter les conversions implicites.

## Prochaine étape

Créer dans le code un module `src/domain/dosingRulesV2` qui lit `dosing_rules_v2.validated.json`, puis implémente progressivement les évaluateurs : simple, conditionnel par poids, conditionnel par âge, conditionnel par indication, dilution/perfusion, et alertes.