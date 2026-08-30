import React, { useState } from 'react';
import { 
  Layers, Layout, Server, BrainCircuit, Cloud, 
  Database, Cpu, CheckCircle2, Sparkles, Terminal, Code 
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playCyberBlip } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return Layout;
      case 'Server': return Server;
      case 'BrainCircuit': return BrainCircuit;
      case 'Cloud': return Cloud;
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  const handleCategorySelect = (idx: number) => {
    playCyberBlip(540, 0.04);
    setSelectedCategoryIdx(idx);
  };

  const activeCategory = SKILL_CATEGORIES[selectedCategoryIdx];
  const ActiveIcon = getIcon(activeCategory.iconName);

  return (
    <section id="skills" className="py-24 relative">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>04. TECHNICAL SKILLS & STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Full-Stack Tech Matrix & Specializations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Comprehensive breakdown of my languages, frameworks, cloud architecture, AI workflows, and enterprise tools.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = getIcon(cat.iconName);
            const isActive = idx === selectedCategoryIdx;
            return (
              <button
                key={idx}
                onClick={() => handleCategorySelect(idx)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all duration-200 group ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/50 text-cyan-300'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-cyan-400' : 'text-slate-500'
                }`} />
                <span className="text-xs font-mono font-medium leading-tight">
                  {cat.title.split('&')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {activeCategory.title}
                </h3>
                <div className="text-xs font-mono text-slate-400">
                  {activeCategory.skills.length} core competencies mastered
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                ⚡ Enterprise Production Ready
              </span>
            </div>
          </div>

          {/* Skills Grid with Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeCategory.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-850 hover:border-cyan-500/30 transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {skill.experience}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* AI & Automation Highlight Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border border-cyan-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>AI & Automation Engineering Specialization</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h4>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Skilled in integrating LLM APIs (OpenAI & Gemini), Prompt Engineering, and RAG architectures to automate business workflows and deliver intelligent enterprise capabilities.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberBlip(620, 0.05);
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 shadow-lg shadow-cyan-500/20 transition-all"
          >
            Discuss AI Project
          </button>
        </div>

      </div>
    </section>
  );
};
