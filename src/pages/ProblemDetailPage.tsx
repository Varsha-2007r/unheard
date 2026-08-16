import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  TrendingUp, 
  Users, 
  Layers, 
  Scale, 
  AlertCircle,
  Building2,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { ProblemProgressStage, ProblemTimelineEvent } from '../types';

export const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    getExperienceById, 
    advanceProblemStatus, 
    patterns, 
    zones 
  } = useIntelligence();

  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(false);

  const experience = getExperienceById(id || '') || {
    id: 'EXP-DEMO',
    anonymousTrackingId: id || 'UNH-7K42-XP91',
    rawText: 'Streetlights near the hostel road have not worked for several weeks and people avoid the road after dark.',
    sanitizedText: 'Streetlights near the hostel road have not worked for several weeks and people avoid the road after dark.',
    category: 'Safety',
    zoneId: 'hostel-sector',
    zoneName: 'Perimeter Residential & Dormitory Belt',
    timeWindow: 'Night',
    affectedGroup: 'Students',
    submittedAt: 'Today, 08:30 AM',
    isAnonymous: true,
    modality: 'text',
    currentStage: 'SIGNAL ROUTED' as ProblemProgressStage,
    assignedStakeholder: 'Municipal Infrastructure Team',
    aiSuggestedAction: 'Inspect streetlight infrastructure in the affected zone and verify nighttime accessibility.',
    timelineEvents: [
      {
        timestamp: 'Today, 08:30 AM',
        stage: 'REPORTED' as ProblemProgressStage,
        title: 'Experience Ingested',
        description: 'Received through client-side zero-PII sanitization pipeline.'
      },
      {
        timestamp: 'Today, 08:31 AM',
        stage: 'ANALYZED' as ProblemProgressStage,
        title: 'Semantic Normalization Complete',
        description: 'Extracted topic: Pedestrian Lighting, localized to Hostel Perimeter Sector.'
      },
      {
        timestamp: 'Today, 09:10 AM',
        stage: 'PATTERN DETECTED' as ProblemProgressStage,
        title: 'Vector Clustering Matched',
        description: 'Joined multi-source signal cluster with high cosine similarity (23 related voices).'
      },
      {
        timestamp: 'Today, 10:25 AM',
        stage: 'SIGNAL ROUTED' as ProblemProgressStage,
        title: 'Executive Brief Dispatched',
        description: 'Delivered to Municipal Infrastructure Team for field verification.'
      }
    ]
  };

  const matchedPattern = patterns.find(p => p.id === experience.clusterId) || patterns[0];
  const matchedZone = zones.find(z => z.id === experience.zoneId) || zones[0];
  const anonId = experience.anonymousTrackingId || id || 'UNH-7K42-XP91';

  const stages: ProblemProgressStage[] = [
    'REPORTED',
    'ANALYZED',
    'PATTERN DETECTED',
    'SIGNAL ROUTED',
    'UNDER REVIEW',
    'ACTION TAKEN',
    'RESOLVED'
  ];

  const currentStage = experience.currentStage || 'SIGNAL ROUTED';
  const currentIndex = stages.indexOf(currentStage);

  const handleCopy = () => {
    navigator.clipboard.writeText(anonId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleAdvance = () => {
    advanceProblemStatus(anonId);
  };

  const isResolved = currentStage === 'RESOLVED';

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-fadeIn">
      
      {/* Breadcrumb Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E2F0]">
        <div className="space-y-1">
          <Link
            to="/tracking"
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#2563EB] hover:underline mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO MY UNHEARD TRACKING</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#0F172A] tracking-tight">
            PROBLEM STATUS & LIFECYCLE
          </h1>
          <div className="flex items-center space-x-3 text-xs font-mono text-[#64748B]">
            <span>ANONYMOUS ID: <strong className="text-[#2563EB]">{anonId}</strong></span>
            <span>•</span>
            <span>ZONE: <strong className="text-[#0F172A]">{experience.zoneName}</strong></span>
          </div>
        </div>

        {/* Live Simulation Advance Button */}
        {!isResolved ? (
          <button
            onClick={handleAdvance}
            className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>SIMULATE NEXT LIFECYCLE STAGE →</span>
          </button>
        ) : (
          <span className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>PROBLEM FULLY RESOLVED</span>
          </span>
        )}
      </div>

      {/* Main Status Progression Stepper Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0]">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#2563EB] animate-pulse" />
            <h2 className="text-xs font-mono font-bold uppercase text-[#0F172A] tracking-wider">
              7-STAGE SIGNAL RESOLUTION PROGRESSION
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
            CURRENT: {currentStage}
          </span>
        </div>

        {/* Horizontal 7-Stage Indicator */}
        <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[9px]">
          {stages.map((stg, i) => {
            const isPast = i < currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <div
                key={stg}
                className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-md scale-105'
                    : isPast
                    ? 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE] font-semibold'
                    : 'bg-[#F8FAFC] text-[#94A3B8] border-[#D9E2F0]'
                }`}
              >
                <div className="text-xs">{isPast || isCurrent ? '✓' : '○'}</div>
                <div className="mt-1 truncate">{stg}</div>
              </div>
            );
          })}
        </div>

        {/* Narrative & Anonymous ID Box */}
        <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 font-mono text-xs shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] text-[10px] font-bold uppercase">SUBMITTED PROBLEM NARRATIVE:</span>
            <button
              onClick={handleCopy}
              className="text-[#2563EB] hover:text-[#0F172A] flex items-center gap-1 font-semibold"
            >
              {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId ? 'COPIED ID' : 'COPY ANONYMOUS ID'}</span>
            </button>
          </div>
          <blockquote className="text-sm text-[#0F172A] font-sans italic leading-relaxed border-l-2 border-[#2563EB] pl-3.5">
            “{experience.sanitizedText}”
          </blockquote>
        </div>

      </div>

      {/* Verified Resolution Summary Card (Visible when resolved) */}
      {isResolved && (
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 shadow-md space-y-4 animate-fadeIn font-mono text-xs">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>✓ PROBLEM RESOLVED — VERIFIED OUTCOME</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <span className="text-emerald-800 text-[10px] block font-bold">RESOLUTION DATE:</span>
              <span className="text-[#0F172A] font-bold">Today (Simulated Complete)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <span className="text-emerald-800 text-[10px] block font-bold">ACTING STAKEHOLDER:</span>
              <span className="text-[#0F172A] font-bold">Municipal Infrastructure Division</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <span className="text-emerald-800 text-[10px] block font-bold">VERIFIED IMPACT:</span>
              <span className="text-[#2563EB] font-bold">~480 Daily Commuters Restored</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-emerald-200 text-[#0F172A] font-sans">
            <strong className="font-mono text-xs text-emerald-800 block mb-0.5">ACTION TAKEN SUMMARY:</strong>
            {experience.resolutionSummary?.actionTaken || 'Replaced 18 high-efficiency LED luminaires along the primary dormitory link and upgraded underground power distribution junction.'}
          </div>

          <div className="text-[10px] text-emerald-700 italic">
            * Simulated verification data for prototype evaluation.
          </div>
        </div>
      )}

      {/* 2-Column Split: Social Signal Cluster & AI-Suggested Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Social Signal Cluster Dossier */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] font-mono text-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <h2 className="font-bold text-[#0F172A] uppercase tracking-wider">
                CONNECTED SOCIAL SIGNAL
              </h2>
            </div>
            <span className="text-[#2563EB] font-bold">CLUSTER MATCH</span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-display text-[#0F172A]">
              {matchedPattern.title}
            </h3>
            <p className="text-xs text-[#64748B] font-sans mt-1">
              {matchedPattern.summary}
            </p>
          </div>

          {/* 4 Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
            <div className="p-3 bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl">
              <div className="text-lg font-bold text-[#0F172A]">{matchedPattern.relatedExperienceCount}</div>
              <div className="text-[9px] text-[#64748B]">Related Voices</div>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl">
              <div className="text-lg font-bold text-[#2563EB]">{matchedPattern.aggregatedAreaCount}</div>
              <div className="text-[9px] text-[#64748B]">Affected Zones</div>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#D9E2F0] rounded-xl">
              <div className="text-lg font-bold text-[#1D4ED8]">+{matchedPattern.growthRate}%</div>
              <div className="text-[9px] text-[#64748B]">Signal Growth</div>
            </div>
            <div className="p-3 bg-[#DBEAFE] border border-[#BFDBFE] rounded-xl">
              <div className="text-lg font-bold text-[#1D4ED8]">{matchedPattern.silenceIndex}%</div>
              <div className="text-[9px] text-[#1D4ED8] font-bold">Silence Index</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-2 font-mono text-xs">
            <div>
              <span className="text-[#64748B] text-[10px] block font-bold">ASSIGNED STAKEHOLDER:</span>
              <span className="text-[#0F172A] font-bold text-xs">{experience.assignedStakeholder || 'Municipal Infrastructure Team'}</span>
            </div>
            <div className="pt-2 border-t border-[#D9E2F0]">
              <span className="text-[#2563EB] text-[10px] block font-bold">AI-SUGGESTED ACTION:</span>
              <p className="text-[#0F172A] font-sans text-xs mt-0.5">{experience.aiSuggestedAction}</p>
            </div>
          </div>

          <Link
            to="/map"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
          >
            <span>VIEW AFFECTED SECTOR ON MAP →</span>
          </Link>
        </div>

        {/* Right: Chronological Updates Timeline */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] font-mono text-xs">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              <h2 className="font-bold text-[#0F172A] uppercase tracking-wider">
                CHRONOLOGICAL DISPATCH TIMELINE
              </h2>
            </div>
            <span className="text-[10px] text-[#64748B] font-semibold">LIVE LOG</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {(experience.timelineEvents || []).map((event: ProblemTimelineEvent, idx: number) => (
              <div key={idx} className="flex items-start space-x-3 relative">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] font-bold text-[10px] shrink-0">
                    ✓
                  </div>
                  {idx < (experience.timelineEvents?.length || 1) - 1 && (
                    <div className="w-[2px] h-10 bg-[#D9E2F0] my-1" />
                  )}
                </div>

                <div className="space-y-0.5 flex-1 pb-1">
                  <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>{event.timestamp}</span>
                    <span className="px-2 py-0.2 rounded bg-[#EEF3FA] text-[#1D4ED8] font-bold">{event.stage}</span>
                  </div>
                  <div className="text-[#0F172A] font-bold text-xs">{event.title}</div>
                  <p className="text-[#64748B] font-sans text-[11px] leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
