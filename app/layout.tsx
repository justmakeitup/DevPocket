import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { CustomCursor } from '@/components/providers/CustomCursor';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://devpocket.dev'),
  title: {
    default: 'DevPocket — Free Online Developer Tools & Utilities',
    template: '%s — DevPocket',
  },
  description:
    'Every developer tool. One pocket. Format JSON, encode Base64, test regex, convert timestamps, inspect diffs, and generate UUIDs. 100% private, free, and browser-processed.',
  keywords: [
    'developer tools',
    'dev utilities',
    'json formatter',
    'base64 encode decode',
    'regex tester',
    'uuid generator',
    'timestamp converter',
    'diff checker',
    'wcag contrast checker',
    'free developer toolkit',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-neon-cyan/20 selection:text-neon-cyan">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-neon-cyan focus:text-neutral-950 focus:font-bold focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <ToastProvider>
            {/* Custom Arrow Cursor */}
            <CustomCursor />

            <div className="flex flex-col min-h-screen">
              <AnnouncementBar />
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>

            <CookieBanner />
            <StickyMobileCTA />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
