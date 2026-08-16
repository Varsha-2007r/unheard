import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Network, 
  TrendingUp, 
  EyeOff, 
  Send, 
  CheckCircle
} from 'lucide-react';

export const ArchitecturePipeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 1,
      title: "USER EXPERIENCE",
      icon: Send,
      short: "Safe Qualitative Input",
      textColor: "text-[#2563EB]",
      borderColor: "border-[#BFDBFE]",
      description: "Captures everyday friction across multiple accessible modalities (text narrative, voice recording, or photos) without requiring technical jargon or formal legal phrasing."
    },
    {
      id: 2,
      title: "PRIVACY PROTECTION",
      icon: ShieldCheck,
      short: "Zero-PII Tokenization",
      textColor: "text-[#1D4ED8]",
      borderColor: "border-[#BFDBFE]",
      description: "Client-side sanitization immediately strips phone numbers, names, and identification numbers, generalizing GPS to broad sector grid buckets."
    },
    {
      id: 3,
      title: "AI UNDERSTANDING",
      icon: Sparkles,
      short: "Semantic Extraction",
      textColor: "text-[#2563EB]",
      borderColor: "border-[#BFDBFE]",
      description: "Google Gemini Flash or local deterministic NLP extracts core problem entities, sentiment urgency, time window, and societal consequence vectors into structured JSON."
    },
    {
      id: 4,
      title: "SEMANTIC CLUSTERING",
      icon: Network,
      short: "Vector Similarity Engine",
      textColor: "text-[#1D4ED8]",
      borderColor: "border-[#BFDBFE]",
      description: "Projects qualitative descriptions into 768-dimensional embedding space, computing cosine distance to find invisible connections across seemingly disparate stories."
    },
    {
      id: 5,
      title: "PATTERN DETECTION",
      icon: Cpu,
      short: "Structural Synthesis",
      textColor: "text-[#2563EB]",
      borderColor: "border-[#BFDBFE]",
      description: "Aggregates multi-point spatial and temporal clusters into singular named social problem entities (e.g., Morning Bus Overcrowding) with confidence scoring."
    },
    {
      id: 6,
      title: "TREND ANALYSIS",
      icon: TrendingUp,
      short: "Velocity Radar",
      textColor: "text-[#1D4ED8]",
      borderColor: "border-[#BFDBFE]",
      description: "Calculates weekly acceleration coefficients (e.g. +38% growth) to detect early-stage systemic strain before it culminates in acute public crisis."
    },
    {
      id: 7,
      title: "SILENCE INDEX",
      icon: EyeOff,
      short: "Iceberg Modeling",
      textColor: "text-[#2563EB]",
      borderColor: "border-[#BFDBFE]",
      description: "Heuristic modeling of latent reporting friction and demographic silence to estimate the ratio between explicit reports and actual affected community reach."
    },
    {
      id: 8,
      title: "ACTIONABLE SIGNAL",
      icon: CheckCircle,
      short: "Stakeholder Dispatch",
      textColor: "text-[#1D4ED8]",
      borderColor: "border-[#BFDBFE]",
      description: "Delivers an executive intelligence brief detailing root causes, geographic zones, and concrete mitigation recommendations directly to responsible institutions."
    }
  ];

  return (
    <section id="architecture" className="py-20 relative bg-[#EEF3FA] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>NEURAL SOCIAL DATA ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            HOW UNHEARD THINKS
          </h2>

          <p className="text-sm sm:text-base text-[#64748B]">
            An 8-stage privacy-first intelligence pipeline turning subjective human experience into objective, actionable community signals.
          </p>
        </div>

        {/* 8 Stages Grid in Pure White */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stages.map((st) => {
            const Icon = st.icon;
            const isSelected = activeStage === st.id;

            return (
              <div
                key={st.id}
                onClick={() => setActiveStage(st.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'border-[#2563EB] bg-white shadow-md scale-102 ring-1 ring-[#2563EB]'
                    : 'border-[#D9E2F0] bg-white hover:border-[#BFDBFE] hover:bg-[#F8FAFC]'
                } flex flex-col justify-between space-y-3 group`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl bg-[#EEF3FA] border border-[#D9E2F0] flex items-center justify-center ${st.textColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] font-bold">
                    STAGE 0{st.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-display font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {st.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#64748B] mt-0.5 font-medium">
                    {st.short}
                  </div>
                </div>

                <p className="text-[11px] text-[#64748B] leading-relaxed font-sans line-clamp-3">
                  {st.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Inspection Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#2563EB] font-bold uppercase">
              SELECTED PIPELINE FOCUS: STAGE 0{activeStage} — {stages[activeStage - 1].title}
            </span>
            <p className="text-[#64748B] font-sans text-xs">
              {stages[activeStage - 1].description}
            </p>
          </div>

          <div className="text-[11px] text-[#1D4ED8] font-bold shrink-0 px-3 py-1.5 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE]">
            LATENCY: &lt; 850ms END-TO-END
          </div>
        </div>

      </div>
    </section>
  );
};
