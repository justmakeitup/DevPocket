import { describe, it, expect } from 'vitest';
import { formatJson, minifyJson, validateJson, sortObjectKeys } from '@/lib/tools/json';
import { encodeBase64, decodeBase64 } from '@/lib/tools/base64';
import { encodeUrl, decodeUrl, inspectUrl } from '@/lib/tools/url';
import { testRegex } from '@/lib/tools/regex';
import { generateSecureUuid, generateUuidBatch, isValidUuid } from '@/lib/tools/uuid';
import { convertTimestamp, convertDateToTimestamp, detectTimestampUnit } from '@/lib/tools/timestamp';
import { computeDiff } from '@/lib/tools/diff';
import {
  parseHex,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  getContrastRatio,
  generateHarmonicPalettes,
} from '@/lib/tools/color';

describe('Tool 1: JSON Formatter & Validator', () => {
  it('formats valid JSON with custom indentation', () => {
    const raw = '{"b":2,"a":1}';
    const res = formatJson(raw, 2);
    expect(res.error).toBeUndefined();
    expect(res.formatted).toContain('  "b": 2');
    expect(res.stats?.keyCount).toBe(2);
  });

  it('minifies JSON properly', () => {
    const raw = '{\n  "name": "DevPocket"\n}';
    const res = minifyJson(raw);
    expect(res.minified).toBe('{"name":"DevPocket"}');
  });

  it('validates syntax and reports errors with coordinates', () => {
    const invalid = '{"broken": }';
    const res = validateJson(invalid);
    expect(res.isValid).toBe(false);
    expect(res.error).toBeDefined();
  });

  it('sorts keys alphabetically without mutating data', () => {
    const obj = { z: 1, a: 2, m: { y: 10, b: 20 } };
    const sorted = sortObjectKeys(obj) as Record<string, unknown>;
    expect(Object.keys(sorted)).toEqual(['a', 'm', 'z']);
    expect(Object.keys(sorted.m as object)).toEqual(['b', 'y']);
  });
});

describe('Tool 2: Base64 Encoder & Decoder (UTF-8 Unicode)', () => {
  it('encodes and decodes ASCII strings correctly', () => {
    const str = 'Hello World from DevPocket!';
    const enc = encodeBase64(str);
    expect(enc.output).toBe('SGVsbG8gV29ybGQgZnJvbSBEZXZQb2NrZXQh');
    const dec = decodeBase64(enc.output);
    expect(dec.output).toBe(str);
  });

  it('handles multi-byte UTF-8 Unicode, accents, and emojis safely', () => {
    const unicodeText = '🚀 DevPocket ⚡️ 日本語 Español — ça va?';
    const enc = encodeBase64(unicodeText);
    expect(enc.output.length).toBeGreaterThan(0);
    const dec = decodeBase64(enc.output);
    expect(dec.output).toBe(unicodeText);
  });

  it('catches invalid Base64 input and reports error', () => {
    const invalidB64 = 'This is not valid base64!@#$';
    const dec = decodeBase64(invalidB64);
    expect(dec.error).toBeDefined();
    expect(dec.output).toBe('');
  });
});

describe('Tool 3: URL Encoder & Decoder', () => {
  it('encodes URI components correctly', () => {
    const input = 'hello world & special=true?';
    const res = encodeUrl(input, 'component');
    expect(res.output).toBe('hello%20world%20%26%20special%3Dtrue%3F');
  });

  it('decodes percent-encoded strings', () => {
    const encoded = 'query%20with%20spaces%20%26%20symbols';
    const res = decodeUrl(encoded, 'component');
    expect(res.output).toBe('query with spaces & symbols');
  });

  it('inspects query parameters accurately', () => {
    const url = 'https://devpocket.dev/search?category=dev&lang=ts&q=json';
    const parsed = inspectUrl(url);
    expect(parsed.isValidUrl).toBe(true);
    expect(parsed.params).toHaveLength(3);
    expect(parsed.params.find((p) => p.key === 'category')?.value).toBe('dev');
  });
});

describe('Tool 4: Regular Expression Tester', () => {
  it('finds matches with indices and captures', () => {
    const pattern = '(\\d{4})-(\\d{2})-(\\d{2})';
    const flags = 'g';
    const text = 'Release date is 2026-10-21 on the calendar.';
    const res = testRegex(pattern, flags, text);
    expect(res.isValid).toBe(true);
    expect(res.matches).toHaveLength(1);
    expect(res.matches[0].match).toBe('2026-10-21');
    expect(res.matches[0].groups).toEqual(['2026', '10', '21']);
  });

  it('catches invalid syntax gracefully', () => {
    const res = testRegex('[unclosed-bracket', 'g', 'sample');
    expect(res.isValid).toBe(false);
    expect(res.error).toBeDefined();
  });
});

describe('Tool 5: UUID Generator', () => {
  it('generates a valid 36-char RFC 4122 v4 UUID', () => {
    const uuid = generateSecureUuid();
    expect(isValidUuid(uuid)).toBe(true);
  });

  it('generates batches with formatting options', () => {
    const batch = generateUuidBatch({ count: 10, uppercase: true, hyphens: false });
    expect(batch).toHaveLength(10);
    expect(batch[0]).toMatch(/^[0-9A-F]{32}$/);
  });
});

describe('Tool 6: Timestamp Converter', () => {
  it('converts unix seconds to human UTC and ISO strings', () => {
    // 1700000000 is Wed, 14 Nov 2023 22:13:20 GMT
    const res = convertTimestamp(1700000000, 'seconds');
    expect(res.isValid).toBe(true);
    expect(res.iso8601).toBe('2023-11-14T22:13:20.000Z');
    expect(res.unixSeconds).toBe(1700000000);
  });

  it('detects milliseconds vs seconds correctly', () => {
    expect(detectTimestampUnit(1700000000)).toBe('seconds');
    expect(detectTimestampUnit(1700000000000)).toBe('milliseconds');
  });

  it('converts date to unix timestamp', () => {
    const dateStr = '2026-01-01T00:00:00.000Z';
    const res = convertDateToTimestamp(dateStr);
    expect(res.isValid).toBe(true);
    expect(res.unixSeconds).toBe(1767225600);
  });
});

describe('Tool 7: Diff Checker', () => {
  it('computes line additions and deletions accurately', () => {
    const orig = 'line1\nline2\nline3';
    const mod = 'line1\nline2 modified\nline3\nline4 added';
    const diff = computeDiff(orig, mod);
    expect(diff.stats.additions).toBeGreaterThan(0);
    expect(diff.stats.deletions).toBeGreaterThan(0);
    expect(diff.unifiedPatch).toContain('+line4 added');
  });
});

describe('Tool 8: Color Tools & WCAG 2.2 Contrast', () => {
  it('converts HEX to RGB and back', () => {
    const hex = '#00F0FF';
    const rgb = parseHex(hex)!;
    expect(rgb).toEqual({ r: 0, g: 240, b: 255 });
    const backToHex = rgbToHex(rgb);
    expect(backToHex).toBe('#00F0FF');
  });

  it('calculates WCAG 2.2 contrast ratio correctly', () => {
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    const contrast = getContrastRatio(white, black);
    expect(contrast.ratio).toBe(21);
    expect(contrast.normalTextAA).toBe(true);
    expect(contrast.normalTextAAA).toBe(true);
  });

  it('generates harmonic palettes', () => {
    const palettes = generateHarmonicPalettes({ h: 180, s: 100, l: 50 });
    expect(palettes.complementary).toHaveLength(2);
    expect(palettes.analogous).toHaveLength(3);
    expect(palettes.triadic).toHaveLength(3);
  });
});
