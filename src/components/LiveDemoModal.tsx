import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  MapPin
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { LIVE_DEMO_SCRIPT_EXPERIENCES } from '../data/mockData';

export const LiveDemoModal: React.FC = () => {
  const { isLiveDemoOpen, setIsLiveDemoOpen, resetAllDemoData } = useIntelligence();

  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [streamedIndex, setStreamedIndex] = useState<number>(0);

  const totalPhases = 7;

  useEffect(() => {
    if (!isLiveDemoOpen || !isPlaying) return;

    const phaseDurations = [2200, 2000, 2000, 2200, 2200, 2200, 3000];
    const duration = phaseDurations[currentPhase - 1] / speed;

    const timer = setTimeout(() => {
      if (currentPhase < totalPhases) {
        setCurrentPhase(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [isLiveDemoOpen, isPlaying, currentPhase, speed]);

  useEffect(() => {
    if (currentPhase === 1 && isPlaying) {
      setStreamedIndex(0);
      const interval = setInterval(() => {
        setStreamedIndex(prev => {
          if (prev < LIVE_DEMO_SCRIPT_EXPERIENCES.length - 1) return prev + 1;
          return prev;
        });
      }, 100 / speed);
      return () => clearInterval(interval);
    }
  }, [currentPhase, isPlaying, speed]);

  const handleResetDemo = () => {
    setCurrentPhase(1);
    setStreamedIndex(0);
    setIsPlaying(true);
    resetAllDemoData();
  };

  if (!isLiveDemoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container in Pure White */}
      <div className="relative w-full max-w-5xl bg-white border border-[#D9E2F0] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9E2F0] bg-[#F8FAFC]">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
              </span>
              <h2 className="text-xs font-mono font-extrabold tracking-wider text-[#0F172A] uppercase">
                AUTOMATED SOCIAL SIGNAL SIMULATION
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold">
              PHASE {currentPhase} / 7
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSpeed(s => s === 1 ? 2 : 1)}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#64748B] transition-colors font-semibold"
            >
              {speed}x SPEED
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] transition-colors"
              title={isPlaying ? "Pause Demo" : "Play Demo"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleResetDemo}
              className="p-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] transition-colors"
              title="Reset Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsLiveDemoOpen(false)}
              className="p-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A] border border-[#D9E2F0] transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-7 border-b border-[#D9E2F0] bg-[#EEF3FA]/70 text-[10.5px] font-mono text-center divide-x divide-[#D9E2F0] overflow-x-auto">
          {[
            { id: 1, label: '1. Experiences' },
            { id: 2, label: '2. Privacy & AI' },
            { id: 3, label: '3. Clustering' },
            { id: 4, label: '4. Pattern' },
            { id: 5, label: '5. Silence Index' },
            { id: 6, label: '6. Consequence Map' },
            { id: 7, label: '7. Stakeholders' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentPhase(tab.id);
                setIsPlaying(false);
              }}
              className={`py-2.5 px-1 transition-all ${
                currentPhase === tab.id
                  ? 'bg-[#2563EB] text-white font-bold'
                  : currentPhase > tab.id
                  ? 'text-[#1D4ED8] bg-[#DBEAFE]/40 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Phase Body in Pure White */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto min-h-[400px] flex flex-col justify-center bg-white">
          
          {/* Phase 1 */}
          {currentPhase === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  PHASE 1 — ANONYMOUS INGESTION STREAM
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  20 Qualitative Experiences Arrive In Isolation
                </h3>
                <p className="text-xs font-mono text-[#64748B]">
                  Citizens experience friction, but no single isolated complaint triggers institutional action.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto p-2 bg-[#F8FAFC] rounded-2xl border border-[#D9E2F0]">
                {LIVE_DEMO_SCRIPT_EXPERIENCES.slice(0, streamedIndex + 1).map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#D9E2F0] text-[11px] text-[#0F172A] leading-snug animate-fadeIn flex flex-col justify-between shadow-sm"
                  >
                    <span>“{exp}”</span>
                    <div className="mt-2 pt-1.5 border-t border-[#D9E2F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                      <span>INPUT #{idx + 1}</span>
                      <span className="text-[#2563EB] font-bold">ANONYMOUS</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#64748B] px-2 font-semibold">
                <span>Ingesting stream: {streamedIndex + 1} / 20 experiences</span>
                <span className="text-[#2563EB] animate-pulse">Streaming raw qualitative inputs...</span>
              </div>
            </div>
          )}

          {/* Phase 2 */}
          {currentPhase === 2 && (
            <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto w-full">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#1D4ED8] uppercase tracking-widest font-bold">
                  PHASE 2 — PRIVACY SCRUBBING & SEMANTIC NORMALIZATION
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Protecting Identities & Normalizing Semantic Intent
                </h3>
              </div>

              <div className="space-y-3 bg-[#F8FAFC] p-6 rounded-2xl border border-[#D9E2F0]">
                {[
                  { title: "Zero-PII Privacy Protection Layer", desc: "Names, phone numbers, units & exact GPS coordinates redacted", status: "COMPLETE" },
                  { title: "Semantic Intent & Entity Extraction", desc: "Extracted Topic: Pedestrian Lighting; Impact: Nocturnal route avoidance", status: "COMPLETE" },
                  { title: "Spatial Generalization & Sector Mapping", desc: "Generalized to Perimeter Sector Belt (Sector Grid #03)", status: "COMPLETE" },
                  { title: "Vector Embedding Generation", desc: "Computed 768-dimensional contextual similarity vectors", status: "PROCESSING" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#D9E2F0] shadow-sm">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                      <div>
                        <div className="text-xs font-bold text-[#0F172A]">{step.title}</div>
                        <div className="text-[11px] text-[#64748B] font-mono">{step.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DBEAFE] text-[#1D4ED8] font-bold">
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phase 3 */}
          {currentPhase === 3 && (
            <div className="space-y-6 animate-fadeIn text-center">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  PHASE 3 — SPATIAL & CAUSAL CLUSTERING
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Discrete Experiences Coalesce Into A Single Consequence Model
                </h3>
              </div>

              <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#2563EB] shadow-md flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-center space-x-4 text-center">
                  <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] shadow-sm">
                    <div className="text-3xl font-extrabold text-[#2563EB] font-display">23</div>
                    <div className="text-xs font-mono text-[#64748B] font-bold">RELATED EXPERIENCES</div>
                  </div>
                  <div className="text-2xl text-[#94A3B8] font-bold">→</div>
                  <div className="p-4 rounded-xl bg-white border border-[#D9E2F0] shadow-sm">
                    <div className="text-3xl font-extrabold text-[#1D4ED8] font-display">4</div>
                    <div className="text-xs font-mono text-[#64748B] font-bold">AGGREGATED SECTORS</div>
                  </div>
                  <div className="text-2xl text-[#94A3B8] font-bold">→</div>
                  <div className="p-4 rounded-xl bg-[#DBEAFE] border border-[#BFDBFE]">
                    <div className="text-3xl font-extrabold text-[#2563EB] font-display">1</div>
                    <div className="text-xs font-mono text-[#1D4ED8] font-bold">EMERGING PATTERN</div>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#2563EB] bg-[#DBEAFE] px-4 py-2 rounded-lg border border-[#BFDBFE] font-bold">
                  Cosine Similarity Score: 0.94 • Semantic Density Threshold: EXCEEDED
                </div>
              </div>
            </div>
          )}

          {/* Phase 4 */}
          {currentPhase === 4 && (
            <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto w-full">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping"></span>
                  PHASE 4 — CAUSAL PATTERN DETECTED
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Night-Time Accessibility & Lighting Concern
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="p-3 bg-white rounded-xl border border-[#D9E2F0] shadow-sm">
                    <div className="text-2xl font-bold text-[#0F172A] font-display">23</div>
                    <div className="text-[10px] text-[#64748B] font-semibold">VOICES</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#D9E2F0] shadow-sm">
                    <div className="text-2xl font-bold text-[#2563EB] font-display">4</div>
                    <div className="text-[10px] text-[#64748B] font-semibold">SECTORS</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#D9E2F0] shadow-sm">
                    <div className="text-2xl font-bold text-[#1D4ED8] font-display">91%</div>
                    <div className="text-[10px] text-[#64748B] font-semibold">CONFIDENCE</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#D9E2F0] shadow-sm">
                    <div className="text-2xl font-bold text-[#2563EB] font-display">+42%</div>
                    <div className="text-[10px] text-[#64748B] font-semibold">VELOCITY</div>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl text-xs text-[#0F172A] font-mono border-l-2 border-[#2563EB] shadow-sm">
                  <span className="text-[#2563EB] font-bold">SYNTHESIZED INSIGHT:</span> Multiple independent pedestrians report taking 20-minute detours due to an unlit 400m pathway active between 19:30 and 23:00.
                </div>
              </div>
            </div>
          )}

          {/* Phase 5 */}
          {currentPhase === 5 && (
            <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto w-full">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  PHASE 5 — ESTIMATING THE UNHEARD POPULATION
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Silence Index Computation
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm">
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="72" cy="72" r="58" stroke="#EEF3FA" strokeWidth="8" className="fill-none" />
                      <circle 
                        cx="72" 
                        cy="72" 
                        r="58" 
                        stroke="url(#demoGradientLight)" 
                        strokeWidth="9" 
                        strokeDasharray="364" 
                        strokeDashoffset="33" 
                        strokeLinecap="round" 
                        className="fill-none transition-all duration-1000" 
                      />
                      <defs>
                        <linearGradient id="demoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-display font-black text-[#0F172A]">91%</span>
                      <span className="text-[9px] font-mono text-[#2563EB] font-bold uppercase">SILENCE INDEX</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] mt-2 font-medium">AI ESTIMATE — DEMO</span>
                </div>

                <div className="md:col-span-7 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                    <span className="text-[#64748B]">REPORTED (VOICES RECEIVED):</span>
                    <span className="font-bold text-[#0F172A]">23</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                    <span className="text-[#64748B]">ESTIMATED AFFECTED:</span>
                    <span className="font-bold text-[#2563EB]">~260</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE]">
                    <span className="text-[#1D4ED8]">ESTIMATED UNHEARD:</span>
                    <span className="font-bold text-[#1D4ED8]">~237 (91%)</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-mono text-center text-[#64748B] italic">
                * Illustrative estimate derived from reporting friction modeling. Not an individual-level census count.
              </p>
            </div>
          )}

          {/* Phase 6 */}
          {currentPhase === 6 && (
            <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto w-full">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  PHASE 6 — SPATIAL CLUSTER LOCALIZATION
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Aggregated Sector Identified
                </h3>
              </div>

              <div className="relative h-48 rounded-2xl bg-[#F8FAFC] border border-[#2563EB] p-4 flex items-center justify-center overflow-hidden cyber-grid-bg shadow-sm">
                <div className="relative flex flex-col items-center space-y-1">
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#2563EB] opacity-75"></span>
                    <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold shadow-md">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-white px-3.5 py-1.5 rounded-lg border border-[#D9E2F0] text-xs font-mono text-[#0F172A] text-center shadow-sm">
                    Perimeter Sector (Zone 03)
                    <div className="text-[10px] text-[#2563EB] font-semibold">Grid Coord: 72% X, 65% Y • Zero GPS Leaked</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 7 */}
          {currentPhase === 7 && (
            <div className="space-y-6 animate-fadeIn text-center max-w-2xl mx-auto w-full">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  PHASE 7 — ACTIONABLE STAKEHOLDER SIGNAL
                </span>
                <h3 className="text-3xl font-display font-black text-[#0F172A]">
                  A STORY BECAME A SIGNAL.
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#D9E2F0] shadow-md space-y-4">
                <div className="text-xs font-mono text-[#64748B] font-bold uppercase tracking-wider">
                  DISPATCHED INTELLIGENCE DOSSIER TO:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] font-semibold">
                    Campus Facilities
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] font-semibold">
                    Municipal Electrical
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] font-semibold">
                    Resident Council
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] font-semibold">
                    Safety NGO
                  </div>
                </div>

                <div className="p-3 bg-[#DBEAFE] rounded-xl border border-[#BFDBFE] text-xs font-mono text-[#1D4ED8] font-semibold">
                  ACTION PLAN: Emergency repair of junction box at Pole #42 & scheduled evening safety foot-patrols.
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2 font-mono text-xs">
                <button
                  onClick={handleResetDemo}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REPLAY SIMULATION</span>
                </button>
                <button
                  onClick={() => setIsLiveDemoOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] font-semibold"
                >
                  EXPLORE PLATFORM
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Status */}
        <div className="px-6 py-3 border-t border-[#D9E2F0] bg-[#F8FAFC] flex items-center justify-between text-xs font-mono text-[#64748B]">
          <div className="flex items-center space-x-2">
            <span className="text-[#2563EB] font-bold">UNHEARD PIPELINE:</span>
            <span className="hidden sm:inline">Input Received → AI Processing → Consequence Mapping → Insights → Action</span>
          </div>
          <div className="text-[11px] text-[#64748B] font-semibold">
            10–15s AUTOMATED PRESENTATION
          </div>
        </div>

      </div>
    </div>
  );
};
