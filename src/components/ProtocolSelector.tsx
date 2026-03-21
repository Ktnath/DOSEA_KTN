import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FileText } from 'lucide-react';

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
                    <button
                        key={p.id}
                        onClick={() => loadProtocol(p.id)}
                        disabled={!activeWeightKg}
                        className="text-left p-3 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-secondary-light dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed group relative"
                    >
                        <div className="font-medium text-primary-dark dark:text-primary-light">{p.name}</div>
                        <div className="text-xs text-gray-500 truncate mt-1">{p.description}</div>

                        {/* Tooltip for drugs */}
                        <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-full p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                            <strong>Contient :</strong> {p.drugs.map(d => d.drugName).join(', ')}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
