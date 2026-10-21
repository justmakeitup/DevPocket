'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Settings, X, Check } from 'lucide-react';
import { CookiePreferences } from '@/types';
import { getStoredCookiePreferences, setStoredCookiePreferences } from '@/lib/storage';

export function CookieBanner() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Modal custom checkbox states
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [preferencesEnabled, setPreferencesEnabled] = useState(true);

  useEffect(() => {
    const stored = getStoredCookiePreferences();
    setPreferences(stored);
    if (stored) {
      setAnalyticsEnabled(stored.analytics);
      setPreferencesEnabled(stored.preferences);
    }
    setMounted(true);

    const handleReopen = () => {
      setShowModal(true);
    };
    window.addEventListener('open-cookie-settings', handleReopen);
    return () => window.removeEventListener('open-cookie-settings', handleReopen);
  }, []);

  const savePreferences = (analytics: boolean, prefs: boolean) => {
    const updated: CookiePreferences = {
      necessary: true,
      analytics,
      preferences: prefs,
      hasConsented: true,
      timestamp: Date.now(),
    };
    setPreferences(updated);
    setStoredCookiePreferences(updated);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, true);
  };

  const handleRejectOptional = () => {
    savePreferences(false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(analyticsEnabled, preferencesEnabled);
  };

  if (!mounted) return null;

  // If already consented and modal is closed, don't show the banner
  if (preferences?.hasConsented && !showModal) {
    return null;
  }

  return (
    <>
      {/* Compact bottom consent banner */}
      {!preferences?.hasConsented && !showModal && (
        <div
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 shadow-2xl transition-all"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neon-cyan/10 text-neon-cyan shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                <span className="font-semibold text-foreground">Privacy-First Architecture: </span>
                Your tool data, pasted code, and payloads are processed 100% locally in your browser and never sent to our servers. We use minimal cookies only for functional preferences and optional privacy-friendly metrics. Read our{' '}
                <Link href="/privacy" className="text-neon-cyan underline hover:text-cyan-400">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookies" className="text-neon-cyan underline hover:text-cyan-400">
                  Cookie Policy
                </Link>.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                Preferences
              </button>
              <button
                onClick={handleRejectOptional}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                Reject Optional
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-neon-cyan" />
                <h3 className="font-bold text-lg text-foreground">Cookie & Privacy Settings</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Strictly Necessary</span>
                  <span className="text-xs font-mono font-medium text-emerald-500 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Always Active
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Required for site operation, local dark/light theme persistence, and security tokens. Does not track personal identity.
                </p>
              </div>

              {/* Preferences */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Functional Preferences</span>
                  <input
                    type="checkbox"
                    checked={preferencesEnabled}
                    onChange={(e) => setPreferencesEnabled(e.target.checked)}
                    className="w-4 h-4 accent-neon-cyan rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Stores user interface preferences such as active tool layout configuration and dismissed announcements.
                </p>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Privacy-Safe Analytics</span>
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-neon-cyan rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Anonymous aggregate pageview telemetry to understand which developer tools are most helpful. Zero user payload tracking.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={handleRejectOptional}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Reject Optional
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet text-neutral-950 hover:shadow-lg transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
