import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-lg ${className}`}
      aria-label="DevPocket Home"
    >
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 p-1.5 border border-neutral-700/60 shadow-md group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-neon-cyan group-hover:text-cyan-300 transition-colors"
        >
          {/* Geometric Pocket Base */}
          <path
            d="M7 6C7 4.89543 7.89543 4 9 4H23C24.1046 4 25 4.89543 25 6V18C25 22.9706 20.9706 27 16 27C11.0294 27 7 22.9706 7 18V6Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Pocket top rim */}
          <path
            d="M7 11H25"
            stroke="url(#pocketRimGrad)"
            strokeWidth="1.8"
            strokeDasharray="2 2"
          />
          {/* Code bracket motif inside pocket */}
          <path
            d="M13 15L10.5 17.5L13 20"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 15L21.5 17.5L19 20"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 14L15 21"
            stroke="#84CC16"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="pocketRimGrad" x1="7" y1="11" x2="25" y2="11" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00F0FF" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className="flex items-baseline font-black tracking-tight text-foreground text-lg sm:text-xl">
          <span>Dev</span>
          <span className="bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-violet bg-clip-text text-transparent">
            Pocket
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan ml-0.5 animate-pulse" />
        </span>
      )}
    </Link>
  );
}
