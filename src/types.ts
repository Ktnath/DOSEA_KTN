
export interface DilutionInfo {
    fluid: string;
    standardConcentrationMgPerMl?: number;
    bolusTimeMinutes?: number;
    continuousInfusion?: boolean;
}

export interface Drug {
    id?: number;
    name: string;
    class: string;
    subClass?: string; // e.g. "Aminoside" when class is "Antibiotique"
    system?: string; // Biological System e.g., "Cardiovasculaire"
    dilution?: DilutionInfo; // Info for IV flow calculation
    recommendedDoseMgPerKg: number;
    maxDoseMg: number; // Maximum per single dose
    maxDailyDoseMg?: number; // Total maximum per 24h
    frequencyPerDay?: number; // Recommended frequency (e.g., 3 for TID)
    minIntervalHours?: number; // Minimum time between doses
    route: string;
    indications?: string;
    notes?: string;
    concentrationMgPerMl?: number; // Essential for liquid forms
}

export interface ProtocolDrug {
    drugName: string;
    indicationOverride?: string;
}

export interface Protocol {
    id: string; // e.g., "p-paludisme-grave"
    name: string;
    description: string;
    source: string;
    drugs: ProtocolDrug[];
    // Champs optionnels pour le mode "Urgence pédiatrique" (étapes actionnables).
    signs?: string[]; // Signes / situation cliniques évoquant le protocole
    alerts?: string[]; // Points de vigilance / alertes de sécurité
    isEmergencyProtocol?: boolean; // Affiché dans le mode Urgence pédiatrique
}

export interface PrescriptionAlertRecord {
    severity: 'info' | 'warning' | 'danger' | 'blocker';
    code: string;
    message: string;
}

export interface Prescription {
    id?: number;
    drugId: number | string;
    drugName: string;
    /** Moteur de dose ayant produit ce calcul. Absent (legacy) ou 'v1' = moteur historique (drugs.json) ; 'v2' = moteur déterministe dosingRulesV2 (base validée Dr KAPTO). */
    engineVersion?: 'v1' | 'v2';
    /** Identifiant patient anonymisé, facultatif. Jamais un nom. */
    patientId?: string;
    patientWeightKg: number;
    patientAgeYears: number;
    indication?: string;
    calculatedDoseMg: number;
    calculatedVolumeMl?: number; // If concentration was available
    concentrationMgPerMl?: number; // Concentration utilisée pour le calcul du volume
    alerts?: PrescriptionAlertRecord[]; // Alertes cliniques générées au moment du calcul
    source?: string; // Source / règle clinique ayant justifié la posologie (notes du médicament)
    explanationFormula?: string; // Formule littérale utilisée par le moteur de dose
    explanationSummary?: string; // Résumé en langage clair du calcul
    date: string;
}

export interface UserProfile {
    name?: string;
    specialty?: string;
    unitPreference?: 'mg' | 'ml';
    subscriptionPlan?: 'Free' | 'Pro';
    hasAcceptedDisclaimer?: boolean;
}
