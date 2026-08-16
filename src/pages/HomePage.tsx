import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Map, 
  BrainCircuit, 
  User, 
  Activity, 
  TrendingUp, 
  EyeOff, 
  ShieldCheck, 
  Radio, 
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const HomePage: React.FC = () => {
  const { 
    metrics, 
    patterns, 
    myContributions, 
    experiences, 
    user, 
    setIsLiveDemoOpen 
  } = useIntelligence();
  
  const navigate = useNavigate();

  // Top 3 emerging signals
  const topSignals = patterns.slice(0, 3);
  // User recent contribution or latest mock experience
  const recentContribution = myContributions[0] || experiences[0];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      
      {/* Welcome Banner Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#D9E2F0] shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Blue Glow Accent */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#DBEAFE]/80 via-[#60A5FA]/30 to-transparent blur-[70px] pointer-events-none rounded-full" />

        <div className="space-y-3 relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping"></span>
            <span>UNHEARD • SOCIAL PROBLEM INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight leading-tight">
            SEE WHAT'S HAPPENING <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">AROUND YOU.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] font-sans leading-relaxed">
            Welcome, <strong className="text-[#0F172A]">{user?.name || 'Community Member'}</strong>. Discrete experiences are continuously analyzed, revealing invisible societal patterns before they escalate into crises.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/report"
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>REPORT A PROBLEM</span>
            </Link>

            <button
              onClick={() => setIsLiveDemoOpen(true)}
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#2563EB] text-[#0F172A] font-mono text-xs font-semibold shadow-sm transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>SIMULATE NOW (12s DEMO)</span>
            </button>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 font-mono text-xs shrink-0 self-start md:self-auto shadow-sm">
          <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">
            INTELLIGENCE SYSTEM STATUS
          </div>
          <div className="flex items-center space-x-2 text-[#2563EB] font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse"></span>
            <span>ACTIVE SIGNAL PIPELINE</span>
          </div>
          <div className="text-[11px] text-[#64748B] border-t border-[#D9E2F0] pt-2 space-y-1">
            <div>Privacy Scrub: <strong className="text-[#0F172A]">Zero-PII</strong></div>
            <div>Cluster Latency: <strong className="text-[#0F172A]">&lt; 850ms</strong></div>
          </div>
        </div>

      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm space-y-1 hover:border-[#2563EB] transition-all">
          <div className="text-[10px] font-mono text-[#64748B] uppercase font-bold tracking-wider">
            EXPERIENCES ANALYZED
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0F172A]">
            {metrics.totalExperiencesAnalyzed.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-[#2563EB] font-semibold">
            +142 this week
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm space-y-1 hover:border-[#2563EB] transition-all">
          <div className="text-[10px] font-mono text-[#64748B] uppercase font-bold tracking-wider">
            EMERGING PATTERNS
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#2563EB]">
            {metrics.emergingPatternsCount}
          </div>
          <div className="text-[10px] font-mono text-[#64748B] font-semibold">
            Synthesized dossiers
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm space-y-1 hover:border-[#2563EB] transition-all">
          <div className="text-[10px] font-mono text-[#64748B] uppercase font-bold tracking-wider">
            ACTIVE SIGNALS
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#1D4ED8]">
            {patterns.length * 3 + 12}
          </div>
          <div className="text-[10px] font-mono text-[#2563EB] font-semibold">
            Cross-zone links
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm space-y-1 hover:border-[#2563EB] transition-all">
          <div className="text-[10px] font-mono text-[#64748B] uppercase font-bold tracking-wider">
            AFFECTED AREAS
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0F172A]">
            {metrics.activeSignalZonesCount}
          </div>
          <div className="text-[10px] font-mono text-[#64748B] font-semibold">
            Monitored sectors
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-5 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono text-[#1D4ED8] uppercase font-bold tracking-wider">
            SILENCE INDEX
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#1D4ED8]">
            {metrics.averageSilenceIndex}%
          </div>
          <div className="text-[10px] font-mono text-[#1D4ED8] font-bold">
            Estimated Unheard Gap
          </div>
        </div>

      </div>

      {/* 4 Large Direct Navigation Action Cards */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
          PLATFORM MODULES
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: REPORT A PROBLEM */}
          <Link
            to="/report"
            className="p-6 rounded-3xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-lg transition-all space-y-4 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-display font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                REPORT A PROBLEM
              </h2>
              <p className="text-xs text-[#64748B] font-sans mt-1">
                Safely share an everyday experience with zero-PII privacy scrubbing.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#2563EB] flex items-center space-x-1">
              <span>START REPORT WIZARD</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: EXPLORE MAP */}
          <Link
            to="/map"
            className="p-6 rounded-3xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-lg transition-all space-y-4 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3FA] border border-[#D9E2F0] flex items-center justify-center text-[#1D4ED8] group-hover:scale-105 transition-transform">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-display font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                EXPLORE MAP
              </h2>
              <p className="text-xs text-[#64748B] font-sans mt-1">
                View live spatial signal intensity across 8 aggregated municipal sectors.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#2563EB] flex items-center space-x-1">
              <span>OPEN CONSEQUENCE MAP</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: VIEW INTELLIGENCE */}
          <Link
            to="/intelligence"
            className="p-6 rounded-3xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-lg transition-all space-y-4 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-display font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                VIEW INTELLIGENCE
              </h2>
              <p className="text-xs text-[#64748B] font-sans mt-1">
                Filter and inspect AI-clustered pattern dossiers and action briefs.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#2563EB] flex items-center space-x-1">
              <span>EXPLORE PATTERNS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: TRACK MY REPORT */}
          <Link
            to="/tracking"
            className="p-6 rounded-3xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-lg transition-all space-y-4 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3FA] border border-[#D9E2F0] flex items-center justify-center text-[#1D4ED8] group-hover:scale-105 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-display font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                TRACK MY REPORT
              </h2>
              <p className="text-xs text-[#64748B] font-sans mt-1">
                Check the 7-stage lifecycle status of your anonymous contributions.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#2563EB] flex items-center space-x-1">
              <span>VIEW MY TRACKING</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>

      {/* 2-Column Split: Latest Emerging Signals Preview + Your Recent Contribution Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Latest Emerging Signals (Compact Preview) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-[#2563EB] animate-pulse" />
              <h2 className="text-sm font-mono font-bold uppercase text-[#0F172A] tracking-wider">
                LATEST EMERGING SIGNALS
              </h2>
            </div>
            <Link to="/intelligence" className="text-xs font-mono text-[#2563EB] font-bold hover:underline">
              View All Patterns →
            </Link>
          </div>

          <div className="space-y-3">
            {topSignals.map((pattern) => (
              <div
                key={pattern.id}
                onClick={() => navigate('/intelligence')}
                className="p-5 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
                    {pattern.category}
                  </span>
                  <span className="text-xs font-mono text-[#2563EB] font-bold">
                    +{pattern.growthRate}% SIGNAL GROWTH
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-display font-bold text-[#0F172A]">
                    {pattern.title}
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans mt-0.5 line-clamp-2">
                    {pattern.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-2 border-t border-[#D9E2F0]">
                  <span>{pattern.relatedExperienceCount} related experiences</span>
                  <span className="text-[#1D4ED8] font-semibold">{pattern.lifecycleStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Your Recent Contribution Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-sm font-mono font-bold uppercase text-[#0F172A] tracking-wider">
                YOUR RECENT CONTRIBUTION
              </h2>
            </div>
            <Link to="/tracking" className="text-xs font-mono text-[#2563EB] font-bold hover:underline">
              All Reports ({myContributions.length}) →
            </Link>
          </div>

          {recentContribution ? (
            <div className="p-6 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] font-mono text-xs">
                <span className="text-[#2563EB] font-bold text-sm tracking-wider">
                  {recentContribution.anonymousTrackingId || 'UNH-7K42-XP91'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold text-[10px]">
                  {recentContribution.currentStage || 'SIGNAL ROUTED'}
                </span>
              </div>

              <blockquote className="text-sm text-[#0F172A] italic font-sans leading-relaxed border-l-2 border-[#2563EB] pl-3.5">
                “{recentContribution.sanitizedText}”
              </blockquote>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Zone:</span>
                  <span className="text-[#0F172A] font-bold">{recentContribution.zoneName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Assigned Stakeholder:</span>
                  <span className="text-[#2563EB] font-semibold">{recentContribution.assignedStakeholder || 'Municipal Authority'}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/tracking/${recentContribution.anonymousTrackingId || recentContribution.id}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <span>OPEN PROBLEM DETAIL →</span>
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-[#D9E2F0] text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF3FA] text-[#64748B] mx-auto flex items-center justify-center">
                <PlusCircle className="w-6 h-6" />
              </div>
              <p className="text-xs text-[#64748B] font-sans">
                You haven't submitted an experience yet. Share daily friction to help uncover hidden community patterns.
              </p>
              <Link
                to="/report"
                className="inline-block py-2.5 px-5 rounded-xl bg-[#2563EB] text-white font-mono text-xs font-bold"
              >
                SUBMIT FIRST EXPERIENCE
              </Link>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
