import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Terminal, FileText, Send, Volume2, VolumeX, 
  Sparkles, Code2, Briefcase, User, Layers 
} from 'lucide-react';
import { toggleSound, isSoundEnabled, playCyberBlip } from '../utils/audio';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const state = toggleSound();
    setSoundOn(state);
  };

  const navLinks = [
    { name: 'AI & Auto', href: '#ai-architecture', icon: Sparkles },
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Code2 },
    { name: 'Skills', href: '#skills', icon: Layers },
    { name: 'Terminal', href: '#terminal', icon: Terminal },
    { name: 'Contact', href: '#contact', icon: Send },
  ];

  const handleNavClick = (href: string) => {
    playCyberBlip(550, 0.04);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-cyan-950/20' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo & Status */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); playCyberBlip(600, 0.05); }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-mono font-bold text-cyan-400 text-base tracking-tighter">
              DP
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="font-mono text-sm font-bold tracking-tight text-slate-100 flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
              Damindu Prasad
              <Sparkles className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-full px-3 py-1.5 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 rounded-full transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg border border-slate-800/60 transition-all text-xs flex items-center"
            title={soundOn ? "Mute audio FX" : "Enable audio FX"}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Quick Terminal Launcher */}
          <button
            onClick={() => { playCyberBlip(700, 0.05); onOpenTerminal(); }}
            className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 rounded-lg border border-slate-800/60 transition-all text-xs font-mono flex items-center gap-1"
            title="Launch Interactive Terminal CLI"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline text-[11px]">CLI</span>
          </button>

          {/* Resume / CV Modal Trigger */}
          <button
            onClick={() => { playCyberBlip(640, 0.05); onOpenResume(); }}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-cyan-500/50 rounded-lg transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>View CV</span>
          </button>

          {/* Contact Direct CTA */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-lg transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleSoundToggle}
            className="p-2 text-slate-400 hover:text-cyan-400"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={() => { playCyberBlip(480, 0.04); setMobileMenuOpen(!mobileMenuOpen); }}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-300 bg-slate-900/80 border border-slate-800/80 rounded-xl"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-xl"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              View CV
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('#contact'); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-xl"
            >
              <Send className="w-4 h-4" />
              Hire Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
