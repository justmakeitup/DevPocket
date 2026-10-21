'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, X, Compass } from 'lucide-react';

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  // If dismissed or user is on contact/thank-you, don't show
  if (dismissed || pathname.includes('/contact') || pathname.includes('/thank-you')) {
    return null;
  }

  const isToolsPage = pathname.startsWith('/tools');

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden animate-in slide-in-from-bottom-5 duration-300">
      <div className="relative flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-neutral-900/90 text-white backdrop-blur-md border border-neutral-700/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {/* Glow accent */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 pointer-events-none" />

        <div className="relative flex items-center gap-2 pl-1">
          <div className="p-1.5 rounded-lg bg-neon-cyan/20 text-neon-cyan shrink-0">
            {isToolsPage ? <Sparkles className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-tight">
              {isToolsPage ? 'Need another utility?' : 'Explore DevPocket'}
            </span>
            <span className="text-[10px] text-neutral-400">8 fast, free developer tools</span>
          </div>
        </div>

        <div className="relative flex items-center gap-1.5">
          <Link
            href="/tools"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold text-xs tracking-tight shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isToolsPage ? 'Directory' : 'Explore Tools'}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
            aria-label="Dismiss mobile bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
