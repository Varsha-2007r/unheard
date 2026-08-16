import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  PlusCircle, 
  ShieldCheck, 
  Radio, 
  HelpCircle,
  Activity
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

interface RippleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  category: string;
  tier: 'central' | 'direct' | 'indirect' | 'critical';
  angle: number;
  dist: number;
  radius: number;
}

const CAUSAL_SNIPPETS = [
  { text: "Bus route overcrowding", cat: "Transit", tier: 'direct' as const },
  { text: "Shift workers delayed 45m", cat: "Economic", tier: 'indirect' as const },
  { text: "Unlit perimeter walkway", cat: "Safety", tier: 'direct' as const },
  { text: "Night transit route avoidance", cat: "Social", tier: 'indirect' as const },
  { text: "Wheelchair ramp gradient >20°", cat: "Access", tier: 'direct' as const },
  { text: "Academic session exclusion", cat: "Equity", tier: 'indirect' as const },
  { text: "Stagnant drainage culvert", cat: "Infra", tier: 'critical' as const },
  { text: "Depot platform flooding", cat: "Hazard", tier: 'critical' as const },
];

export const Hero: React.FC = () => {
  const { 
    setIsLiveDemoOpen, 
    setIsSubmissionModalOpen, 
    setIsTutorialOpen 
  } = useIntelligence();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rippleStage, setRippleStage] = useState<number>(0);

  // Stage cycling
  useEffect(() => {
    const stageTimer = setInterval(() => {
      setRippleStage((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(stageTimer);
  }, []);

  // HTML5 Concentric Ripple & Causal Consequence Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 420;
      }
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Generate Nodes on concentric orbits
    const nodes: RippleNode[] = CAUSAL_SNIPPETS.map((item, idx) => {
      const angle = (idx / CAUSAL_SNIPPETS.length) * Math.PI * 2 + 0.2;
      const baseDist = item.tier === 'direct' ? 75 : item.tier === 'indirect' ? 135 : 170;
      return {
        x: centerX + Math.cos(angle) * baseDist,
        y: centerY + Math.sin(angle) * baseDist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        text: item.text,
        category: item.cat,
        tier: item.tier,
        angle,
        dist: baseDist,
        radius: item.tier === 'direct' ? 5 : item.tier === 'indirect' ? 4 : 5.5,
      };
    });

    let pulseTime = 0;

    const render = () => {
      pulseTime += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Radial Grid & Background in White/Blue
      ctx.strokeStyle = '#D9E2F0';
      ctx.lineWidth = 0.75;
      const gridSize = 35;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Concentric Ripple Rings (Soft Blue & Sky Blue)
      const rippleRadii = [45, 85, 135, 180];
      rippleRadii.forEach((r, i) => {
        const expansion = (Math.sin(pulseTime + i * 0.8) + 1) * 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r + expansion, 0, Math.PI * 2);
        ctx.strokeStyle = i === 3 ? 'rgba(219, 234, 254, 0.9)' : i === 2 ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.25)';
        ctx.lineWidth = i === 0 ? 1.5 : 1;
        if (i % 2 === 1) {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Dynamic Ripple Wavefront
      const waveRadius = ((pulseTime * 35) % 180) + 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(37, 99, 235, ${Math.max(0, 0.4 - waveRadius / 200)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Connecting Causal Vectors
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = node.tier === 'critical' 
          ? 'rgba(239, 68, 68, 0.35)' 
          : node.tier === 'direct' 
          ? 'rgba(37, 99, 235, 0.35)' 
          : 'rgba(96, 165, 250, 0.25)';
        ctx.lineWidth = node.tier === 'direct' ? 1.5 : 1;
        ctx.stroke();
      });

      // 5. Central Event Origin (Deep Royal Blue)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(219, 234, 254, 0.8)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#1D4ED8'; // Deep Royal Blue
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Center label: UNHEARD
      ctx.font = 'bold 8px JetBrains Mono, monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText('UNHEARD', centerX, centerY + 3);

      // 6. Ripple Nodes
      nodes.forEach((node, i) => {
        // Subtle orbital floating
        const currentAngle = node.angle + Math.sin(pulseTime * 0.5 + i) * 0.05;
        node.x = centerX + Math.cos(currentAngle) * node.dist;
        node.y = centerY + Math.sin(currentAngle) * node.dist;

        // Node Glow Halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = node.tier === 'critical'
          ? 'rgba(239, 68, 68, 0.15)'
          : node.tier === 'direct'
          ? 'rgba(37, 99, 235, 0.15)'
          : 'rgba(96, 165, 250, 0.2)';
        ctx.fill();

        // Node Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.tier === 'critical'
          ? '#EF4444' // Critical Alert Only
          : node.tier === 'direct'
          ? '#2563EB' // Royal Blue
          : '#60A5FA'; // Sky Blue
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Text Pill
        ctx.font = '500 10px Inter, sans-serif';
        ctx.textAlign = node.x > centerX ? 'left' : 'right';
        ctx.fillStyle = '#0F172A';
        const labelX = node.x > centerX ? node.x + 8 : node.x - 8;
        ctx.fillText(node.text, labelX, node.y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="discover" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#F7F9FC] border-b border-[#D9E2F0]">
      
      {/* Subtle Blue Radial Glow behind Central Ripple */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-gradient-to-br from-[#DBEAFE]/70 via-[#60A5FA]/20 to-transparent blur-[110px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-10 left-10 w-[450px] h-[350px] bg-[#EEF3FA]/80 blur-[90px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D9E2F0] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
            <span className="text-xs font-mono text-[#2563EB] font-bold tracking-wide">
              UNHEARD • SOCIAL PROBLEM INTELLIGENCE
            </span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#DBEAFE]/60 border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Zero-PII Privacy Protection</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline (SEE TODAY. UNDERSTAND TOMORROW. SHAPE WHAT MATTERS.) & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#2563EB] font-bold">
                “One voice can be ignored. A pattern cannot.”
              </p>
              <p className="text-xs font-mono text-[#64748B] tracking-wider">
                We don't amplify noise. We reveal patterns.
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-6.5xl font-extrabold tracking-tight leading-[1.08] text-[#0F172A]">
              <span className="block text-[#0F172A]">SEE TODAY.</span>
              <span className="block text-[#2563EB]">UNDERSTAND TOMORROW.</span>
              <span className="block text-[#0F172A]">SHAPE <span className="text-[#1D4ED8]">WHAT MATTERS.</span></span>
            </h1>

            {/* Supporting Explanation */}
            <p className="text-base sm:text-lg text-[#64748B] max-w-2xl font-normal leading-relaxed">
              UNHEARD transforms everyday human experiences into predictive social problem intelligence and actionable consequence mapping — revealing hidden systemic problems before they escalate into crises.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              
              {/* Primary CTA: SIMULATE NOW / SHARE AN EXPERIENCE */}
              <button
                onClick={() => setIsSubmissionModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] transition-all duration-200 flex items-center space-x-2.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>SHARE AN EXPERIENCE</span>
              </button>

              {/* Secondary CTA: EXPLORE SOCIAL SIGNALS */}
              <button
                onClick={() => scrollToSection('intelligence')}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#2563EB] text-[#0F172A] font-semibold text-sm transition-all flex items-center space-x-2 shadow-sm"
              >
                <Activity className="w-4 h-4 text-[#2563EB]" />
                <span>EXPLORE SOCIAL SIGNALS</span>
              </button>

              {/* Third Small CTA: HOW UNHEARD WORKS */}
              <button
                onClick={() => setIsTutorialOpen(true)}
                className="px-4 py-3 rounded-xl bg-white hover:bg-[#DBEAFE]/40 border border-[#D9E2F0] text-[#64748B] hover:text-[#2563EB] text-xs font-mono transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>HOW UNHEARD WORKS</span>
              </button>

            </div>

            {/* Status Pipeline Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#64748B] bg-white p-3 rounded-xl border border-[#D9E2F0] shadow-sm w-fit">
              <span className="text-[#2563EB] font-bold">Input Received</span>
              <span className="text-[#94A3B8]">→</span>
              <span className="text-[#1D4ED8] font-bold">AI Processing</span>
              <span className="text-[#94A3B8]">→</span>
              <span className="text-[#60A5FA] font-bold">Mapping Consequences</span>
              <span className="text-[#94A3B8]">→</span>
              <span className="text-[#2563EB] font-bold">Generating Insights</span>
              <span className="text-[#94A3B8]">→</span>
              <span className="text-[#1D4ED8] font-bold">Recommendations Ready</span>
            </div>

          </div>

          {/* Right Column: Concentric Ripple Consequence Visualization */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white border border-[#D9E2F0] p-5 shadow-lg overflow-hidden">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0] mb-2">
                <div className="flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-[#2563EB] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#0F172A] tracking-wider">
                    CAUSAL RIPPLE PROPAGATION
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#DBEAFE] text-[#1D4ED8] font-bold">
                  LIVE SIMULATION
                </span>
              </div>

              {/* Dynamic Canvas Container */}
              <div className="relative w-full h-[290px] sm:h-[320px] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#D9E2F0] flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full block" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#D9E2F0] text-xs font-mono shadow-sm">
                  <div className="text-[#0F172A] flex items-center space-x-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                    <span>Direct: 4</span>
                    <span className="text-[#94A3B8]">|</span>
                    <span className="text-[#60A5FA]">Indirect: 3</span>
                  </div>
                  <div className="text-[#EF4444] font-bold text-[10px] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                    Critical Impact: 1
                  </div>
                </div>
              </div>

              {/* Aggregation Summary Banner */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#EEF3FA] border border-[#D9E2F0] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                    Input Stream
                  </div>
                  <div className="text-base font-display font-extrabold text-[#0F172A]">
                    1,284 EXPERIENCES
                  </div>
                </div>
                <div className="text-[#2563EB] font-bold text-lg">→</div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                    Synthesized Consequences
                  </div>
                  <div className="text-base font-display font-extrabold text-[#2563EB]">
                    7 ACTIONABLE DOSSIERS
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Paradigm Shift Banner */}
        <div className="mt-14 pt-8 border-t border-[#D9E2F0] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#2563EB] font-bold mb-1">
              INTELLIGENCE PARADIGM
            </div>
            <h3 className="text-2xl font-bold font-display text-[#0F172A]">
              FROM ISOLATED REPORTS <br />
              <span className="text-[#2563EB]">
                TO PREDICTIVE ACTION
              </span>
            </h3>
          </div>
          
          <div className="md:col-span-7">
            <blockquote className="text-sm sm:text-base text-[#64748B] italic font-light border-l-2 border-[#2563EB] pl-4">
              “The problem is not always that people don't speak. Sometimes the problem is that nobody is mapping the causal consequence.”
            </blockquote>
          </div>
        </div>

      </div>
    </section>
  );
};
