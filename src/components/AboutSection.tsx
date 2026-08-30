import React from 'react';
import { 
  GraduationCap, BookOpen, Languages, MapPin, 
  Sparkles, CheckCircle, ShieldCheck, Zap, Server, 
  Terminal, User, Award, FileCode 
} from 'lucide-react';
import { PERSONAL_DETAILS, EDUCATION_ITEMS, PROFESSIONAL_SUMMARY } from '../data/portfolioData';
import { playCyberBlip } from '../utils/audio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>01. ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering High-Performance Solutions with Precision
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            A deep-dive into my professional background, engineering principles, and academic foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Personal Card & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-extrabold text-cyan-300 text-2xl">
                    DP
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {PERSONAL_DETAILS.displayName}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400">
                    Full-Stack Software Engineer
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    BSc (Hons) Software Engineering
                  </div>
                </div>
              </div>

              {/* Personal Details List */}
              <div className="space-y-3.5 text-xs font-mono divide-y divide-slate-800/80">
                <div className="pt-2 flex items-start justify-between gap-4">
                  <span className="text-slate-500 shrink-0">Full Name:</span>
                  <span className="text-slate-300 text-right font-sans font-medium text-xs">
                    {PERSONAL_DETAILS.fullName}
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    Address:
                  </span>
                  <span className="text-slate-300 text-right text-xs">
                    {PERSONAL_DETAILS.location}
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                    <Languages className="w-3.5 h-3.5 text-emerald-400" />
                    Languages:
                  </span>
                  <span className="text-slate-300 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-emerald-300 font-semibold">
                      English (Fluent)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-cyan-300 font-semibold">
                      Sinhala (Native)
                    </span>
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-500 shrink-0">Portfolio:</span>
                  <a 
                    href={PERSONAL_DETAILS.portfolioUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>damindu-prasad.netlify.app</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Core Technical Values Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Core Engineering Strengths
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { title: "Enterprise Scalability", desc: "Crafting resilient microservices and distributed Java EE / Spring Boot architectures.", icon: Server },
                  { title: "Rapid Frontend Optimization", desc: "Minimizing bundle sizes and executing responsive Next.js & React.js UI workflows.", icon: Zap },
                  { title: "AI & Workflow Automation", desc: "Integrating Gemini / OpenAI APIs, Prompt Engineering, and RAG knowledge systems.", icon: ShieldCheck }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{item.title}</div>
                        <div className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Professional Summary & Education */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Executive Summary Card */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                <FileCode className="w-4 h-4" />
                <span>Professional Summary</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {PROFESSIONAL_SUMMARY}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">Exon Hackathon 2024</div>
                    <div className="text-[11px] text-slate-400">Winner / 1st Place Champion</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">Rapid Career Promotion</div>
                    <div className="text-[11px] text-slate-400">Intern to Associate in 6 Months</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education & Credentials</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Verified Credentials</span>
              </div>

              <div className="space-y-4">
                {EDUCATION_ITEMS.map((edu, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        {edu.degree}
                      </div>
                      <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 w-fit">
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-300">
                      {edu.institution}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
