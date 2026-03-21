import React from 'react';
import { Activity, Droplet } from 'lucide-react';
import { DilutionInfo } from '@/types';

interface IVFlowCalculatorProps {
    doseMg: number;
    dilution?: DilutionInfo;
    weightKg: number;
}

export const IVFlowCalculator: React.FC<IVFlowCalculatorProps> = ({ doseMg, dilution, weightKg }) => {
    if (!dilution) return null;

    // IV Math
    let totalVolumeMl: number | null = null;
    let rateMlHr: number | null = null;
    let dropsPerMin: number | null = null;
    let durationStr: string = '';

    if (dilution.standardConcentrationMgPerMl) {
        totalVolumeMl = parseFloat((doseMg / dilution.standardConcentrationMgPerMl).toFixed(2));
    }

    if (totalVolumeMl && dilution.bolusTimeMinutes) {
        // Rate in ml/h = (Vol / mins) * 60
        rateMlHr = parseFloat(((totalVolumeMl / dilution.bolusTimeMinutes) * 60).toFixed(1));

        // Drops/min = (Vol * 60 drops/ml) / mins  (using 60 drops/ml for pediatric microdrip)
        dropsPerMin = Math.round((totalVolumeMl * 60) / dilution.bolusTimeMinutes);
        durationStr = `${dilution.bolusTimeMinutes} min`;
    }

    if (dilution.continuousInfusion) {
        durationStr = "Perfusion continue";
    }

    return (
        <div className="mt-2 text-sm bg-blue-50 dark:bg-blue-900/20 rounded p-3 border-l-2 border-blue-400">
            <div className="flex items-start gap-2 mb-1">
                <Droplet size={16} className="text-blue-500 mt-0.5" />
                <span className="font-semibold text-blue-800 dark:text-blue-300">Paramètres IV : {dilution.fluid}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
                {totalVolumeMl && (
                    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">
                        <span className="text-xs text-gray-500">Volume Total</span>
                        <div className="font-bold">{totalVolumeMl} mL</div>
                    </div>
                )}
                {durationStr && (
                    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">
                        <span className="text-xs text-gray-500">Durée</span>
                        <div className="font-bold">{durationStr}</div>
                    </div>
                )}
            </div>

            {(rateMlHr || dropsPerMin) && (
                <div className="mt-2 flex items-center justify-between text-blue-900 dark:text-blue-200">
                    {rateMlHr && <span><Activity size={14} className="inline mr-1" />{rateMlHr} mL/h</span>}
                    {dropsPerMin && <span>Débit pédiatrique: {dropsPerMin} gttes/min</span>}
                </div>
            )}
        </div>
    );
};
