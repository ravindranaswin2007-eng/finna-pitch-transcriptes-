import React, { useState } from 'react';
import { PitchAnalysisResult } from '../types/pitch';

interface TranscriptViewProps {
  pitchData: PitchAnalysisResult;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({ pitchData }) => {
  const { transcript, metadata } = pitchData;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLines = transcript.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.timestamp.includes(searchQuery)
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca] border border-indigo-100 uppercase tracking-wider font-heading">
              Verbatim Dialogue
            </span>
          </div>
          <h2 className="font-heading text-[1.5rem] font-medium text-[#0a0a0a] tracking-tight">
            Word-for-Word Pitch & Q&A Transcript
          </h2>
          <p className="font-body text-sm text-[#52525b] mt-1">
            Complete time-stamped transcription of both the founder pitch and the live investor exchange.
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search transcript by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-white border border-[#e4e4e7] rounded-lg text-[#0a0a0a] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#0a0a0a] font-body"
          />
        </div>
      </div>

      {/* Transcript Stream */}
      <div className="bg-white border border-[#e4e4e7] rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
        {filteredLines.map((item, idx) => {
          const isJudge =
            item.speaker.toLowerCase().includes('judge') ||
            item.speaker.toLowerCase().includes('investor') ||
            item.speaker.toLowerCase().includes('jury');

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl transition-all ${
                isJudge
                  ? 'bg-rose-50/30 border border-rose-100'
                  : 'bg-[#fafafa] border border-[#e4e4e7]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-heading text-xs font-semibold uppercase tracking-wider ${
                      isJudge ? 'text-rose-700' : 'text-[#0a0a0a]'
                    }`}
                  >
                    {item.speaker}
                  </span>
                  {item.sentiment && (
                    <span className="text-[10px] font-medium text-[#71717a] font-body">
                      • {item.sentiment}
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono font-medium text-[#71717a]">
                  {item.timestamp}
                </span>
              </div>

              <p className="font-body text-sm text-[#52525b] leading-relaxed">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
