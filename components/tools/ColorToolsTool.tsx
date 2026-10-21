'use client';

import React, { useState, useMemo } from 'react';
import {
  buildColorData,
  getContrastRatio,
  generateHarmonicPalettes,
  getRandomHexColor,
  parseHex,
} from '@/lib/tools/color';
import { CopyButton } from '@/components/ui/CopyButton';
import { downloadFile } from '@/lib/utils';
import {
  Palette,
  Shuffle,
  Download,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
} from 'lucide-react';

export function ColorToolsTool() {
  const [hexInput, setHexInput] = useState('#00F0FF');
  const [backgroundHex, setBackgroundHex] = useState('#0A0A0C');

  // Parsed base color
  const colorData = useMemo(() => {
    return buildColorData(hexInput) || buildColorData('#00F0FF')!;
  }, [hexInput]);

  // Contrast against background
  const contrast = useMemo(() => {
    const bgRgb = parseHex(backgroundHex) || { r: 10, g: 10, b: 12 };
    return getContrastRatio(colorData.rgb, bgRgb);
  }, [colorData, backgroundHex]);

  // Palettes
  const palettes = useMemo(() => {
    return generateHarmonicPalettes(colorData.hsl);
  }, [colorData]);

  const handleRandomColor = () => {
    const randomHex = getRandomHexColor();
    setHexInput(randomHex);
  };

  const handleDownloadPalette = () => {
    const paletteExport = {
      baseColor: colorData,
      contrastVsBackground: {
        background: backgroundHex,
        contrastRatio: contrast.ratio,
        wcag: contrast,
      },
      palettes,
    };
    downloadFile(
      JSON.stringify(paletteExport, null, 2),
      `devpocket-palette-${colorData.hex.replace('#', '')}.json`,
      'application/json'
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Primary Color Selector Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Visual Swatch + Color Picker Input */}
          <div className="relative group shrink-0">
            <div
              className="w-20 h-20 rounded-2xl shadow-inner border-2 border-white/20 transition-transform group-hover:scale-105 duration-200 cursor-pointer overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: colorData.hex }}
            >
              <input
                type="color"
                value={colorData.hex}
                onChange={(e) => setHexInput(e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                aria-label="Pick color"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Active Color
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
                {colorData.hex}
              </span>
              <CopyButton text={colorData.hex} size="sm" />
            </div>
            <span className="text-xs font-mono text-neutral-500 mt-0.5">
              {colorData.rgbString}
            </span>
          </div>
        </div>

        {/* Input & Randomizer */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">HEX:</span>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              placeholder="#00F0FF"
              maxLength={9}
              className="w-28 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-foreground uppercase border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neon-cyan"
            />
          </div>

          <button
            type="button"
            onClick={handleRandomColor}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:text-foreground transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-neon-cyan" />
            <span>Random</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPalette}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:text-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Color Representations & Conversions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              HEX
            </span>
            <span className="font-mono text-sm font-bold text-foreground">{colorData.hex}</span>
          </div>
          <CopyButton text={colorData.hex} size="sm" />
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              RGB
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {colorData.rgbString}
            </span>
          </div>
          <CopyButton text={colorData.rgbString} size="sm" />
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              HSL
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {colorData.hslString}
            </span>
          </div>
          <CopyButton text={colorData.hslString} size="sm" />
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              HSV
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              hsv({colorData.hsv.h}, {colorData.hsv.s}%, {colorData.hsv.v}%)
            </span>
          </div>
          <CopyButton
            text={`hsv(${colorData.hsv.h}, ${colorData.hsv.s}%, ${colorData.hsv.v}%)`}
            size="sm"
          />
        </div>
      </div>

      {/* WCAG 2.2 Contrast Ratio Calculator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-bold text-base text-foreground">
                WCAG 2.2 Contrast Checker
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Calculates relative luminance and contrast ratios against custom background colors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 font-medium">Against Background:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundHex}
                onChange={(e) => setBackgroundHex(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                aria-label="Pick background test color"
              />
              <input
                type="text"
                value={backgroundHex}
                onChange={(e) => setBackgroundHex(e.target.value)}
                className="w-24 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-foreground uppercase border border-neutral-300 dark:border-neutral-700"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Box & Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Live visual preview block */}
          <div
            className="p-6 rounded-2xl flex flex-col justify-center items-center text-center border shadow-inner min-h-[140px]"
            style={{ backgroundColor: backgroundHex }}
          >
            <p
              className="text-lg font-bold transition-colors"
              style={{ color: colorData.hex }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
            <span
              className="text-xs opacity-80 mt-1"
              style={{ color: colorData.hex }}
            >
              14px Regular UI Text Preview
            </span>
          </div>

          {/* Contrast Score */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Contrast Ratio
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-black text-foreground mt-1">
              {contrast.ratio} : 1
            </span>
            <span className="text-[11px] text-neutral-500 mt-1">
              {contrast.normalTextAA ? 'Meets minimum WCAG AA' : 'Fails WCAG AA for body text'}
            </span>
          </div>

          {/* Compliance Checklist */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
              <span>Normal Text (AA &ge; 4.5:1)</span>
              {contrast.normalTextAA ? (
                <span className="text-emerald-500 font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="text-red-500 font-bold flex items-center gap-1 font-mono">
                  <XCircle className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
              <span>Normal Text (AAA &ge; 7:1)</span>
              {contrast.normalTextAAA ? (
                <span className="text-emerald-500 font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="text-neutral-400 font-bold flex items-center gap-1 font-mono">
                  <XCircle className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
              <span>Large Text (AA &ge; 3:1)</span>
              {contrast.largeTextAA ? (
                <span className="text-emerald-500 font-bold flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                </span>
              ) : (
                <span className="text-red-500 font-bold flex items-center gap-1 font-mono">
                  <XCircle className="w-3.5 h-3.5" /> FAIL
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Harmonic Palettes Generator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <Palette className="w-5 h-5 text-neon-violet" />
          <h3 className="font-bold text-base text-foreground">
            Harmonic Palette Generator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Complementary */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-foreground">Complementary (180°)</span>
            <div className="flex rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-14">
              {palettes.complementary.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setHexInput(c)}
                  className="flex-1 flex items-end justify-center pb-1 text-[10px] font-mono font-bold text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: c }}
                  title={`Click to use ${c}`}
                >
                  <span className="bg-black/60 px-1 rounded">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analogous */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-foreground">Analogous (±30°)</span>
            <div className="flex rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-14">
              {palettes.analogous.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setHexInput(c)}
                  className="flex-1 flex items-end justify-center pb-1 text-[10px] font-mono font-bold text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: c }}
                  title={`Click to use ${c}`}
                >
                  <span className="bg-black/60 px-1 rounded">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Triadic */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-foreground">Triadic (120°)</span>
            <div className="flex rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-14">
              {palettes.triadic.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setHexInput(c)}
                  className="flex-1 flex items-end justify-center pb-1 text-[10px] font-mono font-bold text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: c }}
                  title={`Click to use ${c}`}
                >
                  <span className="bg-black/60 px-1 rounded">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shades / Monochromatic */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-foreground">Shades / Monochromatic</span>
            <div className="flex rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-14">
              {palettes.shades.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setHexInput(c)}
                  className="flex-1 flex items-end justify-center pb-1 text-[10px] font-mono font-bold text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: c }}
                  title={`Click to use ${c}`}
                >
                  <span className="bg-black/60 px-1 rounded">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
