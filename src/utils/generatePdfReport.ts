import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PitchAnalysisResult } from '../types/pitch';

// Helper to draw a modern corporate header banner on each page
const drawPageHeader = (
  doc: jsPDF,
  pageNumber: number,
  totalPages: number,
  categoryLabel: string,
  pageTitle: string
) => {
  // Top header bar
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 24, 'F');

  // Brand top line
  doc.setFillColor(79, 70, 229); // Indigo 600
  doc.rect(0, 0, 210, 3, 'F');

  // Category Tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(79, 70, 229);
  doc.text(categoryLabel.toUpperCase(), 14, 9);

  // Main Page Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text(pageTitle, 14, 17);

  // Page Indicator Badge
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(165, 6, 31, 12, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`PAGE ${pageNumber} OF ${totalPages}`, 168, 14);

  // Bottom dividing line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 24, 196, 24);
};

// Helper to draw standard institutional footer
const drawPageFooter = (doc: jsPDF, pageNumber: number, footerNote: string, startupName: string) => {
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 285, 196, 285);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`${startupName} AI Pitch Evaluation Dossier • Confidential`, 14, 290);
  doc.text(footerNote, 105, 290, { align: 'center' });
  doc.text(`Page ${pageNumber} of 5`, 196, 290, { align: 'right' });
};

export const generateFivePagePdf = async (
  analysisData: PitchAnalysisResult,
  onProgress?: (text: string) => void
): Promise<{ blob: Blob; url: string }> => {
  if (onProgress) onProgress('Initializing 5-Page PDF Vector Engine...');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const totalPages = 5;
  const { metadata, executiveSummary, scorecard, pitchSections, claimsAudit, vcPillars, stageDeliveryAudit, redFlags, topFixes, juryQuestions, juryExchangeHighlight } = analysisData;

  // =========================================================================
  // PAGE 1: EXECUTIVE SUMMARY, METADATA & 12-FACTOR VC SCORECARD
  // =========================================================================
  if (onProgress) onProgress('Compiling Page 1: Executive Summary & Scorecard...');
  drawPageHeader(
    doc,
    1,
    totalPages,
    'Universal AI Pitch Intelligence & Jury Evaluation System',
    'STARTUP PITCH EVALUATION REPORT CARD'
  );

  // Score Highlight Banner
  const isPass = metadata.overallScore < 70 || metadata.verdict.includes('PASS');
  const isInvest = metadata.overallScore >= 85 || metadata.verdict === 'INVEST';

  if (isInvest) {
    doc.setFillColor(236, 253, 245); // Emerald 50
    doc.setDrawColor(16, 185, 129); // Emerald 500
  } else if (isPass) {
    doc.setFillColor(254, 242, 242); // Rose 50
    doc.setDrawColor(225, 29, 72); // Rose 600
  } else {
    doc.setFillColor(254, 243, 199); // Amber 100
    doc.setDrawColor(245, 158, 11); // Amber 500
  }
  doc.roundedRect(14, 28, 182, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  if (isInvest) {
    doc.setTextColor(6, 95, 70); // Emerald 900
  } else if (isPass) {
    doc.setTextColor(159, 18, 57); // Rose 900
  } else {
    doc.setTextColor(146, 64, 14); // Amber 900
  }
  doc.text(`OVERALL EVALUATION SCORE: ${metadata.overallScore} / 100 — VERDICT: ${metadata.verdictLabel || metadata.verdict}`, 18, 38);

  // Metadata Matrix Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 47, 182, 22, 2, 2, 'FD');

  // Col 1
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TARGET STARTUP', 18, 52);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(metadata.startupName.substring(0, 24), 18, 57);
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(metadata.tagline.substring(0, 30), 18, 63);

  // Col 2
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('FOUNDERS / ORIGIN', 68, 52);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text((metadata.founders || 'Founding Team').substring(0, 24), 68, 57);
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text((metadata.institutionOrLocation || 'Headquarters').substring(0, 28), 68, 63);

  // Col 3
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('FORMAT & SECTOR', 118, 52);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text((metadata.pitchFormat || 'Demo Pitch').substring(0, 22), 118, 57);
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text((metadata.sector || 'Venture').substring(0, 26), 118, 63);

  // Col 4
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PRIMARY RISK / STAGE', 160, 52);
  doc.setFontSize(8.5);
  doc.setTextColor(225, 29, 72); // Rose 600
  doc.text((metadata.stage || 'Seed').substring(0, 20), 160, 57);
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text((metadata.pitchLanguage || 'Bilingual').substring(0, 20), 160, 63);

  const execObj =
    typeof executiveSummary === 'object' && executiveSummary !== null
      ? executiveSummary
      : {
          problemStatement: typeof executiveSummary === 'string' ? executiveSummary : 'Discovered pain point and structural problem.',
          solutionOverview: 'Automated platform solving core workflow bottlenecks.',
          marketAndTAM: 'High-growth market opportunity.',
          businessModelReview: 'Direct monetization and recurring revenue model.',
          primaryFatalFlawOrRisk: 'Unit economics and defensibility against incumbents.',
          investorThesis: 'Promising venture opportunity subject to traction validation.'
        };

  // Executive Summary Two Columns
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 73, 89, 42, 2, 2, 'FD');
  doc.roundedRect(107, 73, 89, 42, 2, 2, 'FD');

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(79, 70, 229);
  doc.text('PROBLEM & SOLUTION SUMMARY', 18, 79);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(51, 65, 85);
  const leftSummary = doc.splitTextToSize(
    `Problem: ${execObj.problemStatement}\n\nSolution: ${execObj.solutionOverview}`,
    81
  );
  doc.text(leftSummary.slice(0, 7), 18, 85);

  // Right Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(79, 70, 229);
  doc.text('MARKET & PRIMARY FATAL RISK', 111, 79);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(51, 65, 85);
  const rightSummary = doc.splitTextToSize(
    `Market: ${execObj.marketAndTAM}\n\nKey Flaw / Risk: ${execObj.primaryFatalFlawOrRisk}`,
    81
  );
  doc.text(rightSummary.slice(0, 7), 111, 85);

  // 12-Factor Scorecard Table
  autoTable(doc, {
    startY: 119,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['Evaluation Factor', 'Score', 'Weighted Jury & VC Evaluator Findings']],
    body: (scorecard || []).slice(0, 12).map(cat => [
      cat.name,
      `${cat.score} / 10`,
      cat.reason
    ]),
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: 1.5,
    },
    bodyStyles: {
      fontSize: 7,
      cellPadding: 1.2,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: 'bold' },
      1: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
      2: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  drawPageFooter(doc, 1, 'Executive Summary & 12-Factor Scorecard', metadata.startupName);

  // =========================================================================
  // PAGE 2: 18-SECTION CLEAN PITCH AUDIT & FACT VERIFICATION
  // =========================================================================
  if (onProgress) onProgress('Compiling Page 2: Pitch Sections & Claims Audit...');
  doc.addPage('a4', 'portrait');
  drawPageHeader(
    doc,
    2,
    totalPages,
    'Pitch Verification & Audit Module',
    '18-SECTION PITCH STRUCTURE & NUMERICAL CLAIMS AUDIT'
  );

  // 18 Sections Table
  autoTable(doc, {
    startY: 28,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['Sec #', 'Pitch Section Name', 'Status in Live Pitch', 'Content Disclosed in Pitch']],
    body: (pitchSections || []).slice(0, 18).map(s => [
      `#${s.id}`,
      s.title,
      s.status === 'Not mentioned in the pitch'
        ? 'MISSING'
        : s.status === 'Partially Mentioned'
        ? 'PARTIAL'
        : 'DISCLOSED',
      s.content
    ]),
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: 1.5,
    },
    bodyStyles: {
      fontSize: 6.5,
      cellPadding: 1.1,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 38, fontStyle: 'bold' },
      2: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
      3: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didParseCell: function (data) {
      if (data.column.index === 2 && data.section === 'body') {
        const val = data.cell.raw;
        if (val === 'MISSING') {
          data.cell.styles.textColor = [225, 29, 72];
        } else if (val === 'PARTIAL') {
          data.cell.styles.textColor = [217, 119, 6];
        } else {
          data.cell.styles.textColor = [16, 185, 129];
        }
      }
    },
  });

  // Facts & Numerical Claims Table
  const finalYPage2 = (doc as any).lastAutoTable.finalY + 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(79, 70, 229);
  doc.text('AUDITED STATEMENTS, NUMERICAL CLAIMS & VERIFICATIONS', 14, finalYPage2 + 2);

  autoTable(doc, {
    startY: finalYPage2 + 4,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['Claim in Pitch', 'Status', 'Pitch Spoken Quote', 'Auditor Verification & Risk Assessment']],
    body: (claimsAudit || []).slice(0, 4).map(f => [
      f.claim,
      f.status.toUpperCase(),
      f.speakerQuote,
      f.evaluation
    ]),
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.2,
      cellPadding: 1.5,
    },
    bodyStyles: {
      fontSize: 6.5,
      cellPadding: 1.1,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 36, fontStyle: 'bold' },
      1: { cellWidth: 24, halign: 'center', fontStyle: 'bold' },
      2: { cellWidth: 42, fontStyle: 'italic' },
      3: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  drawPageFooter(doc, 2, 'Pitch Inventory & Numerical Claims Audit', metadata.startupName);

  // =========================================================================
  // PAGE 3: VC PILLAR EVALUATION & STAGE DELIVERY AUDIT
  // =========================================================================
  if (onProgress) onProgress('Compiling Page 3: VC Pillars & Stage Delivery...');
  doc.addPage('a4', 'portrait');
  drawPageHeader(
    doc,
    3,
    totalPages,
    'Venture Critique & Performance Analysis',
    'VC PILLAR EVALUATION & STAGE DELIVERY AUDIT'
  );

  // 6 Key VC Pillars Table
  autoTable(doc, {
    startY: 28,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['#', 'VC Investment Pillar', 'Score', 'Strengths Identified', 'Critical Gaps & Red Flags']],
    body: (vcPillars || []).slice(0, 6).map((p, idx) => [
      `${idx + 1}`,
      p.name,
      `${p.score} / 10`,
      p.strengths,
      p.criticalGaps
    ]),
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: 1.5,
    },
    bodyStyles: {
      fontSize: 7,
      cellPadding: 1.4,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 35, fontStyle: 'bold' },
      2: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
      3: { cellWidth: 55 },
      4: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  const finalYPage3 = (doc as any).lastAutoTable.finalY + 6;

  // Delivery & Stage Audit Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, finalYPage3, 182, 120, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(79, 70, 229);
  doc.text('PITCH DELIVERY, VOICE MODULATION & STAGE PRESENCE AUDIT', 18, finalYPage3 + 7);

  // 3 Strongest Moments
  doc.setFontSize(8.5);
  doc.setTextColor(16, 185, 129); // Emerald 600
  doc.text('TOP STRONGEST PITCH MOMENTS', 18, finalYPage3 + 15);

  const strongMoments = stageDeliveryAudit?.topStrongMoments || [
    'Clear and empathetic problem articulation.',
    'Authoritative market statistics citation.',
    'High presentation conviction during product introduction.'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  let curY = finalYPage3 + 21;
  strongMoments.slice(0, 3).forEach((m, idx) => {
    const lines = doc.splitTextToSize(`${idx + 1}. ${m}`, 174);
    doc.text(lines, 18, curY);
    curY += lines.length * 4 + 2;
  });

  // 3 Critical Weaknesses
  curY += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(225, 29, 72); // Rose 600
  doc.text('TOP CRITICAL PITCH DELIVERY WEAKNESSES', 18, curY);

  const weakMoments = stageDeliveryAudit?.topCriticalWeaknesses || [
    'Hand-waving when pressed on unit economics.',
    'Defensive body language during jury questioning.',
    'Lack of crisp visual prototype demonstration.'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  curY += 6;
  weakMoments.slice(0, 3).forEach((m, idx) => {
    const lines = doc.splitTextToSize(`${idx + 1}. ${m}`, 174);
    doc.text(lines, 18, curY);
    curY += lines.length * 4 + 2;
  });

  // Transcript Language Note
  curY += 2;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(18, curY, 174, 16, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('LANGUAGE & DELIVERY OBSERVATION:', 22, curY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  const langNote = doc.splitTextToSize(
    stageDeliveryAudit?.deliveryObservations || 'Pitch evaluated across pacing, vocal clarity, and audience connection.',
    166
  );
  doc.text(langNote.slice(0, 2), 22, curY + 11);

  drawPageFooter(doc, 3, 'VC Pillars & Delivery Analysis', metadata.startupName);

  // =========================================================================
  // PAGE 4: CRITICAL RED FLAGS & JURY CROSS-EXAMINATION VERDICT
  // =========================================================================
  if (onProgress) onProgress('Compiling Page 4: Red Flags & Jury Cross-Exam...');
  doc.addPage('a4', 'portrait');
  drawPageHeader(
    doc,
    4,
    totalPages,
    'Critical Risk Dissection & Jury Conflict',
    'IDENTIFIED RED FLAGS & JURY CROSS-EXAMINATION VERDICT'
  );

  // Red Flags Table
  autoTable(doc, {
    startY: 28,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['Severity', 'Red Flag Title & Description', 'Investor Concern', 'Required Founder Remedy']],
    body: (redFlags || []).slice(0, 4).map(r => [
      r.severity.toUpperCase(),
      `${r.title}\n\n${r.description}`,
      r.investorConcern,
      r.remedy
    ]),
    headStyles: {
      fillColor: [225, 29, 72], // Rose 600
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      cellPadding: 1.5,
    },
    bodyStyles: {
      fontSize: 6.8,
      cellPadding: 1.4,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 62 },
      2: { cellWidth: 48 },
      3: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [254, 242, 242], // Rose 50
    },
    didParseCell: function (data) {
      if (data.column.index === 0 && data.section === 'body') {
        data.cell.styles.textColor = [225, 29, 72];
      }
    },
  });

  const finalYPage4 = (doc as any).lastAutoTable.finalY + 6;

  // The Jury Cross-Exam Breakdown
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, finalYPage4, 182, 85, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('CRITICAL JURY CROSS-EXAMINATION & CENTRAL CONFLICT', 18, finalYPage4 + 7);

  // Judge Objection
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(18, finalYPage4 + 11, 174, 28, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(225, 29, 72);
  doc.text(`CENTRAL JURY OBJECTION (${juryExchangeHighlight?.judgeRole || 'Lead Partner'}):`, 22, finalYPage4 + 16);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  const judgeQuote = doc.splitTextToSize(
    `"${juryExchangeHighlight?.judgeObjection || (typeof executiveSummary === 'object' && executiveSummary?.primaryFatalFlawOrRisk) || 'Unit economics and competitive defensibility require validation.'}"`,
    166
  );
  doc.text(judgeQuote.slice(0, 4), 22, finalYPage4 + 21);

  // Correct Reframe
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(18, finalYPage4 + 43, 174, 34, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(16, 185, 129);
  doc.text('HOW FOUNDERS MUST REFRAME THIS IN FUTURE PITCHES:', 22, finalYPage4 + 48);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(6, 78, 59);
  const reframeText = doc.splitTextToSize(
    `"${juryExchangeHighlight?.recommendedWinningReframe || 'Acknowledge the core risk directly, present your unit economic or technical mitigation, and redirect to validated customer demand.'}"`,
    166
  );
  doc.text(reframeText.slice(0, 5), 22, finalYPage4 + 53);

  drawPageFooter(doc, 4, 'Red Flags & Jury Cross-Examination', metadata.startupName);

  // =========================================================================
  // PAGE 5: TOP 10 ACTIONABLE FIXES & MASTER JURY Q&A SCRIPT
  // =========================================================================
  if (onProgress) onProgress('Compiling Page 5: Top 10 Fixes & Q&A Defense...');
  doc.addPage('a4', 'portrait');
  drawPageHeader(
    doc,
    5,
    totalPages,
    'Actionable Playbook & Interview Preparation',
    'TOP 10 ACTIONABLE FIXES & MASTER JURY Q&A DEFENSE'
  );

  // Top Improvements Table
  autoTable(doc, {
    startY: 28,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['#', 'Key Action Item', 'Current Problem in Pitch', 'Recommended Change to Win Investors']],
    body: (topFixes || []).slice(0, 7).map(t => [
      `#${t.rank}`,
      t.title,
      t.currentIssue,
      t.recommendedChange
    ]),
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.2,
      cellPadding: 1.3,
    },
    bodyStyles: {
      fontSize: 6.5,
      cellPadding: 1.1,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 40, fontStyle: 'bold' },
      2: { cellWidth: 50 },
      3: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  const finalYPage5 = (doc as any).lastAutoTable.finalY + 4;

  // Crucial Q&A Cards
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(79, 70, 229);
  doc.text('CRUCIAL JURY DEFENSE SCRIPTS (TOP 3 QUESTIONS)', 14, finalYPage5 + 2);

  autoTable(doc, {
    startY: finalYPage5 + 4,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    head: [['Jury Question', 'Why Judge Asks', 'Master Winning Response for Next Pitch']],
    body: (juryQuestions || []).slice(0, 3).map(q => [
      q.question,
      q.whyJudgeAsks,
      q.sampleWinningAnswer
    ]),
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7,
      cellPadding: 1.3,
    },
    bodyStyles: {
      fontSize: 6.3,
      cellPadding: 1.1,
      textColor: [15, 23, 42],
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: 'bold' },
      1: { cellWidth: 38 },
      2: { cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  const finalYQA = (doc as any).lastAutoTable.finalY + 3;

  // Final 5-Minute Suggested Outline Box
  if (finalYQA < 265) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(79, 70, 229);
    doc.roundedRect(14, finalYQA, 182, 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(79, 70, 229);
    doc.text('RECOMMENDED 5-MINUTE INVESTOR PITCH TIMELINE:', 18, finalYQA + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(51, 65, 85);
    doc.text(
      '0:00-1:00 Visceral Problem Hook | 1:00-2:00 Working Prototype Demo | 2:00-3:00 Quantified Customer Validation | 3:00-4:00 Scalable Unit Economics | 4:00-5:00 Team & Capital Ask',
      18,
      finalYQA + 11
    );
  }

  drawPageFooter(doc, 5, 'Top 10 Improvements & Defense Master Script', metadata.startupName);

  if (onProgress) onProgress('Finalizing PDF Document...');

  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  return { blob: pdfBlob, url: blobUrl };
};
