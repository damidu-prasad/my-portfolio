import {
    Float,
    MeshDistortMaterial,
    Scroll,
    ScrollControls,
    useScroll,
    Stars,
    Grid,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

// ── Scroll-driven 3D scene ─────────────────────────────────
const SceneContent = () => {
    const meshRef = useRef();
    const groupRef = useRef();
    const scroll = useScroll();
    const { viewport } = useThree();

    const isMobile = viewport.width < 8;
    const baseScale = isMobile ? viewport.width * 0.18 : 1.5;

    useFrame((state, delta) => {
        const offset = scroll.offset; // 0 → 1

        // Camera path
        const startZ = isMobile ? 22 : 12;
        const endZ = isMobile ? 14 : 5;
        state.camera.position.z = THREE.MathUtils.lerp(startZ, endZ, offset);
        state.camera.position.y = THREE.MathUtils.lerp(2, 0.5, offset);
        state.camera.rotation.x = THREE.MathUtils.lerp(-0.2, 0, offset);

        // Core left/right drift
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.45;
            if (!isMobile) {
                let xPos = 0;
                if (offset < 0.4) xPos = THREE.MathUtils.lerp(0, 3.5, offset / 0.4);
                else if (offset < 0.7) xPos = THREE.MathUtils.lerp(3.5, -3.5, (offset - 0.4) / 0.3);
                else xPos = THREE.MathUtils.lerp(-3.5, 0, (offset - 0.7) / 0.3);
                groupRef.current.position.x = xPos;
            } else {
                groupRef.current.position.x = 0;
            }
            groupRef.current.position.y = isMobile ? -3 : 0;
        }

        // Distortion morphing
        if (meshRef.current) {
            meshRef.current.distort = THREE.MathUtils.lerp(0.25, 0.65, Math.abs(Math.sin(offset * Math.PI)));
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
                <mesh castShadow>
                    <icosahedronGeometry args={[baseScale, 20]} />
                    <MeshDistortMaterial
                        ref={meshRef}
                        color="#0088ff"
                        emissive="#0044ff"
                        emissiveIntensity={2.5}
                        metalness={1}
                        roughness={0.05}
                        speed={2}
                        distort={0.35}
                        radius={1}
                    />
                </mesh>
            </Float>
            <Stars radius={5} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

// ── Shared inline styles (guarantee render inside ScrollControls) ──
const S = {
    section: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 10%",
        position: "relative",
        color: "#fff",
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
        color: "#fff",
    },
    wrapper: { maxWidth: "1100px", width: "100%", margin: "0 auto" },
    wrapperCenter: { maxWidth: "1100px", width: "100%", margin: "0 auto", textAlign: "center" },
    tag: { fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.4rem", color: "#00ffcc", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" },
    h1: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 13vw, 9rem)", lineHeight: 0.85, fontWeight: 900, textTransform: "uppercase", marginBottom: "1.5rem" },
    span: { background: "linear-gradient(90deg, #00ffcc, #0088ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    h2: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 700, marginBottom: "1.5rem", color: "#0088ff" },
    h3: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)", fontWeight: 700, color: "#00ffcc", marginBottom: "0.5rem", letterSpacing: "0.05em" },
    h4: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.85rem, 2vw, 1rem)", fontWeight: 700, color: "#00ffcc", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" },
    desc: { fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "540px" },
    descCenter: { fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto" },
    grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem", marginTop: "0.5rem" },
    mobileStack: { display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem", paddingBottom: "2rem" },
    card: { background: "rgba(5, 20, 20, 0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,255,204,0.18)", borderRadius: "16px", padding: "1.5rem 1.8rem" },
    email: { display: "inline-block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.1rem, 3.5vw, 1.8rem)", fontWeight: 700, color: "#00ffcc", textDecoration: "none", margin: "1rem auto 0" },
    footer: { fontSize: "0.65rem", letterSpacing: "0.4rem", color: "#0088ff", opacity: 0.6, textTransform: "uppercase", marginTop: "1.2rem", textAlign: "center", width: "100%" },
};

// ── HTML overlay ───────────────────────────────────────────
const HtmlContent = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 8;

    return (
        <Scroll html>
            <div style={{ width: "100vw" }}>

                {/* Hero */}
                <div style={S.section}>
                    <div style={S.wrapper}>
                        <div style={S.tag}>establishing neural uplink</div>
                        <h1 style={S.h1}>DAMINDU<br /><span style={S.span}>PRASAD</span></h1>
                        <p style={S.desc}>
                            High-fidelity AI Architect.<br />
                            Architecting the future of immersive enterprise automation.
                        </p>
                    </div>
                </div>

                {/* Expertise */}
                <div style={S.section}>
                    <div style={S.wrapper}>
                        <div style={S.tag}>system protocols</div>
                        <h2 style={S.h2}>EXPERTISE</h2>
                        <div style={isMobile ? S.mobileStack : S.grid3}>
                            <div style={S.card}>
                                <h3 style={S.h3}>AI AUTOMATION</h3>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Deploying large-scale LLM ecosystems and autonomous agents.</p>
                            </div>
                            <div style={S.card}>
                                <h3 style={S.h3}>FINTECH ECOLOGY</h3>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Architecting scalable financial logic and secure pipelines.</p>
                            </div>
                            <div style={S.card}>
                                <h3 style={S.h3}>MODERN STACK</h3>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>High-performance engineering with React, Three.js, and Cloud Ops.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Qualifications */}
                <div style={S.section}>
                    <div style={S.wrapper}>
                        <div style={S.tag}>engine dna</div>
                        <h2 style={S.h2}>QUALIFICATIONS</h2>
                        <div style={isMobile ? S.mobileStack : S.grid3}>
                            <div style={S.card}>
                                <h4 style={S.h4}>AI SOLUTIONS ARCHITECT</h4>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Leading innovation @ Olix Holdings. Custom LLM integration.</p>
                            </div>
                            <div style={S.card}>
                                <h4 style={S.h4}>SOFTWARE ENGINEER</h4>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>Deep-stack automation &amp; high-integrity software design.</p>
                            </div>
                            <div style={S.card}>
                                <h4 style={S.h4}>BSc HONS & MPHIL</h4>
                                <p style={{ ...S.desc, maxWidth: "100%" }}>BSc Hons Software Engineering. Reading for MPhil.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div style={S.sectionCenter}>
                    <div style={S.wrapperCenter}>
                        <div style={{ ...S.tag, justifyContent: "center" }}>engineering dna</div>
                        <h2 style={S.h2}>BRIDGING CORE SYSTEMS</h2>
                        <p style={S.descCenter}>
                            Merging high-fidelity commercial logic with autonomous software.
                            Specialized in translating enterprise financial architecture into
                            high-performance automated pipelines.
                        </p>
                    </div>
                </div>

                {/* Contact */}
                <div style={S.sectionCenter}>
                    <div style={S.wrapperCenter}>
                        <div style={{ ...S.tag, justifyContent: "center" }}>contact uplink</div>
                        <h2 style={S.h2}>UPLINK</h2>
                        <p style={S.descCenter}>Ready for elite automation commands.</p>
                        <a href="mailto:olixholdings@gmail.com" style={S.email}>
                            olixholdings@gmail.com
                        </a>
                        <div style={S.footer}>ESTABLISHING CONNECTION...</div>
                    </div>
                </div>

            </div>
        </Scroll>
    );
};

// ── Main exported component ────────────────────────────────
export const Experience = () => (
    <>
        <color attach="background" args={["#000814"]} />

        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={3} />

        <ScrollControls pages={5} damping={0.25}>
            <SceneContent />

            <Grid
                infiniteGrid
                fadeDistance={35}
                fadeStrength={6}
                cellSize={1}
                sectionSize={4}
                sectionThickness={1.5}
                sectionColor="#0088ff"
                cellColor="#001133"
                position={[0, -2.5, 0]}
            />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1.0} mipmapBlur intensity={1.6} radius={0.4} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.1} darkness={1.2} />
            </EffectComposer>

            <HtmlContent />
        </ScrollControls>
    </>
);
