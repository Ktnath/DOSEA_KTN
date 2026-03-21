import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

const PWAInstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already installed (standalone mode)
        const standalone = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone ||
            document.referrer.includes('android-app://');

        setIsStandalone(standalone);

        if (standalone) {
            return; // Don't show install prompt if already installed
        }

        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler as EventListener);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as EventListener);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
        setShowBanner(false);
    };

    const handleClose = () => {
        setShowBanner(false);
    };

    if (!showBanner || isStandalone) {
        return null;
    }

    return (
        <div className="pwa-install-banner show">
            <Download size={20} />
            <div>
                <p className="font-semibold">Installer D.O.S.E.A.</p>
                <p className="text-sm opacity-90">Ajoutez l'application à votre écran d'accueil</p>
            </div>
            <button onClick={handleInstallClick} className="ml-auto">
                Installer
            </button>
            <button onClick={handleClose} className="close">
                <X size={16} />
            </button>
        </div>
    );
};

export default PWAInstallPrompt;
