import React, { useState, useEffect } from 'react';
import { iapService, IAPSubscription } from '@/services/iapService';
import { useAppStore } from '@/store/useAppStore';
import { Crown, RefreshCw, Check, Loader } from 'lucide-react';

const SubscriptionManager: React.FC = () => {
    const { isSubscribed, purchaseSubscription, restorePurchases, refreshSubscriptionStatus } = useAppStore();
    const [subscriptions, setSubscriptions] = useState<IAPSubscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        try {
            setLoading(true);
            const subs = await iapService.getSubscriptions();
            setSubscriptions(subs);
        } catch (error) {
            console.error('Error loading subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (productId: string) => {
        try {
            setPurchaseLoading(productId);
            const result = await purchaseSubscription(productId);

            if (!result.success) {
                console.error('Purchase failed:', result.error);
            }
        } catch (error) {
            console.error('Purchase error:', error);
        } finally {
            setPurchaseLoading(null);
        }
    };

    const handleRestore = async () => {
        try {
            setLoading(true);
            const result = await restorePurchases();

            if (!result.success) {
                console.error('Restore failed:', result.error);
            }
        } catch (error) {
            console.error('Restore error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        try {
            setLoading(true);
            await refreshSubscriptionStatus();
        } catch (error) {
            console.error('Refresh error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold flex items-center">
                            <Crown className="h-5 w-5 mr-2" />
                            Statut d'abonnement
                        </h3>
                        <p className="text-sm opacity-90">
                            {isSubscribed ? (
                                <span className="flex items-center">
                                    <Check className="h-4 w-4 mr-1" />
                                    Abonné Pro
                                </span>
                            ) : (
                                'Plan gratuit'
                            )}
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Subscription Plans */}
            {!isSubscribed && (
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Choisissez votre plan
                    </h4>

                    {subscriptions.map((subscription) => (
                        <div
                            key={subscription.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                                        {subscription.title}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {subscription.description}
                                    </p>
                                    <p className="text-lg font-bold text-primary mt-1">
                                        {subscription.price}
                                        {subscription.period === 'year' && (
                                            <span className="text-sm text-green-600 dark:text-green-400 ml-1">
                                                (Économisez 17%)
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handlePurchase(subscription.id)}
                                    disabled={purchaseLoading === subscription.id}
                                    className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {purchaseLoading === subscription.id ? (
                                        <Loader className="animate-spin h-4 w-4" />
                                    ) : (
                                        'S\'abonner'
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pro Benefits */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Avantages Pro
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Calculs de dosage illimités
                    </li>
                    <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Historique complet des prescriptions
                    </li>
                    <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Support prioritaire
                    </li>
                    <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Mises à jour premium
                    </li>
                </ul>
            </div>

            {/* Restore Purchases */}
            <div className="text-center">
                <button
                    onClick={handleRestore}
                    className="text-primary hover:text-primary-dark text-sm underline transition-colors"
                    disabled={loading}
                >
                    Restaurer mes achats
                </button>
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                <p>
                    L'abonnement sera facturé sur votre compte Google Play/App Store.
                    Il se renouvelle automatiquement sauf si le renouvellement automatique est désactivé au moins 24 heures avant la fin de la période en cours.
                </p>
            </div>
        </div>
    );
};

export default SubscriptionManager;
