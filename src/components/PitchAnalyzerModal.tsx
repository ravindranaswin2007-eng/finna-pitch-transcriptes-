import React, { useState } from 'react';
import { PitchAnalysisResult, AnalyzePitchRequest } from '../types/pitch';

interface PitchAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (result: PitchAnalysisResult) => void;
}

export const PitchAnalyzerModal: React.FC<PitchAnalyzerModalProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete
}) => {
  const [startupName, setStartupName] = useState('');
  const [sector, setSector] = useState('B2B SaaS / AI');
  const [stage, setStage] = useState('Series A');
  const [pitchLanguage, setPitchLanguage] = useState('English');
  const [videoUrl, setVideoUrl] = useState('');
  const [transcriptText, setTranscriptText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startupName.trim()) {
      setErrorMessage('Please provide a startup name.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const payload: AnalyzePitchRequest = {
        startupName: startupName.trim(),
        sector: sector.trim(),
        stage: stage.trim(),
        pitchLanguage,
        pitchFormat: 'Live Pitch (10-15 Min)',
        videoUrl: videoUrl.trim() || undefined,
        transcriptText: transcriptText.trim() || undefined
      };

      const response = await fetch('/api/analyze-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned status ${response.status}`);
      }

      const result: PitchAnalysisResult = await response.json();
      onAnalysisComplete(result);
      onClose();
    } catch (err: any) {
      console.error('Pitch analysis error:', err);
      setErrorMessage(err.message || 'Failed to complete pitch analysis. Please check your inputs and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#e4e4e7] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#e4e4e7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">troubleshoot</span>
            </div>
            <div>
              <h2 className="font-heading text-lg font-medium text-[#0a0a0a]">
                Evaluate Any Startup Pitch
              </h2>
              <p className="font-body text-xs text-[#71717a]">
                Multi-modal analysis for video, audio, slides, or transcripts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#fafafa] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleRunAnalysis} className="p-6 space-y-4 overflow-y-auto flex-1 font-body">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#71717a] uppercase tracking-wider mb-1 font-heading">
                Startup Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Corp"
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#71717a] uppercase tracking-wider mb-1 font-heading">
                Sector / Vertical
              </label>
              <input
                type="text"
                placeholder="e.g. B2B SaaS / Enterprise / AI"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#0a0a0a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#71717a] uppercase tracking-wider mb-1 font-heading">
                Funding Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]"
              >
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B+">Series B+</option>
                <option value="Hackathon">Hackathon / Demo Day</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#71717a] uppercase tracking-wider mb-1 font-heading">
                Pitch Language
              </label>
              <select
                value={pitchLanguage}
                onChange={(e) => setPitchLanguage(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]"
              >
                <option value="English">English</option>
                <option value="Multilingual / Mixed">Multilingual / Mixed</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil + English">Tamil + English (Tanglish)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#71717a] uppercase tracking-wider mb-1 font-heading">
              Pitch Video / Audio URL (Optional)
            </label>
            <input
              type="url"
              placeholder="e.g. https://www.youtube.com/watch?v=... or Loom / Drive link"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#71717a] uppercase tracking-wider mb-1 font-heading">
              Pitch Transcript / Deck Script / Summary
            </label>
            <textarea
              rows={4}
              placeholder="Paste spoken transcript or pitch text here..."
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              className="w-full p-3.5 text-sm bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#0a0a0a]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#fafafa]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-2.5 rounded-lg bg-[#0a0a0a] text-white text-xs font-semibold uppercase tracking-wider font-heading hover:bg-[#27272a] shadow-sm flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">troubleshoot</span>
                  Generate Pitch Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
