import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Copy, 
  Check, 
  Radio, 
  TrendingUp, 
  Clock, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const MyUnheardDrawer: React.FC = () => {
  const { 
    isMyUnheardOpen, 
    setIsMyUnheardOpen, 
    myContributions, 
    experiences, 
    patterns, 
    zones 
  } = useIntelligence();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isMyUnheardOpen) return null;

  // Use myContributions or fall back to user-submitted ones
  const userItems = myContributions.length > 0 ? myContributions : experiences.slice(0, 3);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      
      {/* Drawer Panel in Pure White */}
      <div className="w-full max-w-md bg-white border-l border-[#D9E2F0] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft">
        
        {/* Drawer Top Header */}
        <div className="px-6 py-5 border-b border-[#D9E2F0] bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center">
              <User className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                PERSONAL TRACKING
              </h2>
              <div className="text-[10px] font-mono text-[#64748B]">
                ANONYMOUS SOCIAL SIGNAL CONTRIBUTIONS
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMyUnheardOpen(false)}
            className="p-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A] border border-[#D9E2F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body in Pure White */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          
          {/* Privacy Protection Notice */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] font-mono text-xs space-y-1.5 shadow-sm">
            <div className="flex items-center space-x-1.5 text-[#2563EB] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>ZERO PUBLIC IDENTITY</span>
            </div>
            <p className="text-[#64748B] text-[11px] font-sans leading-relaxed">
              Your submissions contribute directly to aggregated intelligence. No personal public profile or tracking cookies are created.
            </p>
          </div>

          {/* List of Contributions */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-[#64748B] px-1 font-semibold">
              <span>MY ANONYMOUS INPUTS ({userItems.length})</span>
              <span className="text-[10px] text-[#2563EB]">SIMULATED TRACKING</span>
            </div>

            {userItems.map((item) => {
              const matchedPattern = patterns.find(p => p.id === item.clusterId) || patterns[0];
              const targetZone = zones.find(z => z.id === item.zoneId) || zones[0];
              const anonId = item.anonymousTrackingId || `UNH-${item.id.replace('EXP-', '')}-XP91`;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#D9E2F0] hover:border-[#2563EB] shadow-sm hover:shadow-md transition-all space-y-3 font-mono text-xs"
                >
                  {/* Tracking ID & Status Pill */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#D9E2F0]">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#2563EB] font-bold text-xs">{anonId}</span>
                      <button
                        onClick={() => handleCopy(anonId)}
                        className="p-1 text-[#64748B] hover:text-[#0F172A]"
                        title="Copy Anonymous Tracking ID"
                      >
                        {copiedId === anonId ? <Check className="w-3 h-3 text-[#2563EB]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-bold">
                      {item.routingStatus || 'SIGNAL ROUTED'}
                    </span>
                  </div>

                  {/* Narrative snippet */}
                  <p className="text-[#0F172A] text-xs font-sans line-clamp-2 italic">
                    “{item.sanitizedText}”
                  </p>

                  {/* Connected Pattern Link */}
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase block font-semibold">
                      CONNECTED SOCIAL PATTERN:
                    </span>
                    <div className="text-[#0F172A] font-bold text-xs">
                      {matchedPattern.title}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#64748B] pt-1 font-medium">
                      <span>{targetZone.code} • {matchedPattern.relatedExperienceCount} related voices</span>
                      <span className="text-[#2563EB] font-bold">+{matchedPattern.growthRate}% growth</span>
                    </div>
                  </div>

                  {/* Routing Target */}
                  <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-1 font-semibold">
                    <span>Target: {matchedPattern.suggestedStakeholders[0] || 'Infrastructure Authority'}</span>
                    <span className="text-[#2563EB]">Active Signal</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Drawer Bottom Status */}
        <div className="p-6 border-t border-[#D9E2F0] bg-[#F8FAFC] space-y-3 font-mono text-xs">
          <div className="text-[11px] text-[#64748B] flex justify-between font-semibold">
            <span>SESSION PERSISTENCE: LOCAL</span>
            <span className="text-[#2563EB] font-bold">100% PRIVATE</span>
          </div>

          <button
            onClick={() => setIsMyUnheardOpen(false)}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] text-xs font-bold transition-colors shadow-sm"
          >
            CLOSE DRAWER
          </button>
        </div>

      </div>
    </div>
  );
};
