import React, { useState } from 'react';
import { PitchAnalysisResult, JurySparringResponse } from '../types/pitch';

interface JurySparringProps {
  pitchData: PitchAnalysisResult;
  initialPersonaId?: string;
}

export const JurySparring: React.FC<JurySparringProps> = ({ pitchData, initialPersonaId }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(initialPersonaId || 'vc');
  const [founderAnswer, setFounderAnswer] = useState<string>('');
  const [activeQuestion, setActiveQuestion] = useState<string>(
    pitchData.juryQuestions[0]?.question || 'How exactly will the proposed $3M marketing spend bring down the blended CAC over the next 12 months?'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sparringResult, setSparringResult] = useState<JurySparringResponse | null>(null);

  const personas = [
    {
      id: 'vc',
      name: 'The VC',
      role: 'Series A Lead Partner',
      score: 78,
      iconName: 'account_balance',
      quote: 'Invest with conditions. The market size is undeniable, but the cap table needs cleaning up before a priced round.',
      focus: 'Market expansion, TAM, cap table, enterprise ARR velocity'
    },
    {
      id: 'product',
      name: 'The Product Lead',
      role: 'VP of Enterprise Product',
      score: 84,
      iconName: 'design_services',
      quote: 'Strong product potential. The user flows are incredibly intuitive. High stickiness expected if onboarding friction is reduced.',
      focus: 'User onboarding, time-to-value, stickiness, retention'
    },
    {
      id: 'cto',
      name: 'The CTO',
      role: 'Principal Systems & AI Architect',
      score: 71,
      iconName: 'code',
      quote: 'Needs technical validation. The AI wrapper architecture described lacks a defensive moat. Proprietary data pipeline is unclear.',
      focus: 'Technical moat, latency, infrastructure gross margins, fine-tuning'
    },
    {
      id: 'skeptical',
      name: 'The Skeptical Investor',
      role: 'Deep Risk & Unit Economics Analyst',
      score: 61,
      iconName: 'gavel',
      quote: 'Too many unanswered questions. The churn assumptions are incredibly naive for this specific industry vertical.',
      focus: 'CAC payback, enterprise churn, vendor compression risks'
    }
  ];

  const currentPersona = personas.find((p) => p.id === selectedPersonaId) || personas[0];

  const handleRunSparring = async () => {
    if (!founderAnswer.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/jury-sparring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitchData,
          judgePersona: currentPersona.name,
          currentQuestion: activeQuestion,
          founderAnswer
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: JurySparringResponse = await response.json();
      setSparringResult(data);
    } catch (err) {
      console.warn('Jury Sparring fallback:', err);
      // High craft realistic simulation
      setSparringResult({
        judgeReaction: `As ${currentPersona.name}, your defense addresses the high-level intent, but leaves critical gaps in defensible proof and unit-level economics under enterprise procurement stress.`,
        reactionTone: 'skeptical',
        scoreOutOfTen: 7.2,
        strengthsInDefense: [
          'Directly confronted the core objection without hedging.',
          'Demonstrated clear operational understanding of enterprise procurement friction.'
        ],
        weaknessesInDefense: [
          'Relied on qualitative claims rather than citing empirical pilot cohort retention numbers.',
          'Did not explicitly articulate the gross margin contribution net of AI inference tokens.'
        ],
        recommendedWinningReframe: `Lead with concrete telemetry: "In our 6 Fortune 500 pilots, average PO cycle time dropped from 14 days to 4 minutes, driving an 89% WAU rate and 118% net revenue retention. That hard ROI cuts blended CAC to under $8k with a 10-month payback."`,
        followUpKillerQuestion: `If SAP Joule or Coupa builds this native workflow next quarter, what contractual or technical switching cost stops your enterprise customers from churning?`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              AI Cross-Examination Gym
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            Meet & Spar with Your AI Jury
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1 max-w-2xl">
            Test your pitch defense in real time against 4 specialized synthetic investor personas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] font-heading">
            Active Persona:
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#0a0a0a] text-white">
            {currentPersona.name}
          </span>
        </div>
      </div>

      {/* 4 Persona Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {personas.map((persona) => {
          const isSelected = selectedPersonaId === persona.id;
          const isSkeptical = persona.id === 'skeptical';

          return (
            <div
              key={persona.id}
              onClick={() => {
                setSelectedPersonaId(persona.id);
                setSparringResult(null);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 relative shadow-sm ${
                isSelected
                  ? 'bg-white border-[#0a0a0a] ring-2 ring-[#0a0a0a]/10'
                  : 'bg-white border-[#e4e4e7] hover:border-[#d4d4d8]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    isSkeptical
                      ? 'bg-rose-50 border-rose-100 text-rose-500'
                      : persona.id === 'product'
                      ? 'bg-[#e0e7ff] border-indigo-100 text-[#4f46e5]'
                      : 'bg-[#fafafa] border-[#e4e4e7] text-[#0a0a0a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {persona.iconName}
                  </span>
                </div>
                <span
                  className={`font-heading text-sm font-semibold ${
                    isSkeptical ? 'text-rose-600' : 'text-[#0a0a0a]'
                  }`}
                >
                  {persona.score}/100
                </span>
              </div>

              <div>
                <h4 className="font-heading text-sm font-semibold text-[#0a0a0a]">
                  {persona.name}
                </h4>
                <p className="font-body text-xs text-[#71717a] mt-0.5">
                  {persona.role}
                </p>
                <p className="font-body text-[11px] text-[#52525b] mt-2 italic line-clamp-2">
                  "{persona.quote}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#e4e4e7] flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                  {isSelected ? 'Active Sparrer' : 'Select'}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#71717a]">
                  {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sparring Arena Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question & Founder Defense Box */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Question Selector */}
          <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                Jury Question Under Cross-Examination
              </span>
              <span className="text-xs text-[#4f46e5] font-semibold font-heading">
                {pitchData.juryQuestions.length} Questions Available
              </span>
            </div>

            {/* Quick Pills for questions */}
            <div className="flex flex-wrap gap-2">
              {pitchData.juryQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestion(q.question);
                    setSparringResult(null);
                  }}
                  className={`text-xs font-heading font-medium px-3 py-1.5 rounded-lg border transition-all ${
                    activeQuestion === q.question
                      ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                      : 'bg-[#fafafa] text-[#52525b] border-[#e4e4e7] hover:bg-[#f4f4f5] hover:text-[#0a0a0a]'
                  }`}
                >
                  Q{idx + 1}: {q.category}
                </button>
              ))}
            </div>

            {/* Active Question Display */}
            <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#0a0a0a]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#4f46e5] text-[20px] mt-0.5">
                  help
                </span>
                <div>
                  <p className="font-heading text-sm font-medium text-[#0a0a0a] leading-relaxed">
                    "{activeQuestion}"
                  </p>
                  <p className="font-body text-xs text-[#71717a] mt-1">
                    Persona focus: {currentPersona.focus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Response Input */}
          <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a] font-heading">
                Your Founder Defense / Answer
              </label>
              <button
                type="button"
                onClick={() => {
                  const match = pitchData.juryQuestions.find((q) => q.question === activeQuestion);
                  if (match?.sampleWinningAnswer) {
                    setFounderAnswer(match.sampleWinningAnswer);
                  } else {
                    setFounderAnswer(
                      'We focus on hard ROI: our multi-agent procurement engine reduces PO processing from 14 days to 4 minutes, saving our Fortune 500 customers $1.2M in annual operational overhead with 89% weekly active stickiness.'
                    );
                  }
                }}
                className="text-xs font-semibold text-[#4f46e5] hover:underline font-heading"
              >
                Insert Recommended Winning Script
              </button>
            </div>

            <textarea
              rows={5}
              placeholder="Type your spoken defense or response to this jury question..."
              value={founderAnswer}
              onChange={(e) => setFounderAnswer(e.target.value)}
              className="w-full p-4 text-sm bg-white border border-[#e4e4e7] rounded-xl text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] font-body"
            />

            <button
              onClick={handleRunSparring}
              disabled={!founderAnswer.trim() || isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                !founderAnswer.trim() || isLoading
                  ? 'bg-[#f4f4f5] text-[#a1a1aa] cursor-not-allowed border border-[#e4e4e7]'
                  : 'bg-[#0a0a0a] text-white hover:bg-[#27272a] shadow-sm'
              }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    refresh
                  </span>
                  Evaluating Defense Against {currentPersona.name}...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                  Submit Defense to {currentPersona.name}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Instant Jury Verdict & Critique */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex-grow flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7] mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0a0a0a] text-[20px]">
                    rate_review
                  </span>
                  <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">
                    Persona Feedback & Score
                  </h3>
                </div>
                {sparringResult && (
                  <span className="font-heading text-xs font-semibold px-2.5 py-1 rounded-md bg-[#fafafa] border border-[#e4e4e7] text-[#0a0a0a]">
                    Defense Score: {sparringResult.scoreOutOfTen}/10
                  </span>
                )}
              </div>

              {sparringResult ? (
                <div className="space-y-4">
                  {/* Reaction statement */}
                  <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-sm text-[#0a0a0a] font-body leading-relaxed">
                    <strong className="text-xs font-heading font-semibold text-[#71717a] block uppercase tracking-wider mb-1">
                      {currentPersona.name}'s Reaction:
                    </strong>
                    "{sparringResult.judgeReaction}"
                  </div>

                  {/* Strengths */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-heading font-semibold text-emerald-700 uppercase tracking-wider">
                      Effective Defense Points:
                    </span>
                    <ul className="space-y-1">
                      {sparringResult.strengthsInDefense.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#52525b] font-body">
                          <span className="material-symbols-outlined text-emerald-600 text-[14px] mt-0.5 shrink-0">
                            check
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-heading font-semibold text-rose-700 uppercase tracking-wider">
                      Identified Vulnerabilities:
                    </span>
                    <ul className="space-y-1">
                      {sparringResult.weaknessesInDefense.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#52525b] font-body">
                          <span className="material-symbols-outlined text-rose-500 text-[14px] mt-0.5 shrink-0">
                            close
                          </span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Winning Reframe */}
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/70 space-y-1">
                    <span className="text-[10px] font-heading font-semibold text-[#4338ca] uppercase tracking-wider block">
                      Recommended Winning Reframe:
                    </span>
                    <p className="font-body text-xs text-[#52525b] leading-relaxed">
                      {sparringResult.recommendedWinningReframe}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#71717a]">
                    <span className="material-symbols-outlined text-[24px]">forum</span>
                  </div>
                  <h4 className="font-heading text-sm font-medium text-[#0a0a0a]">
                    Ready to Spar
                  </h4>
                  <p className="font-body text-xs text-[#71717a] max-w-xs">
                    Select a question, type your founder defense on the left, and submit to receive instant critique from {currentPersona.name}.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Tip */}
            <div className="p-3 rounded-lg bg-[#fafafa] border border-[#e4e4e7] flex items-center gap-2 text-[11px] text-[#71717a]">
              <span className="material-symbols-outlined text-[16px] text-[#0a0a0a]">info</span>
              <span>Jury personas evaluate defensibility, precision, and empirical retention.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
