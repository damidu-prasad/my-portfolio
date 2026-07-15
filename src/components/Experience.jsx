import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
    Float,
    Scroll,
    ScrollControls,
    useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import {
    Mail, Phone, MapPin, Github, Linkedin, Globe,
    Briefcase, GraduationCap, Code2, FolderOpen,
    ExternalLink, ChevronRight, Star, Zap, Database,
    Layers, Terminal, Server, Cpu, Globe2
} from 'lucide-react';

// ── CV DATA ───────────────────────────────────────────────────────────────────

const SKILLS = [
    {
        title: "Frontend Technologies",
        icon: "🖥️",
        bg: "rgba(59,130,246,0.12)",
        skills: [
            { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
            { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
            { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
            { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
            { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
            { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
            { name: "PrimeReact", logo: "https://raw.githubusercontent.com/primefaces/primereact/master/public/images/primereact-logo-dark.svg" },
            { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }
        ]
    },
    {
        title: "Backend & APIs",
        icon: "⚙️",
        bg: "rgba(16,185,129,0.12)",
        skills: [
            { name: "Java EE", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
            { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
            { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
            { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
            { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
            { name: "RESTful APIs", logo: "" }
        ]
    },
    {
        title: "Cloud & DevOps",
        icon: "☁️",
        bg: "rgba(139,92,246,0.12)",
        skills: [
            { name: "AWS (EC2, S3)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
            { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
            { name: "GitHub", logo: "" },
            { name: "Maven", logo: "" }
        ]
    },
    {
        title: "AI & System Automation",
        icon: "🤖",
        bg: "rgba(245,158,11,0.12)",
        skills: [
            { name: "LLM Integration", logo: "" },
            { name: "OpenAI / Gemini APIs", logo: "" },
            { name: "Prompt Engineering", logo: "" },
            { name: "RAG Concepts", logo: "" },
            { name: "Automated Workflows", logo: "" }
        ]
    },
    {
        title: "Databases",
        icon: "🗄️",
        bg: "rgba(6,182,212,0.12)",
        skills: [
            { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
            { name: "MSSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
            { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
            { name: "Relational DB", logo: "" }
        ]
    },
    {
        title: "Tools & Methodologies",
        icon: "🛠️",
        bg: "rgba(239,68,68,0.12)",
        skills: [
            { name: "Agile/Scrum", logo: "" },
            { name: "SDLC", logo: "" },
            { name: "Unit Testing", logo: "" },
            { name: "JIRA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
            { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
            { name: "IntelliJ IDEA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" }
        ]
    }
];

const EXPERIENCE = [
    {
        role: "Associate Software Engineer",
        company: "Exon Software Solutions (Pvt) Ltd",
        period: "May 2023 – Dec 2024",
        type: "Full-time",
        bullets: [
            "Engineered and deployed scalable features for enterprise-level web applications utilizing React.js and Java EE, significantly enhancing system reliability and user engagement.",
            "Optimized frontend rendering logic and executed seamless RESTful API integrations, which successfully reduced page load times and improved overall application performance.",
            "Actively participated in Agile/Scrum sprints and collaborated within cross-functional teams to consistently deliver high-quality software solutions under tight project deadlines.",
            "Earned a rapid promotion from Intern to Associate level within 6 months due to technical excellence, proactive problem-solving, and consistent code quality."
        ]
    },
    {
        role: "Intern Associate Software Engineer",
        company: "Exon Software Solutions (Pvt) Ltd",
        period: "Nov 2022 – May 2023",
        type: "Internship",
        bullets: [
            "Assisted senior engineers in full-stack development, rigorous debugging, and software testing, contributing to a reduction in post-release bugs and a smoother Software Development Life Cycle (SDLC).",
            "Developed and implemented responsive, user-centric UI components using PrimeFaces, effectively integrating them with secure backend systems.",
            "Spearheaded the development of an innovative software prototype that secured the winning title at the Exon Hackathon 2024 by demonstrating rapid problem-solving and coding efficiency."
        ]
    },
    {
        role: "Front Line Officer",
        company: "AR-Automation (pvt) Ltd",
        period: "Jul 2020 – Dec 2022",
        type: "Full-time",
        bullets: [
            "Providing technical support and front-line customer service, managing billing and service inquiries.",
            "Developed key soft skills in empathy, multi-tasking, and professional communication."
        ]
    }
];

const PROJECTS = [
    {
        name: "TEMCO Management System",
        emoji: "🏦",
        bg: "rgba(59,130,246,0.15)",
        desc: "Engineered an automated currency conversion and financial tracking platform for a cooperative banking society. Integrated the Samma Upakara Thirasara Investment Plan module to streamline and manage financial records effectively.",
        tech: ["React.js", "Java EE", "MySQL"],
        featured: true,
        type: "FinTech System"
    },
    {
        name: "Hotel Management System",
        emoji: "🏨",
        bg: "rgba(16,185,129,0.15)",
        desc: "Built a full-featured desktop application for comprehensive reservation and daily operations management. Designed a reliable and secure relational database architecture using MySQL to handle real-time bookings.",
        tech: ["Java", "MySQL"],
        featured: true,
        type: "Desktop App"
    },
    {
        name: "Project Base",
        emoji: "📦",
        bg: "rgba(139,92,246,0.15)",
        desc: "Developed high-performance, dynamic frontend components using React.js to ensure a highly responsive user experience. Optimized state management and component rendering to enhance overall application speed.",
        tech: ["React.js"],
        featured: false,
        type: "Architecture Template"
    },
    {
        name: "Olix Holdings Corporate Platform",
        emoji: "🌐",
        bg: "rgba(245,158,11,0.15)",
        desc: "Designed, developed, and deployed the official digital platform for Olix Holdings, an agency specializing in AI automation and digital services. Focused on modern UI/UX principles and responsive design to effectively showcase services and enhance client engagement.",
        tech: ["React.js", "Tailwind CSS", "Vite", "Netlify"],
        featured: true,
        type: "Corporate Platform"
    },
    {
        name: "MCSP System (Ananda College)",
        emoji: "🏫",
        bg: "rgba(6,182,212,0.15)",
        desc: "Engineered a specialized educational management project for Ananda College during tenure at Exon Software Solutions. Initially architected the core system components using Java, and successfully implemented a high-performance frontend using Next.js to ensure fast rendering and an optimized user experience.",
        tech: ["Next.js", "Java"],
        featured: true,
        type: "EdTech System"
    }
];

const EDUCATION = [
    {
        emoji: "🎓",
        bg: "rgba(59,130,246,0.12)",
        degree: "BSc (Hons) in Software Engineering",
        institution: "Birmingham City University, UK",
        via: "Via Java Institute for Advanced Technology",
        period: "Graduated on 27 April 2025",
        status: "completed"
    },
    {
        emoji: "📊",
        bg: "rgba(16,185,129,0.12)",
        degree: "AAT Level 2 (Accounting)",
        institution: "Association of Accounting Technicians",
        via: "Accounting focus",
        period: "Completed",
        status: "completed"
    }
];

// ── 3D BACKGROUND — Elegant Floating Orbs ─────────────────────────────────────
const FloatingOrbs = () => {
    const groupRef = useRef();
    const scroll = useScroll();

    const orbs = useMemo(() => {
        return Array.from({ length: 18 }, (_, i) => ({
            pos: [
                (Math.random() - 0.5) * 28,
                (Math.random() - 0.5) * 18,
                -Math.random() * 30 - 5
            ],
            scale: Math.random() * 1.2 + 0.4,
            speed: Math.random() * 0.6 + 0.2,
            color: ['#3b82f6', '#06b6d4', '#8b5cf6', '#3b82f6', '#06b6d4'][i % 5]
        }));
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.04;
        }
        // Subtle camera parallax on scroll
        const offset = scroll.offset;
        state.camera.position.y = THREE.MathUtils.lerp(0, -1.5, offset);
        state.camera.rotation.x = THREE.MathUtils.lerp(0, 0.06, offset);
    });

    return (
        <group ref={groupRef}>
            {orbs.map((orb, i) => (
                <Float key={i} speed={orb.speed} rotationIntensity={0.5} floatIntensity={1.5}>
                    <mesh position={orb.pos} scale={orb.scale}>
                        <sphereGeometry args={[1, 12, 12]} />
                        <meshStandardMaterial
                            color={orb.color}
                            emissive={orb.color}
                            emissiveIntensity={0.25}
                            transparent
                            opacity={0.18}
                            wireframe
                        />
                    </mesh>
                </Float>
            ))}
            {/* Central hero orb */}
            <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.8}>
                <mesh position={[6, 1, -8]} scale={3}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#3b82f6"
                        emissive="#3b82f6"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.12}
                        wireframe
                    />
                </mesh>
            </Float>
        </group>
    );
};

// ── HTML CONTENT ──────────────────────────────────────────────────────────────
const HtmlContent = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 8;

    return (
        <Scroll html>
            <div style={{ width: "100vw" }}>

                {/* ══ HERO ══════════════════════════════════════════════════ */}
                <div className="hero-section" id="hero">
                    <div className="wrapper">
                        <div className="hero-badge">
                            Available for new opportunities
                        </div>

                        <h1 className="hero-title anim-fade-up">
                            <span className="name-line">Damindu</span>
                            <span className="accent-line">Prasad.</span>
                        </h1>

                        <p className="hero-subtitle anim-fade-up-delay-1">
                            Full Stack Software Engineer specializing in{" "}
                            <span className="highlight">FinTech</span> &{" "}
                            <span className="highlight">AI-powered systems</span>.
                            Building production-grade web applications with React, Laravel & Node.js.
                        </p>

                        <div className="hero-actions anim-fade-up-delay-2">
                            <a href="mailto:damiduprasad.jayarathna@gmail.com" className="btn-primary">
                                <Mail size={16} />
                                Get In Touch
                            </a>
                            <a href="https://linkedin.com/in/damidu.prasad" target="_blank" rel="noreferrer" className="btn-secondary">
                                <Linkedin size={16} />
                                LinkedIn Profile
                            </a>
                            <a href="https://github.com/damidu-prasad" target="_blank" rel="noreferrer" className="btn-secondary">
                                <Github size={16} />
                                GitHub
                            </a>
                        </div>

                        <div className="hero-stats anim-fade-up-delay-3">
                            <div className="hero-stat-item">
                                <span className="hero-stat-number"><span>2.0</span>+</span>
                                <span className="hero-stat-label">Years Hands-on Exp.</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-number"><span>5</span></span>
                                <span className="hero-stat-label">Key Projects Delivered</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-number"><span>1</span></span>
                                <span className="hero-stat-label">BSc (Hons) Degree</span>
                            </div>
                        </div>

                        <div className="hero-socials anim-fade-up-delay-4">
                            <a href="mailto:damiduprasad.jayarathna@gmail.com" className="social-link" title="Email">
                                <Mail size={18} />
                            </a>
                            <a href="https://linkedin.com/in/damidu.prasad" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://github.com/damidu-prasad" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                                <Github size={18} />
                            </a>
                            <a href="https://damidu.prasad.netlify.app" target="_blank" rel="noreferrer" className="social-link" title="Website">
                                <Globe size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ══ ABOUT ══════════════════════════════════════════════════ */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 10%", minHeight: "auto" }} id="about">
                    <div className="wrapper">
                        <div className="section-label">About Me</div>
                        <div className="about-grid">

                            <div>
                                <h2 className="h2">Building Tomorrow's<br />Digital Solutions</h2>
                                <p style={{ fontSize: "1rem", color: "rgba(148,163,184,1)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "520px" }}>
                                    I'm a results-driven Software Engineer with a BSc (Hons) in Software Engineering and over 2.0 years of hands-on experience in full-stack development. Specialize in building scalable enterprise-grade web applications.
                                </p>
                                <p style={{ fontSize: "1rem", color: "rgba(148,163,184,1)", lineHeight: 1.8, maxWidth: "520px" }}>
                                    Highly proficient in modern web technologies, automated workflow architecture, and databases. My background in commerce and accounting (AAT Level 2) helps me bridge the gap between technical design and business logic.
                                </p>

                                <div className="about-details" style={{ marginTop: "2rem" }}>
                                    <div className="about-detail-row">
                                        <span className="label">Full Name</span>
                                        <span className="value">Rajapaksha Mudiyanselage Damindu Prasad Jayarathna</span>
                                    </div>
                                    <div className="about-detail-row">
                                        <span className="label">Address</span>
                                        <span className="value">No. 15, Olayankanda, Kegalle, Sri Lanka 🇱🇰</span>
                                    </div>
                                    <div className="about-detail-row">
                                        <span className="label">Email</span>
                                        <span className="value">damiduprasad.jayarathna@gmail.com</span>
                                    </div>
                                    <div className="about-detail-row">
                                        <span className="label">Phone</span>
                                        <span className="value">+94 77 007 3699 | +94 77 249 8594</span>
                                    </div>
                                    <div className="about-detail-row">
                                        <span className="label">Languages</span>
                                        <span className="value">English, Sinhala</span>
                                    </div>
                                </div>
                            </div>

                            <div className="about-stats-grid">
                                <div className="about-stat-card">
                                    <div className="num">2.0+</div>
                                    <div className="lbl">Years Hands-on Exp.</div>
                                </div>
                                <div className="about-stat-card">
                                    <div className="num">5</div>
                                    <div className="lbl">Projects Developed</div>
                                </div>
                                <div className="about-stat-card">
                                    <div className="num">BSc</div>
                                    <div className="lbl">Birmingham City Univ.</div>
                                </div>
                                <div className="about-stat-card">
                                    <div className="num">AAT</div>
                                    <div className="lbl">Level 2 Completed</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ══ SKILLS ══════════════════════════════════════════════════ */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 10%", minHeight: "auto" }} id="skills">
                    <div className="wrapper">
                        <div className="section-label">Technical Skills</div>
                        <h2 className="h2" style={{ marginBottom: "0.5rem" }}>Tech Stack & Expertise</h2>
                        <p style={{ fontSize: "0.95rem", color: "rgba(148,163,184,1)", marginBottom: "2.5rem", maxWidth: "540px" }}>
                            A versatile skill set spanning frontend, backend, databases and cloud — built through real-world project delivery.
                        </p>
                        <div className="skills-grid">
                            {SKILLS.map((cat, i) => (
                                <div key={i} className="skill-category-card">
                                    <div className="skill-cat-header">
                                        <div className="skill-cat-icon" style={{ background: cat.bg }}>
                                            {cat.icon}
                                        </div>
                                        <span className="skill-cat-title">{cat.title}</span>
                                    </div>
                                    <div className="skill-tags">
                                        {cat.tags.map((tag, j) => (
                                            <span key={j} className="skill-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ EXPERIENCE ══════════════════════════════════════════════ */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 10%", minHeight: "auto" }} id="experience">
                    <div className="wrapper">
                        <div className="section-label">Professional Experience</div>
                        <h2 className="h2" style={{ marginBottom: "0.5rem" }}>Work History</h2>
                        <p style={{ fontSize: "0.95rem", color: "rgba(148,163,184,1)", marginBottom: "2.5rem", maxWidth: "540px" }}>
                            2+ years of hands-on industry experience building production software for FinTech, hospitality and telecom sectors.
                        </p>
                        <div className="timeline">
                            {EXPERIENCE.map((job, i) => (
                                <div key={i} className="timeline-item">
                                    <div className="timeline-dot">
                                        <Briefcase size={16} />
                                    </div>
                                    <div className="timeline-card">
                                        <div className="timeline-header">
                                            <span className="timeline-role">{job.role}</span>
                                            <span className="timeline-period">{job.period}</span>
                                        </div>
                                        <div className="timeline-company">
                                            {job.company}
                                            <span style={{
                                                marginLeft: "0.75rem",
                                                fontSize: "0.72rem",
                                                color: "rgba(148,163,184,0.6)",
                                                background: "rgba(148,163,184,0.08)",
                                                border: "1px solid rgba(148,163,184,0.15)",
                                                borderRadius: "100px",
                                                padding: "0.15rem 0.6rem",
                                                fontFamily: "JetBrains Mono, monospace"
                                            }}>{job.type}</span>
                                        </div>
                                        <ul className="timeline-bullets">
                                            {job.bullets.map((b, j) => (
                                                <li key={j}>{b}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ PROJECTS ════════════════════════════════════════════════ */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 10%", minHeight: "auto" }} id="projects">
                    <div className="wrapper">
                        <div className="section-label">Portfolio</div>
                        <h2 className="h2" style={{ marginBottom: "0.5rem" }}>Featured Projects</h2>
                        <p style={{ fontSize: "0.95rem", color: "rgba(148,163,184,1)", marginBottom: "2.5rem", maxWidth: "540px" }}>
                            Production-grade applications built across FinTech, EdTech, Hospitality and SaaS sectors.
                        </p>
                        <div className="projects-grid">
                            {PROJECTS.map((project, i) => (
                                <div key={i} className="project-card">
                                    <div className="project-card-top">
                                        <div className="project-icon" style={{ background: project.bg }}>
                                            {project.emoji}
                                        </div>
                                        <div className="project-links">
                                            {project.featured && (
                                                <span className="featured-tag">⭐ Featured</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="project-name">{project.name}</div>
                                        <div style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.5)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.2rem", marginBottom: "0.75rem" }}>{project.type}</div>
                                        <div className="project-desc">{project.desc}</div>
                                    </div>
                                    <div className="project-tech-tags">
                                        {project.tech.map((t, j) => (
                                            <span key={j} className="tech-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ EDUCATION ════════════════════════════════════════════════ */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 10%", minHeight: "auto" }} id="education">
                    <div className="wrapper">
                        <div className="section-label">Education</div>
                        <h2 className="h2" style={{ marginBottom: "0.5rem" }}>Academic Background</h2>
                        <p style={{ fontSize: "0.95rem", color: "rgba(148,163,184,1)", marginBottom: "2.5rem", maxWidth: "540px" }}>
                            Strong academic foundation combining software engineering and commerce, delivered by world-class institutions.
                        </p>
                        <div className="edu-grid">
                            {EDUCATION.map((edu, i) => (
                                <div key={i} className="edu-card">
                                    <div className="edu-icon" style={{ background: edu.bg }}>{edu.emoji}</div>
                                    <div className="edu-degree">{edu.degree}</div>
                                    <div className="edu-institution">{edu.institution}</div>
                                    <div style={{ fontSize: "0.82rem", color: "rgba(148,163,184,0.6)" }}>{edu.via}</div>
                                    <div className="edu-period">{edu.period}</div>
                                    <div className={`edu-status ${edu.status}`}>
                                        {edu.status === 'reading' ? 'Currently Reading' : '✓ Completed'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ CONTACT ═════════════════════════════════════════════════ */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 10%", minHeight: "auto" }} id="contact">
                    <div className="wrapper" style={{ textAlign: "center" }}>
                        <div className="section-label" style={{ margin: "0 auto 1rem" }}>Contact</div>
                        <h2 className="h2">Let's Build Something<br />Great Together</h2>
                        <p style={{ fontSize: "1rem", color: "rgba(148,163,184,1)", lineHeight: 1.75, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
                            Looking to hire a dedicated Full Stack Engineer? I'm open to full-time roles, freelance projects and exciting collaborations.
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", maxWidth: "900px", margin: "0 auto 2.5rem" }}>
                            <a href="mailto:damiduprasad.jayarathna@gmail.com" className="contact-card" style={{ textDecoration: "none", minWidth: "220px", flex: "1" }}>
                                <div className="contact-card-icon" style={{ background: "rgba(59,130,246,0.12)" }}>📧</div>
                                <div className="contact-card-label">Email</div>
                                <div className="contact-card-value">damiduprasad.jayarathna@gmail.com</div>
                            </a>
                            <a href="tel:+94770073699" className="contact-card" style={{ textDecoration: "none", minWidth: "180px", flex: "1" }}>
                                <div className="contact-card-icon" style={{ background: "rgba(16,185,129,0.12)" }}>📞</div>
                                <div className="contact-card-label">Phone 1</div>
                                <div className="contact-card-value">+94 77 007 3699</div>
                            </a>
                            <a href="tel:+94772498594" className="contact-card" style={{ textDecoration: "none", minWidth: "180px", flex: "1" }}>
                                <div className="contact-card-icon" style={{ background: "rgba(245,158,11,0.12)" }}>📱</div>
                                <div className="contact-card-label">Phone 2</div>
                                <div className="contact-card-value">+94 77 249 8594</div>
                            </a>
                            <a href="https://linkedin.com/in/damidu.prasad" target="_blank" rel="noreferrer" className="contact-card" style={{ textDecoration: "none", minWidth: "180px", flex: "1" }}>
                                <div className="contact-card-icon" style={{ background: "rgba(59,130,246,0.12)" }}>💼</div>
                                <div className="contact-card-label">LinkedIn</div>
                                <div className="contact-card-value">linkedin.com/in/damidu.prasad</div>
                            </a>
                            <a href="https://github.com/damidu-prasad" target="_blank" rel="noreferrer" className="contact-card" style={{ textDecoration: "none", minWidth: "180px", flex: "1" }}>
                                <div className="contact-card-icon" style={{ background: "rgba(139,92,246,0.12)" }}>🐙</div>
                                <div className="contact-card-label">GitHub</div>
                                <div className="contact-card-value">github.com/damidu-prasad</div>
                            </a>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                            <a href="mailto:damiduprasad.jayarathna@gmail.com" className="btn-primary" style={{ textDecoration: "none" }}>
                                <Mail size={16} />
                                Send Email
                            </a>
                            <a href="https://linkedin.com/in/damidu.prasad" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: "none" }}>
                                <Linkedin size={16} />
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* ══ FOOTER ══════════════════════════════════════════════════ */}
                <div style={{
                    background: "rgba(13,13,26,0.9)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "1.5rem 10%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    fontSize: "0.8rem",
                    color: "rgba(71,85,105,1)"
                }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        © 2025 R.M. Damindu Prasad Jayarathna — All rights reserved
                    </span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(59,130,246,0.6)" }}>
                        No. 15, Olayankanda, Kegalle, Sri Lanka 🇱🇰
                    </span>
                </div>

            </div>
        </Scroll>
    );
};

// ── MAIN EXPORTED COMPONENT ────────────────────────────────────────────────────
export const Experience = () => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 8;

    return (
        <>
            <color attach="background" args={["#06060f"]} />

            <ambientLight intensity={0.4} color="#3b82f6" />
            <pointLight position={[10, 10, 5]} intensity={2} color="#3b82f6" />
            <pointLight position={[-10, -5, -5]} intensity={1.5} color="#06b6d4" />
            <pointLight position={[0, 0, 10]} intensity={1} color="#8b5cf6" />

            <ScrollControls pages={isMobile ? 12 : 10} damping={0.4}>
                <FloatingOrbs />

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.3} mipmapBlur intensity={0.8} radius={0.7} />
                    <Noise opacity={0.04} />
                    <Vignette eskil={false} offset={0.15} darkness={1.2} />
                </EffectComposer>

                <HtmlContent />
            </ScrollControls>
        </>
    );
};
