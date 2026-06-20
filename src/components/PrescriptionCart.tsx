import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Trash2, AlertTriangle, Syringe } from 'lucide-react';
import { IVFlowCalculator } from './IVFlowCalculator';

export const PrescriptionCart: React.FC = () => {
    const { activePrescriptions, removeDrugFromPrescription, saveActivePrescriptionsToHistory } = useAppStore();

    if (activePrescriptions.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Syringe className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500 dark:text-gray-400">Aucun médicament dans l'ordonnance.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-secondary-dark">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex justify-between items-end">
                <span>Ordonnance Active</span>
                <span className="text-sm font-normal bg-secondary-light text-secondary-dark px-2 rounded-full">
                    {activePrescriptions.length} médoc(s)
                </span>
            </h3>

            <div className="space-y-4 mb-6">
                {activePrescriptions.map(p => {
                    const isOverMax = p.drug?.maxDoseMg && p.calculatedDoseMg > p.drug.maxDoseMg;

                    return (
                        <div key={p.drugId} className={`p-4 rounded-lg relative ${isOverMax ? 'bg-red-50 dark:bg-red-900/10 border border-red-200' : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'}`}>
                            <button
                                onClick={() => removeDrugFromPrescription(p.drugId)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                            >
                                <Trash2 size={18} />
                            </button>

                            <h4 className="font-bold text-primary-dark dark:text-primary-light text-lg pr-8">{p.drugName}</h4>
                            {p.drug ? (
                                <p className="text-xs text-gray-500 mb-2">{p.drug.class}</p>
                            ) : (
                                p.source && <p className="text-xs text-gray-500 mb-2">{p.source}</p>
                            )}

                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{p.calculatedDoseMg} mg</span>
                                {p.calculatedVolumeMl && (
                                    <span className="text-gray-500 font-medium">(soit {p.calculatedVolumeMl} mL)</span>
                                )}
                            </div>

                            {p.drug?.dilution && (
                                <IVFlowCalculator doseMg={p.calculatedDoseMg} dilution={p.drug.dilution} weightKg={p.patientWeightKg} />
                            )}

                            {isOverMax && (
                                <div className="mt-2 text-xs flex items-center text-red-600 dark:text-red-400">
                                    <AlertTriangle size={14} className="mr-1" />
                                    Dose calculée plafonnée au maximum de {p.drug!.maxDoseMg} mg.
                                </div>
                            )}

                            {p.drug?.notes && (
                                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-2 rounded italic">
                                    <span className="font-semibold text-secondary-dark">Notes : </span>{p.drug.notes}
                                </p>
                            )}

                            {!p.drug && p.explanationFormula && (
                                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-2 rounded italic">
                                    <span className="font-semibold text-secondary-dark">Formule : </span>{p.explanationFormula}
                                </p>
                            )}

                            {!p.drug && p.alerts && p.alerts.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    {p.alerts.map((a, i) => (
                                        <div key={i} className="text-xs flex items-start text-amber-700 dark:text-amber-400">
                                            <AlertTriangle size={14} className="mr-1 mt-0.5 shrink-0" />
                                            <span>{a.message}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={saveActivePrescriptionsToHistory}
                className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-dark transition-colors"
            >
                Valider et Sauvegarder dans l'Historique
            </button>
        </div>
    );
};
