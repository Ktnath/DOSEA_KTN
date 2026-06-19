import React, { useState } from 'react';
import BlantyreScore from '@/components/scores/BlantyreScore';
import DehydrationScore from '@/components/scores/DehydrationScore';
import MalnutritionScore from '@/components/scores/MalnutritionScore';
import EmergencyProtocols from '@/components/scores/EmergencyProtocols';

const ScoresLayout: React.FC = () => {
    const [activeScore, setActiveScore] = useState<'blantyre' | 'dehydration' | 'malnutrition' | 'emergency' | null>(null);

    return (
        <div className="space-y-6 pb-20">
            <h2 className="text-2xl font-bold text-center text-primary-dark dark:text-primary-light mb-6">Scores Cliniques (MSF)</h2>

            {/* Menu of available scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                    onClick={() => setActiveScore('blantyre')}
                    className={`p-4 rounded-xl border-2 text-left transition-all shadow-sm ${activeScore === 'blantyre' ? 'border-primary bg-primary/5 dark:bg-primary/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50'}`}
                >
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Score de Blantyre</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Évaluation du coma (paludisme grave, etc.). Remplaçant du Glasgow pour les pré-verbaux.</p>
                </button>

                <button
                    onClick={() => setActiveScore('dehydration')}
                    className={`p-4 rounded-xl border-2 text-left transition-all shadow-sm ${activeScore === 'dehydration' ? 'border-primary bg-primary/5 dark:bg-primary/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50'}`}
                >
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Déshydratation (Plan A/B/C)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Outil d'évaluation OMS/MSF pour la réhydratation IV/PO.</p>
                </button>

                <button
                    onClick={() => setActiveScore('malnutrition')}
                    className={`p-4 rounded-xl border-2 text-left transition-all shadow-sm ${activeScore === 'malnutrition' ? 'border-primary bg-primary/5 dark:bg-primary/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50'}`}
                >
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Malnutrition (MUAC)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Périmètre brachial et recherche d'œdèmes.</p>
                </button>

                <button
                    onClick={() => setActiveScore('emergency')}
                    className={`p-4 rounded-xl border-2 text-left transition-all shadow-sm ${activeScore === 'emergency' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-400/50'}`}
                >
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Urgence Pédiatrique</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Protocoles d'urgence sous forme d'étapes actionnables (paludisme grave, sepsis néonatal, asthme sévère, choc anaphylactique).</p>
                </button>
            </div>

            {/* Active Score View */}
            <div className="mt-8">
                {activeScore === 'blantyre' && <BlantyreScore />}
                {activeScore === 'dehydration' && <DehydrationScore />}
                {activeScore === 'malnutrition' && <MalnutritionScore />}
                {activeScore === 'emergency' && <EmergencyProtocols />}
                {!activeScore && (
                    <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                        Sélectionnez un outil d'évaluation clinique ci-dessus pour commencer.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScoresLayout;
