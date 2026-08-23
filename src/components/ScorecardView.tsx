import React, { useState } from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface ScorecardViewProps {
  pitchData: PitchAnalysisResult;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({ pitchData }) => {
  const { metadata, scorecard, categories, overallScore10, overallScore } = pitchData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const displayCategories = (categories && categories.length > 0) ? categories : scorecard;
  const scoreTen = overallScore10 || (overallScore > 10 ? (overallScore / 10).toFixed(1) : overallScore) || 7.8;

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              17-Dimensional Due Diligence
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#09090b] tracking-tight">
            17-Category Venture Scorecard
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Standardized evaluation across problem, solution, market, business model, product, innovation, evidence, storytelling, and body language.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-[#fafafa] px-6 py-4 rounded-xl border border-[#e4e4e7] self-start sm:self-auto">
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#71717a] font-heading tracking-wider">
              Overall Score
            </div>
            <div className="font-heading text-2xl font-bold text-[#09090b]">
              {scoreTen}
              <span className="text-sm text-[#71717a] font-normal"> / 10</span>
            </div>
          </div>
          <div className="h-8 w-px bg-[#e4e4e7]" />
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#71717a] font-heading tracking-wider">
              Verdict
            </div>
            <span className="text-xs font-semibold text-[#09090b] uppercase tracking-wider">
              {metadata?.verdictLabel || metadata?.verdict || 'EVALUATED'}
            </span>
          </div>
        </div>
      </div>

      {/* Scorecard Table / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayCategories.map((factor, idx) => {
          const isExpanded = expandedIndex === idx;
          const score = typeof factor.score === 'number' ? factor.score : 7.5;
          const isHigh = score >= 8.0;
          const isMid = score >= 6.5 && score < 8.0;

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#e4e4e7] hover:border-[#d4d4d8] transition-all shadow-sm space-y-4 cursor-pointer group"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider font-heading">
                    Weight: {factor.weight || '6%'}
                  </div>
                  <h3 className="font-heading text-[1.0625rem] font-medium text-[#09090b]">
                    {factor.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold font-heading border ${
                      isHigh
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : isMid
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}
                  >
                    {score} / 10
                  </span>
                  <button className="text-[#71717a] group-hover:text-[#09090b] p-1">
                    <span className="material-symbols-outlined text-[20px]">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Score Progress Bar */}
              <div className="w-full bg-[#f4f4f5] rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHigh ? 'bg-emerald-500' : isMid ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>

              <p className="font-body text-[0.875rem] text-[#52525b] leading-relaxed">
                {factor.reason}
              </p>

              {/* Detailed Breakdown when expanded */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#e4e4e7] space-y-3 text-xs">
                  {factor.evidence && (
                    <div className="p-3.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7] text-[#52525b]">
                      <strong className="text-emerald-700 block text-[10px] uppercase font-semibold font-heading mb-1">
                        Observed Evidence:
                      </strong>
                      <span className="font-body text-[13px]">{factor.evidence}</span>
                    </div>
                  )}

                  {factor.gap && (
                    <div className="p-3.5 rounded-lg bg-rose-50/50 border border-rose-200/60 text-[#52525b]">
                      <strong className="text-rose-700 block text-[10px] uppercase font-semibold font-heading mb-1">
                        Gap / Recommendation:
                      </strong>
                      <span className="font-body text-[13px]">{factor.gap}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
