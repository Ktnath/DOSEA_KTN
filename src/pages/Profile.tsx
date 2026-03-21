import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { UserProfile } from '@/types';
import { Star, Moon, Sun, Trash2, ShieldAlert, RotateCw, CheckCircle } from 'lucide-react';

const Profile: React.FC = () => {
    const { profile, updateProfile, theme, toggleTheme, clearHistory, resetLocalData } = useAppStore();
    const [formData, setFormData] = useState<UserProfile>({ name: '', specialty: '', unitPreference: 'mg' });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleClearHistory = async () => {
        if (window.confirm("CONFIRMATION : Supprimer définitivement tout l'historique de vos prescriptions ? Cette action est irréversible.")) {
            await clearHistory();
        }
    };

    const handleResetAll = async () => {
        if (window.confirm("ATTENTION : Cela supprimera vos préférences, vos médicaments personnalisés (overrides) et votre historique. La base de données officielle restera intacte. Continuer ?")) {
            await resetLocalData();
            window.location.reload();
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center text-primary-dark dark:text-primary-light">Compte & Préférences</h2>

            {/* Feedback messages */}
            {showSuccess && (
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-2 text-sm font-medium">
                    <CheckCircle size={18} /> Profil sauvegardé avec succès.
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-5">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {formData.name?.[0] || 'D'}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{formData.name || 'Praticien'}</h3>
                        <p className="text-xs text-gray-500">{formData.specialty || 'Pédiatrie'}</p>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nom complet</label>
                        <input
                            type="text" name="name" value={formData.name || ''} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-primary"
                            placeholder="Dr. Jean Dupont"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Spécialité</label>
                        <input
                            type="text" name="specialty" value={formData.specialty || ''} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Unité favorite</label>
                        <select
                            name="unitPreference" value={formData.unitPreference || 'mg'} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-primary"
                        >
                            <option value="mg">Milligrammes (mg)</option>
                            <option value="ml">Millilitres (ml)</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]">
                    Enregistrer les modifications
                </button>
            </form>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Personnalisation</h3>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mode Sombre</span>
                    <button
                        onClick={toggleTheme}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}>
                            {theme === 'dark' ? <Moon size={10} className="text-primary m-0.5" /> : <Sun size={10} className="text-gray-400 m-0.5" />}
                        </span>
                    </button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-secondary-light to-white dark:from-secondary-dark/10 dark:to-gray-800 p-6 rounded-2xl shadow-sm border border-secondary-dark/20">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-bold text-secondary-dark dark:text-secondary-light uppercase tracking-widest">Statut du compte</p>
                        <p className="text-2xl font-black text-primary-dark dark:text-primary-light">PLAN {profile.subscriptionPlan?.toUpperCase()}</p>
                    </div>
                    {profile.subscriptionPlan === 'Free' && (
                        <button className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-xl shadow-lg transition-transform active:scale-95">
                            <Star size={16} className="mr-2 fill-current" /> GO PRO
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-red-50/50 dark:bg-red-900/5 border border-red-100 dark:border-red-900/30 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                    <ShieldAlert size={18} /> Zone de Souveraineté Numérique
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                    En vertu du secret médical et de la gestion de vos données personnelles,
                    vous avez le contrôle total sur votre environnement local.
                </p>
                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={handleClearHistory}
                        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 py-2.5 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <Trash2 size={14} /> Effacer l'historique des prescriptions
                    </button>
                    <button
                        onClick={handleResetAll}
                        className="flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-red-200 dark:border-red-900/50"
                    >
                        <RotateCw size={14} /> Réinitialiser l'environnement local
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
