import { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Send, X } from 'lucide-react';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Establishing secure cyber uplink... Connection verified. I am the Advanced Olix Assistant. Ask me about Damindu Prasad, Olix Holdings, or AI Architecture.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input.trim();
        // Capture the history BEFORE adding the new user message
        const currentHistory = [...messages];

        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    history: currentHistory,
                    newMessage: userText
                })
            });

            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }

            const result = await response.json();

            if (result.error) {
                // Return gracefully if server has custom error string
                throw new Error(result.error);
            }

            const responseText = result.reply;

            // Simulate typing effect for the response
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
            console.error("Chat Server Error:", error);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', content: 'ERROR: Uplink failure. The AI server could not process the request.' }]);
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
