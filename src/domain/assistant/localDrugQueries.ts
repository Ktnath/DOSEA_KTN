/**
 * Recherche locale et deterministe de medicaments dans la base validee V2,
 * utilisee par l'assistant clinique pour repondre aux questions de recherche
 * ("Quels antipaludeens sont renseignes ?", "Cherche artesunate", ...) sans
 * appeler d'IA externe. Ne calcule, n'invente et ne modifie aucune dose : ce
 * module se limite a filtrer les medicaments deja presents dans
 * `dosing_rules_v2.validated.json`.
 */

import dosingRulesV2Raw from '@/data/dosingRulesV2/dosing_rules_v2.validated.json';

const ASSISTANT_DOSE_DISCLAIMER =
    "Pour le calcul de dose, utilisez le calculateur sécurisé. L'assistant ne calcule pas les doses.";

interface LocalDrugRecord {
    name: string;
    class: string;
    searchableText: string;
    nameKey: string;
    aliasKeys: string[];
}

interface KeywordGroup {
    /** Libelle pluriel affiche dans la reponse (ex: "antipaludéens"). */
    label: string;
    /** Sous-chaines normalisees (sans accent, minuscules) recherchees dans classe/sous-classe/systeme/indications. */
    terms: string[];
}

const KEYWORD_GROUPS: KeywordGroup[] = [
    { label: 'antipaludéens', terms: ['antipaludeen'] },
    { label: 'antibiotiques', terms: ['antibiotique'] },
    { label: 'antalgiques', terms: ['antalgique', 'antipyretique'] },
    { label: 'anticonvulsivants', terms: ['antiepileptique', 'anticonvulsivant', 'convulsion'] },
    { label: 'bronchodilatateurs', terms: ['bronchodilatateur'] },
    { label: 'corticoïdes', terms: ['corticoide', 'corticosteroide'] },
    { label: 'antifongiques', terms: ['antifongique'] },
    { label: 'antidotes', terms: ['antidote'] },
    { label: 'médicaments cardiovasculaires', terms: ['cardiovasculaire'] },
    { label: 'médicaments digestifs', terms: ['digestif', 'gastro'] },
    { label: 'médicaments respiratoires', terms: ['respiratoire'] },
    { label: 'anticoagulants', terms: ['anticoagulant'] },
    { label: 'antiviraux', terms: ['antiviral'] },
    { label: 'antiémétiques', terms: ['antiemetique'] },
    { label: 'sédatifs', terms: ['sedatif'] },
    { label: 'diurétiques', terms: ['diuretique'] },
    { label: 'vitamines', terms: ['vitamine'] },
];

const SEARCH_INTENT_PATTERN =
    /\b(quel|quels|quelle|quelles|liste|listes|lister|cherche|recherche|recherc\w*|trouve\w*|disponible\w*|renseign\w*|existe\w*|base)\b/i;

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
}

function normalizeKey(text: string): string {
    return normalize(text)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

const LOCAL_DRUGS: LocalDrugRecord[] = dosingRulesV2Raw.rules.map((rule) => {
    const { name, class: drugClass, subclass, clinical_system, aliases } = rule.drug;
    const indications = rule.clinical_context?.indications ?? [];
    const searchableText = normalize(
        [drugClass, subclass, clinical_system, ...indications].join(' '),
    );

    return {
        name,
        class: drugClass,
        searchableText,
        nameKey: normalizeKey(name),
        aliasKeys: (aliases ?? []).map(normalizeKey),
    };
});

function matchGroup(message: string): KeywordGroup | undefined {
    return KEYWORD_GROUPS.find((group) => group.terms.some((term) => message.includes(term)));
}

function findDrugMatches(messageKey: string): LocalDrugRecord[] {
    return LOCAL_DRUGS.filter((drug) => {
        const keys = [drug.nameKey, ...drug.aliasKeys].filter((key) => key.length >= 4);
        return keys.some((key) => messageKey.includes(key));
    });
}

/**
 * Detecte une question de recherche dans la base locale (par nom, classe,
 * sous-classe, systeme clinique ou indication), sans rapport avec un calcul
 * de dose. Doit etre verifie apres `detectDoseRequest` : une demande de dose
 * prend toujours la priorite sur une recherche de medicament.
 */
export function detectLocalDrugQuery(message: string): boolean {
    const normalized = normalize(message);
    if (!SEARCH_INTENT_PATTERN.test(normalized)) {
        return false;
    }

    if (matchGroup(normalized)) {
        return true;
    }

    const messageKey = normalizeKey(message);
    return findDrugMatches(messageKey).length > 0;
}

/**
 * Repond a une question de recherche a partir de la base validee V2
 * uniquement (aucun appel IA). Ne renvoie jamais de dose, de plafond ni de
 * frequence : uniquement des noms et classes de medicaments deja presents
 * dans la base.
 */
export function answerLocalDrugQuery(message: string): string {
    const normalized = normalize(message);
    const group = matchGroup(normalized);

    if (group) {
        const names = LOCAL_DRUGS.filter((drug) => drug.searchableText.includes(
            group.terms.find((term) => normalized.includes(term)) ?? '',
        ))
            .map((drug) => drug.name)
            .sort((a, b) => a.localeCompare(b, 'fr'));

        if (names.length === 0) {
            return `Aucun médicament de la classe "${group.label}" n'a été trouvé dans la base validée V2.\n\n${ASSISTANT_DOSE_DISCLAIMER}`;
        }

        const list = names.map((name) => `- ${name}`).join('\n');
        return `Les ${group.label} renseignés dans la base validée V2 sont :\n${list}\n\n${ASSISTANT_DOSE_DISCLAIMER}`;
    }

    const messageKey = normalizeKey(message);
    const matches = findDrugMatches(messageKey);

    if (matches.length > 0) {
        const list = matches.map((drug) => `- ${drug.name} (${drug.class})`).join('\n');
        return `Résultat de recherche dans la base validée V2 :\n${list}\n\n${ASSISTANT_DOSE_DISCLAIMER}`;
    }

    return `Aucun médicament correspondant n'a été trouvé dans la base validée V2.\n\n${ASSISTANT_DOSE_DISCLAIMER}`;
}
