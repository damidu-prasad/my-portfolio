import { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Send, X, TerminalSquare } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';

// ── 3D Mini Robot Avatar ──────────────────────────────────
const MiniRobot = ({ isTyping }) => {
    const headRef = useRef();
    
    useFrame((state, delta) => {
        if (headRef.current) {
            // Hover and slight look around
            headRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
            headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
            
            // Jitter when typing
            if (isTyping) {
                headRef.current.rotation.z = (Math.random() - 0.5) * 0.1;
                headRef.current.rotation.x = (Math.random() - 0.5) * 0.1;
            } else {
                headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.1);
                headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.1);
            }
        }
    });

    return (
        <group ref={headRef} scale={1.2}>
            {/* Box Head */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.5, 1.2, 1.5]} />
                <meshStandardMaterial color="#051414" metalness={0.8} roughness={0.2} wireframe={true} />
            </mesh>
            
            {/* Left Eye */}
            <mesh position={[-0.4, 0.1, 0.76]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={isTyping ? 3 : 1} />
            </mesh>
            
            {/* Right Eye */}
            <mesh position={[0.4, 0.1, 0.76]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={isTyping ? 3 : 1} />
            </mesh>

            {/* Antenna Pole */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.5]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
            </mesh>
            
            {/* Antenna Bulb */}
            <mesh position={[0, 1.1, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={isTyping ? 5 : 2} />
            </mesh>

            {/* Floating rings */}
            <mesh rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[1.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" />
            </mesh>
            
            <ambientLight intensity={1} color="#00ff00" />
            <pointLight position={[0, 0, 2]} intensity={5} color="#00ff00" />
        </group>
    );
};

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: '> ESTABLISHING SECURE CYBER UPLINK...\n> CONNECTION VERIFIED.\n> I AM THE ADVANCED OLIX ASSISTANT.\n> QUERY DAMINDU PRASAD, OLIX HOLDINGS, OR AI ARCHITECTURE PROTOCOLS.' }
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

        setMessages(prev => [...prev, { role: 'user', content: `> user: ${userText}` }]);
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
                throw new Error(result.error);
            }

            const responseText = `> sys: ${result.reply}`;

            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', content: '' }]);

            // Matrix typing effect
            const chars = responseText.split('');
            let currentText = '';

            for (let i = 0; i < chars.length; i++) {
                currentText += chars[i];
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'bot', content: currentText };
                    return newMessages;
                });
                await new Promise(r => setTimeout(r, 15 + Math.random() * 20)); // Hacker typing speed variation
            }

        } catch (error) {
            console.error("Chat Server Error:", error);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'bot', content: '> ERROR: UPLINK FAILURE. THE AI SERVER COULD NOT PROCESS THE REQUEST.' }]);
        }
    };

    return (
        <>
            <div className={`chatbot-container ${isOpen ? 'active' : ''}`} style={{ fontFamily: 'Fira Code, monospace', border: '1px solid #00ff00', background: 'rgba(0,10,0,0.95)', boxShadow: '0 0 20px rgba(0,255,0,0.2)' }}>
                <div className="chatbot-header" style={{ background: '#002200', borderBottom: '1px solid #00ff00', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Render the 3D bot in the header instead of an icon */}
                        <div style={{ width: '40px', height: '40px' }}>
                            <Canvas camera={{ position: [0, 0, 5] }}>
                                <MiniRobot isTyping={isTyping} />
                            </Canvas>
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', color: '#00ff00' }}>OLIX_ENGINEER_AI</div>
                            <div style={{ fontSize: '0.65rem', color: '#00ffff', marginTop: '2px', letterSpacing: '1px' }}>V4.0 // ACTIVE UPLINK</div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#00ff00', cursor: 'pointer', padding: '0.5rem' }}>
                        <X size={24} />
                    </button>
                </div>

                <div className="chat-messages" ref={scrollRef} style={{ background: '#000000', color: '#00ff00' }}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`} style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            color: msg.role === 'user' ? '#00ffff' : '#00ff00',
                            fontFamily: 'Fira Code, monospace',
                            whiteSpace: 'pre-wrap',
                            textShadow: msg.role === 'user' ? '0 0 5px #00ffff' : '0 0 5px #00ff00',
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                            maxWidth: '100%'
                        }}>
                            {/* Simple markdown bolding support */}
                            {msg.content.split('**').map((part, index) =>
                                index % 2 === 1 ? <strong key={index} style={{ color: '#fff' }}>{part}</strong> : part
                            )}
                        </div>
                    ))}
                    {isTyping && <div className="message bot" style={{ opacity: 0.7, fontStyle: 'italic', color: '#00ff00' }}>&gt; Analyzing Core Data...</div>}
                </div>

                <div className="chat-input-area" style={{ background: '#001100', borderTop: '1px solid #00ff00' }}>
                    <div className="input-wrapper" style={{ border: '1px solid #00ff00', background: '#000', borderRadius: '4px' }}>
                        <TerminalSquare size={16} color="#00ff00" style={{ marginRight: '8px' }} />
                        <input
                            type="text"
                            placeholder="Execute command..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            style={{ color: '#00ff00', fontFamily: 'Fira Code, monospace' }}
                        />
                        <button onClick={() => handleSend()} style={{ background: 'none', border: 'none', color: '#00ff00', cursor: 'pointer' }}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <button
                className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                style={{ 
                    display: isOpen ? 'none' : 'flex',
                    background: '#002200',
                    border: '1px solid #00ff00',
                    color: '#00ff00',
                    boxShadow: '0 0 15px rgba(0,255,0,0.5)',
                    borderRadius: '5px',
                    width: '180px',
                    height: '50px',
                    padding: '0 10px'
                }}
            >
                <div style={{ width: '40px', height: '40px', marginLeft: '-5px' }}>
                    <Canvas camera={{ position: [0, 0, 5] }}>
                        <MiniRobot isTyping={false} />
                    </Canvas>
                </div>
                <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', letterSpacing: '1px' }}>AI_ASSISTANT</span>
            </button>
        </>
    );
};

export default AIAssistant;
