import React, { useState } from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface RedFlagsViewProps {
  pitchData: PitchAnalysisResult;
}

export const RedFlagsView: React.FC<RedFlagsViewProps> = ({ pitchData }) => {
  const { redFlags, juryExchangeHighlight } = pitchData;
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredRedFlags = redFlags.filter((rf) =>
    filterSeverity === 'all' ? true : rf.severity.toLowerCase() === filterSeverity.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider font-heading">
              Fatal Flaws & Downside Risks
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            Critical Red Flags & Investor Vulnerabilities
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Identified structural defects that cause early-stage investors to pass, with concrete actionable remedies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              filterSeverity === 'all'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            All ({redFlags.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              filterSeverity === 'critical'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterSeverity('high')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              filterSeverity === 'high'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            High
          </button>
        </div>
      </div>

      {/* Red Flags Cards List */}
      <div className="flex flex-col gap-4">
        {filteredRedFlags.map((rf) => {
          const isCritical = rf.severity.toLowerCase() === 'critical';

          return (
            <div
              key={rf.id}
              className={`p-6 rounded-2xl border transition-all shadow-sm space-y-4 ${
                isCritical
                  ? 'bg-white border-rose-200'
                  : 'bg-white border-[#e4e4e7]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isCritical ? 'text-rose-600' : 'text-amber-600'
                    }`}
                  >
                    warning
                  </span>
                  <h3 className="font-heading text-[1.0625rem] font-medium text-[#0a0a0a]">
                    {rf.title}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider font-heading self-start sm:self-auto border ${
                    isCritical
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {rf.severity} Severity
                </span>
              </div>

              <p className="font-body text-sm text-[#52525b] leading-relaxed">
                {rf.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/60 space-y-1.5">
                  <strong className="text-rose-700 text-[10px] uppercase font-semibold font-heading block flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    Why Investors Pass:
                  </strong>
                  <p className="font-body text-xs text-[#52525b] leading-relaxed">
                    {rf.investorConcern}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
                  <strong className="text-emerald-700 text-[10px] uppercase font-semibold font-heading block flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Required Founder Remedy:
                  </strong>
                  <p className="font-body text-xs text-[#52525b] leading-relaxed">
                    {rf.remedy}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Jury Objection Highlight */}
      {juryExchangeHighlight && (
        <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-semibold text-[#0a0a0a] uppercase tracking-wider">
            Live Jury Cross-Examination Breakdown
          </h3>

          <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] space-y-1 text-xs">
            <span className="text-[10px] uppercase font-semibold text-rose-700 font-heading block">
              Central Objection from {juryExchangeHighlight.judgeRole} ({juryExchangeHighlight.judgeName}):
            </span>
            <p className="font-body text-xs text-[#0a0a0a] italic leading-relaxed">
              "{juryExchangeHighlight.judgeObjection}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-semibold text-emerald-700 font-heading block">
              Recommended Winning Reframe:
            </span>
            <p className="font-body text-xs text-[#52525b] leading-relaxed">
              {juryExchangeHighlight.recommendedWinningReframe}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
