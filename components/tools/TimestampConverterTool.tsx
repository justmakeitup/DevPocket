'use client';

import React, { useState, useEffect } from 'react';
import {
  convertTimestamp,
  convertDateToTimestamp,
  TimestampUnit,
} from '@/lib/tools/timestamp';
import { CopyButton } from '@/components/ui/CopyButton';
import {
  Clock,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Globe,
  ArrowRightLeft,
} from 'lucide-react';

export function TimestampConverterTool() {
  const [currentEpochSec, setCurrentEpochSec] = useState<number>(0);
  const [currentEpochMs, setCurrentEpochMs] = useState<number>(0);

  // Timestamp to Date state
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [unit, setUnit] = useState<TimestampUnit>('seconds');

  // Date to Timestamp state
  const [inputDate, setInputDate] = useState<string>('');

  // Live epoch clock
  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      setCurrentEpochMs(now);
      setCurrentEpochSec(Math.floor(now / 1000));
    };

    updateTime();
    setInputTimestamp(String(Math.floor(Date.now() / 1000)));

    // Set initial date string
    const d = new Date();
    setInputDate(d.toISOString().slice(0, 16));

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampResult = convertTimestamp(inputTimestamp, unit);
  const dateResult = inputDate ? convertDateToTimestamp(inputDate) : null;

  const handleUseCurrentSec = () => {
    setUnit('seconds');
    setInputTimestamp(String(currentEpochSec));
  };

  const handleUseCurrentMs = () => {
    setUnit('milliseconds');
    setInputTimestamp(String(currentEpochMs));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Live Current Epoch Clock Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 shadow-md text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-neon-cyan/15 text-neon-cyan shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Current Unix Epoch Time
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="flex items-baseline gap-4 mt-1 flex-wrap">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neon-cyan tracking-tight">
                {currentEpochSec || '...'}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                ({currentEpochMs || '...'} ms)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUseCurrentSec}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-medium text-neutral-200 border border-neutral-700 transition-colors"
          >
            Insert Seconds
          </button>
          <button
            type="button"
            onClick={handleUseCurrentMs}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-medium text-neutral-200 border border-neutral-700 transition-colors"
          >
            Insert Millis
          </button>
        </div>
      </div>

      {/* Conversion Section 1: Timestamp to Date */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Epoch Timestamp &rarr; Human Date</h2>
            <p className="text-xs text-neutral-500">
              Convert raw numeric epoch values into standard human date formats.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">Input Unit:</span>
            <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setUnit('seconds')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  unit === 'seconds'
                    ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                Seconds (10 digits)
              </button>
              <button
                type="button"
                onClick={() => setUnit('milliseconds')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  unit === 'milliseconds'
                    ? 'bg-white dark:bg-neutral-900 text-neon-cyan shadow-sm'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                Milliseconds (13 digits)
              </button>
            </div>
          </div>
        </div>

        {/* Input input box */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={inputTimestamp}
            onChange={(e) => setInputTimestamp(e.target.value)}
            placeholder="Enter Unix timestamp (e.g. 1770000000)..."
            className="w-full sm:flex-1 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 font-mono text-sm text-foreground border border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neon-cyan"
          />
          <button
            type="button"
            onClick={handleUseCurrentSec}
            className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold hover:text-foreground shrink-0 transition-colors"
          >
            Reset to Now
          </button>
        </div>

        {/* Suggestion alert if mismatch detected */}
        {timestampResult.suggestedUnit && timestampResult.suggestedUnit !== unit && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                Heuristic warning: This timestamp appears to be in{' '}
                <strong>{timestampResult.suggestedUnit}</strong> rather than {unit}.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setUnit(timestampResult.suggestedUnit!)}
              className="px-2.5 py-1 rounded bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition-colors shrink-0"
            >
              Switch to {timestampResult.suggestedUnit}
            </button>
          </div>
        )}

        {/* Converted Results Grid */}
        {timestampResult.isValid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  ISO 8601 (Universal)
                </span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {timestampResult.iso8601}
                </span>
              </div>
              <CopyButton text={timestampResult.iso8601 || ''} size="sm" />
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  UTC Date & Time
                </span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {timestampResult.utcDateString}
                </span>
              </div>
              <CopyButton text={timestampResult.utcDateString || ''} size="sm" />
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Local Time ({timestampResult.timezoneName})
                </span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {timestampResult.localDateString}
                </span>
              </div>
              <CopyButton text={timestampResult.localDateString || ''} size="sm" />
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Relative Time
                </span>
                <span className="font-mono text-sm font-bold text-neon-cyan">
                  {timestampResult.relativeTime}
                </span>
              </div>
              <CopyButton text={timestampResult.relativeTime || ''} size="sm" />
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-red-500/10 text-red-500 text-xs font-mono">
            {timestampResult.error}
          </div>
        )}
      </div>

      {/* Conversion Section 2: Date to Timestamp */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h2 className="text-base font-bold text-foreground">Human Date &rarr; Unix Timestamp</h2>
          <p className="text-xs text-neutral-500">
            Pick or type a calendar date and time to obtain corresponding Unix epoch values.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="datetime-local"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="w-full sm:flex-1 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 font-mono text-sm text-foreground border border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neon-cyan"
          />
        </div>

        {dateResult && dateResult.isValid && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Unix Seconds
                </span>
                <span className="font-mono text-base font-bold text-neon-cyan">
                  {dateResult.unixSeconds}
                </span>
              </div>
              <CopyButton text={String(dateResult.unixSeconds)} size="sm" />
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Unix Milliseconds
                </span>
                <span className="font-mono text-base font-bold text-neon-violet">
                  {dateResult.unixMilliseconds}
                </span>
              </div>
              <CopyButton text={String(dateResult.unixMilliseconds)} size="sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
