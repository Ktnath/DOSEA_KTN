/**
 * Message affiché à l'utilisateur lorsque l'IA externe est inaccessible.
 * Ne doit jamais mentionner .env.local, une clé API ou un détail technique :
 * seuls les logs en développement (import.meta.env.DEV) peuvent contenir
 * l'erreur brute.
 */
export const AI_UNAVAILABLE_MESSAGE =
    "L'assistant IA est momentanément indisponible. Vous pouvez continuer à utiliser la base validée V2 et le calculateur sécurisé.";
