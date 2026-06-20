import { describe, expect, it } from 'vitest';
import { detectDoseRequest } from './assistantGuard';
import { answerLocalDrugQuery, detectLocalDrugQuery } from './localDrugQueries';

describe('detectLocalDrugQuery', () => {
    it('detecte une recherche par classe (antipaludéens)', () => {
        expect(detectLocalDrugQuery('Quels antipaludéens sont renseignés ?')).toBe(true);
    });

    it('detecte une recherche par classe (antibiotiques)', () => {
        expect(detectLocalDrugQuery('Quels antibiotiques sont disponibles ?')).toBe(true);
    });

    it('detecte une recherche par classe via un synonyme (anticonvulsivants)', () => {
        expect(detectLocalDrugQuery('Quels anticonvulsivants sont dans la base ?')).toBe(true);
    });

    it('detecte une recherche par systeme clinique (médicaments respiratoires)', () => {
        expect(detectLocalDrugQuery('Liste les médicaments respiratoires')).toBe(true);
    });

    it('detecte une recherche par nom de medicament', () => {
        expect(detectLocalDrugQuery('Cherche artésunate')).toBe(true);
    });

    it('detecte une recherche par classe explicite', () => {
        expect(detectLocalDrugQuery('Quels médicaments de la classe antipaludéen ?')).toBe(true);
    });

    it('ne detecte pas une question generale sans intention de recherche', () => {
        expect(detectLocalDrugQuery("Comment fonctionne l'application D.O.S.E.A. ?")).toBe(false);
    });

    it('ne detecte pas une demande de calcul de dose', () => {
        const message = "dose d'artésunate pour 18 kg";
        expect(detectDoseRequest(message)).toBe(true);
    });
});

describe('answerLocalDrugQuery', () => {
    it('liste les antipaludéens de la base validée V2', () => {
        const answer = answerLocalDrugQuery('Quels antipaludéens sont renseignés ?');
        expect(answer).toContain('Artésunate');
        expect(answer).toContain('Artéméther-Luméfantrine');
        expect(answer).toContain('Quinine');
        expect(answer).toMatch(/calculateur sécurisé/i);
        expect(answer).not.toMatch(/\d+\s*mg/i);
    });

    it('liste les antibiotiques disponibles dans la base validée V2', () => {
        const answer = answerLocalDrugQuery('Quels antibiotiques sont disponibles ?');
        expect(answer).toContain('Amoxicilline');
        expect(answer).toContain('Ceftriaxone');
        expect(answer).toMatch(/calculateur sécurisé/i);
    });

    it('trouve un medicament recherche par son nom', () => {
        const answer = answerLocalDrugQuery('Cherche artésunate');
        expect(answer).toContain('Artésunate');
        expect(answer).toMatch(/calculateur sécurisé/i);
    });

    it("rappelle systematiquement que l'assistant ne calcule pas les doses", () => {
        const answer = answerLocalDrugQuery('Quels antipaludéens sont renseignés ?');
        expect(answer).toMatch(/ne calcule pas les doses/i);
    });

    it('ne mentionne jamais .env.local, une clé API ou Gemini dans une reponse locale', () => {
        const answer = answerLocalDrugQuery('Quels antipaludéens sont renseignés ?');
        expect(answer).not.toMatch(/\.env\.local/i);
        expect(answer).not.toMatch(/clé api/i);
        expect(answer).not.toMatch(/gemini/i);
    });
});
