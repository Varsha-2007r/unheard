import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw, ArrowUp, Sparkles, User, HelpCircle } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const Footer: React.FC = () => {
  const { 
    resetAllDemoData, 
    setIsLiveDemoOpen 
  } = useIntelligence();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#D9E2F0] pt-16 pb-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D9E2F0]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/home" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center">
                <span className="font-display font-black text-lg text-[#2563EB]">U</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tight text-[#0F172A] leading-none">
                  UNHEARD
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#64748B] uppercase font-bold mt-1">
                  SOCIAL PROBLEM INTELLIGENCE
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm font-mono text-[#2563EB] max-w-sm font-bold">
              “One voice can be ignored. A pattern cannot.”
            </p>

            <p className="text-xs text-[#64748B] max-w-sm leading-relaxed font-sans">
              Transforming everyday human experiences into privacy-preserving intelligence signals that reveal hidden societal friction.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EEF3FA] border border-[#D9E2F0] text-[#64748B] text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
              <span>Independent Intelligence Platform</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#0F172A] font-bold uppercase tracking-wider text-[11px]">
              PLATFORM NAVIGATION
            </div>
            <ul className="space-y-2 text-[#64748B]">
              <li>
                <Link to="/home" className="hover:text-[#2563EB] transition-colors">Command Center Home</Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-[#2563EB] transition-colors">Report a Problem</Link>
              </li>
              <li>
                <Link to="/intelligence" className="hover:text-[#2563EB] transition-colors">AI Intelligence Dashboard</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#2563EB] transition-colors">Social Impact Map</Link>
              </li>
              <li>
                <Link to="/silence-index" className="hover:text-[#2563EB] transition-colors">Silence Index Gap Model</Link>
              </li>
              <li>
                <Link to="/pipeline" className="hover:text-[#2563EB] transition-colors">AI Detection Pipeline</Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-[#2563EB] transition-colors">My Unheard Tracking</Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-[#2563EB] transition-colors">Ethics & Governance</Link>
              </li>
              <li>
                <Link to="/tutorial" className="hover:text-[#2563EB] transition-colors">Interactive Tutorial</Link>
              </li>
            </ul>
          </div>

          {/* Demonstration Controls */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <div className="text-[#0F172A] font-bold uppercase tracking-wider text-[11px]">
              SIMULATION CONTROLS
            </div>

            <p className="text-[#64748B] text-[11px]">
              Interactive intelligence tools and live simulation controls.
            </p>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setIsLiveDemoOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold tracking-wider text-xs text-center shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIMULATE NOW (12s DEMO)</span>
              </button>

              <Link
                to="/report"
                className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#2563EB] text-[#0F172A] font-semibold text-xs text-center shadow-xs block"
              >
                Submit Experience
              </Link>

              <button
                onClick={resetAllDemoData}
                className="w-full py-2 px-4 rounded-xl bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-[#64748B] hover:text-[#2563EB] text-xs text-center flex items-center justify-center space-x-1.5 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#64748B] gap-4">
          <div>
            © 2026 UNHEARD • Social Problem Intelligence.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#64748B]">Simulated demonstration dataset.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-[#64748B] hover:text-[#2563EB] transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
