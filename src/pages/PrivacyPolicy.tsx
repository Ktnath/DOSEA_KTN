import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-12">
            <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors">
                <ArrowLeft size={16} /> Retour au profil
            </Link>

            <div className="flex items-center gap-3">
                <Shield className="text-primary" size={28} />
                <h2 className="text-2xl font-bold text-primary-dark dark:text-primary-light">Politique de Confidentialité</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <section>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">1. Introduction</h3>
                    <p>
                        D.O.S.E.A. (« l'Application ») est un calculateur de posologie pédiatrique destiné
                        exclusivement aux professionnels de santé. Cette politique décrit comment nous collectons,
                        utilisons et protégeons vos données.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">2. Données collectées</h3>
                    <p>
                        <strong>Données locales uniquement.</strong> Toutes les données (profil praticien,
                        historique de prescriptions, personnalisations de médicaments) sont stockées
                        localement sur votre appareil via IndexedDB et localStorage. Aucune donnée
                        n'est transmise à nos serveurs.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">3. Assistant IA</h3>
                    <p>
                        Lorsque vous utilisez l'assistant IA, vos messages sont envoyés à l'API Google
                        Gemini pour traitement. Aucune donnée patient identifiable ne doit être partagée
                        via l'assistant. Les requêtes ne sont pas stockées par D.O.S.E.A.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">4. Souveraineté des données</h3>
                    <p>
                        Vous conservez le contrôle total de vos données. Via la page Profil, vous pouvez
                        à tout moment effacer votre historique ou réinitialiser l'ensemble de votre
                        environnement local.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">5. Contact</h3>
                    <p>
                        Pour toute question relative à la protection de vos données, veuillez nous
                        contacter à l'adresse : <strong>contact@dosea.app</strong>
                    </p>
                </section>

                <p className="text-xs text-gray-400 text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    Dernière mise à jour : Mars 2026 — D.O.S.E.A. v1.0.0
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
