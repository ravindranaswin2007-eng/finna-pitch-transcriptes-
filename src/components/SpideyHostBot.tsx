import React, { useState, useEffect } from 'react';
import { spideyVoice } from '../utils/spideyVoice';

interface SpideyBotFaceProps {
  size?: number;
  isSpeaking?: boolean;
  className?: string;
}

/**
 * Animated SVG Robot Face for Host Spidey with authentic eye blinking animation.
 */
export const SpideyBotFace: React.FC<SpideyBotFaceProps> = ({
  size = 20,
  isSpeaking = false,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform ${isSpeaking ? 'scale-110' : ''} ${className}`}
      aria-label="Host Spidey Bot"
    >
      {/* Robot Antenna */}
      <circle cx="12" cy="3" r="1.25" fill="currentColor" />
      <path d="M12 4.25V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Robot Head Body */}
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity={isSpeaking ? '0.12' : '0.04'}
      />

      {/* Robot Ears */}
      <rect x="2" y="9.5" width="2" height="5" rx="1" fill="currentColor" />
      <rect x="20" y="9.5" width="2" height="5" rx="1" fill="currentColor" />

      {/* Screen area */}
      <rect x="6.5" y="8.5" width="11" height="7" rx="1.75" fill="currentColor" fillOpacity="0.08" />

      {/* Blinking Eyes */}
      <g className="bot-eye-blinking">
        {/* Left Eye */}
        <circle cx="9" cy="11.8" r="1.4" fill="currentColor" />
        {/* Right Eye */}
        <circle cx="15" cy="11.8" r="1.4" fill="currentColor" />
      </g>

      {/* Speaking mouth or smile */}
      {isSpeaking ? (
        <path
          d="M9.5 15.2C10.2 16 13.8 16 14.5 15.2"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      ) : (
        <line x1="10" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      )}
    </svg>
  );
};

interface SpideyBadgeProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * The pill badge shown in the hero and headers with Spidey blinking face.
 */
export const SpideyBadge: React.FC<SpideyBadgeProps> = ({
  label = 'AI PITCH EVALUATION',
  onClick,
  className = '',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return spideyVoice.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      spideyVoice.speakIntroGreeting();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Click to hear Host Spidey guide you"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#e4e4e7] hover:border-[#a1a1aa] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer text-[#09090b] group ${className}`}
    >
      <SpideyBotFace size={18} isSpeaking={isSpeaking} className="text-[#09090b] group-hover:text-[#4f46e5] transition-colors" />
      <span className="text-[11px] font-semibold text-[#52525b] group-hover:text-[#09090b] tracking-wider uppercase font-heading transition-colors">
        {label}
      </span>
      {isSpeaking && (
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4f46e5] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4f46e5]"></span>
        </span>
      )}
    </button>
  );
};

interface SpideyFloatingHostProps {
  currentContext?: string;
  startupName?: string;
}

/**
 * Floating Host Spidey Assistant with live voice guidance, speech bubble, and controls.
 */
export const SpideyFloatingHost: React.FC<SpideyFloatingHostProps> = ({
  currentContext = 'landing',
  startupName = 'FINNA',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(spideyVoice.isEnabled());

  useEffect(() => {
    return spideyVoice.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const handleGuideMe = () => {
    if (currentContext === 'signin') {
      spideyVoice.speak(
        "Welcome to FINNA! Please enter your authorized administrator email address to access the evaluation dashboard."
      );
    } else if (currentContext === 'landing') {
      spideyVoice.speakIntroGreeting();
    } else if (currentContext === 'upload') {
      spideyVoice.speakUploadGuide();
    } else {
      spideyVoice.speakDashboardGuide(startupName);
    }
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = spideyVoice.toggleVoice();
    setIsVoiceOn(newState);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 select-none print-hide font-sans">
      {/* Interactive Host Pill Button - Clean Voice Control */}
      <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-[#e4e4e7] hover:border-[#a1a1aa] p-1.5 pl-3 pr-2 rounded-full shadow-lg transition-all duration-200 group">
        <button
          type="button"
          onClick={handleGuideMe}
          className="flex items-center gap-2 cursor-pointer text-left focus:outline-none"
          title="Click to hear Spidey guide you"
        >
          <SpideyBotFace size={22} isSpeaking={isSpeaking} className="text-[#09090b] group-hover:text-[#4f46e5]" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs text-[#09090b] tracking-tight flex items-center gap-1">
              Host Spidey
              {isSpeaking && (
                <span className="text-[10px] text-[#4f46e5] font-semibold animate-pulse">
                  • Speaking
                </span>
              )}
            </span>
            <span className="font-body text-[10px] text-[#71717a]">
              {isSpeaking ? 'Voice Active' : 'Click to Guide'}
            </span>
          </div>
        </button>

        {/* Quick Voice Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={handleToggleVoice}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ml-1 ${
            isVoiceOn
              ? 'text-[#4f46e5] hover:bg-[#eef2ff]'
              : 'text-[#a1a1aa] hover:text-[#71717a] hover:bg-[#f4f4f5]'
          }`}
          title={isVoiceOn ? 'Voice Guide is On' : 'Voice Guide is Muted'}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isVoiceOn ? 'volume_up' : 'volume_off'}
          </span>
        </button>
      </div>
    </div>
  );
};
