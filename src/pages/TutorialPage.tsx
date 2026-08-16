import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  BrainCircuit, 
  User, 
  PlusCircle, 
  Layers, 
  Play,
  RotateCcw
} from 'lucide-react';

export const TutorialPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const tutorialSteps = [
    {
      step: 1,
      tag: "01. NARRATIVE",
      title: "SHARE WHAT HAPPENED",
      subtitle: "Qualitative friction expressed in plain human language.",
      desc: "Citizens describe everyday friction naturally without needing formal phrasing or administrative filing codes.",
      example: "“Streetlights near my hostel have not worked for several weeks and people avoid the road after dark.”",
      highlight: "Simple narrative input"
    },
    {
      step: 2,
      tag: "02. CONTEXT",
      title: "ADD SAFE CONTEXT",
      subtitle: "Broad environmental parameters, zero personal surveillance.",
      desc: "Provide approximate time of day, affected user group, and broad municipal sector to help the AI map structural impact.",
      example: "Area: Hostel Sector • Time: Night • Affected: Students • Impact: High",
      highlight: "Sector-level bucketing"
    },
    {
      step: 3,
      tag: "03. PRIVACY",
      title: "PROTECT YOUR IDENTITY",
      subtitle: "Client-side zero-PII redaction before transmission.",
      desc: "Automated Named Entity Recognition redacts names, phone numbers, room IDs, and exact GPS coordinates client-side.",
      example: "[REDACTED] avoids walking past [SECTOR 03] at 21:00 due to broken lighting.",
      highlight: "100% Zero-PII guarantee"
    },
    {
      step: 4,
      tag: "04. AI ANALYSIS",
      title: "AI UNDERSTANDS INTENT",
      subtitle: "Semantic extraction and high-dimensional vector embeddings.",
      desc: "Google Gemini and the local causal engine extract core problem entities, sentiment urgency, and consequence mappings.",
      example: "Extracted Problem: Inoperative nocturnal lighting • Sentiment: High Urgency",
      highlight: "768-dim contextual vectors"
    },
    {
      step: 5,
      tag: "05. CLUSTERING",
      title: "FIND RELATED EXPERIENCES",
      subtitle: "Connecting discrete voices across space and time.",
      desc: "The vector engine correlates reports from independent pedestrians across the same zone experiencing identical barriers.",
      example: "Your report joins 23 other independent voices in the Perimeter Sector Belt.",
      highlight: "Cosine similarity: 0.94"
    },
    {
      step: 6,
      tag: "06. PATTERN",
      title: "DETECT A SYSTEMIC PATTERN",
      subtitle: "The tipping point where isolated stories become institutional signals.",
      desc: "A formal pattern is synthesized with Silence Index modeling and weekly velocity curve acceleration alerts.",
      example: "Pattern: Night-Time Accessibility & Lighting Concern (+38% velocity surge)",
      highlight: "92% Silence Index gap"
    },
    {
      step: 7,
      tag: "07. ACTION",
      title: "SUGGEST AN ACTION & RESOLUTION",
      subtitle: "From problem to structured stakeholder dispatch.",
      desc: "Actionable briefs are automatically compiled for municipal authorities, tracking progress from review to verified repair.",
      example: "Target: Municipal Infrastructure Team • Action: Emergency junction repair at Pole #42",
      highlight: "Verified civic resolution"
    }
  ];

  const active = tutorialSteps[currentStep - 1];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
          <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>INTERACTIVE TUTORIAL</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
          HOW ONE EXPERIENCE BECOMES A SOCIAL SIGNAL
        </h1>

        <p className="text-sm sm:text-base text-[#64748B] font-sans">
          A step-by-step interactive walkthrough of how UNHEARD bridges the gap between individual silence and systemic action.
        </p>
      </div>

      {/* 7-Step Navigation Pill Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono">
        {tutorialSteps.map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`px-4 py-2.5 rounded-2xl border transition-all whitespace-nowrap font-bold flex items-center space-x-2 ${
              currentStep === s.step
                ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md scale-105'
                : currentStep > s.step
                ? 'bg-[#DBEAFE] border-[#BFDBFE] text-[#1D4ED8]'
                : 'bg-white border-[#D9E2F0] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span>{s.step < currentStep ? '✓' : `0${s.step}`}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Step Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#D9E2F0] shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Top Tag & Progress */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D9E2F0] font-mono text-xs">
          <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {active.tag}
          </span>
          <span className="text-[#64748B] font-bold">
            STEP {currentStep} OF 7
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A]">
            {active.title}
          </h2>
          <p className="text-base sm:text-lg text-[#2563EB] font-semibold">
            {active.subtitle}
          </p>
          <p className="text-sm text-[#64748B] font-sans leading-relaxed max-w-3xl">
            {active.desc}
          </p>
        </div>

        {/* Dynamic Interactive Demonstration Box */}
        <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 font-mono text-xs shadow-inner">
          <div className="text-[11px] text-[#64748B] font-bold uppercase flex items-center justify-between">
            <span>LIVE PIPELINE DEMONSTRATION:</span>
            <span className="px-2 py-0.5 rounded bg-[#DBEAFE] text-[#1D4ED8] font-bold">
              {active.highlight}
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#D9E2F0] text-[#0F172A] font-sans text-sm italic shadow-xs">
            {active.example}
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D9E2F0] font-mono text-xs">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className="px-5 py-3 rounded-xl bg-[#EEF3FA] hover:bg-[#DBEAFE] text-[#0F172A] font-bold transition-all disabled:opacity-30 flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREVIOUS STEP</span>
          </button>

          {currentStep < 7 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center space-x-1.5"
            >
              <span>NEXT STEP →</span>
            </button>
          ) : (
            <Link
              to="/report"
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center space-x-1.5"
            >
              <span>TRY REPORTING A PROBLEM →</span>
            </Link>
          )}
        </div>

      </div>

    </div>
  );
};
