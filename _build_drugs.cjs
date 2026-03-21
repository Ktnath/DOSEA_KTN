const fs = require('fs');
const path = require('path');

// Comprehensive drug database extracted from:
// 1. CHU Sainte-Justine Neonatal Guide 2018
// 2. MSF Pediatric Clinical Guide 2017
// 3. HUG Injectable Medications Guide
// Mapped to DOSEA Drug interface: { name, class, recommendedDoseMgPerKg, maxDoseMg, maxDailyDoseMg?, frequencyPerDay?, minIntervalHours?, route, indications?, notes?, concentrationMgPerMl? }

const drugs = [
    // ===== EXISTING 4 DRUGS (kept & enriched) =====
    {
        name: "Paracétamol",
        class: "Antalgique / Antipyrétique",
        recommendedDoseMgPerKg: 15,
        maxDoseMg: 1000,
        maxDailyDoseMg: 3000,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Orale / Rectale",
        concentrationMgPerMl: 30,
        indications: "Douleur légère à modérée, fièvre",
        notes: "PO: 10-15 mg/kg/dose q6-8h. IR: 20 mg/kg/dose q6-8h. Max 60 mg/kg/jour. Intervalles q8h si < 37 sem. (Source: CHU Ste-Justine 2018)"
    },
    {
        name: "Ibuprofène",
        class: "AINS",
        recommendedDoseMgPerKg: 10,
        maxDoseMg: 400,
        maxDailyDoseMg: 1200,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        concentrationMgPerMl: 20,
        indications: "Douleur, inflammation, fièvre",
        notes: "Max 40 mg/kg/jour répartis en 3 prises. Canal artériel (IV néonatal): charge 10 mg/kg puis 5 mg/kg/dose q24h x2. (Source: CHU Ste-Justine)"
    },
    {
        name: "Amoxicilline",
        class: "Antibiotique (Pénicilline)",
        recommendedDoseMgPerKg: 30,
        maxDoseMg: 1000,
        maxDailyDoseMg: 3000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        concentrationMgPerMl: 50,
        indications: "Infections bactériennes ORL, bronchiques, urinaires, prophylaxie urinaire",
        notes: "80-90 mg/kg/jour en 2-3 prises (OMA, pneumonie). Prophylaxie urinaire néonatale: 20 mg/kg/jour DIE. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Salbutamol (nébulisation)",
        class: "Bronchodilatateur (β2-agoniste)",
        recommendedDoseMgPerKg: 0.15,
        maxDoseMg: 5,
        maxDailyDoseMg: 20,
        frequencyPerDay: 4,
        minIntervalHours: 4,
        route: "Inhalation / Nébulisation",
        indications: "Bronchospasme, asthme, bronchiolite, hyperkaliémie",
        notes: "Nébulisation: 0,1-0,15 mg/kg q2-6h. Aérosol-doseur: 100-200 mcg/dose q2-6h. Hyperkaliémie: 0,4 mg/dose nébulisation q2h. (Source: CHU Ste-Justine)"
    },

    // ===== ANTIBIOTIQUES =====
    {
        name: "Ampicilline",
        class: "Antibiotique (Pénicilline)",
        recommendedDoseMgPerKg: 50,
        maxDoseMg: 2000,
        maxDailyDoseMg: 12000,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "IV / IM",
        indications: "Sepsis néonatal, méningite à streptocoques B, prophylaxie urinaire",
        notes: "Sepsis: 50 mg/kg/dose. Méningite strepto B: 200-300 mg/kg/jour div. q6-8h. Intervalle selon âge postmenstruel. Max 300 mg/kg/jour. (Source: CHU Ste-Justine)"
    },
    {
        name: "Gentamicine",
        class: "Antibiotique (Aminoside)",
        recommendedDoseMgPerKg: 3.2,
        maxDoseMg: 120,
        frequencyPerDay: 1,
        minIntervalHours: 18,
        route: "IV / IM",
        indications: "Sepsis néonatal, infections graves à Gram négatif",
        notes: "Dose et intervalle selon âge postmenstruel: <30sem 3,8mg/kg q36h; 30-39sem 3,2mg/kg q24h; ≥40sem 3mg/kg q12-18h. Cpmin visée 0,5-1 mg/L. (Source: CHU Ste-Justine)"
    },
    {
        name: "Céfotaxime",
        class: "Antibiotique (Céphalosporine 3G)",
        recommendedDoseMgPerKg: 50,
        maxDoseMg: 2000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Méningite, sepsis néonatal, infections sévères",
        notes: "50 mg/kg/dose. Même dose pour méningite. Intervalle selon âge postmenstruel: <30sem q12h; ≥37sem q6-8h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Ceftriaxone",
        class: "Antibiotique (Céphalosporine 3G)",
        recommendedDoseMgPerKg: 50,
        maxDoseMg: 4000,
        maxDailyDoseMg: 4000,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV / IM",
        indications: "Méningite, infections sévères, fièvre typhoïde",
        notes: "Infection: 50 mg/kg q24h. Méningite ≥14j: 80-100 mg/kg q24h. Contre-indiqué avec calcium IV chez le nouveau-né. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Ceftazidime",
        class: "Antibiotique (Céphalosporine 3G)",
        recommendedDoseMgPerKg: 50,
        maxDoseMg: 2000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Infections à Pseudomonas, infections sévères à Gram négatif",
        notes: "50 mg/kg/dose. Intervalle selon âge postmenstruel. (Source: CHU Ste-Justine)"
    },
    {
        name: "Céfazoline",
        class: "Antibiotique (Céphalosporine 1G)",
        recommendedDoseMgPerKg: 25,
        maxDoseMg: 1000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Infections à staphylocoques, prophylaxie chirurgicale",
        notes: "25 mg/kg/dose. Infection grave enfant à terme >7j: 50 mg/kg/dose. Intervalle selon âge postmenstruel. (Source: CHU Ste-Justine)"
    },
    {
        name: "Cloxacilline",
        class: "Antibiotique (Pénicilline M)",
        recommendedDoseMgPerKg: 25,
        maxDoseMg: 2000,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "IV",
        indications: "Infections à staphylocoques, ostéomyélite, cellulite",
        notes: "Infection: 25 mg/kg/dose. Infection sévère (abcès, ostéomyélite, méningite): 50 mg/kg/dose. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Vancomycine",
        class: "Antibiotique (Glycopeptide)",
        recommendedDoseMgPerKg: 10,
        maxDoseMg: 1000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Infections à SARM, méningite, endocardite, sepsis",
        notes: "Charge: 15 mg/kg x1. Maintien: 10 mg/kg/dose. Intervalle selon âge postmenstruel (6-12h). Cpmin visée: sepsis 10-15 mg/L, méningite 15-20 mg/L. (Source: CHU Ste-Justine)"
    },
    {
        name: "Métronidazole",
        class: "Antibiotique (Nitro-imidazolé)",
        recommendedDoseMgPerKg: 7.5,
        maxDoseMg: 500,
        maxDailyDoseMg: 1500,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV / Orale",
        indications: "Infections anaérobies, entérocolite nécrosante, abcès, amibiase",
        notes: "Charge: 15 mg/kg x1. Maintien: 7,5 mg/kg/dose. Intervalle selon âge postmenstruel (8-48h). PO dès que possible. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Méropénem",
        class: "Antibiotique (Carbapénème)",
        recommendedDoseMgPerKg: 20,
        maxDoseMg: 1000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Infections sévères multi-résistantes, méningite, Pseudomonas",
        notes: "Infection: 20-30 mg/kg/dose. Méningite ou Pseudomonas: 40 mg/kg/dose. Usage restreint, autorisation infectiologue requise. (Source: CHU Ste-Justine)"
    },
    {
        name: "Pipéracilline + Tazobactam",
        class: "Antibiotique (Pénicilline + inhibiteur β-lactamase)",
        recommendedDoseMgPerKg: 75,
        maxDoseMg: 4000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Entérocolite nécrosante grade II-III, pneumonie sous ventilation",
        notes: "50-100 mg/kg/dose (hab. 75 mg/kg). Intervalle selon âge postmenstruel. Autorisé pour NEC et pneumonie. (Source: CHU Ste-Justine)"
    },
    {
        name: "Linézolide",
        class: "Antibiotique (Oxazolidinone)",
        recommendedDoseMgPerKg: 10,
        maxDoseMg: 600,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV / Orale",
        indications: "Infections à SARM, VRE, infections résistantes",
        notes: "10 mg/kg/dose. <34 sem et <7j postnatal: q12h; sinon q8h. Attention: utiliser âge gestationnel (non postmenstruel). (Source: CHU Ste-Justine)"
    },
    {
        name: "Rifampicine",
        class: "Antibiotique (Rifamycine)",
        recommendedDoseMgPerKg: 7.5,
        maxDoseMg: 600,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "IV / Orale",
        indications: "Synergie anti-staphylococcique, tuberculose",
        notes: "5-10 mg/kg/dose q12h en synergie pour infections à Staphylococcus spp. (Source: CHU Ste-Justine)"
    },
    {
        name: "Cotrimoxazole (TMP-SMX)",
        class: "Antibiotique (Sulfamide)",
        recommendedDoseMgPerKg: 4,
        maxDoseMg: 320,
        maxDailyDoseMg: 320,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale",
        indications: "Infections urinaires, prophylaxie urinaire néonatale, pneumocystose",
        notes: "Dose en composante TMP: 4 mg/kg/dose q12h (traitement); prophylaxie urinaire néonatale: 2 mg/kg/jour DIE. Après 2 semaines de vie. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Cefuroxime",
        class: "Antibiotique (Céphalosporine 2G)",
        recommendedDoseMgPerKg: 50,
        maxDoseMg: 1500,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Infections respiratoires, urinaires, osseuses",
        notes: "50 mg/kg/dose IV. Intervalle selon âge postmenstruel. (Source: CHU Ste-Justine)"
    },
    {
        name: "Céfoxitine",
        class: "Antibiotique (Céphamycine)",
        recommendedDoseMgPerKg: 33,
        maxDoseMg: 2000,
        maxDailyDoseMg: 6000,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Infections intra-abdominales, chirurgie",
        notes: "90-100 mg/kg/jour div. q8h. Peu référencé en néonatologie. (Source: CHU Ste-Justine)"
    },

    // ===== ANTIFONGIQUES =====
    {
        name: "Fluconazole",
        class: "Antifongique (Azolé)",
        recommendedDoseMgPerKg: 12,
        maxDoseMg: 400,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV / Orale",
        indications: "Candidose systémique, prophylaxie antifongique néonatale",
        notes: "Traitement: charge 25 mg/kg x1, maintien 6-12 mg/kg/dose q24h (selon âge). Prophylaxie: 3 mg/kg/dose q24-72h. Réduire si IR. (Source: CHU Ste-Justine)"
    },
    {
        name: "Amphotéricine B (Fungizone)",
        class: "Antifongique (Polyène)",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 50,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV",
        indications: "Candidose invasive, infections fongiques systémiques",
        notes: "1 mg/kg/dose q24h IV en 2h. Attention: toujours préciser le TYPE d'amphotéricine B (Fungizone ≠ Ambisome). (Source: CHU Ste-Justine)"
    },
    {
        name: "Amphotéricine B liposomale (Ambisome)",
        class: "Antifongique (Polyène liposomal)",
        recommendedDoseMgPerKg: 5,
        maxDoseMg: 250,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV",
        indications: "Candidose invasive, infections fongiques systémiques",
        notes: "5 mg/kg/dose q24h IV en 2h. Dose 5x supérieure à la Fungizone. (Source: CHU Ste-Justine)"
    },

    // ===== ANTIVIRAUX =====
    {
        name: "Acyclovir",
        class: "Antiviral",
        recommendedDoseMgPerKg: 20,
        maxDoseMg: 800,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV",
        indications: "Herpès néonatal, encéphalite herpétique",
        notes: "20 mg/kg/dose IV en 1h. <32 sem postmenstruel: q12h; ≥32 sem: q8h. Maintenir hydratation suffisante. (Source: CHU Ste-Justine)"
    },

    // ===== ANALGÉSIQUES / SÉDATION =====
    {
        name: "Morphine",
        class: "Analgésique opioïde",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 15,
        frequencyPerDay: 6,
        minIntervalHours: 4,
        route: "IV / Orale / SC",
        indications: "Douleur modérée à sévère, sédation, sevrage néonatal",
        notes: "IV: 0,05-0,1 mg/kg q3-4h. PO: 0,1-0,2 mg/kg q4-6h. Perfusion: 0,01-0,02 mg/kg/h. Dose IV = 1/2 à 1/3 de dose PO. Sevrage progressif. (Source: CHU Ste-Justine)"
    },
    {
        name: "Fentanyl",
        class: "Analgésique opioïde",
        recommendedDoseMgPerKg: 0.002,
        maxDoseMg: 0.1,
        frequencyPerDay: 6,
        minIntervalHours: 2,
        route: "IV / IM / SC",
        indications: "Analgésie, intubation, sédation procédurale",
        notes: "Analgésie: 1-2 mcg/kg IV lent (5 min) q2-3h. Intubation: 3-5 mcg/kg. Perfusion: 0,5-5 mcg/kg/h. Doses en mcg/kg. Sevrage progressif si >5-7 jours. (Source: CHU Ste-Justine)"
    },
    {
        name: "Midazolam",
        class: "Sédatif (Benzodiazépine)",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 5,
        frequencyPerDay: 6,
        minIntervalHours: 2,
        route: "IV / IM / Orale / Rectal",
        indications: "Sédation, agitation sévère, convulsions réfractaires, sédation procédurale",
        notes: "IV/IM: 0,05-0,1 mg/kg q2-4h. PO/IR: 0,2-0,4 mg/kg. Perfusion: 0,01-0,06 mg/kg/h. Convulsions: perfusion 0,06 mg/kg/h, max 0,4 mg/kg/h. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Kétamine",
        class: "Anesthésique dissociatif",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 100,
        frequencyPerDay: 4,
        minIntervalHours: 4,
        route: "IV / IM",
        indications: "Sédation procédurale, analgésie, pansements de brûlures",
        notes: "IV: 1-2 mg/kg lent. IM: 5-8 mg/kg. Toujours avec atropine 0,02 mg/kg. Contre-indiqué si HTIC. Préparer matériel de réanimation. (Source: MSF)"
    },
    {
        name: "Diazépam",
        class: "Antiépileptique / Sédatif (Benzodiazépine)",
        recommendedDoseMgPerKg: 0.3,
        maxDoseMg: 10,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV / Rectal",
        indications: "Convulsions, état de mal épileptique, tétanos, sédation",
        notes: "Convulsions: 0,3-0,5 mg/kg IR ou IV lent. Max 10 mg/dose. Peut être répété x1 après 10 min. Tétanos: perfusion continue possible. (Source: MSF)"
    },
    {
        name: "Lorazépam",
        class: "Antiépileptique / Sédatif (Benzodiazépine)",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 4,
        frequencyPerDay: 3,
        minIntervalHours: 6,
        route: "IV / IM / Orale / Rectal",
        indications: "Convulsions réfractaires, agitation sévère, sédation préprocédurale",
        notes: "Conv.: 0,1 mg/kg IV/IM q5-10min x2 PRN. Sédation: 0,05-0,1 mg/kg PO/IV. Préexamen PO: 45-60 min avant. (Source: CHU Ste-Justine)"
    },

    // ===== ANTIÉPILEPTIQUES =====
    {
        name: "Phénobarbital",
        class: "Antiépileptique (Barbiturique)",
        recommendedDoseMgPerKg: 5,
        maxDoseMg: 200,
        maxDailyDoseMg: 300,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "IV / Orale",
        indications: "Convulsions néonatales, état de mal épileptique",
        notes: "Charge: 20 mg/kg IV en 20 min. Charges additionnelles: 10 mg/kg q20-30min (max 40 mg/kg total). Maintien: 3-5 mg/kg/jour div. q12h. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Phénytoïne",
        class: "Antiépileptique",
        recommendedDoseMgPerKg: 5,
        maxDoseMg: 300,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "IV / Orale",
        indications: "Convulsions réfractaires au phénobarbital, état de mal épileptique",
        notes: "Charge: 15-20 mg/kg IV en 30 min. Maintien: 4-8 mg/kg/jour div. q12h. Absorption PO erratique. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Lévétiracétam",
        class: "Antiépileptique",
        recommendedDoseMgPerKg: 10,
        maxDoseMg: 1500,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "IV / Orale",
        indications: "Convulsions néonatales, épilepsie",
        notes: "Charge: 40 mg/kg x1. Maintien: 10 mg/kg q12h, augmenter à 20 mg/kg q12h après 3 jours si nécessaire. Max 40 mg/kg/dose. (Source: CHU Ste-Justine)"
    },
    {
        name: "Topiramate",
        class: "Antiépileptique",
        recommendedDoseMgPerKg: 3,
        maxDoseMg: 200,
        maxDailyDoseMg: 400,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale",
        indications: "Épilepsie néonatale",
        notes: "Charge: 10 mg/kg x1. Maintien: 3-5 mg/kg/jour div. en 1-2 doses/jour. (Source: CHU Ste-Justine)"
    },

    // ===== CARDIOVASCULAIRES =====
    {
        name: "Adrénaline (Épinéphrine)",
        class: "Catécholamine / Vasopresseur",
        recommendedDoseMgPerKg: 0.01,
        maxDoseMg: 1,
        frequencyPerDay: 6,
        minIntervalHours: 3,
        route: "IV / IO / Nébulisation",
        indications: "Arrêt cardiaque, choc anaphylactique, croup sévère, bronchospasme sévère",
        notes: "Réanimation: 0,01 mg/kg IV/IO (0,1 mL/kg de 1:10000) q3-5min. Anaphylaxie: 0,01 mg/kg IM (1:1000). Nébulisation (croup): 0,5 mg/kg (max 5mg). (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Atropine",
        class: "Anticholinergique",
        recommendedDoseMgPerKg: 0.02,
        maxDoseMg: 0.5,
        frequencyPerDay: 4,
        minIntervalHours: 4,
        route: "IV / IM / SC",
        indications: "Pré-intubation, bradycardie, intoxication organophosphorés",
        notes: "0,02 mg/kg/dose IV. Pré-intubation: 5-10 min avant. Endotrachéal (si pas d'accès IV): 0,04-0,06 mg/kg. (Source: CHU Ste-Justine)"
    },
    {
        name: "Furosémide",
        class: "Diurétique de l'anse",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 40,
        maxDailyDoseMg: 80,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "IV / Orale",
        indications: "Insuffisance cardiaque, œdème, surcharge hydrique",
        notes: "IV: 0,5-1 mg/kg/dose IV lent q12-24h. Perfusion: 0,1-0,4 mg/kg/h. PO: doses ~2x plus élevées que IV pour même effet. (Source: CHU Ste-Justine)"
    },
    {
        name: "Spironolactone",
        class: "Diurétique épargneur de potassium",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 25,
        maxDailyDoseMg: 50,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale",
        indications: "Insuffisance cardiaque, ascite, dysplasie bronchopulmonaire",
        notes: "1 mg/kg/dose PO q12h. Souvent associé au furosémide. (Source: CHU Ste-Justine)"
    },
    {
        name: "Hydrochlorothiazide",
        class: "Diurétique thiazidique",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 25,
        maxDailyDoseMg: 50,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale",
        indications: "Dysplasie bronchopulmonaire, œdème chronique",
        notes: "1 mg/kg/dose PO q12h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Captopril",
        class: "Antihypertenseur (IEC)",
        recommendedDoseMgPerKg: 0.05,
        maxDoseMg: 6.25,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Insuffisance cardiaque, hypertension néonatale",
        notes: "Initiale: 0,01-0,05 mg/kg TID. Éventail: 0,1-1 mg/kg/dose TID. Débuter aux plus faibles doses si prématuré ou <1 sem. Risque d'hypotension. (Source: CHU Ste-Justine)"
    },
    {
        name: "Propranolol",
        class: "Bêta-bloquant",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 40,
        maxDailyDoseMg: 120,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale / IV",
        indications: "Tachyarythmies, Fallot, hémangiomes, hypertension",
        notes: "PO cardio: 1-5 mg/kg/jour div. 3 doses. Hémangiomes: 2,2-3,4 mg/kg/jour div. 2 doses. IV: 0,01-0,15 mg/kg/dose (~10x plus faible que PO). (Source: CHU Ste-Justine)"
    },
    {
        name: "Nifédipine",
        class: "Antihypertenseur (Inhibiteur calcique)",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 10,
        frequencyPerDay: 4,
        minIntervalHours: 4,
        route: "Orale",
        indications: "Hypertension artérielle néonatale",
        notes: "0,05-0,25 mg/kg/dose PO q4-6h PRN. (Source: CHU Ste-Justine)"
    },
    {
        name: "Amlodipine",
        class: "Antihypertenseur (Inhibiteur calcique)",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 5,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale",
        indications: "Hypertension artérielle",
        notes: "Initiale: 0,05 mg/kg q12h. Éventail habituel: 0,1-0,2 mg/kg/dose q12h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Hydralazine",
        class: "Antihypertenseur (Vasodilatateur)",
        recommendedDoseMgPerKg: 0.5,
        maxDoseMg: 20,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Orale / IV",
        indications: "Hypertension artérielle néonatale",
        notes: "PO: 0,25-1 mg/kg q6-8h. IV: 0,1-0,5 mg/kg q6-8h (max 2 mg/kg). Doses IV ~2x plus faibles que PO. (Source: CHU Ste-Justine)"
    },

    // ===== CORTICOÏDES =====
    {
        name: "Dexaméthasone",
        class: "Corticoïde",
        recommendedDoseMgPerKg: 0.15,
        maxDoseMg: 8,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "IV / Orale",
        indications: "Dysplasie bronchopulmonaire, œdème laryngé, croup",
        notes: "DBP protocole DART: 0,15 mg/kg/j x3j, puis décroissance. Œdème pre-extubation: 0,25 mg/kg q8-12h x3 doses. Croup (MSF): 0,6 mg/kg PO x1. (Source: CHU Ste-Justine + MSF)"
    },
    {
        name: "Hydrocortisone",
        class: "Corticoïde",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 100,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "IV / Orale",
        indications: "Hypotension réfractaire, insuffisance surrénalienne, choc surrénalien, DBP",
        notes: "Hypotension: charge 1 mg/kg puis 0,5 mg/kg q6-12h. Choc surrénalien: charge 2 mg/kg puis 1 mg/kg q6h. Dose physio: 1 mg/kg/jour div. 2 doses. Stress: 2-3x la dose. (Source: CHU Ste-Justine)"
    },
    {
        name: "Prednisolone",
        class: "Corticoïde",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 60,
        maxDailyDoseMg: 60,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "Orale",
        indications: "Asthme aigu, croup, syndrome néphrotique, wheezing récurrent",
        notes: "Asthme aigu/croup: 1-2 mg/kg/jour x3-5 jours. Si dexaméthasone non disponible. (Source: MSF)"
    },

    // ===== ANTIPALUDÉENS (MSF) =====
    {
        name: "Artéméther-Luméfantrine (ACT)",
        class: "Antipaludéen",
        recommendedDoseMgPerKg: 2,
        maxDoseMg: 80,
        frequencyPerDay: 2,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Paludisme simple à P. falciparum",
        notes: "5-14 kg: 1cp (20/120mg) x2/j x3j. 15-24kg: 2cp x2/j x3j. 25-34kg: 3cp x2/j x3j. Donner avec aliment gras. 6 doses totales sur 3 jours (H0, H8, H24, H36, H48, H60). (Source: MSF)"
    },
    {
        name: "Artésunate",
        class: "Antipaludéen",
        recommendedDoseMgPerKg: 2.4,
        maxDoseMg: 120,
        frequencyPerDay: 1,
        minIntervalHours: 12,
        route: "IV / IM",
        indications: "Paludisme grave, paludisme avec vomissements",
        notes: "2,4 mg/kg IV/IM à H0, H12, H24, puis q24h. Minimum 24h de traitement IV avant relais PO par ACT. Artésunate rectal 10 mg/kg si accès IV impossible. (Source: MSF)"
    },
    {
        name: "Quinine",
        class: "Antipaludéen",
        recommendedDoseMgPerKg: 10,
        maxDoseMg: 600,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV / Orale",
        indications: "Paludisme grave (si artésunate non disponible)",
        notes: "Charge: 20 mg/kg (sel) en 4h. Maintien: 10 mg/kg q8h. Perfusion en D10% ou NaCl 0,9%. Surveiller glycémie (risque hypoglycémie). (Source: MSF)"
    },

    // ===== GASTRO-ENTÉROLOGIE =====
    {
        name: "Ondansétron",
        class: "Antiémétique (Anti-5HT3)",
        recommendedDoseMgPerKg: 0.15,
        maxDoseMg: 4,
        maxDailyDoseMg: 16,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV / Orale",
        indications: "Nausées, vomissements",
        notes: "0,15 mg/kg/dose IV ou PO q8h. Utile pour permettre la réhydratation orale. (Source: MSF)"
    },
    {
        name: "Oméprazole",
        class: "Inhibiteur de la pompe à protons",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 20,
        maxDailyDoseMg: 40,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "Orale / IV",
        indications: "Reflux gastro-œsophagien, ulcère gastrique, œsophagite",
        notes: "0,5-1,5 mg/kg/jour en 1-2 doses. (Source: MSF)"
    },
    {
        name: "Ranitidine",
        class: "Anti-H2",
        recommendedDoseMgPerKg: 2,
        maxDoseMg: 150,
        maxDailyDoseMg: 300,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale / IV",
        indications: "Saignements gastriques, reflux gastro-œsophagien",
        notes: "PO: 2 mg/kg q12h (q8h si réponse incomplète). IV prématuré: 1,5 mg/kg q12h. IV à terme: 1,5 mg/kg q8h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Lansoprazole",
        class: "Inhibiteur de la pompe à protons",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 30,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "Orale",
        indications: "Reflux gastro-œsophagien néonatal",
        notes: "0,5-1,5 mg/kg/jour en 1-2 doses. Doses plus faibles si <10 sem. Prescrire en multiples de 3,75 mg. (Source: CHU Ste-Justine)"
    },
    {
        name: "Métoclopramide",
        class: "Prokinétique / Antiémétique",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 10,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Orale / IV",
        indications: "Reflux gastro-œsophagien, nausées",
        notes: "0,1 mg/kg/dose PO ou IV q6-8h. Risque de syndrome extrapyramidal. (Source: CHU Ste-Justine)"
    },
    {
        name: "Dompéridone",
        class: "Prokinétique",
        recommendedDoseMgPerKg: 0.25,
        maxDoseMg: 10,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Reflux gastro-œsophagien",
        notes: "0,25 mg/kg/dose PO TID. (Source: CHU Ste-Justine)"
    },

    // ===== MISCELLANEOUS =====
    {
        name: "Naloxone",
        class: "Antagoniste opioïde",
        recommendedDoseMgPerKg: 0.01,
        maxDoseMg: 2,
        frequencyPerDay: 6,
        minIntervalHours: 2,
        route: "IV / IM / SC",
        indications: "Intoxication aux opiacés, dépression respiratoire post-opioïde",
        notes: "Renversement complet (surdosage): 0,1 mg/kg IV q2-3min PRN. Renversement partiel (dépression respi.): 0,01 mg/kg IV q2-3min PRN. (Source: CHU Ste-Justine)"
    },
    {
        name: "Flumazénil",
        class: "Antagoniste benzodiazépine",
        recommendedDoseMgPerKg: 0.01,
        maxDoseMg: 0.2,
        frequencyPerDay: 5,
        minIntervalHours: 1,
        route: "IV",
        indications: "Intoxication aux benzodiazépines",
        notes: "0,01 mg/kg IV direct rapide q1min PRN. Max 5 doses. (Source: CHU Ste-Justine)"
    },
    {
        name: "Vitamine K (Phytonadione)",
        class: "Vitamine",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 10,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IM / IV / Orale",
        indications: "Prévention maladie hémorragique du nouveau-né, hémorragies",
        notes: "<28 sem: 0,5 mg IV à la naissance. ≥28 sem: 1 mg IM. PO (si IM refusé): 2 mg x3 doses (naissance, 2-4 sem, 6-8 sem). Hémorragie: 1-2 mg IV. (Source: CHU Ste-Justine)"
    },
    {
        name: "Fer (sulfate ferreux)",
        class: "Supplément",
        recommendedDoseMgPerKg: 4,
        maxDoseMg: 60,
        maxDailyDoseMg: 60,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "Orale",
        indications: "Prévention anémie du prématuré, anémie ferriprive",
        notes: "<30 sem ou <1,5 kg ou RCIU: 4 mg/kg/jour dès 2 semaines. 1,5-2 kg: 2-4 mg/kg/jour au congé. (Source: CHU Ste-Justine)"
    },
    {
        name: "Caféine (citrate)",
        class: "Méthylxanthine",
        recommendedDoseMgPerKg: 5,
        maxDoseMg: 200,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV / Orale",
        indications: "Apnée du prématuré",
        notes: "Charge: 10 mg/kg (caféine base). Maintien: 5 mg/kg/jour q24h, 12-24h après charge. 10 mg citrate = 5 mg base. Doses plus élevées chez bébés plus âgés. (Source: CHU Ste-Justine)"
    },
    {
        name: "Succinylcholine",
        class: "Curare dépolarisant",
        recommendedDoseMgPerKg: 2,
        maxDoseMg: 150,
        frequencyPerDay: 1,
        route: "IV / IM",
        indications: "Intubation en séquence rapide",
        notes: "2 mg/kg IV direct rapide juste avant intubation. Utilisé dans la combinaison intubation néonatale: atropine + fentanyl + succinylcholine. (Source: CHU Ste-Justine)"
    },
    {
        name: "Rocuronium",
        class: "Curare non dépolarisant",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 100,
        frequencyPerDay: 2,
        minIntervalHours: 0.5,
        route: "IV / IM",
        indications: "Intubation, curarisation chirurgicale",
        notes: "1 mg/kg IV/IM q30-60min PRN. Perfusion: 0,2-1 mg/kg/h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Gluconate de calcium 10%",
        class: "Électrolyte",
        recommendedDoseMgPerKg: 100,
        maxDoseMg: 2000,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "IV / Orale",
        indications: "Hypocalcémie, réanimation",
        notes: "Hypo symptomatique: 100-200 mg/kg en 10-30 min (voie centrale). Réanimation: 60 mg/kg en 5-10 min. Entretien PO: 20-60 mg Ca élémentaire/kg/jour div. q6-8h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Albumine humaine",
        class: "Soluté de remplissage",
        recommendedDoseMgPerKg: 1000,
        maxDoseMg: 25000,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV",
        indications: "Hypovolémie, hypoalbuminémie",
        notes: "0,5-1 g/kg. Solution 5%: 10-20 mL/kg en 30-60 min. Solution 25%: 2-4 mL/kg en 1-2h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Énoxaparine",
        class: "Anticoagulant (HBPM)",
        recommendedDoseMgPerKg: 1.7,
        maxDoseMg: 80,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "SC",
        indications: "Thrombose veineuse, embolie pulmonaire",
        notes: "Traitement <37 sem: 2 mg/kg q12h SC. ≥37 sem: 1,7 mg/kg q12h SC. Prophylaxie: 0,85-1 mg/kg q12h. Surveillance anti-Xa requise. (Source: CHU Ste-Justine)"
    },
    {
        name: "Acétylcystéine (NAC)",
        class: "Mucolytique / Antidote",
        recommendedDoseMgPerKg: 150,
        maxDoseMg: 10000,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Nébulisation / Orale / Rectal",
        indications: "Mucoviscidose, intoxication au paracétamol, bouchon méconial",
        notes: "Nébulisation: 1 mL sol. 20% q6-8h dilué dans 3 mL NaCl. PO: sol. diluée à 5-10%, 1-5 mL x1-4/j. Lavement: 5-10 mL/kg IR. Prémédication salbutamol. (Source: CHU Ste-Justine)"
    },
    {
        name: "Adénosine",
        class: "Antiarythmique",
        recommendedDoseMgPerKg: 0.1,
        maxDoseMg: 12,
        frequencyPerDay: 3,
        minIntervalHours: 2,
        route: "IV",
        indications: "Tachycardie supraventriculaire",
        notes: "0,05-0,1 mg/kg IV direct rapide. Augmenter de 0,05-0,1 mg/kg/dose q2min PRN. Max 0,3 mg/kg/dose. Flush NaCl immédiat. (Source: CHU Ste-Justine)"
    },
    {
        name: "Sildénafil",
        class: "Inhibiteur PDE5",
        recommendedDoseMgPerKg: 0.5,
        maxDoseMg: 20,
        maxDailyDoseMg: 80,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Orale / IV",
        indications: "Hypertension artérielle pulmonaire néonatale",
        notes: "PO: initiale 1 mg/kg/jour div. 4 doses, augmenter de 1 mg/kg/jour q48-72h. Max 4-8 mg/kg/jour. IV: 0,03-0,067 mg/kg/h en perfusion continue. (Source: CHU Ste-Justine)"
    },
    {
        name: "Bosentan",
        class: "Antagoniste des récepteurs de l'endothéline",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 62.5,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale",
        indications: "Hypertension artérielle pulmonaire",
        notes: "Initiale: 1 mg/kg PO q12h. Après 1 mois: 2 mg/kg q12h si toléré. Prescrire en multiples de 2,5 mg. (Source: CHU Ste-Justine)"
    },
    {
        name: "Sotalol",
        class: "Antiarythmique / Bêta-bloquant",
        recommendedDoseMgPerKg: 2,
        maxDoseMg: 160,
        maxDailyDoseMg: 320,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Tachyarythmies supraventriculaires et ventriculaires",
        notes: "Initiale: 2 mg/kg/jour div. 2-3 doses. Aug. de 1-2 mg/kg/jour q2-3 jours. Éventail: 2-8 mg/kg/jour. Schémas agressifs = risque toxicité. (Source: CHU Ste-Justine)"
    },
    {
        name: "Digoxine",
        class: "Inotrope / Antiarythmique",
        recommendedDoseMgPerKg: 0.005,
        maxDoseMg: 0.25,
        frequencyPerDay: 2,
        minIntervalHours: 12,
        route: "Orale / IV",
        indications: "Insuffisance cardiaque, tachyarythmies supraventriculaires",
        notes: "PO charge NNé terme: 30 mcg/kg div. 3 doses sur 24h (50%-25%-25%). Maintien: 8-10 mcg/kg/jour div. 2 doses. Dose IV = 2/3-3/4 de PO. Attention unités mcg! (Source: CHU Ste-Justine)"
    },
    {
        name: "Nystatine",
        class: "Antifongique (topique/local)",
        recommendedDoseMgPerKg: 0,
        maxDoseMg: 0,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Orale (badigeonnage) / Topique",
        indications: "Candidose buccale (muguet), candidose cutanée",
        notes: "0,5-1 mL en badigeonnage buccal QID. Application topique QID. Pas de dose mg/kg (dose fixe volumétrique). (Source: CHU Ste-Justine)"
    },
    {
        name: "Ursodiol (Acide ursodéoxycholique)",
        class: "Hépatoprotecteur",
        recommendedDoseMgPerKg: 10,
        maxDoseMg: 300,
        maxDailyDoseMg: 900,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Cholestase néonatale, ictère cholestatique",
        notes: "10 mg/kg/dose PO TID. (Source: CHU Ste-Justine)"
    },
    {
        name: "Oxybutynine",
        class: "Antispasmodique urinaire",
        recommendedDoseMgPerKg: 0.15,
        maxDoseMg: 5,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Vessie neurogène, instabilité vésicale",
        notes: "0,1-0,2 mg/kg/dose PO q8-12h. Doses élevées réservées aux enfants à terme. (Source: CHU Ste-Justine)"
    },
    {
        name: "Diazoxide",
        class: "Antihypoglycémiant",
        recommendedDoseMgPerKg: 5,
        maxDoseMg: 150,
        maxDailyDoseMg: 450,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "Orale",
        indications: "Hyperinsulinisme congénital, hypoglycémie hyperinsulinique",
        notes: "5-15 mg/kg/jour PO div. 3 doses q8h. (Source: CHU Ste-Justine)"
    },
    {
        name: "Glucagon",
        class: "Hormone hyperglycémiante",
        recommendedDoseMgPerKg: 0.03,
        maxDoseMg: 1,
        frequencyPerDay: 6,
        minIntervalHours: 1,
        route: "IV / SC / IM",
        indications: "Hypoglycémie sévère réfractaire, surdosage bêta-bloquants",
        notes: "Hypoglycémie: 0,03 mg/kg IV q1-4h PRN. Surdosage bêta-bloquants: 0,15 mg/kg IV q30min PRN. (Source: CHU Ste-Justine)"
    },
    {
        name: "Pantoprazole",
        class: "Inhibiteur de la pompe à protons",
        recommendedDoseMgPerKg: 1,
        maxDoseMg: 40,
        frequencyPerDay: 1,
        minIntervalHours: 24,
        route: "IV",
        indications: "Hémorragie digestive, ulcère gastrique",
        notes: "1-2 mg/kg/jour IV div. 1-2 doses. Perfusion continue: 0,2 mg/kg/h ± charge 2 mg/kg IV. (Source: CHU Ste-Justine)"
    },
    {
        name: "Clonidine",
        class: "Alpha-2 agoniste",
        recommendedDoseMgPerKg: 0.001,
        maxDoseMg: 0.1,
        maxDailyDoseMg: 0.3,
        frequencyPerDay: 4,
        minIntervalHours: 6,
        route: "Orale",
        indications: "Sevrage néonatal (NAS), sédation adjuvante, hypertension",
        notes: "Initiales <35 sem: 2 mcg/kg/jour div. 3-4 doses. ≥35 sem: 5 mcg/kg/jour div. 4 doses. Augmenter de 1 mcg/kg/jour. Max 12 mcg/kg/jour. Sevrage sur 7-14j. Doses en mcg! (Source: CHU Ste-Justine)"
    },
    {
        name: "Acétazolamide",
        class: "Inhibiteur de l'anhydrase carbonique",
        recommendedDoseMgPerKg: 5,
        maxDoseMg: 250,
        frequencyPerDay: 3,
        minIntervalHours: 8,
        route: "IV / Orale",
        indications: "Hydrocéphalie, glaucome, alcalose métabolique",
        notes: "5 mg/kg/dose PO ou IV q8-12h PRN. (Source: CHU Ste-Justine)"
    }
];

const outputPath = path.join('D:/DOSEA/public/data', 'drugs.json');
fs.writeFileSync(outputPath, JSON.stringify(drugs, null, 2), 'utf-8');
console.log(`✅ Written ${drugs.length} drugs to ${outputPath}`);

// Also copy to dist
const distPath = path.join('D:/DOSEA/dist/data', 'drugs.json');
if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, JSON.stringify(drugs, null, 2), 'utf-8');
    console.log(`✅ Also written to ${distPath}`);
}
