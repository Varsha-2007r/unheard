import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, UserCheck, AlertCircle } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const LoginPage: React.FC = () => {
  const { login, loginAsGuest } = useIntelligence();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/home';

  const [email, setEmail] = useState('citizen@unheard.community');
  const [password, setPassword] = useState('demo-password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError('Invalid login credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Blue Glow Background Elements */}
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
            “YOUR EXPERIENCE CAN REVEAL A PATTERN.”
          </h1>
          <p className="text-xs text-[#64748B] font-sans">
            Sign in to submit experiences, monitor emerging community signals, and track verified resolutions.
          </p>
        </div>

      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#D9E2F0] rounded-3xl shadow-xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-[#EF4444] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
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
                placeholder="citizen@unheard.community"
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>PASSWORD</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-mono text-[#2563EB] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>LOGIN →</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D9E2F0]" />
            </div>
            <div className="relative flex justify-center text-xs font-mono uppercase">
              <span className="bg-white px-2 text-[#64748B]">OR</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 font-mono text-xs">
            
            {/* Create Account Button */}
            <Link
              to="/register"
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#2563EB] text-[#0F172A] font-bold text-center block transition-all shadow-sm"
            >
              CREATE ACCOUNT
            </Link>

            {/* Continue as Guest Button */}
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-3 px-4 rounded-xl bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-[#2563EB] font-bold transition-all flex items-center justify-center space-x-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>CONTINUE AS GUEST</span>
            </button>

          </div>

          {/* Privacy Footnote */}
          <div className="pt-2 flex items-center justify-center space-x-1.5 text-[11px] font-mono text-[#64748B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Zero-PII Privacy Protection Layer Active</span>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9E2F0] shadow-2xl max-w-sm w-full space-y-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] text-[#2563EB] mx-auto flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-[#0F172A]">
              Prototype Password Reset
            </h3>
            <p className="text-xs text-[#64748B] font-sans">
              In this prototype environment, you can sign in with any email and password or use the <strong>Continue as Guest</strong> mode directly.
            </p>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] text-white font-mono text-xs font-bold"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
