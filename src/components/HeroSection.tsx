import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Download, Terminal, Sparkles, MapPin, 
  Github, Linkedin, Globe, Phone, Mail, Award, CheckCircle2, 
  Code2, ExternalLink, BrainCircuit, MessageCircle 
} from 'lucide-react';
import { Hero3DVisual } from './Hero3DVisual';
import { PERSONAL_DETAILS, STATS } from '../data/portfolioData';
import { playCyberBlip } from '../utils/audio';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

const ROLES = [
  "Full-Stack & AI Software Engineer",
  "AI & System Automation Developer",
  "React.js & Next.js Specialist",
  "Java EE & Spring Boot Developer",
  "LLM & RAG Architecture Engineer"
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(70);
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(35);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(30);
      }, typingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      setTypingSpeed(90);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  const scrollToAi = () => {
    playCyberBlip(550, 0.05);
    document.querySelector('#ai-architecture')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    playCyberBlip(550, 0.05);
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    playCyberBlip(620, 0.05);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      
      {/* Background Gradients & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-indigo-600/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Information */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Available for Full-Stack & AI Roles</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kegalle / Colombo, Sri Lanka</span>
              </div>
            </div>

            {/* Main Title & Dynamic Typing */}
            <div className="space-y-3">
              <h2 className="text-xs sm:text-sm font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>AI Developer & Full-Stack Engineer</span>
              </h2>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-cyan-200">
                  Damindu Prasad
                </span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-400">
                  Jayarathna
                </span>
              </h1>

              {/* Dynamic Animated Role */}
              <div className="flex items-center gap-2 h-9 text-base sm:text-lg md:text-xl font-mono font-semibold text-cyan-300">
                <span className="text-slate-500">$</span>
                <span>{displayedText}</span>
                <span className="w-2.5 h-5 bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Bio summary paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Full-Stack Software Engineer with a <strong className="text-white font-semibold">BSc (Hons) in Software Engineering</strong> and <strong className="text-cyan-300 font-semibold">over 3 years of hands-on experience</strong> in architecting scalable enterprise web applications. Highly proficient in <span className="text-slate-100 underline decoration-cyan-500/50">React.js, Next.js, TypeScript, Java EE, Spring Boot</span>, and specialized in <span className="text-slate-100 underline decoration-purple-500/50">AI / LLM Integrations, RAG Pipelines, and Automated SaaS Platforms</span>.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              
              <button
                onClick={scrollToAi}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40 active:scale-95"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>AI & Automation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-medium text-sm transition-all duration-200 shadow-sm active:scale-95"
              >
                <span>View Projects</span>
              </button>

              <button
                onClick={() => { playCyberBlip(640, 0.05); onOpenResume(); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-sm transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>

              <a
                href="https://wa.me/94770073699?text=Hi%20Damindu,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-sm hover:bg-emerald-900/60 transition-all active:scale-95"
                title="Connect on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

            </div>

            {/* Social & Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <a
                href={PERSONAL_DETAILS.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GitHub Repos</span>
              </a>

              <a
                href={PERSONAL_DETAILS.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={`mailto:${PERSONAL_DETAILS.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{PERSONAL_DETAILS.email}</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Holographic Core */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <Hero3DVisual />

            {/* Highlight Badges around 3D Visual */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-6">
              
              <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl flex items-start gap-2.5 shadow-md">
                <div className="p-1.5 bg-cyan-950/80 border border-cyan-500/30 rounded-lg text-cyan-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Hackathon Winner</div>
                  <div className="text-[11px] text-slate-400">Exon Hackathon 2024 Champion</div>
                </div>
              </div>

              <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl flex items-start gap-2.5 shadow-md">
                <div className="p-1.5 bg-emerald-950/80 border border-emerald-500/30 rounded-lg text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Fast Track Promotion</div>
                  <div className="text-[11px] text-slate-400">Intern to Associate in 6 Months</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 shadow-2xl">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-800/30 transition-colors">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  {stat.value}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">{stat.suffix}</span>
              </div>
              <div className="text-xs font-medium text-slate-200 mt-1">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
