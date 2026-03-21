import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, List, History, User, Bot, Star, ClipboardList, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/calculator', label: 'Session Patient (Calcul)', icon: Calculator },
    { path: '/assistant', label: 'Assistant IA', icon: Bot },
    { path: '/drugs', label: 'Base de Médicaments', icon: List },
    { path: '/scores', label: 'Scores Cliniques', icon: ClipboardList },
    { path: '/history', label: 'Historique des Calculs', icon: History },
    { path: '/profile', label: 'Gérer le Profil', icon: User },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { profile } = useAppStore();

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            // Cleanup in case component unmounts
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar Drawer */}
            <aside
                className={`fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-primary dark:bg-gray-800 text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span>D.O.S.E.A.</span>
                    </h2>
                    <button onClick={onClose} className="p-2 -mr-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Fermer le menu">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-2">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 px-6 py-3 border-l-4 transition-colors duration-200 ${isActive
                                            ? 'bg-primary/10 text-primary-dark dark:text-primary-light border-primary font-bold'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent'}`
                                    }
                                >
                                    <div className="relative">
                                        <item.icon size={22} className={item.path === '/calculator' ? 'text-blue-500' : 'opacity-80'} />
                                        {item.path === '/profile' && profile.subscriptionPlan === 'Pro' && (
                                            <span
                                                className="absolute -top-1 -right-1 flex items-center justify-center bg-yellow-400 rounded-full h-3 w-3 border-2 border-white dark:border-gray-900"
                                                title="Plan Pro"
                                            >
                                                <Star size={6} className="text-yellow-900 fill-current" />
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[1.05rem]">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 text-center">
                    DOSEA v2.0 &bull; Dispositif Médical
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
