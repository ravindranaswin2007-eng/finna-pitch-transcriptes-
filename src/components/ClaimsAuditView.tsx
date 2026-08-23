import React, { useState } from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface ClaimsAuditViewProps {
  pitchData: PitchAnalysisResult;
}

export const ClaimsAuditView: React.FC<ClaimsAuditViewProps> = ({ pitchData }) => {
  const { claimsAudit } = pitchData;
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'TAM / Market', 'Technology / AI', 'Financial / Unit Economics'];

  const filteredClaims = claimsAudit.filter((c) =>
    filterCategory === 'all' ? true : c.category === filterCategory
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              Fact & Due Diligence Audit
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            Claims Verification & Rigor Audit
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Analyzing specific verbal and slide claims for verification, risk level, and statistical rigor.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
                filterCategory === cat
                  ? 'bg-[#0a0a0a] text-white shadow-sm'
                  : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
              }`}
            >
              {cat === 'all' ? 'All Claims' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Claims List */}
      <div className="flex flex-col gap-4">
        {filteredClaims.map((claim, idx) => {
          const isLowRisk = claim.riskAssessment.toLowerCase().includes('low risk');

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#e4e4e7] hover:border-[#d4d4d8] transition-all shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] uppercase tracking-wider font-heading">
                    {claim.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 font-heading">
                    {claim.status}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider font-heading self-start sm:self-auto border ${
                    isLowRisk
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {claim.riskAssessment}
                </span>
              </div>

              <h3 className="font-heading text-[1.125rem] font-medium text-[#0a0a0a]">
                "{claim.claim}"
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#52525b]">
                  <strong className="text-[#71717a] block text-[10px] uppercase font-semibold font-heading mb-1">
                    Spoken Verbatim / Slide Quote:
                  </strong>
                  <p className="font-body text-xs italic leading-relaxed">"{claim.speakerQuote}"</p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/70 text-[#52525b]">
                  <strong className="text-[#4338ca] block text-[10px] uppercase font-semibold font-heading mb-1">
                    Institutional Fact Check:
                  </strong>
                  <p className="font-body text-xs leading-relaxed">{claim.evaluation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
