'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function CopyButton({ text, label = 'Copy', className = '', size = 'sm' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleCopy = async () => {
    if (!text) {
      error('Nothing to copy!');
      return;
    }
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      error('Failed to copy to clipboard.');
    }
  };

  const isSmall = size === 'sm';

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan active:scale-95 ${
        isSmall ? 'text-xs px-2.5 py-1.5' : 'text-sm px-3.5 py-2'
      } ${
        copied
          ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30'
          : 'bg-neutral-100 dark:bg-neutral-900/80 text-foreground border border-neutral-300 dark:border-neutral-800 hover:border-neon-cyan/50 hover:text-neon-cyan'
      } ${className}`}
      aria-label={label}
      title={label}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
}
