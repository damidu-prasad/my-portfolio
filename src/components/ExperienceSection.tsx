import React, { useState } from 'react';
import { 
  Briefcase, Calendar, MapPin, Award, CheckCircle2, 
  ChevronRight, Sparkles, Terminal, Building2 
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { playCyberBlip } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES[0].id);

  const handleSelectExp = (id: string) => {
    playCyberBlip(580, 0.04);
    setActiveExpId(id);
  };

  return (
    <section id="experience" className="py-24 relative">
      
      {/* Background Accent */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>02. PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proven Track Record of Engineering & Scalability
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Hands-on enterprise engineering experience, rapid promotions, and award-winning software prototypes.
          </p>
        </div>

        {/* Timeline Desktop & Mobile layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation / Role Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-2 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Career Trajectory</span>
            </div>

            <div className="space-y-2.5">
              {EXPERIENCES.map((exp) => {
                const isActive = exp.id === activeExpId;
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleSelectExp(exp.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group ${
                      isActive 
                        ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 text-white' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-500" />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold text-cyan-400">
                        {exp.company}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {exp.period.split('–')[0].trim()}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-100 group-hover:text-white">
                      {exp.role}
                    </div>

                    {exp.badge && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                        <Award className="w-3 h-3 text-cyan-400" />
                        <span>{exp.badge}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Career Velocity Summary Card */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2 font-mono">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Rapid Progression</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Advanced from Intern to Associate Software Engineer in under 6 months through demonstrated technical excellence and proactive problem solving.
              </p>
            </div>
          </div>

          {/* Experience Detail View Column */}
          <div className="lg:col-span-8">
            {(() => {
              const activeExp = EXPERIENCES.find((e) => e.id === activeExpId) || EXPERIENCES[0];
              return (
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                  
                  {/* Subtle top light bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-transparent" />

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                        <span>{activeExp.role}</span>
                        <span className="text-cyan-400 text-lg font-mono">@ {activeExp.company}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {activeExp.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {activeExp.location}
                        </span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {activeExp.type}
                        </span>
                      </div>
                    </div>

                    {activeExp.badge && (
                      <div className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md">
                        <Award className="w-4 h-4 text-cyan-400" />
                        <span>{activeExp.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Detailed Bullet Achievements */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Key Contributions & Impact
                    </h4>
                    <div className="space-y-3">
                      {activeExp.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                          <div className="p-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 mt-1 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Technologies & Methodologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};
