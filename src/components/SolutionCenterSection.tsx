import React, { useState } from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  Radio, 
  Scale, 
  Sparkles 
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { ClusteredPattern } from '../types';

export const SolutionCenterSection: React.FC = () => {
  const { patterns } = useIntelligence();
  const [selectedPatternId, setSelectedPatternId] = useState<string>('PAT-01');

  const activePattern: ClusteredPattern = patterns.find(p => p.id === selectedPatternId) || patterns[0];

  return (
    <section className="py-20 relative bg-[#EEF3FA] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <Lightbulb className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>ACTIONABLE SOCIAL INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            FROM PROBLEM TO POSSIBLE ACTION
          </h2>

          <p className="text-sm sm:text-base text-[#64748B]">
            UNHEARD synthesizes structured intervention briefs to help institutions allocate resources with empirical precision.
          </p>
        </div>

        {/* Pattern Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs font-mono">
          {patterns.slice(0, 5).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPatternId(p.id)}
              className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap font-semibold ${
                selectedPatternId === p.id
                  ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md'
                  : 'bg-white border-[#D9E2F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#BFDBFE]'
              }`}
            >
              {p.category}: {p.title.slice(0, 32)}...
            </button>
          ))}
        </div>

        {/* Main Solution Dossier Card in Pure White */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-8">
          
          {/* Top Row: Problem & Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D9E2F0]">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#2563EB] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-pulse" />
                IDENTIFIED SOCIAL PROBLEM
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A]">
                {activePattern.title}
              </h3>
              <div className="text-xs font-mono text-[#64748B] font-medium">
                {activePattern.relatedExperienceCount} related experiences • {activePattern.aggregatedAreaCount} aggregated zones • +{activePattern.growthRate}% signal growth
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start md:self-auto font-mono text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] font-bold">
                {activePattern.lifecycleStatus}
              </span>
            </div>
          </div>

          {/* 3-Column Structured Breakdown: Causes -> AI Actions -> Stakeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* Column 1: Possible Causes */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 shadow-sm">
              <div className="text-[#2563EB] font-bold uppercase tracking-wider text-[11px]">
                01. WHY IT MAY BE HAPPENING
              </div>
              <ul className="space-y-2 text-[#0F172A] font-sans text-xs">
                {(activePattern.possibleCauses || []).map((cause, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#2563EB] font-bold font-mono mr-1">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: AI-Suggested Actions */}
            <div className="p-5 rounded-2xl bg-[#DBEAFE]/30 border border-[#BFDBFE] space-y-3 shadow-sm">
              <div className="text-[#1D4ED8] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                02. AI-SUGGESTED ACTIONS
              </div>
              <ul className="space-y-2 text-[#0F172A] font-sans text-xs">
                {(activePattern.aiSuggestedActions || []).map((action, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Stakeholders & Impact */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-4 shadow-sm">
              <div className="space-y-2">
                <div className="text-[#1D4ED8] font-bold uppercase tracking-wider text-[11px]">
                  03. SUGGESTED STAKEHOLDERS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(activePattern.suggestedStakeholders || []).map((stk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-[#D9E2F0] text-[10px] text-[#0F172A] font-medium">
                      {stk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#D9E2F0] space-y-1">
                <div className="text-[#2563EB] font-bold uppercase tracking-wider text-[10px]">
                  PROJECTED COMMUNITY IMPACT:
                </div>
                <p className="text-[#64748B] font-sans text-xs">
                  {activePattern.expectedImpact}
                </p>
              </div>
            </div>

          </div>

          {/* Mandatory Responsible Disclosure */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] text-[11px] font-mono text-[#64748B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>
                <strong className="text-[#0F172A]">AI-SUGGESTED ACTIONS:</strong> Recommendations are decision-support heuristics. Humans remain responsible for verification and policy decisions.
              </span>
            </div>
            <span className="text-[#94A3B8] shrink-0">DEMO ROUTING PROTOCOL</span>
          </div>

        </div>

      </div>
    </section>
  );
};
