import { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Send, Minus, X } from 'lucide-react';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Establishing secure cyber uplink... Connection verified. I am the **Advanced Olix Assistant v3.1**. How shall we proceed?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const botKnowledge = {
        "automation": "Damindu architects AI-driven business automation using custom LLM integrations and intelligent workflow design. At Olix Holdings, he leads the transformation of traditional bottlenecks into scalable automated systems.",
        "aat": "As an AAT (Sri Lanka) qualified professional, Damindu possesses a deep understanding of commercial DNA and financial logic, which informs his software architectural decisions.",
        "fintech": "He specializes in high-fidelity FinTech ecosystems, including the Temco Loan Management system. These systems are designed for high-stakes data integrity and global scalability.",
        "olix": "Olix Holdings is the innovation hub where Damindu leads projects in Enterprise Communications (CCM) and AI-driven automation for global clients.",
        "qualifications": "Damindu is an AAT Sri Lanka qualified professional, an AI Solutions Architect, and a Full-Stack Systems Engineer with expertise in React, Node.js, and Three.js."
    };

    const handleSend = async (textInput) => {
        const text = textInput || input;
        if (!text.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setInput('');
        setIsTyping(true);

        await new Promise(r => setTimeout(r, 800));

        let response = "I've processed your query through the Olix Logic Engine. Would you like to deep-dive into Damindu's AI architecture or his commercial background?";
        const lowerInput = text.toLowerCase();

        if (lowerInput.includes('ai') || lowerInput.includes('automation')) response = botKnowledge.automation;
        else if (lowerInput.includes('aat') || lowerInput.includes('commerce') || lowerInput.includes('qualifications')) response = botKnowledge.aat + " " + botKnowledge.qualifications;
        else if (lowerInput.includes('fintech') || lowerInput.includes('loan')) response = botKnowledge.fintech;
        else if (lowerInput.includes('olix')) response = botKnowledge.olix;

        setIsTyping(false);

        const words = response.split(' ');
        let currentResponse = '';
        setMessages(prev => [...prev, { role: 'bot', content: '' }]);

        for (let word of words) {
            currentResponse += word + ' ';
            setMessages(prev => {
                const last = prev[prev.length - 1];
                return [...prev.slice(0, -1), { ...last, content: currentResponse }];
            });
            await new Promise(r => setTimeout(r, 30));
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
                            <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>v3.1 CYBER CORE</div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
                        <X size={24} opacity={0.6} />
                    </button>
                </div>

                <div className="chat-messages" ref={scrollRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))}
                    {isTyping && <div className="message bot">Analyzing Logic Engine...</div>}
                </div>

                <div className="chat-input-area">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Query the system..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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
