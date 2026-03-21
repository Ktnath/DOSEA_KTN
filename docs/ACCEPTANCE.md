# D.O.S.E.A - Acceptance Criteria (ACCEPTANCE)

## 1. Ordonnance Multiple
- [ ] L'utilisateur peut spécifier un `poids` une seule fois.
- [ ] L'utilisateur peut ajouter 2 ou plusieurs médicaments différents (ex: Paracétamol et Amoxicilline) listés sur le même écran.
- [ ] La posologie de chaque médicament est recalculée automatiquement si le poids change.

## 2. Protocoles Cliniques
- [ ] Une liste déroulante ou un panel permet de choisir au moins 3 protocoles de test (ex: *Paludisme MSF*, *Choc Anaphylactique*, *Asthme Aigu*).
- [ ] Au clic sur le protocole, la liste des médicaments est auto-peuplée avec les posologies exactes calculées selon le poids saisi.

## 3. Classification Avancée
- [ ] Dans l'onglet *Médocs*, un filtre "Système Biologique" et "Classe Thérapeutique" est présent.
- [ ] Sélectionner "Cardiovasculaire" n'affiche que les médicaments de cette catégorie (ex: Adrénaline, Dobutamine).

## 4. Calculateur de Débit IV
- [ ] Lors du calcul d'un médicament IV (ex: *Adrénaline perfusion* ou *Fentanyl*), les champs additionnels suivants s'affichent : `Dilution recommandée`, `Débit (mL/h)`, `Débit (gouttes/min)`.
- [ ] La formule `gouttes/min = (Volume en mL * facteur d'égouttement) / temps en min` est appliquée et exacte.

## 5. Mode Urgence "Mains Libres"
- [ ] Un bouton "Micro" est facilement accessible (idéalement via un bouton flottant ou un onglet dédié "Voice").
- [ ] L'application demande l'accès au microphone, capture la voix, parse les entités ("Médicament", "Poids") et lance le calcul sans que l'utilisateur n'ait touché l'écran.
