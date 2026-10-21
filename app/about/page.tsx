import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, Zap, Heart, Code2, Cpu, Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About DevPocket — Developer Toolkit',
  description:
    'Learn about DevPocket’s mission: providing fast, free, privacy-first developer utilities processed locally in your browser with zero friction.',
  path: '/about',
  keywords: ['about devpocket', 'developer toolkit mission', 'client-side dev tools', 'privacy first dev tools'],
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Breadcrumbs items={[{ name: 'About DevPocket', path: '/about' }]} />

      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">
            Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Small tools.{' '}
            <span className="bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet bg-clip-text text-transparent">
              Big productivity.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Format, encode, compare, generate, and debug in seconds. A collection of fast, free developer utilities designed to keep your workflow moving.
          </p>
        </div>

        {/* Narrative */}
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-neutral-700 dark:text-neutral-300 space-y-6 leading-relaxed">
          <p>
            Modern software engineering involves dozens of tiny, repetitive conversions every day: validating a JSON response, testing a regex before committing code, decoding an OAuth callback URL, checking color accessibility, or generating fresh UUIDs for database seeds.
          </p>
          <p>
            Too often, developers have had to rely on bloated websites overloaded with advertisements, slow loading times, cookie trackers, or tools that silently transmit confidential payloads to unknown remote servers.
          </p>
          <p>
            <strong>DevPocket was built to be different.</strong> We believe developer utilities should be instantaneous, distraction-free, aesthetically refined, and uncompromising when it comes to user privacy.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-neon-cyan/10 text-neon-cyan w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Local Browser Processing</h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Whenever you paste JSON, tokens, or code snippets, processing happens exclusively inside your local browser memory. No data is stored or logged on our servers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-neon-violet/10 text-neon-violet w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Zero Accounts or Friction</h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              No sign-ups, no verification emails, and no passwords. Bookmark your favorite utilities and use them immediately from any device.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Modern Engineering</h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Built with Next.js App Router, TypeScript with strict type checking, Web Cryptography, and Tailwind CSS with custom neon animations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 w-fit">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Free Core Utilities</h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              All 8 core tools are completely free for normal use. We believe essential developer utilities should belong to the global developer commons.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-neutral-900 text-white border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Ready to streamline your workflow?</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Explore our full catalog of 8 developer tools.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold text-xs tracking-tight shadow-md hover:shadow-neon-cyan/20 shrink-0 transition-all"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
