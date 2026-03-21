import Dexie, { type Table } from 'dexie';
import { Drug, Prescription, Protocol } from '@/types';

export class DoseaDB extends Dexie {
    drugs!: Table<Drug>;
    prescriptions!: Table<Prescription>;
    protocols!: Table<Protocol>;

    constructor() {
        super('doseaDB');

        // V1 Schema
        (this as Dexie).version(1).stores({
            drugs: '++id, name, class',
            prescriptions: '++id, drugId, date',
        });

        // V2 Schema: Add protocols and expand drugs
        (this as Dexie).version(2).stores({
            drugs: '++id, name, class, system', // Added system index
            prescriptions: '++id, drugId, date',
            protocols: 'id, name',
        }).upgrade(tx => {
            // Force a re-fetch of drugs to get the new fields
            return tx.table('drugs').clear();
        });
    }
}

export const db = new DoseaDB();

let isSeeding = false;

export const seedDatabase = async () => {
    if (isSeeding) return;
    isSeeding = true;

    try {
        // 1. Seed Drugs
        const response = await fetch('/data/drugs.json');
        if (!response.ok) throw new Error('Failed to fetch drugs.json');

        const drugsData: Drug[] = await response.json();

        console.log(`Updating drugs database (forced dev seed)`);
        await db.drugs.clear();
        await db.drugs.bulkAdd(drugsData);

        // 2. Seed Protocols
        const protoResponse = await fetch('/data/protocols.json');
        if (protoResponse.ok) {
            const protocolsData: Protocol[] = await protoResponse.json();
            const protoCount = await db.protocols.count();

            if (protoCount !== protocolsData.length) {
                console.log(`Updating protocols database: ${protoCount} -> ${protocolsData.length}`);
                await db.protocols.clear();
                await db.protocols.bulkAdd(protocolsData);
            }
        }
    } catch (error) {
        console.error('Failed to seed database:', error);
        throw error;
    } finally {
        isSeeding = false;
    }
};
