'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Cookie, Settings, ShieldCheck } from 'lucide-react';

export default function CookiePolicyPage() {
  const lastUpdated = 'October 2026';

  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Breadcrumbs items={[{ name: 'Cookie Policy', path: '/cookies' }]} />

      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">
            Privacy & Storage
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2">
            Cookie Policy
          </h1>
          <p className="text-xs text-neutral-500 mt-1">Last Updated: {lastUpdated}</p>
        </div>

        {/* Quick Preference Action Card */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-neon-cyan/10 text-neon-cyan shrink-0">
              <Cookie className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Manage Your Preferences</h3>
              <p className="text-xs text-neutral-500">
                You can inspect or adjust your cookie consent settings at any time.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenCookieSettings}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold text-xs tracking-tight shadow-sm hover:shadow-neon-cyan/20 active:scale-95 transition-all shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Open Cookie Settings</span>
          </button>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-neutral-600 dark:text-neutral-400 space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. What Are Cookies and Local Storage?</h2>
            <p>
              Cookies and browser local storage are small text files and key-value entries stored on your device by websites you visit. They allow websites to remember user preferences and improve browsing efficiency.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. How DevPocket Uses Storage</h2>
            <p>
              Unlike most websites, DevPocket does not use intrusive third-party advertising cookies or cross-site tracking pixels. We categorize our storage into three clear tiers:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Strictly Necessary (Always Active)
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Required to save your chosen color theme (light or dark mode) and your cookie consent choices. Without these keys, the website would flicker on page reloads. Does not store personal identity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  Functional Preferences (Optional)
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Remembers user preferences like dismissing the top announcement bar or tool layout configurations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-violet" />
                  Privacy-Safe Analytics (Optional - Disabled by Default)
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Optional aggregate traffic statistics to determine which tools are most useful. Analytics scripts never load before consent and never inspect tool input data.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Browser Controls</h2>
            <p>
              Most web browsers permit you to clear cookies and local storage directly via browser settings. Note that clearing storage will reset your light/dark mode preference to the system default.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
