import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Radio, 
  Copy, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { Experience, ProblemProgressStage } from '../types';

export const TrackingPage: React.FC = () => {
  const { 
    myContributions, 
    experiences, 
    patterns, 
    zones 
  } = useIntelligence();

  const navigate = useNavigate();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // User items or top experiences
  const userItems: Experience[] = myContributions.length > 0 ? myContributions : experiences.slice(0, 4);

  const handleCopy = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getStageBadgeColor = (stage: ProblemProgressStage | undefined) => {
    switch (stage) {
      case 'RESOLVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ACTION TAKEN':
        return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]';
      case 'UNDER REVIEW':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SIGNAL ROUTED':
      default:
        return 'bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE]';
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E2F0]">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <User className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>PERSONAL SIGNAL TRACKING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-[#0F172A] tracking-tight">
            MY UNHEARD
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans">
            Track the 7-stage progression of your anonymous contributions from problem to verified resolution.
          </p>
        </div>

        <Link
          to="/report"
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-1.5 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>SUBMIT NEW EXPERIENCE</span>
        </Link>
      </div>

      {/* Privacy Guarantee Card */}
      <div className="p-5 rounded-3xl bg-white border border-[#D9E2F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[#0F172A] font-bold text-xs">ZERO PUBLIC IDENTITY GUARANTEE</div>
            <div className="text-[#64748B] text-[11px] font-sans">
              Your tracking IDs are cryptographically isolated. No personal tracking cookies or profiles are created.
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#EEF3FA] text-[#2563EB] self-start sm:self-auto shrink-0">
          ANONYMOUS REVERSE LOOKUP
        </span>
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#64748B] px-1 font-bold">
          <span>TRACKED EXPERIENCES ({userItems.length})</span>
          <span className="text-[#2563EB]">SELECT A REPORT TO VIEW FULL DETAIL & RESOLUTION</span>
        </div>

        <div className="space-y-4">
          {userItems.map((item) => {
            const anonId = item.anonymousTrackingId || `UNH-${item.id.replace('EXP-', '')}-XP91`;
            const matchedPattern = patterns.find(p => p.id === item.clusterId) || patterns[0];
            const currentStage = item.currentStage || 'SIGNAL ROUTED';

            const stages: ProblemProgressStage[] = [
              'REPORTED',
              'ANALYZED',
              'PATTERN DETECTED',
              'SIGNAL ROUTED',
              'UNDER REVIEW',
              'ACTION TAKEN',
              'RESOLVED'
            ];

            const currentIndex = stages.indexOf(currentStage);

            return (
              <div
                key={item.id}
                onClick={() => navigate(`/tracking/${anonId}`)}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] hover:shadow-lg transition-all cursor-pointer space-y-5 shadow-sm group"
              >
                {/* Header Row: ID, Time, Status Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E2F0]">
                  <div className="flex items-center space-x-3">
                    <span className="text-base font-mono font-extrabold text-[#2563EB] tracking-wider group-hover:underline">
                      {anonId}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, anonId)}
                      className="p-1 rounded text-[#64748B] hover:text-[#0F172A]"
                      title="Copy Anonymous ID"
                    >
                      {copiedId === anonId ? <Check className="w-3.5 h-3.5 text-[#2563EB]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs font-mono text-[#64748B]">
                      {item.submittedAt || 'Today'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${getStageBadgeColor(currentStage)}`}>
                      {currentStage}
                    </span>
                  </div>
                </div>

                {/* Narrative Snippet */}
                <div>
                  <p className="text-sm text-[#0F172A] font-sans italic leading-relaxed line-clamp-2">
                    “{item.sanitizedText}”
                  </p>
                </div>

                {/* Visual 7-Stage Stepper Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B] font-bold">
                    <span>PROGRESSION LIFECYCLE</span>
                    <span className="text-[#2563EB]">STAGE {currentIndex + 1} OF 7</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[8.5px] font-mono text-center">
                    {stages.map((stg, i) => {
                      const isPastOrCurrent = i <= currentIndex;
                      const isExact = i === currentIndex;

                      return (
                        <div
                          key={stg}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isExact
                              ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-xs'
                              : isPastOrCurrent
                              ? 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE] font-semibold'
                              : 'bg-[#F8FAFC] text-[#94A3B8] border-[#D9E2F0]'
                          }`}
                        >
                          <div>{isPastOrCurrent ? '✓' : '○'}</div>
                          <div className="truncate mt-0.5">{stg}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Connected Pattern & Stakeholder Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] font-mono text-xs">
                  <div>
                    <span className="text-[#64748B] text-[10px] uppercase font-bold block">CONNECTED REGIONAL PATTERN:</span>
                    <span className="text-[#0F172A] font-bold text-xs">{matchedPattern.title}</span>
                    <span className="text-[#2563EB] text-[10px] block mt-0.5">
                      {matchedPattern.relatedExperienceCount} related voices • {matchedPattern.silenceIndex}% silence gap
                    </span>
                  </div>

                  <div>
                    <span className="text-[#64748B] text-[10px] uppercase font-bold block">ASSIGNED STAKEHOLDER:</span>
                    <span className="text-[#0F172A] font-semibold text-xs">{item.assignedStakeholder || 'Municipal Infrastructure Team'}</span>
                    <span className="text-[#1D4ED8] text-[10px] block mt-0.5">
                      Area: {item.zoneName}
                    </span>
                  </div>
                </div>

                {/* Action Link Footer */}
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2563EB] pt-1">
                  <span>VIEW FULL PROBLEM STATUS & RESOLUTION DETAILS</span>
                  <div className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>OPEN DOSSIER</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
