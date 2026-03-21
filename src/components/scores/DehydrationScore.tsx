import React, { useState } from 'react';

const DehydrationScore: React.FC = () => {
    // State for each clinical sign
    const [generalState, setGeneralState] = useState<number | null>(null);
    const [eyes, setEyes] = useState<number | null>(null);
    const [thirst, setThirst] = useState<number | null>(null);
    const [skinPinch, setSkinPinch] = useState<number | null>(null);

    // Count signs in Class C and Class B
    let countC = 0;
    let countB = 0;

    const signs = [generalState, eyes, thirst, skinPinch];
    signs.forEach(sign => {
        if (sign === 2) countC++;
        else if (sign === 1) countB++;
    });

    const isComplete = signs.every(s => s !== null);

    let plan = "";
    let alertClass = "";
    let interpretation = "";
    let action = "";

    if (isComplete) {
        if (countC >= 2) {
            plan = "Plan C";
            interpretation = "Déshydratation Sévère";
            alertClass = "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800/50";
            action = "Urgence absolue. Perfusion IV immédiate (Ringer Lactate ou NaCl 0.9%). 100 ml/kg à répartir selon l'âge.";
        } else if (countB >= 2 || (countC === 1 && countB >= 1)) {
            plan = "Plan B";
            interpretation = "Déshydratation Modérée (Quelques signes)";
            alertClass = "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50";
            action = "SRO (Sels de Réhydratation Orale) en clinique. 75 ml/kg sur 4 heures. Évaluer et réévaluer.";
        } else {
            plan = "Plan A";
            interpretation = "Pas de signes de déshydratation (ou < 2 signes)";
            alertClass = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/50";
            action = "Prévention à domicile. Donner plus de liquides que d'habitude (SRO, allaitement). Continuer l'alimentation.";
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-3 border-b border-primary/20 dark:border-primary/30">
                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light">Évaluation de la Déshydratation (OMS/MSF)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pour tout patient atteint de diarrhée. Observer et explorer 4 signes clés.</p>
            </div>

            <div className="p-4 space-y-6">

                {/* État Général */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">1. État général</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${generalState === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="general" className="mr-2 accent-primary" checked={generalState === 0} onChange={() => setGeneralState(0)} />
                                <span className="font-medium">Bien, alerte</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${generalState === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="general" className="mr-2 accent-primary" checked={generalState === 1} onChange={() => setGeneralState(1)} />
                                <span className="font-medium">Agité, irritable</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${generalState === 2 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="general" className="mr-2 accent-primary" checked={generalState === 2} onChange={() => setGeneralState(2)} />
                                <span className="font-medium">Léthargique ou inconscient</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Yeux */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">2. Yeux</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${eyes === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="eyes" className="mr-2 accent-primary" checked={eyes === 0} onChange={() => setEyes(0)} />
                                <span className="font-medium">Normaux</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${eyes === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="eyes" className="mr-2 accent-primary" checked={eyes === 1} onChange={() => setEyes(1)} />
                                <span className="font-medium">Enfoncés</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${eyes === 2 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="eyes" className="mr-2 accent-primary" checked={eyes === 2} onChange={() => setEyes(2)} />
                                <span className="font-medium">Très enfoncés et secs</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Soif */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">3. Soif (lorsqu'on offre à boire)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${thirst === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="thirst" className="mr-2 accent-primary" checked={thirst === 0} onChange={() => setThirst(0)} />
                                <span className="font-medium">Boit normalement, n'est pas assoiffé</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${thirst === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="thirst" className="mr-2 accent-primary" checked={thirst === 1} onChange={() => setThirst(1)} />
                                <span className="font-medium">Assoiffé, boit avidement</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${thirst === 2 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="thirst" className="mr-2 accent-primary" checked={thirst === 2} onChange={() => setThirst(2)} />
                                <span className="font-medium">Boit mal ou est incapable de boire</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Pli Cutané */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">4. Pli cutané (Abdomen)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${skinPinch === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="skin" className="mr-2 accent-primary" checked={skinPinch === 0} onChange={() => setSkinPinch(0)} />
                                <span className="font-medium">S'efface rapidement</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${skinPinch === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="skin" className="mr-2 accent-primary" checked={skinPinch === 1} onChange={() => setSkinPinch(1)} />
                                <span className="font-medium">S'efface lentement (&lt; 2s)</span>
                            </div>
                        </label>
                        <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${skinPinch === 2 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <div className="flex items-center mb-1">
                                <input type="radio" name="skin" className="mr-2 accent-primary" checked={skinPinch === 2} onChange={() => setSkinPinch(2)} />
                                <span className="font-medium">S'efface très lentement (&gt; 2s)</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Result Section */}
                {isComplete && (
                    <div className={`mt-6 p-5 border rounded-lg ${alertClass}`}>
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-xl uppercase tracking-wider">{plan}</span>
                            <span className="font-black text-lg">{interpretation}</span>
                        </div>
                        <p className="font-medium mb-3">{action}</p>

                        {plan === "Plan B" && (
                            <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded text-sm mt-3">
                                <strong>Volume approximatif SRO (sur 4h) :</strong> Poids du patient en Kg × 75 ml.
                            </div>
                        )}
                        {plan === "Plan C" && (
                            <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded text-sm mt-3">
                                <strong>Moins de 12 mois :</strong> 30 ml/kg en 1h, puis 70 ml/kg en 5h.<br />
                                <strong>12 mois à 5 ans :</strong> 30 ml/kg en 30 min, puis 70 ml/kg en 2h30.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DehydrationScore;
