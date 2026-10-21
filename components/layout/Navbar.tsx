'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SearchCommand } from '@/components/ui/SearchCommand';
import { TOOLS } from '@/lib/tools-data';

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-neutral-800'
            : 'bg-white/70 dark:bg-neutral-950/70 backdrop-blur-sm border-b border-neutral-200/50 dark:border-neutral-850/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ${
                  pathname === '/' ? 'text-neon-cyan font-semibold' : ''
                }`}
              >
                Home
              </Link>

              {/* Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                onMouseLeave={() => setIsToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ${
                    pathname.startsWith('/tools') ? 'text-neon-cyan font-semibold' : ''
                  }`}
                  aria-expanded={isToolsDropdownOpen}
                >
                  <span>Tools</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isToolsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isToolsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 px-3 py-1.5">
                      Popular Utilities
                    </div>
                    <div className="space-y-0.5">
                      {TOOLS.slice(0, 6).map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.path}
                          className="flex flex-col px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group"
                        >
                          <span className="text-xs font-semibold text-foreground group-hover:text-neon-cyan transition-colors">
                            {tool.name}
                          </span>
                          <span className="text-[11px] text-neutral-500 line-clamp-1">
                            {tool.tagline}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-800 px-1">
                      <Link
                        href="/tools"
                        className="flex items-center justify-between text-xs font-bold text-neon-cyan hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <span>View all 8 tools</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ${
                  pathname === '/about' ? 'text-neon-cyan font-semibold' : ''
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ${
                  pathname === '/contact' ? 'text-neon-cyan font-semibold' : ''
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right actions: Search, Theme Toggle, CTA */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800 hover:border-neon-cyan/50 hover:text-foreground transition-all"
              aria-label="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neon-violet" />
              )}
            </button>

            {/* Prominent CTA */}
            <Link
              href="/tools"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet text-neutral-950 shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.35)] active:scale-95 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Tools</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              <Link
                href="/"
                className={`px-3 py-2 rounded-xl ${
                  pathname === '/' ? 'bg-neon-cyan/10 text-neon-cyan font-bold' : 'text-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                href="/tools"
                className={`px-3 py-2 rounded-xl ${
                  pathname === '/tools' ? 'bg-neon-cyan/10 text-neon-cyan font-bold' : 'text-foreground'
                }`}
              >
                All Developer Tools (8)
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-xl ${
                  pathname === '/about' ? 'bg-neon-cyan/10 text-neon-cyan font-bold' : 'text-foreground'
                }`}
              >
                About DevPocket
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-xl ${
                  pathname === '/contact' ? 'bg-neon-cyan/10 text-neon-cyan font-bold' : 'text-foreground'
                }`}
              >
                Contact & Feedback
              </Link>
            </nav>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/tools"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold text-sm shadow-md"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Tools Directory</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Search Dialog */}
      <SearchCommand isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
