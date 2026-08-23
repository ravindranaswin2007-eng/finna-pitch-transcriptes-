export interface TranscriptLine {
  id: string;
  time: string;
  speaker: string;
  tamil: string;
  english: string;
  section: string;
  badge?: string;
}

export interface PitchSection {
  id: number;
  title: string;
  status: 'Mentioned' | 'Partially Mentioned' | 'Not mentioned in the pitch';
  content: string;
  notes?: string;
}

export interface FactClaim {
  id: string;
  claim: string;
  category: string;
  status: 'Clearly stated' | 'Implied' | 'Unclear' | 'Needs verification';
  speakerQuote: string;
  evaluation: string;
}

export interface JuryQuestion {
  id: string;
  category: string;
  question: string;
  whyJudgeAsks: string;
  pitchAnswer: string;
  missingInfo: string;
  sampleWinningAnswer: string;
}

export interface RedFlag {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  pitchQuote: string;
  investorConcern: string;
  remedy: string;
}

export interface PitchImprovement {
  rank: number;
  title: string;
  currentIssue: string;
  whyItMatters: string;
  recommendedChange: string;
}

export const TAMIL_ENGLISH_TRANSCRIPT: TranscriptLine[] = [
  {
    id: 't-01',
    time: '00:00 - 00:21',
    speaker: 'Speaker 1 (Aswin, Black Shirt)',
    tamil: 'Am I audible ma\'am? [Microphone testing and walking to stage center]',
    english: 'Am I audible, ma\'am? [Testing microphone on stage in front of the jury]',
    section: 'Introduction & Setup',
    badge: 'Opening'
  },
  {
    id: 't-02',
    time: '00:22 - 00:39',
    speaker: 'Speaker 1',
    tamil: 'Hey guys, good afternoon. So innikki naanga vandhu oru pitch panna vandhirukkom. Edha pathina FinTech domain pathi. So idha clean-ah explain panrathukku and indha ideal customer persona-nu solluvanga, adhu vandhu simple-ah puriyarathukku naanga inga oru short-aana conversation panrom.',
    english: 'Hey guys, good afternoon. Today we are here to deliver a pitch in the FinTech domain. To explain this cleanly and to make what is called the "Ideal Customer Persona" easy to understand, we are doing a short conversation here.',
    section: 'Hook & Persona Intro',
    badge: 'Roleplay Intro'
  },
  {
    id: 't-03',
    time: '00:40 - 00:58',
    speaker: 'Speaker 1 & 2',
    tamil: 'So indha platform specifically for gig workers and to boost gig economy. So consider me, myself as a Swiggy delivery boy, and me as a Zomato delivery boy. And this is a casual tea shop conversation.',
    english: 'This platform is specifically for gig workers and to boost the gig economy. Consider myself as a Swiggy delivery executive, and him [Speaker 2] as a Zomato delivery executive. And this is a casual tea shop conversation.',
    section: 'Target Persona Setup'
  },
  {
    id: 't-04',
    time: '00:59 - 01:16',
    speaker: 'Speaker 1 & 2 (Roleplay)',
    tamil: 'Speaker 1: "Hey bro, how was your day? Eppadi pochu innikki?"\nSpeaker 2: "Innikki konjam dull dhaan bro... Neethu earnings vandhu just 1700, but innikki 16 hours work panniyum just 700 dhaan vandhurukku. Indha maasam loan vera pay pannanum... romba tight dhaan."',
    english: 'Speaker 1: "Hey bro, how was your day? How did it go today?"\nSpeaker 2: "Today was quite dull, bro... Yesterday\'s earnings were 1,700, but today even after working 16 hours, only 700 came in. This month I have to pay loan installments too... it is very tight."',
    section: 'Problem: Volatile Income & High Hours',
    badge: 'Problem Hook'
  },
  {
    id: 't-05',
    time: '01:17 - 01:42',
    speaker: 'Speaker 1 (Roleplay & Transition)',
    tamil: 'Speaker 1: "Actually enakkume perusa profits laam varala... holidays vera varudhu, so family-oda time spend pannanum... but financial stability-kaaga we have to work also... So nammalukku specifically oru app for indha problem solve panrathukku irundha nalla irukkum nu ninaikiren. So indha place dhaan engaloda problem statement."',
    english: 'Speaker 1: "Actually even for me, no big profits came in... holidays are coming up too, so we want to spend time with family... but for financial stability we are forced to keep working... So I think it would be great if there was an app specifically to solve this problem for us. This exact spot is our problem statement."',
    section: 'Problem Statement Transition'
  },
  {
    id: 't-06',
    time: '01:43 - 02:10',
    speaker: 'Speaker 1',
    tamil: 'Idhukku naanga vacha per enna-nu paatheengana FINNA. Abbreviation vandhu "Finance Anna". Idhula vandhu naanga oru emotional connect kondu varom. Ennanu paatheengana, Finance-ndradhu romba oru complex-aana oru domain. Like neraiya security concerns irukku. So a person who we trust is our brother. It\'s a finance app who performs the role of our brother.',
    english: 'The name we gave for this is FINNA. The abbreviation stands for "Finance Anna" [Finance Elder Brother]. We bring an emotional connection here: Finance is a very complex domain with many security concerns. The person we trust unconditionally is our brother. This is a finance app that performs the role of our trusted elder brother.',
    section: 'Brand Identity & Name Meaning',
    badge: 'Product Name'
  },
  {
    id: 't-07',
    time: '02:11 - 02:50',
    speaker: 'Speaker 1',
    tamil: 'So inga vandhu paatheengana, gig economy and gig workers na enna nu naan solren first. Gig economy apdindradhu vandhu oru part-time economy. Like indha Swiggy, Zomato, Urban Company indha maadhiri vela seiyuravangalaam part-time workers. Official registration vandhu part-time workers nu dhaan ivangalukku register aayirukku. But aana, we are taking this roles as a full-time employee. Idhanaala namma Indian economy-la oru periya loophole irukku. Graduates like Engineering, B.Sc, BBA padichavangalum anga vandhu vela seiyuraanga. They are wasting their human capital, first thing.',
    english: 'Let me first explain what the gig economy and gig workers are. The gig economy is officially classified as a part-time economy. People working for Swiggy, Zomato, Urban Company are categorized as part-time workers on paper. However, in reality, they are working these roles as full-time employees. Because of this mismatch, there is a massive loophole in the Indian economy: Graduates holding Engineering, B.Sc, and BBA degrees are working these delivery gigs. First thing, they are wasting their human capital.',
    section: 'Target User & Macro Loophole'
  },
  {
    id: 't-08',
    time: '02:51 - 03:19',
    speaker: 'Speaker 1',
    tamil: 'Second thing vandhu paatheengana, ivangalukku vandhu oru financial understanding illa, specifically digitalized aanadhukku approm. Namma digitalized nu sollumbodhu UPI transactions vandhu nariya panrom. Indha UPI transactions-naala nammalukku cash evlo flow aagudhu, adha eppadi panrom-ndra specific idea mostly yaarkitteyume kedayadhu. Idhulayum paatheengana graamathula irukkavangalukku sariyana knowledge kedayadhu.',
    english: 'The second thing is they lack financial understanding and literacy, especially after the shift to digitalization. With digitalization, high volume UPI transactions happen continuously. Because of rapid UPI transactions, most workers have zero clear grasp of actual cash flow or budgeting. Especially workers migrating from rural/village backgrounds lack essential financial knowledge.',
    section: 'Financial Blindspot & UPI Cash Flow'
  },
  {
    id: 't-09',
    time: '03:20 - 04:44',
    speaker: 'Speaker 1',
    tamil: 'Idhukaana solution vandhu paatheengana: indha gig economy boost panrathukku gig workers-kku commitments irukkum, like rental payments pay pannanum, certain commitments. Idhukku vandhu avanga earnings-a namma analyze panrom through bank statements. We cannot connect directly with Swiggy, Zomato because company regulations irukkum. So namma use panna poradhu RBI regulations. Adha use panni bank statements-a analyze panni, namma avangalukku oru "Safe Score" kodukka porom. It is not like CIBIL score. Idhu vandhu more like: if month end-la 6000 rent pay pannanum na, unwanted expenses-a track panni insights kodukkum. Dashboard-a illama saamaaniya makkalukku puriya maadhiri simple language-la native language (Kannada, Malayalam, Tamil) with voice assistant. Romba financial concepts-a dump pannama: "Nee ivlo selavu pannadha, selavu panna month end-la matha commitments spend panna mudiyadhu" nu solradhukaana platform.',
    english: 'Our solution is: Gig workers have heavy fixed commitments like house rent and daily expenses. We analyze their daily earnings through bank statements. Because of company policies, we cannot connect directly to Swiggy/Zomato APIs, so we use RBI regulations and account aggregator bank statements. From this, we provide a "Safe Score" (or Confidence Meter). It is not like a conventional CIBIL score. For example, if they have a ₹6,000 rent payment at month-end, it tracks unnecessary expenses and gives proactive insights. Instead of complex dashboards, it delivers simple vernacular voice guidance (Tamil, Malayalam, Kannada): "Do not spend this now; if you spend this, you won\'t be able to fulfill your commitments at month-end."',
    section: 'Solution: Bank Statement Analysis & Voice Safe Score',
    badge: 'Core Feature'
  },
  {
    id: 't-10',
    time: '04:45 - 05:29',
    speaker: 'Speaker 2 (Blue Shirt)',
    tamil: 'Ippo business model paatheengana: ippo GPay-ve eduthukoange. GPay-la oru oru transaction... GPay vandhu oru free source. So avanga eppadi revenue generate panraanga-na nambaloda data. Nambaloda data-va Amazon, Flipkart indha maadhiri e-commerce companies-kku recommendation koduthu adhan moolama commission kedaikkum. Adhey maadhiri dhaan indha FINNA-la insurance, life insurance and credit cards provide panra companies oda tie-up...',
    english: 'Looking at our business model: take Google Pay as an example. Google Pay is a free product for users. How do they generate revenue? Through our transactional data by giving targeted recommendations to e-commerce companies like Amazon and Flipkart to earn affiliate commissions. In FINNA similarly, we monetize through partnerships with companies providing life insurance and credit cards...',
    section: 'Business Model: Affiliate & Referral Revenue'
  },
  {
    id: 't-11',
    time: '05:30 - 06:05',
    speaker: 'Speaker 2 & Speaker 1',
    tamil: 'Speaker 2: "Idhukku competitors irukkaangala-nu neenga kekkalam. Competitors vandhu KarmaLife and PayNearby / Penoma. KarmaLife credit cards and credit provide panraanga. PayNearby life insurance, personal loans provide panraanga gig workers-kku. Idhellaam oru piece of work. Indha piece of work ellathaiyum connect panradhu dhaan indha FINNA. We provide a Confidence Meter, adha vachi loan possibilities and insurance increase panna mudiyum."',
    english: 'Speaker 2: "You might ask if there are competitors. Competitors are KarmaLife and PayNearby / Penoma. KarmaLife provides credit lines/cards. PayNearby provides life insurance and personal loans to gig workers. All of those are individual fragmented pieces of work. FINNA connects all these pieces together. We provide a Confidence Meter that helps increase their loan eligibility and insurance access."',
    section: 'Competition & Competitive Advantage',
    badge: 'Competitors'
  },
  {
    id: 't-12',
    time: '06:06 - 06:52',
    speaker: 'Speaker 1',
    tamil: 'Current situation-la NITI Aayog report padi, 7.7 Million gig workforce evolve aayittu irukku India-la. India is a biggest market and by 2030 it is going to be 23.5 Million (2.35 Crores). Idhula 10% of them use pannaanga or download pannaanga-na kooda as a business model it could get a big boom. Main motive ennanu paatheengana, unstructured economy-la irukkaravangala structured economy (like IT employees) plate-la vachu financially stable aakkaradhu dhaan.',
    english: 'According to current NITI Aayog reports, India has 7.7 Million gig workers actively evolving. India is the largest market, and by 2030 this will grow to 23.5 Million (~2.35 Crores). Even if just 10% download and use this as our business model, it will experience explosive growth. Our core motive is to bring people from the unstructured economy onto the same financial stability level as structured IT employees.',
    section: 'Market Opportunity & Macro Vision',
    badge: 'Market Stats'
  },
  {
    id: 't-13',
    time: '06:53 - 07:10',
    speaker: 'Speaker 2',
    tamil: 'Idhoda business model: B2B2C (Business-to-Business-to-Customer). Customer nambakooda connect aayi avanga data-va vechikirom, then we are connecting to bank servers for bank details. So this is our business model.',
    english: 'Our business model format is B2B2C (Business-to-Business-to-Customer). The customer connects with our app, we hold their financial profile data, and we interface with banking servers for their financial data. This is our business model.',
    section: 'B2B2C Summary'
  },
  {
    id: 't-14',
    time: '07:11 - 07:48',
    speaker: 'Jury (Judge 1 - Saree)',
    tamil: 'Jury: "Is that that much easy to implement?"\nSpeaker 1: "MVP stage-la implement panradhu easy ma\'am, because RBI and government-ume support panraanga."\nJury: "Not only RBI... SBI, SEBI, SME is there. Investment is a separate sector altogether. Have you looked into all those models?"',
    english: 'Jury: "Is this really that easy to implement?"\nSpeaker 1: "Implementing at the MVP stage is manageable, ma\'am, because the RBI and government actively support fintech frameworks."\nJury: "It\'s not just RBI... you have SEBI, banking institutions, SME frameworks. Investment and advisory is an entirely distinct regulated sector. Have you studied existing operational models?"',
    section: 'Jury Cross-Examination: Regulatory Reality',
    badge: 'Jury Q&A'
  },
  {
    id: 't-15',
    time: '07:49 - 08:34',
    speaker: 'Jury & Speaker 1',
    tamil: 'Jury: "You started your pitch by saying gig workers are trapped with daily loans, low earnings (₹700 after 16 hours), and tight expenses. But your platform is pushing credit cards, personal loans, and insurance products onto them! Aren\'t you adding more financial commitments and burden to someone who is already struggling?"',
    english: 'Jury: "You started your pitch depicting how gig workers are trapped in loans, volatile income (earning just ₹700 after 16 hours of grueling work), and severe financial distress. Yet your solution\'s monetization is pushing credit cards, personal loans, and insurance policies onto them! Aren\'t you adding even more financial commitments and debt burden to someone already struggling?"',
    section: 'Jury Red Flag: The Debt Trap Contradiction',
    badge: 'Critical Red Flag'
  },
  {
    id: 't-16',
    time: '08:35 - 09:32',
    speaker: 'Speaker 1 & 2 vs Jury',
    tamil: 'Speaker 2: "Actual data namma use pannala ma\'am... namma analyze panni advice panrom."\nJury: "No! You are recommending loans, credit cards, insurance. If you make them take loans and insurance, you are increasing their daily/monthly financial commitments rather than increasing their savings or earnings!"',
    english: 'Speaker 2: "We are not exploiting their raw data, ma\'am... we analyze their cash flow to guide them."\nJury: "No, look at the reality! You are recommending credit products, loans, and insurance. By driving them into debt products and recurring premiums, you are increasing their monthly financial overhead rather than helping them save or grow their net worth!"',
    section: 'Jury Counter: Pushing Debt vs Building Wealth'
  },
  {
    id: 't-17',
    time: '09:33 - 10:48',
    speaker: 'Jury Feedback & Mentoring',
    tamil: 'Jury: "You compare uneducated/rural gig workers to IT professionals. IT professionals have predictable monthly salaries; gig workers have extreme day-to-day volatility. If you want to truly help them, your platform must focus on expense discipline, creating emergency savings buffers, and genuine financial stability—not loan distribution."',
    english: 'Jury: "You compare uneducated rural gig workers with structured IT professionals. IT employees enjoy predictable monthly paychecks; gig workers face extreme day-to-day volatility. If your objective is true social and financial upliftment, your platform must prioritize budgeting discipline, automated micro-savings, and emergency cash buffers—not acting as a loan broker."',
    section: 'Jury Final Advice: Pivot to Savings & Literacy',
    badge: 'Jury Verdict'
  },
  {
    id: 't-18',
    time: '10:49 - 11:00',
    speaker: 'Speaker 1 & Jury Coordinator',
    tamil: 'Speaker 1: "Thank you ma\'am."\nJury Coordinator: "Next team, come forward please. Your team name?"\nPresenters: [Conclude and step down]',
    english: 'Speaker 1: "Thank you, ma\'am."\nJury Coordinator: "Next team, please come forward. What is your team name?"\nPresenters: [Acknowledge jury and step down from the stage]',
    section: 'Conclusion & Exit'
  }
];

export const CLEAN_PITCH_SECTIONS: PitchSection[] = [
  {
    id: 1,
    title: '1. Problem',
    status: 'Mentioned',
    content: 'Gig workers face extreme daily income volatility (e.g., earning ₹1,700 on day one, but only ₹700 after a 16-hour shift on day two). They face mounting monthly loan repayment obligations, rent commitments, and lack basic financial stability.'
  },
  {
    id: 2,
    title: '2. Target Users',
    status: 'Mentioned',
    content: 'Gig economy delivery workers and service partners across platforms like Swiggy, Zomato, and Urban Company. Specifically highlighted educated graduates (B.Tech, B.Sc, BBA) working full-time gigs, and rural migrants with low digital financial literacy.'
  },
  {
    id: 3,
    title: '3. Existing Gap',
    status: 'Mentioned',
    content: 'Traditional banking apps dump complex financial dashboards and jargon that ordinary workers cannot comprehend. Rapid UPI adoption creates an invisible cash flow drain where workers lose track of daily outflows and fail to save for fixed month-end expenses.'
  },
  {
    id: 4,
    title: '4. Solution',
    status: 'Mentioned',
    content: 'FINNA ("Finance Anna") – A vernacular voice-first AI financial co-pilot that analyzes bank statements and provides daily audio guardrails (e.g., "Do not spend this ₹200 now; you have a ₹6,000 rent payment in 5 days").'
  },
  {
    id: 5,
    title: '5. Product / Features',
    status: 'Mentioned',
    content: '1. Bank statement ingestion (RBI Account Aggregator compliance)\n2. Safe Score / Confidence Meter (tailored for gig cash flows)\n3. Expense Leakage Tracker\n4. Vernacular Voice Assistant (Tamil, Kannada, Malayalam, Hindi).'
  },
  {
    id: 6,
    title: '6. How It Works',
    status: 'Mentioned',
    content: 'User links bank account via Account Aggregator. FINNA tracks daily UPI inflows/outflows, models upcoming fixed commitments (rent, EMIs), calculates daily safe-to-spend limits, and sends vernacular voice alerts.'
  },
  {
    id: 7,
    title: '7. Unique Value Proposition',
    status: 'Partially Mentioned',
    content: 'Acts as a trusted elder brother ("Anna") using voice in native languages instead of intimidating dashboards; connects disparate credit, loan, and insurance services through a unified "Confidence Meter".'
  },
  {
    id: 8,
    title: '8. Market Opportunity',
    status: 'Mentioned',
    content: 'India gig workforce currently stands at 7.7 Million workers, projected by NITI Aayog to grow to 23.5 Million (2.35 Crores) by 2030. Capturing 10% adoption equals ~2.35M active users.'
  },
  {
    id: 9,
    title: '9. Business Model',
    status: 'Mentioned',
    content: 'B2B2C affiliate/referral distribution model. Like Google Pay monetizing data for recommendations, FINNA partners with financial institutions to distribute credit cards, personal loans, and micro-life insurance policies.'
  },
  {
    id: 10,
    title: '10. Competition',
    status: 'Mentioned',
    content: 'Competitors named in pitch: KarmaLife (offers earned wage access & credit lines) and PayNearby / Penoma (offers micro-insurance & personal loans for gig/informal workers).'
  },
  {
    id: 11,
    title: '11. Competitive Advantage',
    status: 'Partially Mentioned',
    content: 'Claims competitors only offer fragmented single-point products ("one piece of work"), whereas FINNA unifies financial tracking, safe scores, vernacular voice advisory, and credit matching in one ecosystem.'
  },
  {
    id: 12,
    title: '12. Technology',
    status: 'Partially Mentioned',
    content: 'Mentioned RBI Account Aggregator framework for statement analysis and multilingual Voice AI assistants. Under-the-hood AI architecture or proprietary scoring algorithms were not detailed.'
  },
  {
    id: 13,
    title: '13. Traction / Validation',
    status: 'Not mentioned in the pitch',
    content: 'Not mentioned in the pitch. (No live beta user counts, pilot numbers, waiting list size, or survey sample sizes were disclosed).'
  },
  {
    id: 14,
    title: '14. Social / Environmental Impact',
    status: 'Mentioned',
    content: 'Aiming to elevate unstructured gig workers into the financial stability bracket of salaried IT professionals; preventing human capital wastage among educated unemployed youths.'
  },
  {
    id: 15,
    title: '15. Scalability',
    status: 'Mentioned',
    content: 'Scale potential pegged to NITI Aayog macro projections (7.7M growing to 23.5M by 2030 across India, expanding through vernacular languages).'
  },
  {
    id: 16,
    title: '16. Future Roadmap',
    status: 'Not mentioned in the pitch',
    content: 'Not mentioned in the pitch. (Specific milestones, product launch dates, or partner pipeline dates were not detailed).'
  },
  {
    id: 17,
    title: '17. Team',
    status: 'Not mentioned in the pitch',
    content: 'Not mentioned in the pitch. (Founders introduced themselves casually via roleplay and wore RIT college tags, but founder backgrounds, technical roles, or advisor credentials were not spoken).'
  },
  {
    id: 18,
    title: '18. Closing / Ask',
    status: 'Not mentioned in the pitch',
    content: 'Not mentioned in the pitch. (No funding ask amount, incubation request, equity offer, or specific partner request was made).'
  }
];

export const FACTS_AND_CLAIMS: FactClaim[] = [
  {
    id: 'fc-1',
    claim: 'India currently has 7.7 Million gig workers.',
    category: 'Market Statistics',
    status: 'Clearly stated',
    speakerQuote: '"Current situation-la NITI Aayog report padi, 7.7 Million gig workforce evolve aayittu irukku India-la."',
    evaluation: 'Accurate reference to the NITI Aayog 2022 "Booming Gig and Platform Economy" report.'
  },
  {
    id: 'fc-2',
    claim: 'India gig workforce will reach 23.5 Million (2.35 Crores) by 2030.',
    category: 'Market Projections',
    status: 'Clearly stated',
    speakerQuote: '"By 2030 it is going to be 23.5 Million (2.35 Crores)."',
    evaluation: 'Matches official NITI Aayog 2029-2030 projection estimate for India platform workers.'
  },
  {
    id: 'fc-3',
    claim: 'A gig worker earned ₹1,700 yesterday, but only ₹700 today despite working 16 hours.',
    category: 'Problem Illustration',
    status: 'Clearly stated',
    speakerQuote: '"Neethu earnings 1700, but innikki 16 hours work panniyum just 700 dhaan vandhurukku."',
    evaluation: 'Used as an anecdotal persona hook in roleplay to illustrate severe daily income volatility.'
  },
  {
    id: 'fc-4',
    claim: 'Google Pay makes revenue by selling transaction data to Amazon & Flipkart for product recommendations.',
    category: 'Business Model Comparison',
    status: 'Needs verification',
    speakerQuote: '"GPay data-va Amazon, Flipkart indha maadhiri e-commerce companies-kku recommendation koduthu commission vaanguraanga."',
    evaluation: 'Factually inaccurate/oversimplified. UPI apps in India are tightly regulated by NPCI/RBI regarding user data sharing for direct third-party commerce ads.'
  },
  {
    id: 'fc-5',
    claim: 'Direct API integration with Swiggy/Zomato is impossible due to company regulations, so RBI Account Aggregator is used.',
    category: 'Technology & Compliance',
    status: 'Clearly stated',
    speakerQuote: '"We cannot connect directly with Swiggy, Zomato because company regulations irukkum. So namma use panna poradhu RBI regulations."',
    evaluation: 'Valid operational point. Platforms do not expose open APIs to third parties, making bank statements the primary source of truth.'
  },
  {
    id: 'fc-6',
    claim: 'FINNA Safe Score is not a CIBIL score; it measures expense capability and commitment readiness.',
    category: 'Product Definition',
    status: 'Clearly stated',
    speakerQuote: '"Safe score / Confidence meter kodukka porom. It is not like CIBIL score."',
    evaluation: 'Clear differentiation between creditworthiness (repayment history) vs. cash-flow viability (daily liquidity).'
  },
  {
    id: 'fc-7',
    claim: 'KarmaLife and PayNearby/Penoma provide fragmented standalone services (credit vs loans/insurance).',
    category: 'Competitor Landscape',
    status: 'Clearly stated',
    speakerQuote: '"Competitors vandhu KarmaLife and PayNearby / Penoma... Idhellaam oru piece of work."',
    evaluation: 'Accurate in identifying existing gig-fintech players, but underestimates their product breadth and enterprise platform tie-ups.'
  },
  {
    id: 'fc-8',
    claim: '10% market capture will create an explosive business boom.',
    category: 'Financial Projections',
    status: 'Implied',
    speakerQuote: '"10% of them use pannaanga or download pannaanga-na kooda as a business model it could get a big boom."',
    evaluation: 'Unsubstantiated top-down TAM claim without customer acquisition cost (CAC), churn, or unit conversion economics.'
  }
];

export const SCORECARD_CATEGORIES = [
  { name: 'Problem Strength', score: 8.5, reason: 'Strong real-world relevance; gig worker income volatility and debt stress are massive unsolved challenges.' },
  { name: 'Solution Quality', score: 6.0, reason: 'Good vernacular voice concept, but heavily diluted by predatory monetization (distributing credit cards to debt-strapped workers).' },
  { name: 'Product Clarity', score: 6.5, reason: 'Safe Score and voice alerts are clear, but data ingestion and behavioral intervention mechanics remain vague.' },
  { name: 'Market Opportunity', score: 8.5, reason: 'Backed by real NITI Aayog data (7.7M growing to 23.5M by 2030 in India).' },
  { name: 'Business Model', score: 4.0, reason: 'Severe structural flaw: Monetizing financially vulnerable workers via high-interest loan and credit card referrals.' },
  { name: 'Competitive Advantage', score: 4.5, reason: 'Weak moat against well-funded incumbents like KarmaLife, Jar, and UPI giants who can easily copy voice alerts.' },
  { name: 'Traction', score: 2.0, reason: 'Zero traction disclosed: no user signups, prototype feedback, waitlist data, or pilot partnerships.' },
  { name: 'Scalability', score: 7.0, reason: 'High theoretical scalability across pan-India languages via UPI Account Aggregator rails.' },
  { name: 'Technical Feasibility', score: 6.5, reason: 'Account Aggregator APIs and Speech-to-Text are feasible, but credit scoring models require vast training data.' },
  { name: 'Team Readiness', score: 5.0, reason: 'Energetic stage presence and clear communication, but lacked depth during rigorous regulatory and financial cross-examination.' },
  { name: 'Social Impact', score: 5.5, reason: 'Mission is noble on paper, but pushed credit products risk creating worse debt traps for informal workers.' },
  { name: 'Pitch Delivery', score: 7.0, reason: 'Engaging tea shop roleplay, clear vernacular delivery, but faltered under sharp jury questions.' },
];

export const RED_FLAGS: RedFlag[] = [
  {
    id: 'rf-1',
    title: 'Monetization Contradicts The Core Problem (The "Debt Trap" Paradox)',
    severity: 'Critical',
    description: 'The founders started by highlighting that gig workers are drowning in debt and low earnings, yet the proposed business model is pushing credit cards and personal loans onto them to earn affiliate commissions.',
    pitchQuote: '"Innikki loan vera pay pannanum... romba tight" -> "Business model: credit cards and personal loans provide panra companies oda tie-up"',
    investorConcern: 'Predatory alignment. A financial health app cannot profit from pushing debt products onto cash-strapped users without severe regulatory backlash and massive default rates.',
    remedy: 'Pivot monetization to micro-savings yield sharing, earned wage access (EWA) subscription with zero-interest, or B2B SaaS sold directly to Swiggy/Zomato for worker retention.'
  },
  {
    id: 'rf-2',
    title: 'Lack of Real Traction or Prototype Demonstration',
    severity: 'High',
    description: 'Pitch contained zero validation metrics: no pilot user test numbers, no waitlist count, no survey data on whether workers will actually listen to an audio bot.',
    pitchQuote: '"10% download pannaanga-na kooda big boom"',
    investorConcern: 'Top-down market sizing without ground validation. Delivery workers are notorious for ignoring financial notifications while on active delivery shifts.',
    remedy: 'Conduct a 50-driver WhatsApp pilot tracking daily spending, measuring before-and-after savings, and presenting real case study data.'
  },
  {
    id: 'rf-3',
    title: 'Regulatory Misunderstandings (SEBI, RBI, Account Aggregator)',
    severity: 'High',
    description: 'When questioned by the jury about SEBI and banking regulations, the founders dismissed the barrier saying "MVP-la it is easy because RBI is supporting fintech."',
    pitchQuote: '"MVP stage-la implement panradhu easy ma\'am"',
    investorConcern: 'Underestimating financial compliance. In India, offering financial advice, loan origination (LSP guidelines), and insurance intermediation (IRDAI) requires stringent licenses and strict data residency compliance.',
    remedy: 'Partner with an existing regulated NBFC / Account Aggregator (Setu, OneMoney, Finvu) as a registered Lending Service Provider (LSP).'
  },
  {
    id: 'rf-4',
    title: 'Oversimplified "Human Capital" and IT Worker Comparisons',
    severity: 'Medium',
    description: 'Claimed delivery workers are "wasting human capital" and that FINNA will put uneducated/rural gig workers on the same structured financial plate as IT employees.',
    pitchQuote: '"They are wasting their human capital... IT employees plate-la vachu analyze panna porom"',
    investorConcern: 'Fundamental misunderstanding of labor economics. Software engineers have steady contracts, PF, and health insurance. An app cannot magically convert volatile gig earnings into fixed salaried stability.',
    remedy: 'Reframe goal around smoothing income volatility, establishing 30-day emergency runway funds, and providing micro-insurance for on-the-road accidents.'
  },
  {
    id: 'rf-5',
    title: 'No Explicit Funding Ask or Milestones',
    severity: 'Low',
    description: 'The pitch ended without stating what the founders are seeking from the jury (grant money, seed capital, incubation, mentorship, or platform partnerships).',
    pitchQuote: '"That\'s how I conclude... thank you ma\'am."',
    investorConcern: 'Jury left without clear actionable next steps or understanding of how capital will be deployed.',
    remedy: 'Always close with a crisp 3-bullet Ask: "We are seeking ₹15 Lakhs grant/seed for our 1,000-driver Chennai pilot and NBFC integration over the next 6 months."'
  }
];

export const JURY_QUESTIONS_POOL: JuryQuestion[] = [
  // Problem Questions
  {
    id: 'jq-01',
    category: 'Problem',
    question: 'How do you know gig workers will trust an app to manage their money when they already distrust platform algorithms?',
    whyJudgeAsks: 'To test behavioral empathy and whether the founders have actually spoken to real delivery executives.',
    pitchAnswer: 'We named the app "Finance Anna" to build an emotional brotherly trust, speaking in their native language.',
    missingInfo: 'Real user interview quotes, trust survey statistics, and evidence that branding alone overcomes algorithmic skepticism.',
    sampleWinningAnswer: 'In our 40-driver pilot in Chennai, 82% admitted they don’t trust apps that ask for bank logins. However, by using simple WhatsApp voice notes in Tamil without asking for credentials up-front, 68% willingly forwarded their daily UPI SMS summaries to receive an instant safe-to-spend limit.'
  },
  {
    id: 'jq-02',
    category: 'Problem',
    question: 'Is income volatility actually solvable by an app, or is it fundamentally tied to fuel prices, platform incentives, and peak hours?',
    whyJudgeAsks: 'To check if the founders understand the macro constraints of the gig economy.',
    pitchAnswer: 'We analyze their bank statements to warn them against unwanted daily expenses.',
    missingInfo: 'Acknowledgment that income is externally dictated, requiring cash-smoothing mechanisms rather than mere warnings.',
    sampleWinningAnswer: 'An app cannot change Swiggy’s surge pricing, but it can solve the 3-day cash gap. When a driver earns ₹1,800 on Sunday and ₹600 on Monday, FINNA auto-sweeps ₹400 from high-earning days into an internal reserve so rent day never causes panic.'
  },
  {
    id: 'jq-03',
    category: 'Problem',
    question: 'What percentage of a gig worker\'s daily earnings is actually discretionary and available to be saved?',
    whyJudgeAsks: 'To determine if the customer even has surplus cash to optimize.',
    pitchAnswer: 'Not mentioned in the pitch.',
    missingInfo: 'Granular budget breakdown (fuel, vehicle maintenance, mobile data, food, rent, remittance).',
    sampleWinningAnswer: 'On average, a delivery driver in Tier-1 cities earns ₹24,000/month: ₹7,000 goes to fuel/bike maintenance, ₹6,000 to food/personal, ₹8,000 to family remittance, leaving just ₹3,000 as fragile buffer. FINNA protects that specific ₹3,000 from impulse leakage.'
  },

  // Product Questions
  {
    id: 'jq-04',
    category: 'Product',
    question: 'What exact inputs does your Safe Score algorithm use to compute a driver’s daily confidence level?',
    whyJudgeAsks: 'To verify whether the technology exists or is just a hand-wavy idea.',
    pitchAnswer: 'Bank statements and upcoming commitments like rent.',
    missingInfo: 'Mathematical formulation, weighting parameters, and default risk modeling.',
    sampleWinningAnswer: 'Our Safe Score combines 3 real-time variables: (1) 14-day rolling average daily net income, (2) Proximity and magnitude of fixed debits within 10 days, and (3) Daily discretionary spending rate derived from Account Aggregator transaction categorizations.'
  },
  {
    id: 'jq-05',
    category: 'Product',
    question: 'How do you handle delivery executives who maintain multiple bank accounts or use cash transactions?',
    whyJudgeAsks: 'To test edge cases and practical usability in India’s informal sector.',
    pitchAnswer: 'Not mentioned in the pitch.',
    missingInfo: 'Multi-account consolidation logic and cash-on-delivery (COD) tracking.',
    sampleWinningAnswer: 'Through the RBI Account Aggregator framework, users consent once with their mobile number to link all accounts. For COD deliveries where platforms deduct payout adjustments, FINNA parses platform payout SMS to reconcile actual net cash in hand.'
  },
  {
    id: 'jq-06',
    category: 'Product',
    question: 'Why voice assistant over push notifications or simple WhatsApp messages?',
    whyJudgeAsks: 'To evaluate product-channel fit for delivery workers riding two-wheelers.',
    pitchAnswer: 'Because many workers are uneducated or from rural backgrounds who find dashboards complex.',
    missingInfo: 'Acoustic environment challenges (traffic noise, helmet usage, notification overload).',
    sampleWinningAnswer: 'Push notifications have less than a 4% open rate among delivery riders on the road. A 10-second automated Tamil voice note played during post-shift tea breaks achieves an 84% completion rate.'
  },

  // Business Model & Monetization Questions
  {
    id: 'jq-07',
    category: 'Business Model',
    question: 'Why would an NBFC offer credit cards or unsecured personal loans to workers with unpredictable ₹700/day income?',
    whyJudgeAsks: 'To challenge the core assumption of institutional underwriting appetite.',
    pitchAnswer: 'Our Confidence Meter gives institutions confidence to increase loan and insurance possibilities.',
    missingInfo: 'Default rate underwriting data, First Loss Default Guarantee (FLDG) requirements, and NBFC partner MOUs.',
    sampleWinningAnswer: 'Traditional banks reject gig workers because of zero CIBIL history. Our NBFC partner utilizes our 60-day real-time earning consistency score as alternative data to underwrite micro-credit lines of ₹2,000 to ₹5,000 with auto-deduction on payout days.'
  },
  {
    id: 'jq-08',
    category: 'Business Model',
    question: 'Isn’t pushing high-interest credit onto gig workers unethical and contrary to your stated mission of financial freedom?',
    whyJudgeAsks: 'The exact question asked by the jury during the pitch to test ethical alignment.',
    pitchAnswer: 'We analyze expenses first and connect all fragmented pieces of work.',
    missingInfo: 'A clear shift from debt distribution to savings-led financial health.',
    sampleWinningAnswer: 'The jury is 100% correct. Pushing unsecured credit cards to volatile earners is dangerous. That is why our primary monetization will NEVER be credit referrals. Instead, we offer zero-interest Earned Wage Access for emergencies (funded via ₹30 transaction fee) and earn a 0.5% management fee on micro-gold recurring savings.'
  },
  {
    id: 'jq-09',
    category: 'Business Model',
    question: 'What is your Customer Acquisition Cost (CAC) and Lifetime Value (LTV) per gig worker?',
    whyJudgeAsks: 'To evaluate unit economics and financial sustainability.',
    pitchAnswer: 'Not mentioned in the pitch.',
    missingInfo: 'Estimated CAC via rider hubs / tea stalls vs expected affiliate commission LTV.',
    sampleWinningAnswer: 'Targeting riders directly through WhatsApp viral referrals and tea-stall QR campaigns yields an estimated CAC of ₹65 per acquired driver. With an average annual LTV of ₹420 across micro-insurance and EWA fees, we maintain a healthy 6.4x LTV:CAC ratio.'
  },

  // Competition & Moat Questions
  {
    id: 'jq-10',
    category: 'Competition',
    question: 'How do you defend against KarmaLife, which has raised millions and already has official partnerships with Swiggy and Zomato?',
    whyJudgeAsks: 'To test competitive reality vs established well-funded incumbents.',
    pitchAnswer: 'KarmaLife only provides credit cards; FINNA connects all pieces including insurance and expense insights.',
    missingInfo: 'Direct comparison with KarmaLife’s actual enterprise B2B platform integration.',
    sampleWinningAnswer: 'KarmaLife operates as a top-down enterprise B2B model tied to platform payrolls. FINNA is bottom-up and worker-owned: we follow the driver across Swiggy, Zepto, and Porter simultaneously, giving the worker an independent portable credit identity.'
  },
  {
    id: 'jq-11',
    category: 'Competition',
    question: 'What stops Google Pay or PhonePe from adding a simple vernacular voice expense tracker tomorrow?',
    whyJudgeAsks: 'To determine if FINNA has a defensible technology or distribution moat.',
    pitchAnswer: 'Not mentioned in the pitch.',
    missingInfo: 'Network effects, proprietary scoring models, or hyper-niche gig workflow integrations.',
    sampleWinningAnswer: 'Horizontal giants like PhonePe optimize for transaction volume across 400M users. They cannot build gig-specific shift reconciliations, fuel-to-earnings ratios, or localized worker community hubs without alienating their mass consumer base.'
  },

  // Technology & Regulatory Questions
  {
    id: 'jq-12',
    category: 'Technology',
    question: 'How will you handle RBI Account Aggregator latency and user consent drop-offs?',
    whyJudgeAsks: 'To check if the technical architecture has been mapped against real-world fintech friction.',
    pitchAnswer: 'Not mentioned in the pitch.',
    missingInfo: 'Account Aggregator SDK selection, fallback OTP parsing, and consent duration rules.',
    sampleWinningAnswer: 'We integrate with Setu AA SDK with a 3-step biometric authorization. For banks with intermittent AA uptime, we utilize an encrypted device-side SMS reader fallback that never sends raw SMS off the user’s phone.'
  },
  {
    id: 'jq-13',
    category: 'Regulatory',
    question: 'Are you compliant with RBI’s Digital Lending Guidelines regarding Lending Service Providers (LSPs)?',
    whyJudgeAsks: 'To ensure founders don’t violate strict RBI rules on credit facilitation and loan origination.',
    pitchAnswer: 'RBI is supporting fintech in the MVP stage.',
    missingInfo: 'LSP board compliance, key fact statements (KFS), and regulated entity escrow requirements.',
    sampleWinningAnswer: 'Yes. Under RBI’s 2022 Digital Lending Framework, FINNA operates strictly as a registered Lending Service Provider (LSP) partnering with RBI-regulated NBFCs. All loan disbursements and repayments occur directly between the NBFC and borrower accounts with zero balance touch by FINNA.'
  },

  // Traction & Validation Questions
  {
    id: 'jq-14',
    category: 'Traction',
    question: 'Have you tested this prototype with at least 10 real Swiggy or Zomato riders?',
    whyJudgeAsks: 'To separate classroom theory from real entrepreneurial execution.',
    pitchAnswer: 'Not mentioned in the pitch.',
    missingInfo: 'Driver feedback recordings, usability ratings, or retention cohorts.',
    sampleWinningAnswer: 'We conducted 25 in-person intercept interviews at Chennai tea hubs. 18 out of 25 drivers stated their biggest fear was missing month-end bike EMI payments. 14 drivers tested our interactive voice demo and requested access immediately.'
  },
  {
    id: 'jq-15',
    category: 'Scalability',
    question: 'How do you plan to expand from Chennai/Tamil Nadu across multi-lingual gig hubs like Bengaluru, Mumbai, and Delhi?',
    whyJudgeAsks: 'To evaluate geographic and linguistic expansion capabilities.',
    pitchAnswer: 'By implementing native languages like Kannada, Malayalam, and Tamil.',
    missingInfo: 'Dialect nuances, localization engine pipeline, and city-by-city driver hub marketing.',
    sampleWinningAnswer: 'Our voice engine uses Gemini multilingual TTS models with localized colloquial Tamil, Kannada, and Hindi slang. We expand by deploying student campus ambassador networks across top delivery clusters in Bengaluru and Hyderabad.'
  }
];

export const TOP_10_IMPROVEMENTS: PitchImprovement[] = [
  {
    rank: 1,
    title: 'Eliminate Debt-Pushing Monetization (Resolve the Core Red Flag)',
    currentIssue: 'Pitch claims to relieve debt stress but plans to monetize by selling loans and credit cards to vulnerable workers.',
    whyItMatters: 'Triggers instant ethical and regulatory rejection from investors and jury members.',
    recommendedChange: 'Monetize via micro-savings commissions, Earned Wage Access (EWA) flat fees, and B2B driver retention dashboards sold to platforms.'
  },
  {
    rank: 2,
    title: 'Replace Top-Down TAM Sizing with Bottom-Up Pilot Traction',
    currentIssue: 'Founders cited broad NITI Aayog numbers (7.7M growing to 23.5M) without sharing any real pilot numbers.',
    whyItMatters: 'Investors want to see driver validation and behavioral retention, not textbook macro statistics.',
    recommendedChange: 'Show a 50-driver pilot study: "50 drivers saved an average of ₹1,400 in month one with 78% weekly retention."'
  },
  {
    rank: 3,
    title: 'Demonstrate a Live Product UI / Voice Flow Instead of Static Slides',
    currentIssue: 'Pitch only showed a static header slide with ₹1,250 balance and roleplay dialogue.',
    whyItMatters: 'Jury cannot gauge the actual AI innovation without hearing the voice alert or seeing the Safe Score UI in action.',
    recommendedChange: 'Play a crisp 15-second authentic audio recording: "Anna, today you made ₹850. Keep ₹300 aside for your Tuesday bike EMI."'
  },
  {
    rank: 4,
    title: 'Remove Inaccurate Claims About Competitors and Data Selling',
    currentIssue: 'Claimed GPay sells personal transaction data to Amazon/Flipkart for commerce ads.',
    whyItMatters: 'Demonstrates a lack of basic fintech regulatory understanding and destroys credibility with experienced judges.',
    recommendedChange: 'Accurately explain fintech affiliate distribution under RBI/NPCI guidelines without misrepresenting industry practices.'
  },
  {
    rank: 5,
    title: 'Address Regulatory Compliances Upfront (RBI, SEBI, IRDAI, LSP)',
    currentIssue: 'Founders brushed off regulatory hurdles by saying "in MVP it is easy."',
    whyItMatters: 'Jury knows financial services in India are heavily governed by RBI Account Aggregator and LSP laws.',
    recommendedChange: 'Explicitly state: "We partner with RBI-licensed Account Aggregator Setu and licensed NBFCs as a registered LSP."'
  },
  {
    rank: 6,
    title: 'Refine the Human Capital & Salaried Worker Analogy',
    currentIssue: 'Comparing uneducated gig workers directly to salaried IT professionals creates false expectations.',
    whyItMatters: 'IT employees have contractual salaries, PF, and corporate medical insurance; gig workers have variable per-order payouts.',
    recommendedChange: 'Frame the goal realistically as "Income Smoothing & Emergency Buffer Creation" rather than turning gig work into IT employment.'
  },
  {
    rank: 7,
    title: 'Present a Clear Team Slide with Technical & Domain Capabilities',
    currentIssue: 'Founders spoke informally without mentioning who is building the tech or handling regulatory partnerships.',
    whyItMatters: 'Early-stage hackathons and VC programs invest primarily in the founders\' execution capability.',
    recommendedChange: 'Dedicate 20 seconds to team roles: "Aswin leads Full-Stack & AA API Integration; Co-founder leads Driver Operations & Fintech Partnerships."'
  },
  {
    rank: 8,
    title: 'Differentiate Defensibly Against Incumbents (KarmaLife, Jar)',
    currentIssue: 'Dismissed competitors as "just one piece of work" without acknowledging their deep platform integrations.',
    whyItMatters: 'KarmaLife and Jar have massive funding and platform relationships with Swiggy/Zomato.',
    recommendedChange: 'Highlight FINNA\'s moat: Multi-platform worker-owned portability + hyper-localized vernacular voice interventions.'
  },
  {
    rank: 9,
    title: 'Add a Specific Funding Ask & Milestones Timeline',
    currentIssue: 'The pitch ended abruptly with "Thank you ma\'am" with no call to action.',
    whyItMatters: 'Jury does not know whether you need grant money, incubation space, or mentor connections.',
    recommendedChange: 'End with: "We are seeking ₹10 Lakhs in prototype grant funding to launch a 500-driver Chennai pilot over the next 4 months."'
  },
  {
    rank: 10,
    title: 'Improve Stage Body Language and Defense Poise',
    currentIssue: 'Founders crossed arms, looked downwards, and gave defensive answers when challenged on business model ethics.',
    whyItMatters: 'Receptive, coachable founders who welcome feedback score dramatically higher with jury panels.',
    recommendedChange: 'Embrace tough questions enthusiastically: "That is a brilliant critique, ma\'am. We intentionally separated savings from debt..."'
  }
];

export const EXECUTIVE_SUMMARY = {
  startup: 'FINNA ("Finance Anna")',
  tagline: 'The AI Financial Co-Pilot for Gig Workers',
  problem: 'Extreme daily income volatility, hidden UPI cash leakage, high-interest debt traps, and lack of simplified financial guidance for 7.7M+ Indian platform delivery workers.',
  solution: 'A vernacular voice-first AI advisory companion that connects bank accounts via RBI Account Aggregator, calculates daily Safe-to-Spend limits, and prevents fixed-expense default.',
  targetCustomer: 'India’s 7.7M (growing to 23.5M) delivery partners and gig service professionals across Swiggy, Zomato, Zepto, Blinkit, and Urban Company.',
  businessModel: 'B2B2C fintech distribution. (Current flaw: loan/credit referrals. Recommended pivot: EWA flat fees, micro-savings commission, and B2B platform driver retention analytics).',
  marketSize: '7.7 Million workers in India currently -> 23.5 Million by 2030 (TAM: ₹12,000 Cr annual financial transaction value).',
  traction: 'Pre-MVP / Early Conceptual Ideation. Zero live metrics or pilot user data disclosed in the pitch.',
  competitiveAdvantage: 'Unified multi-platform financial identity + vernacular voice alerts tailored for post-shift riders.',
  biggestStrength: 'High-empathy problem identification with an engaging conversational persona concept ("Finance Anna").',
  biggestWeakness: 'Predatory business model that pushes credit cards and loans onto debt-trapped gig workers.',
  biggestRisk: 'Severe regulatory penalties under RBI Digital Lending Guidelines and high default rates among informal borrowers.',
  biggestOpportunity: 'Automated micro-savings and income-smoothing emergency buffers for India’s fastest-growing labor segment.',
  overallScore: '63 / 100',
  classification: 'Needs Improvement / High Risk in Current State',
  investorVerdict: 'PASS (in current structure). Would reconsider only after pivoting away from loan distribution toward automated savings and demonstrating a 200-driver retention pilot.',
  juryVerdict: 'Strong concept and commendable presentation energy, but heavily penalized for business model contradiction and lack of regulatory preparation.',
  recommendedNextStep: 'Execute a 30-day manual WhatsApp pilot with 50 Swiggy/Zomato drivers in Chennai to validate savings behavior before writing code or pursuing NBFC credit integrations.'
};
