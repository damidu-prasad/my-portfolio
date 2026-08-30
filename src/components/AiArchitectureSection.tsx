import React, { useState } from 'react';
import { 
  BrainCircuit, Sparkles, Cpu, Bot, Workflow, 
  Terminal, ArrowRight, CheckCircle2, Zap, Layers, 
  Database, Network, Search, MessageSquare, Play, RefreshCw 
} from 'lucide-react';
import { AI_CAPABILITIES, PERSONAL_DETAILS } from '../data/portfolioData';
import { playCyberBlip, playSuccessChime } from '../utils/audio';

const ARCHITECTURE_FLOWS = [
  {
    id: 'rag',
    title: 'Custom RAG (Retrieval-Augmented Generation)',
    tag: 'Enterprise Search & Knowledge',
    description: 'Scalable retrieval pipeline extracting unstructured corporate documents into high-dimensional vector embeddings with hybrid semantic search.',
    steps: [
      { num: '01', title: 'Document Chunking', desc: 'Recursive token-aware text splitting & metadata tagging.' },
      { num: '02', title: 'Vector Embeddings', desc: 'Embedding conversion via OpenAI / Gemini text-embedding models.' },
      { num: '03', title: 'Vector DB Indexing', desc: 'Dense indexing in PostgreSQL (pgvector) / Pinecone with HNSW indexing.' },
      { num: '04', title: 'Semantic Re-Ranking', desc: 'Cosine similarity matching + cross-encoder re-ranking for top-K context.' },
      { num: '05', title: 'Grounded LLM Output', desc: 'Injecting verified context into system prompts to eliminate hallucinations.' }
    ]
  },
  {
    id: 'agents',
    title: 'Autonomous LLM Agents & Tool Calling',
    tag: 'Agentic Workflows',
    description: 'Multi-step agent loop utilizing structured function calls, webhooks, and schema validation to automate complex enterprise logic.',
    steps: [
      { num: '01', title: 'User Intent Parsing', desc: 'Zero-shot classification & intent extraction via LLM.' },
      { num: '02', title: 'Tool Selection Matrix', desc: 'Dynamic tool binding (REST API, SQL Query, Document Parser).' },
      { num: '03', title: 'Safe Sandbox Execution', desc: 'Backend parameter validation & authenticated service execution.' },
      { num: '04', title: 'Feedback Loop & Self-Correction', desc: 'Error reflection and parameter re-prompting on failure.' },
      { num: '05', title: 'Validated Response', desc: 'Strict JSON schema parsing and formatted user presentation.' }
    ]
  },
  {
    id: 'automation',
    title: 'Fintech & SaaS Automated Pipelines',
    tag: 'System Automation',
    description: 'Automated recurring billing, cooperative banking lead conversion, and real-time operational notifications.',
    steps: [
      { num: '01', title: 'Event Triggers & Webhooks', desc: 'Real-time banking society inquiries & SaaS user actions.' },
      { num: '02', title: 'Payload Normalization', desc: 'Queue processing with validation and deduplication.' },
      { num: '03', title: 'Automated Routing', desc: 'Lead scoring and automated assignment to branch officers.' },
      { num: '04', title: 'Database Ledger Sync', desc: 'ACID-compliant transactional recording in MySQL / Java EE backend.' },
      { num: '05', title: 'Audit Trail & Reporting', desc: 'Automated daily reconciliation and financial audit reports.' }
    ]
  }
];

const SIMULATED_PROMPTS = [
  {
    label: 'Query TEMCO Banking Leads',
    type: 'RAG / Fintech',
    query: 'Identify pending financial conversions for Samma Upakara plan and summarize lead status.',
    output: `[RAG Vector Match (Score: 0.98)]
Found 34 pending records for Samma Upakara Thirsara Investment Plan.
• Lead Conversion Efficiency: +40%
• Status: Financial auditing ledger synchronized with MySQL backend.
• Security: Role-based transactional token verified.`
  },
  {
    label: 'Extract JSON from Client Specs',
    type: 'LLM Agent',
    query: 'Convert incoming customer billing request into structured JSON for automated dispatch.',
    output: `{
  "action": "AUTOMATE_DISPATCH",
  "clientTier": "ENTERPRISE_FINTECH",
  "priority": "HIGH",
  "modules": ["React_Frontend", "Spring_Boot_Microservice", "Gemini_API"],
  "status": "READY_FOR_DEPLOYMENT"
}`
  },
  {
    label: 'Audit Microservice Latency',
    type: 'System Optimization',
    query: 'Analyze RESTful API response bottlenecks between Java EE backend and React frontend.',
    output: `[Performance Benchmark]
✓ Render Logic: Memoized React component tree
✓ API Payload: Gzip compressed JSON responses
✓ Latency: Page load reduced by 25% across enterprise dashboard
✓ Status: 100% Sprint Deliverables Met`
  }
];

export const AiArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('rag');
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [liveOutput, setLiveOutput] = useState<string>(SIMULATED_PROMPTS[0].output);

  const currentFlow = ARCHITECTURE_FLOWS.find(f => f.id === activeTab) || ARCHITECTURE_FLOWS[0];

  const handleSimulate = (idx: number) => {
    playCyberBlip(600, 0.04);
    setSelectedPromptIdx(idx);
    setIsSimulating(true);
    setLiveOutput('');

    const targetOutput = SIMULATED_PROMPTS[idx].output;
    let i = 0;
    const interval = setInterval(() => {
      if (i < targetOutput.length) {
        setLiveOutput(targetOutput.substring(0, i + 3));
        i += 3;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        playSuccessChime();
      }
    }, 15);
  };

  return (
    <section id="ai-architecture" className="py-24 relative overflow-hidden">
      
      {/* 3D Glow Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-cyan-950/30">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SPECIALIZATION FOCUS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            AI Engineering & System Automation
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Architecting intelligent enterprise solutions powered by LLM integrations, custom RAG pipelines, autonomous agents, and automated SaaS workflows.
          </p>
        </div>

        {/* AI Capabilities 4-Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {AI_CAPABILITIES.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {idx === 0 && <Database className="w-5 h-5" />}
                  {idx === 1 && <Bot className="w-5 h-5" />}
                  {idx === 2 && <Workflow className="w-5 h-5" />}
                  {idx === 3 && <Sparkles className="w-5 h-5" />}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-850 flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-cyan-300/80 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Architecture Flow Visualizer */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-8">
          
          {/* Tabs Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Architecture Blueprint
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Production Pipeline Execution
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ARCHITECTURE_FLOWS.map((flow) => {
                const isActive = flow.id === activeTab;
                return (
                  <button
                    key={flow.id}
                    onClick={() => {
                      playCyberBlip(540, 0.04);
                      setActiveTab(flow.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {flow.title.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Flow Explanation */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>{currentFlow.tag}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {currentFlow.description}
            </p>
          </div>

          {/* Visual Step-by-Step Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {currentFlow.steps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-200"
              >
                <div className="text-xs font-mono font-extrabold text-cyan-400 flex items-center justify-between">
                  <span>STEP {step.num}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive AI Query Sandbox Testbench */}
          <div className="pt-6 border-t border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Live AI Execution Sandbox
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Click a query to trigger pipeline simulation
              </span>
            </div>

            {/* Prompt Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {SIMULATED_PROMPTS.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSimulate(pIdx)}
                  disabled={isSimulating}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                    selectedPromptIdx === pIdx
                      ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Play className="w-3 h-3 text-cyan-400" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Terminal Live Output Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 font-mono text-xs text-slate-300 shadow-inner min-h-[120px] relative">
              <div className="text-[11px] text-slate-500 pb-2 border-b border-slate-900 mb-2 flex items-center justify-between">
                <span>Prompt: &quot;{SIMULATED_PROMPTS[selectedPromptIdx].query}&quot;</span>
                <span className="text-cyan-400">{SIMULATED_PROMPTS[selectedPromptIdx].type}</span>
              </div>

              <pre className="whitespace-pre-wrap font-mono text-cyan-300 leading-relaxed">
                {liveOutput}
                {isSimulating && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
