import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Drug } from '@/types';
import { Search, Filter, X } from 'lucide-react';

const DrugList: React.FC = () => {
    const { drugs, isLoading } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedSubClass, setSelectedSubClass] = useState<string | null>(null);

    // Cascading selection handlers
    const handleSystemSelect = (sys: string | null) => {
        setSelectedSystem(sys);
        setSelectedClass(null);
        setSelectedSubClass(null);
    };

    const handleClassSelect = (cls: string | null) => {
        setSelectedClass(cls);
        setSelectedSubClass(null);
    };

    // Extract unique systems, classes, subClasses statically and dynamically
    const { systems, classes, subClasses } = useMemo(() => {
        const sys = new Set<string>();
        const cls = new Set<string>();
        const sub = new Set<string>();

        drugs.forEach(d => {
            if (d.system) sys.add(d.system);

            // Only add to 'classes' if it matches the selectedSystem (or no system selected)
            if (!selectedSystem || d.system === selectedSystem) {
                if (d.class) cls.add(d.class);
            }

            // Only add to 'subClasses' if a SPECIFIC class is selected
            const matchesSys = !selectedSystem || d.system === selectedSystem;

            if (selectedClass && d.class === selectedClass && matchesSys) {
                if (d.subClass) sub.add(d.subClass);
            }
        });

        return {
            systems: Array.from(sys).sort(),
            classes: Array.from(cls).sort(),
            subClasses: Array.from(sub).sort()
        };
    }, [drugs, selectedSystem, selectedClass]);

    const filteredDrugs = useMemo(() => {
        return drugs.filter(drug => {
            const matchesSearch = !searchTerm ||
                drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                drug.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (drug.subClass && drug.subClass.toLowerCase().includes(searchTerm.toLowerCase())) ||
                drug.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (drug.notes && drug.notes.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesSystem = !selectedSystem || drug.system === selectedSystem;
            const matchesClass = !selectedClass || drug.class === selectedClass;
            const matchesSubClass = !selectedSubClass || drug.subClass === selectedSubClass;

            return matchesSearch && matchesSystem && matchesClass && matchesSubClass;
        });
    }, [drugs, searchTerm, selectedSystem, selectedClass, selectedSubClass]);

    if (isLoading) {
        return <div>Chargement de la liste des médicaments...</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-primary-dark dark:text-primary-light mb-6">Liste des Médicaments</h2>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher par nom, classe, voie, notes..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary dark:placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="space-y-3">
                    {/* System Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Systèmes :</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleSystemSelect(null)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${!selectedSystem ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            Tous
                        </button>
                        {systems.map(sys => (
                            <button
                                key={sys}
                                onClick={() => handleSystemSelect(sys)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition ${selectedSystem === sys ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                {sys}
                            </button>
                        ))}
                    </div>

                    {/* Class Filter */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Classes :</span>
                        <button
                            onClick={() => handleClassSelect(null)}
                            className={`px-3 py-1 text-xs font-medium transition hover:underline ${!selectedClass ? 'text-secondary font-bold' : 'text-gray-500'}`}
                        >
                            Toutes
                        </button>
                        {classes.map(cls => (
                            <button
                                key={cls}
                                onClick={() => handleClassSelect(cls === selectedClass ? null : cls)}
                                className={`px-3 py-1 text-xs font-medium transition hover:underline truncate max-w-[150px] ${selectedClass === cls ? 'text-secondary font-bold' : 'text-gray-500'}`}
                                title={cls}
                            >
                                {cls}
                            </button>
                        ))}
                    </div>

                    {/* SubClass Filter (Dynamic, only when subClasses exist in the current selection) */}
                    {subClasses.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Sous-classes :</span>
                            <button
                                onClick={() => setSelectedSubClass(null)}
                                className={`px-3 py-1 text-xs font-medium transition hover:underline ${!selectedSubClass ? 'text-secondary font-bold' : 'text-gray-500'}`}
                            >
                                Toutes
                            </button>
                            {subClasses.map(subCls => (
                                <button
                                    key={subCls}
                                    onClick={() => setSelectedSubClass(subCls === selectedSubClass ? null : subCls)}
                                    className={`px-3 py-1 text-xs font-medium transition hover:underline bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 ${selectedSubClass === subCls ? 'border-secondary text-secondary font-bold shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
                                    title={subCls}
                                >
                                    {subCls}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                {filteredDrugs.length} médicament(s) trouvé(s)
            </div>

            <div className="space-y-6">
                {filteredDrugs.length > 0 ? (
                    // Grouping logic inside JSX for rendering
                    Object.entries(
                        filteredDrugs.reduce((acc, drug) => {
                            const system = drug.system || 'Général';
                            const drugClass = drug.subClass ? `${drug.class} (${drug.subClass})` : drug.class || 'Autre';
                            if (!acc[system]) acc[system] = {};
                            if (!acc[system][drugClass]) acc[system][drugClass] = [];
                            acc[system][drugClass].push(drug);
                            return acc;
                        }, {} as Record<string, Record<string, Drug[]>>)
                    ).sort(([sysA], [sysB]) => sysA.localeCompare(sysB)).map(([system, classesMap]) => (
                        <div key={system} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* System Header */}
                            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-3 border-b border-primary/20 dark:border-primary/30">
                                <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                                    {system}
                                </h3>
                            </div>

                            <div className="p-4 space-y-6">
                                {Object.entries(classesMap).sort(([clsA], [clsB]) => clsA.localeCompare(clsB)).map(([drugClass, drugsInClass]) => (
                                    <div key={drugClass} className="space-y-3">
                                        {/* Class Sub-header */}
                                        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-1">
                                            {drugClass}
                                            <span className="text-xs font-normal text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{drugsInClass.length}</span>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2 border-l-2 border-gray-100 dark:border-gray-700">
                                            {drugsInClass.map(drug => (
                                                <DrugCard key={drug.id} drug={drug} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <Search className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-gray-500 dark:text-gray-400">Aucun médicament correspond à ces filtres.</p>
                        <button onClick={() => { setSearchTerm(''); setSelectedSystem(null); setSelectedClass(null); }} className="mt-4 text-primary font-medium hover:underline">
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const DrugCard: React.FC<{ drug: Drug }> = ({ drug }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded uppercase tracking-wider">
                            {drug.system || "Général"}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{drug.name}</h3>
                    <p className="text-sm text-secondary-dark dark:text-secondary-light font-medium">{drug.class}</p>
                </div>
                <div className="text-right">
                    <p className="text-md font-semibold text-primary dark:text-secondary">{drug.recommendedDoseMgPerKg} mg/kg</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">par prise</p>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Voie :</strong> {drug.route}</p>
                <div className="flex justify-between">
                    <p><strong>Max/prise :</strong> {drug.maxDoseMg} mg</p>
                    {drug.maxDailyDoseMg && <p><strong>Max/jour :</strong> {drug.maxDailyDoseMg} mg</p>}
                </div>
                {drug.frequencyPerDay && <p><strong>Fréquence recommandée :</strong> {drug.frequencyPerDay}x/jour</p>}
                {drug.indications && <p><strong>Indications :</strong> {drug.indications}</p>}

                {drug.dilution && (
                    <div className="mt-2 text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-800/50">
                        <strong>Dilution IV standard :</strong> {drug.dilution.fluid}
                        {drug.dilution.standardConcentrationMgPerMl ? ` (${drug.dilution.standardConcentrationMgPerMl} mg/mL)` : ''}
                        {drug.dilution.bolusTimeMinutes ? ` sur ${drug.dilution.bolusTimeMinutes} min` : ''}
                        {drug.dilution.continuousInfusion ? " (Perfusion continue)" : ''}
                    </div>
                )}

                {drug.notes && <p className="mt-2 text-xs italic bg-gray-50 dark:bg-gray-700/50 p-2 rounded border border-gray-100 dark:border-gray-600"><strong>Note :</strong> {drug.notes}</p>}
            </div>
        </div>
    );
};

export default DrugList;
