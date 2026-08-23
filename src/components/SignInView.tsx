import React, { useState, useEffect } from 'react';
import { SpideyBotFace } from './SpideyHostBot';
import { spideyVoice } from '../utils/spideyVoice';

// Authorized administrator email address for FINNA prototype access
// Modify this single variable to change the allowed administrator email
export const AUTHORIZED_EMAIL = 'ravindran.aswin2007@gmail.com';

interface SignInViewProps {
  onSignInSuccess: (email: string) => void;
  onOpenHowItWorks?: () => void;
  onOpenAbout?: () => void;
}

export const SignInView: React.FC<SignInViewProps> = ({
  onSignInSuccess,
  onOpenHowItWorks,
  onOpenAbout,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [errorState, setErrorState] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    return spideyVoice.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(false);
    setIsSubmitting(true);

    const cleanInput = emailInput.trim().toLowerCase();
    const authorized = AUTHORIZED_EMAIL.trim().toLowerCase();

    setTimeout(() => {
      setIsSubmitting(false);
      if (cleanInput === authorized) {
        onSignInSuccess(cleanInput);
      } else {
        setErrorState(true);
        // Host Spidey speaks and animates access denied message
        spideyVoice.speakAccessDenied();
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb]/80 text-[#09090b] flex flex-col font-sans selection:bg-[#4f46e5] selection:text-white relative">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#e4e4e7] w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-3.5 max-w-[1280px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#09090b]">
              troubleshoot
            </span>
            <span className="font-heading text-[1.25rem] font-bold text-[#09090b] tracking-tight">
              FINNA
            </span>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-6 md:gap-8">
            {onOpenHowItWorks && (
              <button
                type="button"
                onClick={onOpenHowItWorks}
                className="text-[#52525b] hover:text-[#4f46e5] transition-colors duration-200 text-xs font-semibold uppercase tracking-wider font-heading cursor-pointer"
              >
                How it works
              </button>
            )}
            {onOpenAbout && (
              <button
                type="button"
                onClick={onOpenAbout}
                className="text-[#52525b] hover:text-[#4f46e5] transition-colors duration-200 text-xs font-semibold uppercase tracking-wider font-heading cursor-pointer"
              >
                About
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Sign In Form */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-[1280px] mx-auto w-full relative z-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-[#e4e4e7] rounded-2xl p-8 sm:p-10 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] mb-4 text-[#09090b]">
              <span className="material-symbols-outlined text-[24px]">lock_person</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight mb-2">
              FINNA
            </h1>
            <p className="font-body text-sm text-[#71717a]">
              Sign in to continue
            </p>
          </div>

          {/* Error Message Box with Animated Spidey Host */}
          {errorState && (
            <div className="mb-6 p-4 rounded-xl bg-red-50/95 border border-red-200 text-red-900 shadow-sm animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-100/90 border border-red-200 shrink-0 text-red-700 flex flex-col items-center gap-1">
                  <SpideyBotFace size={24} isSpeaking={isSpeaking} className="text-red-700" />
                  {isSpeaking && (
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-left flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading text-sm font-bold text-red-950 flex items-center gap-1.5">
                      <span>Access Denied</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                        Host Spidey
                      </span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => spideyVoice.speakAccessDenied()}
                      className="text-xs text-red-700 hover:text-red-900 font-medium underline flex items-center gap-1 cursor-pointer"
                      title="Replay Spidey's voice message"
                    >
                      <span className="material-symbols-outlined text-[14px]">volume_up</span>
                      <span>Hear Host</span>
                    </button>
                  </div>
                  <p className="font-body text-xs text-red-900 leading-relaxed font-semibold">
                    Sorry, your access is denied by the host.
                  </p>
                  <p className="font-body text-xs text-red-700 leading-relaxed font-medium">
                    Please get the valid email from the host.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-heading text-xs font-semibold uppercase tracking-wider text-[#09090b] mb-2 text-left"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (errorState) setErrorState(false);
                  }}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 bg-white border border-[#e4e4e7] rounded-xl text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all shadow-2xs font-body"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !emailInput.trim()}
              className="w-full py-3 px-5 bg-[#09090b] hover:bg-[#27272a] disabled:bg-[#a1a1aa] text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-[#f4f4f5] text-center">
            <p className="font-body text-xs text-[#71717a] flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#a1a1aa]">
                verified_user
              </span>
              <span>Prototype Access Gate • Authorized credentials required</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e4e4e7] w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-6 max-w-[1280px] mx-auto gap-4">
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
          <div className="flex items-center gap-6 text-xs text-[#71717a] font-body">
            <span>Confidential Demo Evaluation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
