import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  BookmarkCheck, 
  ShoppingBag,
  Share2
} from 'lucide-react';
import { SavedGiftItem } from '../types';

interface GiftStashDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedGifts: SavedGiftItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const GiftStashDrawer: React.FC<GiftStashDrawerProps> = ({
  isOpen,
  onClose,
  savedGifts,
  onRemove,
  onClear,
}) => {
  const [copiedPlan, setCopiedPlan] = useState(false);

  if (!isOpen) return null;

  const handleCopyAll = () => {
    if (savedGifts.length === 0) return;
    const text = savedGifts
      .map(
        (g, i) =>
          `${i + 1}. ${g.title}\n   Recipient: ${g.recipientName || 'Special Person'}\n   Why: ${g.whyPerfect}\n   Budget Check: ${g.priceBracketCheck}\n   Search on Amazon: ${g.ecommerceLinks.amazon}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(`🎁 My Curated Gift Stash (${savedGifts.length} items):\n\n${text}`);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Saved Gift Stash</h3>
                <p className="text-xs text-slate-400">
                  {savedGifts.length} curated {savedGifts.length === 1 ? 'gift' : 'gifts'} bookmarked
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5">
            {savedGifts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
                  <BookmarkCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-300">Your stash is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Click the bookmark icon on any curated gift recommendation to save it here for comparison.
                </p>
              </div>
            ) : (
              savedGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 space-y-2 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {gift.title}
                    </h4>
                    <button
                      onClick={() => onRemove(gift.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {gift.whyPerfect}
                  </p>

                  <div className="text-[10px] text-emerald-400 font-medium">
                    {gift.priceBracketCheck}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <a
                      href={gift.ecommerceLinks.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-amber-300 hover:underline flex items-center gap-1"
                    >
                      <span>Amazon</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={gift.ecommerceLinks.etsy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-orange-300 hover:underline flex items-center gap-1"
                    >
                      <span>Etsy</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={gift.ecommerceLinks.googleShopping}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-300 hover:underline flex items-center gap-1"
                    >
                      <span>Google Shopping</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {savedGifts.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={handleCopyAll}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
              >
                {copiedPlan ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Gift Plan Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Full Shopping List</span>
                  </>
                )}
              </button>

              <button
                onClick={onClear}
                className="w-full py-2 rounded-xl text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 transition-colors"
              >
                Clear Stash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
