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
  Scale
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { CategoryType, ClusteredPattern, TimeWindow, ZoneId } from '../types';

export const IntelligenceDashboard: React.FC = () => {
  const { 
    filteredPatterns, 
    filters, 
    setFilters, 
    resetFilters, 
    metrics, 
    zones 
  } = useIntelligence();

  const [expandedPatternId, setExpandedPatternId] = useState<string | null>('PAT-01');

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

  return (
    <section id="intelligence" className="py-20 relative bg-[#F7F9FC] border-b border-[#D9E2F0]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold mb-3">
              <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>LIVE CAUSAL SIGNAL ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#0F172A] tracking-tight">
              FROM STORIES TO SIGNALS
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-2xl">
              Thousands of fragmented experiences reveal systemic patterns that isolated complaints never surface.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white border border-[#D9E2F0] text-[#64748B] font-semibold flex items-center gap-1.5 shadow-sm">
              <AlertCircle className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>DEMO DATASET</span>
            </span>
          </div>
        </div>

        {/* 5 Synchronized Metric Cards in Pure White */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
          
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
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">DEMO</span>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] mt-2 group-hover:text-[#1D4ED8] transition-colors">
              {metrics.emergingPatternsCount}
            </div>
            <div className="text-xs text-[#64748B] mt-1 font-medium">Active Patterns</div>
          </div>

          {/* Metric 3 */}
          <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all group">
            <div className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center justify-between">
              <span>SECTORS</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">DEMO</span>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] mt-2 group-hover:text-[#2563EB] transition-colors">
              {metrics.activeSignalZonesCount}
            </div>
            <div className="text-xs text-[#64748B] mt-1 font-medium">Aggregated Zones</div>
          </div>

          {/* Metric 4 */}
          <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all group">
            <div className="text-[10px] font-mono text-[#60A5FA] uppercase tracking-widest font-bold flex items-center justify-between">
              <span>DISCOVERY</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#64748B]">DEMO</span>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] mt-2 group-hover:text-[#2563EB] transition-colors">
              {metrics.unseenSignalPercentage}%
            </div>
            <div className="text-xs text-[#64748B] mt-1 font-medium">Previously Unseen</div>
          </div>

          {/* Metric 5 */}
          <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-[#DBEAFE]/40 to-white border border-[#BFDBFE] hover:border-[#2563EB] hover:shadow-md transition-all group">
            <div className="text-[10px] font-mono text-[#1D4ED8] uppercase tracking-widest font-bold flex items-center justify-between">
              <span>SILENCE</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#2563EB] text-white font-bold">AI MODEL</span>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#2563EB] mt-2">
              {metrics.averageSilenceIndex}%
            </div>
            <div className="text-xs text-[#64748B] mt-1 font-medium">Global Silence Index</div>
          </div>

        </div>

        {/* Multi-Filter Toolbar in Pure White */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search patterns by topic, sector, or consequence..."
                className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
              />
            </div>

            {/* Dropdown Selectors */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              
              {/* Zone Filter */}
              <select
                value={filters.zoneId}
                onChange={(e) => setFilters(prev => ({ ...prev, zoneId: e.target.value }))}
                aria-label="Filter by zone"
                className="px-3 py-2 bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl text-[#64748B] focus:outline-none focus:border-[#2563EB] font-semibold"
              >
                <option value="All">All Sectors ({zones.length})</option>
                {zones.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>

              {/* Time Filter */}
              <select
                value={filters.timeWindow}
                onChange={(e) => setFilters(prev => ({ ...prev, timeWindow: e.target.value }))}
                aria-label="Filter by time of day"
                className="px-3 py-2 bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl text-[#64748B] focus:outline-none focus:border-[#2563EB] font-semibold"
              >
                {timeWindows.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'All Times' : t}</option>
                ))}
              </select>

              {/* Severity Filter */}
              <select
                value={filters.severity}
                onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                aria-label="Filter by priority level"
                className="px-3 py-2 bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl text-[#64748B] focus:outline-none focus:border-[#2563EB] font-semibold"
              >
                {severities.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Severities' : s}</option>
                ))}
              </select>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="px-3 py-2 bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] rounded-xl text-[#64748B] hover:text-[#2563EB] transition-colors flex items-center space-x-1.5 font-semibold"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

            </div>

          </div>

          {/* Category Quick-Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono text-[#64748B] mr-1 flex items-center font-semibold">
              <Filter className="w-3 h-3 mr-1 text-[#2563EB]" />
              CATEGORY:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  filters.category === cat
                    ? 'bg-[#2563EB] text-white font-bold shadow-sm'
                    : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#2563EB] hover:bg-[#DBEAFE] border border-[#D9E2F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Pattern Cards List in Pure White */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B] px-1 font-semibold">
            <span>SHOWING {filteredPatterns.length} DISCOVERED PATTERNS</span>
            <span>SORTED BY: CAUSAL INTENSITY & SILENCE GAP</span>
          </div>

          {filteredPatterns.map((pattern) => {
            const isExpanded = expandedPatternId === pattern.id;

            return (
              <div
                key={pattern.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isExpanded
                    ? 'border-[#2563EB] shadow-md bg-white'
                    : 'border-[#D9E2F0] bg-white hover:border-[#BFDBFE] hover:shadow-sm'
                } overflow-hidden`}
              >
                {/* Pattern Header Card */}
                <div
                  onClick={() => setExpandedPatternId(isExpanded ? null : pattern.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#DBEAFE] text-[#1D4ED8] font-bold">
                        {pattern.category}
                      </span>
                      <span className="text-[#94A3B8]">•</span>
                      <span className="text-[#64748B] font-medium">
                        {pattern.relatedExperienceCount} related reports
                      </span>
                      <span className="text-[#94A3B8]">•</span>
                      <span className="text-[#64748B] font-medium">
                        {pattern.aggregatedAreaCount} sectors
                      </span>
                      <span className="text-[#94A3B8]">•</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pattern.suggestedAttention === 'Critical'
                          ? 'bg-red-50 text-[#EF4444] border border-red-200'
                          : 'bg-[#EEF3FA] text-[#2563EB] border border-[#BFDBFE]'
                      }`}>
                        PRIORITY: {pattern.suggestedAttention.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {pattern.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2">
                      {pattern.summary}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 self-end md:self-center">
                    <div className="text-right font-mono">
                      <div className="text-[10px] text-[#64748B] font-semibold">SIGNAL GROWTH</div>
                      <div className="text-base font-bold text-[#2563EB] flex items-center justify-end">
                        <TrendingUp className="w-3.5 h-3.5 mr-1 text-[#2563EB]" />
                        +{pattern.growthRate}%
                      </div>
                    </div>

                    <div className="text-right font-mono pl-4 border-l border-[#D9E2F0]">
                      <div className="text-[10px] text-[#64748B] font-semibold">SILENCE INDEX</div>
                      <div className="text-base font-bold text-[#1D4ED8]">
                        {pattern.silenceIndex}%
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#EEF3FA] border border-[#D9E2F0] text-[#64748B]">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#2563EB]" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Dossier */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 pt-4 border-t border-[#D9E2F0] bg-[#F8FAFC] space-y-5 animate-fadeIn">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] space-y-2 text-xs font-mono shadow-sm">
                        <div className="text-[10px] text-[#2563EB] uppercase tracking-widest font-bold">
                          DETECTION METADATA
                        </div>
                        <div className="text-[#0F172A] flex justify-between">
                          <span className="text-[#64748B]">Confidence:</span>
                          <span className="text-[#2563EB] font-bold">{pattern.modelConfidence}% DEMO</span>
                        </div>
                        <div className="text-[#0F172A] flex justify-between">
                          <span className="text-[#64748B]">Time Window:</span>
                          <span className="font-semibold">{pattern.primaryTimeWindows.join(', ')}</span>
                        </div>
                        <div className="text-[#0F172A] flex justify-between">
                          <span className="text-[#64748B]">Demographic:</span>
                          <span className="font-semibold">{pattern.primaryAffectedGroups.join(', ')}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] space-y-2 text-xs font-mono shadow-sm">
                        <div className="text-[10px] text-[#1D4ED8] uppercase tracking-widest font-bold">
                          SILENCE IMPACT RATIO
                        </div>
                        <div className="text-[#0F172A] flex justify-between">
                          <span className="text-[#64748B]">Reported Voices:</span>
                          <span className="font-bold text-[#0F172A]">{pattern.reportedCount}</span>
                        </div>
                        <div className="text-[#0F172A] flex justify-between">
                          <span className="text-[#64748B]">Estimated Reach:</span>
                          <span className="text-[#2563EB] font-bold">~{pattern.estimatedAffected}</span>
                        </div>
                        <div className="text-[#0F172A] flex justify-between">
                          <span className="text-[#64748B]">Estimated Unheard:</span>
                          <span className="text-[#1D4ED8] font-bold">~{pattern.estimatedUnheard} ({pattern.silenceIndex}%)</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] space-y-2 text-xs font-mono shadow-sm">
                        <div className="text-[10px] text-[#2563EB] uppercase tracking-widest font-bold">
                          4-WEEK VELOCITY TRAJECTORY
                        </div>
                        <div className="flex items-end space-x-2 h-12 pt-2">
                          {pattern.weeklyTrajectory.map((val, idx) => {
                            const max = Math.max(...pattern.weeklyTrajectory);
                            const heightPct = Math.max(15, (val / max) * 100);
                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                                <div 
                                  className="w-full bg-gradient-to-t from-[#60A5FA] to-[#2563EB] rounded-t"
                                  style={{ height: `${heightPct}%` }}
                                ></div>
                                <span className="text-[9px] text-[#64748B] font-semibold">W{idx + 1}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Causes & AI-Suggested Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] space-y-2 shadow-sm">
                        <div className="text-[#64748B] uppercase tracking-wider font-bold text-[10px]">
                          WHY IT MAY BE HAPPENING (POSSIBLE CAUSES):
                        </div>
                        <ul className="space-y-1.5 text-[#0F172A] font-sans text-xs">
                          {pattern.possibleCauses.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#2563EB] font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#DBEAFE]/30 border border-[#BFDBFE] space-y-2 shadow-sm">
                        <div className="text-[#1D4ED8] uppercase tracking-wider font-bold text-[10px] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#2563EB]" />
                          AI-SUGGESTED ACTIONS (DECISION SUPPORT):
                        </div>
                        <ul className="space-y-1.5 text-[#0F172A] font-sans text-xs">
                          {pattern.aiSuggestedActions.slice(0, 2).map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Routing Dispatch */}
                    <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs shadow-sm">
                      <div className="space-y-1">
                        <div className="text-[10px] text-[#2563EB] font-bold uppercase">
                          SIMULATED STAKEHOLDER ROUTING:
                        </div>
                        <p className="text-[#0F172A] text-[11px] font-sans">
                          {pattern.actionRecommendation}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-bold shrink-0">
                        {pattern.lifecycleStatus}
                      </span>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
