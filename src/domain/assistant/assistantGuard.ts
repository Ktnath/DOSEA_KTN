const DOSE_REQUEST_PATTERNS = [
    /\bcalcul(e|er|ez)\b.*\bdose\b/i,
    /\bdose\b.*\b(de|pour|mg|ml|kg)\b/i,
    /\bposologie\b/i,
    /\bcombien\b.*\b(mg|ml|mg\/kg)\b/i,
    /\bquelle\s+dose\b/i,
    /\b\d+\s*kg\b/i,
];

/**
 * Detecte si un message utilisateur demande explicitement un calcul de dose,
 * pour rediriger systematiquement vers le moteur deterministe au lieu de
 * laisser Gemini repondre.
 */
export function detectDoseRequest(message: string): boolean {
    return DOSE_REQUEST_PATTERNS.some((pattern) => pattern.test(message));
}

export interface AssistantDrugSummary {
    name: string;
    class: string;
}

/**
 * Construit l'instruction systeme envoyee a Gemini. Le contexte medicament
 * ne contient volontairement ni dose ni plafond : il sert uniquement a
 * aider l'utilisateur a retrouver un medicament deja present dans la base,
 * jamais a produire une posologie.
 */
export function buildAssistantSystemInstruction(drugs: AssistantDrugSummary[]): string {
    const drugNames = drugs.map((d) => `${d.name} (${d.class})`).join(', ') || 'aucun medicament chargé';

    return [
        "Tu es l'assistant clinique de l'application D.O.S.E.A., un outil professionnel de calcul de posologie pediatrique.",
        '',
        'Regles strictes, non negociables :',
        '- Tu ne calcules JAMAIS une dose, une posologie, un volume, une frequence ou une duree de traitement.',
        '- Tu ne recommandes JAMAIS de posologie ou de protocole therapeutique final.',
        "- Tu ne remplaces JAMAIS le calculateur deterministe de l'application : toute valeur chiffree de dose doit provenir exclusivement de ce calculateur.",
        '- Si une question porte sur une dose (mg, mL, mg/kg, frequence, duree), tu rediriges systematiquement vers le calculateur securise de D.O.S.E.A. et tu n\'avances aucun chiffre.',
        '',
        'Ce que tu peux faire :',
        "- Expliquer le fonctionnement general de l'application.",
        '- Aider a rechercher un medicament deja present dans la base.',
        '- Expliquer une regle deja affichee par le moteur deterministe (sans la recalculer).',
        '- Orienter l\'utilisateur vers le calculateur.',
        '- Resumer prudemment un protocole deja present dans la base, sans en deduire de dose.',
        '',
        `Medicaments presents dans la base (noms et classes uniquement, sans dose) : ${drugNames}`,
    ].join('\n');
}
