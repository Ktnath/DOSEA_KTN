import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Drug } from '@/types';
import { Star, AlertTriangle, PlayCircle, Plus } from 'lucide-react';
import { ProtocolSelector } from '@/components/ProtocolSelector';
import { PrescriptionCart } from '@/components/PrescriptionCart';
import { VoiceAssistant } from '@/components/VoiceAssistant';

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
    const [selectedDrugId, setSelectedDrugId] = useState<string>('');
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [isWatchingAd, setIsWatchingAd] = useState(false);
    const [activeTab, setActiveTab] = useState<'manual' | 'protocol'>('manual');

    const selectedDrug = useMemo(() => {
        return drugs.find(d => d.id === parseInt(selectedDrugId));
    }, [selectedDrugId, drugs]);

    // Update global state when local inputs blur or change
    const handlePatientUpdate = () => {
        const w = localWeight ? parseFloat(localWeight) : null;
        const a = localAge ? parseFloat(localAge) : null;
        setActivePatient(w, a);
    };

    const handleAddDrug = (e: React.FormEvent) => {
        e.preventDefault();

        if (!activeWeightKg) {
            alert("Veuillez d'abord valider le poids du patient.");
            return;
        }

        const isAllowed = checkAndIncrementCount();
        if (!isAllowed) {
            setShowLimitModal(true);
            return;
        }

        if (selectedDrug && activeWeightKg) {
            let doseInMg = activeWeightKg * selectedDrug.recommendedDoseMgPerKg;
            if (selectedDrug.maxDoseMg && doseInMg > selectedDrug.maxDoseMg) {
                doseInMg = selectedDrug.maxDoseMg;
            }

            let displayVolMl = undefined;
            if (profile.unitPreference === 'ml' && selectedDrug.concentrationMgPerMl) {
                displayVolMl = parseFloat((doseInMg / selectedDrug.concentrationMgPerMl).toFixed(2));
            }

            addDrugToPrescription(
                selectedDrug,
                parseFloat(doseInMg.toFixed(1)),
                displayVolMl
            );
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
                    </div>

                    {activeTab === 'protocol' && <ProtocolSelector />}

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
                            <button
                                type="submit"
                                disabled={!selectedDrugId || !activeWeightKg}
                                className="w-full flex justify-center items-center gap-2 bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
