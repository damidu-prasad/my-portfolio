import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, Maximize2, Minimize2, 
  Trash2, CornerDownLeft, Sparkles, Check, Copy 
} from 'lucide-react';
import { 
  PERSONAL_DETAILS, PROFESSIONAL_SUMMARY, EXPERIENCES, 
  PROJECTS, SKILL_CATEGORIES, EDUCATION_ITEMS, AI_CAPABILITIES 
} from '../data/portfolioData';
import { playCyberBlip, playSuccessChime } from '../utils/audio';

interface TerminalSectionProps {
  onOpenResume: () => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ onOpenResume }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            ⚡ Damindu Prasad v3.0 Interactive Developer Shell [AI & Full-Stack Engine]
          </p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-amber-300 font-bold">help</span> or click suggested chips below to inspect background, AI pipelines, and enterprise projects.
          </p>
        </div>
      )
    }
  ]);
  const [copied, setCopied] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the internal terminal container, NOT the entire webpage!
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    playCyberBlip(700, 0.04);

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-300 font-semibold mb-2">Available Shell Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-slate-300">
              <div><span className="text-amber-400 font-bold">ai</span> : AI & System Automation pipelines</div>
              <div><span className="text-amber-400 font-bold">about</span> : Summary & biographical data</div>
              <div><span className="text-amber-400 font-bold">skills</span> : Full-stack & AI technical capabilities</div>
              <div><span className="text-amber-400 font-bold">projects</span> : Key software projects & live URLs</div>
              <div><span className="text-amber-400 font-bold">exp</span> : Professional engineering experience</div>
              <div><span className="text-amber-400 font-bold">edu</span> : Education & academic credentials</div>
              <div><span className="text-amber-400 font-bold">contact</span> : Direct email, WhatsApp & links</div>
              <div><span className="text-amber-400 font-bold">cv</span> : Open interactive printable CV</div>
              <div><span className="text-amber-400 font-bold">hire</span> : Direct recruitment instructions</div>
              <div><span className="text-amber-400 font-bold">clear</span> : Clear console buffer</div>
            </div>
          </div>
        );
        break;

      case 'ai':
      case 'rag':
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">AI & System Automation Architectures:</p>
            {AI_CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800 space-y-0.5">
                <div className="text-cyan-400 font-bold">• {cap.title}</div>
                <div className="text-slate-400 text-[11px]">{cap.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">{PERSONAL_DETAILS.fullName}</p>
            <p className="text-slate-400">{PROFESSIONAL_SUMMARY}</p>
            <div className="text-[11px] text-slate-400 pt-1">
              📍 {PERSONAL_DETAILS.location} | 🗣️ {PERSONAL_DETAILS.languages.join(', ')}
            </div>
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-3 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">Technical Matrix Summary:</p>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-amber-400 font-semibold">• {cat.title}: </span>
                <span className="text-slate-300">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">Featured Enterprise Projects:</p>
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-white font-bold flex items-center justify-between">
                  <span>{idx + 1}. {proj.title}</span>
                  <span className="text-cyan-400 text-[10px]">{proj.category}</span>
                </div>
                <div className="text-slate-400 text-[11px]">{proj.description}</div>
                <div className="text-slate-500 text-[10px]">Stack: {proj.technologies.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
      case 'experience':
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">Professional Experience:</p>
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800 space-y-0.5">
                <div className="text-white font-bold">{exp.role} @ {exp.company}</div>
                <div className="text-cyan-400 text-[10px]">{exp.period} ({exp.location})</div>
                <div className="text-slate-400 text-[11px] mt-1">{exp.bullets[0]}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'edu':
      case 'education':
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">Academic Credentials:</p>
            {EDUCATION_ITEMS.map((edu, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800">
                <div className="text-white font-bold">{edu.degree}</div>
                <div className="text-amber-400 text-[10px]">{edu.institution} ({edu.period})</div>
                <div className="text-slate-400 text-[11px] mt-1">{edu.details}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">Direct Channels:</p>
            <p>📧 Email: <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-cyan-400 underline">{PERSONAL_DETAILS.email}</a></p>
            <p>📱 WhatsApp: <a href="https://wa.me/94770073699" target="_blank" rel="noreferrer" className="text-emerald-400 underline">+94 77 007 3699</a> | +94 77 749 6394</p>
            <p>🔗 LinkedIn: <a href={PERSONAL_DETAILS.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_DETAILS.linkedinUrl}</a></p>
            <p>🐙 GitHub: <a href={PERSONAL_DETAILS.githubUrl} target="_blank" rel="noreferrer" className="text-slate-200 underline">{PERSONAL_DETAILS.githubUrl}</a></p>
          </div>
        );
        break;

      case 'cv':
      case 'resume':
        onOpenResume();
        resultNode = (
          <p className="text-emerald-400 text-xs font-mono">
            ✓ Triggering Official Resume Modal view & PDF downloader...
          </p>
        );
        break;

      case 'hire':
        resultNode = (
          <div className="p-3 rounded-lg bg-cyan-950/50 border border-cyan-500/40 text-xs font-mono text-slate-200 space-y-1">
            <p className="text-cyan-300 font-bold">Ready to collaborate?</p>
            <p>Damindu is actively available for Full-Time Software Engineering roles, Enterprise AI Integrations, and Freelance Automation contracts.</p>
            <p className="text-amber-300">Reach out directly via email at <span className="underline">{PERSONAL_DETAILS.email}</span> or WhatsApp at <span className="underline">+94 77 007 3699</span>.</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case '':
        return;

      default:
        resultNode = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: &apos;{rawCmd}&apos;. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => runCommand('help')}>help</span> for valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: resultNode }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runCommand(inputVal);
    setInputVal('');
  };

  const handleCopyContacts = () => {
    const text = `Damindu Prasad Jayarathna - AI & Full-Stack Software Engineer\nEmail: ${PERSONAL_DETAILS.email}\nPhone: ${PERSONAL_DETAILS.phones.join(', ')}\nLinkedIn: ${PERSONAL_DETAILS.linkedinUrl}\nGitHub: ${PERSONAL_DETAILS.githubUrl}`;
    navigator.clipboard.writeText(text);
    playSuccessChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>05. INTERACTIVE DEVELOPER CLI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Terminal Shell & Query Console
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Execute direct terminal commands to inspect background, technologies, projects, or trigger immediate actions.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden shadow-cyan-950/30">
          
          {/* Top Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
                damindu@dev-box: ~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyContacts}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 transition-colors"
                title="Copy contact card"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Info'}</span>
              </button>

              <button
                onClick={() => { playCyberBlip(400, 0.04); setHistory([]); }}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Clear console"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalBodyRef}
            className="p-5 min-h-[320px] max-h-[440px] overflow-y-auto space-y-4 font-mono text-xs"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-2">
                {item.command !== 'init' && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="text-emerald-400 font-bold">➜</span>
                    <span className="text-slate-500">~</span>
                    <span className="text-slate-200 font-bold">{item.command}</span>
                  </div>
                )}
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 text-slate-200 pt-1">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-slate-500">~</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type a command (e.g. 'ai', 'help', 'skills', 'projects', 'cv')..."
                className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-xs placeholder:text-slate-600"
              />
              <button 
                type="submit" 
                className="p-1 rounded bg-slate-800/80 hover:bg-cyan-600 text-slate-400 hover:text-slate-950 transition-colors"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Quick Command Chips Footer */}
          <div className="bg-slate-900/90 px-4 py-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">Quick queries:</span>
            {['ai', 'help', 'about', 'skills', 'projects', 'exp', 'edu', 'contact', 'cv', 'hire'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => runCommand(cmd)}
                className="px-2.5 py-0.5 rounded bg-slate-950 hover:bg-cyan-950 hover:border-cyan-500/40 border border-slate-800 text-[11px] font-mono text-cyan-400 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
