import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Drug } from '@/types';
import { Star, AlertTriangle, AlertOctagon, Info, PlayCircle, Plus, ShieldCheck } from 'lucide-react';
import { ProtocolSelector } from '@/components/ProtocolSelector';
import { PrescriptionCart } from '@/components/PrescriptionCart';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import {
    calculatePrescription,
    DosingError,
    PrescriptionCalculationResult,
} from '@/domain/dosing';
import { ALL_DOSING_RULES_V2 } from '@/domain/dosingRulesV2';
import { calculatePrescriptionV2 } from '@/domain/doseCalculatorV2';

const DAYS_PER_YEAR = 365.25;

type DisplaySeverity = 'info' | 'warning' | 'danger' | 'blocker';

interface DisplayAlert {
    severity: DisplaySeverity;
    message: string;
}

const SEVERITY_RANK: Record<DisplaySeverity, number> = {
    blocker: 0,
    danger: 1,
    warning: 2,
    info: 3,
};

const SEVERITY_STYLES: Record<DisplaySeverity, string> = {
    blocker: 'bg-red-700 text-white border-red-900',
    danger: 'bg-red-600 text-white border-red-800',
    warning: 'bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700',
    info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800',
};

/** Calcule les alertes à afficher en combinant les messages du moteur de dose et du ClinicalSafetyEngine, sans en reformuler le texte. */
function buildDisplayAlerts(result: PrescriptionCalculationResult): DisplayAlert[] {
    const alerts: DisplayAlert[] = result.clinicalAlerts.map((a) => ({
        severity: a.severity,
        message: a.message,
    }));

    // Les messages de doseSafety sont émis dans cet ordre fixe par checkDoseSafety.
    let messageIndex = 0;
    if (result.dose.wasCapped) {
        alerts.push({ severity: 'warning', message: result.doseSafety.messages[messageIndex] });
        messageIndex++;
    }
    if (result.dose.exceedsMaxDailyDose) {
        alerts.push({ severity: 'danger', message: result.doseSafety.messages[messageIndex] });
        messageIndex++;
    }

    return alerts.sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]);
}

const PrescriptionPreview: React.FC<{ drug: Drug; result: PrescriptionCalculationResult }> = ({
    drug,
    result,
}) => {
    const alerts = useMemo(() => buildDisplayAlerts(result), [result]);
    const criticalAlerts = alerts.filter((a) => a.severity === 'danger' || a.severity === 'blocker');
    const minorAlerts = alerts.filter((a) => a.severity === 'warning' || a.severity === 'info');

    return (
        <div className="mt-4 space-y-3">
            {/* Alertes danger/blocker : visuellement impossibles à manquer */}
            {criticalAlerts.map((a, i) => (
                <div
                    key={i}
                    role="alert"
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 shadow-lg ${SEVERITY_STYLES[a.severity]}`}
                >
                    <AlertOctagon size={28} className="flex-shrink-0" />
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-wide">
                            {a.severity === 'blocker' ? 'Alerte bloquante' : 'Alerte de sécurité'}
                        </p>
                        <p className="font-bold text-sm leading-snug mt-0.5">{a.message}</p>
                    </div>
                </div>
            ))}

            <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-primary-dark dark:text-primary-light">
                        {result.dose.doseMg} mg
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">par prise</span>
                </div>
                {result.volume && (
                    <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                        soit {result.volume.volumeMl} mL (à {drug.concentrationMgPerMl} mg/mL)
                    </p>
                )}

                <dl className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">Fréquence</dt>
                        <dd className="font-semibold text-gray-800 dark:text-gray-200">
                            {drug.frequencyPerDay ? `${drug.frequencyPerDay} fois / jour` : 'Non spécifiée'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">Intervalle minimal</dt>
                        <dd className="font-semibold text-gray-800 dark:text-gray-200">
                            {drug.minIntervalHours ? `≥ ${drug.minIntervalHours} h` : 'Non spécifié'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">Dose maximale / prise</dt>
                        <dd className="font-semibold text-gray-800 dark:text-gray-200">{drug.maxDoseMg} mg</dd>
                    </div>
                    {drug.maxDailyDoseMg !== undefined && (
                        <div>
                            <dt className="text-gray-500 dark:text-gray-400">Dose maximale / jour</dt>
                            <dd className="font-semibold text-gray-800 dark:text-gray-200">
                                {drug.maxDailyDoseMg} mg/j
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            {minorAlerts.length > 0 && (
                <div className="space-y-2">
                    {minorAlerts.map((a, i) => (
                        <div
                            key={i}
                            className={`flex items-start gap-2 p-3 rounded-md border text-sm ${SEVERITY_STYLES[a.severity]}`}
                        >
                            {a.severity === 'warning' ? (
                                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                            ) : (
                                <Info size={16} className="flex-shrink-0 mt-0.5" />
                            )}
                            <span>{a.message}</span>
                        </div>
                    ))}
                </div>
            )}

            <details className="text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-md p-3 border border-gray-100 dark:border-gray-700">
                <summary className="cursor-pointer font-semibold text-gray-600 dark:text-gray-300">
                    Comment ce calcul est obtenu
                </summary>
                <p className="mt-2 font-mono">{result.explanation.formula}</p>
                <p className="mt-1">{result.explanation.summary}</p>
                {drug.notes && (
                    <p className="mt-2 italic">
                        <span className="font-semibold">Source : </span>
                        {drug.notes}
                    </p>
                )}
            </details>
        </div>
    );
};

const DOSING_RULES_V2_SORTED = [...ALL_DOSING_RULES_V2].sort((a, b) => a.drugName.localeCompare(b.drugName));

const MISSING_FIELD_LABELS_V2: Record<string, string> = {
    weightKg: 'Poids (kg)',
    ageDays: 'Âge (jours)',
    gestationalAgeWeeks: 'Âge gestationnel (sem)',
    postMenstrualAgeWeeks: 'Âge postmenstruel (sem)',
    route: "Voie d'administration",
    indication: 'Indication',
};

interface DosingRuleV2PanelProps {
    activeWeightKg: number | null;
    activeAgeYears: number | null;
    ageDays?: number;
    patientId: string;
    checkAndIncrementCount: () => boolean;
    onLimitReached: () => void;
}

const DosingRuleV2Panel: React.FC<DosingRuleV2PanelProps> = ({
    activeWeightKg,
    activeAgeYears,
    ageDays,
    patientId,
    checkAndIncrementCount,
    onLimitReached,
}) => {
    const addDosingRuleV2ToPrescription = useAppStore((s) => s.addDosingRuleV2ToPrescription);
    const [ruleId, setRuleId] = useState('');
    const [route, setRoute] = useState('');
    const [indication, setIndication] = useState('');
    const [gestationalAgeWeeks, setGestationalAgeWeeks] = useState('');
    const [postMenstrualAgeWeeks, setPostMenstrualAgeWeeks] = useState('');

    const rule = useMemo(() => DOSING_RULES_V2_SORTED.find((r) => r.id === ruleId), [ruleId]);

    const v2Input = useMemo(() => {
        if (!rule) return null;
        return {
            drugName: rule.drugName,
            weightKg: activeWeightKg ?? undefined,
            ageDays,
            gestationalAgeWeeks: gestationalAgeWeeks ? parseFloat(gestationalAgeWeeks) : undefined,
            postMenstrualAgeWeeks: postMenstrualAgeWeeks ? parseFloat(postMenstrualAgeWeeks) : undefined,
            route: route || undefined,
            indication: indication || undefined,
        };
    }, [rule, activeWeightKg, ageDays, gestationalAgeWeeks, postMenstrualAgeWeeks, route, indication]);

    const v2Result = useMemo(() => {
        if (!v2Input) return null;
        return calculatePrescriptionV2({
            ...v2Input,
            patientId: patientId.trim() || undefined,
            patientAgeYears: activeAgeYears || 0,
        });
    }, [v2Input, patientId, activeAgeYears]);

    const canAdd = !!v2Result?.prescriptionRecord && !v2Result.prescriptionError;

    const handleAdd = () => {
        if (!v2Input || !canAdd || !v2Result) return;
        const isAllowed = checkAndIncrementCount();
        if (!isAllowed) {
            onLimitReached();
            return;
        }
        addDosingRuleV2ToPrescription(v2Result.evaluation, v2Input, { patientId: patientId.trim() || undefined });
        setRuleId('');
        setRoute('');
        setIndication('');
        setGestationalAgeWeeks('');
        setPostMenstrualAgeWeeks('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1 border-b pb-2 dark:border-gray-700 flex items-center gap-2">
                <ShieldCheck size={18} className="text-secondary-dark" />
                Base validée V2 (Dr KAPTO)
            </h3>
            <div className="mt-4">
                <label htmlFor="drugV2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rechercher Médicament (base validée)
                </label>
                <select
                    id="drugV2"
                    value={ruleId}
                    onChange={(e) => setRuleId(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                    <option value="">-- Choisir --</option>
                    {DOSING_RULES_V2_SORTED.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.drugName}{r.therapeuticClass ? ` (${r.therapeuticClass})` : ''}
                        </option>
                    ))}
                </select>
            </div>

            {rule && (
                <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        {rule.route && rule.route.length > 0 && (
                            <div>
                                <label htmlFor="v2Route" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Voie</label>
                                <select
                                    id="v2Route"
                                    value={route}
                                    onChange={(e) => setRoute(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                                >
                                    <option value="">-- Choisir --</option>
                                    {rule.route.map((r) => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {rule.indications && rule.indications.length > 0 && (
                            <div>
                                <label htmlFor="v2Indication" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Indication</label>
                                <select
                                    id="v2Indication"
                                    value={indication}
                                    onChange={(e) => setIndication(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                                >
                                    <option value="">-- Choisir --</option>
                                    {rule.indications.map((i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <label htmlFor="v2Gest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Âge gestationnel (sem)</label>
                            <input
                                type="number"
                                id="v2Gest"
                                value={gestationalAgeWeeks}
                                onChange={(e) => setGestationalAgeWeeks(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                                placeholder="ex: 32"
                            />
                        </div>
                        <div>
                            <label htmlFor="v2Pma" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Âge postmenstruel (sem)</label>
                            <input
                                type="number"
                                id="v2Pma"
                                value={postMenstrualAgeWeeks}
                                onChange={(e) => setPostMenstrualAgeWeeks(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                                placeholder="ex: 40"
                            />
                        </div>
                    </div>

                    {v2Result && (
                        <div className="mt-2 space-y-2">
                            {v2Result.evaluation.status === 'requires_clinical_choice' && (
                                <div className="flex items-start gap-2 p-3 rounded-md border text-sm bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700">
                                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                                    <span>
                                        Règle conditionnelle nécessitant validation clinique / choix d'indication
                                        {v2Result.evaluation.missingFields && v2Result.evaluation.missingFields.length > 0 && (
                                            <> : {v2Result.evaluation.missingFields.map((f) => MISSING_FIELD_LABELS_V2[f] ?? f).join(', ')}</>
                                        )}
                                        .
                                    </span>
                                </div>
                            )}

                            {(v2Result.evaluation.status === 'blocked' || v2Result.prescriptionError) && (
                                <div role="alert" className="flex items-start gap-3 p-4 rounded-lg border-2 bg-red-700 text-white border-red-900 shadow-lg">
                                    <AlertOctagon size={28} className="flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-extrabold uppercase tracking-wide">Calcul bloqué</p>
                                        <p className="font-bold text-sm leading-snug mt-0.5">
                                            {v2Result.prescriptionError ?? "Règle conditionnelle nécessitant validation clinique / choix d'indication."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {v2Result.evaluation.status === 'calculated' && (
                                <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                    <span className="text-2xl font-extrabold text-primary-dark dark:text-primary-light">
                                        {v2Result.evaluation.doseText}
                                    </span>
                                    {v2Result.evaluation.frequencyText && (
                                        <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">{v2Result.evaluation.frequencyText}</p>
                                    )}
                                    {v2Result.evaluation.maxDoseText && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{v2Result.evaluation.maxDoseText}</p>
                                    )}
                                </div>
                            )}

                            {v2Result.evaluation.warnings.length > 0 && (
                                <div className="space-y-2">
                                    {v2Result.evaluation.warnings.map((w, i) => (
                                        <div key={i} className="flex items-start gap-2 p-3 rounded-md border text-sm bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700">
                                            <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                                            <span>{w.warningText}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <details className="text-xs text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-md p-3 border border-gray-100 dark:border-gray-700">
                                <summary className="cursor-pointer font-semibold text-gray-600 dark:text-gray-300">
                                    Texte validé (source) et explication
                                </summary>
                                <p className="mt-2 font-mono">{rule.validatedDoseText}</p>
                                <p className="mt-1">{v2Result.evaluation.explanation}</p>
                                {rule.sourceName && (
                                    <p className="mt-2 italic">
                                        <span className="font-semibold">Source : </span>
                                        {rule.sourceName}
                                    </p>
                                )}
                            </details>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!canAdd}
                        className="w-full mt-2 flex justify-center items-center gap-2 bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus size={20} /> Ajouter à l'ordonnance
                    </button>
                </div>
            )}
        </div>
    );
};

const Calculator: React.FC = () => {
    const {
        drugs,
        profile,
        checkAndIncrementCount,
        adWatchUsedToday,
        grantExtraCalculation,
        activeWeightKg,
        activeAgeYears,
        setActivePatient,
        addDrugToPrescription
    } = useAppStore();

    const [localWeight, setLocalWeight] = useState(activeWeightKg ? activeWeightKg.toString() : '');
    const [localAge, setLocalAge] = useState(activeAgeYears ? activeAgeYears.toString() : '');
    const [patientId, setPatientId] = useState('');
    const [selectedDrugId, setSelectedDrugId] = useState<string>('');
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [isWatchingAd, setIsWatchingAd] = useState(false);
    const [activeTab, setActiveTab] = useState<'manual' | 'protocol' | 'v2'>('manual');

    const selectedDrug = useMemo(() => {
        return drugs.find(d => d.id === parseInt(selectedDrugId));
    }, [selectedDrugId, drugs]);

    // Update global state when local inputs blur or change
    const handlePatientUpdate = () => {
        const w = localWeight ? parseFloat(localWeight) : null;
        const a = localAge ? parseFloat(localAge) : null;
        setActivePatient(w, a);
    };

    const ageDays = activeAgeYears != null ? Math.round(activeAgeYears * DAYS_PER_YEAR) : undefined;

    const calculation = useMemo((): { result: PrescriptionCalculationResult } | { error: string } | null => {
        if (!selectedDrug || !activeWeightKg) return null;
        try {
            const result = calculatePrescription({
                weightKg: activeWeightKg,
                ageDays,
                doseMgPerKg: selectedDrug.recommendedDoseMgPerKg,
                maxDoseMg: selectedDrug.maxDoseMg,
                maxDailyDoseMg: selectedDrug.maxDailyDoseMg,
                frequencyPerDay: selectedDrug.frequencyPerDay,
                intervalHours: selectedDrug.minIntervalHours,
                concentrationMgPerMl: selectedDrug.concentrationMgPerMl,
                drugName: selectedDrug.name,
                drugClass: selectedDrug.class,
                drugSubClass: selectedDrug.subClass,
            });
            return { result };
        } catch (e) {
            return { error: e instanceof DosingError ? e.message : 'Erreur de calcul inattendue.' };
        }
    }, [selectedDrug, activeWeightKg, ageDays]);

    const hasBlockingAlert = useMemo(() => {
        if (!calculation) return false;
        if ('error' in calculation) return true;
        return buildDisplayAlerts(calculation.result).some((a) => a.severity === 'blocker');
    }, [calculation]);

    const handleAddDrug = (e: React.FormEvent) => {
        e.preventDefault();

        if (!activeWeightKg) {
            alert("Veuillez d'abord valider le poids du patient.");
            return;
        }

        if (!calculation || 'error' in calculation) {
            alert(calculation && 'error' in calculation ? calculation.error : 'Calcul indisponible.');
            return;
        }

        const isAllowed = checkAndIncrementCount();
        if (!isAllowed) {
            setShowLimitModal(true);
            return;
        }

        if (selectedDrug) {
            const { result } = calculation;
            addDrugToPrescription(selectedDrug, result, {
                patientId: patientId.trim() || undefined,
            });
            setSelectedDrugId('');
        }
    };

    const handleWatchAd = () => {
        setIsWatchingAd(true);
        setTimeout(() => {
            grantExtraCalculation();
            setIsWatchingAd(false);
            setShowLimitModal(false);
            alert('Vous avez obtenu 1 calcul supplémentaire !');
        }, 5000);
    };


    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center text-primary-dark dark:text-primary-light mb-6">Patient Actif (Ordonnance)</h2>

            {profile.subscriptionPlan === 'Pro' && (
                <div className="flex items-center justify-center gap-2 text-center text-sm text-yellow-800 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 p-3 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-800">
                    <Star size={16} className="text-yellow-500" />
                    <p><span className="font-semibold">Accès Pro :</span> Calculs illimités activés.</p>
                </div>
            )}

            <VoiceAssistant />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Section Gauche : Patient & Ajout */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 dark:border-gray-700">1. Définir le Patient</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Poids (kg) *</label>
                                <input
                                    type="number"
                                    id="weight"
                                    value={localWeight}
                                    onChange={e => setLocalWeight(e.target.value)}
                                    onBlur={handlePatientUpdate}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-bold text-lg"
                                    placeholder="ex: 12.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Âge (ans)</label>
                                <input
                                    type="number"
                                    id="age"
                                    value={localAge}
                                    onChange={e => setLocalAge(e.target.value)}
                                    onBlur={handlePatientUpdate}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    placeholder="ex: 2.5"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Identifiant patient anonymisé (facultatif)
                            </label>
                            <input
                                type="text"
                                id="patientId"
                                value={patientId}
                                onChange={e => setPatientId(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="ex: ANON-0F3A (jamais de nom)"
                            />
                        </div>
                    </div>

                    {/* Mode Toggle Tabs */}
                    <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('manual')}
                            className={`flex-1 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeTab === 'manual' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary dark:text-primary-light' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        >
                            Médicament Unitaire
                        </button>
                        <button
                            onClick={() => setActiveTab('protocol')}
                            className={`flex-1 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeTab === 'protocol' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary dark:text-primary-light' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        >
                            Protocoles Cliniques
                        </button>
                        <button
                            onClick={() => setActiveTab('v2')}
                            className={`flex-1 py-2 px-4 text-sm font-bold rounded-md transition-colors ${activeTab === 'v2' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary dark:text-primary-light' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                        >
                            Base validée V2
                        </button>
                    </div>

                    {activeTab === 'protocol' && <ProtocolSelector />}

                    {activeTab === 'v2' && (
                        <DosingRuleV2Panel
                            activeWeightKg={activeWeightKg}
                            activeAgeYears={activeAgeYears}
                            ageDays={ageDays}
                            patientId={patientId}
                            checkAndIncrementCount={checkAndIncrementCount}
                            onLimitReached={() => setShowLimitModal(true)}
                        />
                    )}

                    {activeTab === 'manual' && (
                        <form onSubmit={handleAddDrug} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 dark:border-gray-700">Sélection Manuelle</h3>
                            <div className="mb-4">
                                <label htmlFor="drug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rechercher Médicament</label>
                                <select
                                    id="drug"
                                    value={selectedDrugId}
                                    onChange={e => setSelectedDrugId(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                >
                                    <option value="">-- Choisir --</option>
                                    {drugs.map((drug: Drug) => (
                                        <option key={drug.id} value={drug.id}>{drug.name} ({drug.class})</option>
                                    ))}
                                </select>
                            </div>

                            {selectedDrug && activeWeightKg && calculation && 'result' in calculation && (
                                <PrescriptionPreview drug={selectedDrug} result={calculation.result} />
                            )}

                            {selectedDrug && activeWeightKg && calculation && 'error' in calculation && (
                                <div role="alert" className="mt-4 flex items-start gap-3 p-4 rounded-lg border-2 bg-red-700 text-white border-red-900 shadow-lg">
                                    <AlertOctagon size={28} className="flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-extrabold uppercase tracking-wide">Alerte bloquante</p>
                                        <p className="font-bold text-sm leading-snug mt-0.5">{calculation.error}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!selectedDrugId || !activeWeightKg || hasBlockingAlert}
                                className="w-full mt-4 flex justify-center items-center gap-2 bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={20} /> Ajouter à l'ordonnance
                            </button>
                        </form>
                    )}
                </div>

                {/* Section Droite : Ordonnance Active */}
                <div>
                    <PrescriptionCart />
                </div>
            </div>

            {showLimitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
                        {isWatchingAd ? (
                            <>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light mt-4">Publicité en cours...</h3>
                                <p className="my-2 text-sm text-gray-600 dark:text-gray-300">
                                    Veuillez patienter 5 secondes.
                                </p>
                            </>
                        ) : (
                            <>
                                <Star className="mx-auto h-12 w-12 text-yellow-400" />
                                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light mt-4">Limite de calculs atteinte</h3>
                                <p className="my-4 text-sm text-gray-600 dark:text-gray-300">
                                    Pour continuer, passez au plan Pro ou regardez une publicité pour obtenir 1 calcul supplémentaire.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        to="/profile"
                                        onClick={() => setShowLimitModal(false)}
                                        className="w-full flex justify-center items-center bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors shadow"
                                    >
                                        <Star size={20} className="mr-2" />
                                        Passer au plan Pro
                                    </Link>
                                    <button
                                        onClick={handleWatchAd}
                                        disabled={adWatchUsedToday}
                                        className="w-full flex justify-center items-center bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                                    >
                                        <PlayCircle size={20} className="mr-2" />
                                        {adWatchUsedToday ? 'Bonus quotidien utilisé' : 'Regarder une pub (1 bonus)'}
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowLimitModal(false)}
                                    className="w-full mt-4 text-gray-600 dark:text-gray-300 font-medium py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Fermer
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calculator;
