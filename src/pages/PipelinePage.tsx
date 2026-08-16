import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Clock, 
  Zap,
  Lock,
  Compass,
  Cpu,
  BarChart3,
  Scale
} from 'lucide-react';
import { ArchitecturePipeline } from '../components/ArchitecturePipeline';

export const PipelinePage: React.FC = () => {
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
    { id: 1, name: '01. UNDERSTAND', role: 'Royal Blue', desc: 'LLM semantic intent parsing & problem entity extraction' },
    { id: 2, name: '02. NORMALIZE', role: 'Deep Blue', desc: 'Client zero-PII scrubbing & sector geo-bucketing' },
    { id: 3, name: '03. CLUSTER', role: 'Sky Blue', desc: '768-dim contextual cosine similarity clustering' },
    { id: 4, name: '04. CONNECT', role: 'Royal Blue', desc: 'Causal consequence mapping & silence index computation' },
    { id: 5, name: '05. DETECT', role: 'Deep Blue', desc: 'Synthesized problem dossier & stakeholder action brief' },
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
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
          <BrainCircuit className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>AI PATTERN DISCOVERY PIPELINE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight leading-tight">
          ONE EXPERIENCE IS A STORY. <br />
          <span className="text-[#2563EB]">
            A THOUSAND EXPERIENCES ARE A SIGNAL.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#64748B] font-sans">
          How UNHEARD transforms isolated friction into structural evidence through continuous causal mapping.
        </p>
      </div>

      {/* Live Interactive Pattern Synthesis Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Raw Qualitative Experience Stream */}
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
                className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-1.5 shadow-xs"
              >
                <p className="text-xs text-[#0F172A] font-sans italic leading-relaxed">
                  {story.quote}
                </p>
                <div className="text-[10px] font-mono text-[#64748B]">
                  {story.context}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={runSynthesisAnimation}
            disabled={isSynthesizing}
            className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSynthesizing ? 'SYNTHESIZING EXPERIENCES...' : 'RE-RUN AI SYNTHESIS SIMULATION'}</span>
          </button>
        </div>

        {/* Right Column: 5-Stage Live Pipeline Execution */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] font-mono text-xs">
            <span className="font-bold text-[#0F172A] uppercase tracking-wider">
              5-STAGE PIPELINE EXECUTION
            </span>
            <span className="text-[#2563EB] font-bold">
              STAGE {pipelineStep} / 5
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs flex-1">
            {pipelineStages.map((stage) => {
              const isCurrent = pipelineStep === stage.id;
              const isDone = pipelineStep > stage.id;

              return (
                <div
                  key={stage.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#DBEAFE]/40 border-[#2563EB] shadow-xs'
                      : isDone
                      ? 'bg-white border-[#D9E2F0] text-[#0F172A]'
                      : 'bg-[#F8FAFC] border-[#D9E2F0]/60 text-[#94A3B8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isDone
                          ? 'bg-[#2563EB] text-white'
                          : isCurrent
                          ? 'bg-[#2563EB] text-white animate-pulse'
                          : 'bg-[#EEF3FA] text-[#94A3B8]'
                      }`}>
                        {isDone ? '✓' : stage.id}
                      </span>
                      <span className={`font-bold ${isCurrent ? 'text-[#2563EB]' : ''}`}>
                        {stage.name}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#64748B]">
                      {isDone ? 'COMPLETE' : isCurrent ? 'PROCESSING...' : 'QUEUED'}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#64748B] font-sans mt-2 pl-7">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Synthesized Output Result Box */}
          {pipelineStep === 5 && (
            <div className="p-4 rounded-2xl bg-[#DBEAFE]/40 border border-[#BFDBFE] font-mono text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-[#2563EB] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>PATTERN IDENTIFIED: Morning Transit Saturation (Route 554)</span>
              </div>
              <p className="text-xs text-[#0F172A] font-sans">
                Synthesized 83 isolated commuter experiences across 4 sectors into a +42% velocity alert.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 8-Stage Architecture Pipeline Section */}
      <div className="pt-8">
        <ArchitecturePipeline />
      </div>

    </div>
  );
};
