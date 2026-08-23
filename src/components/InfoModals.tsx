import React, { useEffect, useState } from 'react';
import { SpideyBotFace } from './SpideyHostBot';
import { spideyVoice } from '../utils/spideyVoice';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      title: 'Upload Pitch Video or Transcript',
      icon: 'upload_file',
      description:
        'Upload your stage pitch presentation video (MP4/MOV) or paste your pitch transcript. FINNA extracts multimodal audio, visual cues, and presenter timing.',
    },
    {
      step: '02',
      title: 'Multimodal Audio & Speech Audit',
      icon: 'mic',
      description:
        'Audits vocal cadence, speech rate, multilingual vernacular delivery, narrative storytelling transitions, and problem-solution articulation.',
    },
    {
      step: '03',
      title: 'Observable Body Language Audit',
      icon: 'psychology',
      description:
        'Evaluates stage posture, camera eye contact, facial expressions, hand gestures, and co-founder tag-team chemistry during presentation and Q&A.',
    },
    {
      step: '04',
      title: '17-Category Venture Rubric Evaluation',
      icon: 'fact_check',
      description:
        'Deep quantitative assessment across 17 institutional venture pillars including Problem Depth, TAM, Solution Quality, Business Model, Defensibility, and Regulatory Readiness.',
    },
    {
      step: '05',
      title: 'Actionable FINNA Report & Jury Sparring',
      icon: 'assessment',
      description:
        'Generates an institutional 10-point scorecard, top 5 ranked improvements with point impact, claims audit, red flags, and an interactive AI jury sparring simulator.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#e4e4e7] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e4e4e7] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] flex items-center justify-center text-[#09090b]">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#09090b]">
                How FINNA Works
              </h3>
              <p className="font-body text-xs text-[#71717a]">
                End-to-end institutional pitch evaluation & jury intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-4 mb-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-[#e4e4e7] flex items-center justify-center text-[#4f46e5] font-bold text-xs shrink-0 font-heading">
                {item.step}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#09090b]">
                    {item.icon}
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-[#09090b]">
                    {item.title}
                  </h4>
                </div>
                <p className="font-body text-xs text-[#52525b] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#e4e4e7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#09090b] hover:bg-[#27272a] text-white font-medium text-xs rounded-xl transition-all cursor-pointer font-heading uppercase tracking-wider"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow modal entrance transition
      const timer = setTimeout(() => {
        spideyVoice.speakAboutDeveloper();
      }, 350);

      const unsubscribe = spideyVoice.subscribe((speaking) => {
        setIsSpeaking(speaking);
      });

      return () => {
        clearTimeout(timer);
        unsubscribe();
        spideyVoice.stop();
      };
    } else {
      spideyVoice.stop();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#e4e4e7] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e4e4e7] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#09090b]">
                About the Developer
              </h3>
              <p className="font-body text-xs text-[#71717a]">
                Creator &amp; System Architect of FINNA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Spidey Voice Status Indicator */}
        <div className="mb-4 p-2.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-[#e4e4e7] text-[#4f46e5] flex items-center justify-center">
              <SpideyBotFace size={20} isSpeaking={isSpeaking} className="text-[#4f46e5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold font-heading uppercase tracking-wider text-[#09090b] flex items-center gap-1.5">
                <span>Host Spidey Voice</span>
                {isSpeaking && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#4f46e5] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-ping" />
                    Describing...
                  </span>
                )}
              </span>
              <span className="text-[11px] font-body text-[#71717a]">
                {isSpeaking ? 'Narrating developer overview' : 'Voice guide ready'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => spideyVoice.speakAboutDeveloper()}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#fafafa] border border-[#e4e4e7] text-[#09090b] hover:text-[#4f46e5] text-xs font-heading font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Hear Spidey describe the developer"
          >
            <span className="material-symbols-outlined text-[15px]">volume_up</span>
            <span>{isSpeaking ? 'Replay' : 'Listen'}</span>
          </button>
        </div>

        {/* Developer Info Card */}
        <div className="space-y-5 mb-6">
          <div className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa]">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <h4 className="font-heading text-base font-bold text-[#09090b]">
                  Aswin R
                </h4>
                <p className="font-body text-xs font-medium text-[#4f46e5]">
                  Computer Science and Business Systems (CSBS)
                </p>
                <p className="font-body text-xs text-[#71717a]">
                  Rajalakshmi Institute of Technology
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#e4e4e7] flex items-center justify-center text-[#09090b] font-heading font-bold text-sm">
                AR
              </div>
            </div>
            <p className="font-body text-xs text-[#3f3f46] leading-relaxed pt-2 border-t border-[#e4e4e7]/60">
              I’m a CSBS student interested in FinTech, Product Building, Business Systems, and Entrepreneurship. I enjoy turning real-world problems into practical technology solutions and building products that combine technology with business impact.
            </p>
          </div>

          {/* Currently Exploring */}
          <div className="p-4 rounded-xl border border-[#e4e4e7] bg-white">
            <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-[#09090b] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">
                explore
              </span>
              Currently Exploring
            </h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body text-[#52525b]">
              <li className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
                FinTech &amp; Financial Technology
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
                Product Development
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
                Business Systems
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
                AI-powered applications
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-[#f4f4f5] sm:col-span-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
                Startup &amp; Hackathon Projects
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]">
            <div className="flex items-center gap-2 text-xs font-body text-[#52525b]">
              <span className="material-symbols-outlined text-[18px] text-[#71717a]">mail</span>
              <span>ravindran.aswin2007@gmail.com</span>
            </div>
            <a
              href="mailto:ravindran.aswin2007@gmail.com"
              className="text-xs font-heading font-semibold text-[#4f46e5] hover:underline"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#e4e4e7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#09090b] hover:bg-[#27272a] text-white font-medium text-xs rounded-xl transition-all cursor-pointer font-heading uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
