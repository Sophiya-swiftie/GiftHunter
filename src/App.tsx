import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  Eye, 
  Code, 
  AlertCircle, 
  Heart, 
  SlidersHorizontal,
  Compass,
  ArrowDown
} from 'lucide-react';
import { RecipientProfile, HuntResult, GiftItem, SavedGiftItem } from './types';
import { PRESET_PROFILES, PresetProfile } from './data/presets';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileForm } from './components/ProfileForm';
import { IntentAnalysisCard } from './components/IntentAnalysisCard';
import { SearchStrategyCard } from './components/SearchStrategyCard';
import { GiftRecommendationsGrid } from './components/GiftRecommendationsGrid';
import { RawMarkdownViewer } from './components/RawMarkdownViewer';
import { CardNoteModal } from './components/CardNoteModal';
import { GiftStashDrawer } from './components/GiftStashDrawer';

const DEFAULT_PROFILE: RecipientProfile = {
  relationship: 'Sister',
  age: '28',
  hobbies: ['Succulent & Rare Houseplant Propagation', 'Heavy Metal & Doom Rock Shows'],
  quirks: 'Names her carnivorous pitcher plants after 90s metal band frontmen; wears all-black gardening overalls.',
  occasion: 'Birthday',
  budget: '45',
  currency: '$',
  vibe: 'Creative Intersection & High Utility',
  customPrompt: '',
};

export default function App() {
  const [profile, setProfile] = useState<RecipientProfile>(DEFAULT_PROFILE);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('metal-gardener');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [huntResult, setHuntResult] = useState<HuntResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'markdown'>('visual');

  // Stash state
  const [savedGifts, setSavedGifts] = useState<SavedGiftItem[]>(() => {
    try {
      const stored = localStorage.getItem('gifthunter_stash');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isStashOpen, setIsStashOpen] = useState(false);

  // Card note modal state
  const [activeCardGift, setActiveCardGift] = useState<GiftItem | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gifthunter_stash', JSON.stringify(savedGifts));
    } catch (e) {
      console.error('Failed to save stash to localStorage', e);
    }
  }, [savedGifts]);

  const handleSelectPreset = (preset: PresetProfile) => {
    setSelectedPresetId(preset.id);
    setProfile(preset.profile);
    setError(null);
  };

  const handleExecuteHunt = async (customOverridePrompt?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        prompt: customOverridePrompt || profile.customPrompt,
        relationship: profile.relationship,
        age: profile.age,
        hobbies: profile.hobbies,
        quirks: profile.quirks,
        budget: profile.budget,
        currency: profile.currency,
        occasion: profile.occasion,
        vibe: profile.vibe,
      };

      const res = await fetch('/api/hunt-gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to curate gifts. Please try again.');
      }

      const result: HuntResult = {
        rawMarkdown: data.rawMarkdown,
        intentAnalysis: data.intentAnalysis,
        subcultures: data.subcultures && data.subcultures.length > 0 ? data.subcultures : profile.hobbies,
        searchStrategy: data.searchStrategy,
        recommendations: data.recommendations,
        budget: data.budget,
        promptUsed: data.promptUsed,
      };

      setHuntResult(result);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#ec4899', '#6366f1', '#10b981'],
        });
      } catch {
        // Safe fallback if blocked
      }

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Hunt error:', err);
      setError(err?.message || 'Something went wrong while curating. Please check your prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSaveGift = (gift: GiftItem) => {
    const exists = savedGifts.some((g) => g.id === gift.id);
    if (exists) {
      setSavedGifts(savedGifts.filter((g) => g.id !== gift.id));
    } else {
      const newSavedItem: SavedGiftItem = {
        ...gift,
        recipientName: profile.relationship || 'Loved One',
        savedAt: Date.now(),
      };
      setSavedGifts([newSavedItem, ...savedGifts]);
    }
  };

  const handleRemoveSavedGift = (id: string) => {
    setSavedGifts(savedGifts.filter((g) => g.id !== id));
  };

  const handleClearStash = () => {
    setSavedGifts([]);
  };

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    setSelectedPresetId('metal-gardener');
    setHuntResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header */}
      <Header
        savedCount={savedGifts.length}
        onOpenStash={() => setIsStashOpen(true)}
        onNewHunt={handleReset}
      />

      <main className="pb-24">
        {/* Hero Section */}
        <Hero
          onSelectPreset={handleSelectPreset}
          selectedPresetId={selectedPresetId}
        />

        {/* Profile Input Form */}
        <ProfileForm
          profile={profile}
          onChange={(newProfile) => {
            setProfile(newProfile);
            setSelectedPresetId('');
          }}
          onSubmit={() => handleExecuteHunt()}
          isLoading={isLoading}
        />

        {/* Error notification if any */}
        {error && (
          <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => handleExecuteHunt()}
                className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Hunt Results Section */}
        {huntResult && (
          <div ref={resultsRef} className="max-w-5xl mx-auto px-4 space-y-8 scroll-mt-20">
            {/* Results Title Bar with View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Mission Complete</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  3 Tailored Gifts for {profile.relationship || 'Recipient'} ({huntResult.budget})
                </h2>
              </div>

              {/* Toggle Visual vs Raw Markdown View */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    viewMode === 'visual'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Curation</span>
                </button>

                <button
                  onClick={() => setViewMode('markdown')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    viewMode === 'markdown'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Raw Markdown</span>
                </button>
              </div>
            </div>

            {viewMode === 'visual' ? (
              <div className="space-y-8">
                {/* 1. INTENT ANALYSIS */}
                <IntentAnalysisCard
                  intentText={huntResult.intentAnalysis}
                  subcultures={huntResult.subcultures}
                />

                {/* 2. SEARCH STRATEGY DEFINITION */}
                <SearchStrategyCard
                  searchStrategy={huntResult.searchStrategy}
                />

                {/* 3. GIFT RECOMMENDATIONS */}
                <GiftRecommendationsGrid
                  recommendations={huntResult.recommendations}
                  savedGifts={savedGifts}
                  onToggleSave={handleToggleSaveGift}
                  onOpenCardNote={(gift) => setActiveCardGift(gift)}
                  targetBudget={huntResult.budget}
                />
              </div>
            ) : (
              /* Raw Markdown View (direct agent format protocol) */
              <RawMarkdownViewer rawMarkdown={huntResult.rawMarkdown} />
            )}

            {/* Quick iteration / reroll banner */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm font-semibold text-white">Want to explore a different angle?</div>
                <div className="text-xs text-slate-400">Reroll with tweaked vibes or budget limits.</div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setProfile({ ...profile, vibe: 'Artisan / Niche Specialist' });
                    handleExecuteHunt();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors"
                >
                  ⚡ More Niche / Insider
                </button>

                <button
                  onClick={() => {
                    setProfile({ ...profile, vibe: 'Bold Mashup & Conversation Starter' });
                    handleExecuteHunt();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors"
                >
                  🎭 Wilder Mashup
                </button>

                <button
                  onClick={() => handleExecuteHunt()}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reroll 3 Fresh Options</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Greeting Card Note Modal */}
      <CardNoteModal
        gift={activeCardGift}
        onClose={() => setActiveCardGift(null)}
        recipientContext={`${profile.relationship || 'Loved one'}, age ${profile.age || 'adult'}. Passions: ${profile.hobbies.join(', ')}. Quirks: ${profile.quirks}.`}
      />

      {/* Saved Gift Stash Drawer */}
      <GiftStashDrawer
        isOpen={isStashOpen}
        onClose={() => setIsStashOpen(false)}
        savedGifts={savedGifts}
        onRemove={handleRemoveSavedGift}
        onClear={handleClearStash}
      />
    </div>
  );
}
