import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, Cpu } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ── 3D Mini Robot Avatar ────────────────────────────────────────────────────
const MiniRobot = ({ isTyping }) => {
    const headRef = useRef();

    useFrame((state) => {
        if (headRef.current) {
            headRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
            headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.25;
            if (isTyping) {
                headRef.current.rotation.z = (Math.random() - 0.5) * 0.08;
            } else {
                headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.1);
            }
        }
    });

    return (
        <group ref={headRef} scale={1.1}>
            {/* Head */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.4, 1.1, 1.4]} />
                <meshStandardMaterial color="#0d1117" metalness={0.8} roughness={0.2} wireframe />
            </mesh>
            {/* Left Eye */}
            <mesh position={[-0.35, 0.1, 0.71]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isTyping ? 4 : 1.5} />
            </mesh>
            {/* Right Eye */}
            <mesh position={[0.35, 0.1, 0.71]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={isTyping ? 4 : 1.5} />
            </mesh>
            {/* Antenna */}
            <mesh position={[0, 0.75, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.45]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <sphereGeometry args={[0.13, 16, 16]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isTyping ? 6 : 2} />
            </mesh>
            {/* Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.4, 0.02, 16, 80]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
            </mesh>

            <ambientLight intensity={1.2} color="#3b82f6" />
            <pointLight position={[0, 0, 2]} intensity={4} color="#06b6d4" />
        </group>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: "👋 Hi! I'm Damindu's AI assistant.\n\nAsk me anything about his skills, experience, projects, or how to get in touch. I'm here to help!"
        }
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
        const currentHistory = [...messages];

        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: currentHistory, newMessage: userText })
            });

            if (!response.ok) throw new Error(`Server error ${response.status}`);

            const result = await response.json();
            if (result.error) throw new Error(result.error);

            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', content: '' }]);

            const chars = result.reply.split('');
            let currentText = '';
            for (let i = 0; i < chars.length; i++) {
                currentText += chars[i];
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'bot', content: currentText };
                    return updated;
                });
                await new Promise(r => setTimeout(r, 12 + Math.random() * 15));
            }

        } catch (error) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: '⚠️ Connection error. Please try again or email olixholdings@gmail.com directly.'
            }]);
        }
    };

    const QUICK_PROMPTS = [
        "What's his tech stack?",
        "Show me his projects",
        "Is he available to hire?",
    ];

    return (
        <>
            {/* ── Chatbot Panel ───────────────────────────────────── */}
            <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>

                {/* Header */}
                <div className="chatbot-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.05)' }}>
                            <Canvas camera={{ position: [0, 0, 5] }}>
                                <MiniRobot isTyping={isTyping} />
                            </Canvas>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif' }}>Damindu's AI</div>
                            <div style={{ fontSize: '0.7rem', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                                Powered by Gemini
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ background: 'none', border: 'none', color: 'rgba(148,163,184,0.7)', cursor: 'pointer', padding: '0.4rem', borderRadius: '8px', transition: 'color 0.2s' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages" ref={scrollRef}>
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message ${msg.role}`}
                            style={{ whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}
                        >
                            {msg.content.split('**').map((part, index) =>
                                index % 2 === 1
                                    ? <strong key={index} style={{ color: '#f0f4ff' }}>{part}</strong>
                                    : part
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message bot" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0.75rem 1rem' }}>
                            {[0, 1, 2].map(i => (
                                <span key={i} style={{
                                    width: '6px', height: '6px', borderRadius: '50%',
                                    background: '#3b82f6',
                                    animation: `pulse-dot 1.2s ${i * 0.2}s ease-in-out infinite`
                                }} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Prompts */}
                {messages.length <= 1 && (
                    <div style={{ padding: '0 1rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {QUICK_PROMPTS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => { setInput(q); }}
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.75rem',
                                    color: '#3b82f6',
                                    background: 'rgba(59,130,246,0.08)',
                                    border: '1px solid rgba(59,130,246,0.2)',
                                    borderRadius: '100px',
                                    padding: '0.3rem 0.75rem',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="chat-input-area">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Ask about Damindu..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                width: '34px', height: '34px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'opacity 0.2s'
                            }}
                        >
                            <Send size={15} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── FAB Button ──────────────────────────────────────── */}
            <button
                className="chatbot-fab"
                onClick={() => setIsOpen(true)}
                style={{ display: isOpen ? 'none' : 'flex', cursor: 'pointer' }}
            >
                <div style={{ width: '30px', height: '30px', marginLeft: '-4px', flexShrink: 0 }}>
                    <Canvas camera={{ position: [0, 0, 5] }}>
                        <MiniRobot isTyping={false} />
                    </Canvas>
                </div>
                <span>AI Assistant</span>
                <Sparkles size={14} style={{ opacity: 0.7 }} />
            </button>
        </>
    );
};

export default AIAssistant;
