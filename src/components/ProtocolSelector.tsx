import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FileText, AlertTriangle, Stethoscope, BookOpen, Pill, Siren } from 'lucide-react';

export const ProtocolSelector: React.FC = () => {
    const { protocols, loadProtocol, activeWeightKg } = useAppStore();

    if (protocols.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 font-sans">
            <div className="flex items-center gap-2 mb-3">
                <FileText className="text-secondary" size={20} />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Protocoles Cliniques</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                Sélectionnez un protocole pour pré-remplir l'ordonnance selon le poids ({activeWeightKg ? `${activeWeightKg} kg` : 'en attente'}).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {protocols.map(p => (
                    <details
                        key={p.id}
                        className="rounded-md border border-gray-200 dark:border-gray-600 group open:shadow-sm"
                    >
                        <summary className="cursor-pointer list-none p-3 select-none">
                            <div className="flex items-start justify-between gap-2">
                                <div className="font-medium text-primary-dark dark:text-primary-light">{p.name}</div>
                                {p.isEmergencyProtocol && (
                                    <span className="flex items-center gap-1 shrink-0 text-xs font-semibold text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-300 px-2 py-0.5 rounded-full">
                                        <Siren size={12} /> Urgence
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{p.description}</div>
                        </summary>

                        <div className="px-3 pb-3 space-y-2 text-xs">
                            {p.signs && p.signs.length > 0 && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                                    <div className="flex items-center gap-1 font-semibold text-blue-800 dark:text-blue-300 mb-1">
                                        <Stethoscope size={12} /> Signes cliniques
                                    </div>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {p.signs.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                            )}

                            {p.alerts && p.alerts.length > 0 && (
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-2">
                                    <div className="flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-300 mb-1">
                                        <AlertTriangle size={12} /> Alertes de sécurité
                                    </div>
                                    <ul className="list-disc list-inside text-amber-900 dark:text-amber-200">
                                        {p.alerts.map((a, i) => <li key={i}>{a}</li>)}
                                    </ul>
                                </div>
                            )}

                            <div className="text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1 font-semibold mb-1">
                                    <Pill size={12} /> Médicaments
                                </div>
                                <div>{p.drugs.map(d => d.drugName).join(', ')}</div>
                            </div>

                            {p.source && (
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 italic">
                                    <BookOpen size={12} /> Source : {p.source}
                                </div>
                            )}

                            <button
                                onClick={() => loadProtocol(p.id)}
                                disabled={!activeWeightKg}
                                title={!activeWeightKg ? "Veuillez saisir un poids avant de charger ce protocole" : undefined}
                                className="w-full mt-2 py-2 rounded-md bg-secondary text-white font-medium hover:bg-secondary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Charger le protocole
                            </button>
                            {!activeWeightKg && (
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    Saisissez le poids du patient pour activer le chargement.
                                </p>
                            )}
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
};
