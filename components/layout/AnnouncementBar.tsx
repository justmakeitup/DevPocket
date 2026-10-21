'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { isAnnouncementDismissed, setAnnouncementDismissed } from '@/lib/storage';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(isAnnouncementDismissed());
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setAnnouncementDismissed();
  };

  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-neutral-900 text-white text-xs py-2 px-4 border-b border-neutral-800 flex items-center justify-center overflow-hidden">
      {/* Background neon ambient line */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/15 via-blue-500/10 to-neon-violet/15 pointer-events-none" />

      <div className="relative flex items-center gap-2 max-w-7xl mx-auto text-center justify-center">
        <Sparkles className="w-3.5 h-3.5 text-neon-cyan shrink-0 animate-pulse" />
        <span className="font-medium text-neutral-200">
          Your everyday developer toolkit — free to use, private, and browser-first.
        </span>
        <Link
          href="/tools"
          className="ml-1 text-neon-cyan hover:underline font-semibold flex items-center gap-0.5"
        >
          Explore All Tools &rarr;
        </Link>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-3 p-1 text-neutral-400 hover:text-white rounded transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
