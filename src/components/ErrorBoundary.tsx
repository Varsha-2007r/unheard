import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UNHEARD Application Render Error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-6 text-[#0F172A]">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-[#D9E2F0] shadow-xl text-center space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] text-[#2563EB] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-xl font-display font-bold text-[#0F172A]">
                Application Restoring
              </h2>
              <p className="text-xs text-[#64748B] font-sans">
                A localized data schema conflict was detected and prevented from halting the platform.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RELOAD WITH CLEAN STATE</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
