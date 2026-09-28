import React from 'react';
import { Gift, BookmarkCheck, Sparkles, ShieldCheck } from 'lucide-react';
import { SavedGiftItem } from '../types';

interface HeaderProps {
  savedCount: number;
  onOpenStash: () => void;
  onNewHunt: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenStash,
  onNewHunt,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onNewHunt}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                GiftHunter
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                AI Curator
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Hyper-Personalized Intersections • Zero Generic Fluff
            </p>
          </div>
        </div>

        {/* Guarantees & Stash Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strictly No Plain Mugs or Gift Cards</span>
          </div>

          <button
            onClick={onOpenStash}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors active:scale-95"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-400" />
            <span>Saved Stash</span>
            {savedCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-full animate-bounce">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
