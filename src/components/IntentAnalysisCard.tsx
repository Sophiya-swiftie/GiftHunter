import React from 'react';
import { Compass, Sparkles, Layers, Cpu } from 'lucide-react';

interface IntentAnalysisCardProps {
  intentText: string;
  subcultures: string[];
}

export const IntentAnalysisCard: React.FC<IntentAnalysisCardProps> = ({
  intentText,
  subcultures,
}) => {
  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 sm:p-7 shadow-xl shadow-indigo-950/20 backdrop-blur-md relative overflow-hidden">
      {/* Background aesthetic gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Execution Step 1
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Intent Analysis & Subculture Overlap</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
          </div>
        </div>

        {subcultures.length >= 2 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Creative Venn Intersection Active</span>
          </div>
        )}
      </div>

      {/* Subculture Intersection Visualizer Badge */}
      {subcultures.length >= 2 && (
        <div className="mb-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Mapped Intersections:</span>
          {subcultures.map((sub, idx) => (
            <React.Fragment key={sub}>
              <span className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 font-semibold">
                {sub}
              </span>
              {idx < subcultures.length - 1 && (
                <span className="text-amber-400 font-extrabold text-sm">✕</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Intent Analysis Body */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-line">
        {intentText}
      </div>
    </div>
  );
};
