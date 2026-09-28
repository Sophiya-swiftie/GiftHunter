import React, { useState } from 'react';
import { 
  Sparkles, 
  Tag, 
  DollarSign, 
  Smile, 
  Plus, 
  X, 
  SlidersHorizontal, 
  FileText, 
  HeartHandshake,
  Lightbulb,
  Search,
  Wand2
} from 'lucide-react';
import { RecipientProfile } from '../types';
import { POPULAR_HOBBIES, VIBE_OPTIONS } from '../data/presets';

interface ProfileFormProps {
  profile: RecipientProfile;
  onChange: (profile: RecipientProfile) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'guided' | 'prompt'>('guided');
  const [customHobbyInput, setCustomHobbyInput] = useState('');

  const handleAddHobby = (hobby: string) => {
    const trimmed = hobby.trim();
    if (!trimmed) return;
    if (!profile.hobbies.includes(trimmed)) {
      onChange({
        ...profile,
        hobbies: [...profile.hobbies, trimmed],
      });
    }
    setCustomHobbyInput('');
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    onChange({
      ...profile,
      hobbies: profile.hobbies.filter((h) => h !== hobbyToRemove),
    });
  };

  const handleQuirkIdea = () => {
    const ideas = [
      'Refuses to drink coffee that has touched paper cups and has an encyclopedic memory for sci-fi trivia.',
      'Owns 3 rescue cats named after Renaissance painters and collects miniature handmade pottery.',
      'Spends weekends restoring vintage mechanical cameras and always carries a sketchpad with handmade ink.',
      'Obsessed with hot sauces rated over 500,000 Scoville and builds custom LEGO architectural models.',
      'Refuses to use digital bookmarks and leaves pressed wild flowers inside every novel they finish.',
    ];
    const random = ideas[Math.floor(Math.random() * ideas.length)];
    onChange({ ...profile, quirks: random });
  };

  const isFormValid =
    activeTab === 'guided'
      ? (profile.hobbies.length > 0 || profile.quirks.trim().length > 0) && Number(profile.budget) > 0
      : (profile.customPrompt && profile.customPrompt.trim().length > 10);

  return (
    <div className="max-w-4xl mx-auto px-4 mb-10">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Tab switch header */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 sm:p-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('guided')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'guided'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Guided Profile Builder</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'prompt'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Direct Prompt Brief</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid && !isLoading) {
              onSubmit();
            }
          }}
          className="p-5 sm:p-8"
        >
          {activeTab === 'guided' ? (
            <div className="space-y-6">
              {/* Row 1: Relationship & Age & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Who is this for?
                  </label>
                  <input
                    type="text"
                    value={profile.relationship}
                    onChange={(e) => onChange({ ...profile, relationship: e.target.value })}
                    placeholder="e.g. Sister, Husband, Best Friend"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Approximate Age
                  </label>
                  <input
                    type="text"
                    value={profile.age}
                    onChange={(e) => onChange({ ...profile, age: e.target.value })}
                    placeholder="e.g. 28, early 30s, 60"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Occasion (Optional)
                  </label>
                  <input
                    type="text"
                    value={profile.occasion}
                    onChange={(e) => onChange({ ...profile, occasion: e.target.value })}
                    placeholder="e.g. Birthday, Housewarming, Just Because"
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Distinct Hobbies & Sub-cultures (Critical for intersection) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Distinct Hobbies, Passions & Sub-cultures (Pick 2+ for magic overlaps)</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {profile.hobbies.length} selected
                  </span>
                </div>

                {/* Selected tags */}
                <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] p-2 bg-slate-950/50 rounded-xl border border-slate-800">
                  {profile.hobbies.length === 0 ? (
                    <span className="text-xs text-slate-500 italic px-2 py-1">
                      No hobbies added yet. Type below or click popular suggestions to uncover creative intersections!
                    </span>
                  ) : (
                    profile.hobbies.map((hobby) => (
                      <span
                        key={hobby}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/30 text-xs font-medium"
                      >
                        {hobby}
                        <button
                          type="button"
                          onClick={() => handleRemoveHobby(hobby)}
                          className="hover:text-white rounded-full p-0.5 hover:bg-amber-500/30 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Custom hobby input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={customHobbyInput}
                    onChange={(e) => setCustomHobbyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHobby(customHobbyInput);
                      }
                    }}
                    placeholder="Type a specific sub-culture (e.g. Black Metal, Bonsai, Mechanical Keyboards, Sourdough) and press Enter"
                    className="flex-1 bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddHobby(customHobbyInput)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Popular chips */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-slate-400 py-1 mr-1">Popular:</span>
                  {POPULAR_HOBBIES.slice(0, 10).map((h) => {
                    const isAdded = profile.hobbies.includes(h);
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => (isAdded ? handleRemoveHobby(h) : handleAddHobby(h))}
                        className={`text-[11px] px-2.5 py-1 rounded-full transition-colors border ${
                          isAdded
                            ? 'bg-amber-500/30 text-amber-200 border-amber-500/40 font-semibold'
                            : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {isAdded ? '✓ ' : '+ '}
                        {h}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Quirks, Habits & Peculiarities */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Smile className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quirks, Inside Jokes & Distinct Peculiarities</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleQuirkIdea}
                    className="text-[11px] text-amber-400/90 hover:text-amber-300 flex items-center gap-1 hover:underline"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Inspire me with a quirk</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={profile.quirks}
                  onChange={(e) => onChange({ ...profile, quirks: e.target.value })}
                  placeholder="e.g. Refuses to drink coffee that has touched a paper cup; names all their potted plants after 90s rock stars; obsessively color-codes their bookshelf."
                  className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 resize-none transition-all"
                />
              </div>

              {/* Row 4: Budget & Vibe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-800">
                {/* Budget input with quick presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Target Budget</span>
                    </label>
                    <span className="text-xs font-bold text-emerald-400">
                      {profile.currency}
                      {profile.budget}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <select
                      value={profile.currency}
                      onChange={(e) => onChange({ ...profile, currency: e.target.value })}
                      aria-label="Currency"
                      className="bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-2 text-sm text-slate-200 focus:outline-none"
                    >
                      <option value="$">$ USD</option>
                      <option value="€">€ EUR</option>
                      <option value="£">£ GBP</option>
                      <option value="₹">₹ INR</option>
                      <option value="C$">C$ CAD</option>
                      <option value="A$">A$ AUD</option>
                    </select>

                    <input
                      type="number"
                      min="5"
                      max="1000"
                      value={profile.budget}
                      onChange={(e) => onChange({ ...profile, budget: e.target.value })}
                      className="flex-1 bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>

                  {/* Quick budget pill buttons */}
                  <div className="flex gap-1.5">
                    {['25', '45', '75', '100', '150'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => onChange({ ...profile, budget: amt })}
                        className={`text-[11px] px-2.5 py-0.5 rounded-lg border transition-colors ${
                          profile.budget === amt
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {profile.currency}{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vibe selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Curation Vibe
                  </label>
                  <select
                    value={profile.vibe}
                    onChange={(e) => onChange({ ...profile, vibe: e.target.value })}
                    className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                  >
                    {VIBE_OPTIONS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Directs the AI to balance extreme creativity with daily utility.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Direct Freeform Prompt Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Natural Language Recipient Brief</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Include age, relationship, hobbies, quirks & budget
                </span>
              </div>

              <textarea
                rows={5}
                value={profile.customPrompt || ''}
                onChange={(e) => onChange({ ...profile, customPrompt: e.target.value })}
                placeholder="Example: My 28-year-old sister is deeply into black metal music and rare succulent propagation. She wears all-black overalls when repotting plants and loves gloomy aesthetics. Budget is around $45."
                className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 font-mono leading-relaxed resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Explicit Budget:</span>
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1">
                    <span className="text-xs text-slate-400">{profile.currency}</span>
                    <input
                      type="number"
                      value={profile.budget}
                      onChange={(e) => onChange({ ...profile, budget: e.target.value })}
                      className="w-16 bg-transparent text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>The AI will extract subcultures and create precise e-commerce search strategies.</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Strict Rule: Zero generic gift cards or plain mugs</span>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-95 ${
                !isFormValid || isLoading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  : 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:via-rose-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/40 cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Hunting Creative Intersections...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Hunt 3 Hyper-Personalized Gifts</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
