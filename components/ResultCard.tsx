import React from 'react';
import { AssessmentResult } from '../types';
import DiffView from './DiffView';
import GlassSurface from './GlassSurface';

interface ResultCardProps {
  result: AssessmentResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner: Grade & Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <div className="col-span-1 rounded-3xl p-8 border border-white/20 bg-neutral-900/50 flex flex-col items-center justify-center text-center backdrop-blur-sm">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Final Grade</div>
          <div className="text-8xl font-light tracking-tighter text-white mb-4">{result.grade}</div>
          <div className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300">{result.score} / 10</div>
        </div>

        {/* Feedback Card */}
        <div className="col-span-1 md:col-span-2 bg-neutral-900 rounded-3xl p-8 border border-white/10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-white" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
             </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-white"></div>
            Reviewer Feedback
          </h3>
          <p className="text-neutral-300 text-xl leading-relaxed font-light">"{result.feedback}"</p>
        </div>
      </div>

      {/* Reasoning Section */}
      <div className="bg-black rounded-3xl shadow-sm border border-white/10 p-8">
        <h3 className="text-lg font-medium text-white mb-4">Detailed Reasoning</h3>
        <p className="text-neutral-400 leading-relaxed font-light">{result.reasoning}</p>
      </div>

      {/* Diff View */}
      <div className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Transcription & Grading</h2>
         </div>
         <DiffView original={result.extractedText} corrected={result.correctedText} />
      </div>

      {/* Extracted Raw Text (Optional, collapsed or simpler view) */}
      <div className="bg-neutral-900 rounded-xl p-1 border border-white/5">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-neutral-400 list-none hover:text-white transition-colors">
            <span>View Raw Extracted Text</span>
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <div className="text-neutral-500 p-4 pt-0 text-sm font-mono whitespace-pre-wrap border-t border-white/5 mt-2 pt-4">
            {result.extractedText}
          </div>
        </details>
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={onReset}>
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={50}
          borderWidth={0.07}
          brightness={50}
          opacity={0.93}
          blur={11}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          backgroundOpacity={0.1}
          mixBlendMode="screen"
          className="px-8 py-4"
        >
          <div className="flex items-center gap-3 font-bold text-white tracking-wide uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Grade Another
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};

export default ResultCard;