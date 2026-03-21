import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, List, History, Clock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Prescription } from '@/types';

const Home: React.FC = () => {
    const profile = useAppStore((state) => state.profile);
    const history = useAppStore((state) => state.history);

    const recentCalculations = history.slice(0, 3);

    return (
        <div className="space-y-8">
            <div className="text-center bg-primary-light dark:bg-primary-dark/20 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-primary-dark dark:text-primary-light">Bienvenue, {profile.name || 'Docteur'} !</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">D.O.S.E.A. est votre assistant pour le calcul de posologie pédiatrique.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ActionCard
                    to="/calculator"
                    icon={Calculator}
                    title="Calculer une dose"
                    description="Calculez rapidement la posologie d'un médicament."
                />
                <ActionCard
                    to="/drugs"
                    icon={List}
                    title="Liste des médicaments"
                    description="Consultez et gérez votre base de données locale."
                />
                <ActionCard
                    to="/history"
                    icon={History}
                    title="Historique"
                    description="Retrouvez vos calculs et prescriptions passés."
                />
            </div>

            {/* Section: Recent Calculations */}
            <div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Calculs Récents</h3>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    {recentCalculations.length > 0 ? (
                        <div className="space-y-3">
                            {recentCalculations.map((prescription: Prescription) => (
                                <div key={prescription.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border-l-4 border-secondary">
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-100">{prescription.drugName}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(prescription.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold text-primary dark:text-secondary-light">{prescription.calculatedDoseMg} mg</p>
                                </div>
                            ))}
                            <Link to="/history" className="block text-center mt-4 text-sm text-primary dark:text-secondary font-semibold hover:underline">
                                Voir tout l'historique
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <Clock className="mx-auto text-gray-400" size={32} />
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Vos calculs récents apparaîtront ici.</p>
                            <Link to="/calculator" className="inline-block mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors text-sm">
                                Effectuer un premier calcul
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface ActionCardProps {
    to: string;
    icon: React.ElementType;
    title: string;
    description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ to, icon: Icon, title, description }) => (
    <Link to={to} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secondary">
        <div className="flex items-center space-x-4">
            <div className="bg-secondary-light dark:bg-secondary-dark/20 p-3 rounded-full">
                <Icon className="text-secondary-dark dark:text-secondary-light" size={28} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
        </div>
    </Link>
);

export default Home;
