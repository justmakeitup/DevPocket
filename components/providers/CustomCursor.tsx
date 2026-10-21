'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if device has touch/coarse pointer or prefers reduced motion
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (touchQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    // Enable custom cursor mode on desktop: hides native OS cursor
    document.documentElement.classList.add('custom-cursor-enabled');

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], [role="link"], [data-cursor-hover="true"]'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // If touch device or prefers reduced motion, do not render custom cursor
  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x - 3}px, ${position.y - 2}px, 0)`,
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Refined minimal arrow-pointer silhouette with neon accents */}
      <div
        className={`relative -top-0.5 -left-0.5 transition-all duration-150 ${
          isHovered ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : 'drop-shadow-[0_0_4px_rgba(0,240,255,0.35)]'
        }`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="cursorNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sharp classic pointer arrow silhouette */}
          <path
            d="M3 2L10 21L13.5 13.5L21 10L3 2Z"
            fill="#090A10"
            stroke="url(#cursorNeonGrad)"
            strokeWidth="1.75"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Inner ambient accent node at apex */}
          <circle
            cx="4"
            cy="3"
            r="1"
            fill={isHovered ? '#84CC16' : '#00F0FF'}
            className="transition-colors duration-200"
          />
        </svg>
      </div>
    </div>
  );
}
