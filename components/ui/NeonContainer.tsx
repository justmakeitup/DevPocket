'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeonContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'card' | 'panel' | 'subtle' | 'glow';
  className?: string;
  glowOnHover?: boolean;
}

export function NeonContainer({
  children,
  variant = 'card',
  className = '',
  glowOnHover = true,
  ...props
}: NeonContainerProps) {
  return (
    <div
      className={cn(
        'relative group rounded-2xl p-[1px] transition-all duration-300',
        glowOnHover && 'hover:shadow-[0_0_25px_rgba(0,240,255,0.18)]',
        variant === 'glow' && 'shadow-[0_0_25px_rgba(0,240,255,0.15)]',
        className
      )}
      {...props}
    >
      {/* Animated gradient border background layer */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl transition-opacity duration-500 overflow-hidden',
          glowOnHover ? 'opacity-40 group-hover:opacity-100' : 'opacity-60',
          'before:absolute before:inset-[-200%] before:bg-[conic-gradient(from_0deg,#00F0FF,#3B82F6,#8B5CF6,#84CC16,#00F0FF)]',
          'motion-safe:before:animate-neon-rotate-slow'
        )}
        aria-hidden="true"
      />

      {/* Inner surface container */}
      <div className="relative rounded-[15px] bg-white dark:bg-neutral-950/90 text-foreground backdrop-blur-md h-full w-full border border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
        {children}
      </div>
    </div>
  );
}
