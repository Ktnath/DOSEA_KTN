# D.O.S.E.A. — Instructions Claude Code

## Nature du projet
Application professionnelle de calcul de posologie pédiatrique.
Le projet cible les professionnels de santé. Ce n’est pas une application grand public.

## Règles médicales non négociables
- Ne jamais inventer de posologie.
- Ne jamais créer ou modifier une règle thérapeutique sans source explicite.
- Ne jamais utiliser Gemini/IA pour calculer une dose finale.
- Le moteur de dose doit être déterministe, testable et traçable.
- Toute dose affichée doit pouvoir expliquer : formule, dose/kg, plafond, fréquence, source.

## Workflow obligatoire
- Explorer avant de coder.
- Proposer un plan avant toute modification multi-fichiers.
- Écrire/mettre à jour les tests avant ou pendant l’implémentation.
- Lancer : npm run build.
- Ajouter les scripts manquants si nécessaire : typecheck, test, lint.

## Architecture cible
- Moteur clinique dans src/domain ou src/core.
- UI séparée de la logique médicale.
- Données médicales versionnées dans public/data ou src/data.
- Validation des données par schéma.
