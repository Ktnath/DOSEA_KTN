import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { calculatePrescription } from '@/domain/dosing';
import { Mic, MicOff, Loader2 } from 'lucide-react';

// SpeechRecognition Types for TypeScript
interface IWindow extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

export const VoiceAssistant: React.FC = () => {
    const { drugs, activeWeightKg, setActivePatient, addDrugToPrescription, showToast } = useAppStore();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [supported, setSupported] = useState(true);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = (window as IWindow).SpeechRecognition || (window as IWindow).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const currentTranscript = event.results[0][0].transcript;
            setTranscript(currentTranscript);
            processVoiceCommand(currentTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech Recognition Error:", event.error);
            setIsListening(false);
            if (event.error !== 'no-speech') {
                showToast(`Erreur micro: ${event.error}`, "error");
            }
        };

        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
    }, [drugs, activeWeightKg]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setTranscript('');
            try {
                recognitionRef.current?.start();
            } catch (e) {
                console.error("Could not start recognition", e);
            }
        }
    };

    const processVoiceCommand = (text: string) => {
        const lowerText = text.toLowerCase();

        // 1. Extract Weight (e.g. "12 kilos", "10 kg", "cinq kilos")
        let weight = activeWeightKg;
        const weightMatch = lowerText.match(/(\d+(?:[.,]\d+)?)\s*(kilo|kg)/i);
        if (weightMatch && weightMatch[1]) {
            weight = parseFloat(weightMatch[1].replace(',', '.'));
            setActivePatient(weight, null);
        }

        if (!weight) {
            showToast("Veuillez préciser le poids (ex: 10 kilos)", "error");
            return;
        }

        // 2. Identify Drug
        let matchedDrug = null;
        for (const drug of drugs) {
            // Simplified matching: check if the first word of the drug name is in the transcript
            const baseName = drug.name.split(' ')[0].toLowerCase().trim();

            // Check lev-distance conceptually. For MVP, we use simple includes
            if (lowerText.includes(baseName)) {
                matchedDrug = drug;
                break;
            }
        }

        if (matchedDrug) {
            const result = calculatePrescription({
                weightKg: weight,
                doseMgPerKg: matchedDrug.recommendedDoseMgPerKg,
                maxDoseMg: matchedDrug.maxDoseMg,
                maxDailyDoseMg: matchedDrug.maxDailyDoseMg,
                frequencyPerDay: matchedDrug.frequencyPerDay,
                concentrationMgPerMl: matchedDrug.concentrationMgPerMl,
                drugName: matchedDrug.name,
                drugClass: matchedDrug.class,
                drugSubClass: matchedDrug.subClass,
            });

            addDrugToPrescription(matchedDrug, result, { indication: 'Calcul vocal (urgence)' });
            showToast(`Calcul vocal : ${matchedDrug.name} pour ${weight}kg`, "success");
        } else {
            showToast("Médicament non reconnu. Répétez (ex: Adrénaline 10 kilos).", "error");
        }
    };

    if (!supported) return null;

    return (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg shadow-sm border border-red-100 dark:border-red-800/50 mb-6 flex flex-col md:flex-row items-center gap-4">

            <button
                onClick={toggleListening}
                className={`relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${isListening ? 'bg-red-600 animate-pulse ring-4 ring-red-300 dark:ring-red-900' : 'bg-secondary hover:bg-secondary-dark'
                    }`}
                aria-label="Mode Urgence Vocal"
            >
                {isListening ? <Loader2 size={28} className="animate-spin" /> : <Mic size={28} />}
                {isListening && <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>}
            </button>

            <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-bold text-red-800 dark:text-red-300 flex items-center justify-center md:justify-start gap-2">
                    Mode Urgence "Mains Libres"
                </h3>
                <p className="text-sm text-red-700/80 dark:text-red-200/80 mt-1">
                    Exemple : <span className="italic font-medium">"Calcule Adrénaline pour 12 kilos"</span>
                </p>
                {transcript && (
                    <div className="mt-2 text-sm bg-white dark:bg-gray-800 p-2 rounded italic text-gray-600 dark:text-gray-300">
                        "{transcript}"
                    </div>
                )}
            </div>

        </div>
    );
};
