import React, { useState } from 'react';

const BlantyreScore: React.FC = () => {
    const [eyeMovement, setEyeMovement] = useState<number | null>(null);
    const [verbalResponse, setVerbalResponse] = useState<number | null>(null);
    const [motorResponse, setMotorResponse] = useState<number | null>(null);

    const totalScore = (eyeMovement ?? 0) + (verbalResponse ?? 0) + (motorResponse ?? 0);
    const isComplete = eyeMovement !== null && verbalResponse !== null && motorResponse !== null;

    let interpretation = "";
    let alertClass = "";

    if (isComplete) {
        if (totalScore <= 2) {
            interpretation = "Coma profond (Score ≤ 2). Risque vital majeur. Urgence absolue.";
            alertClass = "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800/50";
        } else if (totalScore <= 4) {
            interpretation = "Coma léger à modéré (Score 3-4). Surveiller de près.";
            alertClass = "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/50";
        } else {
            interpretation = "État de conscience normal (Score 5).";
            alertClass = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/50";
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-3 border-b border-primary/20 dark:border-primary/30">
                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light">Score de Blantyre (Pédiatrique)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Évaluation de l'état de conscience pour les enfants pré-verbaux (remplace Glasgow).</p>
            </div>

            <div className="p-4 space-y-6">
                {/* Mouvements des yeux */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">1. Mouvements des yeux</h4>
                    <div className="flex flex-col gap-2">
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${eyeMovement === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="eye" className="mr-3 accent-primary" checked={eyeMovement === 1} onChange={() => setEyeMovement(1)} />
                            Suit du regard (Normal) (+1)
                        </label>
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${eyeMovement === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="eye" className="mr-3 accent-primary" checked={eyeMovement === 0} onChange={() => setEyeMovement(0)} />
                            Yeux fixes ou mouvements inappropriés (+0)
                        </label>
                    </div>
                </div>

                {/* Réponse verbale */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">2. Réponse verbale (pleurs)</h4>
                    <div className="flex flex-col gap-2">
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${verbalResponse === 2 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="verbal" className="mr-3 accent-primary" checked={verbalResponse === 2} onChange={() => setVerbalResponse(2)} />
                            Cri approprié (ou rassuré par mère) (+2)
                        </label>
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${verbalResponse === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="verbal" className="mr-3 accent-primary" checked={verbalResponse === 1} onChange={() => setVerbalResponse(1)} />
                            Gémissements ou cri inaudible (+1)
                        </label>
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${verbalResponse === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="verbal" className="mr-3 accent-primary" checked={verbalResponse === 0} onChange={() => setVerbalResponse(0)} />
                            Aucune réponse verbale (+0)
                        </label>
                    </div>
                </div>

                {/* Réponse motrice */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">3. Réponse motrice (à la douleur)</h4>
                    <div className="flex flex-col gap-2">
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${motorResponse === 2 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="motor" className="mr-3 accent-primary" checked={motorResponse === 2} onChange={() => setMotorResponse(2)} />
                            Localise la douleur (retrait orienté) (+2)
                        </label>
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${motorResponse === 1 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="motor" className="mr-3 accent-primary" checked={motorResponse === 1} onChange={() => setMotorResponse(1)} />
                            Retrait non spécifique ou hypertonie (+1)
                        </label>
                        <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${motorResponse === 0 ? 'bg-primary/10 border-primary text-primary-dark dark:text-primary-light' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                            <input type="radio" name="motor" className="mr-3 accent-primary" checked={motorResponse === 0} onChange={() => setMotorResponse(0)} />
                            Aucune réponse motrice (+0)
                        </label>
                    </div>
                </div>

                {/* Result Section */}
                {isComplete && (
                    <div className={`mt-6 p-4 border rounded-lg ${alertClass}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg">Score Total :</span>
                            <span className="text-2xl font-black">{totalScore} / 5</span>
                        </div>
                        <p className="font-medium">{interpretation}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlantyreScore;
