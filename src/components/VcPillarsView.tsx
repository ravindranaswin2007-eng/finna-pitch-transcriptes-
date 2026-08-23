import React from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface VcPillarsViewProps {
  pitchData: PitchAnalysisResult;
}

export const VcPillarsView: React.FC<VcPillarsViewProps> = ({ pitchData }) => {
  const { vcPillars, stageDeliveryAudit } = pitchData;

  return (
    <div className="flex flex-col gap-10">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              Strategic & Delivery Synthesis
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            6 Core VC Pillars & Stage Presence
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Consolidated analysis of executive investment pillars and live presentation delivery dynamics.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#fafafa] px-6 py-4 rounded-xl border border-[#e4e4e7] self-start sm:self-auto">
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#71717a] font-heading tracking-wider">
              Delivery Rating
            </div>
            <div className="font-heading text-2xl font-medium text-[#0a0a0a]">
              {stageDeliveryAudit.overallPresentationRating}
              <span className="text-sm text-[#a1a1aa] font-normal"> / 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 VC Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vcPillars.map((pillar) => (
          <div
            key={pillar.id}
            className="p-6 rounded-2xl bg-white border border-[#e4e4e7] hover:border-[#d4d4d8] transition-all shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                  Pillar #{pillar.id}
                </span>
                <span className="font-heading text-sm font-semibold text-[#0a0a0a]">
                  {pillar.score} / 10
                </span>
              </div>

              <h3 className="font-heading text-[1.0625rem] font-medium text-[#0a0a0a]">
                {pillar.name}
              </h3>

              <div className="w-full bg-[#f4f4f5] rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-[#0a0a0a] rounded-full"
                  style={{ width: `${(pillar.score / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-emerald-50/40 border border-emerald-200/60 text-[#52525b]">
                <strong className="text-emerald-700 block text-[10px] uppercase font-semibold font-heading mb-0.5">
                  Observed Strengths:
                </strong>
                <p className="font-body text-xs">{pillar.strengths}</p>
              </div>

              <div className="p-3 rounded-lg bg-rose-50/40 border border-rose-200/60 text-[#52525b]">
                <strong className="text-rose-700 block text-[10px] uppercase font-semibold font-heading mb-0.5">
                  Critical Gaps:
                </strong>
                <p className="font-body text-xs">{pillar.criticalGaps}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stage Delivery Dynamics */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm space-y-6">
        <h3 className="font-heading text-[1.25rem] font-medium text-[#0a0a0a] tracking-tight">
          Executive Stage Delivery Dynamics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] space-y-3">
            <strong className="text-emerald-700 uppercase font-semibold font-heading text-xs flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Top Strong Presentation Moments:
            </strong>
            <ul className="space-y-2">
              {stageDeliveryAudit.topStrongMoments.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#52525b] font-body text-xs leading-relaxed">
                  <span className="material-symbols-outlined text-emerald-600 text-[14px] mt-0.5 shrink-0">
                    check
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] space-y-3">
            <strong className="text-rose-700 uppercase font-semibold font-heading text-xs flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              Critical Stage Weaknesses & Cross-Exam Drops:
            </strong>
            <ul className="space-y-2">
              {stageDeliveryAudit.topCriticalWeaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#52525b] font-body text-xs leading-relaxed">
                  <span className="material-symbols-outlined text-rose-500 text-[14px] mt-0.5 shrink-0">
                    close
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
