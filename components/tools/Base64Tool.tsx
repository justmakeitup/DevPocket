'use client';

import React, { useState, useEffect } from 'react';
import {
  encodeBase64,
  decodeBase64,
  SAMPLE_BASE64_TEXT,
} from '@/lib/tools/base64';
import { CopyButton } from '@/components/ui/CopyButton';
import { ClearButton } from '@/components/ui/ClearButton';
import { downloadFile, formatBytes } from '@/lib/utils';
import { ArrowLeftRight, Sparkles, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

export function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState(SAMPLE_BASE64_TEXT);
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [origBytes, setOrigBytes] = useState(0);
  const [resBytes, setResBytes] = useState(0);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setErrorMsg(null);
      setOrigBytes(0);
      setResBytes(0);
      return;
    }

    if (mode === 'encode') {
      const res = encodeBase64(input);
      if (res.error) {
        setOutput('');
        setErrorMsg(res.error);
      } else {
        setOutput(res.output);
        setErrorMsg(null);
        setOrigBytes(res.originalBytes || 0);
        setResBytes(res.resultBytes || 0);
      }
    } else {
      const res = decodeBase64(input);
      if (res.error) {
        setOutput('');
        setErrorMsg(res.error);
      } else {
        setOutput(res.output);
        setErrorMsg(null);
        setOrigBytes(res.originalBytes || 0);
        setResBytes(res.resultBytes || 0);
      }
    }
  }, [input, mode]);

  const handleSwap = () => {
    const nextMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(nextMode);
    if (output && !errorMsg) {
      setInput(output);
    }
  };

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput(SAMPLE_BASE64_TEXT);
    } else {
      const sampleEncoded = encodeBase64(SAMPLE_BASE64_TEXT).output;
      setInput(sampleEncoded);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setErrorMsg(null);
    setOrigBytes(0);
    setResBytes(0);
  };

  const handleDownload = () => {
    if (!output) return;
    const filename = mode === 'encode' ? 'devpocket-encoded.b64' : 'devpocket-decoded.txt';
    downloadFile(output, filename, 'text/plain');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Mode Selector & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2">
          {/* Mode Switcher Tabs */}
          <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setMode('encode')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'encode'
                  ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              Encode to Base64
            </button>
            <button
              type="button"
              onClick={() => setMode('decode')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'decode'
                  ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                  : 'text-neutral-500 hover:text-foreground'
              }`}
            >
              Decode from Base64
            </button>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
            title="Swap input and output and flip mode"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Swap Modes</span>
          </button>
        </div>

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

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">
              {mode === 'encode' ? 'Plain Text Input (UTF-8)' : 'Base64 Encoded Input'}
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {origBytes ? formatBytes(origBytes) : '0 Bytes'}
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Type or paste plain text (Unicode, symbols, accents supported)...'
                : 'Paste Base64 encoded string...'
            }
            rows={14}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[300px] leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">
                {mode === 'encode' ? 'Base64 Result' : 'Decoded Text Result'}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {resBytes ? formatBytes(resBytes) : '0 Bytes'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <CopyButton text={output} size="sm" />
              <button
                type="button"
                onClick={handleDownload}
                disabled={!output}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 hover:text-foreground disabled:opacity-40 transition-colors"
                title="Download result"
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
                  <span>Base64 Error</span>
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
                rows={14}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs sm:text-sm bg-neutral-50/50 dark:bg-neutral-950/40 text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[300px] leading-relaxed break-all"
              />
            )}
          </div>
        </div>
      </div>

      {/* Info Notice about Unicode UTF-8 */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-neon-cyan" />
          <span>
            Fully UTF-8 standard compliant. Encodes emoji, multi-byte international alphabets, and symbols without character loss.
          </span>
        </div>
        {origBytes > 0 && resBytes > 0 && (
          <span className="font-mono text-neutral-500">
            {mode === 'encode'
              ? `Base64 expansion ratio: ~${Math.round((resBytes / origBytes) * 100)}%`
              : `Payload size: ${formatBytes(resBytes)}`}
          </span>
        )}
      </div>
    </div>
  );
}
