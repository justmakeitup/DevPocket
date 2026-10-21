export type UrlEncodeMode = 'component' | 'full';

export interface UrlParam {
  key: string;
  value: string;
}

export interface UrlParsedDetails {
  isValidUrl: boolean;
  protocol?: string;
  host?: string;
  pathname?: string;
  hash?: string;
  params: UrlParam[];
}

export function encodeUrl(input: string, mode: UrlEncodeMode = 'component'): { output: string; error?: string } {
  if (!input) return { output: '' };
  try {
    const output = mode === 'component' ? encodeURIComponent(input) : encodeURI(input);
    return { output };
  } catch (err: unknown) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Failed to encode URL',
    };
  }
}

export function decodeUrl(input: string, mode: UrlEncodeMode = 'component'): { output: string; error?: string } {
  if (!input) return { output: '' };
  try {
    const output = mode === 'component' ? decodeURIComponent(input) : decodeURI(input);
    return { output };
  } catch (err: unknown) {
    return {
      output: '',
      error:
        err instanceof Error
          ? `Malformed percent-encoded sequence: ${err.message}`
          : 'Invalid percent-encoded input',
    };
  }
}

export function inspectUrl(input: string): UrlParsedDetails {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValidUrl: false, params: [] };
  }

  try {
    // Try standard URL parse
    const parsed = new URL(trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`);
    const params: UrlParam[] = [];
    parsed.searchParams.forEach((value, key) => {
      params.push({ key, value });
    });

    return {
      isValidUrl: true,
      protocol: parsed.protocol,
      host: parsed.host,
      pathname: parsed.pathname,
      hash: parsed.hash,
      params,
    };
  } catch {
    // If not a full URL, parse query string if starts with ? or contains =
    const params: UrlParam[] = [];
    const queryPart = trimmed.includes('?') ? trimmed.split('?')[1] : trimmed;
    if (queryPart.includes('=')) {
      const searchParams = new URLSearchParams(queryPart);
      searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
    }

    return {
      isValidUrl: false,
      params,
    };
  }
}

export const SAMPLE_URL =
  'https://devpocket.dev/search?q=developer+toolkit&tags=frontend,nextjs,typescript&category=all#popular-tools';
