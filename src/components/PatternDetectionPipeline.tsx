import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Play
} from 'lucide-react';

export const PatternDetectionPipeline: React.FC = () => {
  const [pipelineStep, setPipelineStep] = useState<number>(5);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  const sampleStories = [
    {
      id: 1,
      quote: "“I stopped taking the bus because it is always overcrowded before 8:30 AM.”",
      context: "Commuter • Transit Corridor"
    },
    {
      id: 2,
      quote: "“The bus is impossible to board after 8 AM. Conductors refuse to open the doors.”",
      context: "Student • Main Gate Link"
    },
    {
      id: 3,
      quote: "“I started walking 3 km because morning buses are completely packed.”",
      context: "Worker • Industrial Belt"
    },
    {
      id: 4,
      quote: "“I regularly miss morning lectures because route 554 blows past our stop full.”",
      context: "Student • Campus Depot"
    },
  ];

  const pipelineStages = [
    { id: 1, name: 'INPUT RECEIVED', role: 'Royal Blue', desc: 'LLM semantic intent parsing & sentiment analysis' },
    { id: 2, name: 'AI PROCESSING', role: 'Deep Blue', desc: 'Client PII scrubbing & sector geo-bucketing' },
    { id: 3, name: 'MAPPING CONSEQUENCES', role: 'Sky Blue', desc: 'Causal impact and vector similarity mapping' },
    { id: 4, name: 'GENERATING INSIGHTS', role: 'Royal Blue', desc: 'Cross-zone correlation across time windows' },
    { id: 5, name: 'RECOMMENDATIONS READY', role: 'Deep Blue', desc: 'Actionable executive intelligence brief' },
  ];

  const runSynthesisAnimation = () => {
    setIsSynthesizing(true);
    setPipelineStep(1);
    
    const interval = setInterval(() => {
      setPipelineStep(prev => {
        if (prev < 5) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsSynthesizing(false);
          return 5;
        }
      });
    }, 700);
  };

  return (
    <section className="py-20 relative bg-[#F7F9FC] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <BrainCircuit className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>AI PATTERN DISCOVERY PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            ONE EXPERIENCE IS A STORY. <br />
            <span className="text-[#2563EB]">
              A THOUSAND EXPERIENCES ARE A SIGNAL.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748B]">
            How UNHEARD transforms isolated friction into structural evidence through continuous causal mapping.
          </p>
        </div>

        {/* 2-Column Synthesis Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Anonymous Raw Experience Stream */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] font-mono text-xs">
              <span className="font-bold text-[#0F172A] uppercase tracking-wider">
                RAW ANONYMOUS INPUTS
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#EEF3FA] text-[#64748B] font-bold">
                STREAM
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {sampleStories.map((story) => (
                <div
                  key={story.id}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF3FA] border border-[#D9E2F0] hover:border-[#BFDBFE] transition-all duration-200 text-xs text-[#0F172A] space-y-1.5 shadow-sm"
                >
                  <p className="italic font-sans text-[#0F172A]">“{story.quote}”</p>
                  <div className="text-[10px] font-mono text-[#2563EB] flex items-center justify-between font-semibold">
                    <span>{story.context}</span>
                    <span className="text-[#94A3B8]">ID #{100 + story.id}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={runSynthesisAnimation}
              disabled={isSynthesizing}
              className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  <span>RUNNING CAUSAL PIPELINE...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>SIMULATE PIPELINE FLOW →</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Pipeline Visualizer */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-sm space-y-6">
            
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[#2563EB] font-bold uppercase tracking-wider">
                STATUS PIPELINE:
              </div>

              <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
                {pipelineStages.map((stage) => {
                  const isActive = pipelineStep >= stage.id;
                  const isCurrent = pipelineStep === stage.id;

                  return (
                    <div
                      key={stage.id}
                      className={`p-2 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-[#2563EB] border-[#2563EB] text-white font-bold shadow-md scale-102'
                          : isActive
                          ? 'bg-[#DBEAFE] border-[#BFDBFE] text-[#1D4ED8] font-semibold'
                          : 'bg-[#F8FAFC] border-[#D9E2F0] text-[#94A3B8]'
                      }`}
                    >
                      <div className="text-[9.5px] font-extrabold truncate">{stage.name}</div>
                      <div className="text-[8px] opacity-80 hidden sm:block truncate mt-0.5">
                        {stage.id === 5 ? 'COMPLETED' : `STEP 0${stage.id}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Output Dossier */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-ping"></span>
                  <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                    CAUSAL PATTERN DETECTED
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#D9E2F0] text-[#64748B] font-semibold">
                  CONFIDENCE: 91% DEMO
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                  Morning Public Transport Overcrowding & Route Gaps
                </h3>
                <p className="text-xs text-[#64748B] mt-1 font-sans">
                  Cross-validation reveals recurring route capacity failures along Route 554 and 70B between 7:45 AM and 9:15 AM across 9 transit stops.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#0F172A]">428</div>
                  <div className="text-[9px] text-[#64748B] font-medium">RELATED VOICES</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#2563EB]">9</div>
                  <div className="text-[9px] text-[#64748B] font-medium">SECTORS</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#1D4ED8]">3</div>
                  <div className="text-[9px] text-[#64748B] font-medium">TIME WINDOWS</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#60A5FA]">91%</div>
                  <div className="text-[9px] text-[#64748B] font-medium">CONFIDENCE</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] flex items-center justify-between">
                <span>SIGNAL ROUTED TO: Metropolitan Transport Authority</span>
                <span className="font-bold">STATUS: ACTIONABLE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
