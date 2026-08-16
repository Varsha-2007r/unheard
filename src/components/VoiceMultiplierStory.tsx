import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Users, ArrowRight, Zap, Network } from 'lucide-react';

export const VoiceMultiplierStory: React.FC = () => {
  const [multiplierStep, setMultiplierStep] = useState<number>(4);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const steps = [
    { count: 1, label: '1 Voice', desc: 'Easily dismissed as an isolated anecdote or minor personal complaint.' },
    { count: 10, label: '10 Voices', desc: 'Localized friction begins to form subtle statistical noise.' },
    { count: 100, label: '100 Voices', desc: 'Identifiable recurring time windows and spatial clusters emerge.' },
    { count: 1000, label: '1,000 Voices', desc: 'Undeniable systemic evidence surfaces across entire transit arteries.' },
    { count: 10000, label: '10,000 Voices', desc: 'A major societal mandate that demands immediate institutional policy response.' },
  ];

  const currentStepData = steps[multiplierStep];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 360);

    const targetParticleCount = [1, 12, 60, 200, 450][multiplierStep];
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      originX: number;
      originY: number;
      size: number;
      color: string;
    }[] = [];

    const centerX = width / 2;
    const centerY = height / 2;
    const colors = ['#2563EB', '#1D4ED8', '#60A5FA', '#3B82F6', '#93C5FD'];

    for (let i = 0; i < targetParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = multiplierStep === 4 
        ? Math.random() * 90 
        : multiplierStep === 3 
        ? Math.random() * 140 
        : Math.random() * 160 + 20;

      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        originX: centerX,
        originY: centerY,
        size: multiplierStep === 0 ? 8 : multiplierStep >= 3 ? 2.5 : 4,
        color: colors[i % colors.length]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Concentric background ripple lines
      if (multiplierStep >= 2) {
        ctx.strokeStyle = '#D9E2F0';
        ctx.lineWidth = 1;
        [50, 100, 150].forEach((r) => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      // Dynamic causal mesh lines
      if (multiplierStep >= 3) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i += 2) {
          for (let j = i + 1; j < particles.length; j += 3) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 45) {
              ctx.strokeStyle = `rgba(37, 99, 235, ${0.45 - dist / 120})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Central Hub
      if (multiplierStep === 4) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(219, 234, 254, 0.5)';
        ctx.fill();
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (multiplierStep >= 3) {
          p.x += (centerX - p.x) * 0.02;
          p.y += (centerY - p.y) * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [multiplierStep]);

  return (
    <section className="py-20 relative bg-[#F7F9FC] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold">
            EXPONENTIAL AMPLIFICATION
          </span>

          <h2 className="text-4xl sm:text-6xl font-black font-display text-[#0F172A] tracking-tight">
            VOICE OF {currentStepData.count.toLocaleString()}
          </h2>

          <div className="text-xl sm:text-2xl font-bold font-display text-[#2563EB]">
            A PATTERN CANNOT BE IGNORED.
          </div>

          <p className="text-sm font-mono text-[#64748B] max-w-xl mx-auto font-sans">
            {currentStepData.desc}
          </p>
        </div>

        {/* Step Multiplier Slider Controls */}
        <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-[#64748B] px-1 font-semibold">
            <span>SCALE MULTIPLIER:</span>
            <span className="text-[#2563EB] font-bold">{currentStepData.label}</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setMultiplierStep(idx)}
                className={`py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                  multiplierStep === idx
                    ? 'bg-[#2563EB] text-white shadow-md scale-105'
                    : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#2563EB] hover:bg-[#DBEAFE]'
                }`}
              >
                {s.count >= 1000 ? `${s.count / 1000}K` : s.count}
              </button>
            ))}
          </div>
        </div>

        {/* Particle Canvas Container */}
        <div className="relative max-w-4xl mx-auto h-[360px] rounded-3xl bg-white border border-[#D9E2F0] overflow-hidden shadow-md flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-[#D9E2F0] text-xs font-mono text-[#64748B] shadow-sm">
            <span>CONVERGENCE RATIO: 10,000 : 1 CAUSAL SIGNAL</span>
            <span className="text-[#2563EB] font-bold">RESEARCH GRADE PROTOCOL</span>
          </div>
        </div>

      </div>
    </section>
  );
};
