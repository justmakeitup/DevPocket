import Link from 'next/link';
import { Compass, Home, SearchCode } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 sm:py-32 text-center flex flex-col items-center">
      <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neon-cyan mb-6 shadow-sm">
        <SearchCode className="w-12 h-12" />
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-violet">
        404 — Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2">
        Lost in cyberspace?
      </h1>

      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        The tool or page you are looking for does not exist or has been relocated. Explore our developer utilities directory or head back home.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold text-xs tracking-tight shadow-md hover:shadow-neon-cyan/20 active:scale-95 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Developer Tools</span>
        </Link>

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
