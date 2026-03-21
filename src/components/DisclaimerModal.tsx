import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ShieldAlert, CheckCircle } from 'lucide-react';

const DisclaimerModal: React.FC = () => {
    const { profile, acceptDisclaimer } = useAppStore();

    if (profile.hasAcceptedDisclaimer) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-red-600 p-6 text-white flex flex-col items-center gap-2 text-center">
                    <ShieldAlert size={48} className="animate-pulse" />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Avertissement Légal</h2>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        <p className="font-bold text-gray-800 dark:text-gray-100">
                            D.O.S.E.A. est un outil d'aide à la décision clinique destiné exclusivement aux professionnels de santé qualifiés.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Les calculs sont fournis à titre indicatif et ne remplacent en aucun cas le jugement clinique du praticien.</li>
                            <li>L'utilisateur est seul responsable de la vérification de l'exactitude des doses calculées avant toute administration.</li>
                            <li>Les données proviennent de recommandations standards qui peuvent varier selon les contextes locaux ou les mises à jour pharmacologiques récentes.</li>
                            <li>En utilisant cette application, vous dégagez D.O.S.E.A. et ses développeurs de toute responsabilité en cas d'erreur de prescription.</li>
                        </ul>
                    </div>

                    <button
                        onClick={acceptDisclaimer}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        <CheckCircle size={20} /> J'ACCEPTE ET JE CONFIRME ÊTRE PRATICIEN
                    </button>

                    <p className="text-[10px] text-gray-400 text-center uppercase">
                        Version 1.0.0 — D.O.S.E.A. Unified
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;
