import React, { useState } from 'react';
import {
  Printer,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Target,
  Briefcase,
  Layers,
  Volume2,
  Loader2,
  FileDown,
  ExternalLink,
  Eye,
  X
} from 'lucide-react';
import { generateFivePagePdf } from '../utils/generatePdfReport';
import { PitchAnalysisResult } from '../types/pitch';

interface PdfReportCardProps {
  analysisData: PitchAnalysisResult;
  onClose?: () => void;
}

export const PdfReportCard: React.FC<PdfReportCardProps> = ({ analysisData, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgressText, setPdfProgressText] = useState<string>('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [showPdfViewerModal, setShowPdfViewerModal] = useState<boolean>(false);
  const totalPages = 5;

  const { metadata, executiveSummary, scorecard, pitchSections, claimsAudit, vcPillars, stageDeliveryAudit, redFlags, topFixes, juryQuestions, juryExchangeHighlight } = analysisData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async (autoOpenModal: boolean = true) => {
    try {
      setIsGeneratingPdf(true);
      setPdfProgressText('Generating Vector 5-Page PDF Report...');

      const { url } = await generateFivePagePdf(analysisData, (progress) => {
        setPdfProgressText(progress);
      });

      setPdfBlobUrl(url);

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      const cleanName = (metadata.startupName || 'Startup').replace(/[^a-zA-Z0-9]/g, '_');
      downloadLink.download = `${cleanName}_Pitch_Evaluation_ReportCard_5Pages.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      if (autoOpenModal) {
        setShowPdfViewerModal(true);
      }
    } catch (err) {
      console.error('PDF Generation failed:', err);
      alert('Automatic PDF generation encountered an issue. You can use the "Print / Save as PDF" button as a direct fallback.');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgressText('');
    }
  };

  const handleOpenPdfInNewTab = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, '_blank');
    } else {
      handleDownloadPdf(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# STARTUP PITCH EVALUATION REPORT CARD (5 PAGES)
Target Startup: ${metadata.startupName} — ${metadata.tagline}
Founders: ${metadata.founders} (${metadata.institutionOrLocation})
Overall Score: ${metadata.overallScore} / 100
VC Panel Verdict: ${metadata.verdictLabel || metadata.verdict}

================================================================================
PAGE 1: EXECUTIVE SUMMARY, METADATA & 12-FACTOR SCORECARD
================================================================================
• Problem: ${executiveSummary.problemStatement}
• Solution: ${executiveSummary.solutionOverview}
• Market Sizing: ${executiveSummary.marketAndTAM}
• Business Model: ${executiveSummary.businessModelReview}
• Primary Flaw / Fatal Risk: ${executiveSummary.primaryFatalFlawOrRisk}
• Investor Thesis: ${executiveSummary.investorThesis}

[12-Factor Weighted VC Scorecard]
${scorecard.map(c => `• ${c.name} (${c.weight}): ${c.score} / 10 — ${c.reason}`).join('\n')}

================================================================================
PAGE 2: 18-SECTION PITCH STRUCTURE & NUMERICAL CLAIMS AUDIT
================================================================================
${pitchSections.map(s => `${s.id}. ${s.title} [${s.status.toUpperCase()}]: ${s.content}`).join('\n')}

[Facts & Claims Audit]
${claimsAudit.map(c => `• Claim: ${c.claim} [${c.status.toUpperCase()}]\n  Quote: "${c.speakerQuote}"\n  Audit: ${c.evaluation}`).join('\n\n')}

================================================================================
PAGE 3: VC DEEP DIVE & PITCH DELIVERY STAGE AUDIT
================================================================================
${vcPillars.map(p => `[${p.name}: ${p.score}/10]\nStrengths: ${p.strengths}\nGaps: ${p.criticalGaps}`).join('\n\n')}

[Stage Delivery Audit]
Rating: ${stageDeliveryAudit.overallPresentationRating}/10
Strengths:
${stageDeliveryAudit.topStrongMoments.map(s => `• ${s}`).join('\n')}
Weaknesses:
${stageDeliveryAudit.topCriticalWeaknesses.map(w => `• ${w}`).join('\n')}

================================================================================
PAGE 4: CRITICAL RED FLAGS & JURY CROSS-EXAMINATION VERDICT
================================================================================
${redFlags.map(r => `[${r.severity.toUpperCase()}] ${r.title}\nDescription: ${r.description}\nInvestor Concern: ${r.investorConcern}\nRemedy: ${r.remedy}`).join('\n\n')}

${juryExchangeHighlight ? `[Jury Conflict Highlight]\nJudge (${juryExchangeHighlight.judgeRole}): "${juryExchangeHighlight.judgeObjection}"\nRecommended Reframe: "${juryExchangeHighlight.recommendedWinningReframe}"` : ''}

================================================================================
PAGE 5: TOP ACTIONABLE FIXES & JURY DEFENSE SCRIPT
================================================================================
${topFixes.map(t => `#${t.rank} ${t.title} [Impact: ${t.estimatedScoreImpact}]\nCurrent Issue: ${t.currentIssue}\nRecommended Action: ${t.recommendedChange}`).join('\n\n')}

[Top Defense Q&A]
${juryQuestions.slice(0, 5).map(q => `Q [${q.difficulty}]: ${q.question}\nWhy Asked: ${q.whyJudgeAsks}\nWinning Answer: ${q.sampleWinningAnswer}`).join('\n\n')}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = (metadata.startupName || 'Startup').replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `${cleanName}_Pitch_Evaluation_Dossier.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="print:hidden p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-20 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white">5-Page Startup Evaluation Report Card</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {metadata.startupName}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Download the complete vector 5-page PDF document to share with venture partners, juries, and accelerators.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Page Navigator */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Download PDF Button */}
          <button
            onClick={() => handleDownloadPdf(true)}
            disabled={isGeneratingPdf}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition cursor-pointer"
            title="Download complete 5-page PDF document"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{pdfProgressText || 'Generating PDF...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF (5 Pages)</span>
              </>
            )}
          </button>

          {/* View PDF Button */}
          <button
            onClick={() => {
              if (pdfBlobUrl) {
                setShowPdfViewerModal(true);
              } else {
                handleDownloadPdf(true);
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            title="View the generated PDF"
          >
            <Eye className="w-4 h-4" />
            <span>View PDF</span>
          </button>

          {/* Print / Save as PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow transition cursor-pointer"
            title="Open browser print dialog"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          {/* Markdown Download */}
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            title="Download full report in Markdown format"
          >
            <FileDown className="w-4 h-4" />
            <span>.MD</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* PDF View / Download Modal */}
      {showPdfViewerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">5-Page PDF Report Generated</h3>
                  <p className="text-xs text-slate-400">{metadata.startupName} Evaluation Dossier</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {pdfBlobUrl && (
                  <button
                    onClick={handleOpenPdfInNewTab}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Fullscreen Tab</span>
                  </button>
                )}
                <button
                  onClick={() => setShowPdfViewerModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with PDF Viewer */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-slate-900">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="text-emerald-300">
                  <strong>✅ Report Ready!</strong> The 5-page PDF is ready for download and distribution.
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownloadPdf(false)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save PDF</span>
                  </button>
                  <button
                    onClick={handleOpenPdfInNewTab}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </button>
                </div>
              </div>

              {pdfBlobUrl ? (
                <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-950 h-[500px]">
                  <iframe
                    src={pdfBlobUrl}
                    title="PDF Viewer"
                    className="w-full h-full border-none"
                  />
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center text-slate-400 text-xs">
                  Generating PDF preview...
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-xs text-slate-400">
              <span>Universal Pitch Intelligence Engine • Vector Institutional Export</span>
              <button
                onClick={() => setShowPdfViewerModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Report Container */}
      <div className="pdf-print-container space-y-8 print:space-y-0 print:m-0 print:p-0">
        
        {/* PAGE 1: EXECUTIVE SUMMARY, METADATA & 12-FACTOR SCORECARD */}
        <div
          id="pdf-page-1"
          className={`pdf-page bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:break-after-page ${
            currentPage === 1 ? 'block' : 'hidden print:block'
          }`}
          style={{ minHeight: '1100px' }}
        >
          {/* Header Banner */}
          <div className="border-b-2 border-indigo-600 pb-4 mb-6 flex justify-between items-start">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                Universal AI Pitch Intelligence & Jury Evaluation System
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                STARTUP PITCH EVALUATION REPORT CARD
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Target Startup: <strong className="text-slate-900">{metadata.startupName}</strong> — {metadata.tagline}
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-block px-3 py-1 border rounded text-center ${
                metadata.overallScore >= 80 ? 'bg-emerald-100 border-emerald-300 text-emerald-900' :
                metadata.overallScore >= 65 ? 'bg-amber-100 border-amber-300 text-amber-900' :
                'bg-rose-100 border-rose-300 text-rose-900'
              }`}>
                <div className="text-lg font-black leading-tight">{metadata.overallScore} / 100</div>
                <div className="text-[9px] font-bold uppercase tracking-wide">{metadata.verdictLabel || metadata.verdict}</div>
              </div>
              <div className="text-[10px] text-slate-500 font-semibold mt-1">Page 1 of 5</div>
            </div>
          </div>

          {/* Metadata Matrix */}
          <div className="grid grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Founders / Origin</span>
              <strong className="text-slate-900">{metadata.founders}</strong>
              <span className="text-[10px] text-slate-600 block">{metadata.institutionOrLocation}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Sector & Domain</span>
              <strong className="text-slate-900">{metadata.sector}</strong>
              <span className="text-[10px] text-slate-600 block">{metadata.stage}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Pitch Format & Duration</span>
              <strong className="text-slate-900">{metadata.pitchFormat}</strong>
              <span className="text-[10px] text-slate-600 block">{metadata.pitchLanguage}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">VC Panel Verdict</span>
              <strong className={metadata.overallScore >= 75 ? 'text-emerald-700' : 'text-rose-700'}>
                {metadata.verdictLabel || metadata.verdict}
              </strong>
              <span className="text-[10px] text-slate-600 block">{metadata.videoDuration}</span>
            </div>
          </div>

          {/* Executive Summary Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center space-x-1.5 border-b pb-1.5 border-slate-100">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>Value Proposition & Problem Statement</span>
              </h3>
              <div className="text-[11px] text-slate-700 space-y-1.5 leading-relaxed">
                <p>
                  <strong>Problem:</strong> {executiveSummary.problemStatement}
                </p>
                <p>
                  <strong>Solution:</strong> {executiveSummary.solutionOverview}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center space-x-1.5 border-b pb-1.5 border-slate-100">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>Market, Business Model & Thesis</span>
              </h3>
              <div className="text-[11px] text-slate-700 space-y-1.5 leading-relaxed">
                <p>
                  <strong>Market Size:</strong> {executiveSummary.marketAndTAM}
                </p>
                <p>
                  <strong>Business Model Review:</strong> {executiveSummary.businessModelReview}
                </p>
                <p>
                  <strong>Investor Thesis:</strong> {executiveSummary.investorThesis}
                </p>
              </div>
            </div>
          </div>

          {/* 12-Criterion Scorecard Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
            <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                12-Factor Weighted VC & Jury Scorecard
              </span>
              <span className="text-[11px] font-bold text-slate-600">Total Weighted Score: {metadata.overallScore} / 100</span>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="px-3 py-1.5 w-1/4">Evaluation Factor</th>
                  <th className="px-3 py-1.5 w-20 text-center">Score</th>
                  <th className="px-3 py-1.5">Evaluator Assessment Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {scorecard.map((cat, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-3 py-1.5 font-bold text-slate-900">{cat.name}</td>
                    <td className="px-3 py-1.5 text-center font-black">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          cat.score >= 8
                            ? 'bg-emerald-100 text-emerald-800'
                            : cat.score >= 6
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {cat.score} / 10
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-slate-600 leading-snug">{cat.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Page 1 Footer */}
          <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>{metadata.startupName} Pitch Evaluation Dossier</span>
            <span>Confidential • Prepared for Founders & Investment Committee</span>
          </div>
        </div>

        {/* PAGE 2: 18-SECTION CLEAN PITCH & CLAIMS AUDIT */}
        <div
          id="pdf-page-2"
          className={`pdf-page bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:break-after-page ${
            currentPage === 2 ? 'block' : 'hidden print:block'
          }`}
          style={{ minHeight: '1100px' }}
        >
          <div className="border-b-2 border-indigo-600 pb-3 mb-5 flex justify-between items-center">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                PITCH VERIFICATION & AUDIT MODULE
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                18-SECTION PITCH STRUCTURE & CLAIMS AUDIT
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Page 2 of 5</span>
            </div>
          </div>

          {/* 18-Section Grid */}
          <div className="mb-5">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Full 18-Section Pitch Inventory (Status & Disclosure)</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              {pitchSections.map(sec => (
                <div
                  key={sec.id}
                  className={`p-2 rounded border leading-tight ${
                    sec.status === 'Not mentioned in the pitch'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                      : sec.status === 'Partially Mentioned'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="font-bold text-slate-900">{sec.title}</strong>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        sec.status === 'Not mentioned in the pitch'
                          ? 'bg-rose-200 text-rose-900'
                          : sec.status === 'Partially Mentioned'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {sec.status === 'Not mentioned in the pitch' ? 'Missing' : sec.status === 'Partially Mentioned' ? 'Partial' : 'Disclosed'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 line-clamp-2">{sec.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Facts & Numerical Claims */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
            <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Audited Statements, Numerical Claims & Verifications
              </span>
            </div>
            <table className="w-full text-left text-[10.5px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="px-3 py-1.5 w-1/4">Claim in Pitch</th>
                  <th className="px-3 py-1.5 w-24">Status</th>
                  <th className="px-3 py-1.5">Pitch Spoken Quote</th>
                  <th className="px-3 py-1.5">Auditor Verification & Risk Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {claimsAudit.slice(0, 5).map((fc, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-3 py-1.5 font-bold text-slate-900">{fc.claim}</td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          fc.status === 'Clearly stated'
                            ? 'bg-emerald-100 text-emerald-800'
                            : fc.status === 'Needs verification'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fc.status}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-slate-600 font-mono text-[9.5px] italic">{fc.speakerQuote}</td>
                    <td className="px-3 py-1.5 text-slate-700">{fc.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>{metadata.startupName} Pitch Evaluation Dossier</span>
            <span>Page 2 • Section Breakdown & Fact Verification</span>
          </div>
        </div>

        {/* PAGE 3: VC DEEP DIVE & PITCH DELIVERY */}
        <div
          id="pdf-page-3"
          className={`pdf-page bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:break-after-page ${
            currentPage === 3 ? 'block' : 'hidden print:block'
          }`}
          style={{ minHeight: '1100px' }}
        >
          <div className="border-b-2 border-indigo-600 pb-3 mb-5 flex justify-between items-center">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                VENTURE CRITIQUE & PERFORMANCE ANALYSIS
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                VC PILLAR EVALUATION & STAGE DELIVERY AUDIT
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Page 3 of 5</span>
            </div>
          </div>

          {/* 6 Key Investment Pillars */}
          <div className="grid grid-cols-3 gap-3 mb-5 text-[11px]">
            {vcPillars.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-900">{p.name}</span>
                  <span className={`font-black ${p.score >= 8 ? 'text-emerald-700' : p.score >= 6 ? 'text-amber-700' : 'text-rose-700'}`}>
                    {p.score} / 10
                  </span>
                </div>
                <p className="text-slate-600 text-[10px] leading-relaxed">
                  <strong>Strength:</strong> {p.strengths}
                </p>
                <p className="text-slate-600 text-[10px] leading-relaxed">
                  <strong>Gap:</strong> {p.criticalGaps}
                </p>
              </div>
            ))}
          </div>

          {/* Stage Delivery & Performance */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 mb-5">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Pitch Delivery, Voice Modulation & Stage Presence Audit</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div className="space-y-2">
                <div className="font-bold text-emerald-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Strongest Pitch Moments</span>
                </div>
                <div className="space-y-1.5 text-slate-700 text-[10.5px]">
                  {stageDeliveryAudit.topStrongMoments.map((m, i) => (
                    <div key={i} className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <strong>#{i + 1}</strong> {m}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-rose-800 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Critical Pitch Delivery Weaknesses</span>
                </div>
                <div className="space-y-1.5 text-slate-700 text-[10.5px]">
                  {stageDeliveryAudit.topCriticalWeaknesses.map((w, i) => (
                    <div key={i} className="p-2 rounded bg-rose-50 border border-rose-200">
                      <strong>#{i + 1}</strong> {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>{metadata.startupName} Pitch Evaluation Dossier</span>
            <span>Page 3 • VC Pillar Analysis & Delivery Breakdown</span>
          </div>
        </div>

        {/* PAGE 4: RED FLAGS & JURY CROSS-EXAMINATION */}
        <div
          id="pdf-page-4"
          className={`pdf-page bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:break-after-page ${
            currentPage === 4 ? 'block' : 'hidden print:block'
          }`}
          style={{ minHeight: '1100px' }}
        >
          <div className="border-b-2 border-rose-600 pb-3 mb-5 flex justify-between items-center">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600">
                CRITICAL RISK DISSECTION & JURY CONFLICT
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                RED FLAGS & JURY CROSS-EXAMINATION VERDICT
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Page 4 of 5</span>
            </div>
          </div>

          {/* Red Flags Dissection */}
          <div className="space-y-3 mb-5">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Identified Pitch Red Flags & Mandatory Investor Remedies</span>
            </h3>

            {redFlags.map(rf => (
              <div key={rf.id} className="p-3 rounded-xl border border-slate-200 bg-white text-[11px] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                        rf.severity === 'Critical'
                          ? 'bg-rose-600 text-white'
                          : rf.severity === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rf.severity}
                    </span>
                    <span>{rf.title}</span>
                  </span>
                </div>
                <p className="text-slate-600 text-[10.5px] leading-relaxed">{rf.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="p-1.5 rounded bg-rose-50 border border-rose-200">
                    <strong className="text-rose-900 block font-bold">Investor Concern:</strong>
                    <span className="text-slate-700">{rf.investorConcern}</span>
                  </div>
                  <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200">
                    <strong className="text-emerald-900 block font-bold">Required Remedy:</strong>
                    <span className="text-slate-700">{rf.remedy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {juryExchangeHighlight && (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-[11px] space-y-2">
              <h4 className="font-black text-slate-900 uppercase">Jury Objection & Winning Reframe</h4>
              <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-900">
                <strong>Judge Objection ({juryExchangeHighlight.judgeRole}):</strong>
                <p className="italic mt-0.5">"{juryExchangeHighlight.judgeObjection}"</p>
              </div>
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                <strong>Winning Reframe:</strong>
                <p className="mt-0.5">"{juryExchangeHighlight.recommendedWinningReframe}"</p>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>{metadata.startupName} Pitch Evaluation Dossier</span>
            <span>Page 4 • Red Flags & Jury Cross-Examination</span>
          </div>
        </div>

        {/* PAGE 5: TOP ACTIONABLE FIXES & JURY Q&A DEFENSE */}
        <div
          id="pdf-page-5"
          className={`pdf-page bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:break-after-page ${
            currentPage === 5 ? 'block' : 'hidden print:block'
          }`}
          style={{ minHeight: '1100px' }}
        >
          <div className="border-b-2 border-indigo-600 pb-3 mb-5 flex justify-between items-center">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                ACTIONABLE PLAYBOOK & INTERVIEW PREPARATION
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                TOP ACTIONABLE FIXES & MASTER JURY DEFENSE
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Page 5 of 5</span>
            </div>
          </div>

          {/* Top Fixes Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Prioritized Action Items for Next Pitch
              </span>
            </div>
            <table className="w-full text-left text-[10.5px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="px-3 py-1.5 w-12 text-center">Rank</th>
                  <th className="px-3 py-1.5 w-1/3">Key Action Item</th>
                  <th className="px-3 py-1.5">Recommended Change & Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {topFixes.map(fix => (
                  <tr key={fix.rank} className={fix.rank % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-3 py-1.5 text-center font-bold text-indigo-600">#{fix.rank}</td>
                    <td className="px-3 py-1.5 font-bold text-slate-900">
                      {fix.title}
                      <span className="block text-[9px] text-slate-500 font-normal mt-0.5">{fix.currentIssue}</span>
                    </td>
                    <td className="px-3 py-1.5 text-slate-700">
                      {fix.recommendedChange}
                      <span className="inline-block ml-2 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                        {fix.estimatedScoreImpact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Jury Questions Defense */}
          <div className="space-y-3 mb-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Essential Jury Questions & Master Defense Scripts
            </h3>
            <div className="space-y-2 text-[10.5px]">
              {juryQuestions.slice(0, 3).map(q => (
                <div key={q.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 font-bold">{q.question}</strong>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 uppercase">
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 italic">Why Judge Asks: {q.whyJudgeAsks}</p>
                  <p className="text-[10px] text-emerald-900 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                    <strong>Winning Script:</strong> {q.sampleWinningAnswer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>{metadata.startupName} Pitch Evaluation Dossier</span>
            <span>Page 5 • Actionable Playbook & Q&A Defense</span>
          </div>
        </div>

      </div>
    </div>
  );
};
