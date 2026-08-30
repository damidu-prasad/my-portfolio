import React, { useState } from 'react';
import { 
  Mail, MessageSquare, Phone, MapPin, Send, 
  Copy, Check, ExternalLink, Sparkles, MessageCircle, 
  Linkedin, Github, ArrowUpRight, ShieldCheck, Clock 
} from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { playCyberBlip, playSuccessChime } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI & Software Engineering Inquiry',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.email);
    playSuccessChime();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.phones[0]);
    playSuccessChime();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    playCyberBlip(620, 0.05);

    const subjectEncoded = encodeURIComponent(formData.subject || 'Inquiry for Damindu Prasad');
    const bodyEncoded = encodeURIComponent(
      `Hello Damindu,\n\nName: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'Not provided'}\n\nMessage:\n${formData.message}\n\nSent from your Portfolio.`
    );

    const mailtoUrl = `mailto:${PERSONAL_DETAILS.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    window.location.href = mailtoUrl;

    setStatusMessage('Opening your default email client with prefilled details...');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSendWhatsApp = () => {
    playCyberBlip(680, 0.05);
    const text = encodeURIComponent(
      `Hi Damindu!\nMy name is ${formData.name || 'a visitor'}.\nRegarding: ${formData.subject}\n\nMessage: ${formData.message || 'I would like to discuss an AI/Full-Stack engineering opportunity.'}`
    );
    const waUrl = `https://wa.me/94770073699?text=${text}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>06. DIRECT CONTACT & HIRING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Intelligent
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you are looking for a Full-Time AI / Full-Stack Software Engineer, enterprise system automation, or freelance SaaS consulting, reach out directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Connect Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Direct Card */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-5 shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      Instant Messaging
                    </span>
                    <h4 className="text-base font-bold text-white">
                      WhatsApp Direct
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  Fastest
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Connect instantly on WhatsApp for immediate technical discussions or project scoping.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <a
                  href="https://wa.me/94770073699?text=Hi%20Damindu,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>+94 77 007 3699</span>
                </a>

                <a
                  href="https://wa.me/94777496394?text=Hi%20Damindu,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-all"
                  title="Secondary line"
                >
                  <span>+94 77 749 6394</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Official Email
                    </span>
                    <h4 className="text-base font-bold text-white">
                      Direct Inbox
                    </h4>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-3">
                <a 
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="text-xs sm:text-sm font-mono text-cyan-300 hover:underline break-all"
                >
                  {PERSONAL_DETAILS.email}
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Response within 24 hours
                </span>
                <a
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Compose Mail</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Location & Availability Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Current Base</div>
                  <div className="text-xs font-bold text-slate-200">{PERSONAL_DETAILS.location}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                Open for Remote
              </span>
            </div>

            {/* Social & Professional Links */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={PERSONAL_DETAILS.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 text-xs font-mono text-slate-300 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={PERSONAL_DETAILS.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-850 text-xs font-mono text-slate-300 transition-all"
              >
                <Github className="w-4 h-4 text-slate-100" />
                <span>GitHub Repos</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Send a Direct Message</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out the form below to dispatch via Email or open directly in WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Recruiter"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-slate-200 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-slate-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-medium">Subject / Opportunity</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Time Role / Project Consulting / AI Integration"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-slate-200 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-medium">Message Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project requirements, technology stack, or interview schedule..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-slate-200 outline-none transition-colors resize-none"
                  />
                </div>

                {statusMessage && (
                  <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300 font-mono animate-fadeIn">
                    {statusMessage}
                  </div>
                )}

                {/* Dispatch Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
