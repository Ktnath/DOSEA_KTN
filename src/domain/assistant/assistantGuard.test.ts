import { describe, expect, it } from 'vitest';
import { buildAssistantSystemInstruction, detectDoseRequest } from './assistantGuard';

describe('detectDoseRequest', () => {
    it('detecte une demande explicite de calcul de dose', () => {
        expect(detectDoseRequest('Calcule la dose de ceftriaxone pour 10 kg')).toBe(true);
    });

    it('detecte une demande de posologie', () => {
        expect(detectDoseRequest('Quelle est la posologie habituelle du paracetamol ?')).toBe(true);
    });

    it('detecte une question avec poids et unite', () => {
        expect(detectDoseRequest('Combien de mg pour un enfant de 12 kg ?')).toBe(true);
    });

    it('ne detecte pas une question generale sur le fonctionnement', () => {
        expect(detectDoseRequest("Comment fonctionne l'application D.O.S.E.A. ?")).toBe(false);
    });

    it('ne detecte pas une recherche de medicament', () => {
        expect(detectDoseRequest('Est-ce que l\'amoxicilline est dans la base ?')).toBe(false);
    });
});

describe('buildAssistantSystemInstruction', () => {
    it('interdit explicitement le calcul de dose', () => {
        const instruction = buildAssistantSystemInstruction([]);
        expect(instruction).toMatch(/ne calcules JAMAIS une dose/i);
        expect(instruction).toMatch(/calculateur/i);
    });

    it('ne contient aucune dose chiffree dans le contexte medicament', () => {
        const instruction = buildAssistantSystemInstruction([
            { name: 'Ceftriaxone', class: 'Antibiotique' },
        ]);
        const drugContextLine = instruction.split('\n').find((line) => line.startsWith('Medicaments presents'));
        expect(drugContextLine).toContain('Ceftriaxone (Antibiotique)');
        expect(drugContextLine).not.toMatch(/\d/);
    });

    it('gere une liste de medicaments vide', () => {
        const instruction = buildAssistantSystemInstruction([]);
        expect(instruction).toContain('aucun medicament');
    });
});
