/** Normalisation des noms de médicaments pour la recherche par nom ou alias (module pur, sans dépendance UI). */

const COMBINING_DIACRITICS = /[̀-ͯ]/g;

/**
 * Normalise un nom de médicament pour la recherche : minuscules, accents
 * retirés, apostrophes normalisées, parenthèses et leur contenu retirés,
 * espaces multiples réduits.
 */
export function normalizeDrugName(input: string): string {
  return input
    .normalize('NFD')
    .replace(COMBINING_DIACRITICS, '')
    .toLowerCase()
    .replace(/['’`]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
