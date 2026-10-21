'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Operational error logging without exposing secrets
    console.error('[DevPocket Application Error]', error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 sm:py-32 text-center flex flex-col items-center">
      <div className="p-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/30 mb-6 shadow-sm">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-500">
        System Runtime Notice
      </span>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2">
        Something didn&apos;t go as planned
      </h1>

      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        An unexpected error occurred while rendering this view. Your input data is safe and has not been transmitted anywhere.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold text-xs tracking-tight shadow-md hover:shadow-neon-cyan/20 active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-foreground border border-neutral-300 dark:border-neutral-700 font-bold text-xs hover:border-neutral-400 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
