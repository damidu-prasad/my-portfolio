import React, { useState } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiArchitectureSection } from './components/AiArchitectureSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { TerminalSection } from './components/TerminalSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { DaminduAiBot } from './components/DaminduAiBot';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleOpenTerminal = () => {
    const termEl = document.querySelector('#terminal');
    if (termEl) {
      termEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 3D WebGL Canvas Layer with Scroll-Based 3D Transitions */}
      <ThreeBackground />

      {/* Navigation Header */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={handleOpenTerminal}
      />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={handleOpenTerminal}
        />

        {/* Dedicated AI Developer & System Automation Architecture Showcase */}
        <AiArchitectureSection />

        <AboutSection />

        <ExperienceSection />

        <ProjectsSection 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SkillsSection />

        <TerminalSection 
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={handleOpenTerminal}
      />

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive & Printable Resume (CV) Modal */}
      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating AI Virtual Assistant / Digital Twin (Fixed internal scroll) */}
      <DaminduAiBot 
        onOpenResume={() => setIsResumeOpen(true)}
      />

    </div>
  );
}
