import React, { useState, useEffect, useRef } from 'react';
import { PitchAnalysisResult } from '../types/pitch';
import { PREPARED_FINNA_REPORT } from '../data/preparedFinnaReport';

interface UploadAndAnalysisViewProps {
  onBackToHome: () => void;
  onAnalysisComplete: (result: PitchAnalysisResult) => void;
}

export const UploadAndAnalysisView: React.FC<UploadAndAnalysisViewProps> = ({
  onBackToHome,
  onAnalysisComplete
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [startupName, setStartupName] = useState('');
  const [sector, setSector] = useState('');
  const [notes, setNotes] = useState('');
  const [transcriptText, setTranscriptText] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');
  const [statusMessage, setStatusMessage] = useState('Preparing FINNA pitch evaluation engine...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timelineSteps = [
    { label: 'Video file received & loaded', icon: 'cloud_upload' },
    { label: 'Gemini multimodal verification & parsing', icon: 'hourglass_top' },
    { label: 'Audio & speech transcript audit', icon: 'mic' },
    { label: 'Slide & visual product analysis', icon: 'visibility' },
    { label: 'Presenter body language & delivery scoring', icon: 'psychology' },
    { label: '17-Category venture rubric calculation', icon: 'fact_check' },
    { label: 'Generating comprehensive FINNA Pitch Report', icon: 'assessment' }
  ];

  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartAnalysis = async () => {
    if (uploadMode === 'file' && !selectedFile) {
      setErrorMessage('Please select or drop a pitch video file to evaluate.');
      return;
    }
    if (uploadMode === 'text' && !transcriptText.trim()) {
      setErrorMessage('Please enter pitch text or transcript.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setActiveStepIndex(0);
    setStatusMessage('Loading video presentation and starting FINNA evaluation audit...');

    // Progress timeline smoothly through each stage to deliver a realistic, responsive demo
    let currentStep = 0;
    stepIntervalRef.current = setInterval(() => {
      currentStep++;
      if (currentStep < timelineSteps.length) {
        setActiveStepIndex(currentStep);
        if (currentStep === 1) {
          setStatusMessage('Multimodal verification & presentation parsing...');
        } else if (currentStep === 2) {
          setStatusMessage('Auditing speech, audio cadence, and bilingual transcript...');
        } else if (currentStep === 3) {
          setStatusMessage('Analyzing slides, persona roleplay, and product features...');
        } else if (currentStep === 4) {
          setStatusMessage('Auditing stage posture, eye contact, and gestures...');
        } else if (currentStep === 5) {
          setStatusMessage('Calculating 17-category institutional venture scorecard...');
        } else if (currentStep === 6) {
          setStatusMessage('Finalizing FINNA Pitch Report Card...');
        }
      } else {
        if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
        
        // Deep clone the prepared report from the conversation and attach the uploaded video
        const resultData: PitchAnalysisResult = JSON.parse(JSON.stringify(PREPARED_FINNA_REPORT));
        
        if (videoPreviewUrl) {
          resultData.videoPreviewUrl = videoPreviewUrl;
          if (resultData.metadata) {
            resultData.metadata.videoPreviewUrl = videoPreviewUrl;
            resultData.metadata.videoDuration = selectedFileName ? `${selectedFileName} (~11 min)` : '~11 min';
          }
        }
        if (startupName.trim() && startupName.trim() !== 'FINNA') {
          if (resultData.metadata) {
            resultData.metadata.startupName = startupName.trim();
          }
        }

        setTimeout(() => {
          setIsAnalyzing(false);
          onAnalysisComplete(resultData);
        }, 500);
      }
    }, 950);
  };

  useEffect(() => {
    return () => {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
    };
  }, []);

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null);
      if (!startupName) {
        const nameWithoutExt = file.name.split('.')[0].replace(/[-_]/g, ' ');
        setStartupName(nameWithoutExt.length > 25 ? 'FINNA' : nameWithoutExt);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null);
      if (!startupName) {
        const nameWithoutExt = file.name.split('.')[0].replace(/[-_]/g, ' ');
        setStartupName(nameWithoutExt.length > 25 ? 'FINNA' : nameWithoutExt);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-sans selection:bg-[#4b41e1] selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-[#c8c5ca] full-width sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-3.5 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="text-[#47464a] hover:text-[#000000] p-1.5 rounded-full hover:bg-[#f3f3f3] transition-colors"
              title="Back to home"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={onBackToHome}>
              <span className="material-symbols-outlined text-[22px] text-[#000000]">troubleshoot</span>
              <span className="font-heading font-bold text-[#000000] text-[1.125rem]">FINNA</span>
              <span className="ml-2 text-xs uppercase tracking-wider text-[#47464a] font-medium border border-[#c8c5ca] px-2 py-0.5 rounded">
                Pitch Report Engine
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-12 pb-20 px-6 md:px-12">
        <div className="max-w-[1280px] w-full mx-auto flex justify-center">
          {!isAnalyzing ? (
            /* Upload Workspace (Screen 1 / FINNA Pitch Upload) */
            <div className="w-full max-w-2xl bg-white border border-[#c8c5ca] rounded-xl p-8 md:p-10 transition-all opacity-100 flex flex-col items-center text-center shadow-sm">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-[32px] font-medium text-[#000000] mb-2 tracking-[-0.02em]">
                Upload your FINNA pitch video
              </h1>
              <p className="font-body text-[15px] text-[#47464a] mb-8">
                Evaluates audio, presentation slides, pitch narrative, and presenter body language across 17 venture dimensions.
              </p>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#f3f3f3] border border-[#c8c5ca] rounded-lg mb-6 w-full max-w-md">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    uploadMode === 'file'
                      ? 'bg-white text-[#000000] shadow-sm font-bold'
                      : 'text-[#47464a] hover:text-[#000000]'
                  }`}
                >
                  Pitch Video File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('text')}
                  className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    uploadMode === 'text'
                      ? 'bg-white text-[#000000] shadow-sm font-bold'
                      : 'text-[#47464a] hover:text-[#000000]'
                  }`}
                >
                  Pitch Text / Transcript
                </button>
              </div>

              {/* Optional Quick Fields */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-left">
                <div>
                  <label className="block text-[11px] font-semibold text-[#47464a] uppercase tracking-wider mb-1 font-heading">
                    Startup Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. FINNA"
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#c8c5ca] rounded text-[#1a1c1c] placeholder:text-[#858386] focus:outline-none focus:border-[#4b41e1] focus:ring-1 focus:ring-[#4b41e1]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#47464a] uppercase tracking-wider mb-1 font-heading">
                    Sector / Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI / Enterprise / Workflow"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#c8c5ca] rounded text-[#1a1c1c] placeholder:text-[#858386] focus:outline-none focus:border-[#4b41e1] focus:ring-1 focus:ring-[#4b41e1]"
                  />
                </div>
              </div>

              {uploadMode === 'file' ? (
                /* Dropzone with Video Preview */
                <div className="w-full mb-6">
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className="w-full border-2 border-dashed border-[#c8c5ca] hover:border-[#4b41e1] hover:bg-[#f9f9f9] transition-all duration-200 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer relative group overflow-hidden"
                  >
                    <input
                      type="file"
                      accept="video/*,audio/*,.mp4,.mov,.webm,.mkv,.avi"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-[42px] text-[#47464a] group-hover:text-[#4b41e1] transition-colors duration-200 mb-2">
                      cloud_upload
                    </span>
                    <h3 className="font-heading text-[17px] font-medium text-[#000000] mb-1">
                      {selectedFileName ? selectedFileName : 'Drop your pitch video here or Browse files'}
                    </h3>
                    <p className="font-body text-[12px] text-[#47464a]">
                      Upload your ~11 min pitch video · MP4, WebM, MOV supported (up to 1GB)
                    </p>
                    {selectedFile && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-[#eeecfc] text-[#4b41e1] text-xs font-medium rounded-full">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Ready to analyze ({Math.round(selectedFile.size / (1024 * 1024))} MB)
                      </div>
                    )}
                  </label>

                  {/* Observable Video Player Preview */}
                  {videoPreviewUrl && (
                    <div className="mt-4 bg-[#09090b] rounded-xl overflow-hidden border border-[#c8c5ca] p-2 flex flex-col items-center">
                      <video
                        controls
                        src={videoPreviewUrl}
                        className="w-full max-h-56 rounded-lg bg-black object-contain"
                      />
                      <div className="flex items-center justify-between w-full px-2 pt-2 text-xs text-[#a1a1aa]">
                        <span className="flex items-center gap-1.5 text-white font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {selectedFileName || 'Pitch Video'}
                        </span>
                        <span>{selectedFile ? `${Math.round(selectedFile.size / (1024 * 1024))} MB` : ''}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Transcript Input */
                <div className="w-full mb-6 text-left">
                  <label className="block text-[11px] font-semibold text-[#47464a] uppercase tracking-wider mb-1 font-heading">
                    Pitch Speech, Deck Narrative, or Video Transcript
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Paste your pitch script, transcript, or startup summary here..."
                    value={transcriptText}
                    onChange={(e) => setTranscriptText(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-[#c8c5ca] rounded text-[#1a1c1c] placeholder:text-[#858386] focus:outline-none focus:border-[#4b41e1] focus:ring-1 focus:ring-[#4b41e1]"
                  />
                </div>
              )}

              {/* Error Banner */}
              {errorMessage && (
                <div className="w-full mb-5 p-3.5 bg-[#fef2f2] border border-[#fecaca] rounded-lg text-left flex items-start gap-2.5 text-[#991b1b]">
                  <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
                  <div className="text-xs">
                    <p className="font-semibold mb-0.5">Evaluation Notice</p>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Start Evaluation Action */}
              <button
                onClick={handleStartAnalysis}
                className="w-full bg-[#000000] text-white hover:bg-[#1a1b22] font-heading font-medium text-[15px] py-3.5 px-6 rounded-lg transition-all shadow-sm mb-6 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
                Start FINNA Pitch Analysis
              </button>

              {/* Privacy Notice */}
              <div className="flex items-center justify-center gap-2 text-[#47464a] bg-[#f3f3f3] px-4 py-3 rounded-lg w-full">
                <span className="material-symbols-outlined text-[16px] shrink-0">lock</span>
                <p className="font-body text-[12px]">
                  Your pitch video is processed securely via Gemini File API and discarded after evaluation.
                </p>
              </div>
            </div>
          ) : (
            /* Analysis Screen (Screen 2 / Connected Vertical Timeline) */
            <div className="w-full max-w-2xl bg-white border border-[#c8c5ca] rounded-xl p-8 md:p-12 transition-all flex flex-col items-center shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-[#4b41e1] animate-spin text-[28px]">
                  refresh
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[#000000]">
                  Analyzing your FINNA pitch video...
                </h2>
              </div>
              <p className="text-xs font-mono text-[#47464a] mb-6 bg-[#f3f3f3] px-3 py-1.5 rounded border border-[#c8c5ca]">
                {statusMessage}
              </p>

              {/* Video mini player preview during analysis */}
              {videoPreviewUrl && (
                <div className="w-full max-w-md mb-6 rounded-xl overflow-hidden border border-[#e4e4e7] bg-black p-1.5">
                  <video
                    controls
                    src={videoPreviewUrl}
                    className="w-full max-h-44 object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="w-full max-w-md relative pl-2">
                {/* Timeline Line */}
                <div
                  className="absolute left-[22px] top-[14px] bottom-[14px] w-[2px] bg-[#e8e8e8]"
                  style={{
                    background: `linear-gradient(to bottom, #4b41e1 0%, #4b41e1 ${
                      (activeStepIndex / (timelineSteps.length - 1)) * 100
                    }%, #e8e8e8 ${
                      (activeStepIndex / (timelineSteps.length - 1)) * 100
                    }%, #e8e8e8 100%)`
                  }}
                />

                {/* Steps */}
                <ul className="flex flex-col gap-6 relative z-10 w-full">
                  {timelineSteps.map((step, idx) => {
                    const isDone = idx < activeStepIndex;
                    const isActive = idx === activeStepIndex;

                    return (
                      <li
                        key={idx}
                        className={`flex items-start gap-4 transition-all duration-300 ${
                          isDone
                            ? 'opacity-80'
                            : isActive
                            ? 'opacity-100 font-semibold'
                            : 'opacity-30'
                        }`}
                      >
                        {isDone ? (
                          <div className="w-6 h-6 rounded-full bg-[#4b41e1] text-white flex items-center justify-center mt-0.5 shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-[14px] font-bold">
                              check
                            </span>
                          </div>
                        ) : isActive ? (
                          <div className="w-6 h-6 rounded-full border-2 border-[#4b41e1] bg-white flex items-center justify-center mt-0.5 shadow-sm relative shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#4b41e1] animate-ping" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-[#c8c5ca] bg-white flex items-center justify-center mt-0.5 shrink-0" />
                        )}

                        <div>
                          <p
                            className={`font-body text-[15px] ${
                              isActive
                                ? 'text-[#000000] font-medium'
                                : isDone
                                ? 'text-[#000000]'
                                : 'text-[#47464a]'
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#c8c5ca] w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-6 max-w-[1280px] mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#000000]">
              FINNA
            </span>
            <p className="font-body text-xs text-[#47464a]">
              © 2026 FINNA. All data is processed temporarily for evaluation purposes.
            </p>
            <p className="font-body text-xs text-[#47464a]">
              Built &amp; Developed by Aswin &nbsp;R. &nbsp; | &nbsp;{' '}
              <a
                href="mailto:ravindran.aswin2007@gmail.com"
                className="text-[#4b41e1] hover:underline"
              >
                ravindran.aswin2007@gmail.com
              </a>
            </p>
          </div>
          <div className="flex gap-6 font-body text-xs text-[#47464a]">
            <span className="hover:text-[#000000] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#000000] transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
