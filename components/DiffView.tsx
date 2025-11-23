import React, { useMemo } from 'react';
import { computeDiff } from '../utils/diff';

interface DiffViewProps {
  original: string;
  corrected: string;
}

const DiffView: React.FC<DiffViewProps> = ({ original, corrected }) => {
  const diffs = useMemo(() => computeDiff(original, corrected), [original, corrected]);

  return (
    <div className="bg-neutral-900/30 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
      <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <h3 className="font-medium text-white tracking-wide text-sm uppercase">Corrections & Improvements</h3>
      </div>
      <div className="p-8 font-mono text-base leading-relaxed whitespace-pre-wrap">
        {diffs.map((part, index) => {
          if (part.type === 'add') {
            return (
              <span key={index} className="text-white font-bold border-b border-white/50 mx-0.5" title="Correction added">
                {part.value}
              </span>
            );
          }
          if (part.type === 'del') {
            return (
              <span key={index} className="text-neutral-600 line-through decoration-neutral-600 px-0.5 opacity-50" title="Original error removed">
                {part.value}
              </span>
            );
          }
          return <span key={index} className="text-neutral-400">{part.value}</span>;
        })}
      </div>
      <div className="bg-black/20 px-6 py-3 border-t border-white/5 flex gap-6 text-xs text-neutral-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-neutral-600 line-through decoration-neutral-600">Deleted</span>
          <span>Original Error</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold border-b border-white/50">Added</span>
          <span>Correction</span>
        </div>
      </div>
    </div>
  );
};

export default DiffView;