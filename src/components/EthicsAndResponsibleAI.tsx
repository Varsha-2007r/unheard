import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Sparkles 
} from 'lucide-react';

export const EthicsAndResponsibleAI: React.FC = () => {
  const privacyPillars = [
    {
      title: "PRIVACY BY DESIGN",
      desc: "Zero retention of personal IP addresses, device identifiers, or biometric cookies at the edge."
    },
    {
      title: "NO PUBLIC IDENTITY",
      desc: "Individual experiences are never published in raw identifiable forms or assigned public author profiles."
    },
    {
      title: "PERSONAL DATA REDACTION",
      desc: "Automatic NER sanitization strips student roll IDs, names, phone numbers, and hostel room units."
    },
    {
      title: "AGGREGATED LOCATIONS",
      desc: "All spatial data is normalized to broad 800m+ sector grid cells; private coordinates are never stored."
    },
    {
      title: "CONSENT BEFORE SHARING",
      desc: "Anonymous data is only clustered into social signals upon explicit user consent at submission."
    },
    {
      title: "HUMAN REVIEW FOR SERIOUS CLAIMS",
      desc: "Critical safety signals are routed to verified human welfare monitors for investigation before escalation."
    }
  ];

  return (
    <section id="ethics" className="py-20 relative bg-[#EEF3FA] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>ETHICAL AI & TRUST FRAMEWORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            WE REVEAL PATTERNS. <br />
            <span className="text-[#2563EB]">
              NOT PEOPLE.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748B]">
            UNHEARD does not adjudicate individual claims. It identifies recurring structural patterns that warrant institutional attention.
          </p>
        </div>

        {/* 6 Privacy Pillars in Pure White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {privacyPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all space-y-2 group shadow-sm"
            >
              <div className="flex items-center space-x-2 text-[#2563EB] font-mono text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                <span>{p.title}</span>
              </div>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Responsible AI & Limitations Disclosure */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#D9E2F0] space-y-6 shadow-md">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-[#D9E2F0]">
            <Scale className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base sm:text-lg font-display font-bold text-[#0F172A] uppercase tracking-wider">
              RESPONSIBLE AI GOVERNANCE & LIMITATIONS DISCLOSURE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-3 p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
              <div className="text-[#2563EB] font-bold uppercase flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#2563EB]" />
                <span>WHAT UNHEARD DOES NOT CLAIM:</span>
              </div>
              <ul className="space-y-2 text-[#64748B] list-disc pl-4 leading-relaxed font-sans text-xs">
                <li>Does not claim every submitted qualitative experience is judicial ground truth.</li>
                <li>Does not claim AI knows the exact statutory population count of affected persons.</li>
                <li>Does not present the Silence Index as a replacement for official census data.</li>
                <li>Does not claim an AI cluster alone proves malfeasance without field verification.</li>
              </ul>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
              <div className="text-[#1D4ED8] font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span>DECISION-SUPPORT PRINCIPLES:</span>
              </div>
              <p className="text-[#64748B] leading-relaxed font-sans text-xs">
                UNHEARD uses probabilistic language (<span className="text-[#2563EB] font-mono font-bold">signal, pattern, estimate, model confidence, requires verification</span>) to empower community leaders with actionable heuristics while respecting statistical integrity.
              </p>
              <div className="pt-2 text-[11px] text-[#94A3B8] font-semibold">
                FRAMEWORK: Stanford HAI & ACM FAccT Principles
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
