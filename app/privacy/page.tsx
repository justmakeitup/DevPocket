import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy — DevPocket',
  description:
    'DevPocket Privacy Policy: Learn how our client-side developer tools protect your data with zero-payload transmission and privacy by design.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const lastUpdated = 'October 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Breadcrumbs items={[{ name: 'Privacy Policy', path: '/privacy' }]} />

      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">
            Legal & Trust
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500 mt-1">Last Updated: {lastUpdated}</p>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Notice:</strong> This policy describes the technical data practices of the DevPocket application. If you deploy or self-host DevPocket for enterprise use, review with your legal counsel to adapt to your jurisdiction.
          </span>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-neutral-600 dark:text-neutral-400 space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Core Architecture: Client-Side Processing</h2>
            <p>
              DevPocket is built on a <strong>privacy-first, browser-local architecture</strong>. When you use the JSON Formatter, Base64 Encoder, URL Encoder, Regex Tester, UUID Generator, Timestamp Converter, Diff Checker, or Color Tools:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your pasted input data, strings, and code snippets are processed locally on your device.</li>
              <li>Data is parsed using client-side JavaScript and browser Web APIs (e.g., Web Cryptography, TextEncoder).</li>
              <li>Your input data and computed outputs are <strong>never transmitted</strong> to or stored on our servers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Server Interactions</h2>
            <p>
              The only requests sent to our backend servers occur when you deliberately use server-dependent actions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Contact Form:</strong> When you voluntarily submit a message via the Contact page, your name, email, subject, and message are transmitted over encrypted HTTPS to our API route to allow us to review and reply.
              </li>
              <li>
                <strong>Rate Limiting & Abuse Prevention:</strong> Standard IP-based rate limiting headers are evaluated in-memory to prevent Denial-of-Service attacks against server endpoints.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Local Storage & Functional Cookies</h2>
            <p>
              DevPocket stores minimal operational preferences in your browser’s local storage:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><code>devpocket_theme</code>: Saves your preferred UI mode (dark or light theme).</li>
              <li><code>devpocket_cookie_prefs</code>: Saves your granular cookie consent choices.</li>
              <li><code>devpocket_announcement_dismissed</code>: Remembers when you close the top announcement bar.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Analytics & Telemetry</h2>
            <p>
              Optional aggregate analytics are completely disabled by default until explicit consent is given via the Cookie Banner. We never collect, inspect, or correlate individual developer inputs with analytics events.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy or our security practices, contact us directly at <a href="mailto:ranit.das.1321@gmail.com" className="text-neon-cyan underline"><code>ranit.das.1321@gmail.com</code></a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
