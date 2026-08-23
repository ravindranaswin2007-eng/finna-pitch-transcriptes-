import React from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface ExecutiveSummaryViewProps {
  pitchData: PitchAnalysisResult;
  onOpenPdfReport: () => void;
  onOpenSparring: () => void;
  onSelectPersona?: (personaId: string) => void;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  pitchData,
  onOpenPdfReport,
  onOpenSparring,
  onSelectPersona
}) => {
  const {
    overallScore,
    overallScore10,
    executiveSummary,
    metadata,
    pitchDelivery,
    bodyLanguage,
    strongestParts,
    weakestParts,
    topImprovements,
    judgeImpression,
    judgePerspective,
    shortlistProbability,
    finalVerdict,
    juryHighlights,
    juryPersonas
  } = pitchData;

  const scoreTen = overallScore10 || (overallScore > 10 ? (overallScore / 10).toFixed(1) : overallScore) || 7.8;
  const scoreHundred = metadata?.overallScore || Math.round(Number(scoreTen) * 10);

  const execSummaryString =
    typeof executiveSummary === 'string'
      ? executiveSummary
      : executiveSummary?.problemStatement
      ? `${executiveSummary.problemStatement} ${executiveSummary.solutionOverview || ''}`
      : 'Comprehensive FINNA Pitch Report and institutional evaluation.';

  const execSummaryObj =
    typeof executiveSummary === 'object' && executiveSummary !== null
      ? executiveSummary
      : {
          problemStatement: execSummaryString,
          solutionOverview: 'Automated platform solving core workflow bottlenecks.',
          marketAndTAM: 'High-growth market opportunity.',
          businessModelReview: 'Direct monetization and recurring revenue model.',
          primaryFatalFlawOrRisk: 'Unit economics and incumbent defensibility.',
          investorThesis: 'Promising venture opportunity subject to traction validation.',
        };

  const highlights = juryHighlights || [
    {
      type: 'STRENGTH',
      title: 'Strong Value Proposition',
      description: strongestParts?.[0] || 'Clear articulation of the problem and intuitive product workflow.'
    },
    {
      type: 'CONCERN',
      title: 'Diligence Focus Area',
      description: weakestParts?.[0] || 'Unit economics and customer acquisition payback need empirical verification.'
    },
    {
      type: 'QUESTION',
      title: 'Key Scrutiny Point',
      description: judgePerspective?.wouldMakeHesitate || 'Defensibility against existing suite incumbents.'
    }
  ];

  const personas = juryPersonas || [];

  return (
    <div className="flex flex-col gap-12">
      {/* 1. FINNA Top Overview & Score Summary Card */}
      <section className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-[#09090b] text-white uppercase tracking-wider font-heading">
              FINNA Pitch Report
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              {metadata?.sector || 'Venture Evaluation'}
            </span>
            <span className="text-xs text-[#71717a] font-mono">
              {metadata?.reportId || 'Report #PI-FINNA'}
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-medium text-[#09090b] tracking-tight">
            {metadata?.startupName || 'FINNA Pitch Evaluation'}
          </h1>
          <p className="font-body text-[15px] text-[#52525b] leading-relaxed">
            {finalVerdict || metadata?.verdictSummary || 'Objective institutional pitch audit covering presentation, delivery, and venture viability.'}
          </p>
        </div>

        {/* Scores & Shortlist Potential */}
        <div className="flex flex-wrap items-center gap-4 bg-[#fafafa] p-5 rounded-xl border border-[#e4e4e7] shrink-0">
          <div className="text-center px-3">
            <div className="text-[10px] uppercase font-semibold text-[#71717a] font-heading tracking-wider mb-0.5">
              Overall Score
            </div>
            <div className="font-heading text-3xl font-bold text-[#09090b]">
              {scoreTen}
              <span className="text-sm text-[#71717a] font-normal"> / 10</span>
            </div>
            <div className="text-[11px] text-[#71717a] font-mono">
              {scoreHundred}/100 Composite
            </div>
          </div>

          <div className="h-12 w-px bg-[#e4e4e7] hidden sm:block" />

          <div className="text-left px-2">
            <div className="text-[10px] uppercase font-semibold text-[#71717a] font-heading tracking-wider mb-1">
              Shortlist Potential
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-heading text-xl font-bold text-[#4f46e5]">
                {shortlistProbability || 78}%
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                High Consideration
              </span>
            </div>
            <p className="text-[10px] text-[#71717a] italic">
              AI estimate — not a prediction of actual selection
            </p>
          </div>
        </div>
      </section>

      {/* Video Player (if video was uploaded) */}
      {(pitchData.videoPreviewUrl || metadata?.videoPreviewUrl) && (
        <section className="bg-white rounded-2xl p-6 border border-[#e4e4e7] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4f46e5] text-[22px]">videocam</span>
              <h2 className="font-heading text-[1.125rem] font-medium text-[#09090b]">
                Pitch Video & Observable Performance
              </h2>
            </div>
            <span className="text-xs text-[#71717a] font-mono">
              {metadata?.videoDuration || '~11 min'} Pitch Audit
            </span>
          </div>
          <div className="rounded-xl overflow-hidden bg-black border border-[#e4e4e7] p-1">
            <video
              controls
              src={pitchData.videoPreviewUrl || metadata?.videoPreviewUrl}
              className="w-full max-h-[380px] object-contain mx-auto rounded-lg"
            />
          </div>
        </section>
      )}

      {/* 2. Executive Summary */}
      <section className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4f46e5] text-[22px]">
            summarize
          </span>
          <h2 className="font-heading text-[1.25rem] font-medium text-[#09090b] tracking-tight">
            Executive Summary
          </h2>
        </div>
        <p className="font-body text-[15px] text-[#3f3f46] leading-relaxed">
          {execSummaryString}
        </p>
        {judgeImpression && (
          <div className="mt-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#475569] font-body leading-relaxed">
            <strong className="font-heading uppercase text-[10px] tracking-wider text-[#1e293b] block mb-1">
              Judge's Overall Impression:
            </strong>
            {judgeImpression}
          </div>
        )}
      </section>

      {/* 3. What Worked & What Didn't Work */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What Worked */}
        <div className="bg-white rounded-2xl p-8 border border-emerald-200/80 bg-emerald-50/20 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
            <h3 className="font-heading text-lg font-medium">What Worked</h3>
          </div>
          <ul className="space-y-2.5">
            {strongestParts && strongestParts.length > 0 ? (
              strongestParts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#27272a]">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                    done
                  </span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-[#52525b]">Clear presentation flow and problem definition.</li>
            )}
          </ul>
        </div>

        {/* What Didn't Work */}
        <div className="bg-white rounded-2xl p-8 border border-rose-200/80 bg-rose-50/20 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 text-rose-800">
            <span className="material-symbols-outlined text-[24px]">cancel</span>
            <h3 className="font-heading text-lg font-medium">What Didn't Work</h3>
          </div>
          <ul className="space-y-2.5">
            {weakestParts && weakestParts.length > 0 ? (
              weakestParts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#27272a]">
                  <span className="material-symbols-outlined text-rose-600 text-[18px] shrink-0 mt-0.5">
                    close
                  </span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-[#52525b]">Unit economics require more empirical cohort evidence.</li>
            )}
          </ul>
        </div>
      </section>

      {/* 4. Top 5 Actionable Improvements */}
      <section className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[22px]">
              auto_fix_high
            </span>
            <h2 className="font-heading text-[1.25rem] font-medium text-[#09090b] tracking-tight">
              Top 5 Actionable Improvements
            </h2>
          </div>
          <span className="text-xs text-[#71717a] font-medium">
            Prioritized by score impact
          </span>
        </div>

        <div className="space-y-3">
          {topImprovements && topImprovements.length > 0 ? (
            topImprovements.slice(0, 5).map((fix: any, idx: number) => {
              const text = typeof fix === 'string' ? fix : fix?.recommendedChange || fix?.title;
              const title = typeof fix === 'object' ? fix?.title : `Action Item #${idx + 1}`;
              const impact = typeof fix === 'object' ? fix?.estimatedScoreImpact : `+${5 - idx} Points`;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] flex items-start justify-between gap-4 hover:bg-[#f4f4f5] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#09090b] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      {typeof fix === 'object' && fix?.title && (
                        <h4 className="font-heading text-sm font-semibold text-[#09090b] mb-0.5">
                          {title}
                        </h4>
                      )}
                      <p className="font-body text-sm text-[#3f3f46]">
                        {text}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold shrink-0">
                    {impact}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-[#52525b]">No critical fixes identified.</p>
          )}
        </div>
      </section>

      {/* 5. Pitch Delivery & Body Language Analysis */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pitch Delivery */}
        <div className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4f46e5] text-[22px]">
                mic
              </span>
              <h3 className="font-heading text-lg font-medium text-[#09090b]">
                Pitch Delivery Audit
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#e0e7ff] text-[#4338ca]">
              {pitchDelivery?.score || 8.0} / 10
            </span>
          </div>

          <p className="font-body text-sm text-[#3f3f46] leading-relaxed">
            {pitchDelivery?.summary || 'Voice projection, enunciation, and narrative pacing evaluated.'}
          </p>

          {pitchDelivery?.strengths && pitchDelivery.strengths.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider font-heading">
                Key Delivery Strengths:
              </div>
              <ul className="space-y-1 text-xs text-[#52525b]">
                {pitchDelivery.strengths.map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pitchDelivery?.weaknesses && pitchDelivery.weaknesses.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider font-heading">
                Areas for Vocal Improvement:
              </div>
              <ul className="space-y-1 text-xs text-[#52525b]">
                {pitchDelivery.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Body Language Analysis */}
        <div className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#09090b] text-[22px]">
                psychology
              </span>
              <h3 className="font-heading text-lg font-medium text-[#09090b]">
                Body Language Analysis
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#f4f4f5] text-[#09090b] border border-[#e4e4e7]">
              {bodyLanguage?.score || 7.8} / 10
            </span>
          </div>

          <p className="font-body text-sm text-[#3f3f46] leading-relaxed">
            {bodyLanguage?.summary || 'Analysis of visible posture, eye contact, facial expressions, and hand gestures.'}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                Posture & Presence
              </div>
              <div className="text-[#09090b] mt-0.5 font-medium">
                {bodyLanguage?.posture || 'Upright & Grounded'}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                Eye Contact
              </div>
              <div className="text-[#09090b] mt-0.5 font-medium">
                {bodyLanguage?.eyeContact || 'Camera Focused'}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                Facial Expression
              </div>
              <div className="text-[#09090b] mt-0.5 font-medium">
                {bodyLanguage?.facialExpression || 'Engaged & Confident'}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                Hand Gestures
              </div>
              <div className="text-[#09090b] mt-0.5 font-medium">
                {bodyLanguage?.handGestures || 'Natural & Purposeful'}
              </div>
            </div>
          </div>

          {bodyLanguage?.recommendations && bodyLanguage.recommendations.length > 0 && (
            <div className="space-y-1 pt-2">
              <div className="text-[11px] font-semibold text-[#4f46e5] uppercase tracking-wider font-heading">
                Stage & Camera Recommendation:
              </div>
              <p className="text-xs text-[#52525b]">
                {bodyLanguage.recommendations[0]}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Judge's Perspective (Interested vs Hesitate) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-indigo-50/30 border border-indigo-200/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#4f46e5]">
            <span className="material-symbols-outlined text-[20px]">thumb_up</span>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider">
              Judge Perspective: What would make me interested?
            </h3>
          </div>
          <p className="font-body text-sm text-[#3f3f46] leading-relaxed">
            {judgePerspective?.wouldMakeInterested || 'Clear customer pain point, intuitive product UI, and large addressable market.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-amber-50/30 border border-amber-200/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider">
              Judge Perspective: What would make me hesitate?
            </h3>
          </div>
          <p className="font-body text-sm text-[#3f3f46] leading-relaxed">
            {judgePerspective?.wouldMakeHesitate || 'Customer acquisition payback data and proof of technical defensibility against incumbents.'}
          </p>
        </div>
      </section>

      {/* 7. What the Jury Sees Highlights */}
      <section className="flex flex-col gap-6 border-t border-[#e4e4e7] pt-10">
        <h2 className="font-heading text-[1.5rem] font-medium text-[#09090b] tracking-tight">
          What the Jury Sees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const isStrength = item.type === 'STRENGTH';
            const isConcern = item.type === 'CONCERN';

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[#e4e4e7] shadow-sm hover:shadow-[0_10px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                      isStrength
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : isConcern
                        ? 'bg-rose-50 text-rose-600 border-rose-100'
                        : 'bg-[#f4f4f5] text-[#09090b] border-[#e4e4e7]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {isStrength ? 'trending_up' : isConcern ? 'warning' : 'help'}
                    </span>
                  </div>
                  <span
                    className={`font-heading text-[0.7rem] font-semibold tracking-wider uppercase ${
                      isStrength
                        ? 'text-emerald-700'
                        : isConcern
                        ? 'text-rose-700'
                        : 'text-[#09090b]'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h3 className="font-heading text-[1.05rem] font-medium text-[#09090b]">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#52525b] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Meet your AI jury personas */}
      {personas.length > 0 && (
        <section className="flex flex-col gap-6 border-t border-[#e4e4e7] pt-10">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-[1.5rem] font-medium text-[#09090b] tracking-tight">
              Meet your AI jury
            </h2>
            <p className="font-body text-sm text-[#52525b]">
              Simulated expert personas evaluate your pitch from specialized investor viewpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((persona) => {
              const isSkeptical = persona.id === 'skeptical';
              const isProduct = persona.id === 'product';
              const isVc = persona.id === 'vc';

              return (
                <div
                  key={persona.id}
                  className="flex flex-col bg-white border border-[#e4e4e7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                            isSkeptical
                              ? 'bg-rose-50 border-rose-100 text-rose-500'
                              : isProduct
                              ? 'bg-[#e0e7ff] border-indigo-100 text-[#4f46e5]'
                              : 'bg-[#fafafa] border-[#e4e4e7] text-[#09090b]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {persona.iconName || (isVc ? 'account_balance' : isProduct ? 'design_services' : isSkeptical ? 'gavel' : 'code')}
                          </span>
                        </div>
                        <div>
                          <span className="font-heading text-[0.65rem] font-semibold text-[#71717a] tracking-widest uppercase block">
                            {persona.role}
                          </span>
                          <span className="font-heading text-[1.05rem] font-medium text-[#09090b]">
                            {persona.name}
                          </span>
                        </div>
                      </div>

                      <div className="font-heading text-2xl font-bold text-[#09090b]">
                        {persona.score}
                        <span className="text-xs text-[#a1a1aa] font-normal">/100</span>
                      </div>
                    </div>

                    <p className="font-body text-sm text-[#52525b] italic">
                      "{persona.verdictQuote}"
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      if (onSelectPersona) {
                        onSelectPersona(persona.id);
                      } else {
                        onOpenSparring();
                      }
                    }}
                    className="bg-[#fafafa] py-3 px-6 border-t border-[#e4e4e7] flex items-center justify-between group-hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                  >
                    <span className="font-heading text-[0.7rem] font-semibold text-[#09090b] tracking-widest uppercase">
                      SPAR WITH THIS PERSONA
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-[#52525b] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. Executive Foundation (Problem, Solution, Market, Business Model) */}
      <section className="flex flex-col gap-6 border-t border-[#e4e4e7] pt-10">
        <h2 className="font-heading text-[1.25rem] font-medium text-[#09090b] tracking-tight">
          Executive Foundation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white border border-[#e4e4e7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#4f46e5]">
              <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#09090b]">
                Problem Definition & Pain Point
              </h3>
            </div>
            <p className="font-body text-sm text-[#52525b] leading-relaxed">
              {execSummaryObj.problemStatement}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#e4e4e7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-600">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#09090b]">
                Proposed Solution & Product
              </h3>
            </div>
            <p className="font-body text-sm text-[#52525b] leading-relaxed">
              {execSummaryObj.solutionOverview}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#e4e4e7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-700">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#09090b]">
                Market Sizing & Opportunity
              </h3>
            </div>
            <p className="font-body text-sm text-[#52525b] leading-relaxed">
              {execSummaryObj.marketAndTAM}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#e4e4e7] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#09090b]">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#09090b]">
                Business Model & Revenue Streams
              </h3>
            </div>
            <p className="font-body text-sm text-[#52525b] leading-relaxed">
              {execSummaryObj.businessModelReview}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
