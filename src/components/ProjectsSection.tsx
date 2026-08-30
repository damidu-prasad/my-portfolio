import React, { useState } from 'react';
import { 
  Code2, ExternalLink, ArrowUpRight, Sparkles, 
  Layers, CheckCircle, Eye, Server, Cpu, Globe 
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { playCyberBlip } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ['All', 'Full-Stack', 'AI & Web', 'Frontend', 'Backend / Enterprise'];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    playCyberBlip(520, 0.04);
    setActiveCategory(cat);
  };

  return (
    <section id="projects" className="py-24 relative">
      
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>03. FEATURED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Software Solutions & Digital Platforms
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Enterprise management systems, high-speed dynamic web applications, and AI digital services.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => { playCyberBlip(620, 0.05); onSelectProject(project); }}
              className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400 transition-all" />

              <div className="space-y-4">
                
                {/* Header: Category & Live Indicator */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-cyan-400 text-[11px] font-mono">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {project.link && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                        <Globe className="w-3 h-3" />
                        Live
                      </span>
                    )}
                    {project.featured && (
                      <span className="p-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[10px]" title="Featured">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    {project.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Measurable Impact pill */}
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-850 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{project.impact}</span>
                </div>
              </div>

              {/* Technologies footer */}
              <div className="pt-5 mt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-[11px] font-mono text-cyan-400 border border-slate-800">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold pt-1">
                  <span className="flex items-center gap-1 group-hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Direct URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
