import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check, RefreshCw, HeartHandshake } from 'lucide-react';
import { GiftItem } from '../types';

interface CardNoteModalProps {
  gift: GiftItem | null;
  onClose: () => void;
  recipientContext: string;
}

export const CardNoteModal: React.FC<CardNoteModalProps> = ({
  gift,
  onClose,
  recipientContext,
}) => {
  const [tone, setTone] = useState<'witty and warm' | 'heartfelt and emotional' | 'playful and teasing'>('witty and warm');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (gift) {
      generateNote();
    }
  }, [gift, tone]);

  const generateNote = async () => {
    if (!gift) return;
    setIsLoading(true);
    setCopied(false);
    try {
      const res = await fetch('/api/gift-card-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          giftTitle: gift.title,
          recipientDetails: recipientContext,
          tone,
        }),
      });
      const data = await res.json();
      if (data.success && data.note) {
        setNote(data.note);
      } else {
        setNote(`Happy celebration! When I found this ${gift.title}, I knew nobody on earth would appreciate it quite like you.`);
      }
    } catch (err) {
      setNote(`Wishing you endless joy with this ${gift.title}! Picked especially with your unique passions in mind.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!gift) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Gift Card Note Drafter</h3>
            <p className="text-xs text-slate-400">Personalized card message to accompany this gift</p>
          </div>
        </div>

        <div className="p-3 my-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
          <span className="font-semibold text-amber-300">For item:</span> {gift.title}
        </div>

        {/* Tone options */}
        <div className="flex gap-2 my-3">
          {[
            { id: 'witty and warm', label: 'Witty & Warm' },
            { id: 'heartfelt and emotional', label: 'Heartfelt' },
            { id: 'playful and teasing', label: 'Playful & Teasing' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id as any)}
              className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors border ${
                tone === t.id
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Note display */}
        <div className="relative my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[100px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Drafting custom greeting...</span>
            </div>
          ) : (
            <p className="font-serif italic text-sm text-slate-200 leading-relaxed text-center">
              "{note}"
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={generateNote}
            disabled={isLoading}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Generate New Variation</span>
          </button>

          <button
            onClick={handleCopy}
            disabled={isLoading || !note}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy to Card</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
