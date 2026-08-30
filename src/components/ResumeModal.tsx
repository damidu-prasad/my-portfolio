import React, { useState } from 'react';
import { 
  X, Download, Printer, Check, Copy, ExternalLink, 
  Mail, Phone, MapPin, Globe, Github, Linkedin, Sparkles, 
  Award, Briefcase, GraduationCap, Code2 
} from 'lucide-react';
import { 
  PERSONAL_DETAILS, PROFESSIONAL_SUMMARY, EXPERIENCES, 
  EDUCATION_ITEMS, PROJECTS, SKILL_CATEGORIES 
} from '../data/portfolioData';
import { playCyberBlip, playSuccessChime } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    playCyberBlip(600, 0.05);
    window.print();
  };

  const handleCopyText = () => {
    const cvText = `
${PERSONAL_DETAILS.displayName.toUpperCase()}
${PERSONAL_DETAILS.phones.join(' | ')} | ${PERSONAL_DETAILS.email} | ${PERSONAL_DETAILS.portfolioUrl}
LinkedIn: ${PERSONAL_DETAILS.linkedinUrl} | GitHub: ${PERSONAL_DETAILS.githubUrl}

PERSONAL DETAILS
Full Name: ${PERSONAL_DETAILS.fullName}
Permanent Address: ${PERSONAL_DETAILS.location}
Languages: ${PERSONAL_DETAILS.languages.join(', ')}

PROFESSIONAL SUMMARY
${PROFESSIONAL_SUMMARY}

PROFESSIONAL EXPERIENCE
${EXPERIENCES.map(e => `${e.role} | ${e.company} (${e.period})\n` + e.bullets.map(b => `• ${b}`).join('\n')).join('\n\n')}

EDUCATION
${EDUCATION_ITEMS.map(edu => `• ${edu.degree}\n  ${edu.institution} | ${edu.period}\n  ${edu.details}`).join('\n\n')}

KEY PROJECTS
${PROJECTS.map(p => `• ${p.title} | ${p.technologies.join(', ')}\n  ${p.description}\n  Impact: ${p.impact}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(cvText);
    playSuccessChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-mono font-bold text-white">
              Curriculum Vitae • {PERSONAL_DETAILS.displayName}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
              title="Copy plain text CV to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied CV!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => { playCyberBlip(450, 0.04); onClose(); }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Rendered CV Paper */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 text-slate-200 space-y-8 font-sans text-sm selection:bg-cyan-500/20">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              {PERSONAL_DETAILS.displayName}
            </h1>
            <div className="text-xs font-mono text-cyan-400 flex flex-wrap items-center justify-center gap-3">
              <span>{PERSONAL_DETAILS.phones.join(' | ')}</span>
              <span>•</span>
              <a href={`mailto:${PERSONAL_DETAILS.email}`} className="hover:underline">{PERSONAL_DETAILS.email}</a>
              <span>•</span>
              <a href={PERSONAL_DETAILS.portfolioUrl} target="_blank" rel="noreferrer" className="hover:underline">damindu-prasad.netlify.app</a>
            </div>
            <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center justify-center gap-3">
              <a href={PERSONAL_DETAILS.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline text-blue-400">linkedin.com/in/damindu-prasad</a>
              <span>•</span>
              <a href={PERSONAL_DETAILS.githubUrl} target="_blank" rel="noreferrer" className="hover:underline text-slate-300">github.com/damindu-prasad</a>
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Personal Details
            </h2>
            <div className="text-xs space-y-1 text-slate-300 font-mono">
              <p><strong className="text-slate-100">Full Name:</strong> {PERSONAL_DETAILS.fullName}</p>
              <p><strong className="text-slate-100">Permanent Address:</strong> {PERSONAL_DETAILS.location}</p>
              <p><strong className="text-slate-100">Languages:</strong> {PERSONAL_DETAILS.languages.join(', ')}</p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {PROFESSIONAL_SUMMARY}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-bold text-slate-100 shrink-0 sm:w-56 font-mono">• {cat.title}:</span>
                  <span className="text-slate-300">{cat.skills.map(s => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="font-bold text-white text-sm">
                      {exp.role} | <span className="text-cyan-300 font-mono">{exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </div>
                  </div>
                  {exp.badge && (
                    <div className="inline-block text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      ★ {exp.badge}
                    </div>
                  )}
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-slate-100">
                    <span>• {edu.degree}</span>
                    <span className="font-mono text-cyan-400 font-normal">{edu.period}</span>
                  </div>
                  <div className="text-slate-400 pl-3">{edu.institution}</div>
                  <div className="text-slate-500 text-[11px] pl-3">{edu.details}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Key Projects
            </h2>
            <div className="space-y-4 text-xs">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-bold text-slate-100">• {proj.title} <span className="text-cyan-400 font-mono font-normal">| {proj.technologies.join(', ')}</span></span>
                    {proj.link && (
                      <span className="text-[11px] font-mono text-emerald-400">{proj.link}</span>
                    )}
                  </div>
                  <p className="text-slate-300 pl-3">{proj.description}</p>
                  <ul className="list-disc list-inside text-slate-400 text-[11px] pl-5 space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
          Official Digital Resume • Verified Credentials of R.M Damindu Prasad Jayarathna
        </div>

      </div>
    </div>
  );
};
