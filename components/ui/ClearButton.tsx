'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

interface ClearButtonProps {
  onClear: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function ClearButton({
  onClear,
  label = 'Clear',
  disabled = false,
  className = '',
}: ClearButtonProps) {
  return (
    <button
      onClick={onClear}
      type="button"
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800 hover:border-red-500/40 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${className}`}
      aria-label={label}
      title={label}
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
