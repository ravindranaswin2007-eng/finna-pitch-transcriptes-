import React from 'react';

interface LandingHeroViewProps {
  onStartUpload: () => void;
  onTryDemo: () => void;
  onNavigateToHowItWorks?: () => void;
  onNavigateToAbout?: () => void;
}

export const LandingHeroView: React.FC<LandingHeroViewProps> = ({
  onStartUpload,
  onTryDemo,
  onNavigateToHowItWorks,
  onNavigateToAbout
}) => {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-[#09090b] flex flex-col font-sans selection:bg-[#4f46e5] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-[#e4e4e7] w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-3.5 max-w-[1280px] mx-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="material-symbols-outlined text-[24px] text-[#09090b]">
              troubleshoot
            </span>
            <span className="font-heading text-[1.25rem] font-bold text-[#09090b] tracking-tight">
              FINNA
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateToHowItWorks}
              className="text-[#52525b] hover:text-[#4f46e5] transition-colors duration-200 text-xs font-semibold uppercase tracking-wider font-heading"
            >
              How it works
            </button>
            <button
              onClick={onNavigateToAbout}
              className="text-[#52525b] hover:text-[#4f46e5] transition-colors duration-200 text-xs font-semibold uppercase tracking-wider font-heading"
            >
              About
            </button>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onStartUpload}
              className="text-xs font-semibold uppercase tracking-wider bg-[#09090b] text-white px-5 py-2 rounded-full hover:bg-[#27272a] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:ring-offset-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24 max-w-[1280px] mx-auto w-full">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          {/* Label Badge */}
          <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f4f5] border border-[#e4e4e7]">
            <span className="material-symbols-outlined text-[14px] text-[#52525b]">
              robot_2
            </span>
            <span className="text-[11px] font-semibold text-[#52525b] tracking-wider uppercase font-heading">
              AI PITCH EVALUATION
            </span>
          </div>

          {/* Headlines */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-[56px] text-[#09090b] font-medium leading-[1.1] tracking-[-0.04em] mb-3 text-balance">
            Put your pitch before the jury.
          </h1>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[32px] text-[#71717a] font-normal leading-[1.3] tracking-[-0.02em] mb-6 text-balance">
            Before the real one.
          </h2>

          {/* Supporting Text */}
          <p className="font-body text-[15px] sm:text-[16px] text-[#52525b] max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Upload your startup or project pitch and receive an investor, product, technical and jury-level evaluation.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onStartUpload}
              className="w-full sm:w-auto bg-[#09090b] text-white font-medium text-[15px] px-8 py-3 rounded-lg hover:bg-[#27272a] transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:ring-offset-2"
            >
              <span className="material-symbols-outlined text-[20px]">
                upload_file
              </span>
              Upload Pitch
            </button>
            <button
              onClick={onTryDemo}
              className="w-full sm:w-auto bg-white text-[#09090b] border border-[#e4e4e7] font-medium text-[15px] px-8 py-3 rounded-lg hover:bg-[#f4f4f5] transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:ring-offset-2"
            >
              <span className="material-symbols-outlined text-[20px]">
                play_circle
              </span>
              Try Demo
            </button>
          </div>
        </section>

        {/* Value Prop Bento 3-Column Cards */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="bg-white border border-[#e4e4e7] rounded-xl p-8 flex flex-col items-start hover:border-[#d4d4d8] transition-all duration-200 group shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#f4f4f5] flex items-center justify-center mb-6 group-hover:bg-[#e4e4e7] transition-colors">
              <span className="material-symbols-outlined text-[#09090b] text-[24px]">
                analytics
              </span>
            </div>
            <h3 className="font-heading text-[20px] font-medium text-[#09090b] mb-2 tracking-[-0.01em]">
              Investor Lens
            </h3>
            <p className="font-body text-[14px] text-[#52525b] leading-relaxed">
              Analyze financial viability, market fit, and scalable revenue models.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#e4e4e7] rounded-xl p-8 flex flex-col items-start hover:border-[#d4d4d8] transition-all duration-200 group shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#f4f4f5] flex items-center justify-center mb-6 group-hover:bg-[#e4e4e7] transition-colors">
              <span className="material-symbols-outlined text-[#09090b] text-[24px]">
                architecture
              </span>
            </div>
            <h3 className="font-heading text-[20px] font-medium text-[#09090b] mb-2 tracking-[-0.01em]">
              Technical Feasibility
            </h3>
            <p className="font-body text-[14px] text-[#52525b] leading-relaxed">
              Evaluate architectural choices, technical debt risks, and execution timelines.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#e4e4e7] rounded-xl p-8 flex flex-col items-start hover:border-[#d4d4d8] transition-all duration-200 group shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-[#f4f4f5] flex items-center justify-center mb-6 group-hover:bg-[#e4e4e7] transition-colors">
              <span className="material-symbols-outlined text-[#09090b] text-[24px]">
                gavel
              </span>
            </div>
            <h3 className="font-heading text-[20px] font-medium text-[#09090b] mb-2 tracking-[-0.01em]">
              Jury Verdict
            </h3>
            <p className="font-body text-[14px] text-[#52525b] leading-relaxed">
              Get a harsh, realistic breakdown of weak points before pitching live.
            </p>
          </div>
        </section>

        {/* Privacy Message Note */}
        <section className="w-full max-w-3xl mx-auto flex items-center justify-center gap-2.5 p-4 bg-[#f4f4f5] border border-[#e4e4e7] rounded-lg text-center">
          <span className="material-symbols-outlined text-[#52525b] text-[18px]">
            shield_lock
          </span>
          <p className="font-body text-[13px] text-[#52525b]">
            Private by design. Your pitch is processed temporarily for analysis and automatically discarded after your report is generated.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e4e4e7] w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-8 max-w-[1280px] mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#09090b]">
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
          <nav className="flex items-center gap-6">
            <span className="font-body text-xs text-[#71717a] hover:text-[#09090b] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-body text-xs text-[#71717a] hover:text-[#09090b] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="font-body text-xs text-[#71717a] hover:text-[#09090b] transition-colors cursor-pointer">
              Data Security
            </span>
          </nav>
        </div>
      </footer>
    </div>
  );
};
