export interface RegexMatchItem {
  index: number;
  length: number;
  match: string;
  groups: string[];
  namedGroups?: Record<string, string>;
}

export interface RegexResult {
  isValid: boolean;
  error?: string;
  matches: RegexMatchItem[];
  executionTimeMs?: number;
  truncated?: boolean;
}

export interface RegexPreset {
  name: string;
  description: string;
  pattern: string;
  flags: string;
  sampleText: string;
}

export const REGEX_PRESETS: RegexPreset[] = [
  {
    name: 'Email Address',
    description: 'Matches standard user@domain.tld email formats',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    flags: 'g',
    sampleText: 'Contact support@devpocket.dev or developer.pro@domain.co.uk for help. Invalid: test@.com',
  },
  {
    name: 'URL / Web Address',
    description: 'Matches http/https URLs with optional paths and query strings',
    pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)',
    flags: 'gi',
    sampleText: 'Visit https://devpocket.dev or http://localhost:3000/tools?filter=regex to test.',
  },
  {
    name: 'IPv4 Address',
    description: 'Matches standard 0.0.0.0 to 255.255.255.255 IPv4 addresses',
    pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    flags: 'g',
    sampleText: 'Router IP: 192.168.1.1, DNS: 8.8.8.8, invalid: 999.12.34.56',
  },
  {
    name: 'UUID v4',
    description: 'Matches 36-character hexadecimal RFC 4122 v4 UUIDs',
    pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}',
    flags: 'gi',
    sampleText: 'Generated: 3e32e6c7-27e5-4ef1-831e-f34f6fd79ff5 and c4a8a5b2-132d-4f24-9b23-1c3905cf6572',
  },
  {
    name: 'Hex Color Code',
    description: 'Matches 3, 4, 6, or 8 digit HEX color codes',
    pattern: '#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b',
    flags: 'g',
    sampleText: 'Theme colors: #00F0FF (cyan), #8B5CF6 (violet), #FFF, #121318EE',
  },
  {
    name: 'Date (YYYY-MM-DD)',
    description: 'Matches ISO formatted calendar dates',
    pattern: '\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b',
    flags: 'g',
    sampleText: 'Project milestone dates: 2026-10-21, 2026-12-31, invalid: 2026-02-31',
  },
];

export function testRegex(
  pattern: string,
  flags: string,
  testString: string,
  maxMatches = 500
): RegexResult {
  if (!pattern) {
    return { isValid: true, matches: [] };
  }

  // Safety bound: limit test string length to 100,000 characters
  const safeText = testString.slice(0, 100000);

  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatchItem[] = [];
    const isGlobal = flags.includes('g');

    if (!isGlobal) {
      const match = regex.exec(safeText);
      if (match && match.index !== undefined) {
        matches.push({
          index: match.index,
          length: match[0].length,
          match: match[0],
          groups: match.slice(1),
          namedGroups: match.groups,
        });
      }
    } else {
      let match: RegExpExecArray | null;
      let iterations = 0;
      const MAX_ITERATIONS = 5000;

      while ((match = regex.exec(safeText)) !== null) {
        iterations++;
        matches.push({
          index: match.index,
          length: match[0].length,
          match: match[0],
          groups: match.slice(1),
          namedGroups: match.groups,
        });

        if (matches.length >= maxMatches || iterations >= MAX_ITERATIONS) {
          break;
        }

        // Safeguard against zero-length matches infinite loop (e.g., /(?:)/g)
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
    }

    const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    return {
      isValid: true,
      matches,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
      truncated: matches.length >= maxMatches,
    };
  } catch (err: unknown) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid Regular Expression',
      matches: [],
    };
  }
}
