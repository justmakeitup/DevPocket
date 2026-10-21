'use client';

import React, { useState, useEffect } from 'react';
import {
  encodeUrl,
  decodeUrl,
  inspectUrl,
  SAMPLE_URL,
  UrlEncodeMode,
} from '@/lib/tools/url';
import { CopyButton } from '@/components/ui/CopyButton';
import { ClearButton } from '@/components/ui/ClearButton';
import { ArrowLeftRight, Sparkles, AlertTriangle, Link as LinkIcon } from 'lucide-react';

export function UrlEncoderTool() {
  const [action, setAction] = useState<'encode' | 'decode'>('encode');
  const [mode, setMode] = useState<UrlEncodeMode>('component');
  const [input, setInput] = useState(SAMPLE_URL);
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inspected = inspectUrl(input);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setErrorMsg(null);
      return;
    }

    if (action === 'encode') {
      const res = encodeUrl(input, mode);
      if (res.error) {
        setOutput('');
        setErrorMsg(res.error);
      } else {
        setOutput(res.output);
        setErrorMsg(null);
      }
    } else {
      const res = decodeUrl(input, mode);
      if (res.error) {
        setOutput('');
        setErrorMsg(res.error);
      } else {
        setOutput(res.output);
        setErrorMsg(null);
      }
    }
  }, [input, action, mode]);

  const handleSwap = () => {
    const nextAction = action === 'encode' ? 'decode' : 'encode';
    setAction(nextAction);
    if (output && !errorMsg) {
      setInput(output);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setErrorMsg(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Settings Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Action Tabs */}
          <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setAction('encode')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                action === 'encode'
                  ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              Encode
            </button>
            <button
              type="button"
              onClick={() => setAction('decode')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                action === 'decode'
                  ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              Decode
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-neutral-500 font-medium">Scope:</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as UrlEncodeMode)}
              className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-neon-cyan"
            >
              <option value="component">Component (encodeURIComponent)</option>
              <option value="full">Whole URL (encodeURI)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Swap</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInput(SAMPLE_URL)}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sample</span>
          </button>
          <ClearButton onClear={handleClear} disabled={!input} />
        </div>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">
              {action === 'encode' ? 'Raw URL or String to Encode' : 'Percent-Encoded Input'}
            </span>
            <span className="text-[11px] font-mono text-neutral-400">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL, query string, or parameter to process..."
            rows={10}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[220px] leading-relaxed break-all"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">
              {action === 'encode' ? 'Encoded Result' : 'Decoded Result'}
            </span>
            <CopyButton text={output} size="sm" />
          </div>

          <div className="relative flex-1">
            {errorMsg ? (
              <div className="p-6 text-red-500 dark:text-red-400 bg-red-500/5 font-mono text-xs sm:text-sm h-full flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>Malformed URI Sequence</span>
                </div>
                <p className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-red-500/30">
                  {errorMsg}
                </p>
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                rows={10}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs sm:text-sm bg-neutral-50/50 dark:bg-neutral-950/40 text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[220px] leading-relaxed break-all"
              />
            )}
          </div>
        </div>
      </div>

      {/* Query Parameters Inspector Table */}
      {inspected.params.length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <LinkIcon className="w-4 h-4 text-neon-cyan" />
            <h3 className="font-bold text-sm text-foreground">
              Parsed Query Parameters ({inspected.params.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono uppercase text-[10px]">
                  <th className="py-2 px-3 font-semibold">Parameter (Key)</th>
                  <th className="py-2 px-3 font-semibold">Value</th>
                  <th className="py-2 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-mono">
                {inspected.params.map((param, index) => (
                  <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="py-2 px-3 text-neon-cyan font-bold">{param.key}</td>
                    <td className="py-2 px-3 text-neutral-700 dark:text-neutral-300 break-all">{param.value}</td>
                    <td className="py-2 px-3 text-right">
                      <CopyButton text={`${param.key}=${param.value}`} label="Copy" size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
