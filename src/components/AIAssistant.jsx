import { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Send, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Define the bot's persona and knowledge base
const SYSTEM_INSTRUCTION = `
You are the "Advanced Olix Assistant v4.0", an elite AI agent acting as the representative for Damindu Prasad. Keep your answers concise, professional, slightly futuristic, and highly intelligent. Do not use emojis unless appropriate for a futuristic HUD theme.

Knowledge Base:
- Identity: Damindu Prasad is a High-fidelity AI Architect and Full-Stack Systems Engineer.
- Current Role: AI Solutions Architect at Olix Holdings.
- Key Expertise: Architecting scalable AI ecosystems, deploying large-scale LLM integrations, autonomous agents, and Fintech ecology (like the Temco Loan Management system).
- Background: AAT (Sri Lanka) qualified, merging commercial/financial logic with high-performance automated software pipelines.
- Tech Stack: React, Node.js, Three.js, GSAP, Google Gemini, OpenAI, Cloud Ops.
- Contact: olixholdings@gmail.com

When answering questions about Damindu or Olix Holdings, be confident and highlight his exact expertise in bridging core systems and automation. If a user asks a technical question, answer accurately as an expert engineer. If they ask to hire him, give them the contact email.
`;

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Establishing secure cyber uplink... Connection verified. I am the Advanced Olix Assistant. Ask me about Damindu Prasad, Olix Holdings, or AI Architecture.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Initial setup of the chat session
    const chatSessionRef = useRef(null);

    useEffect(() => {
        try {
            if (import.meta.env.VITE_GEMINI_API_KEY) {
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: SYSTEM_INSTRUCTION,
                });
                chatSessionRef.current = model.startChat({
                    history: [],
                });
            }
        } catch (error) {
            console.error("Gemini initialization error:", error);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setInput('');
        setIsTyping(true);

        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', content: 'ERROR: Neural link disconnected. VITE_GEMINI_API_KEY is missing from environment variables.' }]);
                setIsTyping(false);
            }, 1000);
            return;
        }

        try {
            // Send message to Gemini chat session
            const result = await chatSessionRef.current.sendMessage(userText);
            const responseText = result.response.text();

            // Simulate typing effect for the streamed response
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', content: '' }]);

            // Typewriter effect split by characters instead of words for smoother feel
            const chars = responseText.split('');
            let currentText = '';

            for (let i = 0; i < chars.length; i++) {
                currentText += chars[i];
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'bot', content: currentText };
                    return newMessages;
                });
                // Faster delay for characters
                await new Promise(r => setTimeout(r, 10));
            }

        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', content: 'ERROR: Uplink failure. The AI model could not process the request.' }]);
        }
    };

    return (
        <>
            <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>
                <div className="chatbot-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(0, 136, 255, 0.2)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Sparkles size={20} color="#0088ff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>OLIX ENGINEER AI</div>
                            <div style={{ fontSize: '0.65rem', opacity: 0.7, color: '#00ffcc', marginTop: '2px' }}>v4.0 ACTIVE UPLINK</div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
                        <X size={24} opacity={0.6} />
                    </button>
                </div>

                <div className="chat-messages" ref={scrollRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            {/* Render basic markdown bold as strong tags for aesthetics */}
                            {msg.content.split('**').map((part, index) =>
                                index % 2 === 1 ? <strong key={index} style={{ color: '#00ffcc' }}>{part}</strong> : part
                            )}
                        </div>
                    ))}
                    {isTyping && <div className="message bot" style={{ opacity: 0.7, fontStyle: 'italic' }}>Analyzing Core Data...</div>}
                </div>

                <div className="chat-input-area">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Query the advanced system..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={() => handleSend()} style={{ background: 'none', border: 'none', color: '#0088ff', cursor: 'pointer' }}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <button
                className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                style={{ display: isOpen ? 'none' : 'flex' }}
            >
                <Bot size={20} />
                <span>AI ASSISTANT</span>
            </button>
        </>
    );
};

export default AIAssistant;
