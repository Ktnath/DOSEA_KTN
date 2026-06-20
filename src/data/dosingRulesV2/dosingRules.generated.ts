// Auto-generated from DOSEA_revue_manuelle_posologies_VALIDEE_2026-06-20.xlsx
// Validation: Dr KAPTO, 2026-06-20.
export const DOSEA_DOSING_RULES_V2_VALIDATED = [
  {
    "rule_id": "dosea_v2_001_paracetamol",
    "source_excel_row_id": 1,
    "drug": {
      "name": "Paracétamol",
      "class": "Antalgique / Antipyrétique",
      "subclass": "",
      "clinical_system": "Antalgie / Antipyrétique",
      "aliases": [
        "Paracétamol"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "Rectale"
      ],
      "indications": [
        "Douleur légère à modérée",
        "fièvre"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "PO: 10-15 mg/kg/dose q6-8h. IR: 20 mg/kg/dose q6-8h. Max 60 mg/kg/jour. Intervalles q8h si < 37 sem. (Source: CHU Ste-Justine 2018)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : PO: 10-15 mg/kg/dose q6-8h. IR: 20 mg/kg/dose q6-8h. Max 60 mg/kg/jour. Intervalles q8h si < 37 sem.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=15 mg/kg ; max/prise=1000 mg ; max/jour=3000 mg ; fréquence/j=4 ; intervalle min=6 h ; concentration=30 mg/mL.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 15,
        "max_per_dose_mg": 1000,
        "max_per_day_mg": 3000,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": 30
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine 2018",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine 2018. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_002_ibuprofene",
    "source_excel_row_id": 2,
    "drug": {
      "name": "Ibuprofène",
      "class": "AINS",
      "subclass": "",
      "clinical_system": "Antalgie / Antipyrétique",
      "aliases": [
        "Ibuprofène"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Douleur",
        "inflammation",
        "fièvre"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Max 40 mg/kg/jour répartis en 3 prises. Canal artériel (IV néonatal): charge 10 mg/kg puis 5 mg/kg/dose q24h x2. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Max 40 mg/kg/jour répartis en 3 prises. Canal artériel (IV néonatal): charge 10 mg/kg puis 5 mg/kg/dose q24h x2.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=10 mg/kg ; max/prise=400 mg ; max/jour=1200 mg ; fréquence/j=3 ; intervalle min=8 h ; concentration=20 mg/mL.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 10,
        "max_per_dose_mg": 400,
        "max_per_day_mg": 1200,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": 20
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_003_amoxicilline",
    "source_excel_row_id": 3,
    "drug": {
      "name": "Amoxicilline",
      "class": "Antibiotique",
      "subclass": "Pénicilline",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Amoxicilline"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Infections bactériennes ORL",
        "bronchiques",
        "urinaires",
        "prophylaxie urinaire"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "80-90 mg/kg/jour en 2-3 prises (OMA, pneumonie). Prophylaxie urinaire néonatale: 20 mg/kg/jour DIE. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 80-90 mg/kg/jour en 2-3 prises (OMA, pneumonie). Prophylaxie urinaire néonatale: 20 mg/kg/jour DIE.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=30 mg/kg ; max/prise=1000 mg ; max/jour=3000 mg ; fréquence/j=3 ; intervalle min=8 h ; concentration=50 mg/mL.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 30,
        "max_per_dose_mg": 1000,
        "max_per_day_mg": 3000,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": 50
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_004_salbutamol_nebulisation",
    "source_excel_row_id": 4,
    "drug": {
      "name": "Salbutamol (nébulisation)",
      "class": "Bronchodilatateur",
      "subclass": "β2-agoniste",
      "clinical_system": "Respiratoire",
      "aliases": [
        "Salbutamol",
        "Salbutamol (nébulisation)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Inhalation",
        "Nébulisation"
      ],
      "indications": [
        "Bronchospasme",
        "asthme",
        "bronchiolite",
        "hyperkaliémie"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Nébulisation: 0,1-0,15 mg/kg q2-6h. Aérosol-doseur: 100-200 mcg/dose q2-6h. Hyperkaliémie: 0,4 mg/dose nébulisation q2h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Nébulisation: 0,1-0,15 mg/kg q2-6h. Aérosol-doseur: 100-200 mcg/dose q2-6h. Hyperkaliémie: 0,4 mg/dose nébulisation q2h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.15 mg/kg ; max/prise=5 mg ; max/jour=20 mg ; fréquence/j=4 ; intervalle min=4 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.15,
        "max_per_dose_mg": 5,
        "max_per_day_mg": 20,
        "frequency_per_day": 4,
        "minimum_interval_hours": 4,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Sécuriser les unités : mcg/µg vs mg.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_005_ampicilline",
    "source_excel_row_id": 5,
    "drug": {
      "name": "Ampicilline",
      "class": "Antibiotique",
      "subclass": "Pénicilline",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Ampicilline"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Sepsis néonatal",
        "méningite à streptocoques B",
        "prophylaxie urinaire"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Sepsis: 50 mg/kg/dose. Méningite strepto B: 200-300 mg/kg/jour div. q6-8h. Intervalle selon âge postmenstruel. Max 300 mg/kg/jour. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Sepsis: 50 mg/kg/dose. Méningite strepto B: 200-300 mg/kg/jour div. q6-8h. Intervalle selon âge postmenstruel. Max 300 mg/kg/jour.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=50 mg/kg ; max/prise=2000 mg ; max/jour=12000 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 50,
        "max_per_dose_mg": 2000,
        "max_per_day_mg": 12000,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_006_gentamicine",
    "source_excel_row_id": 6,
    "drug": {
      "name": "Gentamicine",
      "class": "Antibiotique",
      "subclass": "Aminoside",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Gentamicine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Sepsis néonatal",
        "infections graves à Gram négatif"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, bolus 30 min"
    },
    "dose_expression": {
      "raw_current_posology": "Dose et intervalle selon âge postmenstruel: <30sem 3,8mg/kg q36h; 30-39sem 3,2mg/kg q24h; ≥40sem 3mg/kg q12-18h. Cpmin visée 0,5-1 mg/L. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Dose et intervalle selon âge postmenstruel: <30sem 3,8mg/kg q36h; 30-39sem 3,2mg/kg q24h; ≥40sem 3mg/kg q12-18h. Cpmin visée 0,5-1 mg/L.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=3.2 mg/kg ; max/prise=120 mg ; fréquence/j=1 ; intervalle min=18 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 3.2,
        "max_per_dose_mg": 120,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 18,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "renal_or_level_monitoring",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Prévoir champ de surveillance biologique/taux résiduel ou anti-Xa selon le médicament.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_007_cefotaxime",
    "source_excel_row_id": 7,
    "drug": {
      "name": "Céfotaxime",
      "class": "Antibiotique",
      "subclass": "Céphalosporine 3G",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Céfotaxime"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Méningite",
        "sepsis néonatal",
        "infections sévères"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "50 mg/kg/dose. Même dose pour méningite. Intervalle selon âge postmenstruel: <30sem q12h; ≥37sem q6-8h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 50 mg/kg/dose. Même dose pour méningite. Intervalle selon âge postmenstruel: <30sem q12h; ≥37sem q6-8h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=50 mg/kg ; max/prise=2000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 50,
        "max_per_dose_mg": 2000,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_008_ceftriaxone",
    "source_excel_row_id": 8,
    "drug": {
      "name": "Ceftriaxone",
      "class": "Antibiotique",
      "subclass": "Céphalosporine 3G",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Ceftriaxone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Méningite",
        "infections sévères",
        "fièvre typhoïde"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Infection: 50 mg/kg q24h. Méningite ≥14j: 80-100 mg/kg q24h. Contre-indiqué avec calcium IV chez le nouveau-né. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Infection: 50 mg/kg q24h. Méningite ≥14j: 80-100 mg/kg q24h. Contre-indiqué avec calcium IV chez le nouveau-né.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=50 mg/kg ; max/prise=4000 mg ; max/jour=4000 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 50,
        "max_per_dose_mg": 4000,
        "max_per_day_mg": 4000,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "clinical_contraindication_or_interaction",
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Bloquer/alerter chez nouveau-né avec calcium IV ou ictère selon source.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_009_ceftazidime",
    "source_excel_row_id": 9,
    "drug": {
      "name": "Ceftazidime",
      "class": "Antibiotique",
      "subclass": "Céphalosporine 3G",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Ceftazidime"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections à Pseudomonas",
        "infections sévères à Gram négatif"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "50 mg/kg/dose. Intervalle selon âge postmenstruel. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 50 mg/kg/dose. Intervalle selon âge postmenstruel.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=50 mg/kg ; max/prise=2000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 50,
        "max_per_dose_mg": 2000,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_010_cefazoline",
    "source_excel_row_id": 10,
    "drug": {
      "name": "Céfazoline",
      "class": "Antibiotique",
      "subclass": "Céphalosporine 1G",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Céfazoline"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections à staphylocoques",
        "prophylaxie chirurgicale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "25 mg/kg/dose. Infection grave enfant à terme >7j: 50 mg/kg/dose. Intervalle selon âge postmenstruel. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 25 mg/kg/dose. Infection grave enfant à terme >7j: 50 mg/kg/dose. Intervalle selon âge postmenstruel.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=25 mg/kg ; max/prise=1000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 25,
        "max_per_dose_mg": 1000,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_011_cloxacilline",
    "source_excel_row_id": 11,
    "drug": {
      "name": "Cloxacilline",
      "class": "Antibiotique",
      "subclass": "Pénicilline M",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Cloxacilline"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections à staphylocoques",
        "ostéomyélite",
        "cellulite"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Infection: 25 mg/kg/dose. Infection sévère (abcès, ostéomyélite, méningite): 50 mg/kg/dose. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Infection: 25 mg/kg/dose. Infection sévère (abcès, ostéomyélite, méningite): 50 mg/kg/dose.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=25 mg/kg ; max/prise=2000 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 25,
        "max_per_dose_mg": 2000,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "semi_structured",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_012_vancomycine",
    "source_excel_row_id": 12,
    "drug": {
      "name": "Vancomycine",
      "class": "Antibiotique",
      "subclass": "Glycopeptide",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Vancomycine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections à SARM",
        "méningite",
        "endocardite",
        "sepsis"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, 5 mg/mL, 60 min"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 15 mg/kg x1. Maintien: 10 mg/kg/dose. Intervalle selon âge postmenstruel (6-12h). Cpmin visée: sepsis 10-15 mg/L, méningite 15-20 mg/L. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 15 mg/kg x1. Maintien: 10 mg/kg/dose. Intervalle selon âge postmenstruel (6-12h). Cpmin visée: sepsis 10-15 mg/L, méningite 15-20 mg/L.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=10 mg/kg ; max/prise=1000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 10,
        "max_per_dose_mg": 1000,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "renal_or_level_monitoring",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Prévoir champ de surveillance biologique/taux résiduel ou anti-Xa selon le médicament.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_013_metronidazole",
    "source_excel_row_id": 13,
    "drug": {
      "name": "Métronidazole",
      "class": "Antibiotique",
      "subclass": "Nitro-imidazolé",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Métronidazole"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Infections anaérobies",
        "entérocolite nécrosante",
        "abcès",
        "amibiase"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 15 mg/kg x1. Maintien: 7,5 mg/kg/dose. Intervalle selon âge postmenstruel (8-48h). PO dès que possible. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 15 mg/kg x1. Maintien: 7,5 mg/kg/dose. Intervalle selon âge postmenstruel (8-48h). PO dès que possible.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=7.5 mg/kg ; max/prise=500 mg ; max/jour=1500 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 7.5,
        "max_per_dose_mg": 500,
        "max_per_day_mg": 1500,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; unité active à sécuriser ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_014_meropenem",
    "source_excel_row_id": 14,
    "drug": {
      "name": "Méropénem",
      "class": "Antibiotique",
      "subclass": "Carbapénème",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Méropénem"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections sévères multi-résistantes",
        "méningite",
        "Pseudomonas"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Infection: 20-30 mg/kg/dose. Méningite ou Pseudomonas: 40 mg/kg/dose. Usage restreint, autorisation infectiologue requise. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Infection: 20-30 mg/kg/dose. Méningite ou Pseudomonas: 40 mg/kg/dose. Usage restreint, autorisation infectiologue requise.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=20 mg/kg ; max/prise=1000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 20,
        "max_per_dose_mg": 1000,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "semi_structured",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "restricted_or_specialist_use",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_015_piperacilline_tazobactam",
    "source_excel_row_id": 15,
    "drug": {
      "name": "Pipéracilline + Tazobactam",
      "class": "Antibiotique",
      "subclass": "Pénicilline + inhibiteur β-lactamase",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Pipéracilline + Tazobactam"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Entérocolite nécrosante grade II-III",
        "pneumonie sous ventilation"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "50-100 mg/kg/dose (hab. 75 mg/kg). Intervalle selon âge postmenstruel. Autorisé pour NEC et pneumonie. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 50-100 mg/kg/dose (hab. 75 mg/kg). Intervalle selon âge postmenstruel. Autorisé pour NEC et pneumonie.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=75 mg/kg ; max/prise=4000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 75,
        "max_per_dose_mg": 4000,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_016_linezolide",
    "source_excel_row_id": 16,
    "drug": {
      "name": "Linézolide",
      "class": "Antibiotique",
      "subclass": "Oxazolidinone",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Linézolide"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Infections à SARM",
        "VRE",
        "infections résistantes"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "10 mg/kg/dose. <34 sem et <7j postnatal: q12h; sinon q8h. Attention: utiliser âge gestationnel (non postmenstruel). (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 10 mg/kg/dose. <34 sem et <7j postnatal: q12h; sinon q8h. Attention: utiliser âge gestationnel (non postmenstruel).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=10 mg/kg ; max/prise=600 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 10,
        "max_per_dose_mg": 600,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_017_rifampicine",
    "source_excel_row_id": 17,
    "drug": {
      "name": "Rifampicine",
      "class": "Antibiotique",
      "subclass": "Rifamycine",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Rifampicine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Synergie anti-staphylococcique",
        "tuberculose"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "5-10 mg/kg/dose q12h en synergie pour infections à Staphylococcus spp. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 5-10 mg/kg/dose q12h en synergie pour infections à Staphylococcus spp.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=7.5 mg/kg ; max/prise=600 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 7.5,
        "max_per_dose_mg": 600,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_018_cotrimoxazole_tmp_smx",
    "source_excel_row_id": 18,
    "drug": {
      "name": "Cotrimoxazole (TMP-SMX)",
      "class": "Antibiotique",
      "subclass": "Sulfamide",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Cotrimoxazole",
        "Cotrimoxazole (TMP-SMX)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Infections urinaires",
        "prophylaxie urinaire néonatale",
        "pneumocystose"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Dose en composante TMP: 4 mg/kg/dose q12h (traitement); prophylaxie urinaire néonatale: 2 mg/kg/jour DIE. Après 2 semaines de vie. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Dose en composante TMP: 4 mg/kg/dose q12h (traitement); prophylaxie urinaire néonatale: 2 mg/kg/jour DIE. Après 2 semaines de vie.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=4 mg/kg ; max/prise=320 mg ; max/jour=320 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 4,
        "max_per_dose_mg": 320,
        "max_per_day_mg": 320,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_019_cefuroxime",
    "source_excel_row_id": 19,
    "drug": {
      "name": "Cefuroxime",
      "class": "Antibiotique",
      "subclass": "Céphalosporine 2G",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Cefuroxime"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections respiratoires",
        "urinaires",
        "osseuses"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "50 mg/kg/dose IV. Intervalle selon âge postmenstruel. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 50 mg/kg/dose IV. Intervalle selon âge postmenstruel.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=50 mg/kg ; max/prise=1500 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 50,
        "max_per_dose_mg": 1500,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_020_cefoxitine",
    "source_excel_row_id": 20,
    "drug": {
      "name": "Céfoxitine",
      "class": "Antibiotique",
      "subclass": "Céphamycine",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Céfoxitine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Infections intra-abdominales",
        "chirurgie"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "90-100 mg/kg/jour div. q8h. Peu référencé en néonatologie. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 90-100 mg/kg/jour div. q8h. Peu référencé en néonatologie.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=33 mg/kg ; max/prise=2000 mg ; max/jour=6000 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 33,
        "max_per_dose_mg": 2000,
        "max_per_day_mg": 6000,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_021_fluconazole",
    "source_excel_row_id": 21,
    "drug": {
      "name": "Fluconazole",
      "class": "Antifongique",
      "subclass": "Azolé",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Fluconazole"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Candidose systémique",
        "prophylaxie antifongique néonatale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Traitement: charge 25 mg/kg x1, maintien 6-12 mg/kg/dose q24h (selon âge). Prophylaxie: 3 mg/kg/dose q24-72h. Réduire si IR. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Traitement: charge 25 mg/kg x1, maintien 6-12 mg/kg/dose q24h (selon âge). Prophylaxie: 3 mg/kg/dose q24-72h. Réduire si IR.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=12 mg/kg ; max/prise=400 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 12,
        "max_per_dose_mg": 400,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_022_amphotericine_b_fungizone",
    "source_excel_row_id": 22,
    "drug": {
      "name": "Amphotéricine B (Fungizone)",
      "class": "Antifongique",
      "subclass": "Polyène",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Amphotéricine B",
        "Amphotéricine B (Fungizone)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Candidose invasive",
        "infections fongiques systémiques"
      ],
      "dilution_or_administration": "G5% (Strict), 120 min"
    },
    "dose_expression": {
      "raw_current_posology": "1 mg/kg/dose q24h IV en 2h. Attention: toujours préciser le TYPE d'amphotéricine B (Fungizone ≠ Ambisome). (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 1 mg/kg/dose q24h IV en 2h. Attention: toujours préciser le TYPE d'amphotéricine B (Fungizone ≠ Ambisome).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=50 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 50,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Vérifier explicitement la formulation : conventionnelle/Fungizone vs liposomale/Ambisome.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_023_amphotericine_b_liposomale_ambisome",
    "source_excel_row_id": 23,
    "drug": {
      "name": "Amphotéricine B liposomale (Ambisome)",
      "class": "Antifongique",
      "subclass": "Polyène liposomal",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Amphotéricine B liposomale",
        "Amphotéricine B liposomale (Ambisome)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Candidose invasive",
        "infections fongiques systémiques"
      ],
      "dilution_or_administration": "G5% (Strict), 120 min"
    },
    "dose_expression": {
      "raw_current_posology": "5 mg/kg/dose q24h IV en 2h. Dose 5x supérieure à la Fungizone. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 5 mg/kg/dose q24h IV en 2h. Dose 5x supérieure à la Fungizone.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=5 mg/kg ; max/prise=250 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 5,
        "max_per_dose_mg": 250,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Vérifier explicitement la formulation : conventionnelle/Fungizone vs liposomale/Ambisome.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_024_acyclovir",
    "source_excel_row_id": 24,
    "drug": {
      "name": "Acyclovir",
      "class": "Antiviral",
      "subclass": "",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Acyclovir"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Herpès néonatal",
        "encéphalite herpétique"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "20 mg/kg/dose IV en 1h. <32 sem postmenstruel: q12h; ≥32 sem: q8h. Maintenir hydratation suffisante. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 20 mg/kg/dose IV en 1h. <32 sem postmenstruel: q12h; ≥32 sem: q8h. Maintenir hydratation suffisante.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=20 mg/kg ; max/prise=800 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 20,
        "max_per_dose_mg": 800,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_025_morphine",
    "source_excel_row_id": 25,
    "drug": {
      "name": "Morphine",
      "class": "Analgésique opioïde",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Morphine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale",
        "SC"
      ],
      "indications": [
        "Douleur modérée à sévère",
        "sédation",
        "sevrage néonatal"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "IV: 0,05-0,1 mg/kg q3-4h. PO: 0,1-0,2 mg/kg q4-6h. Perfusion: 0,01-0,02 mg/kg/h. Dose IV = 1/2 à 1/3 de dose PO. Sevrage progressif. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : IV: 0,05-0,1 mg/kg q3-4h. PO: 0,1-0,2 mg/kg q4-6h. Perfusion: 0,01-0,02 mg/kg/h. Dose IV = 1/2 à 1/3 de dose PO. Sevrage progressif.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=15 mg ; fréquence/j=6 ; intervalle min=4 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 15,
        "max_per_day_mg": null,
        "frequency_per_day": 6,
        "minimum_interval_hours": 4,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_026_fentanyl",
    "source_excel_row_id": 26,
    "drug": {
      "name": "Fentanyl",
      "class": "Analgésique opioïde",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Fentanyl"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM",
        "SC"
      ],
      "indications": [
        "Analgésie",
        "intubation",
        "sédation procédurale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, 0.05 mg/mL, perfusion possible"
    },
    "dose_expression": {
      "raw_current_posology": "Analgésie: 1-2 mcg/kg IV lent (5 min) q2-3h. Intubation: 3-5 mcg/kg. Perfusion: 0,5-5 mcg/kg/h. Doses en mcg/kg. Sevrage progressif si >5-7 jours. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Analgésie: 1-2 mcg/kg IV lent (5 min) q2-3h. Intubation: 3-5 mcg/kg. Perfusion: 0,5-5 mcg/kg/h. Doses en mcg/kg. Sevrage progressif si >5-7 jours.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.002 mg/kg ; max/prise=0.1 mg ; fréquence/j=6 ; intervalle min=2 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.002,
        "max_per_dose_mg": 0.1,
        "max_per_day_mg": null,
        "frequency_per_day": 6,
        "minimum_interval_hours": 2,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Sécuriser les unités : mcg/µg vs mg.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_027_midazolam",
    "source_excel_row_id": 27,
    "drug": {
      "name": "Midazolam",
      "class": "Sédatif",
      "subclass": "Benzodiazépine",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Midazolam"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM",
        "Orale",
        "Rectal"
      ],
      "indications": [
        "Sédation",
        "agitation sévère",
        "convulsions réfractaires",
        "sédation procédurale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, 1 mg/mL, perfusion possible"
    },
    "dose_expression": {
      "raw_current_posology": "IV/IM: 0,05-0,1 mg/kg q2-4h. PO/IR: 0,2-0,4 mg/kg. Perfusion: 0,01-0,06 mg/kg/h. Convulsions: perfusion 0,06 mg/kg/h, max 0,4 mg/kg/h. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : IV/IM: 0,05-0,1 mg/kg q2-4h. PO/IR: 0,2-0,4 mg/kg. Perfusion: 0,01-0,06 mg/kg/h. Convulsions: perfusion 0,06 mg/kg/h, max 0,4 mg/kg/h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=5 mg ; fréquence/j=6 ; intervalle min=2 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 5,
        "max_per_day_mg": null,
        "frequency_per_day": 6,
        "minimum_interval_hours": 2,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_028_ketamine",
    "source_excel_row_id": 28,
    "drug": {
      "name": "Kétamine",
      "class": "Anesthésique dissociatif",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Kétamine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Sédation procédurale",
        "analgésie",
        "pansements de brûlures"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, 10 mg/mL, perfusion possible"
    },
    "dose_expression": {
      "raw_current_posology": "IV: 1-2 mg/kg lent. IM: 5-8 mg/kg. Toujours avec atropine 0,02 mg/kg. Contre-indiqué si HTIC. Préparer matériel de réanimation. (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : IV: 1-2 mg/kg lent. IM: 5-8 mg/kg. Toujours avec atropine 0,02 mg/kg. Contre-indiqué si HTIC. Préparer matériel de réanimation.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=100 mg ; fréquence/j=4 ; intervalle min=4 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 100,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 4,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "clinical_contraindication_or_interaction",
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_029_diazepam",
    "source_excel_row_id": 29,
    "drug": {
      "name": "Diazépam",
      "class": "Antiépileptique / Sédatif",
      "subclass": "Benzodiazépine",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Diazépam"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Rectal"
      ],
      "indications": [
        "Convulsions",
        "état de mal épileptique",
        "tétanos",
        "sédation"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Convulsions: 0,3-0,5 mg/kg IR ou IV lent. Max 10 mg/dose. Peut être répété x1 après 10 min. Tétanos: perfusion continue possible. (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Convulsions: 0,3-0,5 mg/kg IR ou IV lent. Max 10 mg/dose. Peut être répété x1 après 10 min. Tétanos: perfusion continue possible.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.3 mg/kg ; max/prise=10 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.3,
        "max_per_dose_mg": 10,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_030_lorazepam",
    "source_excel_row_id": 30,
    "drug": {
      "name": "Lorazépam",
      "class": "Antiépileptique / Sédatif",
      "subclass": "Benzodiazépine",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Lorazépam"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM",
        "Orale",
        "Rectal"
      ],
      "indications": [
        "Convulsions réfractaires",
        "agitation sévère",
        "sédation préprocédurale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Conv.: 0,1 mg/kg IV/IM q5-10min x2 PRN. Sédation: 0,05-0,1 mg/kg PO/IV. Préexamen PO: 45-60 min avant. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Conv.: 0,1 mg/kg IV/IM q5-10min x2 PRN. Sédation: 0,05-0,1 mg/kg PO/IV. Préexamen PO: 45-60 min avant.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=4 mg ; fréquence/j=3 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 4,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_031_phenobarbital",
    "source_excel_row_id": 31,
    "drug": {
      "name": "Phénobarbital",
      "class": "Antiépileptique",
      "subclass": "Barbiturique",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Phénobarbital"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Convulsions néonatales",
        "état de mal épileptique"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 20 mg/kg IV en 20 min. Charges additionnelles: 10 mg/kg q20-30min (max 40 mg/kg total). Maintien: 3-5 mg/kg/jour div. q12h. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 20 mg/kg IV en 20 min. Charges additionnelles: 10 mg/kg q20-30min (max 40 mg/kg total). Maintien: 3-5 mg/kg/jour div. q12h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=5 mg/kg ; max/prise=200 mg ; max/jour=300 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 5,
        "max_per_dose_mg": 200,
        "max_per_day_mg": 300,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_032_phenytoine",
    "source_excel_row_id": 32,
    "drug": {
      "name": "Phénytoïne",
      "class": "Antiépileptique",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Phénytoïne"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Convulsions réfractaires au phénobarbital",
        "état de mal épileptique"
      ],
      "dilution_or_administration": "NaCl 0.9% strict, 5 mg/mL, 30 min"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 15-20 mg/kg IV en 30 min. Maintien: 4-8 mg/kg/jour div. q12h. Absorption PO erratique. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 15-20 mg/kg IV en 30 min. Maintien: 4-8 mg/kg/jour div. q12h. Absorption PO erratique.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=5 mg/kg ; max/prise=300 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 5,
        "max_per_dose_mg": 300,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_033_levetiracetam",
    "source_excel_row_id": 33,
    "drug": {
      "name": "Lévétiracétam",
      "class": "Antiépileptique",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Lévétiracétam"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Convulsions néonatales",
        "épilepsie"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 40 mg/kg x1. Maintien: 10 mg/kg q12h, augmenter à 20 mg/kg q12h après 3 jours si nécessaire. Max 40 mg/kg/dose. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 40 mg/kg x1. Maintien: 10 mg/kg q12h, augmenter à 20 mg/kg q12h après 3 jours si nécessaire. Max 40 mg/kg/dose.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=10 mg/kg ; max/prise=1500 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 10,
        "max_per_dose_mg": 1500,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_034_topiramate",
    "source_excel_row_id": 34,
    "drug": {
      "name": "Topiramate",
      "class": "Antiépileptique",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Topiramate"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Épilepsie néonatale"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 10 mg/kg x1. Maintien: 3-5 mg/kg/jour div. en 1-2 doses/jour. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 10 mg/kg x1. Maintien: 3-5 mg/kg/jour div. en 1-2 doses/jour.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=3 mg/kg ; max/prise=200 mg ; max/jour=400 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 3,
        "max_per_dose_mg": 200,
        "max_per_day_mg": 400,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_035_adrenaline_epinephrine",
    "source_excel_row_id": 35,
    "drug": {
      "name": "Adrénaline (Épinéphrine)",
      "class": "Catécholamine / Vasopresseur",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Adrénaline",
        "Adrénaline (Épinéphrine)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IO",
        "Nébulisation"
      ],
      "indications": [
        "Arrêt cardiaque",
        "choc anaphylactique",
        "croup sévère",
        "bronchospasme sévère"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, 0.1 mg/mL"
    },
    "dose_expression": {
      "raw_current_posology": "Réanimation: 0,01 mg/kg IV/IO (0,1 mL/kg de 1:10000) q3-5min. Anaphylaxie: 0,01 mg/kg IM (1:1000). Nébulisation (croup): 0,5 mg/kg (max 5mg). (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Réanimation: 0,01 mg/kg IV/IO (0,1 mL/kg de 1:10000) q3-5min. Anaphylaxie: 0,01 mg/kg IM (1:1000). Nébulisation (croup): 0,5 mg/kg (max 5mg).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.01 mg/kg ; max/prise=1 mg ; fréquence/j=6 ; intervalle min=3 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.01,
        "max_per_dose_mg": 1,
        "max_per_day_mg": null,
        "frequency_per_day": 6,
        "minimum_interval_hours": 3,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "renal_or_level_monitoring",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Médicament d’urgence : afficher concentration, voie, dose max et répétition avant calcul.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_036_atropine",
    "source_excel_row_id": 36,
    "drug": {
      "name": "Atropine",
      "class": "Anticholinergique",
      "subclass": "",
      "clinical_system": "Autre",
      "aliases": [
        "Atropine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM",
        "SC"
      ],
      "indications": [
        "Pré-intubation",
        "bradycardie",
        "intoxication organophosphorés"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,02 mg/kg/dose IV. Pré-intubation: 5-10 min avant. Endotrachéal (si pas d'accès IV): 0,04-0,06 mg/kg. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,02 mg/kg/dose IV. Pré-intubation: 5-10 min avant. Endotrachéal (si pas d'accès IV): 0,04-0,06 mg/kg.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.02 mg/kg ; max/prise=0.5 mg ; fréquence/j=4 ; intervalle min=4 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.02,
        "max_per_dose_mg": 0.5,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 4,
        "concentration_mg_per_ml": null
      },
      "rule_type": "semi_structured",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Médicament d’urgence : afficher concentration, voie, dose max et répétition avant calcul.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_037_furosemide",
    "source_excel_row_id": 37,
    "drug": {
      "name": "Furosémide",
      "class": "Diurétique de l'anse",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Furosémide"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Insuffisance cardiaque",
        "œdème",
        "surcharge hydrique"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "IV: 0,5-1 mg/kg/dose IV lent q12-24h. Perfusion: 0,1-0,4 mg/kg/h. PO: doses ~2x plus élevées que IV pour même effet. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : IV: 0,5-1 mg/kg/dose IV lent q12-24h. Perfusion: 0,1-0,4 mg/kg/h. PO: doses ~2x plus élevées que IV pour même effet.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=40 mg ; max/jour=80 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 40,
        "max_per_day_mg": 80,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_038_spironolactone",
    "source_excel_row_id": 38,
    "drug": {
      "name": "Spironolactone",
      "class": "Diurétique épargneur de potassium",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Spironolactone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Insuffisance cardiaque",
        "ascite",
        "dysplasie bronchopulmonaire"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "1 mg/kg/dose PO q12h. Souvent associé au furosémide. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 1 mg/kg/dose PO q12h. Souvent associé au furosémide.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=25 mg ; max/jour=50 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 25,
        "max_per_day_mg": 50,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_039_hydrochlorothiazide",
    "source_excel_row_id": 39,
    "drug": {
      "name": "Hydrochlorothiazide",
      "class": "Diurétique thiazidique",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Hydrochlorothiazide"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Dysplasie bronchopulmonaire",
        "œdème chronique"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "1 mg/kg/dose PO q12h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 1 mg/kg/dose PO q12h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=25 mg ; max/jour=50 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 25,
        "max_per_day_mg": 50,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_040_captopril",
    "source_excel_row_id": 40,
    "drug": {
      "name": "Captopril",
      "class": "Antihypertenseur",
      "subclass": "IEC",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Captopril"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Insuffisance cardiaque",
        "hypertension néonatale"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Initiale: 0,01-0,05 mg/kg TID. Éventail: 0,1-1 mg/kg/dose TID. Débuter aux plus faibles doses si prématuré ou <1 sem. Risque d'hypotension. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Initiale: 0,01-0,05 mg/kg TID. Éventail: 0,1-1 mg/kg/dose TID. Débuter aux plus faibles doses si prématuré ou <1 sem. Risque d'hypotension.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.05 mg/kg ; max/prise=6.25 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.05,
        "max_per_dose_mg": 6.25,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_041_propranolol",
    "source_excel_row_id": 41,
    "drug": {
      "name": "Propranolol",
      "class": "Bêta-bloquant",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Propranolol"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Tachyarythmies",
        "Fallot",
        "hémangiomes",
        "hypertension"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "PO cardio: 1-5 mg/kg/jour div. 3 doses. Hémangiomes: 2,2-3,4 mg/kg/jour div. 2 doses. IV: 0,01-0,15 mg/kg/dose (~10x plus faible que PO). (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : PO cardio: 1-5 mg/kg/jour div. 3 doses. Hémangiomes: 2,2-3,4 mg/kg/jour div. 2 doses. IV: 0,01-0,15 mg/kg/dose (~10x plus faible que PO).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=40 mg ; max/jour=120 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 40,
        "max_per_day_mg": 120,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_042_nifedipine",
    "source_excel_row_id": 42,
    "drug": {
      "name": "Nifédipine",
      "class": "Antihypertenseur",
      "subclass": "Inhibiteur calcique",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Nifédipine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Hypertension artérielle néonatale"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "0,05-0,25 mg/kg/dose PO q4-6h PRN. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,05-0,25 mg/kg/dose PO q4-6h PRN.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=10 mg ; fréquence/j=4 ; intervalle min=4 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 10,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 4,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_043_amlodipine",
    "source_excel_row_id": 43,
    "drug": {
      "name": "Amlodipine",
      "class": "Antihypertenseur",
      "subclass": "Inhibiteur calcique",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Amlodipine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Hypertension artérielle"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Initiale: 0,05 mg/kg q12h. Éventail habituel: 0,1-0,2 mg/kg/dose q12h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Initiale: 0,05 mg/kg q12h. Éventail habituel: 0,1-0,2 mg/kg/dose q12h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=5 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 5,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_044_hydralazine",
    "source_excel_row_id": 44,
    "drug": {
      "name": "Hydralazine",
      "class": "Antihypertenseur",
      "subclass": "Vasodilatateur",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Hydralazine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Hypertension artérielle néonatale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "PO: 0,25-1 mg/kg q6-8h. IV: 0,1-0,5 mg/kg q6-8h (max 2 mg/kg). Doses IV ~2x plus faibles que PO. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : PO: 0,25-1 mg/kg q6-8h. IV: 0,1-0,5 mg/kg q6-8h (max 2 mg/kg). Doses IV ~2x plus faibles que PO.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.5 mg/kg ; max/prise=20 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.5,
        "max_per_dose_mg": 20,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_045_dexamethasone",
    "source_excel_row_id": 45,
    "drug": {
      "name": "Dexaméthasone",
      "class": "Corticoïde",
      "subclass": "",
      "clinical_system": "Endocrinologie",
      "aliases": [
        "Dexaméthasone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Dysplasie bronchopulmonaire",
        "œdème laryngé",
        "croup"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "DBP protocole DART: 0,15 mg/kg/j x3j, puis décroissance. Œdème pre-extubation: 0,25 mg/kg q8-12h x3 doses. Croup (MSF): 0,6 mg/kg PO x1. (Source: CHU Ste-Justine + MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : DBP protocole DART: 0,15 mg/kg/j x3j, puis décroissance. Œdème pre-extubation: 0,25 mg/kg q8-12h x3 doses. Croup (MSF): 0,6 mg/kg PO x1.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.15 mg/kg ; max/prise=8 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.15,
        "max_per_dose_mg": 8,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; arbitrage entre sources"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine + MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp",
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine + MSF. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp ; https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_046_hydrocortisone",
    "source_excel_row_id": 46,
    "drug": {
      "name": "Hydrocortisone",
      "class": "Corticoïde",
      "subclass": "",
      "clinical_system": "Endocrinologie",
      "aliases": [
        "Hydrocortisone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Hypotension réfractaire",
        "insuffisance surrénalienne",
        "choc surrénalien",
        "DBP"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Hypotension: charge 1 mg/kg puis 0,5 mg/kg q6-12h. Choc surrénalien: charge 2 mg/kg puis 1 mg/kg q6h. Dose physio: 1 mg/kg/jour div. 2 doses. Stress: 2-3x la dose. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Hypotension: charge 1 mg/kg puis 0,5 mg/kg q6-12h. Choc surrénalien: charge 2 mg/kg puis 1 mg/kg q6h. Dose physio: 1 mg/kg/jour div. 2 doses. Stress: 2-3x la dose.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=100 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 100,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "renal_or_level_monitoring",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_047_prednisolone",
    "source_excel_row_id": 47,
    "drug": {
      "name": "Prednisolone",
      "class": "Corticoïde",
      "subclass": "",
      "clinical_system": "Endocrinologie",
      "aliases": [
        "Prednisolone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Asthme aigu",
        "croup",
        "syndrome néphrotique",
        "wheezing récurrent"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Asthme aigu/croup: 1-2 mg/kg/jour x3-5 jours. Si dexaméthasone non disponible. (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Asthme aigu/croup: 1-2 mg/kg/jour x3-5 jours. Si dexaméthasone non disponible.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=60 mg ; max/jour=60 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 60,
        "max_per_day_mg": 60,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_048_artemether_lumefantrine_act",
    "source_excel_row_id": 48,
    "drug": {
      "name": "Artéméther-Luméfantrine (ACT)",
      "class": "Antipaludéen",
      "subclass": "",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Artéméther-Luméfantrine",
        "Artéméther-Luméfantrine (ACT)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Paludisme simple à P. falciparum"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "5-14 kg: 1cp (20/120mg) x2/j x3j. 15-24kg: 2cp x2/j x3j. 25-34kg: 3cp x2/j x3j. Donner avec aliment gras. 6 doses totales sur 3 jours (H0, H8, H24, H36, H48, H60). (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 5-14 kg: 1cp (20/120mg) x2/j x3j. 15-24kg: 2cp x2/j x3j. 25-34kg: 3cp x2/j x3j. Donner avec aliment gras. 6 doses totales sur 3 jours (H0, H8, H24, H36, H48, H60).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=2 mg/kg ; max/prise=80 mg ; fréquence/j=2 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 2,
        "max_per_dose_mg": 80,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Antipaludéen : encoder les tranches de poids et le calendrier des prises/doses.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_049_artesunate",
    "source_excel_row_id": 49,
    "drug": {
      "name": "Artésunate",
      "class": "Antipaludéen",
      "subclass": "",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Artésunate"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Paludisme grave",
        "paludisme avec vomissements"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%, 10 mg/mL, 5 min"
    },
    "dose_expression": {
      "raw_current_posology": "Poids < 20 kg : 3 mg/kg IV/IM à H0, H12, H24, puis q24h. Poids ≥ 20 kg : 2,4 mg/kg IV/IM à H0, H12, H24, puis q24h. Minimum 24h de traitement IV avant relais PO par ACT. Artésunate rectal 10 mg/kg si accès IV impossible. (Source: MSF ; tranches de poids : OMS, WHO Guidelines for the treatment of malaria)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante, avec palier de poids : poids < 20 kg = 3 mg/kg IV/IM à H0, H12, H24, puis q24h ; poids ≥ 20 kg = 2,4 mg/kg IV/IM à H0, H12, H24, puis q24h. Minimum 24h de traitement IV avant relais PO par ACT. Artésunate rectal 10 mg/kg si accès IV impossible.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle (< 20 kg)=3 mg/kg, (≥ 20 kg)=2.4 mg/kg ; max/prise=120 mg ; fréquence/j=1 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 2.4,
        "max_per_dose_mg": 120,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "MSF ; OMS (WHO Guidelines for the treatment of malaria)",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Tranches de poids (<20 kg = 3 mg/kg ; ≥20 kg = 2,4 mg/kg) ajoutées le 2026-06-20 d'après l'OMS (WHO Guidelines for the treatment of malaria), conformément à la remarque de revue 'encoder les tranches de poids'."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Antipaludéen : tranches de poids encodées (<20 kg = 3 mg/kg ; ≥20 kg = 2,4 mg/kg, source OMS) et calendrier des prises/doses.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20. Palier de poids ajouté et validé par Dr KAPTO le 2026-06-20 (source OMS).",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_050_quinine",
    "source_excel_row_id": 50,
    "drug": {
      "name": "Quinine",
      "class": "Antipaludéen",
      "subclass": "",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Quinine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Paludisme grave (si artésunate non disponible)"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 20 mg/kg (sel) en 4h. Maintien: 10 mg/kg q8h. Perfusion en D10% ou NaCl 0,9%. Surveiller glycémie (risque hypoglycémie). (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 20 mg/kg (sel) en 4h. Maintien: 10 mg/kg q8h. Perfusion en D10% ou NaCl 0,9%. Surveiller glycémie (risque hypoglycémie).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=10 mg/kg ; max/prise=600 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 10,
        "max_per_dose_mg": 600,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Antipaludéen : encoder les tranches de poids et le calendrier des prises/doses.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_051_ondansetron",
    "source_excel_row_id": 51,
    "drug": {
      "name": "Ondansétron",
      "class": "Antiémétique",
      "subclass": "Anti-5HT3",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Ondansétron"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Nausées",
        "vomissements"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,15 mg/kg/dose IV ou PO q8h. Utile pour permettre la réhydratation orale. (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,15 mg/kg/dose IV ou PO q8h. Utile pour permettre la réhydratation orale.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.15 mg/kg ; max/prise=4 mg ; max/jour=16 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.15,
        "max_per_dose_mg": 4,
        "max_per_day_mg": 16,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_052_omeprazole",
    "source_excel_row_id": 52,
    "drug": {
      "name": "Oméprazole",
      "class": "Inhibiteur de la pompe à protons",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Oméprazole"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Reflux gastro-œsophagien",
        "ulcère gastrique",
        "œsophagite"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,5-1,5 mg/kg/jour en 1-2 doses. (Source: MSF)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,5-1,5 mg/kg/jour en 1-2 doses.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=20 mg ; max/jour=40 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 20,
        "max_per_day_mg": 40,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "MSF",
      "drive_urls": [
        "https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : MSF. URL Drive : https://drive.google.com/file/d/1JtuLTdPcAqYicjh2Bc_Z0L9H7SGqg0Jv. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_053_ranitidine",
    "source_excel_row_id": 53,
    "drug": {
      "name": "Ranitidine",
      "class": "Anti-H2",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Ranitidine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Saignements gastriques",
        "reflux gastro-œsophagien"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "PO: 2 mg/kg q12h (q8h si réponse incomplète). IV prématuré: 1,5 mg/kg q12h. IV à terme: 1,5 mg/kg q8h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : PO: 2 mg/kg q12h (q8h si réponse incomplète). IV prématuré: 1,5 mg/kg q12h. IV à terme: 1,5 mg/kg q8h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=2 mg/kg ; max/prise=150 mg ; max/jour=300 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 2,
        "max_per_dose_mg": 150,
        "max_per_day_mg": 300,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_054_lansoprazole",
    "source_excel_row_id": 54,
    "drug": {
      "name": "Lansoprazole",
      "class": "Inhibiteur de la pompe à protons",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Lansoprazole"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Reflux gastro-œsophagien néonatal"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "0,5-1,5 mg/kg/jour en 1-2 doses. Doses plus faibles si <10 sem. Prescrire en multiples de 3,75 mg. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,5-1,5 mg/kg/jour en 1-2 doses. Doses plus faibles si <10 sem. Prescrire en multiples de 3,75 mg.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=30 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 30,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_055_metoclopramide",
    "source_excel_row_id": 55,
    "drug": {
      "name": "Métoclopramide",
      "class": "Prokinétique / Antiémétique",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Métoclopramide"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Reflux gastro-œsophagien",
        "nausées"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,1 mg/kg/dose PO ou IV q6-8h. Risque de syndrome extrapyramidal. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,1 mg/kg/dose PO ou IV q6-8h. Risque de syndrome extrapyramidal.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=10 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 10,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_056_domperidone",
    "source_excel_row_id": 56,
    "drug": {
      "name": "Dompéridone",
      "class": "Prokinétique",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Dompéridone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Reflux gastro-œsophagien"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "0,25 mg/kg/dose PO TID. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,25 mg/kg/dose PO TID.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.25 mg/kg ; max/prise=10 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.25,
        "max_per_dose_mg": 10,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_057_naloxone",
    "source_excel_row_id": 57,
    "drug": {
      "name": "Naloxone",
      "class": "Antagoniste opioïde",
      "subclass": "",
      "clinical_system": "Neurologie / Sédation",
      "aliases": [
        "Naloxone"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM",
        "SC"
      ],
      "indications": [
        "Intoxication aux opiacés",
        "dépression respiratoire post-opioïde"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Renversement complet (surdosage): 0,1 mg/kg IV q2-3min PRN. Renversement partiel (dépression respi.): 0,01 mg/kg IV q2-3min PRN. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Renversement complet (surdosage): 0,1 mg/kg IV q2-3min PRN. Renversement partiel (dépression respi.): 0,01 mg/kg IV q2-3min PRN.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.01 mg/kg ; max/prise=2 mg ; fréquence/j=6 ; intervalle min=2 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.01,
        "max_per_dose_mg": 2,
        "max_per_day_mg": null,
        "frequency_per_day": 6,
        "minimum_interval_hours": 2,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Médicament d’urgence : afficher concentration, voie, dose max et répétition avant calcul.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_058_flumazenil",
    "source_excel_row_id": 58,
    "drug": {
      "name": "Flumazénil",
      "class": "Antagoniste benzodiazépine",
      "subclass": "",
      "clinical_system": "Toxicologie / Antidote",
      "aliases": [
        "Flumazénil"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Intoxication aux benzodiazépines"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,01 mg/kg IV direct rapide q1min PRN. Max 5 doses. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,01 mg/kg IV direct rapide q1min PRN. Max 5 doses.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.01 mg/kg ; max/prise=0.2 mg ; fréquence/j=5 ; intervalle min=1 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.01,
        "max_per_dose_mg": 0.2,
        "max_per_day_mg": null,
        "frequency_per_day": 5,
        "minimum_interval_hours": 1,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Médicament d’urgence : afficher concentration, voie, dose max et répétition avant calcul.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_059_vitamine_k_phytonadione",
    "source_excel_row_id": 59,
    "drug": {
      "name": "Vitamine K (Phytonadione)",
      "class": "Vitamine",
      "subclass": "",
      "clinical_system": "Métabolisme / Nutrition",
      "aliases": [
        "Vitamine K",
        "Vitamine K (Phytonadione)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IM",
        "IV",
        "Orale"
      ],
      "indications": [
        "Prévention maladie hémorragique du nouveau-né",
        "hémorragies"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "<28 sem: 0,5 mg IV à la naissance. ≥28 sem: 1 mg IM. PO (si IM refusé): 2 mg x3 doses (naissance, 2-4 sem, 6-8 sem). Hémorragie: 1-2 mg IV. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : <28 sem: 0,5 mg IV à la naissance. ≥28 sem: 1 mg IM. PO (si IM refusé): 2 mg x3 doses (naissance, 2-4 sem, 6-8 sem). Hémorragie: 1-2 mg IV.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=10 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 10,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_060_fer_sulfate_ferreux",
    "source_excel_row_id": 60,
    "drug": {
      "name": "Fer (sulfate ferreux)",
      "class": "Supplément",
      "subclass": "",
      "clinical_system": "Métabolisme / Nutrition",
      "aliases": [
        "Fer",
        "Fer (sulfate ferreux)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Prévention anémie du prématuré",
        "anémie ferriprive"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "<30 sem ou <1,5 kg ou RCIU: 4 mg/kg/jour dès 2 semaines. 1,5-2 kg: 2-4 mg/kg/jour au congé. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : <30 sem ou <1,5 kg ou RCIU: 4 mg/kg/jour dès 2 semaines. 1,5-2 kg: 2-4 mg/kg/jour au congé.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=4 mg/kg ; max/prise=60 mg ; max/jour=60 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 4,
        "max_per_dose_mg": 60,
        "max_per_day_mg": 60,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_061_cafeine_citrate",
    "source_excel_row_id": 61,
    "drug": {
      "name": "Caféine (citrate)",
      "class": "Méthylxanthine",
      "subclass": "",
      "clinical_system": "Respiratoire",
      "aliases": [
        "Caféine",
        "Caféine (citrate)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Apnée du prématuré"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Charge: 10 mg/kg (caféine base). Maintien: 5 mg/kg/jour q24h, 12-24h après charge. 10 mg citrate = 5 mg base. Doses plus élevées chez bébés plus âgés. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Charge: 10 mg/kg (caféine base). Maintien: 5 mg/kg/jour q24h, 12-24h après charge. 10 mg citrate = 5 mg base. Doses plus élevées chez bébés plus âgés.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=5 mg/kg ; max/prise=200 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 5,
        "max_per_dose_mg": 200,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Sécuriser les unités : mcg/µg vs mg.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_062_succinylcholine",
    "source_excel_row_id": 62,
    "drug": {
      "name": "Succinylcholine",
      "class": "Curare dépolarisant",
      "subclass": "",
      "clinical_system": "Sédation / Anesthésie",
      "aliases": [
        "Succinylcholine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Intubation en séquence rapide"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "2 mg/kg IV direct rapide juste avant intubation. Utilisé dans la combinaison intubation néonatale: atropine + fentanyl + succinylcholine. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 2 mg/kg IV direct rapide juste avant intubation. Utilisé dans la combinaison intubation néonatale: atropine + fentanyl + succinylcholine.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=2 mg/kg ; max/prise=150 mg ; fréquence/j=1.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 2,
        "max_per_dose_mg": 150,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": null,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_063_rocuronium",
    "source_excel_row_id": 63,
    "drug": {
      "name": "Rocuronium",
      "class": "Curare non dépolarisant",
      "subclass": "",
      "clinical_system": "Sédation / Anesthésie",
      "aliases": [
        "Rocuronium"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "IM"
      ],
      "indications": [
        "Intubation",
        "curarisation chirurgicale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "1 mg/kg IV/IM q30-60min PRN. Perfusion: 0,2-1 mg/kg/h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 1 mg/kg IV/IM q30-60min PRN. Perfusion: 0,2-1 mg/kg/h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=100 mg ; fréquence/j=2 ; intervalle min=0.5 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 100,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 0.5,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_064_gluconate_de_calcium_10",
    "source_excel_row_id": 64,
    "drug": {
      "name": "Gluconate de calcium 10%",
      "class": "Électrolyte",
      "subclass": "",
      "clinical_system": "Métabolisme / Nutrition",
      "aliases": [
        "Gluconate de calcium 10%"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Hypocalcémie",
        "réanimation"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Hypo symptomatique: 100-200 mg/kg en 10-30 min (voie centrale). Réanimation: 60 mg/kg en 5-10 min. Entretien PO: 20-60 mg Ca élémentaire/kg/jour div. q6-8h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Hypo symptomatique: 100-200 mg/kg en 10-30 min (voie centrale). Réanimation: 60 mg/kg en 5-10 min. Entretien PO: 20-60 mg Ca élémentaire/kg/jour div. q6-8h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=100 mg/kg ; max/prise=2000 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 100,
        "max_per_dose_mg": 2000,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "clinical_contraindication_or_interaction",
        "dilution_or_infusion_sensitive",
        "emergency_drug",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Médicament d’urgence : afficher concentration, voie, dose max et répétition avant calcul.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_065_albumine_humaine",
    "source_excel_row_id": 65,
    "drug": {
      "name": "Albumine humaine",
      "class": "Soluté de remplissage",
      "subclass": "",
      "clinical_system": "Métabolisme / Nutrition",
      "aliases": [
        "Albumine humaine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Hypovolémie",
        "hypoalbuminémie"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,5-1 g/kg. Solution 5%: 10-20 mL/kg en 30-60 min. Solution 25%: 2-4 mL/kg en 1-2h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,5-1 g/kg. Solution 5%: 10-20 mL/kg en 30-60 min. Solution 25%: 2-4 mL/kg en 1-2h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1000 mg/kg ; max/prise=25000 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1000,
        "max_per_dose_mg": 25000,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_066_enoxaparine",
    "source_excel_row_id": 66,
    "drug": {
      "name": "Énoxaparine",
      "class": "Anticoagulant",
      "subclass": "HBPM",
      "clinical_system": "Hématologie",
      "aliases": [
        "Énoxaparine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "SC"
      ],
      "indications": [
        "Thrombose veineuse",
        "embolie pulmonaire"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Traitement <37 sem: 2 mg/kg q12h SC. ≥37 sem: 1,7 mg/kg q12h SC. Prophylaxie: 0,85-1 mg/kg q12h. Surveillance anti-Xa requise. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Traitement <37 sem: 2 mg/kg q12h SC. ≥37 sem: 1,7 mg/kg q12h SC. Prophylaxie: 0,85-1 mg/kg q12h. Surveillance anti-Xa requise.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1.7 mg/kg ; max/prise=80 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1.7,
        "max_per_dose_mg": 80,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Prévoir champ de surveillance biologique/taux résiduel ou anti-Xa selon le médicament.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_067_acetylcysteine_nac",
    "source_excel_row_id": 67,
    "drug": {
      "name": "Acétylcystéine (NAC)",
      "class": "Mucolytique / Antidote",
      "subclass": "",
      "clinical_system": "Respiratoire",
      "aliases": [
        "Acétylcystéine",
        "Acétylcystéine (NAC)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Nébulisation",
        "Orale",
        "Rectal"
      ],
      "indications": [
        "Mucoviscidose",
        "intoxication au paracétamol",
        "bouchon méconial"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Nébulisation: 1 mL sol. 20% q6-8h dilué dans 3 mL NaCl. PO: sol. diluée à 5-10%, 1-5 mL x1-4/j. Lavement: 5-10 mL/kg IR. Prémédication salbutamol. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Nébulisation: 1 mL sol. 20% q6-8h dilué dans 3 mL NaCl. PO: sol. diluée à 5-10%, 1-5 mL x1-4/j. Lavement: 5-10 mL/kg IR. Prémédication salbutamol.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=150 mg/kg ; max/prise=10000 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 150,
        "max_per_dose_mg": 10000,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_068_adenosine",
    "source_excel_row_id": 68,
    "drug": {
      "name": "Adénosine",
      "class": "Antiarythmique",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Adénosine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Tachycardie supraventriculaire"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "0,05-0,1 mg/kg IV direct rapide. Augmenter de 0,05-0,1 mg/kg/dose q2min PRN. Max 0,3 mg/kg/dose. Flush NaCl immédiat. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,05-0,1 mg/kg IV direct rapide. Augmenter de 0,05-0,1 mg/kg/dose q2min PRN. Max 0,3 mg/kg/dose. Flush NaCl immédiat.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.1 mg/kg ; max/prise=12 mg ; fréquence/j=3 ; intervalle min=2 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.1,
        "max_per_dose_mg": 12,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 2,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Médicament d’urgence : afficher concentration, voie, dose max et répétition avant calcul.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_069_sildenafil",
    "source_excel_row_id": 69,
    "drug": {
      "name": "Sildénafil",
      "class": "Inhibiteur PDE5",
      "subclass": "",
      "clinical_system": "Autre",
      "aliases": [
        "Sildénafil"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Hypertension artérielle pulmonaire néonatale"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "PO: initiale 1 mg/kg/jour div. 4 doses, augmenter de 1 mg/kg/jour q48-72h. Max 4-8 mg/kg/jour. IV: 0,03-0,067 mg/kg/h en perfusion continue. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : PO: initiale 1 mg/kg/jour div. 4 doses, augmenter de 1 mg/kg/jour q48-72h. Max 4-8 mg/kg/jour. IV: 0,03-0,067 mg/kg/h en perfusion continue.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.5 mg/kg ; max/prise=20 mg ; max/jour=80 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.5,
        "max_per_dose_mg": 20,
        "max_per_day_mg": 80,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_070_bosentan",
    "source_excel_row_id": 70,
    "drug": {
      "name": "Bosentan",
      "class": "Antagoniste des récepteurs de l'endothéline",
      "subclass": "",
      "clinical_system": "Toxicologie / Antidote",
      "aliases": [
        "Bosentan"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Hypertension artérielle pulmonaire"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Initiale: 1 mg/kg PO q12h. Après 1 mois: 2 mg/kg q12h si toléré. Prescrire en multiples de 2,5 mg. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Initiale: 1 mg/kg PO q12h. Après 1 mois: 2 mg/kg q12h si toléré. Prescrire en multiples de 2,5 mg.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=62.5 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 62.5,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "semi_structured",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_071_sotalol",
    "source_excel_row_id": 71,
    "drug": {
      "name": "Sotalol",
      "class": "Antiarythmique / Bêta-bloquant",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Sotalol"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Tachyarythmies supraventriculaires et ventriculaires"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Initiale: 2 mg/kg/jour div. 2-3 doses. Aug. de 1-2 mg/kg/jour q2-3 jours. Éventail: 2-8 mg/kg/jour. Schémas agressifs = risque toxicité. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Initiale: 2 mg/kg/jour div. 2-3 doses. Aug. de 1-2 mg/kg/jour q2-3 jours. Éventail: 2-8 mg/kg/jour. Schémas agressifs = risque toxicité.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=2 mg/kg ; max/prise=160 mg ; max/jour=320 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 2,
        "max_per_dose_mg": 160,
        "max_per_day_mg": 320,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_072_digoxine",
    "source_excel_row_id": 72,
    "drug": {
      "name": "Digoxine",
      "class": "Inotrope / Antiarythmique",
      "subclass": "",
      "clinical_system": "Cardiovasculaire",
      "aliases": [
        "Digoxine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale",
        "IV"
      ],
      "indications": [
        "Insuffisance cardiaque",
        "tachyarythmies supraventriculaires"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "PO charge NNé terme: 30 mcg/kg div. 3 doses sur 24h (50%-25%-25%). Maintien: 8-10 mcg/kg/jour div. 2 doses. Dose IV = 2/3-3/4 de PO. Attention unités mcg! (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : PO charge NNé terme: 30 mcg/kg div. 3 doses sur 24h (50%-25%-25%). Maintien: 8-10 mcg/kg/jour div. 2 doses. Dose IV = 2/3-3/4 de PO. Attention unités mcg!\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.005 mg/kg ; max/prise=0.25 mg ; fréquence/j=2 ; intervalle min=12 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.005,
        "max_per_dose_mg": 0.25,
        "max_per_day_mg": null,
        "frequency_per_day": 2,
        "minimum_interval_hours": 12,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Sécuriser les unités : mcg/µg vs mg.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_073_nystatine",
    "source_excel_row_id": 73,
    "drug": {
      "name": "Nystatine",
      "class": "Antifongique",
      "subclass": "topique/local",
      "clinical_system": "Infectiologie",
      "aliases": [
        "Nystatine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale (badigeonnage)",
        "Topique"
      ],
      "indications": [
        "Candidose buccale (muguet)",
        "candidose cutanée"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "0,5-1 mL en badigeonnage buccal QID. Application topique QID. Pas de dose mg/kg (dose fixe volumétrique). (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,5-1 mL en badigeonnage buccal QID. Application topique QID. Pas de dose mg/kg (dose fixe volumétrique).\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0 mg/kg ; max/prise=0 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0,
        "max_per_dose_mg": 0,
        "max_per_day_mg": null,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_074_ursodiol_acide_ursodeoxycholique",
    "source_excel_row_id": 74,
    "drug": {
      "name": "Ursodiol (Acide ursodéoxycholique)",
      "class": "Hépatoprotecteur",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Ursodiol",
        "Ursodiol (Acide ursodéoxycholique)"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Cholestase néonatale",
        "ictère cholestatique"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "10 mg/kg/dose PO TID. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 10 mg/kg/dose PO TID.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=10 mg/kg ; max/prise=300 mg ; max/jour=900 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 10,
        "max_per_dose_mg": 300,
        "max_per_day_mg": 900,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "chronological_age",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_075_oxybutynine",
    "source_excel_row_id": 75,
    "drug": {
      "name": "Oxybutynine",
      "class": "Antispasmodique urinaire",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Oxybutynine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Vessie neurogène",
        "instabilité vésicale"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "0,1-0,2 mg/kg/dose PO q8-12h. Doses élevées réservées aux enfants à terme. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 0,1-0,2 mg/kg/dose PO q8-12h. Doses élevées réservées aux enfants à terme.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.15 mg/kg ; max/prise=5 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.15,
        "max_per_dose_mg": 5,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "simple_or_semi_simple",
      "encoding_dimensions": [
        "chronological_age",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": false
    }
  },
  {
    "rule_id": "dosea_v2_076_diazoxide",
    "source_excel_row_id": 76,
    "drug": {
      "name": "Diazoxide",
      "class": "Antihypoglycémiant",
      "subclass": "",
      "clinical_system": "Endocrinologie",
      "aliases": [
        "Diazoxide"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Hyperinsulinisme congénital",
        "hypoglycémie hyperinsulinique"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "5-15 mg/kg/jour PO div. 3 doses q8h. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 5-15 mg/kg/jour PO div. 3 doses q8h.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=5 mg/kg ; max/prise=150 mg ; max/jour=450 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 5,
        "max_per_dose_mg": 150,
        "max_per_day_mg": 450,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_077_glucagon",
    "source_excel_row_id": 77,
    "drug": {
      "name": "Glucagon",
      "class": "Hormone hyperglycémiante",
      "subclass": "",
      "clinical_system": "Endocrinologie",
      "aliases": [
        "Glucagon"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "SC",
        "IM"
      ],
      "indications": [
        "Hypoglycémie sévère réfractaire",
        "surdosage bêta-bloquants"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "Hypoglycémie: 0,03 mg/kg IV q1-4h PRN. Surdosage bêta-bloquants: 0,15 mg/kg IV q30min PRN. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Hypoglycémie: 0,03 mg/kg IV q1-4h PRN. Surdosage bêta-bloquants: 0,15 mg/kg IV q30min PRN.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.03 mg/kg ; max/prise=1 mg ; fréquence/j=6 ; intervalle min=1 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.03,
        "max_per_dose_mg": 1,
        "max_per_day_mg": null,
        "frequency_per_day": 6,
        "minimum_interval_hours": 1,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration ; surveillance clinique/biologique"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_078_pantoprazole",
    "source_excel_row_id": 78,
    "drug": {
      "name": "Pantoprazole",
      "class": "Inhibiteur de la pompe à protons",
      "subclass": "",
      "clinical_system": "Gastro-entérologie",
      "aliases": [
        "Pantoprazole"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV"
      ],
      "indications": [
        "Hémorragie digestive",
        "ulcère gastrique"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "1-2 mg/kg/jour IV div. 1-2 doses. Perfusion continue: 0,2 mg/kg/h ± charge 2 mg/kg IV. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 1-2 mg/kg/jour IV div. 1-2 doses. Perfusion continue: 0,2 mg/kg/h ± charge 2 mg/kg IV.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=1 mg/kg ; max/prise=40 mg ; fréquence/j=1 ; intervalle min=24 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 1,
        "max_per_dose_mg": 40,
        "max_per_day_mg": null,
        "frequency_per_day": 1,
        "minimum_interval_hours": 24,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "clinical_indication",
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "loading_or_maintenance",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_079_clonidine",
    "source_excel_row_id": 79,
    "drug": {
      "name": "Clonidine",
      "class": "Alpha-2 agoniste",
      "subclass": "",
      "clinical_system": "Autre",
      "aliases": [
        "Clonidine"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "Orale"
      ],
      "indications": [
        "Sevrage néonatal (NAS)",
        "sédation adjuvante",
        "hypertension"
      ],
      "dilution_or_administration": ""
    },
    "dose_expression": {
      "raw_current_posology": "Initiales <35 sem: 2 mcg/kg/jour div. 3-4 doses. ≥35 sem: 5 mcg/kg/jour div. 4 doses. Augmenter de 1 mcg/kg/jour. Max 12 mcg/kg/jour. Sevrage sur 7-14j. Doses en mcg! (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : Initiales <35 sem: 2 mcg/kg/jour div. 3-4 doses. ≥35 sem: 5 mcg/kg/jour div. 4 doses. Augmenter de 1 mcg/kg/jour. Max 12 mcg/kg/jour. Sevrage sur 7-14j. Doses en mcg!\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=0.001 mg/kg ; max/prise=0.1 mg ; max/jour=0.3 mg ; fréquence/j=4 ; intervalle min=6 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 0.001,
        "max_per_dose_mg": 0.1,
        "max_per_day_mg": 0.3,
        "frequency_per_day": 4,
        "minimum_interval_hours": 6,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "chronological_age",
        "clinical_indication",
        "dilution_administration",
        "frequency_interval",
        "gestational_or_neonatal_age",
        "loading_or_maintenance",
        "maxima",
        "monitoring",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; âge gestationnel / postmenstruel / postnatal ; indication clinique ; voie d’administration ; dose de charge / entretien / relais ; fréquence et intervalle ; plafonds max/prise et/ou max/jour ; surveillance clinique/biologique ; unité active à sécuriser"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "maximum_dose_required",
        "neonatal_or_prematurity_context",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes. Sécuriser les unités : mcg/µg vs mg.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  },
  {
    "rule_id": "dosea_v2_080_acetazolamide",
    "source_excel_row_id": 80,
    "drug": {
      "name": "Acétazolamide",
      "class": "Inhibiteur de l'anhydrase carbonique",
      "subclass": "",
      "clinical_system": "Autre",
      "aliases": [
        "Acétazolamide"
      ]
    },
    "validated": {
      "status": "validated_by_user_ready_for_v2_encoding",
      "validator": "Dr KAPTO",
      "validation_date": "2026-06-20",
      "decision_review": "Validé par Dr KAPTO le 2026-06-20",
      "source_status": "source_declared_in_review_file_not_researched_again"
    },
    "clinical_context": {
      "routes": [
        "IV",
        "Orale"
      ],
      "indications": [
        "Hydrocéphalie",
        "glaucome",
        "alcalose métabolique"
      ],
      "dilution_or_administration": "NaCl 0.9% ou G5%"
    },
    "dose_expression": {
      "raw_current_posology": "5 mg/kg/dose PO ou IV q8-12h PRN. (Source: CHU Ste-Justine)",
      "validated_posology_text": "encoder comme règle conditionnelle/source-dépendante : 5 mg/kg/dose PO ou IV q8-12h PRN.\nParamètres retenus pour encodage, sous réserve de conformité source : dose app actuelle=5 mg/kg ; max/prise=250 mg ; fréquence/j=3 ; intervalle min=8 h.",
      "structured_parameters_from_review_table": {
        "dose_app_mg_per_kg": 5,
        "max_per_dose_mg": 250,
        "max_per_day_mg": null,
        "frequency_per_day": 3,
        "minimum_interval_hours": 8,
        "concentration_mg_per_ml": null
      },
      "rule_type": "conditional_or_algorithmic",
      "encoding_dimensions": [
        "concentration_form",
        "dilution_administration",
        "frequency_interval",
        "maxima",
        "route",
        "source_arbitration",
        "weight"
      ],
      "conditions_to_encode_text": "poids ; voie d’administration ; fréquence et intervalle ; forme / concentration disponible ; plafonds max/prise et/ou max/jour ; dilution / vitesse / modalités d’administration"
    },
    "sources": {
      "declared_source_label": "CHU Ste-Justine",
      "drive_urls": [
        "https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp"
      ],
      "source_section_or_page_text": "Source déclarée dans le fichier : CHU Ste-Justine. URL Drive : https://drive.google.com/file/d/1j_pwKJsAA2xdRK9ikeomG-uR6CSnWxYp. Section/page exacte à compléter pendant la revue humaine."
    },
    "safety": {
      "safety_flags": [
        "dilution_or_infusion_sensitive",
        "maximum_dose_required",
        "unit_sensitive"
      ],
      "reviewer_comment": "Ne pas encoder comme dose unique si plusieurs populations, indications ou voies sont présentes.\nValidation utilisateur : toutes les propositions IA du premier passage sont validées par Dr KAPTO le 2026-06-20.",
      "app_status": "Validé – prêt pour encodage V2"
    },
    "implementation": {
      "target_engine": "DOSEA dosing rules V2",
      "recommended_encoding_status": "ready_for_engine_encoding",
      "requires_manual_programming_of_conditions": true,
      "do_not_use_as_blind_single_mg_per_kg": true
    }
  }
] as const;
export type DoseaDosingRuleV2Validated = typeof DOSEA_DOSING_RULES_V2_VALIDATED[number];
