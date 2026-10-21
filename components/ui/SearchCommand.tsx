'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchTools } from '@/lib/tools-data';
import { ToolMeta } from '@/types';

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchTools(query);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelectTool = React.useCallback(
    (tool: ToolMeta) => {
      onClose();
      router.push(tool.path);
    },
    [onClose, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose(); // toggle handled in caller
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelectTool(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, handleSelectTool]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search developer tools"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet" />

        {/* Input box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neon-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a tool, format, or developer task..."
            className="w-full bg-transparent text-foreground placeholder:text-neutral-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-foreground rounded"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Suggestions chips */}
        {!query && (
          <div className="p-3 bg-neutral-50 dark:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-400 font-medium">Quick suggestions:</span>
            {['Format JSON', 'Decode Base64', 'Convert timestamp', 'UUID v4', 'Regex'].map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neon-cyan/50 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/40">
          {results.length > 0 ? (
            results.map((tool, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800/90 text-foreground shadow-sm'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm group-hover:text-neon-cyan transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {tool.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">{tool.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400">
                    {isSelected && (
                      <span className="text-xs text-neon-cyan font-medium hidden sm:inline-flex items-center gap-1">
                        Open <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-neon-cyan transition-all" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm font-medium">No developer tools found matching &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-neutral-500">
                Try searching for json, base64, timestamp, regex, uuid, or diff.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-950/80 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>Use ↑ ↓ to navigate, Enter to select</span>
          <span className="text-neon-cyan">Local browser processing</span>
        </div>
      </div>
    </div>
  );
}
