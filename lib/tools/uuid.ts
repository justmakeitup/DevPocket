export interface UuidOptions {
  count?: number;
  uppercase?: boolean;
  hyphens?: boolean;
}

/**
 * Generates a cryptographically secure RFC 4122 v4 UUID.
 * Uses crypto.randomUUID() if available; falls back to crypto.getRandomValues().
 * Never uses Math.random().
 */
export function generateSecureUuid(): string {
  if (typeof crypto !== 'undefined') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      // Per RFC 4122: set version to 0100 (v4) and variant to 10xx
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;

      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
  }

  throw new Error('Web Cryptography API is required for secure UUID generation.');
}

export function generateUuidBatch(options: UuidOptions = {}): string[] {
  const count = Math.min(Math.max(1, options.count || 1), 500);
  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    let uuid = generateSecureUuid();
    if (options.hyphens === false) {
      uuid = uuid.replace(/-/g, '');
    }
    if (options.uppercase) {
      uuid = uuid.toUpperCase();
    } else {
      uuid = uuid.toLowerCase();
    }
    results.push(uuid);
  }

  return results;
}

export function isValidUuid(input: string): boolean {
  const standardUuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const noHyphenUuidRegex = /^[0-9a-f]{12}[1-5][0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i;
  const trimmed = input.trim();
  return standardUuidRegex.test(trimmed) || noHyphenUuidRegex.test(trimmed);
}
