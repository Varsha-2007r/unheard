import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  PlusCircle, 
  Sparkles, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const Navbar: React.FC = () => {
  const { 
    setIsLiveDemoOpen, 
    user, 
    logout 
  } = useIntelligence();

  const navigate = useNavigate();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Report', path: '/report' },
    { label: 'Intelligence', path: '/intelligence' },
    { label: 'Map', path: '/map' },
    { label: 'Silence Index', path: '/silence-index' },
    { label: 'Pipeline', path: '/pipeline' },
    { label: 'Tracking', path: '/tracking' },
    { label: 'Governance', path: '/governance' },
    { label: 'Tutorial', path: '/tutorial' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-[#D9E2F0] backdrop-blur-md transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Animated Waveform-to-Ripple */}
        <Link 
          to="/home"
          className="flex items-center space-x-3.5 group select-none py-2 shrink-0"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          {/* Animated Logo Icon in Royal Blue */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB]/10 via-[#60A5FA]/15 to-[#DBEAFE]/30 border border-[#2563EB]/25 p-2 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-[#2563EB] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.25)]">
            
            {/* Waveform */}
            <div className={`flex items-center space-x-1 transition-all duration-500 ${isLogoHovered ? 'opacity-0 scale-50 absolute' : 'opacity-100 scale-100'}`}>
              <div className="w-1 bg-[#2563EB] rounded-full wave-bar-1"></div>
              <div className="w-1 bg-[#1D4ED8] rounded-full wave-bar-2"></div>
              <div className="w-1 bg-[#60A5FA] rounded-full wave-bar-3"></div>
              <div className="w-1 bg-[#1D4ED8] rounded-full wave-bar-4"></div>
              <div className="w-1 bg-[#2563EB] rounded-full wave-bar-5"></div>
            </div>

            {/* Concentric Ripple Nodes */}
            <div className={`transition-all duration-500 flex items-center justify-center ${isLogoHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45 absolute'}`}>
              <div className="relative w-7 h-7">
                <span className="absolute inset-0 rounded-full border border-[#60A5FA] animate-ping opacity-60"></span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#2563EB]"></span>
                <span className="absolute inset-1 rounded-full border border-[#2563EB]"></span>
              </div>
            </div>
          </div>

          {/* Logo Typography: UNHEARD / SOCIAL PROBLEM INTELLIGENCE */}
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-tight text-[#0F172A] leading-none">
              UNHEARD
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#64748B] uppercase font-bold mt-1">
              SOCIAL PROBLEM INTELLIGENCE
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop Routes) */}
        <div className="hidden lg:flex items-center space-x-0.5 bg-[#EEF3FA] p-1.5 rounded-full border border-[#D9E2F0]">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? 'bg-white text-[#2563EB] shadow-xs font-bold'
                    : 'text-[#64748B] hover:text-[#2563EB] hover:bg-white/60'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right CTA Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-2.5 shrink-0">
          
          {/* Simulate Now Button */}
          <button
            onClick={() => setIsLiveDemoOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-[#1D4ED8] bg-[#DBEAFE] hover:bg-[#BFDBFE] border border-[#BFDBFE] transition-all flex items-center space-x-1.5 shadow-xs"
            title="Launch 12s Autonomous Demo Simulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Simulate Now</span>
          </button>

          {/* Submit Input Button */}
          <Link
            to="/report"
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all flex items-center space-x-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit Input</span>
          </Link>

          {/* User Account / Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 rounded-xl bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-[#0F172A] flex items-center space-x-1.5 transition-all text-xs font-mono font-semibold"
            >
              <User className="w-4 h-4 text-[#2563EB]" />
              <span className="hidden xl:inline max-w-[100px] truncate">{user?.name || 'Account'}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#D9E2F0] shadow-xl py-2 font-mono text-xs z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-[#D9E2F0]">
                  <div className="font-bold text-[#0F172A] truncate">{user?.name || 'Guest Explorer'}</div>
                  <div className="text-[10px] text-[#64748B] truncate">{user?.email || 'guest@unheard.community'}</div>
                </div>
                <Link
                  to="/tracking"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EEF3FA] text-[#0F172A]"
                >
                  My Contributions
                </Link>
                <Link
                  to="/tutorial"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EEF3FA] text-[#0F172A]"
                >
                  Interactive Tutorial
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-[#D9E2F0] flex items-center space-x-1.5 mt-1 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#EEF3FA] text-[#0F172A] hover:bg-[#DBEAFE] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D9E2F0] px-5 py-6 space-y-4 font-mono text-xs shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-3 rounded-xl border transition-all text-center ${
                    isActive
                      ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold'
                      : 'bg-[#F8FAFC] text-[#0F172A] border-[#D9E2F0]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-[#D9E2F0] space-y-2">
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#2563EB] text-white font-bold flex items-center justify-center space-x-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>REPORT A PROBLEM</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLiveDemoOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] font-bold flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>SIMULATE NOW</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
