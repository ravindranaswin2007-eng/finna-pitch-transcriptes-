import React, { useState } from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface PitchStructureViewProps {
  pitchData: PitchAnalysisResult;
}

export const PitchStructureView: React.FC<PitchStructureViewProps> = ({ pitchData }) => {
  const { pitchSections } = pitchData;
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredSections = pitchSections.filter((section) =>
    filterStatus === 'all' ? true : section.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              18-Point Anatomy
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            Pitch Narrative & Structure Inventory
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Auditing disclosure completeness across the standard 18-part venture pitch framework.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              filterStatus === 'all'
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            All (18)
          </button>
          <button
            onClick={() => setFilterStatus('disclosed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              filterStatus === 'disclosed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            Disclosed
          </button>
          <button
            onClick={() => setFilterStatus('partially mentioned')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-heading transition-all ${
              filterStatus === 'partially mentioned'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-[#fafafa] text-[#71717a] border border-[#e4e4e7] hover:text-[#0a0a0a]'
            }`}
          >
            Partial
          </button>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSections.map((sec) => {
          const isDisclosed = sec.status === 'Disclosed';
          const isPartial = sec.status === 'Partially Mentioned';

          return (
            <div
              key={sec.id}
              className="p-5 rounded-2xl bg-white border border-[#e4e4e7] hover:border-[#d4d4d8] transition-all shadow-sm flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider font-heading">
                    Section {sec.id} {sec.timestamp ? `• ${sec.timestamp}` : ''}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider font-heading border ${
                      isDisclosed
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isPartial
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {sec.status}
                  </span>
                </div>

                <h3 className="font-heading text-sm font-semibold text-[#0a0a0a]">
                  {sec.title}
                </h3>
              </div>

              <p className="font-body text-xs text-[#52525b] leading-relaxed">
                {sec.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
