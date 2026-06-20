import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { AI_UNAVAILABLE_MESSAGE } from '@/domain/assistant/aiUnavailableMessage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assistantSource = readFileSync(path.join(__dirname, 'Assistant.tsx'), 'utf-8');

const FORBIDDEN_PATTERNS = [
    /\.env\.local/i,
    /clé api/i,
    /api key/i,
    /variable d.environnement/i,
    /backend manquant/i,
];

describe("message d'erreur API de l'assistant", () => {
    it('ne mentionne jamais .env.local, une clé API ou un backend manquant', () => {
        for (const pattern of FORBIDDEN_PATTERNS) {
            expect(AI_UNAVAILABLE_MESSAGE).not.toMatch(pattern);
        }
    });

    it('reste un message sûr orientant vers la base validée et le calculateur', () => {
        expect(AI_UNAVAILABLE_MESSAGE).toMatch(/momentanément indisponible/i);
        expect(AI_UNAVAILABLE_MESSAGE).toMatch(/base validée/i);
        expect(AI_UNAVAILABLE_MESSAGE).toMatch(/calculateur sécurisé/i);
    });

    it("ne contient, dans le bloc catch de l'appel IA, aucune chaine interdite visible par l'utilisateur en cas d'erreur API simulée", () => {
        const catchBlockMatch = assistantSource.match(/catch \(error\) \{[\s\S]*?\}\s*finally/);
        expect(catchBlockMatch).not.toBeNull();
        const catchBlock = catchBlockMatch![0];

        for (const pattern of FORBIDDEN_PATTERNS) {
            expect(catchBlock).not.toMatch(pattern);
        }
        expect(catchBlock).toContain('AI_UNAVAILABLE_MESSAGE');
    });

    it('ne journalise les détails techniques que en développement (import.meta.env.DEV)', () => {
        expect(assistantSource).toMatch(/import\.meta\.env\.DEV/);
    });
});
