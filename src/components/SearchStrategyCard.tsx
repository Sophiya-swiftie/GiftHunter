import React, { useState } from 'react';
import { Search, Copy, Check, ExternalLink, ShoppingBag, Globe } from 'lucide-react';

interface SearchStrategyCardProps {
  searchStrategy: string[];
}

export const SearchStrategyCard: React.FC<SearchStrategyCardProps> = ({
  searchStrategy,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (term: string, index: number) => {
    navigator.clipboard.writeText(term);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-xl shadow-amber-950/20 backdrop-blur-md relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Execution Step 2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Search Strategy Definition</span>
              <Search className="w-4 h-4 text-amber-400" />
            </h2>
          </div>
        </div>

        <span className="text-xs text-slate-400">
          Structural Catalog Search Terms (E-Commerce Ready)
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
        These 3 precision queries include material, functional, and stylistic keywords designed to unlock niche catalog listings without triggering spam results. Click any term to search live on Amazon, Google, Etsy, or Flipkart.
      </p>

      {/* 3 Strategy Items */}
      <div className="space-y-3">
        {searchStrategy.map((term, index) => {
          const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(term)}`;
          const etsyUrl = `https://www.etsy.com/search?q=${encodeURIComponent(term)}`;
          const googleUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(term)}`;
          const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(term)}`;

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  #{index + 1}
                </span>
                <div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-amber-200 group-hover:text-amber-100 transition-colors">
                    "{term}"
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Structural search anchor with targeted attributes
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  onClick={() => handleCopy(term, index)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="Copy search query"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Search live on Amazon"
                >
                  <span>Amazon</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={etsyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Search live on Etsy"
                >
                  <span>Etsy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Search Google Shopping"
                >
                  <span>Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
