import React, { useState } from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface TopFixesViewProps {
  pitchData: PitchAnalysisResult;
}

export const TopFixesView: React.FC<TopFixesViewProps> = ({ pitchData }) => {
  const { topFixes, juryQuestions, deckReview } = pitchData;
  const [activeSection, setActiveSection] = useState<'fixes' | 'questions' | 'deck'>('fixes');

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              Actionable Fixes & Q&A Mastery
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            High-Impact Pitch Refinements & Killer Q&A
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Top ranked changes to immediately accelerate investor confidence and master tough due diligence questions.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('fixes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              activeSection === 'fixes'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            Top Fixes ({topFixes.length})
          </button>
          <button
            onClick={() => setActiveSection('questions')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              activeSection === 'questions'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            Jury Q&A ({juryQuestions.length})
          </button>
          <button
            onClick={() => setActiveSection('deck')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              activeSection === 'deck'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            Deck Review ({deckReview.length})
          </button>
        </div>
      </div>

      {/* Top Fixes Tab */}
      {activeSection === 'fixes' && (
        <div className="flex flex-col gap-4">
          {topFixes.map((fix) => (
            <div
              key={fix.rank}
              className="p-6 rounded-2xl bg-white border border-[#e4e4e7] hover:border-[#d4d4d8] transition-all shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center font-heading text-xs font-bold text-[#0a0a0a]">
                    #{fix.rank}
                  </span>
                  <h3 className="font-heading text-[1.0625rem] font-medium text-[#0a0a0a]">
                    {fix.title}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider font-heading self-start sm:self-auto">
                  Impact: {fix.estimatedScoreImpact}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#52525b]">
                  <strong className="text-[#71717a] block text-[10px] uppercase font-semibold font-heading mb-1">
                    Current Identified Limitation:
                  </strong>
                  <p className="font-body text-xs leading-relaxed">{fix.currentIssue}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/70 text-[#52525b]">
                  <strong className="text-[#4338ca] block text-[10px] uppercase font-semibold font-heading mb-1">
                    Prescribed Strategic Action:
                  </strong>
                  <p className="font-body text-xs leading-relaxed">{fix.recommendedChange}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Jury Q&A Tab */}
      {activeSection === 'questions' && (
        <div className="flex flex-col gap-4">
          {juryQuestions.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-white border border-[#e4e4e7] hover:border-[#d4d4d8] transition-all shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] uppercase tracking-wider font-heading">
                    {q.category}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider font-heading border ${
                    q.difficulty === 'Killer'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {q.difficulty} Difficulty
                </span>
              </div>

              <h3 className="font-heading text-[1.125rem] font-medium text-[#0a0a0a] leading-snug">
                "{q.question}"
              </h3>

              <div className="p-3 rounded-lg bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#52525b]">
                <strong className="text-[#71717a] text-[10px] uppercase font-semibold font-heading block mb-0.5">
                  Why the Jury Drills on This:
                </strong>
                <p className="font-body">{q.whyJudgeAsks}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 text-xs space-y-1">
                <strong className="text-emerald-700 text-[10px] uppercase font-semibold font-heading block">
                  Model Winning Response Script:
                </strong>
                <p className="font-body text-xs text-[#52525b] leading-relaxed italic">
                  "{q.sampleWinningAnswer}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deck Review Tab */}
      {activeSection === 'deck' && (
        <div className="flex flex-col gap-4">
          {deckReview.map((slide) => (
            <div
              key={slide.slideNumber}
              className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center font-heading text-xs font-bold text-[#0a0a0a]">
                    S{slide.slideNumber}
                  </span>
                  <h3 className="font-heading text-[1.0625rem] font-medium text-[#0a0a0a]">
                    {slide.slideTitle}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider font-heading border ${
                    slide.status === 'Strong'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {slide.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#52525b]">
                  <strong className="text-[#71717a] block text-[10px] uppercase font-semibold font-heading mb-1">
                    Jury Critique:
                  </strong>
                  <p className="font-body text-xs leading-relaxed">{slide.juryCritique}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/70 text-[#52525b]">
                  <strong className="text-[#4338ca] block text-[10px] uppercase font-semibold font-heading mb-1">
                    Suggested Slide Revision:
                  </strong>
                  <p className="font-body text-xs leading-relaxed">{slide.suggestedRevision}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
