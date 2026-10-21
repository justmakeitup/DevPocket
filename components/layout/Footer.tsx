'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Github, Shield, Heart } from 'lucide-react';
import { TOOLS } from '@/lib/tools-data';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL || 'https://github.com';

  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo size="md" />
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Fast, free, and privacy-focused developer utilities. Format, encode, compare, generate, and debug in seconds — processed 100% locally in your browser.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neon-cyan hover:border-neon-cyan/40 border border-neutral-300 dark:border-neutral-800 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono px-3 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Client-Side Local Processing</span>
              </div>
            </div>
          </div>

          {/* Tools Column 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Core Utilities
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              {TOOLS.slice(0, 4).map((tool) => (
                <li key={tool.id}>
                  <Link href={tool.path} className="hover:text-neon-cyan transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Generators & Diff
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              {TOOLS.slice(4, 8).map((tool) => (
                <li key={tool.id}>
                  <Link href={tool.path} className="hover:text-neon-cyan transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools" className="text-neon-cyan hover:underline font-medium">
                  View All Tools &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Project & Legal
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-neon-cyan transition-colors">
                  About DevPocket
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neon-cyan transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-neon-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-neon-cyan transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-neon-cyan transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookieSettings}
                  className="text-xs text-neutral-500 hover:text-foreground text-left transition-colors"
                >
                  Manage Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} DevPocket. Built for developers with privacy by design.</p>
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Shield className="w-3.5 h-3.5 text-neon-cyan" />
            <span>Zero telemetry on user payloads</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
