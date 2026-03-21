const fs = require('fs');
const path = require('path');

// 1. Read existing drugs
const drugsPath = path.join('D:/DOSEA/public/data', 'drugs.json');
let drugs;
try {
    drugs = JSON.parse(fs.readFileSync(drugsPath, 'utf-8'));
} catch (e) {
    console.error("Failed to read drugs.json", e);
    process.exit(1);
}

// 2. Add 'system' and 'dilution' where appropriate
// We'll categorize based on 'class' or 'name' string matching
const updateDrug = (d) => {
    let system = "Autre";
    let className = (d.class || "").toLowerCase();
    const name = (d.name || "").toLowerCase();

    // Extract subClass
    if (d.class && d.class.includes('(') && d.class.includes(')')) {
        const match = d.class.match(/^(.*?)\s*\((.*?)\)$/);
        if (match) {
            d.class = match[1].trim(); // Clean base class
            d.subClass = match[2].trim(); // Specific sub class
            className = d.class.toLowerCase();
        }
    }

    // Categorization Logic for Systems
    if (className.includes("antibiotique") || className.includes("antiviral") || className.includes("antifongique") || className.includes("antipaludéen") || className.includes("antiparasitaire")) {
        system = "Infectiologie";
        // Clean up the prefix if it's too long, optional, but we keep the original class for the sub-hierarchy
    } else if (className.includes("antalgique") || className.includes("ains") || name.includes("paracétamol") || name.includes("ibuprofène") || className.includes("antipyrétique")) {
        system = "Antalgie / Antipyrétique";
    } else if (className.includes("anesthésique") || className.includes("sédatif") || className.includes("opioïde") || className.includes("antiépileptique") || className.includes("neuroleptique")) {
        system = "Neurologie / Sédation";
    } else if (className.includes("bronchodilatateur") || className.includes("mucolytique") || name.includes("caféine") || className.includes("corticoïde inhalé")) {
        system = "Respiratoire";
    } else if (className.includes("catécholamine") || className.includes("antihypertenseur") || className.includes("diurétique") || className.includes("antiarythmique") || className.includes("bêta-bloquant") || className.includes("inotrope") || className.includes("vasopresseur")) {
        system = "Cardiovasculaire";
    } else if (className.includes("corticoïde") || name.includes("glucagon") || name.includes("diazoxide") || className.includes("insuline") || className.includes("hormone")) {
        system = "Endocrinologie";
    } else if (className.includes("antiémétique") || className.includes("inhibiteur de la pompe") || className.includes("anti-h2") || className.includes("prokinétique") || className.includes("hépatoprotecteur") || className.includes("laxatif") || className.includes("antispasmodique")) {
        system = "Gastro-entérologie";
    } else if (className.includes("curare") || className.includes("myorelaxant")) {
        system = "Sédation / Anesthésie";
    } else if (className.includes("électrolyte") || className.includes("vitamine") || className.includes("supplément") || className.includes("soluté") || className.includes("oligo-élément")) {
        system = "Métabolisme / Nutrition";
    } else if (className.includes("antagoniste") || className.includes("antidote") || className.includes("chélateur")) {
        system = "Toxicologie / Antidote";
    } else if (className.includes("anticoagulant") || className.includes("hémostatique") || className.includes("antiagrégant")) {
        system = "Hématologie";
    } else if (className.includes("vaccin") || className.includes("immunoglobuline")) {
        system = "Immunologie / Vaccinologie";
    }

    d.system = system;

    // Dilution Logic (Mocking some common ones based on HUG/MSF guidelines for the MVP)
    if (d.route.includes("IV")) {
        if (name.includes("adrénaline")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", standardConcentrationMgPerMl: 0.1, continuousInfusion: false }; // Often diluted to 1:10000 (0.1mg/ml)
        } else if (name.includes("gentamicine")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", bolusTimeMinutes: 30, continuousInfusion: false };
        } else if (name.includes("vancomycine")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", standardConcentrationMgPerMl: 5, bolusTimeMinutes: 60, continuousInfusion: false }; // Max 5mg/ml, over 60min
        } else if (name.includes("fentanyl")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", standardConcentrationMgPerMl: 0.05, continuousInfusion: true }; // 50 mcg/ml is 0.05 mg/ml
        } else if (name.includes("midazolam")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", standardConcentrationMgPerMl: 1, continuousInfusion: true };
        } else if (name.includes("kétamine")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", standardConcentrationMgPerMl: 10, continuousInfusion: true };
        } else if (name.includes("amphotéricine")) {
            d.dilution = { fluid: "G5% (Strict)", bolusTimeMinutes: 120, continuousInfusion: false }; // Fungizone incompatible avec NaCl
        } else if (name.includes("phénytoïne")) {
            d.dilution = { fluid: "NaCl 0.9% (Strict)", standardConcentrationMgPerMl: 5, bolusTimeMinutes: 30, continuousInfusion: false }; // Incompatible avec G5
        } else if (name.includes("artésunate")) {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", standardConcentrationMgPerMl: 10, bolusTimeMinutes: 5, continuousInfusion: false }; // MSF recommendation
        } else {
            d.dilution = { fluid: "NaCl 0.9% ou G5%", continuousInfusion: false }; // Default generic for IV
        }
    }

    return d;
};

const updatedDrugs = drugs.map(updateDrug);

// Write back
fs.writeFileSync(drugsPath, JSON.stringify(updatedDrugs, null, 2));

const distDrugsPath = path.join('D:/DOSEA/dist/data', 'drugs.json');
if (fs.existsSync(path.dirname(distDrugsPath))) {
    fs.writeFileSync(distDrugsPath, JSON.stringify(updatedDrugs, null, 2));
}
console.log(`✅ Updated ${updatedDrugs.length} drugs with system and dilution data.`);


// 3. Create protocols.json
const protocols = [
    {
        id: "p-paludisme-grave",
        name: "Paludisme Grave (MSF)",
        description: "Prise en charge du paludisme sévère avec signes de danger ou vomissements incoercibles.",
        source: "Guide MSF Pédiatrie",
        drugs: [
            { drugName: "Artésunate", indicationOverride: "IV lente à H0, H12, H24" },
            { drugName: "Paracétamol", indicationOverride: "Fièvre > 38.5°C" },
            { drugName: "Diazépam", indicationOverride: "Si convulsions" }
        ]
    },
    {
        id: "p-sepsis-neo",
        name: "Sepsis Néonatal Précoce",
        description: "Antibiothérapie probabiliste 1ère ligne pour infection maternelle ou signes de sepsis chez le nouveau-né.",
        source: "CHU Sainte-Justine",
        drugs: [
            { drugName: "Ampicilline", indicationOverride: "Couverture Listeria / Strepto B" },
            { drugName: "Gentamicine", indicationOverride: "Couverture BGN" }
        ]
    },
    {
        id: "p-asthme-aigu",
        name: "Crise d'Asthme Sévère",
        description: "Traitement de la crise d'asthme avec détresse respiratoire.",
        source: "Guide MSF / Urgences",
        drugs: [
            { drugName: "Salbutamol (nébulisation)", indicationOverride: "Répéter toutes les 20 min si besoin" },
            { drugName: "Prednisolone", indicationOverride: "Corticothérapie systémique (PO)" }
        ]
    },
    {
        id: "p-choc-anaphylactique",
        name: "Choc Anaphylactique",
        description: "Urgence vitale absolue - Allergie sévère avec atteinte respiratoire ou hémodynamique.",
        source: "Recommandations Internationales",
        drugs: [
            { drugName: "Adrénaline (Épinéphrine)", indicationOverride: "IM stricte (face antérolatérale cuisse)" },
            { drugName: "Salbutamol (nébulisation)", indicationOverride: "Si bronchospasme persistant" },
            { drugName: "Hydrocortisone", indicationOverride: "Prévention phase biphasique (IV)" }
        ]
    }
];

const protocolsPath = path.join('D:/DOSEA/public/data', 'protocols.json');
fs.writeFileSync(protocolsPath, JSON.stringify(protocols, null, 2));

const distProtocolsPath = path.join('D:/DOSEA/dist/data', 'protocols.json');
if (fs.existsSync(path.dirname(distProtocolsPath))) {
    fs.writeFileSync(distProtocolsPath, JSON.stringify(protocols, null, 2));
}
console.log(`✅ Created protocols.json with ${protocols.length} protocols.`);

