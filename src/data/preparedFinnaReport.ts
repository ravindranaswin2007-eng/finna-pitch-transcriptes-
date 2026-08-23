import { PitchAnalysisResult } from '../types/pitch';
import {
  CLEAN_PITCH_SECTIONS,
  FACTS_AND_CLAIMS,
  RED_FLAGS,
  JURY_QUESTIONS_POOL,
  TOP_10_IMPROVEMENTS,
  TAMIL_ENGLISH_TRANSCRIPT,
} from './pitchData';

/**
 * Pre-analyzed FINNA Pitch Report from the existing conversation for IMG_1976.MOV.
 * Used for Demo Mode without running a redundant or hanging video analysis pipeline.
 */
export const PREPARED_FINNA_REPORT: PitchAnalysisResult = {
  overallScore: 6.3,
  overallScore10: 6.3,
  executiveSummary: {
    problemStatement:
      '7.7M+ Indian gig delivery workers (Swiggy, Zomato, Urban Company) suffer extreme income volatility (e.g. ₹1,700 one day, ₹700 on a 16-hr shift the next), hidden UPI cash leakage, high-interest debt stress, and lack of budgeting literacy.',
    solutionOverview:
      'FINNA ("Finance Anna") – A vernacular voice-first AI financial co-pilot analyzing bank statements via RBI Account Aggregator, calculating daily Safe-to-Spend limits, and preventing rent/loan default.',
    marketAndTAM:
      'India gig workforce stands at 7.7 Million today, projected by NITI Aayog to reach 23.5 Million by 2030 (TAM: ₹12,000 Cr+ annual transaction value).',
    businessModelReview:
      'B2B2C referral distribution model. Monetizes by distributing micro-insurance, personal loans, and credit cards via fintech tie-ups.',
    primaryFatalFlawOrRisk:
      'Critical business model contradiction: Attempting to solve worker debt and volatility by pushing credit cards and personal loans onto cash-strapped workers to earn affiliate commissions.',
    investorThesis:
      'Strong, high-empathy problem hook with genuine social relevance in India’s gig economy; requires immediate monetization pivot to micro-savings/EWA and proof of driver retention before venture funding.',
  },
  categories: [
    {
      name: '1. Problem Clarity & Depth',
      weight: '12%',
      score: 8.5,
      reason:
        'High real-world relevance; authentic tea shop roleplay accurately captures daily income swings, long shifts, and monthly rent anxiety.',
      evidence: '₹1,700 vs ₹700 16-hr shift roleplay; 7.7M gig workers struggling with rent commitments.',
      gap: 'Lacks granular breakdown of daily rider expenses (fuel, vehicle maintenance, mobile data, remittance).',
    },
    {
      name: '2. Target Customer Persona',
      weight: '8%',
      score: 8.0,
      reason:
        'Sharp focus on food delivery partners (Swiggy, Zomato) and home services (Urban Company), explicitly noting educated degree holders working full-time gigs.',
      evidence: 'Specifically highlighted B.Tech, B.Sc, BBA graduates working delivery roles and rural migrants.',
      gap: 'Did not profile differences between Tier-1 full-timers vs Tier-2/3 seasonal or part-time riders.',
    },
    {
      name: '3. Market Opportunity & TAM',
      weight: '10%',
      score: 8.5,
      reason:
        'Grounded in official NITI Aayog 2022 research: 7.7M active workers growing to 23.5M by 2030 across India.',
      evidence: 'Accurate citation of NITI Aayog macro figures and 10% adoption upside.',
      gap: 'Relied on top-down math ("10% download is big boom") without bottom-up unit CAC or conversion modeling.',
    },
    {
      name: '4. Solution & Product Innovation',
      weight: '10%',
      score: 6.8,
      reason:
        'Vernacular voice assistant ("Finance Anna") with daily Safe-to-Spend limits replaces intimidating charts with cultural empathy.',
      evidence: 'Audio alerts in Tamil, Malayalam, Kannada: "Do not spend this ₹200 now; rent is due in 5 days."',
      gap: 'UI/UX demonstration was static; behavioral nudge algorithms and audio response latency were not shown.',
    },
    {
      name: '5. Technical Feasibility & Data Moat',
      weight: '8%',
      score: 6.2,
      reason:
        'Smart architectural decision to bypass closed Swiggy/Zomato APIs and use RBI Account Aggregator rails for bank statement ingestion.',
      evidence: 'Account Aggregator framework integration with user consent.',
      gap: 'No proprietary credit-risk scoring algorithms or multi-bank transaction reconciliation logic presented.',
    },
    {
      name: '6. Business Model & Monetization',
      weight: '12%',
      score: 3.5,
      reason:
        'Fatal contradiction: Pushing credit cards and personal loans to earn referral fees contradicts the mission of relieving debt distress.',
      evidence: 'Monetization via affiliate tie-ups for credit cards, personal loans, and insurance.',
      gap: 'Must pivot to micro-savings yield sharing, zero-interest Earned Wage Access (EWA), and B2B platform analytics.',
    },
    {
      name: '7. Competitive Advantage & Moat',
      weight: '8%',
      score: 4.5,
      reason:
        'Correctly identified KarmaLife and PayNearby, but underestimated their deep enterprise partnerships and funding.',
      evidence: 'Claims competitors only offer fragmented single-point tools while FINNA unifies the ecosystem.',
      gap: 'Weak defensive moat against PhonePe or Google Pay launching native vernacular voice budgeting.',
    },
    {
      name: '8. Traction & Market Validation',
      weight: '10%',
      score: 2.0,
      reason:
        'Pre-MVP stage with zero disclosed pilot data, user interview metrics, waitlist numbers, or prototype feedback.',
      evidence: 'Zero live beta users or pilot metrics disclosed during the pitch.',
      gap: 'Needs a 50-driver WhatsApp pilot with before-and-after savings data and retention metrics.',
    },
    {
      name: '9. Scalability & Expansion',
      weight: '8%',
      score: 7.0,
      reason:
        'High natural expansion potential across pan-India languages via unified UPI and Account Aggregator infrastructure.',
      evidence: 'Multi-lingual voice architecture covering southern and northern delivery clusters.',
      gap: 'Expansion is throttled until unit economics and customer acquisition costs at tea-stall hubs are proven.',
    },
    {
      name: '10. Team Capability & Domain Mastery',
      weight: '6%',
      score: 5.2,
      reason:
        'Passionate founders with strong stage presence, but struggled during regulatory and financial cross-examination.',
      evidence: 'Quick dismissive answer to regulatory questions ("In MVP it is easy because RBI is supporting").',
      gap: 'No explicit team slide outlining engineering leadership, fintech compliance, or operations roles.',
    },
    {
      name: '11. Regulatory & Compliance Readiness',
      weight: '8%',
      score: 4.0,
      reason:
        'Underestimated RBI Digital Lending Guidelines, LSP requirements, and SEBI/IRDAI distribution rules.',
      evidence: 'Jury cross-examination highlighted SEBI, banking compliance, and investment advisory laws.',
      gap: 'Must formally structure as an RBI-registered Lending Service Provider (LSP) partnering with licensed NBFCs.',
    },
  ],
  pitchDelivery: {
    score: 7.2,
    summary:
      'Energetic, relatable opening with clear Tamil-English delivery and high-empathy tea shop roleplay, but lost composure during the jury cross-examination.',
    strengths: [
      'Creative 2-person tea shop roleplay clearly demonstrated the pain point',
      'Articulate bilingual pacing and strong audience connection in the opening',
      'Memorable cultural branding with "Finance Anna"',
    ],
    weaknesses: [
      'Defensive posture and circular answers when challenged on loan monetization',
      'Underestimated regulatory compliance questions from the jury panel',
      'Abrupt conclusion without a clear investment or grant ask',
    ],
  },
  bodyLanguage: {
    score: 7.0,
    summary:
      'Confident, grounded stance and open gestures during the presentation phase; became visibly tense and defensive during jury questioning.',
    posture: 'Upright and centered during the pitch; shifted weight and crossed arms during tough Q&A',
    eyeContact: 'Strong, direct eye contact with the jury during the roleplay and problem statement',
    facialExpression: 'Engaged and enthusiastic initially; flashed frustration when business model was challenged',
    handGestures: 'Expressive conversational gestures reinforcing the persona dialogue',
    movement: 'Purposeful center-stage positioning with natural tag-team coordination between co-founders',
    strengths: [
      'Natural conversational chemistry between co-founders',
      'Good vocal projection without relying on cue cards or slides',
    ],
    weaknesses: [
      'Arm crossing and downward gaze during severe jury critiques',
      'Fidgeting with microphone when addressing business model objections',
    ],
    recommendations: [
      'Acknowledge jury critiques with open body language: "That is an insightful point, we will pivot to savings."',
      'Maintain steady eye contact and active nodding when judges are delivering feedback.',
    ],
  },
  strongestParts: [
    'Authentic Problem Roleplay: The 2-minute tea shop dialogue resonated instantly with real gig worker struggles.',
    'Finance Anna Persona: Culturally intuitive vernacular voice branding removes intimidating financial jargon.',
    'Account Aggregator Rail: Practical engineering choice to read bank statements rather than demanding closed API access.',
  ],
  weakestParts: [
    'Debt Trap Monetization: Selling high-interest credit cards and loans to financially stressed workers contradicts the core mission.',
    'Zero Traction Data: Lack of real user interviews, pilot data, or prototype testing metrics.',
    'Regulatory Naivety: Dismissing RBI, SEBI, and NBFC compliance as "easy in MVP stage".',
  ],
  topImprovements: [
    'Pivot Monetization Away From Debt: Replace loan/credit card distribution with micro-savings commission and Earned Wage Access (EWA).',
    'Run a 50-Driver Ground Pilot: Conduct a 30-day manual WhatsApp pilot with Chennai delivery riders to prove savings retention.',
    'Address RBI / LSP Compliance Upfront: Formally cite partnerships with licensed Account Aggregators (Setu, Finvu) and NBFCs.',
    'Show Live Voice UI Demo: Play a 15-second authentic audio simulation of Finance Anna giving daily spending advice.',
    'Close with a Crisp Funding Ask: Conclude with a clear request for ₹10 Lakhs prototype grant funding and pilot milestones.',
  ],
  judgeImpression:
    'FINNA demonstrates commendable founder passion and high-empathy problem identification for India’s 7.7M gig workforce. However, the business model fatally contradicts the mission by pushing debt onto volatile earners. With a swift pivot to automated micro-savings and ground pilot validation, this venture can become a powerful institutional winner.',
  judgePerspective: {
    wouldMakeInterested:
      'High-conviction market timing, expanding gig workforce TAM, and culturally intuitive vernacular voice interface.',
    wouldMakeHesitate:
      'Ethical and credit default risk of selling debt products to workers earning ₹700/day, paired with zero pilot validation.',
  },
  shortlistProbability: 62,
  finalVerdict:
    'CONDITIONAL PASS: High-potential concept with outstanding empathy, but penalized for business model contradiction and lack of regulatory preparation. Immediate pivot to savings-first model required.',
  metadata: {
    reportId: 'FINNA-AUDIT-1976',
    startupName: 'FINNA ("Finance Anna")',
    tagline: 'The Vernacular AI Financial Co-Pilot for Gig Workers',
    founders: 'Aswin & Team (RIT Chennai)',
    institutionOrLocation: 'Chennai, Tamil Nadu',
    sector: 'Fintech / AI / Gig Economy',
    stage: 'Pre-Seed / Ideation MVP',
    pitchFormat: 'Stage Pitch Presentation & Jury Cross-Examination (~11 min)',
    pitchLanguage: 'English / Tamil (Bilingual)',
    videoDuration: '11:00 min (IMG_1976.MOV)',
    overallScore: 6.3,
    confidenceLevel: 'Institutional Grade (Multimodal Pitch & Jury Audit)',
    verdict: 'NEEDS_WORK',
    verdictLabel: 'NEEDS PIVOT / CONDITIONAL',
    verdictSummary:
      'Strong problem empathy and cultural branding, severely penalized for predatory loan monetization and lack of traction metrics.',
    analyzedAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  },
  scorecard: SCORECARD_CATEGORIES_DATA(),
  pitchSections: CLEAN_PITCH_SECTIONS.map((sec) => ({
    id: sec.id,
    title: sec.title,
    status: sec.status === 'Mentioned' ? 'Disclosed' : (sec.status as any),
    content: sec.content,
    keyFinding: sec.notes || sec.content.slice(0, 80) + '...',
  })),
  claimsAudit: FACTS_AND_CLAIMS.map((fc) => ({
    claim: fc.claim,
    category:
      fc.category.includes('TAM') || fc.category.includes('Market')
        ? 'TAM / Market'
        : fc.category.includes('Business')
        ? 'Financial / Unit Economics'
        : fc.category.includes('Technology')
        ? 'Technology / AI'
        : 'Regulatory / Compliance',
    status:
      fc.status === 'Clearly stated'
        ? 'Clearly stated'
        : fc.status === 'Needs verification'
        ? 'Needs verification'
        : 'Overstated / High Risk',
    speakerQuote: fc.speakerQuote,
    evaluation: fc.evaluation,
    riskAssessment: fc.evaluation,
  })),
  vcPillars: [
    {
      id: 'vc-1',
      name: 'Venture Scale & TAM',
      score: 8.5,
      strengths: '7.7M platform workers growing to 23.5M by 2030 (NITI Aayog backed).',
      criticalGaps: 'Needs bottom-up customer acquisition cost (CAC) calculations.',
    },
    {
      id: 'vc-2',
      name: 'Product Moat & Defensibility',
      score: 5.5,
      strengths: 'Vernacular voice AI companion with emotional "Anna" branding.',
      criticalGaps: 'Low defensibility against UPI giants (PhonePe/Google Pay).',
    },
    {
      id: 'vc-3',
      name: 'Business Model Economics',
      score: 3.5,
      strengths: 'Affiliate commissions from fintech distribution.',
      criticalGaps: 'Severe ethical conflict: Pushing debt onto struggling workers.',
    },
    {
      id: 'vc-4',
      name: 'Execution & Regulatory Readiness',
      score: 5.0,
      strengths: 'Bilingual delivery and high-energy stage presence.',
      criticalGaps: 'Unprepared for RBI Digital Lending and LSP regulations.',
    },
  ],
  stageDeliveryAudit: {
    overallPresentationRating: 7.2,
    topStrongMoments: [
      '00:22 - 01:42: Tea shop roleplay depicting a 16-hour shift earning just ₹700.',
      '01:43 - 02:10: Finance Anna brand identity and emotional trust proposition.',
      '06:06 - 06:52: Macro market validation using official NITI Aayog research.',
    ],
    topCriticalWeaknesses: [
      '07:49 - 08:34: Jury cross-examination exposing the predatory loan monetization flaw.',
      '08:35 - 09:32: Defensive co-founder response during jury cross-examination.',
      '10:49 - 11:00: Pitch ended abruptly with "Thank you ma\'am" with no clear ask.',
    ],
    deliveryObservations:
      'Great opening roleplay chemistry between co-founders; vocal cadence was engaging. However, when the jury questioned regulatory compliance and debt ethics, founders lost posture and gave circular defenses.',
    languageAndClarityNote:
      'Seamless bilingual blend of Tamil and English made complex fintech concepts accessible to the audience.',
  },
  redFlags: RED_FLAGS.map((rf) => ({
    id: rf.id,
    title: rf.title,
    severity: rf.severity as any,
    description: rf.description,
    investorConcern: rf.investorConcern,
    remedy: rf.remedy,
  })),
  topFixes: TOP_10_IMPROVEMENTS.slice(0, 5).map((fix) => ({
    rank: fix.rank,
    title: fix.title,
    currentIssue: fix.currentIssue,
    recommendedChange: fix.recommendedChange,
    estimatedScoreImpact: `+${(0.8 - fix.rank * 0.1).toFixed(1)} pts`,
  })),
  juryQuestions: JURY_QUESTIONS_POOL.slice(0, 6).map((jq) => ({
    id: jq.id,
    category:
      jq.category === 'Problem'
        ? 'Business Model & Monetization'
        : jq.category === 'Product'
        ? 'Technology & AI Moat'
        : 'Traction & Unit Economics',
    difficulty: jq.id === 'jq-08' ? 'Killer' : 'Hard',
    question: jq.question,
    whyJudgeAsks: jq.whyJudgeAsks,
    sampleWinningAnswer: jq.sampleWinningAnswer,
    commonPitfall: jq.missingInfo,
  })),
  transcript: TAMIL_ENGLISH_TRANSCRIPT.map((t) => ({
    timestamp: t.time,
    speaker: t.speaker,
    originalText: t.tamil,
    englishTranslation: t.english,
    language: 'Tamil / English',
    isKeyMoment: !!t.badge,
  })),
  juryExchangeHighlight: {
    judgeName: 'Lead Jury Member (Fintech Angel & Academic)',
    judgeRole: 'Jury Chairperson',
    judgeObjection:
      '"You started your pitch by saying gig workers are trapped with daily loans and tight expenses. Yet your solution\'s monetization is pushing credit cards and personal loans onto them! Aren\'t you adding more debt burden to someone who is already struggling?"',
    founderResponseInPitch:
      '"Actual data namma use pannala ma\'am... namma analyze panni advice panrom. Safe score vachi loan and insurance possibilities connect panrom."',
    recommendedWinningReframe:
      '"You are 100% right, ma\'am. Pushing unsecured credit cards onto volatile earners is dangerous. That is why our monetization will strictly pivot away from debt to zero-interest Earned Wage Access (EWA) and micro-savings recurring deposits where we earn a nominal 0.5% management fee."',
  },
};

function SCORECARD_CATEGORIES_DATA() {
  return [
    { name: '1. Problem Clarity', weight: '10%', score: 8.5, reason: 'Real-world gig worker income volatility and debt stress.' },
    { name: '2. Solution Quality', weight: '10%', score: 6.8, reason: 'Vernacular voice assistant concept with daily Safe-to-Spend alerts.' },
    { name: '3. Market Opportunity', weight: '10%', score: 8.5, reason: 'NITI Aayog 7.7M to 23.5M expansion projection.' },
    { name: '4. Business Model', weight: '12%', score: 3.5, reason: 'Predatory conflict: Selling credit cards/loans to debt-strapped workers.' },
    { name: '5. Product Clarity', weight: '8%', score: 6.5, reason: 'Safe Score and voice alerts clear; behavioral mechanics vague.' },
    { name: '6. Competitive Advantage', weight: '8%', score: 4.5, reason: 'Underestimates KarmaLife/Jar and open UPI competition.' },
    { name: '7. Traction & Validation', weight: '10%', score: 2.0, reason: 'Zero user interviews, waitlist, or pilot metrics disclosed.' },
    { name: '8. Technical Feasibility', weight: '8%', score: 6.2, reason: 'Account Aggregator APIs feasible; scoring algorithms unproven.' },
    { name: '9. Scalability', weight: '8%', score: 7.0, reason: 'Pan-India multilingual voice expansion potential.' },
    { name: '10. Team Readiness', weight: '6%', score: 5.2, reason: 'Energetic stage roleplay, but faltered during regulatory Q&A.' },
    { name: '11. Regulatory Readiness', weight: '10%', score: 4.0, reason: 'Dismissed RBI/SEBI/LSP digital lending framework requirements.' },
  ];
}
