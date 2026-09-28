import React, { useState } from 'react';
import { 
  Gift, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Sparkles,
  ShoppingBag,
  Share2,
  DollarSign,
  Copy,
  Check
} from 'lucide-react';
import { GiftItem, SavedGiftItem } from '../types';

interface GiftRecommendationsGridProps {
  recommendations: GiftItem[];
  savedGifts: SavedGiftItem[];
  onToggleSave: (item: GiftItem) => void;
  onOpenCardNote: (item: GiftItem) => void;
  targetBudget: string;
}

export const GiftRecommendationsGrid: React.FC<GiftRecommendationsGridProps> = ({
  recommendations,
  savedGifts,
  onToggleSave,
  onOpenCardNote,
  targetBudget,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isSaved = (id: string) => savedGifts.some((g) => g.id === id);

  const handleCopyTitle = (item: GiftItem) => {
    navigator.clipboard.writeText(`${item.title}\nWhy it's perfect: ${item.whyPerfect}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-7 shadow-xl shadow-emerald-950/20 backdrop-blur-md relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Execution Step 3
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Tailored Gift Recommendations</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>All 3 Vetted Against Budget ({targetBudget})</span>
        </div>
      </div>

      {/* Grid of 3 Gift Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((gift, idx) => {
          const saved = isSaved(gift.id);

          return (
            <div
              key={gift.id || idx}
              className="flex flex-col justify-between rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 p-5 transition-all duration-200 group relative shadow-lg"
            >
              {/* Option Number Tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Option {idx + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyTitle(gift)}
                    title="Copy details"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    {copiedId === gift.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => onToggleSave(gift)}
                    title={saved ? 'Remove from Stash' : 'Save to Gift Stash'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      saved
                        ? 'text-amber-400 bg-amber-500/20'
                        : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                    }`}
                  >
                    {saved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Product Title */}
              <div className="mb-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  Product Title
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {gift.title}
                </h3>
              </div>

              {/* Why It's Perfect */}
              <div className="mb-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Why It's Perfect</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {gift.whyPerfect}
                </p>
              </div>

              {/* Price Bracket Check */}
              <div className="mb-5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Price Bracket Check</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
                  {gift.priceBracketCheck}
                </p>
              </div>

              {/* E-Commerce Search Actions & Note Button */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80 mt-auto">
                <div className="text-[11px] font-medium text-slate-400">
                  Shop live inventory:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={gift.ecommerceLinks.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Amazon</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={gift.ecommerceLinks.etsy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Etsy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={gift.ecommerceLinks.googleShopping}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Search All Stores (Google Shopping)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Draft Card Message Button */}
                <button
                  type="button"
                  onClick={() => onOpenCardNote(gift)}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Draft Personal Card Message</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
