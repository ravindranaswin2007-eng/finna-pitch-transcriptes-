import React, { useState } from 'react';
import { PitchAnalysisResult } from './types/pitch';
import { LandingHeroView } from './components/LandingHeroView';
import { UploadAndAnalysisView } from './components/UploadAndAnalysisView';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { ScorecardView } from './components/ScorecardView';
import { PitchStructureView } from './components/PitchStructureView';
import { ClaimsAuditView } from './components/ClaimsAuditView';
import { VcPillarsView } from './components/VcPillarsView';
import { RedFlagsView } from './components/RedFlagsView';
import { TopFixesView } from './components/TopFixesView';
import { TranscriptView } from './components/TranscriptView';
import { JurySparring } from './components/JurySparring';
import { PdfReportCard } from './components/PdfReportCard';
import { PitchAnalyzerModal } from './components/PitchAnalyzerModal';

type AppScreen = 'landing' | 'upload' | 'dashboard';
type DashboardTab =
  | 'overview'
  | 'scorecard'
  | 'sparring'
  | 'red-flags'
  | 'top-fixes'
  | 'structure'
  | 'claims'
  | 'vc-pillars'
  | 'transcript'
  | 'pdf-report';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [activePitchKey, setActivePitchKey] = useState<string | null>(null);
  const [analyzedPitches, setAnalyzedPitches] = useState<Record<string, PitchAnalysisResult>>({});
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [activeSparringPersonaId, setActiveSparringPersonaId] = useState<string>('vc');
  const [isAnalyzerModalOpen, setIsAnalyzerModalOpen] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Active pitch data (null until first pitch is analyzed)
  const activePitchData: PitchAnalysisResult | null =
    activePitchKey && analyzedPitches[activePitchKey]
      ? analyzedPitches[activePitchKey]
      : Object.values(analyzedPitches)[0] || null;

  const handleAnalysisComplete = (newPitchResult: PitchAnalysisResult) => {
    const key = `pitch_${Date.now()}`;
    setAnalyzedPitches((prev) => ({
      ...prev,
      [key]: newPitchResult,
    }));
    setActivePitchKey(key);
    setActiveTab('overview');
    setCurrentScreen('dashboard');
  };

  const handleShareReport = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // 1. Landing Screen (Starts in clean state)
  if (currentScreen === 'landing') {
    return (
      <LandingHeroView
        onStartUpload={() => setCurrentScreen('upload')}
        onTryDemo={() => setCurrentScreen('upload')}
        onNavigateToHowItWorks={() => setCurrentScreen('upload')}
        onNavigateToAbout={() => setCurrentScreen('upload')}
      />
    );
  }

  // 2. Upload / Processing Timeline Screen
  if (currentScreen === 'upload') {
    return (
      <UploadAndAnalysisView
        onBackToHome={() => setCurrentScreen('landing')}
        onAnalysisComplete={handleAnalysisComplete}
      />
    );
  }

  // 3. If dashboard is visited without any analyzed pitch data, redirect to upload
  if (!activePitchData) {
    return (
      <UploadAndAnalysisView
        onBackToHome={() => setCurrentScreen('landing')}
        onAnalysisComplete={handleAnalysisComplete}
      />
    );
  }

  // 4. Dashboard Screen with Generated FINNA Pitch Report
  const tabs: { id: DashboardTab; label: string; icon?: string; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'scorecard', label: '17-Category Scorecard', icon: 'fact_check' },
    { id: 'sparring', label: 'Jury Sparring', icon: 'gavel', badge: 'Live AI' },
    { id: 'red-flags', label: 'Red Flags', icon: 'warning' },
    { id: 'top-fixes', label: 'Top Fixes & Q&A', icon: 'auto_fix_high' },
    { id: 'structure', label: 'Pitch Structure', icon: 'view_timeline' },
    { id: 'claims', label: 'Claims Audit', icon: 'verified' },
    { id: 'vc-pillars', label: 'VC Pillars', icon: 'account_tree' },
    { id: 'transcript', label: 'Transcript', icon: 'subtitles' },
    { id: 'pdf-report', label: 'PDF Dossier', icon: 'description' }
  ];

  const scoreTen =
    activePitchData.overallScore10 ||
    (activePitchData.overallScore > 10
      ? (activePitchData.overallScore / 10).toFixed(1)
      : activePitchData.overallScore) ||
    7.8;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a] flex flex-col font-sans selection:bg-[#4f46e5] selection:text-white">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#e4e4e7] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between gap-4">
          {/* Back & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('landing')}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#52525b] hover:text-[#0a0a0a] px-3 py-1.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] transition-all font-heading cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Home</span>
            </button>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentScreen('landing')}
            >
              <span className="material-symbols-outlined text-[24px] text-[#0a0a0a]">
                troubleshoot
              </span>
              <span className="font-heading text-[1.25rem] font-bold text-[#0a0a0a] tracking-tight">
                FINNA
              </span>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            {Object.keys(analyzedPitches).length > 1 && (
              <div className="hidden sm:block">
                <select
                  value={activePitchKey || ''}
                  onChange={(e) => {
                    setActivePitchKey(e.target.value);
                    setActiveTab('overview');
                  }}
                  className="px-3 py-1.5 text-xs bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] font-medium focus:outline-none focus:border-[#4f46e5] cursor-pointer"
                >
                  {(Object.entries(analyzedPitches) as [string, PitchAnalysisResult][]).map(([k, p]) => (
                    <option key={k} value={k}>
                      {p.metadata.startupName} ({p.metadata.sector})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setActiveTab('pdf-report')}
              className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] bg-white border border-[#e4e4e7] hover:bg-[#f4f4f5] px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-heading shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span className="hidden md:inline">Export PDF</span>
            </button>

            <button
              onClick={handleShareReport}
              className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] bg-white border border-[#e4e4e7] hover:bg-[#f4f4f5] px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-heading shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              onClick={() => setIsAnalyzerModalOpen(true)}
              className="text-xs font-semibold uppercase tracking-wider text-white bg-[#0a0a0a] hover:bg-[#27272a] px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-heading shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Pitch</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-[#e4e4e7] bg-white">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#0a0a0a] text-white shadow-sm'
                      : 'text-[#52525b] hover:text-[#0a0a0a] hover:bg-[#f4f4f5]'
                  }`}
                >
                  {tab.icon && (
                    <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                  )}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        isActive ? 'bg-[#4f46e5] text-white' : 'bg-[#e0e7ff] text-[#4338ca]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero Summary Header */}
      <section className="bg-white border-b border-[#e4e4e7] py-10 md:py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Left Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] text-[11px] font-semibold text-[#0a0a0a] tracking-wider uppercase font-heading">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  FINNA EVALUATION READY
                </span>
                <span className="font-heading text-xs text-[#71717a] font-medium">
                  Report ID: {activePitchData.metadata.reportId || '#PI-FINNA'}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-[44px] font-medium text-[#0a0a0a] tracking-tight leading-tight">
                {activePitchData.metadata.startupName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#52525b] font-body">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#71717a]">
                    category
                  </span>
                  {activePitchData.metadata.sector}
                </span>
                <span className="text-[#d4d4d8]">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#71717a]">
                    schedule
                  </span>
                  {activePitchData.metadata.stage || 'Seed / Series A'}
                </span>
                <span className="text-[#d4d4d8]">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#71717a]">
                    timer
                  </span>
                  {activePitchData.metadata.videoDuration || '~11 min'} Video Audit
                </span>
              </div>
            </div>

            {/* Right Score Gauge Card */}
            <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-2xl p-6 flex items-center gap-6 shadow-sm self-stretch md:self-auto min-w-[300px]">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#e4e4e7]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#4f46e5]"
                    strokeDasharray={`${activePitchData.metadata.overallScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-heading text-xl font-bold text-[#0a0a0a] leading-none">
                    {scoreTen}
                  </span>
                  <span className="text-[9px] text-[#71717a] uppercase font-semibold">/10</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xs font-semibold text-[#0a0a0a] uppercase tracking-wider">
                    PITCH SCORE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider font-heading">
                    ✔ High Confidence
                  </span>
                </div>
                <div className="font-heading text-sm font-semibold text-[#0a0a0a]">
                  {activePitchData.metadata.verdictLabel || 'EVALUATED'}
                </div>
                <p className="font-body text-[11px] text-[#71717a]">
                  Full audio, video & body language audit complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content Area */}
      <main className="max-w-[1280px] w-full mx-auto px-6 md:px-12 py-12 flex-grow">
        {activeTab === 'overview' && (
          <ExecutiveSummaryView
            pitchData={activePitchData}
            onOpenPdfReport={() => setActiveTab('pdf-report')}
            onOpenSparring={() => setActiveTab('sparring')}
            onSelectPersona={(personaId) => {
              setActiveSparringPersonaId(personaId);
              setActiveTab('sparring');
            }}
          />
        )}

        {activeTab === 'scorecard' && <ScorecardView pitchData={activePitchData} />}

        {activeTab === 'sparring' && (
          <JurySparring
            pitchData={activePitchData}
            initialPersonaId={activeSparringPersonaId}
          />
        )}

        {activeTab === 'red-flags' && <RedFlagsView pitchData={activePitchData} />}

        {activeTab === 'top-fixes' && <TopFixesView pitchData={activePitchData} />}

        {activeTab === 'structure' && <PitchStructureView pitchData={activePitchData} />}

        {activeTab === 'claims' && <ClaimsAuditView pitchData={activePitchData} />}

        {activeTab === 'vc-pillars' && <VcPillarsView pitchData={activePitchData} />}

        {activeTab === 'transcript' && <TranscriptView pitchData={activePitchData} />}

        {activeTab === 'pdf-report' && (
          <PdfReportCard
            analysisData={activePitchData}
            onClose={() => setActiveTab('overview')}
          />
        )}
      </main>

      {/* Modal for Analyzing Any New Startup Pitch */}
      <PitchAnalyzerModal
        isOpen={isAnalyzerModalOpen}
        onClose={() => setIsAnalyzerModalOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />

      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a] text-white px-5 py-3 rounded-xl shadow-xl border border-[#27272a] text-xs font-heading font-semibold flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>Report link copied to clipboard!</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#e4e4e7] w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-8 max-w-[1280px] mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">
              FINNA
            </span>
            <p className="font-body text-xs text-[#71717a]">
              © 2026 FINNA. All data is processed temporarily for evaluation purposes.
            </p>
            <p className="font-body text-xs text-[#71717a]">
              Built &amp; Developed by Aswin &nbsp;R. &nbsp; | &nbsp;{' '}
              <a
                href="mailto:ravindran.aswin2007@gmail.com"
                className="text-[#4f46e5] hover:underline"
              >
                ravindran.aswin2007@gmail.com
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#71717a] font-body">
            <span
              onClick={() => setCurrentScreen('landing')}
              className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
            >
              Home
            </span>
            <span
              onClick={() => setCurrentScreen('upload')}
              className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
            >
              Evaluate Pitch
            </span>
            <span
              onClick={() => setActiveTab('pdf-report')}
              className="hover:text-[#0a0a0a] transition-colors cursor-pointer"
            >
              Export PDF
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
