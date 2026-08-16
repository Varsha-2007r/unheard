import React from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  BarChart3
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const EmergingIssuesSection: React.FC = () => {
  const { patterns } = useIntelligence();

  const weeks = [
    { label: 'Week 1', val: 62, text: 'Initial isolated mentions' },
    { label: 'Week 2', val: 115, text: 'Sector grouping begins' },
    { label: 'Week 3', val: 205, text: 'Cross-zone correlation' },
    { label: 'Week 4', val: 312, text: 'Velocity threshold breached (+38%)' },
  ];

  return (
    <section className="py-20 relative bg-[#F7F9FC] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>EARLY-WARNING VELOCITY RADAR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            DETECT PROBLEMS BEFORE THEY BECOME CRISES
          </h2>

          <p className="text-sm sm:text-base text-[#64748B]">
            By analyzing acceleration curves across everyday experiences, UNHEARD warns stakeholders weeks before an issue triggers acute public risk.
          </p>
        </div>

        {/* Highlighted Alert Box & Trend Trajectory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Emerging Issue Dossier Card */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl bg-white border border-[#D9E2F0] shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#EF4444] text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
                  <span>RAPIDLY INCREASING SIGNAL</span>
                </div>
                <span className="text-xs font-mono text-[#64748B] font-semibold">STATUS: ACTIVE ALERT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
                Night-time Accessibility & Lighting Concern
              </h3>

              <p className="text-xs sm:text-sm font-mono text-[#64748B]">
                Multi-point pedestrian reports along the perimeter sector indicate rapid compounding risk due to inoperative lighting fixtures.
              </p>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
                <div className="text-2xl font-bold text-[#2563EB] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-[#2563EB]" />
                  +38%
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 font-semibold">SIGNAL GROWTH</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
                <div className="text-2xl font-bold text-[#0F172A]">
                  23
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 font-semibold">NEW VOICES</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
                <div className="text-2xl font-bold text-[#1D4ED8]">
                  4
                </div>
                <div className="text-[10px] text-[#64748B] mt-1 font-semibold">SECTORS</div>
              </div>
            </div>

            {/* Suggested Attention */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between font-mono">
              <span className="text-xs text-[#EF4444] font-semibold">SUGGESTED ATTENTION LEVEL:</span>
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#EF4444] text-white shadow-sm">
                CRITICAL ALERT
              </span>
            </div>

          </div>

          {/* Right Column: 4-Week Acceleration Trend Chart */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl bg-white border border-[#D9E2F0] shadow-md flex flex-col justify-between space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] font-mono text-xs">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[#2563EB]" />
                <span className="font-bold text-[#0F172A] uppercase tracking-wider">
                  4-WEEK SIGNAL ACCELERATION CURVE
                </span>
              </div>
              <span className="text-[10px] text-[#2563EB] font-bold">EXPONENTIAL SURGE</span>
            </div>

            <div className="space-y-4 my-2 font-mono">
              {weeks.map((w, idx) => {
                const widthPct = (w.val / 312) * 100;

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#0F172A]">
                      <span className="font-bold">{w.label}</span>
                      <span className="text-[#2563EB] font-semibold">{w.val} cumulative signals</span>
                    </div>
                    <div className="h-6 w-full bg-[#EEF3FA] rounded-lg overflow-hidden p-0.5 border border-[#D9E2F0]">
                      <div
                        className="h-full rounded bg-gradient-to-r from-[#60A5FA] via-[#2563EB] to-[#1D4ED8] transition-all duration-1000 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                        style={{ width: `${widthPct}%` }}
                      >
                        {idx === 3 && '+38%'}
                      </div>
                    </div>
                    <div className="text-[10px] text-[#64748B] italic">
                      {w.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-xs font-mono text-[#64748B] text-center">
              Early detection provides municipal and institutional decision-makers with actionable foresight before public risk escalates.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
