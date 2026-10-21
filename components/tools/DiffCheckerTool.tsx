'use client';

import React, { useState, useMemo } from 'react';
import {
  computeDiff,
  SAMPLE_ORIGINAL_DIFF,
  SAMPLE_MODIFIED_DIFF,
} from '@/lib/tools/diff';
import { CopyButton } from '@/components/ui/CopyButton';
import { ClearButton } from '@/components/ui/ClearButton';
import {
  ArrowLeftRight,
  Sparkles,
  Columns,
  List,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

export function DiffCheckerTool() {
  const [original, setOriginal] = useState(SAMPLE_ORIGINAL_DIFF);
  const [modified, setModified] = useState(SAMPLE_MODIFIED_DIFF);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);

  const diffResult = useMemo(() => {
    return computeDiff(original, modified, {
      ignoreWhitespace,
      ignoreCase,
    });
  }, [original, modified, ignoreWhitespace, ignoreCase]);

  const handleSwap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  const handleClearAll = () => {
    setOriginal('');
    setModified('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Diff Controls Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('unified')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'unified'
                  ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Unified View</span>
            </button>
          </div>

          {/* Options */}
          <label className="inline-flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="w-4 h-4 accent-neon-cyan rounded"
            />
            <span>Ignore Whitespace</span>
          </label>

          <label className="inline-flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="w-4 h-4 accent-neon-cyan rounded"
            />
            <span>Ignore Case</span>
          </label>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginal(SAMPLE_ORIGINAL_DIFF);
              setModified(SAMPLE_MODIFIED_DIFF);
            }}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sample</span>
          </button>
          <CopyButton text={diffResult.unifiedPatch} label="Copy Patch" size="sm" />
          <ClearButton onClear={handleClearAll} disabled={!original && !modified} />
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
          <Plus className="w-3.5 h-3.5" />
          <span>{diffResult.stats.additions} additions</span>
        </div>
        <div className="flex items-center gap-1.5 text-red-500 font-bold">
          <Minus className="w-3.5 h-3.5" />
          <span>{diffResult.stats.deletions} deletions</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-500">
          <Check className="w-3.5 h-3.5" />
          <span>{diffResult.stats.unchanged} unchanged lines</span>
        </div>
      </div>

      {/* Input Editors (Collapsible or Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">Original Text / Code</span>
            <span className="text-[11px] font-mono text-neutral-400">
              {diffResult.stats.totalOriginalLines} lines
            </span>
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original version here..."
            rows={10}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[220px] leading-relaxed"
          />
        </div>

        {/* Modified */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">Modified Text / Code</span>
            <span className="text-[11px] font-mono text-neutral-400">
              {diffResult.stats.totalModifiedLines} lines
            </span>
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified version here..."
            rows={10}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[220px] leading-relaxed"
          />
        </div>
      </div>

      {/* Visual Diff Output */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-bold text-foreground">Diff Inspection Output</span>
          <span className="text-[11px] font-mono text-neutral-400">
            {diffResult.lines.length} total blocks
          </span>
        </div>

        <div className="font-mono text-xs overflow-x-auto divide-y divide-neutral-100 dark:divide-neutral-800/40">
          {diffResult.lines.map((line, idx) => {
            const isAdded = line.type === 'added';
            const isRemoved = line.type === 'removed';

            return (
              <div
                key={idx}
                className={`flex items-start px-4 py-1.5 transition-colors ${
                  isAdded
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : isRemoved
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/30'
                }`}
              >
                {/* Line numbers */}
                <div className="w-14 shrink-0 flex items-center justify-between select-none text-[10px] text-neutral-400 mr-4 font-mono">
                  <span className="w-6 text-right">{line.originalLineNumber || ''}</span>
                  <span className="w-6 text-right">{line.modifiedLineNumber || ''}</span>
                </div>

                {/* Marker symbol */}
                <span className="w-4 shrink-0 font-bold select-none text-center">
                  {isAdded ? '+' : isRemoved ? '-' : ' '}
                </span>

                {/* Text line */}
                <span className="whitespace-pre-wrap break-all flex-1">{line.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
