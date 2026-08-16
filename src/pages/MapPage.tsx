import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Filter, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Info, 
  Radio, 
  Sparkles,
  SlidersHorizontal,
  Compass,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { ZoneGeoData, CategoryType, TimeWindow, ZoneId, SignalIntensity } from '../types';

export const MapPage: React.FC = () => {
  const { 
    zones, 
    selectedZoneId, 
    setSelectedZoneId, 
    patterns, 
    recentlyPulsedZoneId,
    latestSubmissionImpact 
  } = useIntelligence();

  // Filter State
  const [mapCategory, setMapCategory] = useState<string>('All');
  const [mapTime, setMapTime] = useState<string>('All');
  const [mapIntensity, setMapIntensity] = useState<string>('All');

  // Currently inspected zone
  const activeZone: ZoneGeoData = zones.find(z => z.id === selectedZoneId) || zones[1] || zones[0];
  const activePattern = patterns.find(p => (p.primaryZones || []).includes(activeZone.id)) || patterns[0];

  const categories = ['All', 'Transport', 'Safety', 'Accessibility', 'Food', 'Infrastructure', 'Education', 'Healthcare'];
  const times = ['All', 'Morning', 'Afternoon', 'Evening', 'Night'];
  const intensities = ['All', 'LOW', 'MODERATE', 'HIGH', 'EMERGING'];

  const getIntensityBadgeClass = (intensity: SignalIntensity) => {
    switch (intensity) {
      case 'EMERGING':
        return 'bg-red-50 text-[#EF4444] border-red-200 animate-pulse';
      case 'HIGH':
        return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]';
      case 'MODERATE':
        return 'bg-[#EEF3FA] text-[#2563EB] border-[#D9E2F0]';
      case 'LOW':
      default:
        return 'bg-[#F8FAFC] text-[#64748B] border-[#D9E2F0]';
    }
  };

  const getCentroidClass = (zone: ZoneGeoData, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-[#2563EB] text-white border-white scale-125 shadow-lg';
    }
    switch (zone.intensityLevel) {
      case 'EMERGING':
        return 'bg-[#EF4444] border-white text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-110';
      case 'HIGH':
        return 'bg-[#1D4ED8] border-white text-white shadow-[0_0_15px_rgba(29,78,216,0.3)]';
      case 'MODERATE':
        return 'bg-[#2563EB] border-white text-white shadow-[0_0_12px_rgba(37,99,235,0.25)]';
      case 'LOW':
      default:
        return 'bg-[#94A3B8] border-white text-white';
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#D9E2F0]">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>DYNAMIC SPATIAL SIGNAL INTENSITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            WHERE SILENCE IS CONCENTRATED
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl font-sans">
            Signals escalate dynamically in real-time as more citizens share experiences across aggregated sectors. Zero exact GPS coordinates are ever exposed.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-xs font-mono px-3.5 py-2 rounded-xl bg-white border border-[#D9E2F0] text-[#1D4ED8] flex items-center gap-1.5 font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Zero-GPS Redaction Guarantee</span>
          </span>
        </div>
      </div>

      {/* Live Notification: Signal Growing Alert */}
      {recentlyPulsedZoneId && latestSubmissionImpact && (
        <div className="p-4 rounded-2xl bg-white border border-[#2563EB] shadow-md flex items-center justify-between font-mono text-xs animate-fadeIn">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
            </span>
            <div>
              <span className="text-[#2563EB] font-bold uppercase">SIGNAL GROWING: </span>
              <span className="text-[#0F172A]">More experiences reported in {latestSubmissionImpact.zoneCode} ({latestSubmissionImpact.zoneName}).</span>
              <span className="text-[#64748B] block text-[10px] mt-0.5">
                Volume updated: {latestSubmissionImpact.beforeCount} → {latestSubmissionImpact.afterCount} experiences (+31% velocity surge)
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded bg-[#DBEAFE] text-[#1D4ED8] font-bold hidden sm:inline">
            ZONE INTENSITY SURGING
          </span>
        </div>
      )}

      {/* Filter Control Bar in Pure White */}
      <div className="p-4 rounded-3xl bg-white border border-[#D9E2F0] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-[#64748B] font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>MAP FILTERS:</span>
          </div>

          <select
            value={mapCategory}
            onChange={(e) => setMapCategory(e.target.value)}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#2563EB]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
            ))}
          </select>

          <select
            value={mapTime}
            onChange={(e) => setMapTime(e.target.value)}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#2563EB]"
          >
            {times.map((t) => (
              <option key={t} value={t}>{t === 'All' ? 'All Times' : t}</option>
            ))}
          </select>

          <select
            value={mapIntensity}
            onChange={(e) => setMapIntensity(e.target.value)}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] text-xs font-mono focus:outline-none focus:border-[#2563EB]"
          >
            {intensities.map((i) => (
              <option key={i} value={i}>{i === 'All' ? 'All Intensities' : `${i} Intensity`}</option>
            ))}
          </select>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[11px] font-mono text-[#64748B]">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span>
            <span>LOW</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
            <span>MODERATE</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
            <span>HIGH</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-ping"></span>
            <span className="text-[#EF4444] font-bold">EMERGING</span>
          </div>
        </div>
      </div>

      {/* Main Vector Map & Dossier Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Vector Map GIS Viewport in Pure White */}
        <div className="lg:col-span-7 bg-white border border-[#D9E2F0] rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0]">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0F172A]">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span>AGGREGATED VECTOR GIS MESH</span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">8 MONITORED SECTORS</span>
          </div>

          {/* Interactive Map Canvas Grid */}
          <div className="relative w-full h-[420px] rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] overflow-hidden cyber-grid-bg">
            
            {/* Ambient Vector Concentric Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-96 h-96 rounded-full border border-[#BFDBFE]" />
              <div className="w-64 h-64 rounded-full border border-[#BFDBFE]" />
              <div className="w-32 h-32 rounded-full border border-[#BFDBFE]" />
            </div>

            {/* Render 8 Aggregated Zone Centroids */}
            {zones.map((zone) => {
              const isSelected = selectedZoneId === zone.id;
              const isPulsing = recentlyPulsedZoneId === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Surging Ripple Animation */}
                  {(isPulsing || zone.intensityLevel === 'EMERGING') && (
                    <span className="animate-ping absolute -inset-2.5 rounded-full bg-[#2563EB] opacity-60 pointer-events-none"></span>
                  )}

                  {/* Centroid Node Badge */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold transition-all shadow-md ${getCentroidClass(
                      zone,
                      isSelected
                    )}`}
                  >
                    {zone.code.replace('ZONE ', 'Z')}
                  </div>

                  {/* Hover Tooltip Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 min-w-[140px]">
                    <div className="bg-[#0F172A] text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold shadow-lg text-center">
                      <div>{zone.name}</div>
                      <div className="text-[#60A5FA] text-[9px]">
                        {zone.activeSignalsCount} signals • {zone.intensityLevel}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Watermark Note */}
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#94A3B8] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#D9E2F0]">
              * Aggregated Sector Centroids • No Individual GPS Exposed
            </div>
          </div>

          {/* Zone Quick-Selector Pill Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {zones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZoneId(z.id)}
                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap font-bold ${
                  activeZone.id === z.id
                    ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                    : 'bg-white border-[#D9E2F0] text-[#64748B] hover:text-[#2563EB]'
                }`}
              >
                {z.code}: {z.intensityLevel} ({z.activeSignalsCount})
              </button>
            ))}
          </div>

        </div>

        {/* Right: Social Signal Dossier Panel in Pure White */}
        <div className="lg:col-span-5 bg-white border border-[#D9E2F0] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E2F0]">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-[#2563EB] animate-pulse" />
              <h2 className="text-xs font-mono font-bold uppercase text-[#0F172A] tracking-wider">
                SOCIAL SIGNAL DOSSIER
              </h2>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getIntensityBadgeClass(activeZone.intensityLevel)}`}>
              {activeZone.intensityLevel} INTENSITY
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#2563EB] font-bold uppercase block">
              {activeZone.code} • {activeZone.topCategory}
            </span>
            <h3 className="text-2xl font-bold font-display text-[#0F172A] mt-1">
              {activeZone.name}
            </h3>
            <p className="text-xs text-[#64748B] font-sans mt-1">
              {activeZone.description}
            </p>
          </div>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-3 gap-2.5 text-center font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
              <div className="text-xl font-bold text-[#0F172A]">{activeZone.activeSignalsCount}</div>
              <div className="text-[9px] text-[#64748B] font-semibold mt-0.5">VOICES</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0]">
              <div className="text-xl font-bold text-[#2563EB]">+{activeZone.growthRate}%</div>
              <div className="text-[9px] text-[#64748B] font-semibold mt-0.5">VELOCITY</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE]">
              <div className="text-xl font-bold text-[#1D4ED8]">{activeZone.silenceIndex}%</div>
              <div className="text-[9px] text-[#1D4ED8] font-bold mt-0.5">SILENCE GAP</div>
            </div>
          </div>

          {/* Primary Issue & Suggested Action */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-2 font-mono text-xs">
            <div>
              <span className="text-[#64748B] text-[10px] block font-bold">PRIMARY ISSUE:</span>
              <p className="text-[#0F172A] font-sans text-xs font-semibold mt-0.5">{activeZone.primaryIssue}</p>
            </div>

            <div className="pt-2 border-t border-[#D9E2F0]">
              <span className="text-[#2563EB] text-[10px] block font-bold">AI-SUGGESTED ACTION:</span>
              <p className="text-[#0F172A] font-sans text-xs mt-0.5">
                {activeZone.aiSuggestedActions?.[0] || 'Inspect regional infrastructure links and verify pedestrian accessibility.'}
              </p>
            </div>
          </div>

          {/* Stakeholders & Status */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-[#64748B]">
              <span>ASSIGNED STAKEHOLDER:</span>
              <span className="text-[#0F172A] font-semibold">{activeZone.suggestedStakeholders?.[0] || 'Municipal Infrastructure Division'}</span>
            </div>
            <div className="flex justify-between items-center text-[#64748B]">
              <span>CURRENT STATUS:</span>
              <span className="text-[#1D4ED8] font-bold">{activeZone.lifecycleStatus || 'SIGNAL ROUTED'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
