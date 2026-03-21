# D.O.S.E.A - Product Requirements Document (PRD)

## 1. Contexte & Objectif
DOSEA vise à devenir un standard clinique international pour la pédiatrie et les urgences. Cet incrément apporte 5 fonctionnalités majeures pour accélérer la prise de décision, sécuriser l'administration IV, et automatiser les prescriptions selon des protocoles médicaux stricts.

## 2. Fonctionnalités Requises

### 2.1 Ordonnance Multiple
- **Description** : Au lieu de calculer un seul médicament à la fois, le clinicien entre le poids et l'âge de l'enfant une seule fois, puis ajoute plusieurs médicaments à une "Ordonnance active".
- **Contrainte** : Le concept de "lit" ou "profil nominal patient" est **exclu** pour simplifier l'UX et respecter l'anonymat strict. On conserve une notion de "Session".

### 2.2 Protocoles Cliniques
- **Description** : Un menu permet de sélectionner un protocole médical (ex: *Paludisme grave*, *Sepsis néonatal*, *Crise d'asthme sévère*).
- **Comportement** : La sélection d'un protocole charge **automatiquement** dans l'Ordonnance tous les médicaments de première ligne associés à cette pathologie, déjà calculés pour le poids de l'enfant.

### 2.3 Classification Avancée des Médicaments
- **Description** : Catégoriser la base de données selon deux nouveaux axes : *Classe Thérapeutique* et *Système Biologique* (Cardiovasculaire, Respiratoire, Anti-infectieux, etc.).
- **UI** : Permettre de filtrer la liste des médicaments via ces catégories.

### 2.4 Calculateur de Dilution et Débits IV
- **Description** : Pour les médicaments injectables, ajouter le calcul du "Dernier Kilomètre" (dilution et débit).
- **Sortie** : 
  - Volume de solvant recommandé (ex: NaCl 0.9%).
  - Vitesse de perfusion à la seringue électrique (mL/h).
  - Vitesse de perfusion par gravité (gouttes/minute).

### 2.5 Mode Urgence "Mains Libres" (Voice-to-Text)
- **Description** : Interface d'urgence permettant de demander un calcul vocalement.
- **Requête cible** : *"DOSEA, calcule adrénaline réanimation pour 12 kilos"*.
- **Sortie** : Affichage instantané, en plein écran, de la posologie (zéro clic additionnel).

## 3. Dépendances Techniques
- API de Reconnaissance Vocale (`window.SpeechRecognition` ou `webkitSpeechRecognition`).
- Mise à jour de la DB Dexie pour supporter la nouvelle structure `drugs` et `protocols`.
