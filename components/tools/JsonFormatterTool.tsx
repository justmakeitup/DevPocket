'use client';

import React, { useState, useEffect } from 'react';
import {
  formatJson,
  minifyJson,
  validateJson,
  SAMPLE_JSON,
  JsonStats,
} from '@/lib/tools/json';
import { CopyButton } from '@/components/ui/CopyButton';
import { ClearButton } from '@/components/ui/ClearButton';
import { downloadFile, formatBytes } from '@/lib/utils';
import {
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Minimize2,
  Maximize2,
  ArrowDownAZ,
} from 'lucide-react';

export function JsonFormatterTool() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState<'2' | '4' | 'tab'>('2');
  const [sortKeys, setSortKeys] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorCoord, setErrorCoord] = useState<{ line?: number; column?: number } | null>(null);
  const [stats, setStats] = useState<JsonStats | null>(null);

  // Auto-format on initial load or settings change
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setErrorMsg(null);
      setErrorCoord(null);
      setStats(null);
      return;
    }

    const res = formatJson(input, indent === 'tab' ? 'tab' : Number(indent), sortKeys);
    if (res.error) {
      setOutput('');
      setErrorMsg(res.error);
      const val = validateJson(input);
      if (val.error) {
        setErrorCoord({ line: val.error.line, column: val.error.column });
      }
      setStats(null);
    } else {
      setOutput(res.formatted);
      setErrorMsg(null);
      setErrorCoord(null);
      setStats(res.stats || null);
    }
  }, [input, indent, sortKeys]);

  const handleMinify = () => {
    const res = minifyJson(input);
    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setOutput(res.minified);
      setErrorMsg(null);
      setStats(res.stats || null);
    }
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setErrorMsg(null);
    setErrorCoord(null);
    setStats(null);
  };

  const handleDownload = () => {
    if (!output) return;
    downloadFile(output, 'devpocket-formatted.json', 'application/json');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Indentation Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-neutral-500 font-medium">Indent:</span>
            <select
              value={indent}
              onChange={(e) => setIndent(e.target.value as '2' | '4' | 'tab')}
              className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-neon-cyan"
            >
              <option value="2">2 Spaces</option>
              <option value="4">4 Spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          {/* Sort Keys Toggle */}
          <button
            type="button"
            onClick={() => setSortKeys(!sortKeys)}
            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
              sortKeys
                ? 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40 font-semibold'
                : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground'
            }`}
            title="Sort JSON keys alphabetically"
          >
            <ArrowDownAZ className="w-3.5 h-3.5" />
            <span>Sort Keys</span>
          </button>

          {/* Minify Button */}
          <button
            type="button"
            onClick={handleMinify}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:border-neutral-400 transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sample</span>
          </button>
          <ClearButton onClear={handleClear} disabled={!input} />
        </div>
      </div>

      {/* Split Editors: Input & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">JSON Input</span>
            <span className="text-[11px] font-mono text-neutral-400">
              {input ? `${input.length} chars` : 'Empty'}
            </span>
          </div>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type raw JSON here..."
              rows={18}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[350px] leading-relaxed"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">Formatted Result</span>
              {errorMsg ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  <AlertTriangle className="w-3 h-3" /> Invalid
                </span>
              ) : output ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Valid JSON
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-1.5">
              <CopyButton text={output} size="sm" />
              <button
                type="button"
                onClick={handleDownload}
                disabled={!output}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 hover:text-foreground disabled:opacity-40 transition-colors"
                title="Download .json file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            {errorMsg ? (
              <div className="p-6 text-red-500 dark:text-red-400 bg-red-500/5 font-mono text-xs sm:text-sm h-full flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>Parse Error</span>
                </div>
                <p className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-red-500/30">
                  {errorMsg}
                </p>
                {errorCoord && (
                  <p className="text-neutral-500 text-xs">
                    Location: Line {errorCoord.line || '?'}, Column {errorCoord.column || '?'}
                  </p>
                )}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Formatted output will appear here..."
                rows={18}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs sm:text-sm bg-neutral-50/50 dark:bg-neutral-950/40 text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[350px] leading-relaxed"
              />
            )}
          </div>
        </div>
      </div>

      {/* JSON Statistics Bar */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium">Type</span>
            <span className="font-mono font-bold text-foreground capitalize">{stats.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium">Payload Size</span>
            <span className="font-mono font-bold text-foreground">{formatBytes(stats.bytes)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium">Characters</span>
            <span className="font-mono font-bold text-foreground">{stats.characters.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium">Lines</span>
            <span className="font-mono font-bold text-foreground">{stats.lines.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium">Total Keys</span>
            <span className="font-mono font-bold text-foreground">{stats.keyCount.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium">Max Depth</span>
            <span className="font-mono font-bold text-foreground">{stats.maxDepth} levels</span>
          </div>
        </div>
      )}
    </div>
  );
}
