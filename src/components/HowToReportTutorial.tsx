import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Network, 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb, 
  MapPin, 
  Clock, 
  Users, 
  FileText,
  Radio,
  Lock
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const HowToReportTutorial: React.FC = () => {
  const { isTutorialOpen, setIsTutorialOpen, setIsSubmissionModalOpen } = useIntelligence();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 7;

  if (!isTutorialOpen) return null;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(s => s + 1);
    } else {
      setIsTutorialOpen(false);
      setIsSubmissionModalOpen(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container in Pure White */}
      <div className="relative w-full max-w-3xl bg-white border border-[#D9E2F0] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9E2F0] bg-[#F8FAFC]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                HOW TO REPORT A PROBLEM
              </h2>
              <p className="text-[10px] font-mono text-[#64748B]">
                See how one experience becomes a measurable social signal.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold">
              STEP {step} / {totalSteps}
            </span>
            <button
              onClick={() => setIsTutorialOpen(false)}
              className="p-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A] border border-[#D9E2F0] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-7 border-b border-[#D9E2F0] bg-[#EEF3FA]/70 text-[10px] font-mono text-center divide-x divide-[#D9E2F0]">
          {['1. Share', '2. Context', '3. Privacy', '4. AI Parser', '5. Pattern', '6. Signal', '7. Action'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx + 1)}
              className={`py-2 px-1 transition-all ${
                step === idx + 1
                  ? 'bg-[#2563EB] text-white font-bold'
                  : step > idx + 1
                  ? 'text-[#1D4ED8] bg-[#DBEAFE]/40 font-semibold'
                  : 'text-[#64748B]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Step Content Body in Pure White */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto min-h-[340px] flex flex-col justify-center bg-white">
          
          {/* STEP 1: SHARE WHAT HAPPENED */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  STEP 01 — SHARE WHAT HAPPENED
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Describe the Problem in Your Own Words
                </h3>
                <p className="text-xs text-[#64748B] font-sans">
                  You don't need technical jargon, legal phrasing, or administrative codes. Just tell us what you experienced.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 shadow-sm">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#2563EB] font-bold">
                  <FileText className="w-4 h-4" />
                  <span>EXAMPLE QUALITATIVE NARRATIVE:</span>
                </div>
                <blockquote className="text-sm font-sans italic text-[#0F172A] pl-3 border-l-2 border-[#2563EB]">
                  “I stopped using the road near my hostel after 7 PM because the streetlights haven't worked for weeks.”
                </blockquote>
              </div>
            </div>
          )}

          {/* STEP 2: ADD SAFE CONTEXT */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#1D4ED8] uppercase tracking-widest font-bold">
                  STEP 02 — ADD SAFE CONTEXT
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  We Need Context, Not Your Identity
                </h3>
                <p className="text-xs text-[#64748B] font-sans">
                  Help the AI cluster your report by providing broad contextual attributes without revealing personal details.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-1 shadow-sm">
                  <div className="text-[10px] text-[#2563EB] font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> AREA
                  </div>
                  <div className="text-[#0F172A] font-semibold">Perimeter Belt</div>
                  <div className="text-[10px] text-[#64748B]">Sector Grid #03</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-1 shadow-sm">
                  <div className="text-[10px] text-[#1D4ED8] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> TIME
                  </div>
                  <div className="text-[#0F172A] font-semibold">Night</div>
                  <div className="text-[10px] text-[#64748B]">Post 19:30</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-1 shadow-sm">
                  <div className="text-[10px] text-[#2563EB] font-bold flex items-center gap-1">
                    <Users className="w-3 h-3" /> AFFECTED
                  </div>
                  <div className="text-[#0F172A] font-semibold">Students / Residents</div>
                  <div className="text-[10px] text-[#64748B]">Pedestrians</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROTECT YOUR IDENTITY */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  STEP 03 — PROTECT YOUR IDENTITY
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Automated Multi-Layer Privacy Scrubbing
                </h3>
                <p className="text-xs text-[#64748B] font-sans">
                  Before your report touches the semantic layer, all personal data is permanently scrubbed on your client.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm">
                  <div className="text-[#2563EB] font-bold">01</div>
                  <div className="text-[11px] text-[#0F172A] mt-1 font-semibold">Detect PII</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm">
                  <div className="text-[#1D4ED8] font-bold">02</div>
                  <div className="text-[11px] text-[#0F172A] mt-1 font-semibold">Remove Names</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm">
                  <div className="text-[#2563EB] font-bold">03</div>
                  <div className="text-[11px] text-[#0F172A] mt-1 font-semibold">Generalize GPS</div>
                </div>
                <div className="p-3 rounded-xl bg-[#DBEAFE] border border-[#BFDBFE] shadow-sm">
                  <div className="text-[#1D4ED8] font-bold">04 ✓</div>
                  <div className="text-[11px] text-[#1D4ED8] mt-1 font-bold">Protected</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AI UNDERSTANDS */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-widest font-bold">
                  STEP 04 — AI UNDERSTANDS
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Structured Intent & Impact Extraction
                </h3>
                <p className="text-xs text-[#64748B] font-sans">
                  The AI normalizes the narrative into structured semantic vectors without losing nuance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] font-mono text-xs shadow-sm">
                <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                  <span className="text-[#64748B]">Topic: </span>
                  <span className="text-[#0F172A] font-bold">Public Safety & Lighting</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                  <span className="text-[#64748B]">Issue: </span>
                  <span className="text-[#2563EB] font-bold">Poor Street Illumination</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                  <span className="text-[#64748B]">Time Window: </span>
                  <span className="text-[#0F172A] font-semibold">Night (19:30 - 23:00)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                  <span className="text-[#64748B]">Impact Vector: </span>
                  <span className="text-[#1D4ED8] font-bold">Route avoidance / hazard</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: FIND THE PATTERN */}
          {step === 5 && (
            <div className="space-y-5 animate-fadeIn text-center">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#1D4ED8] uppercase tracking-widest font-bold">
                  STEP 05 — FIND THE PATTERN
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  Your Report Connects With Related Experiences
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#2563EB] shadow-md flex items-center justify-around font-mono">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F172A]">1 Story</div>
                  <div className="text-[10px] text-[#64748B] font-semibold">YOUR INPUT</div>
                </div>
                <div className="text-[#2563EB] font-bold text-xl">→</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2563EB]">23 Experiences</div>
                  <div className="text-[10px] text-[#64748B] font-semibold">SIMILAR VECTOR</div>
                </div>
                <div className="text-[#1D4ED8] font-bold text-xl">→</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1D4ED8]">1 Pattern</div>
                  <div className="text-[10px] text-[#64748B] font-semibold">COALESCED SIGNAL</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: GENERATE A SOCIAL SIGNAL */}
          {step === 6 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
                  STEP 06 — GENERATE A CAUSAL SIGNAL
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  The Consequence Map Elevates Intensity
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 font-mono text-xs shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-[#D9E2F0]">
                  <span className="text-[#0F172A] font-bold">EMERGING SIGNAL IDENTIFIED:</span>
                  <span className="px-2 py-0.5 rounded bg-[#DBEAFE] text-[#1D4ED8] font-bold text-[10px]">
                    GROWTH +38%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white border border-[#D9E2F0] rounded-lg">
                    <div className="text-lg font-bold text-[#0F172A]">23</div>
                    <div className="text-[9px] text-[#64748B]">RELATED VOICES</div>
                  </div>
                  <div className="p-2 bg-white border border-[#D9E2F0] rounded-lg">
                    <div className="text-lg font-bold text-[#2563EB]">4</div>
                    <div className="text-[9px] text-[#64748B]">AREAS</div>
                  </div>
                  <div className="p-2 bg-white border border-[#D9E2F0] rounded-lg">
                    <div className="text-lg font-bold text-[#1D4ED8]">91%</div>
                    <div className="text-[9px] text-[#64748B]">SILENCE GAP</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: SUGGEST ACTION */}
          {step === 7 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#2563EB] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#2563EB]" />
                  STEP 07 — SUGGEST ACTION
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                  AI-Suggested Actions Routed to Stakeholders
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-[#DBEAFE]/30 border border-[#BFDBFE] space-y-3 font-mono text-xs shadow-sm">
                <div className="text-[10px] text-[#1D4ED8] font-bold uppercase">
                  AI-SUGGESTED ACTION BRIEF:
                </div>
                <p className="text-[#0F172A] text-sm font-sans">
                  “Inspect and restore non-functional streetlights along the 1.4km perimeter corridor; schedule preventative evening foot-patrols.”
                </p>
                <div className="pt-2 text-[10px] text-[#64748B] border-t border-[#D9E2F0] flex justify-between font-semibold">
                  <span>ROUTED TO: Municipal Electrical Division</span>
                  <span className="text-[#2563EB]">STATUS: SIMULATED ROUTING</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 border-t border-[#D9E2F0] bg-[#F8FAFC] flex items-center justify-between font-mono text-xs">
          <button
            onClick={() => setIsTutorialOpen(false)}
            className="text-[#64748B] hover:text-[#0F172A] font-semibold transition-colors"
          >
            SKIP TUTORIAL
          </button>

          <div className="flex items-center space-x-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] flex items-center space-x-1.5 transition-colors font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-1.5 transition-all"
            >
              <span>{step === totalSteps ? 'TRY REPORTING NOW' : 'NEXT STEP →'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
