export type PitchVerdict = 'INVEST' | 'CONDITIONAL_INVEST' | 'NEEDS_WORK' | 'PASS_HIGH_RISK' | 'PASS_FATAL_FLAW';

export interface ScorecardCategory {
  name: string;
  weight: string;
  score: number; // 0 to 10
  reason: string;
  evidence?: string;
  gap?: string;
}

export interface PitchSectionAudit {
  id: number;
  title: string;
  status: 'Disclosed' | 'Partially Mentioned' | 'Not mentioned in the pitch';
  content: string;
  timestamp?: string;
  keyFinding?: string;
}

export interface FactClaimAudit {
  claim: string;
  category: 'TAM / Market' | 'Financial / Unit Economics' | 'Traction / Metrics' | 'Technology / AI' | 'Regulatory / Compliance' | 'Competition';
  status: 'Clearly stated' | 'Needs verification' | 'Overstated / High Risk' | 'Unsubstantiated';
  speakerQuote: string;
  evaluation: string;
  riskAssessment: string;
}

export interface VCPillarEvaluation {
  id: string;
  name: string;
  score: number;
  strengths: string;
  criticalGaps: string;
}

export interface RedFlagItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium';
  description: string;
  investorConcern: string;
  remedy: string;
}

export interface ActionableFix {
  rank: number;
  title: string;
  currentIssue: string;
  recommendedChange: string;
  estimatedScoreImpact: string;
}

export interface JuryQuestionItem {
  id: string;
  category: 'Business Model & Monetization' | 'Market & GTM' | 'Technology & AI Moat' | 'Traction & Unit Economics' | 'Regulatory & Legal' | 'Team & Execution';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Killer';
  question: string;
  whyJudgeAsks: string;
  sampleWinningAnswer: string;
  commonPitfall: string;
}

export interface DeckSlideReview {
  slideNumber: number;
  slideTitle: string;
  status: 'Strong' | 'Needs Revision' | 'Missing Key Data' | 'Critical Flaw';
  currentContentSummary: string;
  juryCritique: string;
  suggestedRevision: string;
}

export interface TranscriptLine {
  timestamp: string;
  speaker: string;
  originalText: string;
  englishTranslation?: string;
  language?: string;
  isKeyMoment?: boolean;
}

export interface JuryPersonaEvaluation {
  id: string;
  name: string;
  role: string;
  score: number;
  iconName: string;
  verdictQuote: string;
  detailedAnalysis: string;
  keyConcerns: string[];
  recommendation: string;
}

export interface JuryHighlightCard {
  type: 'STRENGTH' | 'CONCERN' | 'QUESTION';
  title: string;
  description: string;
}

export interface PitchDeliveryAnalysis {
  score: number; // 0 to 10
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export interface BodyLanguageAnalysis {
  score: number; // 0 to 10
  summary: string;
  posture: string;
  eyeContact: string;
  facialExpression: string;
  handGestures: string;
  movement: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface JudgePerspective {
  wouldMakeInterested: string;
  wouldMakeHesitate: string;
}

export interface AnalyzePitchRequest {
  startupName: string;
  sector?: string;
  stage?: string;
  pitchLanguage?: string;
  pitchFormat?: string;
  videoUrl?: string;
  transcriptText?: string;
}

export interface PitchAnalysisResult {
  overallScore: number; // 0 to 10 or 0 to 100
  overallScore10: number; // strictly 0 to 10
  videoPreviewUrl?: string;
  executiveSummary: string | {
    problemStatement: string;
    solutionOverview: string;
    marketAndTAM: string;
    businessModelReview: string;
    primaryFatalFlawOrRisk: string;
    investorThesis: string;
  };
  categories: ScorecardCategory[];
  pitchDelivery: PitchDeliveryAnalysis;
  bodyLanguage: BodyLanguageAnalysis;
  strongestParts: string[];
  weakestParts: string[];
  topImprovements: string[] | ActionableFix[];
  judgeImpression: string;
  judgePerspective?: JudgePerspective;
  shortlistProbability: number; // 0 to 100
  finalVerdict: string;

  // Rich metadata & sub-views
  metadata: {
    reportId?: string;
    startupName: string;
    tagline: string;
    founders: string;
    institutionOrLocation: string;
    sector: string;
    stage: string;
    pitchFormat: string;
    pitchLanguage: string;
    videoDuration: string;
    videoPreviewUrl?: string;
    overallScore: number;
    confidenceLevel?: string;
    verdict: PitchVerdict;
    verdictLabel: string;
    verdictSummary: string;
    analyzedAt: string;
  };
  juryHighlights?: JuryHighlightCard[];
  juryPersonas?: JuryPersonaEvaluation[];
  scorecard: ScorecardCategory[];
  pitchSections: PitchSectionAudit[];
  claimsAudit: FactClaimAudit[];
  vcPillars: VCPillarEvaluation[];
  stageDeliveryAudit: {
    overallPresentationRating: number;
    topStrongMoments: string[];
    topCriticalWeaknesses: string[];
    deliveryObservations: string;
    languageAndClarityNote: string;
  };
  redFlags: RedFlagItem[];
  topFixes: ActionableFix[];
  juryQuestions: JuryQuestionItem[];
  deckReview?: DeckSlideReview[];
  transcript: TranscriptLine[];
  juryExchangeHighlight?: {
    judgeName: string;
    judgeRole: string;
    judgeObjection: string;
    founderResponseInPitch: string;
    recommendedWinningReframe: string;
  };
}

export interface JurySparringResponse {
  judgeReaction: string;
  reactionTone: 'impressed' | 'skeptical' | 'hostile' | 'intrigued';
  scoreOutOfTen: number;
  strengthsInDefense: string[];
  weaknessesInDefense: string[];
  recommendedWinningReframe: string;
  followUpKillerQuestion?: string;
}
