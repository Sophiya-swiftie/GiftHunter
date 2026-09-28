import React, { useState } from 'react';
import { Terminal, Copy, Check, Eye, Code } from 'lucide-react';

interface RawMarkdownViewerProps {
  rawMarkdown: string;
}

export const RawMarkdownViewer: React.FC<RawMarkdownViewerProps> = ({ rawMarkdown }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-slate-200">
            Raw Agent Output (Markdown Protocol)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
            {rawMarkdown.length} chars
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            {isExpanded ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span>{isExpanded ? 'Collapse' : 'Expand Full'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className={`p-5 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/50 whitespace-pre-wrap ${
          isExpanded ? 'max-h-none' : 'max-h-64'
        }`}
      >
        {rawMarkdown}
      </div>
    </div>
  );
};
