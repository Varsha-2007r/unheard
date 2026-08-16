import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Users, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  Layers, 
  AlertCircle,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Radio,
  CheckCircle2,
  Scale,
  Lightbulb
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { CategoryType, ClusteredPattern, TimeWindow, ZoneId } from '../types';

export const IntelligencePage: React.FC = () => {
  const { 
    filteredPatterns, 
    filters, 
    setFilters, 
    resetFilters, 
    metrics, 
    zones,
    patterns 
  } = useIntelligence();

  const [expandedPatternId, setExpandedPatternId] = useState<string | null>('PAT-01');
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('PAT-01');

  const categories: (CategoryType | 'All')[] = [
    'All',
    'Transport',
    'Safety',
    'Accessibility',
    'Food',
    'Infrastructure',
    'Education',
    'Healthcare',
    'Public Services'
  ];

  const timeWindows: (TimeWindow | 'All')[] = ['All', 'Morning', 'Afternoon', 'Evening', 'Night'];
  const severities = ['All', 'Critical', 'High', 'Moderate'];

  const activeSolutionPattern = patterns.find(p => p.id === selectedSolutionId) || patterns[0];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#D9E2F0]">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>AI PATTERN INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#0F172A] tracking-tight">
            FROM STORIES TO SIGNALS
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl font-sans">
            Thousands of fragmented experiences reveal systemic societal patterns that isolated complaints never surface.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-xs font-mono px-3.5 py-2 rounded-xl bg-white border border-[#D9E2F0] text-[#64748B] font-semibold flex items-center gap-1.5 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>AI ESTIMATE — DEMO</span>
          </span>
        </div>
      </div>

      {/* 5 Synchronized Metric Cards in Pure White */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all group">
          <div className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center justify-between">
            <span>VOLUME</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">DEMO</span>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] mt-2 group-hover:text-[#2563EB] transition-colors">
            {metrics.totalExperiencesAnalyzed.toLocaleString()}
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">Experiences Analyzed</div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all group">
          <div className="text-[10px] font-mono text-[#1D4ED8] uppercase tracking-widest font-bold flex items-center justify-between">
            <span>PATTERNS</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">CLUSTERS</span>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#2563EB] mt-2">
            {metrics.emergingPatternsCount}
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">Emerging Patterns</div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all group">
          <div className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center justify-between">
            <span>GEOGRAPHY</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">AREAS</span>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] mt-2">
            {metrics.activeSignalZonesCount}
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">Aggregated Zones</div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all group">
          <div className="text-[10px] font-mono text-[#1D4ED8] uppercase tracking-widest font-bold flex items-center justify-between">
            <span>INNOVATION</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">LATENT</span>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D4ED8] mt-2">
            {metrics.unseenSignalPercentage}%
          </div>
          <div className="text-xs text-[#64748B] mt-1 font-medium">Previously Unseen Signals</div>
        </div>

        {/* Metric 5 */}
        <div className="p-5 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] hover:shadow-md transition-all col-span-2 md:col-span-1 group">
          <div className="text-[10px] font-mono text-[#1D4ED8] uppercase tracking-widest font-bold flex items-center justify-between">
            <span>SILENCE GAP</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white text-[#1D4ED8] font-bold">ESTIMATE</span>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-black text-[#1D4ED8] mt-2">
            {metrics.averageSilenceIndex}%
          </div>
          <div className="text-xs text-[#1D4ED8] mt-1 font-bold">Silence Index</div>
        </div>

      </div>

      {/* Filter Control Bar in Pure White */}
      <div className="p-5 rounded-3xl bg-white border border-[#D9E2F0] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
              placeholder="Search patterns, keywords, topics (e.g. 'streetlights', 'bus 554', 'food')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] text-xs font-mono placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
            />
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-xs font-mono text-[#2563EB] bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] flex items-center justify-center space-x-1.5 font-bold transition-all shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET FILTERS</span>
          </button>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          
          {/* Category Filter */}
          <div>
            <label className="block text-[#64748B] text-[10px] uppercase font-bold mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
              className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Zone Filter */}
          <div>
            <label className="block text-[#64748B] text-[10px] uppercase font-bold mb-1">Sector Zone</label>
            <select
              value={filters.zoneId}
              onChange={(e) => setFilters(f => ({ ...f, zoneId: e.target.value }))}
              className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            >
              <option value="All">All Sectors</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>{z.code} - {z.name.slice(0, 20)}...</option>
              ))}
            </select>
          </div>

          {/* Time Window */}
          <div>
            <label className="block text-[#64748B] text-[10px] uppercase font-bold mb-1">Time of Day</label>
            <select
              value={filters.timeWindow}
              onChange={(e) => setFilters(f => ({ ...f, timeWindow: e.target.value }))}
              className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            >
              {timeWindows.map((tw) => (
                <option key={tw} value={tw}>{tw}</option>
              ))}
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-[#64748B] text-[10px] uppercase font-bold mb-1">Attention Level</label>
            <select
              value={filters.severity}
              onChange={(e) => setFilters(f => ({ ...f, severity: e.target.value }))}
              className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            >
              {severities.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Pattern Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#64748B] px-1 font-bold">
          <span>DETECTED PATTERN DOSSIERS ({filteredPatterns.length})</span>
          <span className="text-[#2563EB]">CROSS-SECTOR CAUSAL SYNTHESIS</span>
        </div>

        {filteredPatterns.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#D9E2F0] rounded-3xl font-mono text-xs text-[#64748B]">
            No emerging patterns match your current filter selection. Try resetting filters.
          </div>
        ) : (
          filteredPatterns.map((pattern) => {
            const isExpanded = expandedPatternId === pattern.id;

            return (
              <div
                key={pattern.id}
                className="bg-white border border-[#D9E2F0] hover:border-[#2563EB] rounded-3xl transition-all shadow-sm overflow-hidden"
              >
                {/* Pattern Header / Accordion Trigger */}
                <div
                  onClick={() => setExpandedPatternId(isExpanded ? null : pattern.id)}
                  className="p-6 sm:p-7 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-mono font-bold">
                        {pattern.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#D9E2F0] text-[#64748B] text-[10px] font-mono font-bold">
                        {pattern.id}
                      </span>
                      <span className="text-xs font-mono text-[#2563EB] font-bold">
                        +{pattern.growthRate}% SIGNAL GROWTH
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                      {pattern.title}
                    </h3>

                    <p className="text-xs text-[#64748B] font-sans line-clamp-2">
                      {pattern.summary}
                    </p>
                  </div>

                  {/* Right Quick Summary Pills */}
                  <div className="flex items-center space-x-3 self-end md:self-auto font-mono text-xs shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-[#0F172A]">
                        {pattern.relatedExperienceCount} VOICES
                      </div>
                      <div className="text-[10px] text-[#2563EB] font-bold">
                        {pattern.silenceIndex}% SILENCE GAP
                      </div>
                    </div>

                    <button className="p-2 rounded-xl bg-[#EEF3FA] text-[#2563EB]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Causal Dossier */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t border-[#D9E2F0] bg-[#F8FAFC] space-y-6 font-mono text-xs animate-fadeIn">
                    
                    {/* 3 Metric Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-white border border-[#D9E2F0] rounded-2xl shadow-xs">
                        <div className="text-lg font-bold text-[#0F172A]">{pattern.relatedExperienceCount}</div>
                        <div className="text-[10px] text-[#64748B]">Explicit Reports</div>
                      </div>
                      <div className="p-3 bg-white border border-[#D9E2F0] rounded-2xl shadow-xs">
                        <div className="text-lg font-bold text-[#2563EB]">~{pattern.estimatedAffected.toLocaleString()}</div>
                        <div className="text-[10px] text-[#64748B]">Estimated Affected</div>
                      </div>
                      <div className="p-3 bg-white border border-[#D9E2F0] rounded-2xl shadow-xs">
                        <div className="text-lg font-bold text-[#1D4ED8]">{pattern.silenceIndex}%</div>
                        <div className="text-[10px] text-[#64748B]">Silence Index Gap</div>
                      </div>
                      <div className="p-3 bg-white border border-[#D9E2F0] rounded-2xl shadow-xs">
                        <div className="text-lg font-bold text-[#2563EB]">{pattern.modelConfidence}%</div>
                        <div className="text-[10px] text-[#64748B]">Model Confidence</div>
                      </div>
                    </div>

                    {/* 3 Columns: Root Causes -> AI Actions -> Stakeholders */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      
                      <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] space-y-2 shadow-xs">
                        <div className="text-[#2563EB] font-bold uppercase text-[11px]">
                          01. WHY IT MAY BE OCCURRING
                        </div>
                        <ul className="space-y-1.5 text-[#0F172A] font-sans text-xs">
                          {(pattern.possibleCauses || []).map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#2563EB] font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#DBEAFE]/30 border border-[#BFDBFE] space-y-2 shadow-xs">
                        <div className="text-[#1D4ED8] font-bold uppercase text-[11px] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                          02. AI-SUGGESTED ACTIONS
                        </div>
                        <ul className="space-y-1.5 text-[#0F172A] font-sans text-xs">
                          {(pattern.aiSuggestedActions || []).map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] space-y-3 shadow-xs">
                        <div>
                          <div className="text-[#1D4ED8] font-bold uppercase text-[11px] mb-1.5">
                            03. RELEVANT STAKEHOLDERS
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {(pattern.suggestedStakeholders || []).map((stk, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-[#EEF3FA] text-[10px] text-[#0F172A] font-medium">
                                {stk}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#D9E2F0]">
                          <span className="text-[10px] text-[#2563EB] font-bold block uppercase">EXPECTED IMPACT:</span>
                          <p className="text-xs text-[#64748B] font-sans mt-0.5">{pattern.expectedImpact}</p>
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
