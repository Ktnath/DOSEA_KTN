import { create } from 'zustand';
import { Drug, Prescription, UserProfile, Protocol } from '@/types';
import { db } from '@/services/db';
import { iapService } from '@/services/iapService';
import { buildPrescriptionRecord } from '@/domain/history';
import { calculatePrescription } from '@/domain/dosing';
import type { PrescriptionCalculationResult } from '@/domain/dosing';

type Theme = 'light' | 'dark';
type ToastType = 'success' | 'error' | null;

interface DrugOverride {
    recommendedDoseMgPerKg?: number;
    maxDoseMg?: number;
    route?: string;
    notes?: string;
    concentrationMgPerMl?: number;
}

interface AppState {
    profile: UserProfile;
    officialDrugs: Drug[]; // The static database
    overrides: Record<number, DrugOverride>; // User customizations
    drugs: Drug[]; // Effective drugs (Official + Overrides)
    history: Prescription[];
    protocols: Protocol[];
    isLoading: boolean;
    error: string | null;
    toast: { message: string; type: ToastType } | null;

    // Active Session (Ordonnance Multiple)
    activeWeightKg: number | null;
    activeAgeYears: number | null;
    activePrescriptions: (Prescription & { drug: Drug })[];
    dailyCalculationCount: number;
    lastCalculationDate: string;
    adWatchUsedToday: boolean;
    theme: Theme;

    // IAP State
    isSubscribed: boolean;
    subscriptionPlan: string | null;

    // Core actions
    initialize: (initialData: { drugs: Drug[]; history: Prescription[]; profile: UserProfile }) => void;
    setError: (message: string) => void;
    showToast: (message: string, type: ToastType) => void;
    clearToast: () => void;
    clearError: () => void;

    // Profile & Settings
    updateProfile: (profile: UserProfile) => void;
    acceptDisclaimer: () => void;
    toggleTheme: () => void;

    // Active Session Management
    setActivePatient: (weight: number | null, age: number | null) => void;
    addDrugToPrescription: (
        drug: Drug,
        result: PrescriptionCalculationResult,
        options?: { patientId?: string; indication?: string }
    ) => void;
    removeDrugFromPrescription: (drugId: number) => void;
    clearActivePrescriptions: () => void;
    loadProtocol: (protocolId: string) => void;
    saveActivePrescriptionsToHistory: () => Promise<void>;

    // History and Admin
    addPrescription: (prescription: Omit<Prescription, 'date' | 'id'>) => Promise<void>;
    checkAndIncrementCount: () => boolean;
    grantExtraCalculation: () => void;

    // Overrides & Data Sovereignty
    upsertOverride: (drugId: number, data: DrugOverride) => void;
    deleteOverride: (drugId: number) => void;
    clearHistory: () => Promise<void>;
    resetLocalData: () => Promise<void>;

    // IAP actions
    purchaseSubscription: (productId: string) => Promise<{ success: boolean; error?: string }>;
    restorePurchases: () => Promise<{ success: boolean; error?: string }>;
    refreshSubscriptionStatus: () => Promise<void>;
}

const defaultProfile: UserProfile = { name: 'Pédiatre', specialty: 'Pédiatrie', unitPreference: 'mg', subscriptionPlan: 'Free', hasAcceptedDisclaimer: false };
const FREE_PLAN_HISTORY_LIMIT = 10;
const FREE_PLAN_CALCULATION_LIMIT = 3;

export const useAppStore = create<AppState>((set, get) => ({
    profile: defaultProfile,
    officialDrugs: [],
    overrides: {},
    drugs: [],
    history: [],
    protocols: [],
    isLoading: true,
    error: null,
    toast: null,
    activeWeightKg: null,
    activeAgeYears: null,
    activePrescriptions: [],
    dailyCalculationCount: 0,
    lastCalculationDate: '',
    adWatchUsedToday: false,
    theme: (localStorage.getItem('dosea-theme') as Theme) || 'light',
    isSubscribed: false,
    subscriptionPlan: null,

    initialize: (initialData) => {
        const usageStatsRaw = localStorage.getItem('dosea-usage-stats');
        const usageStats = usageStatsRaw ? JSON.parse(usageStatsRaw) : { count: 0, date: '', adWatched: false };
        const overridesRaw = localStorage.getItem('dosea-overrides');
        const overrides = overridesRaw ? JSON.parse(overridesRaw) : {};

        const today = new Date().toISOString().split('T')[0];
        const isNewDay = usageStats.date !== today;

        const effectiveDrugs = initialData.drugs.map(drug => {
            const override = overrides[drug.id!];
            if (!override) return drug;
            return { ...drug, ...override };
        });

        set({
            officialDrugs: initialData.drugs,
            overrides,
            drugs: effectiveDrugs,
            history: initialData.history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
            profile: initialData.profile.name ? { ...defaultProfile, ...initialData.profile } : defaultProfile,
            isLoading: false,
            dailyCalculationCount: isNewDay ? 0 : usageStats.count,
            lastCalculationDate: isNewDay ? today : usageStats.date,
            adWatchUsedToday: isNewDay ? false : usageStats.adWatched ?? false,
        });

        // Load protocols from Dexie
        db.protocols.toArray().then(protocols => {
            set({ protocols });
        }).catch(err => console.error("Could not load protocols", err));

        // Initialize IAP service
        iapService.initialize().then(() => {
            return iapService.isSubscribed();
        }).then((subscribed) => {
            if (subscribed) {
                return iapService.getActiveSubscription().then((sub) => {
                    set({ isSubscribed: true, subscriptionPlan: sub?.period || 'month' });
                });
            }
        }).catch((err) => {
            console.error('IAP initialization error:', err);
        });
    },

    setError: (message) => set({ error: message }),
    clearError: () => set({ error: null }),
    showToast: (message, type) => {
        set({ toast: { message, type } });
        setTimeout(() => get().clearToast(), 3000);
    },
    clearToast: () => set({ toast: null }),

    updateProfile: (profile) => {
        const currentProfile = get().profile;
        const newProfile = { ...profile, subscriptionPlan: currentProfile.subscriptionPlan, hasAcceptedDisclaimer: currentProfile.hasAcceptedDisclaimer };
        localStorage.setItem('dosea-profile', JSON.stringify(newProfile));
        set({ profile: newProfile });
        get().showToast("Profil mis à jour", "success");
    },

    acceptDisclaimer: () => {
        const currentProfile = get().profile;
        const newProfile = { ...currentProfile, hasAcceptedDisclaimer: true };
        localStorage.setItem('dosea-profile', JSON.stringify(newProfile));
        set({ profile: newProfile });
    },

    upsertOverride: (drugId, data) => {
        const { overrides, officialDrugs } = get();
        const newOverrides = { ...overrides, [drugId]: data };
        localStorage.setItem('dosea-overrides', JSON.stringify(newOverrides));

        const effectiveDrugs = officialDrugs.map(drug => {
            const override = newOverrides[drug.id!];
            return override ? { ...drug, ...override } : drug;
        });

        set({ overrides: newOverrides, drugs: effectiveDrugs });
        get().showToast("Personnalisation enregistrée", "success");
    },

    deleteOverride: (drugId) => {
        const { overrides, officialDrugs } = get();
        const newOverrides = { ...overrides };
        delete newOverrides[drugId];
        localStorage.setItem('dosea-overrides', JSON.stringify(newOverrides));

        const effectiveDrugs = officialDrugs.map(drug => {
            const override = newOverrides[drug.id!];
            return override ? { ...drug, ...override } : drug;
        });

        set({ overrides: newOverrides, drugs: effectiveDrugs });
        get().showToast("Réglages officiels restaurés", "success");
    },

    addPrescription: async (prescriptionData) => {
        const { profile, history } = get();
        if (profile.subscriptionPlan === 'Free' && history.length >= FREE_PLAN_HISTORY_LIMIT) {
            set({ error: `Limite de ${FREE_PLAN_HISTORY_LIMIT} prescriptions atteinte.` });
            return;
        }
        try {
            const newPrescription: Prescription = { ...prescriptionData, date: new Date().toISOString() };
            const id = await db.prescriptions.add(newPrescription);
            set((state) => ({ history: [{ ...newPrescription, id }, ...state.history] }));
            get().showToast("Prescription enregistrée", "success");
        } catch (e) {
            set({ error: "Erreur lors de l'enregistrement." });
        }
    },

    // Session / Multiple Prescriptions logic
    setActivePatient: (weight, age) => {
        set({ activeWeightKg: weight, activeAgeYears: age });
        // Recalculate existing active prescriptions if weight changes
        const { activePrescriptions, drugs } = get();
        if (weight !== null && activePrescriptions.length > 0) {
            const updated = activePrescriptions.map(ap => {
                const drugRef = drugs.find(d => d.id === ap.drug.id) || ap.drug;
                let newDose = weight * drugRef.recommendedDoseMgPerKg;
                if (drugRef.maxDoseMg && newDose > drugRef.maxDoseMg) newDose = drugRef.maxDoseMg;

                let newVol = undefined;
                if (drugRef.concentrationMgPerMl) {
                    newVol = parseFloat((newDose / drugRef.concentrationMgPerMl).toFixed(2));
                }

                return {
                    ...ap,
                    patientWeightKg: weight,
                    patientAgeYears: age || ap.patientAgeYears,
                    calculatedDoseMg: parseFloat(newDose.toFixed(1)),
                    calculatedVolumeMl: newVol
                };
            });
            set({ activePrescriptions: updated });
        }
    },

    addDrugToPrescription: (drug, result, options) => {
        const { activePrescriptions, activeWeightKg, activeAgeYears } = get();
        if (!activeWeightKg) return; // Need weight

        // Prevent duplicates
        if (activePrescriptions.some(p => p.drugId === drug.id)) {
            get().showToast(`${drug.name} est déjà dans l'ordonnance`, "error");
            return;
        }

        const record = buildPrescriptionRecord({
            drugId: drug.id!,
            drugName: drug.name,
            patientId: options?.patientId,
            patientWeightKg: activeWeightKg,
            patientAgeYears: activeAgeYears || 0,
            indication: options?.indication ?? drug.indications,
            concentrationMgPerMl: drug.concentrationMgPerMl,
            source: drug.notes,
            result,
        });

        const newP: Prescription & { drug: Drug } = {
            ...record,
            date: new Date().toISOString(),
            drug: drug
        };

        set({ activePrescriptions: [...activePrescriptions, newP] });
        get().showToast(`${drug.name} ajouté`, "success");
    },

    removeDrugFromPrescription: (drugId) => {
        const { activePrescriptions } = get();
        set({ activePrescriptions: activePrescriptions.filter(p => p.drugId !== drugId) });
    },

    clearActivePrescriptions: () => {
        set({ activePrescriptions: [] });
    },

    saveActivePrescriptionsToHistory: async () => {
        const { activePrescriptions, addPrescription } = get();

        if (activePrescriptions.length === 0) return;

        try {
            // We save them sequentially to indexedDB to keep things simple
            for (const item of activePrescriptions) {
                const { drug, date, id, ...basePrescription } = item;
                await addPrescription(basePrescription);
            }
            get().clearActivePrescriptions();
            get().showToast("Ordonnance validée et sauvegardée", "success");
        } catch (e) {
            set({ error: "Erreur lors de la sauvegarde de l'ordonnance." });
        }
    },

    loadProtocol: (protocolId) => {
        const { protocols, drugs, activeWeightKg, addDrugToPrescription, activeAgeYears } = get();
        const protocol = protocols.find(p => p.id === protocolId);
        if (!protocol) return;

        if (!activeWeightKg) {
            get().showToast("Veuillez saisir un poids avant de charger ce protocole", "error");
            return;
        }

        let loadedCount = 0;
        protocol.drugs.forEach(pDrug => {
            // First try exact match, then fallback to startsWith
            let matchedDrug = drugs.find(d => d.name.toLowerCase() === pDrug.drugName.toLowerCase());
            if (!matchedDrug) {
                matchedDrug = drugs.find(d => d.name.toLowerCase().startsWith(pDrug.drugName.toLowerCase()));
            }

            if (matchedDrug) {
                const result = calculatePrescription({
                    weightKg: activeWeightKg,
                    ageDays: activeAgeYears != null ? Math.round(activeAgeYears * 365.25) : undefined,
                    doseMgPerKg: matchedDrug.recommendedDoseMgPerKg,
                    maxDoseMg: matchedDrug.maxDoseMg,
                    maxDailyDoseMg: matchedDrug.maxDailyDoseMg,
                    frequencyPerDay: matchedDrug.frequencyPerDay,
                    concentrationMgPerMl: matchedDrug.concentrationMgPerMl,
                    drugName: matchedDrug.name,
                    drugClass: matchedDrug.class,
                    drugSubClass: matchedDrug.subClass,
                });

                // Note: we can't easily prevent the "already in queue" toast spanning if we reuse addDrugToPrescription directly,
                // but it works logically.
                const currentQueue = get().activePrescriptions;
                if (!currentQueue.some(p => p.drugId === matchedDrug.id)) {
                    addDrugToPrescription(matchedDrug, result, {
                        indication: pDrug.indicationOverride ?? `Protocole : ${protocol.name}`,
                    });
                    loadedCount++;
                }
            }
        });

        if (loadedCount > 0) {
            get().showToast(`Protocole ${protocol.name} chargé (${loadedCount} médocs)`, "success");
        }
    },

    clearHistory: async () => {
        try {
            await db.prescriptions.clear();
            set({ history: [] });
            get().showToast("Historique vidé", "success");
        } catch (e) {
            set({ error: "Impossible de vider l'historique." });
        }
    },

    resetLocalData: async () => {
        try {
            await db.prescriptions.clear();
            localStorage.removeItem('dosea-overrides');
            localStorage.removeItem('dosea-usage-stats');

            const { officialDrugs } = get();
            set({
                history: [],
                overrides: {},
                drugs: officialDrugs,
                dailyCalculationCount: 0,
                adWatchUsedToday: false
            });
            get().showToast("Données locales réinitialisées", "success");
        } catch (e) {
            set({ error: "Erreur lors de la réinitialisation." });
        }
    },

    checkAndIncrementCount: () => {
        const { profile, dailyCalculationCount, lastCalculationDate, adWatchUsedToday } = get();
        if (profile.subscriptionPlan === 'Pro') return true;
        const today = new Date().toISOString().split('T')[0];
        let currentCount = dailyCalculationCount;
        if (lastCalculationDate !== today) currentCount = 0;
        if (currentCount >= FREE_PLAN_CALCULATION_LIMIT) return false;
        const newCount = currentCount + 1;
        localStorage.setItem('dosea-usage-stats', JSON.stringify({ count: newCount, date: today, adWatched: adWatchUsedToday }));
        set({ dailyCalculationCount: newCount, lastCalculationDate: today });
        return true;
    },

    grantExtraCalculation: () => {
        const today = new Date().toISOString().split('T')[0];
        set({ dailyCalculationCount: 0, adWatchUsedToday: true, lastCalculationDate: today });
    },

    toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('dosea-theme', newTheme);
        set({ theme: newTheme });
    },

    // IAP Actions
    purchaseSubscription: async (productId) => {
        try {
            const result = await iapService.purchaseProduct(productId);
            if (result.success) {
                const sub = await iapService.getActiveSubscription();
                set({ isSubscribed: true, subscriptionPlan: sub?.period || 'month' });
                const currentProfile = get().profile;
                const newProfile = { ...currentProfile, subscriptionPlan: 'Pro' as const };
                localStorage.setItem('dosea-profile', JSON.stringify(newProfile));
                set({ profile: newProfile });
            }
            return result;
        } catch (error) {
            return { success: false, error: 'Purchase failed' };
        }
    },

    restorePurchases: async () => {
        try {
            const result = await iapService.restorePurchases();
            if (result.success && result.purchases.length > 0) {
                const sub = await iapService.getActiveSubscription();
                set({ isSubscribed: true, subscriptionPlan: sub?.period || 'month' });
                const currentProfile = get().profile;
                const newProfile = { ...currentProfile, subscriptionPlan: 'Pro' as const };
                localStorage.setItem('dosea-profile', JSON.stringify(newProfile));
                set({ profile: newProfile });
            }
            return { success: result.success };
        } catch (error) {
            return { success: false, error: 'Restore failed' };
        }
    },

    refreshSubscriptionStatus: async () => {
        try {
            const subscribed = await iapService.isSubscribed();
            if (subscribed) {
                const sub = await iapService.getActiveSubscription();
                set({ isSubscribed: true, subscriptionPlan: sub?.period || 'month' });
            } else {
                set({ isSubscribed: false, subscriptionPlan: null });
            }
        } catch (error) {
            console.error('Refresh subscription error:', error);
        }
    },
}));
