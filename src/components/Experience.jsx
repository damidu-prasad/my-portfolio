import {
    Float,
    Scroll,
    ScrollControls,
    useScroll,
    Grid,
    Line,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Bloom, EffectComposer, Noise, Vignette, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

// ── Hacker Data Particles ─────────────────────────────────
const DataStream = () => {
    const count = 300;
    const meshRef = useRef();
    
    // Generate random positions
    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 40; // x
            temp[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
            temp[i * 3 + 2] = (Math.random() - 0.5) * 100; // z (deep tunnel)
        }
        return temp;
    }, [count]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.position.z += delta * 15; // Move towards camera
        if (meshRef.current.position.z > 50) {
            meshRef.current.position.z = -50;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#00ff00" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
};

// ── Hovering Wireframe Cube Matrix ──────────────────────────
const CyberCubes = () => {
    const groupRef = useRef();
    useFrame((state, delta) => {
        if(groupRef.current){
            groupRef.current.rotation.z -= delta * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -30]}>
            {Array.from({ length: 40 }).map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2} position={[
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 30,
                    -Math.random() * 80
                ]}>
                    <mesh>
                        <boxGeometry args={[Math.random()*2+1, Math.random()*2+1, Math.random()*2+1]} />
                        <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.15} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

// ── Scroll-driven 3D scene ─────────────────────────────────
const SceneContent = () => {
    const scroll = useScroll();
    const { viewport } = useThree();
    const isMobile = viewport.width < 8;

    useFrame((state, delta) => {
        const offset = scroll.offset; // 0 → 1

        // Extreme perspective shift as we scroll down
        const startZ = 15;
        const endZ = -40; // Move deep into the grid
        
        state.camera.position.z = THREE.MathUtils.lerp(startZ, endZ, offset);
        state.camera.position.y = THREE.MathUtils.lerp(2, -1, offset);
        state.camera.rotation.x = THREE.MathUtils.lerp(-0.1, 0.1, offset);
        
        // Slight glitch rocking
        state.camera.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02 * offset;
    });

    return (
        <group>
            <DataStream />
            <CyberCubes />
        </group>
    );
};

// ── Shared Hacker Styles ──────────────────────────────────
const S = {
    section: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 10%",
        position: "relative",
        color: "#00ff00",
    },
    sectionCenter: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 10%",
        color: "#00ff00",
    },
    wrapper: { maxWidth: "1100px", width: "100%", margin: "0 auto" },
    wrapperCenter: { maxWidth: "1100px", width: "100%", margin: "0 auto", textAlign: "center" },
    tag: { fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2rem", color: "#00ffff", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" },
    h1: { fontSize: "clamp(3rem, 13vw, 9rem)", lineHeight: 0.85, fontWeight: 900, textTransform: "uppercase", marginBottom: "1.5rem", color: "#00ff00", textShadow: "0 0 10px #00ff00" },
    h2: { fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 700, marginBottom: "1.5rem", color: "#e0ffe0", textShadow: "0 0 8px rgba(0,255,0,0.5)" },
    h3: { fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 700, color: "#00ffff", marginBottom: "0.5rem", letterSpacing: "0.05em", textShadow: "0 0 5px #00ffff" },
    h4: { fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 700, color: "#00ff00", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" },
    desc: { fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(0, 255, 0, 0.7)", lineHeight: 1.7, maxWidth: "540px" },
    descCenter: { fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(0, 255, 0, 0.7)", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto" },
    grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "1rem" },
    mobileStack: { display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem", paddingBottom: "2rem" },
    card: { background: "rgba(0, 15, 0, 0.8)", border: "1px solid #00ff00", borderRadius: "4px", padding: "1.5rem 1.8rem", boxShadow: "0 0 15px rgba(0, 255, 0, 0.1) inset" },
    email: { display: "inline-block", fontSize: "clamp(1.1rem, 3.5vw, 1.8rem)", fontWeight: 700, color: "#00ff00", textDecoration: "none", margin: "1rem auto 0", borderBottom: "2px solid #00ff00", paddingBottom: "4px" },
    footer: { fontSize: "0.8rem", letterSpacing: "0.2rem", color: "#00ffff", opacity: 0.8, textTransform: "uppercase", marginTop: "1.5rem", textAlign: "center", width: "100%" },
};

// ── HTML overlay ───────────────────────────────────────────
const HtmlContent = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 8;

    return (
        <Scroll html>
            <div style={{ width: "100vw", cursor: "crosshair" }}>

                {/* Hero */}
                <div style={S.section}>
                    <div style={S.wrapper}>
                        <div style={S.tag}>&gt; INIT UPLINK_</div>
                        <h1 style={S.h1} className="glitch" data-text="DAMINDU PRASAD">DAMINDU PRASAD</h1>
                        <p style={S.desc}>
                            $ ROLE: Full Stack Developer | FinTech & AI Specialist<br />
                            $ STATUS: 2 Years Industry Exp. 4 Years SE Development.
                        </p>
                    </div>
                </div>

                {/* Expertise */}
                <div style={S.section}>
                    <div style={S.wrapper}>
                        <div style={S.tag}>&gt; EXECUTE ./EXPERTISE.SH</div>
                        <h2 style={S.h2} className="glitch" data-text="CORE CAPABILITIES">CORE CAPABILITIES</h2>
                        <div style={isMobile ? S.mobileStack : S.grid3}>
                            <div style={S.card} className="hacker-card">
                                <h3 style={S.h3}>[AI & FINTECH]</h3>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Specialized in AI implementations and FinTech infrastructure. Full-stack workflow precision.</p>
                            </div>
                            <div style={S.card} className="hacker-card">
                                <h3 style={S.h3}>[INDUSTRY EXPERIENCE]</h3>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>2 Years as a dedicated Software Engineer. Previous Customer Service experience at Dialog Axiata.</p>
                            </div>
                            <div style={S.card} className="hacker-card">
                                <h3 style={S.h3}>[CONTINUOUS LEARNING]</h3>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>4 Years active in Software Engineering. Deeply committed to self-learning and advanced systems.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Qualifications */}
                <div style={S.section}>
                    <div style={S.wrapper}>
                        <div style={S.tag}>&gt; CAT QUALIFICATIONS.LOG</div>
                        <h2 style={S.h2} className="glitch" data-text="DATABASE RECORDS">DATABASE RECORDS</h2>
                        <div style={isMobile ? S.mobileStack : S.grid3}>
                            <div style={S.card} className="hacker-card">
                                <h4 style={S.h4}>CMD: BSC (HONS) SE</h4>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Graduated April this year. Issued by Birmingham City University, via Java Institute for Advanced Tech.</p>
                            </div>
                            <div style={S.card} className="hacker-card">
                                <h4 style={S.h4}>CMD: MPHIL SE (READING)</h4>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Currently following MPhil at IIC University, studied through Java Institute for Advanced Tech.</p>
                            </div>
                            <div style={S.card} className="hacker-card">
                                <h4 style={S.h4}>CMD: COMMERCE DNA</h4>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>AAT 2nd Level Completed. Bridges technical engineering with advanced financial understanding.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div style={S.sectionCenter}>
                    <div style={S.wrapperCenter}>
                        <div style={{ ...S.tag, justifyContent: "center" }}>&gt; WHOAMI</div>
                        <h2 style={S.h2}>SYSTEM ARCHITECT</h2>
                        <p style={S.descCenter}>
                            Based in Maharagama, Sri Lanka.<br />
                            Specializing in AI automation and high-performance web systems.<br />
                            I develop custom dashboards, automated workflows, and robust applications.
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div style={S.sectionCenter}>
                    <div style={S.wrapperCenter}>
                        <div style={{ ...S.tag, justifyContent: "center" }}>&gt; PING SERVER</div>
                        <h2 style={S.h2} className="glitch" data-text="OPEN SOCKET">OPEN SOCKET</h2>
                        <p style={S.descCenter}>Ready for elite automation commands. Send transmission.</p>
                        <a href="mailto:olixholdings@gmail.com" style={S.email}>
                            olixholdings@gmail.com
                        </a>
                        <div style={S.footer}>CONNECTION ESTABLISHED_</div>
                    </div>
                </div>

            </div>
        </Scroll>
    );
};

// ── Main exported component ────────────────────────────────
export const Experience = () => (
    <>
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.5} color="#00ff00" />
        <spotLight position={[0, 10, -20]} angle={0.5} penumbra={1} intensity={5} color="#00ffff" />

        <ScrollControls pages={5} damping={0.3}>
            <SceneContent />

            {/* Hacker top and bottom grids */}
            <Grid
                infiniteGrid
                fadeDistance={100}
                fadeStrength={5}
                cellSize={1}
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#00ff00"
                cellColor="#003300"
                position={[0, -2, 0]}
            />
            <Grid
                infiniteGrid
                fadeDistance={100}
                fadeStrength={5}
                cellSize={1}
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#00ff00"
                cellColor="#003300"
                position={[0, 10, 0]}
                rotation={[Math.PI, 0, 0]} /* inverted ceiling grid */
            />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.8} />
                <Noise opacity={0.08} />
                <Vignette eskil={false} offset={0.1} darkness={1.5} />
                <Glitch 
                    delay={[1.5, 3.5]} // min and max delay
                    duration={[0.1, 0.3]} // min and max duration
                    strength={[0.02, 0.04]} // min and max strength
                    mode={GlitchMode.SPORADIC}
                    active
                    ratio={0.1}
                />
            </EffectComposer>

            <HtmlContent />
        </ScrollControls>
    </>
);
