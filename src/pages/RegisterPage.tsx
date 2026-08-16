import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, UserCheck, AlertCircle } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const RegisterPage: React.FC = () => {
  const { register, loginAsGuest } = useIntelligence();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/home', { replace: true });
    } catch {
      setError('Registration could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-br from-[#DBEAFE]/70 via-[#60A5FA]/20 to-transparent blur-[100px] pointer-events-none rounded-full" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center shadow-sm">
            <span className="font-display font-black text-2xl text-[#2563EB]">U</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-3xl tracking-tight text-[#0F172A] leading-none">
              UNHEARD
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#64748B] uppercase font-bold mt-1.5">
              SOCIAL PROBLEM INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-1 pt-2">
          <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[#0F172A] tracking-tight">
            CREATE YOUR ANONYMOUS ACCOUNT
          </h1>
          <p className="text-xs text-[#64748B] font-sans">
            Join the collective intelligence network. Your identity is always protected by default.
          </p>
        </div>

      </div>

      {/* Registration Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#D9E2F0] rounded-3xl shadow-xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-[#EF4444] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>FULL NAME / PSEUDONYM</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>EMAIL ADDRESS</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@community.org"
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <span>PASSWORD</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <span>CONFIRM PASSWORD</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Create Account Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? <span>CREATING ACCOUNT...</span> : <span>CREATE ACCOUNT →</span>}
              </button>
            </div>

          </form>

          {/* Links */}
          <div className="text-center pt-2 text-xs font-mono">
            <span className="text-[#64748B]">Already have an account? </span>
            <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
