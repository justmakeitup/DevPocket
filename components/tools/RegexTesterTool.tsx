'use client';

import React, { useState, useMemo } from 'react';
import {
  testRegex,
  REGEX_PRESETS,
  RegexPreset,
} from '@/lib/tools/regex';
import { CopyButton } from '@/components/ui/CopyButton';
import { ClearButton } from '@/components/ui/ClearButton';
import {
  AlertTriangle,
  CheckCircle2,
  ListOrdered,
  Clock,
  Sparkles,
} from 'lucide-react';

export function RegexTesterTool() {
  const [pattern, setPattern] = useState(REGEX_PRESETS[0].pattern);
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState(REGEX_PRESETS[0].sampleText);

  // Evaluate matches
  const result = useMemo(() => {
    return testRegex(pattern, flags, testText, 250);
  }, [pattern, flags, testText]);

  const toggleFlag = (flagChar: string) => {
    if (flags.includes(flagChar)) {
      setFlags(flags.replace(flagChar, ''));
    } else {
      setFlags(flags + flagChar);
    }
  };

  const handleSelectPreset = (preset: RegexPreset) => {
    setPattern(preset.pattern);
    setFlags(preset.flags);
    setTestText(preset.sampleText);
  };

  const handleClear = () => {
    setPattern('');
    setTestText('');
  };

  const allMatchesText = result.matches.map((m) => m.match).join('\n');

  return (
    <div className="flex flex-col gap-6">
      {/* Preset Patterns Ribbon */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <span>Quick Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {REGEX_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                pattern === preset.pattern
                  ? 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-foreground'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern and Flags Input */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <span className="font-mono text-lg font-bold text-neutral-400 select-none pl-1">/</span>

        {/* Regular Expression Pattern */}
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Enter regular expression pattern..."
          className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-neutral-400 focus:outline-none"
        />

        <span className="font-mono text-lg font-bold text-neutral-400 select-none">/</span>

        {/* Flags Bar */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
          {[
            { id: 'g', label: 'g (global)' },
            { id: 'i', label: 'i (case-insensitive)' },
            { id: 'm', label: 'm (multiline)' },
            { id: 's', label: 's (dotAll)' },
            { id: 'u', label: 'u (unicode)' },
          ].map((f) => {
            const active = flags.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFlag(f.id)}
                title={f.label}
                className={`w-7 h-7 font-mono text-xs font-bold rounded-lg transition-colors ${
                  active
                    ? 'bg-neon-cyan text-neutral-950 shadow-sm'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                {f.id}
              </button>
            );
          })}
        </div>

        <ClearButton onClear={handleClear} disabled={!pattern && !testText} />
      </div>

      {/* Error Banner if invalid pattern */}
      {!result.isValid && result.error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-xs sm:text-sm font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      {/* Test String and Match View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test String Input */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-foreground">Test String</span>
            <span className="text-[11px] font-mono text-neutral-400">{testText.length} chars</span>
          </div>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type or paste sample text here to test against the pattern..."
            rows={14}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none resize-y min-h-[280px] leading-relaxed"
          />
        </div>

        {/* Matches and Captured Groups List */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">
                Matches ({result.matches.length})
              </span>
              {result.executionTimeMs !== undefined && (
                <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {result.executionTimeMs} ms
                </span>
              )}
            </div>
            <CopyButton text={allMatchesText} label="Copy Matches" size="sm" />
          </div>

          <div className="p-4 overflow-y-auto max-h-[350px] divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {result.matches.length > 0 ? (
              result.matches.map((item, idx) => (
                <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-neutral-400 text-[10px]">
                      Match #{idx + 1} (Index: {item.index}..{item.index + item.length})
                    </span>
                    <span className="text-[10px] font-mono text-neon-cyan">
                      {item.length} chars
                    </span>
                  </div>
                  <div className="font-mono text-sm font-semibold p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-foreground break-all">
                    {item.match}
                  </div>

                  {item.groups && item.groups.length > 0 && (
                    <div className="mt-1 pl-2 border-l-2 border-neon-violet/40 space-y-1">
                      {item.groups.map((grp, gIdx) => (
                        <div key={gIdx} className="font-mono text-[11px] text-neutral-500">
                          <span className="text-neon-violet font-semibold">Group {gIdx + 1}:</span>{' '}
                          <span className="text-neutral-700 dark:text-neutral-300">
                            {grp !== undefined ? `"${grp}"` : 'undefined'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-neutral-400">
                <ListOrdered className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No matches found</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Modify the regular expression or test string above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
