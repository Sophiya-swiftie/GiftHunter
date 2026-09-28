import React from 'react';
import { Sparkles, Compass, Search, Tag, ArrowRight } from 'lucide-react';
import { PRESET_PROFILES, PresetProfile } from '../data/presets';

interface HeroProps {
  onSelectPreset: (preset: PresetProfile) => void;
  selectedPresetId?: string;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPreset, selectedPresetId }) => {
  return (
    <div className="relative pt-6 pb-4 sm:pt-10 sm:pb-8 text-center max-w-4xl mx-auto px-4">
      {/* Decorative ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-medium mb-4 shadow-sm backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>The Anti-Generic Gift Concierge</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Gifts Found at the <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-amber-400 via-rose-300 to-indigo-400 bg-clip-text text-transparent">
          Creative Intersection
        </span>{' '}
        of Their Hobbies
      </h1>

      <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
        Stop agonizing over boring candles or generic gift cards. Tell our strategic AI agent their age, specific quirks, and overlapping passions. We engineer <strong>subculture crossovers</strong> with actionable e-commerce search strategies.
      </p>

      {/* Step pipeline indicator */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 text-left">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Intent Analysis</div>
            <div className="text-[11px] text-slate-400">Map overlapping subcultures</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Search Strategy</div>
            <div className="text-[11px] text-slate-400">3 precise catalog queries</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            3
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Tailored Gifts</div>
            <div className="text-[11px] text-slate-400">3 vetted options + budget check</div>
          </div>
        </div>
      </div>

      {/* Archetype Quick-Picks */}
      <div className="text-left max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            ⚡ Quick-Try Creative Archetypes
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Click to auto-populate the hunt form
          </span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-5 sm:gap-2 sm:overflow-visible">
          {PRESET_PROFILES.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`flex-shrink-0 text-left p-2.5 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/60 ring-1 ring-amber-500/40 text-white'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="text-xl mb-1">{preset.avatar}</div>
                <div className="text-xs font-semibold line-clamp-1 text-slate-100">
                  {preset.name}
                </div>
                <div className="text-[10px] text-amber-400/90 font-medium truncate mt-0.5">
                  {preset.intersection}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
