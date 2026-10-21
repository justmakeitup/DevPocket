'use client';

import React, { useState, useEffect } from 'react';
import { generateUuidBatch } from '@/lib/tools/uuid';
import { CopyButton } from '@/components/ui/CopyButton';
import { ClearButton } from '@/components/ui/ClearButton';
import { downloadFile } from '@/lib/utils';
import {
  RefreshCw,
  Download,
  Fingerprint,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/components/providers/ToastProvider';

export function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const { success } = useToast();

  const handleGenerate = () => {
    const batch = generateUuidBatch({
      count: quantity,
      uppercase,
      hyphens,
    });
    setUuids(batch);
    setTotalGenerated((prev) => prev + batch.length);
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, uppercase, hyphens]);

  const handleDownloadTxt = () => {
    if (uuids.length === 0) return;
    downloadFile(uuids.join('\n'), 'devpocket-uuids.txt', 'text/plain');
  };

  const handleDownloadJson = () => {
    if (uuids.length === 0) return;
    downloadFile(JSON.stringify(uuids, null, 2), 'devpocket-uuids.json', 'application/json');
  };

  const handleClear = () => {
    setUuids([]);
  };

  const allUuidsText = uuids.join('\n');

  return (
    <div className="flex flex-col gap-6">
      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Quantity:</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-foreground font-semibold focus:outline-none focus:ring-1 focus:ring-neon-cyan"
            >
              {[1, 5, 10, 20, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'UUID' : 'UUIDs'}
                </option>
              ))}
            </select>
          </div>

          {/* Uppercase Switch */}
          <label className="inline-flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 accent-neon-cyan rounded"
            />
            <span>Uppercase</span>
          </label>

          {/* Hyphens Switch */}
          <label className="inline-flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="w-4 h-4 accent-neon-cyan rounded"
            />
            <span>Include Hyphens</span>
          </label>
        </div>

        {/* Generate / Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet text-neutral-950 font-bold text-xs shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New Batch</span>
          </button>
          <ClearButton onClear={handleClear} disabled={uuids.length === 0} />
        </div>
      </div>

      {/* UUIDs Results Container */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 bg-neutral-50 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-bold text-foreground">
              Generated UUID v4 ({uuids.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CopyButton text={allUuidsText} label="Copy All" size="sm" />
            <button
              type="button"
              onClick={handleDownloadTxt}
              disabled={uuids.length === 0}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>TXT</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadJson}
              disabled={uuids.length === 0}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 max-h-[480px] overflow-y-auto">
          {uuids.length > 0 ? (
            uuids.map((uuid, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-neutral-400 w-6 text-right">
                    {idx + 1}.
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-foreground group-hover:text-neon-cyan transition-colors select-all">
                    {uuid}
                  </span>
                </div>
                <CopyButton text={uuid} label="Copy" size="sm" />
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-neutral-400">
              <p className="text-sm">No UUIDs in the list</p>
              <p className="text-xs text-neutral-500 mt-1">Click &quot;Generate New Batch&quot; above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Security Info Card */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            Cryptographically secure generation via <code>crypto.randomUUID()</code> and Web Cryptography. Never uses pseudo-random Math.random().
          </span>
        </div>
        <div className="font-mono text-neutral-500">
          Lifetime generated this session: <strong className="text-neon-cyan">{totalGenerated}</strong>
        </div>
      </div>
    </div>
  );
}
