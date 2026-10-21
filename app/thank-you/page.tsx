import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Compass, Home } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Message Received — DevPocket',
  description: 'Thank you for reaching out to DevPocket. We have received your inquiry.',
  path: '/thank-you',
});

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 sm:py-28 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan mb-2">
        Submission Confirmed
      </span>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
        Thank you for reaching out!
      </h1>

      <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
        Your message has been safely received. If your note requires a reply, we will review your request and get back to your email address promptly.
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
