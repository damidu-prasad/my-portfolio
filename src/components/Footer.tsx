import React from 'react';
import { ArrowUp, Github, Linkedin, Globe, Heart, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { playCyberBlip } from '../utils/audio';

interface FooterProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenTerminal }) => {
  const scrollToTop = () => {
    playCyberBlip(750, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                DP
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">
                {PERSONAL_DETAILS.displayName}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Full-Stack Software Engineer • BSc (Hons)
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <button
              onClick={onOpenResume}
              className="hover:text-cyan-300 transition-colors"
            >
              Resume (CV)
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerminal}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              CLI Shell
            </button>
            <span>•</span>
            <a
              href={PERSONAL_DETAILS.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PERSONAL_DETAILS.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
            title="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>

        </div>

        <div className="border-t border-slate-850 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            © {new Date().getFullYear()} {PERSONAL_DETAILS.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Full-time Roles & Contracts</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
