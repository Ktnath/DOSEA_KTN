import React, { useState } from 'react';

const MalnutritionScore: React.FC = () => {
    const [muac, setMuac] = useState<number | ''>('');
    const [hasEdema, setHasEdema] = useState<boolean | null>(null);

    const isComplete = muac !== '' && hasEdema !== null;

    let interpretation = "";
    let alertClass = "";
    let action = "";
    let classification = "";

    if (isComplete) {
        const muacValue = Number(muac);

        if (muacValue < 115 || hasEdema) {
            classification = "Malnutrition Aiguë Sévère (MAS)";
            alertClass = "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800/50";
            interpretation = hasEdema
                ? "Présence d'œdèmes bilatéraux (Kwashiorkor) ou MUAC < 115 mm."
                : "MUAC < 115 mm (Marasme).";
            action = "Urgence nutritionnelle. Admission en centre thérapeutique (ATPE / F-75 / F-100). Dépistage des complications médicales.";
        } else if (muacValue >= 115 && muacValue < 125) {
            classification = "Malnutrition Aiguë Modérée (MAM)";
            alertClass = "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50";
            interpretation = "MUAC entre 115 et 124 mm. Sans œdèmes.";
            action = "Prise en charge nutritionnelle supplémentaire (Plumpy'Sup, etc.). Suivi régulier.";
        } else {
            classification = "État nutritionnel normal (selon PB)";
            alertClass = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/50";
            interpretation = "MUAC ≥ 125 mm. Sans œdèmes.";
            action = "Pas d'intervention nutritionnelle urgente spécifique requise via ces critères.";
        }
    }

    // Helper for visual MUAC bar
    const getMuacColorClass = (val: number | '') => {
        if (val === '') return 'bg-gray-200 dark:bg-gray-700';
        if (val < 115) return 'bg-red-500';
        if (val < 125) return 'bg-yellow-400';
        return 'bg-green-500';
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-3 border-b border-primary/20 dark:border-primary/30">
                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light">Malnutrition Aiguë (MUAC / Œdèmes)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pour les enfants de 6 à 59 mois. Évaluation simplifiée par périmètre brachial et clinique.</p>
            </div>

            <div className="p-4 space-y-6">

                {/* MUAC Input */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">1. Périmètre Brachial (MUAC / PB)</h4>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            min="50"
                            max="200"
                            placeholder="ex: 110"
                            value={muac}
                            onChange={(e) => setMuac(e.target.value !== '' ? Number(e.target.value) : '')}
                            className="w-24 p-2 text-xl text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <span className="text-gray-500 dark:text-gray-400 font-medium">mm (Millimètres)</span>
                    </div>

                    {/* Visual MUAC Bar */}
                    <div className="w-full max-w-sm h-4 rounded-full overflow-hidden flex shadow-inner bg-gray-200 dark:bg-gray-700">
                        {/* 0-114 Red */}
                        <div className="h-full bg-red-500 transition-all opacity-80" style={{ width: '30%' }} title="< 115mm (Sévère)"></div>
                        {/* 115-124 Yellow */}
                        <div className="h-full bg-yellow-400 transition-all opacity-80" style={{ width: '15%' }} title="115-124mm (Modéré)"></div>
                        {/* 125+ Green */}
                        <div className="h-full bg-green-500 transition-all opacity-80" style={{ width: '55%' }} title="> 125mm (Normal)"></div>
                    </div>
                    {muac !== '' && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className={`w-3 h-3 rounded-full ${getMuacColorClass(Number(muac))}`}></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Valeur : {muac} mm</span>
                        </div>
                    )}
                </div>

                {/* Œdèmes */}
                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">2. Œdèmes bilatéraux (prenant le godet)</h4>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setHasEdema(true)}
                            className={`flex-1 py-3 rounded-lg border font-bold transition-colors ${hasEdema === true ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/40 dark:border-red-500 dark:text-red-300' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            OUI (Présents)
                        </button>
                        <button
                            onClick={() => setHasEdema(false)}
                            className={`flex-1 py-3 rounded-lg border font-bold transition-colors ${hasEdema === false ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/40 dark:border-green-500 dark:text-green-300' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            NON (Absents)
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                {isComplete && (
                    <div className={`mt-6 p-5 border rounded-lg ${alertClass}`}>
                        <div className="flex justify-between items-start mb-3">
                            <span className="font-bold text-xl">{classification}</span>
                        </div>
                        <p className="font-medium mb-2">{interpretation}</p>
                        <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded text-sm mt-3 border border-black/5 dark:border-white/5">
                            <strong>Action :</strong> {action}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MalnutritionScore;
