import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, X, Send, CornerDownLeft, 
  MessageSquare, User, Check, ExternalLink, 
  FileText, Phone, Mail, ArrowRight, RefreshCw, Zap 
} from 'lucide-react';
import { 
  PERSONAL_DETAILS, PROFESSIONAL_SUMMARY, EXPERIENCES, 
  PROJECTS, SKILL_CATEGORIES, EDUCATION_ITEMS, AI_CAPABILITIES 
} from '../data/portfolioData';
import { playCyberBlip, playSuccessChime } from '../utils/audio';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actions?: { label: string; onClick: () => void }[];
  timestamp: string;
}

interface DaminduAiBotProps {
  onOpenResume: () => void;
}

const PRESET_QUESTIONS = [
  "What AI & RAG systems have you built?",
  "Tell me about the TEMCO Banking project",
  "What is your full-stack tech stack?",
  "How can I hire or contact you via WhatsApp?",
  "What was your role at Exon Software Solutions?"
];

export const DaminduAiBot: React.FC<DaminduAiBotProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I am **Damindu's AI Digital Assistant**. 

I can answer any questions about Damindu's **AI Engineering**, **RAG architectures**, **Full-Stack experience (React.js, Next.js, Java EE, Spring Boot)**, and **Enterprise Projects (TEMCO Bank, Olix AI Agency)**.

How can I help you today?`,
      timestamp: 'Just now',
      actions: [
        { label: 'View Resume (CV)', onClick: onOpenResume },
        { 
          label: 'Chat on WhatsApp', 
          onClick: () => window.open('https://wa.me/94770073699?text=Hi%20Damindu,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!', '_blank') 
        }
      ]
    }
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the internal chat container, avoiding window scroll-jacking
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleToggle = () => {
    playCyberBlip(isOpen ? 450 : 650, 0.05);
    setIsOpen(!isOpen);
  };

  const generateAnswer = (userQuery: string): { text: string; actions?: { label: string; onClick: () => void }[] } => {
    const q = userQuery.toLowerCase();

    // 1. AI & RAG
    if (q.includes('ai') || q.includes('rag') || q.includes('llm') || q.includes('automation') || q.includes('langchain') || q.includes('prompt') || q.includes('gemini') || q.includes('openai')) {
      return {
        text: `**Damindu specializes in AI & System Automation**:

• **Custom RAG Architectures**: Implements vector embeddings, document chunking, and hybrid semantic search in PostgreSQL/Pinecone to ground LLM responses with zero hallucinations.
• **Autonomous Agent Workflows**: Builds tool-calling pipelines and reasoning loops with **OpenAI GPT-4o** and **Google Gemini APIs**.
• **Enterprise Automation**: Automates SaaS business workflows, lead verification pipelines, and financial records.
• **Current Work**: As a **Freelance Software Engineer & System Automation Developer (Jan 2026 - Present)**, he builds custom RAG apps and fintech SaaS automation platforms.`,
        actions: [
          { label: 'Explore AI Architecture Section', onClick: () => document.querySelector('#ai-architecture')?.scrollIntoView({ behavior: 'smooth' }) },
          { label: 'View Olix AI Platform', onClick: () => window.open('https://olixai.netlify.app', '_blank') }
        ]
      };
    }

    // 2. TEMCO Bank
    if (q.includes('temco') || q.includes('bank') || q.includes('fintech') || q.includes('lead')) {
      return {
        text: `**TEMCO Management System (temcobank.com)**:

• **Domain**: Cooperative Banking Society & Lead Conversion Platform.
• **Stack**: React.js, Java EE, Spring Boot, MySQL, RESTful APIs, Tailwind CSS.
• **Key Contribution**: Engineered an automated lead conversion and financial tracking workflow with the *'Samma Upakara Thirsara Investment Plan'* module.
• **Impact**: Streamlined secure financial records and accelerated lead conversion velocity by 40%.`,
        actions: [
          { label: 'Visit temcobank.com', onClick: () => window.open('https://temcobank.com', '_blank') }
        ]
      };
    }

    // 3. Olix Holdings
    if (q.includes('olix') || q.includes('agency')) {
      return {
        text: `**Olix Holdings Corporate Platform (olixai.netlify.app)**:

• **Domain**: Digital Agency specializing in AI Automation and modern business solutions.
• **Role**: UI/UX & Frontend Architect.
• **Stack**: React.js, Tailwind CSS, Netlify, AI Service Showcase funnels.
• **Impact**: Designed and deployed the official platform with modern UI/UX principles to maximize client engagement and conversion rates.`,
        actions: [
          { label: 'Visit olixai.netlify.app', onClick: () => window.open('https://olixai.netlify.app', '_blank') }
        ]
      };
    }

    // 4. Exon Software Solutions / Experience
    if (q.includes('exon') || q.includes('experience') || q.includes('work') || q.includes('career') || q.includes('company') || q.includes('hackathon')) {
      return {
        text: `**Professional Experience at Exon Software Solutions**:

1. **Associate Software Engineer (May 2023 – Dec 2025)**:
   • Engineered enterprise web apps using React.js and Java EE, achieving a **30% improvement in system reliability**.
   • Optimized frontend rendering and REST APIs, **reducing page load times by 25%**.
   • **Earned a rapid promotion from Intern to Associate in just 6 months**.
   
2. **Intern Associate Software Engineer (Nov 2022 – May 2023)**:
   • Built user-centric PrimeFaces UI integrated with secure Spring Boot backends.
   • **1st Place Champion at Exon Hackathon 2024** for an innovative software prototype.`,
        actions: [
          { label: 'View Career Timeline', onClick: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) }
        ]
      };
    }

    // 5. Tech Stack & Skills
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('java') || q.includes('spring') || q.includes('next')) {
      return {
        text: `**Damindu's Core Technical Matrix**:

• **AI & Automation**: LLM APIs (OpenAI, Gemini), RAG, Prompt Engineering, LangChain concepts, Automated SaaS Workflows.
• **Frontend**: React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, PrimeReact, Figma.
• **Backend**: Java EE, Spring Boot, Node.js (Express), PHP, Laravel, Microservices, RESTful APIs.
• **Databases**: MySQL, PostgreSQL, MSSQL, Firebase (Firestore/Auth).
• **Cloud & DevOps**: AWS (EC2, S3), Docker, CI/CD, Git, GitHub, Maven, Postman, JIRA.`,
        actions: [
          { label: 'Explore Skills Matrix', onClick: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) }
        ]
      };
    }

    // 6. Education / Degree
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('birmingham') || q.includes('aat') || q.includes('college')) {
      return {
        text: `**Academic Qualifications**:

• **BSc (Hons) in Software Engineering**: Birmingham City University, UK (via Java Institute) — Graduated 27 April 2026.
• **AAT Level 2 (Accounting)**: Association of Accounting Technicians (Certified in corporate financial management & budgeting).
• **NEDP System**: Built specialized educational infrastructure for prestigious Ananda College.`,
        actions: [
          { label: 'View Resume (CV)', onClick: onOpenResume }
        ]
      };
    }

    // 7. Contact / Hire / WhatsApp
    if (q.includes('contact') || q.includes('hire') || q.includes('whatsapp') || q.includes('email') || q.includes('phone') || q.includes('call') || q.includes('reach')) {
      return {
        text: `**Connect Directly with Damindu**:

• **Primary Email**: [damiduprasadjayarathna@gmail.com](mailto:damiduprasadjayarathna@gmail.com)
• **Phone & WhatsApp**: **+94 77 007 3699** / **+94 77 749 6394**
• **Location**: Kegalle / Colombo, Sri Lanka (Available for Remote & Relocation)
• **Availability**: Open for Full-Time Roles, Contract Consulting, and Freelance AI / Full-Stack projects!`,
        actions: [
          { 
            label: 'Instant WhatsApp (+94 77 007 3699)', 
            onClick: () => window.open('https://wa.me/94770073699?text=Hi%20Damindu,%20I%20am%20interested%20in%20discussing%20a%20project/role.', '_blank') 
          },
          { label: 'Open Contact Form', onClick: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }
        ]
      };
    }

    // Default fallback
    return {
      text: `Damindu Prasad Jayarathna is a **Full-Stack Software Engineer & AI System Developer** with **3+ years of experience** specializing in React.js, Next.js, Java EE, Spring Boot, and AI integrations (LLMs, RAG, automated workflows).

Would you like to explore his featured projects, view his verified credentials, or connect via WhatsApp?`,
      actions: [
        { label: 'View All Projects', onClick: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Open Digital Resume', onClick: onOpenResume },
        { 
          label: 'Direct WhatsApp', 
          onClick: () => window.open('https://wa.me/94770073699', '_blank') 
        }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    playCyberBlip(550, 0.04);
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = generateAnswer(text);
      setIsTyping(false);
      playSuccessChime();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        actions: response.actions,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-slate-950 font-bold text-xs shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/40"
          title="Open Damindu's AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center text-cyan-400">
            <Bot className="w-4 h-4 animate-bounce" />
          </div>
          <span className="font-mono tracking-tight text-white">Ask Damindu AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
        </button>
      )}

      {/* Expanded AI Chat Assistant Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[540px] max-h-[82vh] bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden animate-fadeIn relative">
          
          {/* Top Header */}
          <div className="bg-slate-900/90 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400 font-mono text-sm">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Damindu AI Assistant</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-[9px] font-mono text-cyan-300">
                    v3.0
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • AI & Full-Stack Knowledge Base</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleToggle}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container (Scrolls internally ONLY, no page scroll jumping) */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 font-sans text-xs"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none shadow-md shadow-cyan-600/20'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => {
                            playCyberBlip(620, 0.04);
                            act.onClick();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/50 text-[10px] font-mono text-cyan-300 transition-colors flex items-center gap-1"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400">
                <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Query Chips */}
          <div className="bg-slate-900/60 px-3 py-2 border-t border-slate-850 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about Damindu's AI, tech, experience..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-xs text-slate-200 outline-none placeholder:text-slate-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
