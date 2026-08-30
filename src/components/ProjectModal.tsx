import React from 'react';
import { 
  X, ExternalLink, Code2, Layers, CheckCircle2, 
  Sparkles, Server, Shield, ArrowRight 
} from 'lucide-react';
import { Project } from '../types';
import { playCyberBlip } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => { playCyberBlip(450, 0.04); onClose(); }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured Project
            </span>
          )}
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-cyan-400">
            {project.subtitle}
          </p>
        </div>

        {/* Role & Key Metric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">My Role</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{project.role}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">Measurable Impact</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{project.impact}</div>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Project Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Key Engineering Highlights & Architecture
          </h4>
          <div className="space-y-2.5">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2.5 pt-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Live Link if available */}
        {project.link && (
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
