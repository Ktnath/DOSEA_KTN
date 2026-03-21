import { Preferences } from '@capacitor/preferences';

export interface IAPProduct {
    id: string;
    title: string;
    description: string;
    price: string;
    priceMicros: number;
    currency: string;
}

export interface IAPSubscription {
    id: string;
    title: string;
    description: string;
    price: string;
    priceMicros: number;
    currency: string;
    period: 'month' | 'year';
}

export interface Purchase {
    productId: string;
    purchaseToken: string;
    orderId: string;
    purchaseState: 'purchased' | 'pending' | 'cancelled';
    purchaseTime: number;
}

// Mock products - replace with real products from Google Play Console/App Store Connect
const MOCK_PRODUCTS: IAPProduct[] = [
    {
        id: 'dosea_pro_monthly',
        title: 'DOSEA Pro - Mensuel',
        description: 'Accès illimité aux calculs de dosage et historique complet',
        price: '4.99€',
        priceMicros: 4990000,
        currency: 'EUR'
    },
    {
        id: 'dosea_pro_yearly',
        title: 'DOSEA Pro - Annuel',
        description: 'Accès illimité avec 2 mois gratuits par an',
        price: '49.99€',
        priceMicros: 49990000,
        currency: 'EUR'
    }
];

const PURCHASE_KEY = 'dosea_mock_purchase';
const SUBSCRIPTION_STATUS_KEY = 'dosea_subscription_status';

class IAPService {
    private isMockMode = true; // Set to false when real IAP is implemented
    private purchasedProducts: Set<string> = new Set();

    async initialize(): Promise<void> {
        if (this.isMockMode) {
            await this.loadMockPurchases();
            return;
        }
        // Real IAP initialization will go here
    }

    async loadMockPurchases(): Promise<void> {
        try {
            const savedPurchase = await Preferences.get({ key: PURCHASE_KEY });
            const _subscriptionStatus = await Preferences.get({ key: SUBSCRIPTION_STATUS_KEY });

            if (savedPurchase.value) {
                const purchase: Purchase = JSON.parse(savedPurchase.value);
                this.purchasedProducts.add(purchase.productId);
            }
        } catch (error) {
            console.error('Error loading mock purchases:', error);
        }
    }

    async getProducts(): Promise<IAPProduct[]> {
        if (this.isMockMode) {
            return MOCK_PRODUCTS;
        }
        // Real IAP implementation will go here
        return [];
    }

    async getSubscriptions(): Promise<IAPSubscription[]> {
        if (this.isMockMode) {
            return MOCK_PRODUCTS.map(product => ({
                ...product,
                period: product.id.includes('yearly') ? 'year' as const : 'month' as const
            }));
        }
        // Real IAP implementation will go here
        return [];
    }

    async purchaseProduct(productId: string): Promise<{ success: boolean; error?: string }> {
        if (this.isMockMode) {
            return this.mockPurchase(productId);
        }
        // Real IAP implementation will go here
        return { success: false, error: 'Real IAP not implemented yet' };
    }

    async restorePurchases(): Promise<{ success: boolean; purchases: Purchase[] }> {
        if (this.isMockMode) {
            const savedPurchase = await Preferences.get({ key: PURCHASE_KEY });
            if (savedPurchase.value) {
                const purchase: Purchase = JSON.parse(savedPurchase.value);
                return { success: true, purchases: [purchase] };
            }
            return { success: true, purchases: [] };
        }
        // Real IAP implementation will go here
        return { success: false, purchases: [] };
    }

    async isSubscribed(): Promise<boolean> {
        if (this.isMockMode) {
            return this.purchasedProducts.has('dosea_pro_monthly') ||
                this.purchasedProducts.has('dosea_pro_yearly');
        }
        // Real IAP implementation will go here
        return false;
    }

    async getActiveSubscription(): Promise<IAPSubscription | null> {
        if (this.isMockMode) {
            if (this.purchasedProducts.has('dosea_pro_yearly')) {
                return { ...MOCK_PRODUCTS[1], period: 'year' };
            }
            if (this.purchasedProducts.has('dosea_pro_monthly')) {
                return { ...MOCK_PRODUCTS[0], period: 'month' };
            }
            return null;
        }
        // Real IAP implementation will go here
        return null;
    }

    private async mockPurchase(productId: string): Promise<{ success: boolean; error?: string }> {
        try {
            // Simulate purchase delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockPurchase: Purchase = {
                productId,
                purchaseToken: `mock_token_${Date.now()}`,
                orderId: `mock_order_${Date.now()}`,
                purchaseState: 'purchased',
                purchaseTime: Date.now()
            };

            await Preferences.set({
                key: PURCHASE_KEY,
                value: JSON.stringify(mockPurchase)
            });

            await Preferences.set({
                key: SUBSCRIPTION_STATUS_KEY,
                value: 'active'
            });

            this.purchasedProducts.add(productId);

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Mock purchase failed' };
        }
    }

    async clearMockPurchases(): Promise<void> {
        await Preferences.remove({ key: PURCHASE_KEY });
        await Preferences.remove({ key: SUBSCRIPTION_STATUS_KEY });
        this.purchasedProducts.clear();
    }
}

export const iapService = new IAPService();
