# D.O.S.E.A - Ethics & Security Review (ETHICS_REVIEW.md)

## 1. Gestion des Données de Santé (RGPD / HIPAA / MSF Guidelines)
Ce module introduit la capacité de générer des **ordonnances multiples**.
Cependant, pour respecter l'anonymat strict (*Privacy by Design*), le système fonctionnera selon le principe du **Profil Éphémère Anonyme**.

- **Règle 1 : Aucun Identifiant Permanent.** Le système ne permet de saisir que l'Âge et le Poids. La notion de "Lit", "Nom" ou "Prénom" est proscrite pour éviter toute qualification de Donnée à Caractère Personnel (DCP).
- **Règle 2 : Volatilité de la Session.** La prescription multiple réside uniquement dans le state local React (Zustand) ou temporairement dans IndexedDB, et peut être expressément effacée via un bouton "Nouvelle Session" ou un rechargement de page.

## 2. Sécurité du Voice-to-Text (Mode Urgence)
L'utilisation de la reconnaissance vocale (`SpeechRecognition`) repose sur les API natives du navigateur (qui envoient parfois l'audio aux serveurs de Google/Apple selon l'OS).
- **Mitigation** : Un avertissement doit informer l'utilisateur de ne dicter **que les paramètres médicaux et jamais de nom de patient** (ex: dire "Adrénaline 10 kilos" et non "Adrénaline pour Jean Dupont 10 kilos").

## 3. Sécurité Clinique (Dilution & Débits IV)
Les calculs automatiques de débit en urgence (mL/h ou gouttes/min) comportent un risque létal si mal interprétés.
- **Mitigation** : Le calculateur affichera de façon proéminente la concentration finale. Les paramètres de dilution seront tirés du référentiel HUG ou CHU Sainte-Justine. Le bouton Validation (Calculer) reste nécessaire, on ne dispense pas le réanimateur de se relire.
