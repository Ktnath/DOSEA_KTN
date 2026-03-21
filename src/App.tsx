import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import Layout from '@/components/Layout';
import { db, seedDatabase } from '@/services/db';

const Home = lazy(() => import('@/pages/Home'));
const Calculator = lazy(() => import('@/pages/Calculator'));
const DrugList = lazy(() => import('@/pages/DrugList'));
const History = lazy(() => import('@/pages/History'));
const Profile = lazy(() => import('@/pages/Profile'));
const Assistant = lazy(() => import('@/pages/Assistant'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Scores = lazy(() => import('@/pages/Scores'));

const App: React.FC = () => {
    const { initialize, setError, theme } = useAppStore();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const init = async () => {
            try {
                await seedDatabase();
                const drugs = await db.drugs.toArray();
                const history = await db.prescriptions.toArray();
                const profile = JSON.parse(localStorage.getItem('dosea-profile') || '{}');
                initialize({ drugs, history, profile });
            } catch (error) {
                console.error("Initialization failed:", error);
                setError("Erreur critique: Impossible de charger les données de l'application. Veuillez rafraîchir la page.");
            }
        };
        init();
    }, [initialize, setError]);

    return (
        <HashRouter>
            <Layout>
                <Suspense fallback={<div className="flex justify-center items-center h-64 text-primary dark:text-secondary-light">Chargement...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/drugs" element={<DrugList />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/assistant" element={<Assistant />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/scores" element={<Scores />} />
                    </Routes>
                </Suspense>
            </Layout>
        </HashRouter>
    );
};

export default App;
