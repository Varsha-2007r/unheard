import React, { useState } from 'react';
import { 
  Info, 
  EyeOff, 
  Sliders 
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const SilenceIndexSection: React.FC = () => {
  const { patterns } = useIntelligence();

  // Model Parameter Sliders
  const [reportingFriction, setReportingFriction] = useState<number>(85);
  const [demographicVulnerability, setDemographicVulnerability] = useState<number>(75);
  const [socialStigma, setSocialStigma] = useState<number>(60);
  const [showFormulaTooltip, setShowFormulaTooltip] = useState<boolean>(false);

  // Dynamic Heuristic Simulation
  const baseReported = 83;
  const multiplier = 1 + (reportingFriction * 0.25) + (demographicVulnerability * 0.12) + (socialStigma * 0.08);
  const calculatedEstimatedAffected = Math.round(baseReported * multiplier * 1.35);
  const calculatedEstimatedUnheard = Math.max(0, calculatedEstimatedAffected - baseReported);
  const calculatedSilenceIndex = Math.min(99, Math.round((calculatedEstimatedUnheard / calculatedEstimatedAffected) * 100));

  const circumference = 565.48;
  const strokeOffset = circumference - (circumference * calculatedSilenceIndex) / 100;

  return (
    <section id="silence-index" className="py-20 relative bg-[#EEF3FA] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <EyeOff className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>SIGNATURE SILENCE GAP MODEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight leading-tight">
            THE ABSENCE OF COMPLAINTS DOESN'T MEAN THE ABSENCE OF A PROBLEM.
          </h2>

          <p className="text-base sm:text-lg text-[#64748B] font-sans">
            UNHEARD estimates how much of a systemic problem remains invisible because affected individuals adapt, self-censor, or lack formal grievance avenues.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Circular Iceberg Gauge Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E2F0] shadow-md flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-4 border-b border-[#D9E2F0] mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-ping"></span>
                <span className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                  ICEBERG RATIO MODEL
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold">
                  AI ESTIMATE — DEMO
                </span>
                <button
                  onClick={() => setShowFormulaTooltip(!showFormulaTooltip)}
                  className="p-1 rounded text-[#64748B] hover:text-[#2563EB]"
                  title="View estimation model rationale"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Model Formula Dropdown */}
            {showFormulaTooltip && (
              <div className="w-full mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#BFDBFE] text-xs font-mono text-[#64748B] space-y-2 animate-fadeIn shadow-sm">
                <div className="text-[#2563EB] font-bold">ESTIMATION MODEL HEURISTIC:</div>
                <p>
                  Silence Index S = (Estimated Unheard / Estimated Affected) × 100%, where estimated affected population is derived from reporting friction coefficients, transit volume, and demographic factors.
                </p>
                <div className="text-[10px] text-[#94A3B8] italic">
                  * Designed as an investigative decision-support signal, not a statutory census.
                </div>
              </div>
            )}

            {/* Circular Gauge */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke="#EEF3FA"
                  strokeWidth="16"
                  className="fill-none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke="#DBEAFE"
                  strokeWidth="16"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${circumference - (circumference * (100 - calculatedSilenceIndex)) / 100}`}
                  strokeLinecap="round"
                  className="fill-none transition-all duration-700"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke="url(#silenceGradient)"
                  strokeWidth="16"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${strokeOffset}`}
                  strokeLinecap="round"
                  className="fill-none transition-all duration-700"
                />
                <defs>
                  <linearGradient id="silenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="60%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
                  {calculatedSilenceIndex}%
                </span>
                <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-widest font-bold mt-0.5">
                  SILENCE INDEX
                </span>
                <span className="text-[9.5px] font-mono text-[#64748B] mt-1">
                  ESTIMATED UNHEARD
                </span>
              </div>
            </div>

            {/* 3 Metric Cards Breakdown */}
            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-center font-mono">
                <div className="text-[10px] text-[#2563EB] uppercase font-bold">
                  REPORTED
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
                  {baseReported}
                </div>
                <div className="text-[9px] text-[#64748B] mt-0.5 font-medium">Explicit Voices</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-center font-mono">
                <div className="text-[10px] text-[#64748B] uppercase font-bold">
                  EST. AFFECTED
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#2563EB] mt-1">
                  ~{calculatedEstimatedAffected.toLocaleString()}
                </div>
                <div className="text-[9px] text-[#64748B] mt-0.5 font-medium">Projected Reach</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#DBEAFE] border border-[#BFDBFE] text-center font-mono">
                <div className="text-[10px] text-[#1D4ED8] uppercase font-bold">
                  EST. UNHEARD
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#1D4ED8] mt-1">
                  ~{calculatedEstimatedUnheard.toLocaleString()}
                </div>
                <div className="text-[9px] text-[#1D4ED8] mt-0.5 font-bold">{calculatedSilenceIndex}% Silent Gap</div>
              </div>
            </div>

            {/* Mandatory Responsible Disclaimer Box */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[11px] font-mono text-[#64748B] text-center w-full">
              <span className="text-[#2563EB] font-bold mr-1.5">AI ESTIMATE — DEMO:</span>
              “An illustrative estimate derived from aggregated reporting signals and assumptions. It is not a population census or individual-level prediction.”
            </div>

          </div>

          {/* Right Column: Interactive Parameter Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-[#D9E2F0]">
                <Sliders className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-xs font-mono font-bold uppercase text-[#0F172A] tracking-wider">
                  HEURISTIC SIMULATOR
                </h3>
              </div>

              <p className="text-xs font-mono text-[#64748B]">
                Adjust latent friction parameters to observe how institutional under-reporting distorts actual social need:
              </p>

              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#0F172A] font-semibold">Reporting Friction & Bureaucracy</span>
                  <span className="text-[#2563EB] font-bold">{reportingFriction}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={reportingFriction}
                  onChange={(e) => setReportingFriction(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer h-2 bg-[#EEF3FA] rounded-lg appearance-none"
                />
                <div className="text-[10px] font-mono text-[#64748B]">
                  Complex portal forms, fear of administrative retaliation, or apathy.
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#0F172A] font-semibold">Demographic Vulnerability</span>
                  <span className="text-[#1D4ED8] font-bold">{demographicVulnerability}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={demographicVulnerability}
                  onChange={(e) => setDemographicVulnerability(Number(e.target.value))}
                  className="w-full accent-[#1D4ED8] cursor-pointer h-2 bg-[#EEF3FA] rounded-lg appearance-none"
                />
                <div className="text-[10px] font-mono text-[#64748B]">
                  Shift workers, students, or mobility-impaired daily commuters.
                </div>
              </div>

              {/* Slider 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#0F172A] font-semibold">Problem Normalization ("Learned Silence")</span>
                  <span className="text-[#2563EB] font-bold">{socialStigma}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={socialStigma}
                  onChange={(e) => setSocialStigma(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer h-2 bg-[#EEF3FA] rounded-lg appearance-none"
                />
                <div className="text-[10px] font-mono text-[#64748B]">
                  Citizens assuming “nothing will change” so they avoid submitting.
                </div>
              </div>

              <button
                onClick={() => {
                  setReportingFriction(85);
                  setDemographicVulnerability(75);
                  setSocialStigma(60);
                }}
                className="w-full py-2.5 text-xs font-mono font-semibold bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-[#2563EB] rounded-xl transition-colors"
              >
                Reset Default Assumptions (92% Baseline)
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
