# DOSEA V2 validated dosing package

Ce dossier contient la base clinique structurée générée depuis `DOSEA_revue_manuelle_posologies_VALIDEE_2026-06-20.xlsx` après validation globale par Dr KAPTO le 2026-06-20.

## Usage recommandé

1. Copier `dosing_rules_v2.validated.json` dans `public/data/` ou `src/data/`.
2. Copier les fichiers `.generated.ts` dans `src/domain/dosingRulesV2/generated/`.
3. Implémenter l'évaluateur V2 sans écraser le moteur V1.
4. Activer d'abord en lecture/preview, puis en calcul après tests unitaires.

## Important

La validation clinique confirme les propositions de revue. L'encodage informatique reste à tester : aucun médicament conditionnel ne doit être converti en dose unique.
