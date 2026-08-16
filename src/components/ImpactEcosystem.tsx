import React, { useState } from 'react';
import { 
  Building2, 
  HeartHandshake, 
  GraduationCap, 
  Newspaper, 
  Users2, 
  Landmark, 
  Network
} from 'lucide-react';

export const ImpactEcosystem: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('institutions');

  const nodes = [
    {
      id: 'institutions',
      name: 'Institutions & Facility Planners',
      icon: Building2,
      role: 'Resource Optimization',
      color: 'text-[#2563EB]',
      borderColor: 'border-[#2563EB]',
      bgGlow: 'bg-[#DBEAFE]/40',
      delivers: '“Identify recurring infrastructural bottlenecks, allocate maintenance budgets with precision, and track resolution efficacy without wading through unstructured complaints.”'
    },
    {
      id: 'ngos',
      name: 'NGOs & Civic Advocates',
      icon: HeartHandshake,
      role: 'Underserved Advocacy',
      color: 'text-[#1D4ED8]',
      borderColor: 'border-[#1D4ED8]',
      bgGlow: 'bg-[#DBEAFE]/40',
      delivers: '“Discover hidden community needs, quantify invisible populations with the Silence Index, and target interventions where informal barriers are highest.”'
    },
    {
      id: 'researchers',
      name: 'Social Researchers',
      icon: GraduationCap,
      role: 'Quantitative Sociology',
      color: 'text-[#2563EB]',
      borderColor: 'border-[#2563EB]',
      bgGlow: 'bg-[#DBEAFE]/40',
      delivers: '“Analyze aggregated longitudinal social trends, study urban transit friction, and evaluate municipal policy outcomes with privacy-preserving datasets.”'
    },
    {
      id: 'journalists',
      name: 'Investigative Journalists',
      icon: Newspaper,
      role: 'Evidence-Based Reporting',
      color: 'text-[#1D4ED8]',
      borderColor: 'border-[#1D4ED8]',
      bgGlow: 'bg-[#DBEAFE]/40',
      delivers: '“Identify verified patterns and structural failures worth investigating, backed by cluster statistics rather than isolated single-source anecdotes.”'
    },
    {
      id: 'students',
      name: 'Commuters & Residents',
      icon: Users2,
      role: 'Lived Experience Voice',
      color: 'text-[#2563EB]',
      borderColor: 'border-[#2563EB]',
      bgGlow: 'bg-[#DBEAFE]/40',
      delivers: '“Safely share daily friction without fear of personal exposure, watching individual stories coalesce into collective signals that drive tangible change.”'
    },
    {
      id: 'municipalities',
      name: 'Municipal Ward Councils',
      icon: Landmark,
      role: 'Civic Infrastructure',
      color: 'text-[#1D4ED8]',
      borderColor: 'border-[#1D4ED8]',
      bgGlow: 'bg-[#DBEAFE]/40',
      delivers: '“Receive proactive early-warning dossiers on streetlight outages, public transit gaps, and drainage failures before citizen frustration peaks.”'
    }
  ];

  const activeNodeData = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <section className="py-20 relative bg-[#F7F9FC] border-b border-[#D9E2F0] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
            <Network className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>CONNECTED SOCIAL IMPACT NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0F172A] tracking-tight">
            THE UNHEARD ECOSYSTEM
          </h2>

          <p className="text-sm sm:text-base text-[#64748B]">
            A symbiotic data network connecting citizens who experience friction with the stakeholders who have the mandate to resolve it.
          </p>
        </div>

        {/* Connected Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Node Map */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {nodes.map((n) => {
              const Icon = n.icon;
              const isSelected = selectedNode === n.id;

              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#DBEAFE]/30 shadow-md scale-102 ring-1 ring-[#2563EB]'
                      : 'border-[#D9E2F0] bg-white hover:border-[#BFDBFE] hover:bg-[#F8FAFC]'
                  } flex flex-col justify-between space-y-3 min-h-[140px]`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-[#EEF3FA] border border-[#D9E2F0] ${n.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping"></span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold font-display text-[#0F172A]">
                      {n.name}
                    </h3>
                    <div className="text-[10px] font-mono text-[#64748B] mt-0.5 font-semibold">
                      {n.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Stakeholder Value Delivery Card in Pure White */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-white border border-[#D9E2F0] shadow-md space-y-5">
            <div className="flex items-center space-x-3 pb-3 border-b border-[#D9E2F0] font-mono text-xs">
              <div className={`p-2.5 rounded-xl bg-[#EEF3FA] border border-[#D9E2F0] ${activeNodeData.color}`}>
                <activeNodeData.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[#0F172A] font-bold text-sm">{activeNodeData.name}</div>
                <div className="text-[#2563EB] text-[10px] uppercase font-bold">{activeNodeData.role}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] font-bold">
                WHAT UNHEARD DELIVERS:
              </span>
              <blockquote className="text-sm sm:text-base text-[#0F172A] italic leading-relaxed border-l-2 border-[#2563EB] pl-3.5 font-sans">
                {activeNodeData.delivers}
              </blockquote>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span>OUTPUT: Structured Consequence Brief</span>
              <span className="text-[#2563EB] font-bold">VERIFIED DISPATCH</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
