export interface Base64Result {
  output: string;
  error?: string;
  originalBytes?: number;
  resultBytes?: number;
}

/**
 * UTF-8 safe Base64 encoding.
 * Converts Unicode text into UTF-8 bytes using TextEncoder,
 * then maps binary bytes to Base64 safely.
 */
export function encodeBase64(input: string): Base64Result {
  if (!input) {
    return { output: '', originalBytes: 0, resultBytes: 0 };
  }

  try {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(input);
    let binary = '';
    const len = utf8Bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    const output = btoa(binary);
    return {
      output,
      originalBytes: utf8Bytes.length,
      resultBytes: output.length,
    };
  } catch (err: unknown) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Failed to encode to Base64',
    };
  }
}

/**
 * UTF-8 safe Base64 decoding.
 * Validates Base64 pattern and uses TextDecoder with fatal: true
 * to ensure no invalid byte sequences or silent byte discarding.
 */
export function decodeBase64(input: string): Base64Result {
  const sanitized = input.trim();
  if (!sanitized) {
    return { output: '', originalBytes: 0, resultBytes: 0 };
  }

  // Check valid base64 character set
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  // Clean whitespace/newlines from input
  const cleanInput = sanitized.replace(/\s+/g, '');

  if (!base64Regex.test(cleanInput)) {
    return {
      output: '',
      error: 'Invalid Base64 string format. Check for illegal characters or missing padding (=).',
    };
  }

  try {
    const binary = atob(cleanInput);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8', { fatal: true });
    const output = decoder.decode(bytes);
    return {
      output,
      originalBytes: cleanInput.length,
      resultBytes: bytes.length,
    };
  } catch (err: unknown) {
    return {
      output: '',
      error:
        err instanceof Error
          ? `Decoding failed: ${err.message}. If this is binary data (like an image), it cannot be represented as UTF-8 text.`
          : 'Malformed Base64 or non-UTF-8 byte sequence detected.',
    };
  }
}

export const SAMPLE_BASE64_TEXT = `🚀 DevPocket: Fast, free & private developer utilities!
Unicode test: 日本語, Español, Français, العربية, ⚡️`;
