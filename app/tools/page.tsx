'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Code2, ArrowRight, X, Filter } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

function ToolsDirectoryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q)) ||
        tool.searchKeywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ name: 'Tools Directory', path: '/tools' }]} />

      <div className="pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Developer Tools Directory
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Browse our suite of 8 client-side developer utilities. Fast, privacy-focused, and free forever.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name, tag, or task..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neon-cyan shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories horizontal scroll tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold shadow-sm'
                : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-foreground'
            }`}
          >
            All Tools ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-neon-cyan to-blue-500 text-neutral-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
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

                <h2 className="text-base font-bold text-foreground group-hover:text-neon-cyan transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3">
                  {tool.tagline}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-neon-cyan">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-neutral-400">
            <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-base font-bold text-foreground">No utilities found</p>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your search terms or category selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ToolsDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-neutral-400">
          Loading tools directory...
        </div>
      }
    >
      <ToolsDirectoryContent />
    </Suspense>
  );
}
