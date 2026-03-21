import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, List, History, User, Bot, Star, ClipboardList } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/calculator', label: 'Calcul', icon: Calculator },
    { path: '/assistant', label: 'IA', icon: Bot },
    { path: '/drugs', label: 'Médocs', icon: List },
    { path: '/scores', label: 'Scores', icon: ClipboardList },
    { path: '/history', label: 'Historique', icon: History },
    { path: '/profile', label: 'Profil', icon: User },
];

const Navbar: React.FC = () => {
    const { profile } = useAppStore();
    const activeLinkClass = 'text-primary dark:text-secondary';
    const inactiveLinkClass = 'text-gray-500 dark:text-gray-400 hover:text-primary-dark dark:hover:text-secondary-light';

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40">
            <div className="flex justify-around max-w-xl mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full p-2 pt-3 transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
                        }
                    >
                        <div className="relative">
                            <item.icon size={22} />
                            {/* Visual indicator for Pro plan users */}
                            {item.path === '/profile' && profile.subscriptionPlan === 'Pro' && (
                                <span
                                    className="absolute -top-1 -right-1 flex items-center justify-center bg-yellow-400 rounded-full h-4 w-4 border-2 border-white dark:border-gray-800"
                                    title="Plan Pro"
                                >
                                    <Star size={8} className="text-yellow-900 fill-current" />
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
