'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Braces,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import { NeonContainer } from '@/components/ui/NeonContainer';
import { TOOLS, searchTools } from '@/lib/tools-data';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredTools = searchQuery ? searchTools(searchQuery) : TOOLS;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredTools.length > 0) {
      router.push(filteredTools[0].path);
    } else {
      router.push(`/tools?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const faqs = [
    {
      q: 'Is DevPocket completely free to use?',
      a: 'Yes. All 8 core developer utilities are 100% free with unlimited local usage. There are no paywalls, hidden tiers, or artificial daily limits.',
    },
    {
      q: 'Do I need to create an account or sign in?',
      a: 'No account, email, or registration is required. You can bookmark any tool and use it immediately whenever you need it.',
    },
    {
      q: 'Is my code, JSON, or input data sent to your servers?',
      a: 'No. The utilities run entirely inside your browser using client-side JavaScript, Web Workers, and Web Cryptography. Your data never leaves your computer.',
    },
    {
      q: 'Can I use DevPocket on mobile devices?',
      a: 'Yes. Every tool interface is fully responsive, optimized for touchscreens, and tested across standard mobile viewports.',
    },
    {
      q: 'Are there any usage or file size limits?',
      a: 'Local browser operations are bounded only by your machine’s available memory and CPU. For regex, safe limits guard against accidental infinite loops.',
    },
    {
      q: 'Which browsers are officially supported?',
      a: 'DevPocket works on all modern standards-compliant browsers including Chrome, Edge, Firefox, Safari, and Brave on macOS, Windows, Linux, iOS, and Android.',
    },
    {
      q: 'Can I suggest or request a new developer tool?',
      a: 'Absolutely! Use our Contact page to send tool requests and feedback. We actively expand DevPocket based on developer community needs.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section C: Hero Section (Above the fold) */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 lg:pb-24 border-b border-neutral-200 dark:border-neutral-800/80">
        {/* Ambient background glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-neon-cyan/15 via-blue-500/10 to-neon-violet/15 blur-[120px] pointer-events-none -z-10 rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Call to Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-foreground">Every developer tool. One pocket.</span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                Your entire dev toolkit.{' '}
                <span className="bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet bg-clip-text text-transparent">
                  One pocket.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                Fast, free, and privacy-first utilities for the everyday developer. No unnecessary sign-ups. No friction. Just useful tools processed locally in your browser.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet text-neutral-950 font-extrabold text-sm shadow-md hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore All Tools</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/tools/json-formatter"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-900 text-foreground border border-neutral-200 dark:border-neutral-800 hover:border-neon-cyan/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-bold text-sm active:scale-95 transition-all"
                >
                  <Braces className="w-4 h-4 text-neon-cyan" />
                  <span>Try JSON Formatter</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Client-Side</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-neon-cyan" />
                  <span>Instant Execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-neon-violet" />
                  <span>Zero Data Collection</span>
                </div>
              </div>
            </div>

            {/* Right Column: Original Interactive Hero Composition */}
            <div className="lg:col-span-5 relative">
              <NeonContainer variant="card" className="shadow-2xl">
                <div className="p-5 sm:p-6 flex flex-col gap-4 font-mono text-xs">
                  {/* Mock Window Bar */}
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-neutral-400">devpocket-live.json</span>
                    <span className="text-[10px] text-neon-cyan font-bold">READY</span>
                  </div>

                  {/* Code snippet illustration */}
                  <pre className="text-neutral-700 dark:text-neutral-300 overflow-x-auto leading-relaxed py-2">
                    <code>{`{
  "toolkit": "DevPocket",
  "privacy": "100% Client-Side",
  "encryption": "WebCrypto",
  "tools_available": 8,
  "ready_for_work": true
}`}</code>
                  </pre>

                  {/* Micro-cards */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col">
                      <span className="text-[10px] text-neutral-400">STATUS</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Operational
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col">
                      <span className="text-[10px] text-neutral-400">LATENCY</span>
                      <span className="text-xs font-bold text-neon-cyan mt-0.5">0 ms (Local)</span>
                    </div>
                  </div>
                </div>
              </NeonContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: Search-first tool discovery */}
      <section className="py-12 bg-neutral-50/50 dark:bg-neutral-950/40 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-neon-cyan pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a tool, format, or developer task..."
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan shadow-lg text-sm sm:text-base transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Suggestions Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Quick suggestions:</span>
            {['Format JSON', 'Decode Base64', 'Convert timestamp', 'UUID v4', 'Regex'].map(
              (query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setSearchQuery(query)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neon-cyan/50 hover:text-foreground transition-colors"
                >
                  {query}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Section E: Popular tools section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan mb-2">
              <Layers className="w-4 h-4" />
              <span>Full Suite</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              Explore Developer Utilities
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Eight carefully engineered tools for daily development tasks.
            </p>
          </div>

          <Link
            href="/tools"
            className="text-xs font-bold text-neon-cyan hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-neon-cyan/10 text-neon-cyan group-hover:scale-110 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {tool.categoryLabel}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground group-hover:text-neon-cyan transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3">
                  {tool.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neon-cyan">
                <span>Open Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section F: Why DevPocket? */}
      <section className="py-16 sm:py-20 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-violet">
              Why DevPocket
            </span>
            <h2 className="text-3xl font-black tracking-tight text-foreground mt-2">
              Built for speed, privacy, and productivity
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
              We replaced sluggish web apps and ad-ridden converter sites with a streamlined, browser-native toolkit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <div className="p-2.5 rounded-xl bg-neon-cyan/10 text-neon-cyan w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Browser-First Processing</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Computations happen directly on your CPU via client JavaScript and Web Workers. Zero roundtrip latency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <div className="p-2.5 rounded-xl bg-neon-violet/10 text-neon-violet w-fit">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">No Mandatory Account</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Never sign up or enter credentials to format JSON or convert timestamps. Pure utility without friction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Transparent Privacy</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We never store your payloads. What you paste into DevPocket stays strictly on your machine.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Mobile & Desktop Ready</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Responsive layouts engineered to work fluidly on phone viewports, tablets, and wide desktop screens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Free Core Utilities</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                All 8 tools are completely free for normal everyday developer use with no artificial daily tokens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 w-fit">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Developer-Focused UX</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Shortcuts, monospace typography, one-click copy feedback, and instant validation indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section G: Simple Workflow */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">
            Workflow
          </span>
          <h2 className="text-3xl font-black tracking-tight text-foreground mt-2">
            How DevPocket works
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Four simple steps to keep your developer workflow moving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Choose a Tool', desc: 'Pick from our 8 utilities via search or category directory.' },
            { step: '02', title: 'Paste Your Data', desc: 'Paste raw JSON, strings, timestamps, or code snippets.' },
            { step: '03', title: 'Instant Processing', desc: 'Real-time local parsing and formatting with instant feedback.' },
            { step: '04', title: 'Copy or Download', desc: 'Grab output with one click or export directly to file.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between"
            >
              <span className="text-3xl font-black font-mono text-neon-cyan/40 mb-4">{item.step}</span>
              <div>
                <h3 className="font-bold text-base text-foreground">{item.title}</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section H: Privacy Section */}
      <section className="py-16 bg-neutral-900 text-white border-y border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-neon-cyan/15 text-neon-cyan mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Privacy isn&apos;t an afterthought. It&apos;s our architecture.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Your proprietary tokens, customer data, and code snippets should never be transmitted to third-party servers just to be formatted or decoded. DevPocket operates strictly within your local browser sandbox.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-300">
            <span className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700">
              No Payload Telemetry
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700">
              No Remote Database Storage
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700">
              Web Crypto Standard
            </span>
          </div>
        </div>
      </section>

      {/* Section I: FAQ Section */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-violet">
            FAQ
          </span>
          <h2 className="text-3xl font-black tracking-tight text-foreground mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-foreground flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="text-neon-cyan text-lg">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section J: Final CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent via-neutral-100/40 dark:via-neutral-900/40 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Make your next development task simpler.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg">
            Free, fast, and always in your pocket. No sign-ups required.
          </p>
          <div className="mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet text-neutral-950 font-black text-sm shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>Explore the Toolkit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
