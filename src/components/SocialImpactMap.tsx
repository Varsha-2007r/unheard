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
  AlertTriangle
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { ZoneGeoData, CategoryType, TimeWindow, ZoneId, SignalIntensity } from '../types';

export const SocialImpactMap: React.FC = () => {
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
  const activeZone: ZoneGeoData = zones.find(z => z.id === selectedZoneId) || zones[1];
  const activePattern = patterns.find(p => p.primaryZones.includes(activeZone.id)) || patterns[0];

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
    <section id="impact-map" className="py-20 relative bg-[#EEF3FA] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold mb-3">
              <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>DYNAMIC SPATIAL SIGNAL INTENSITY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
              WHERE SILENCE IS CONCENTRATED
            </h2>

            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-2xl">
              Signals escalate in real-time as more citizens share experiences across aggregated sectors. Zero exact GPS coordinates are ever exposed.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono px-3.5 py-2 rounded-xl bg-white border border-[#D9E2F0] text-[#1D4ED8] flex items-center gap-1.5 font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Zero-GPS Redaction Guarantee</span>
            </span>
          </div>
        </div>

        {/* Live Notification: Signal Growing Alert */}
        {recentlyPulsedZoneId && latestSubmissionImpact && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-[#2563EB] shadow-md flex items-center justify-between font-mono text-xs animate-fadeIn">
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
            <span className="px-2.5 py-1 rounded bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-bold shrink-0">
              MAP ESCALATED
            </span>
          </div>
        )}

        {/* Map Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#D9E2F0] shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#64748B] font-semibold">CATEGORY:</span>
              <select
                value={mapCategory}
                onChange={(e) => setMapCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB] font-medium"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#64748B] font-semibold">TIME:</span>
              <select
                value={mapTime}
                onChange={(e) => setMapTime(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB] font-medium"
              >
                {times.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Signal Intensity */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#64748B] font-semibold">INTENSITY:</span>
              <select
                value={mapIntensity}
                onChange={(e) => setMapIntensity(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB] font-medium"
              >
                {intensities.map(i => (
                  <option key={i} value={i}>{i === 'All' ? 'All Intensities' : `${i} Signal`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[11px] text-[#2563EB] font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
            <span>8 AGGREGATED SECTORS ACTIVE</span>
          </div>
        </div>

        {/* Main Map Container & Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Interactive Vector GIS Map Canvas in Pure White */}
          <div className="lg:col-span-8 p-4 sm:p-6 rounded-3xl bg-white border border-[#D9E2F0] relative min-h-[480px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden shadow-md cyber-grid-bg">
            
            {/* Top Status inside Map */}
            <div className="relative z-10 flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-[#D9E2F0] text-xs font-mono shadow-sm">
              <div className="flex items-center space-x-2 text-[#0F172A] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                <span>AGGREGATED VECTOR GIS ENGINE</span>
                <span className="text-[#94A3B8]">|</span>
                <span className="text-[#2563EB]">4-TIER ESCALATION</span>
              </div>
              <span className="text-[10px] text-[#64748B]">PROTOTYPE GEO-MESH</span>
            </div>

            {/* Interactive Centroids & Heat Halos */}
            <div className="relative z-10 w-full h-[360px] sm:h-[420px]">
              {zones.map((zone) => {
                const isSelected = zone.id === activeZone.id;
                const isPulsing = recentlyPulsedZoneId === zone.id;

                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group select-none"
                  >
                    {/* Pulsing Ripple Wave */}
                    {(zone.intensityLevel === 'EMERGING' || zone.intensityLevel === 'HIGH' || isPulsing) && (
                      <span className={`animate-ping absolute inline-flex h-12 w-12 -left-3 -top-3 rounded-full opacity-60 ${
                        zone.intensityLevel === 'EMERGING' ? 'bg-[#EF4444]' : 'bg-[#2563EB]'
                      }`}></span>
                    )}

                    {/* Heat density halo in soft blue */}
                    <div className={`w-16 h-16 -left-5 -top-5 absolute rounded-full blur-md opacity-40 transition-transform group-hover:scale-150 ${
                      zone.intensityLevel === 'EMERGING' ? 'bg-[#EF4444]' : 'bg-[#60A5FA]'
                    }`} />

                    {/* Centroid Pin */}
                    <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono font-bold text-[10px] transition-all duration-300 ${getCentroidClass(zone, isSelected)}`}>
                      {zone.code.slice(-2)}
                    </div>

                    {/* Tooltip on hover */}
                    <div className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-[#D9E2F0] text-[10px] font-mono text-[#0F172A] transition-opacity pointer-events-none z-20 shadow-lg ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className="font-bold text-[#2563EB]">{zone.name}</div>
                      <div className="text-[9px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                        <span className="font-bold text-[#0F172A]">{zone.activeSignalsCount} reports</span>
                        <span>•</span>
                        <span className="font-bold text-[#2563EB]">
                          {zone.intensityLevel} SIGNAL
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Map Bottom Legend */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-[#D9E2F0] text-[10.5px] font-mono shadow-sm">
              <div className="flex items-center space-x-3 text-[#64748B] font-medium">
                <span className="text-[#0F172A] font-bold text-[10px]">SIGNAL TIERS:</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#94A3B8]"></span> &lt;15: LOW</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> 15-40: MODERATE</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1D4ED8]"></span> 41-80: HIGH</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span> 81+: EMERGING</span>
              </div>

              <div className="text-[10px] text-[#2563EB] font-bold">
                Click zone to inspect dossier
              </div>
            </div>

          </div>

          {/* Right: Social Signal Dossier Drawer in Pure White */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-[#D9E2F0] shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Dossier Header */}
              <div className="pb-3 border-b border-[#D9E2F0] flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">
                  SOCIAL SIGNAL DOSSIER
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getIntensityBadgeClass(activeZone.intensityLevel)}`}>
                  {activeZone.intensityLevel} SIGNAL
                </span>
              </div>

              {/* Zone Title */}
              <div>
                <div className="text-xs font-mono text-[#64748B] font-semibold">{activeZone.code}</div>
                <h3 className="text-xl font-bold font-display text-[#0F172A]">
                  {activeZone.name}
                </h3>
                <p className="text-xs font-mono text-[#64748B] mt-1">
                  {activeZone.description}
                </p>
              </div>

              {/* Primary Problem Identified */}
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-xs font-mono space-y-1">
                <span className="text-[#2563EB] font-bold uppercase text-[10px] block">
                  CONCENTRATED SOCIAL PROBLEM:
                </span>
                <p className="text-[#0F172A] font-medium">
                  {activeZone.primaryIssue}
                </p>
              </div>

              {/* 4 Synchronized Metrics */}
              <div className="grid grid-cols-2 gap-2.5 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#0F172A]">
                    {activeZone.activeSignalsCount}
                  </div>
                  <div className="text-[9px] text-[#64748B] font-semibold">RELATED REPORTS</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#2563EB] flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    +{activeZone.growthRate}%
                  </div>
                  <div className="text-[9px] text-[#64748B] font-semibold">SIGNAL VELOCITY</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#1D4ED8]">
                    {activeZone.silenceIndex}%
                  </div>
                  <div className="text-[9px] text-[#64748B] font-semibold">SILENCE GAP</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0]">
                  <div className="text-xl font-bold text-[#2563EB]">
                    ~{activeZone.estimatedUnheard}
                  </div>
                  <div className="text-[9px] text-[#64748B] font-semibold">EST. UNHEARD</div>
                </div>
              </div>

              {/* Possible Causes & AI Actions */}
              {activeZone.aiSuggestedActions && (
                <div className="p-3 rounded-xl bg-[#DBEAFE]/30 border border-[#BFDBFE] space-y-1.5 text-xs font-mono">
                  <span className="text-[10px] text-[#1D4ED8] font-bold uppercase block">
                    AI-SUGGESTED ACTION BRIEF:
                  </span>
                  <p className="text-[#0F172A] text-[11px] font-sans">
                    {activeZone.aiSuggestedActions[0]}
                  </p>
                </div>
              )}

            </div>

            {/* Routing Status & Privacy Guarantee */}
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] text-center font-mono text-[11px] text-[#64748B] space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-[#2563EB] font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{activeZone.lifecycleStatus || 'SIGNAL ROUTED'}</span>
              </div>
              <p className="text-[#94A3B8] text-[10px]">
                “Aggregated to broad sector bounds. Individual GPS coordinates are never stored.”
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
