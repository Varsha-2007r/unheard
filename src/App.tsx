import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { IntelligenceProvider, useIntelligence } from './context/IntelligenceContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LiveDemoModal } from './components/LiveDemoModal';

// Dedicated Route Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ReportPage } from './pages/ReportPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { MapPage } from './pages/MapPage';
import { SilenceIndexPage } from './pages/SilenceIndexPage';
import { PipelinePage } from './pages/PipelinePage';
import { TrackingPage } from './pages/TrackingPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { GovernancePage } from './pages/GovernancePage';
import { TutorialPage } from './pages/TutorialPage';

const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useIntelligence();
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0F172A] selection:bg-blue-500/20 selection:text-blue-700 flex flex-col justify-between">
      {!isAuthRoute && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAuthRoute && <Footer />}
      <LiveDemoModal />
    </div>
  );
};

export const AppContent: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Root Redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Primary Command Center Home */}
          <Route path="/home" element={<HomePage />} />

          {/* Dedicated Reporting Wizard Page (Guarded) */}
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />

          {/* Dedicated AI Pattern Intelligence Page */}
          <Route path="/intelligence" element={<IntelligencePage />} />

          {/* Dedicated Interactive Social Impact Map Page */}
          <Route path="/map" element={<MapPage />} />

          {/* Dedicated Silence Index Gap Model Page */}
          <Route path="/silence-index" element={<SilenceIndexPage />} />

          {/* Dedicated AI Pattern Detection Pipeline Page */}
          <Route path="/pipeline" element={<PipelinePage />} />

          {/* Dedicated Personal Tracking List Page (Guarded) */}
          <Route
            path="/tracking"
            element={
              <ProtectedRoute>
                <TrackingPage />
              </ProtectedRoute>
            }
          />

          {/* Dedicated Problem Detail & 7-Stage Resolution Page (Guarded) */}
          <Route
            path="/tracking/:id"
            element={
              <ProtectedRoute>
                <ProblemDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Dedicated Governance & Ethical AI Page */}
          <Route path="/governance" element={<GovernancePage />} />

          {/* Dedicated Interactive Tutorial Page */}
          <Route path="/tutorial" element={<TutorialPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <IntelligenceProvider>
        <AppContent />
      </IntelligenceProvider>
    </ErrorBoundary>
  );
};

export default App;
