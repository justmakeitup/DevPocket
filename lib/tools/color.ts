export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface ColorData {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  hsv: HsvColor;
  rgbString: string;
  hslString: string;
}

export interface ContrastResult {
  ratio: number;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
}

export function parseHex(hex: string): RgbColor | null {
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleaned.length !== 6 && cleaned.length !== 8) {
    return null;
  }
  const num = parseInt(cleaned.slice(0, 6), 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(rgb: RgbColor): string {
  const r = Math.min(255, Math.max(0, Math.round(rgb.r)));
  const g = Math.min(255, Math.max(0, Math.round(rgb.g)));
  const b = Math.min(255, Math.max(0, Math.round(rgb.b)));
  return (
    '#' +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return {
    h: (h + 360) % 360,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let temp = t;
      if (temp < 0) temp += 1;
      if (temp > 1) temp -= 1;
      if (temp < 1 / 6) return p + (q - p) * 6 * temp;
      if (temp < 1 / 2) return q;
      if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function rgbToHsv(rgb: RgbColor): HsvColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return {
    h: (h + 360) % 360,
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function buildColorData(hex: string): ColorData | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;

  const cleanHex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);

  return {
    hex: cleanHex,
    rgb,
    hsl,
    hsv,
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hslString: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}

/**
 * WCAG 2.2 Relative Luminance formula.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export function getRelativeLuminance(rgb: RgbColor): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const s = val / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Contrast ratio: (L1 + 0.05) / (L2 + 0.05) where L1 is lighter
 */
export function getContrastRatio(fgRgb: RgbColor, bgRgb: RgbColor): ContrastResult {
  const l1 = getRelativeLuminance(fgRgb);
  const l2 = getRelativeLuminance(bgRgb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  return {
    ratio: roundedRatio,
    normalTextAA: roundedRatio >= 4.5,
    normalTextAAA: roundedRatio >= 7.0,
    largeTextAA: roundedRatio >= 3.0,
    largeTextAAA: roundedRatio >= 4.5,
  };
}

export function generateHarmonicPalettes(baseHsl: HslColor): {
  complementary: string[];
  analogous: string[];
  triadic: string[];
  shades: string[];
} {
  const toHex = (h: number, s: number, l: number) => {
    return rgbToHex(hslToRgb({ h: (h + 360) % 360, s, l }));
  };

  // Complementary: 180 degrees opposite
  const complementary = [
    toHex(baseHsl.h, baseHsl.s, baseHsl.l),
    toHex(baseHsl.h + 180, baseHsl.s, baseHsl.l),
  ];

  // Analogous: +/- 30 degrees
  const analogous = [
    toHex(baseHsl.h - 30, baseHsl.s, baseHsl.l),
    toHex(baseHsl.h, baseHsl.s, baseHsl.l),
    toHex(baseHsl.h + 30, baseHsl.s, baseHsl.l),
  ];

  // Triadic: 120 degrees apart
  const triadic = [
    toHex(baseHsl.h, baseHsl.s, baseHsl.l),
    toHex(baseHsl.h + 120, baseHsl.s, baseHsl.l),
    toHex(baseHsl.h + 240, baseHsl.s, baseHsl.l),
  ];

  // Monochromatic Shades: vary lightness from 20% to 80%
  const shades = [
    toHex(baseHsl.h, baseHsl.s, 20),
    toHex(baseHsl.h, baseHsl.s, 40),
    toHex(baseHsl.h, baseHsl.s, 60),
    toHex(baseHsl.h, baseHsl.s, 80),
  ];

  return {
    complementary,
    analogous,
    triadic,
    shades,
  };
}

export function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
