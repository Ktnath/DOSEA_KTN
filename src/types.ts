
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

export interface Prescription {
    id?: number;
    drugId: number;
    drugName: string;
    patientWeightKg: number;
    patientAgeYears: number;
    calculatedDoseMg: number;
    calculatedVolumeMl?: number; // If concentration was available
    date: string;
}

export interface UserProfile {
    name?: string;
    specialty?: string;
    unitPreference?: 'mg' | 'ml';
    subscriptionPlan?: 'Free' | 'Pro';
    hasAcceptedDisclaimer?: boolean;
}
