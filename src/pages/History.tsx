import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Prescription } from '@/types';
import { Search, Download, Lock, RefreshCcw } from 'lucide-react';
import jsPDF from 'jspdf';

const History: React.FC = () => {
    const { history, isLoading, profile } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredHistory = useMemo(() => {
        return history.filter(p => {
            const nameMatch = p.drugName.toLowerCase().includes(searchTerm.toLowerCase());

            const prescriptionDay = p.date.split('T')[0];
            const startMatch = !startDate || prescriptionDay >= startDate;
            const endMatch = !endDate || prescriptionDay <= endDate;

            return nameMatch && startMatch && endMatch;
        });
    }, [history, searchTerm, startDate, endDate]);

    const exportToPDF = (prescription: Prescription) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Prescription D.O.S.E.A.", 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Prescrit par: ${profile.name || 'N/A'} (${profile.specialty || 'N/A'})`, 14, 40);
        doc.text(`Date: ${new Date(prescription.date).toLocaleString('fr-FR')}`, 14, 47);

        doc.setLineWidth(0.5);
        doc.line(14, 55, 196, 55);

        doc.setFontSize(14);
        doc.text("Détails de la Prescription", 14, 65);

        doc.setFontSize(12);
        let y = 75;
        const line = (text: string) => { doc.text(text, 14, y); y += 7; };

        line(`Patient: ${prescription.patientAgeYears} ans, ${prescription.patientWeightKg} kg`);
        if (prescription.patientId) line(`Identifiant patient (anonymisé): ${prescription.patientId}`);
        line(`Médicament: ${prescription.drugName}`);
        if (prescription.indication) line(`Indication: ${prescription.indication}`);
        line(`Posologie calculée: ${prescription.calculatedDoseMg} mg par prise`);
        if (prescription.calculatedVolumeMl) {
            line(`Volume calculé: ${prescription.calculatedVolumeMl} ml${prescription.concentrationMgPerMl ? ` (concentration: ${prescription.concentrationMgPerMl} mg/ml)` : ''}`);
        }
        if (prescription.explanationFormula) line(`Formule: ${prescription.explanationFormula}`);
        if (prescription.explanationSummary) {
            const summaryLines = doc.splitTextToSize(`Résumé: ${prescription.explanationSummary}`, 180);
            doc.text(summaryLines, 14, y);
            y += summaryLines.length * 7;
        }
        if (prescription.source) {
            const sourceLines = doc.splitTextToSize(`Source / règle: ${prescription.source}`, 180);
            doc.text(sourceLines, 14, y);
            y += sourceLines.length * 7;
        }
        if (prescription.alerts && prescription.alerts.length > 0) {
            y += 3;
            doc.setFontSize(13);
            line('Alertes cliniques générées:');
            doc.setFontSize(12);
            prescription.alerts.forEach(a => {
                const alertLines = doc.splitTextToSize(`- [${a.severity}] ${a.message}`, 180);
                doc.text(alertLines, 14, y);
                y += alertLines.length * 7;
            });
        }

        doc.save(`prescription-${prescription.drugName}-${new Date(prescription.date).toISOString().split('T')[0]}.pdf`);
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setStartDate('');
        setEndDate('');
    };


    if (isLoading) {
        return <div>Chargement de l'historique...</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-primary-dark dark:text-primary-light mb-6">Historique des Prescriptions</h2>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher par médicament..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary dark:placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de début</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary dark:placeholder-gray-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de fin</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary dark:placeholder-gray-400"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleResetFilters}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                        aria-label="Réinitialiser les filtres"
                    >
                        <RefreshCcw size={16} />
                        Réinitialiser
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {filteredHistory.length > 0 ? filteredHistory.map((p: Prescription) => (
                    <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{p.drugName}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(p.date).toLocaleString('fr-FR')}</p>
                            </div>
                            {profile.subscriptionPlan === 'Pro' ? (
                                <button onClick={() => exportToPDF(p)} className="p-2 text-primary dark:text-secondary hover:text-primary-dark dark:hover:text-secondary-light" title="Exporter en PDF">
                                    <Download size={24} />
                                </button>
                            ) : (
                                <div className="relative group">
                                    <button className="p-2 text-gray-400 cursor-not-allowed" disabled>
                                        <Lock size={24} />
                                    </button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 dark:bg-gray-900 text-white dark:text-gray-200 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        Disponible avec le plan Pro
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            <p><strong>Patient:</strong> {p.patientAgeYears} ans, {p.patientWeightKg} kg{p.patientId ? ` (ID: ${p.patientId})` : ''}</p>
                            {p.indication && <p><strong>Indication:</strong> {p.indication}</p>}
                            <p><strong>Dose calculée:</strong> <span className="font-bold">{p.calculatedDoseMg} mg</span></p>
                            {p.calculatedVolumeMl && <p><strong>Volume:</strong> <span className="font-bold">{p.calculatedVolumeMl} ml</span></p>}
                            {p.alerts && p.alerts.length > 0 && (
                                <p><strong>Alertes:</strong> {p.alerts.length} générée(s)</p>
                            )}
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Aucun historique trouvé pour les filtres sélectionnés.</p>
                )}
            </div>
        </div>
    );
};

export default History;
