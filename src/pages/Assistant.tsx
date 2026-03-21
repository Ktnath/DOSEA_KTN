import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const Assistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Bonjour Docteur. Je suis votre assistant D.O.S.E.A. Comment puis-je vous aider aujourd'hui ? Je peux vous conseiller sur des posologies ou des protocoles pédiatriques." }
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
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const drugContext = drugs.map(d => `${d.name} (${d.class}): ${d.recommendedDoseMgPerKg}mg/kg, max ${d.maxDoseMg}mg`).join('\n');

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-05-20',
                contents: userMsg,
                config: {
                    systemInstruction: `Tu es un assistant clinique expert en pédiatrie pour l'application D.O.S.E.A. 
                    Ton rôle est d'aider les médecins avec des calculs de doses, des conseils sur les médicaments et des protocoles cliniques. 
                    Sois précis, professionnel et concis. 
                    Voici les médicaments actuellement dans la base de données de l'utilisateur :\n${drugContext}\n
                    Avertis toujours que tes réponses sont des suggestions et que la décision finale revient au clinicien.`,
                },
            });

            const aiText = response.text || "Désolé, je n'ai pas pu générer de réponse.";
            setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Erreur de connexion avec l'IA. Vérifiez votre connexion et votre clé API dans .env.local." }]);
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
                    <p className="text-xs opacity-80">Propulsé par Gemini</p>
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
