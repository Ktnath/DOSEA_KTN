import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { buildAssistantSystemInstruction, detectDoseRequest } from '@/domain/assistant/assistantGuard';
import { answerLocalDrugQuery, detectLocalDrugQuery } from '@/domain/assistant/localDrugQueries';
import { AI_UNAVAILABLE_MESSAGE } from '@/domain/assistant/aiUnavailableMessage';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const DOSE_REDIRECT_MESSAGE = "Je ne calcule pas de doses : merci d'utiliser le calculateur sécurisé de D.O.S.E.A. pour obtenir une posologie fiable et traçable.";

const Assistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Bonjour Docteur. Je suis votre assistant D.O.S.E.A. Je peux vous aider à rechercher un médicament, expliquer un protocole déjà calculé ou vous orienter dans l'application. L'IA n'effectue pas les calculs de dose. Utilisez le calculateur sécurisé." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { drugs } = useAppStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

        if (detectDoseRequest(userMsg)) {
            setMessages(prev => [...prev, { role: 'assistant', content: DOSE_REDIRECT_MESSAGE }]);
            return;
        }

        if (detectLocalDrugQuery(userMsg)) {
            setMessages(prev => [...prev, { role: 'assistant', content: answerLocalDrugQuery(userMsg) }]);
            return;
        }

        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const drugContext = drugs.map(d => ({ name: d.name, class: d.class }));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-05-20',
                contents: userMsg,
                config: {
                    systemInstruction: buildAssistantSystemInstruction(drugContext),
                },
            });

            const aiText = response.text || "Désolé, je n'ai pas pu générer de réponse.";
            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error(error);
            }
            setMessages(prev => [...prev, { role: 'assistant', content: AI_UNAVAILABLE_MESSAGE }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-primary p-4 text-white flex items-center gap-3">
                <Bot size={24} />
                <div>
                    <h2 className="font-bold">Assistant Clinique IA</h2>
                    <p className="text-xs opacity-80">L'IA n'effectue pas les calculs de dose. Utilisez le calculateur sécurisé.</p>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 ${m.role === 'user'
                                ? 'bg-primary text-white rounded-tr-none'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'
                            }`}>
                            <div className="flex-shrink-0 mt-1">
                                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin text-primary" />
                            <span className="text-xs text-gray-500">L'IA réfléchit...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez une question clinique..."
                    className="flex-grow px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default Assistant;
