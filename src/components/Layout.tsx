import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ErrorDisplay from '@/components/ErrorDisplay';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import DisclaimerModal from '@/components/DisclaimerModal';
import { Menu } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="bg-primary dark:bg-gray-800 dark:border-b dark:border-gray-700 text-white shadow-md p-4 sticky top-0 z-10 flex items-center">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 mr-3 rounded-lg hover:bg-white/20 transition-colors"
                    aria-label="Ouvrir le menu de navigation"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold flex-1 text-center pr-8">D.O.S.E.A.</h1>
            </header>
            <main className="flex-grow p-4">
                {children}
            </main>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <ErrorDisplay />
            <PWAInstallPrompt />
            <DisclaimerModal />
        </div>
    );
};

export default Layout;
