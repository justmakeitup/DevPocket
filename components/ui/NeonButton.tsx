'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export function NeonButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled,
  ...props
}: NeonButtonProps) {
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet text-neutral-950 font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.98] transition-all duration-200 border border-cyan-300/40',
    secondary:
      'bg-neutral-100 dark:bg-neutral-900 text-foreground border border-neutral-300 dark:border-neutral-800 hover:border-neon-cyan/50 hover:bg-neutral-200 dark:hover:bg-neutral-800/80 active:scale-[0.98] transition-all duration-200',
    outline:
      'bg-transparent border border-neutral-300 dark:border-neutral-700 text-foreground hover:border-neon-cyan hover:text-neon-cyan active:scale-[0.98] transition-all duration-200',
    ghost:
      'bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 disabled:opacity-50 disabled:pointer-events-none transition-all',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}
