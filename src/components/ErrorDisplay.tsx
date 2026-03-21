import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { XCircle } from 'lucide-react';

const ErrorDisplay: React.FC = () => {
    const { error, clearError } = useAppStore();

    if (!error) {
        return null;
    }

    return (
        <div
            className="fixed bottom-20 sm:bottom-4 right-4 max-w-sm w-full bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-600 dark:text-red-200 p-4 rounded-md shadow-lg z-50 flex justify-between items-center"
            role="alert"
            aria-live="assertive"
        >
            <div>
                <p className="font-bold">Erreur</p>
                <p>{error}</p>
            </div>
            <button onClick={clearError} aria-label="Fermer l'alerte" className="p-1 -mr-2">
                <XCircle className="h-6 w-6 text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100" />
            </button>
        </div>
    );
};

export default ErrorDisplay;
