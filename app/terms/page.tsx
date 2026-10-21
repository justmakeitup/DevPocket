import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = constructMetadata({
  title: 'Terms and Conditions — DevPocket',
  description: 'DevPocket Terms of Service and Conditions of Use.',
  path: '/terms',
});

export default function TermsPage() {
  const lastUpdated = 'October 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Breadcrumbs items={[{ name: 'Terms and Conditions', path: '/terms' }]} />

      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2">
            Terms & Conditions
          </h1>
          <p className="text-xs text-neutral-500 mt-1">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-neutral-600 dark:text-neutral-400 space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DevPocket (&quot;the service&quot;), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you should not access or use the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Permitted Use</h2>
            <p>
              DevPocket grants you a free, non-exclusive, revocable license to use the developer utilities for personal and commercial development workflows. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Launch automated bot attacks, rate-limit flooding, or Denial-of-Service attacks against server endpoints.</li>
              <li>Attempt to reverse-engineer or disrupt server infrastructure.</li>
              <li>Use the contact submission workflow for unsolicited commercial advertising or spam.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Disclaimer of Warranties</h2>
            <p>
              DevPocket is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for strict mathematical correctness in our formatting, regex, diff, and cryptographic algorithms, we do not guarantee uninterrupted uptime or that tools will meet every specific requirement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Limitation of Liability</h2>
            <p>
              In no event shall DevPocket, its developers, or contributors be held liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Modifications to Service</h2>
            <p>
              We reserve the right to modify, add, or discontinue tools or features at any time without notice. Continued use of the website constitutes acceptance of updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
