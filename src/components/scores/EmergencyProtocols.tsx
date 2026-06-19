import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Siren } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { calculateDose } from '@/domain/dosing/calculateDose';
import { DosingError } from '@/domain/dosing/types';

const EmergencyProtocols: React.FC = () => {
    const { protocols, drugs } = useAppStore();
    const [weightKg, setWeightKg] = useState<string>('');
    const [openProtocolId, setOpenProtocolId] = useState<string | null>(null);

    const weight = parseFloat(weightKg);
    const hasValidWeight = weight > 0;

    const emergencyProtocols = protocols.filter(p => p.isEmergencyProtocol);

    if (emergencyProtocols.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                Aucun protocole d'urgence disponible pour le moment.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <label htmlFor="emergency-weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Poids de l'enfant (kg)
                </label>
                <input
                    id="emergency-weight"
                    type="number"
                    min="0"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="Ex: 12"
                    className="w-full sm:w-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
            </div>

            {emergencyProtocols.map(protocol => {
                const isOpen = openProtocolId === protocol.id;
                return (
                    <div key={protocol.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800/50 overflow-hidden">
                        <button
                            onClick={() => setOpenProtocolId(isOpen ? null : protocol.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 dark:hover:bg-red-900/10 transition"
                        >
                            <div className="flex items-center gap-2">
                                <Siren className="text-red-600 dark:text-red-400" size={20} />
                                <span className="font-bold text-gray-800 dark:text-gray-200">{protocol.name}</span>
                            </div>
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {isOpen && (
                            <div className="p-4 pt-0 space-y-4 text-sm">
                                <p className="text-gray-600 dark:text-gray-400">{protocol.description}</p>

                                {protocol.signs && protocol.signs.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Signes / Situation</h4>
                                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-0.5">
                                            {protocol.signs.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                )}

                                <div>
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Médicaments associés</h4>
                                    <div className="space-y-2">
                                        {protocol.drugs.map((pDrug, i) => {
                                            const drug = drugs.find(d => d.name.toLowerCase() === pDrug.drugName.toLowerCase());
                                            let doseLabel = 'Données de dose indisponibles';
                                            if (drug && hasValidWeight) {
                                                try {
                                                    const result = calculateDose({
                                                        weightKg: weight,
                                                        doseMgPerKg: drug.recommendedDoseMgPerKg,
                                                        maxDoseMg: drug.maxDoseMg,
                                                    });
                                                    doseLabel = `≈ ${result.doseMg.toFixed(1)} mg${result.wasCapped ? ' (plafonnée)' : ''}`;
                                                } catch (err) {
                                                    if (err instanceof DosingError) doseLabel = err.message;
                                                }
                                            } else if (drug) {
                                                doseLabel = 'Saisir le poids pour calculer la dose';
                                            }

                                            return (
                                                <div key={i} className="p-2 rounded-md bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700">
                                                    <div className="font-medium text-primary-dark dark:text-primary-light">{pDrug.drugName}</div>
                                                    {pDrug.indicationOverride && (
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{pDrug.indicationOverride}</div>
                                                    )}
                                                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">{doseLabel}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {protocol.alerts && protocol.alerts.length > 0 && (
                                    <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertTriangle className="text-amber-600 dark:text-amber-400" size={16} />
                                            <h4 className="font-semibold text-amber-800 dark:text-amber-300">Alertes</h4>
                                        </div>
                                        <ul className="list-disc list-inside text-amber-800 dark:text-amber-300 space-y-0.5">
                                            {protocol.alerts.map((a, i) => <li key={i}>{a}</li>)}
                                        </ul>
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    <div>Source : {protocol.source}</div>
                                    <div className="font-semibold mt-1">⚠️ Vérifier le protocole local avant application.</div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EmergencyProtocols;
