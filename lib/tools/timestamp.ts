export type TimestampUnit = 'seconds' | 'milliseconds';

export interface TimestampConversions {
  isValid: boolean;
  error?: string;
  unixSeconds?: number;
  unixMilliseconds?: number;
  iso8601?: string;
  utcDateString?: string;
  localDateString?: string;
  relativeTime?: string;
  timezoneName?: string;
  suggestedUnit?: TimestampUnit;
}

export function detectTimestampUnit(timestamp: number): TimestampUnit {
  // If timestamp > 100,000,000,000 (roughly Sep 1973 if in ms, but year 5138 if in sec),
  // it is almost certainly milliseconds for dates around 2000-2100.
  return timestamp > 30000000000 ? 'milliseconds' : 'seconds';
}

export function convertTimestamp(
  rawInput: string | number,
  unit: TimestampUnit = 'seconds'
): TimestampConversions {
  const trimmed = String(rawInput).trim();
  if (!trimmed) {
    return { isValid: false, error: 'Enter a valid timestamp' };
  }

  const numericValue = Number(trimmed);
  if (isNaN(numericValue) || !isFinite(numericValue)) {
    return { isValid: false, error: 'Timestamp must be a valid number' };
  }

  const suggestedUnit = detectTimestampUnit(numericValue);

  // Compute milliseconds based on chosen unit
  const millis = unit === 'seconds' ? Math.round(numericValue * 1000) : Math.round(numericValue);

  const date = new Date(millis);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Date is out of valid range' };
  }

  const unixSeconds = Math.floor(millis / 1000);
  const unixMilliseconds = millis;
  const iso8601 = date.toISOString();
  const utcDateString = date.toUTCString();
  const localDateString = date.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  const relativeTime = getRelativeTimeString(date);
  const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    isValid: true,
    unixSeconds,
    unixMilliseconds,
    iso8601,
    utcDateString,
    localDateString,
    relativeTime,
    timezoneName,
    suggestedUnit,
  };
}

export function convertDateToTimestamp(dateInput: string | Date): TimestampConversions {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }

  const millis = date.getTime();
  const unixSeconds = Math.floor(millis / 1000);
  const unixMilliseconds = millis;
  const iso8601 = date.toISOString();
  const utcDateString = date.toUTCString();
  const localDateString = date.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  const relativeTime = getRelativeTimeString(date);
  const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    isValid: true,
    unixSeconds,
    unixMilliseconds,
    iso8601,
    utcDateString,
    localDateString,
    relativeTime,
    timezoneName,
  };
}

export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const isFuture = diffSec > 0;
  const absSec = Math.abs(diffSec);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (absSec < 60) return isFuture ? 'in a few seconds' : 'just now';
  if (absSec < 3600) return rtf.format(Math.round(diffSec / 60), 'minute');
  if (absSec < 86400) return rtf.format(Math.round(diffSec / 3600), 'hour');
  if (absSec < 2592000) return rtf.format(Math.round(diffSec / 86400), 'day');
  if (absSec < 31536000) return rtf.format(Math.round(diffSec / 2592000), 'month');
  return rtf.format(Math.round(diffSec / 31536000), 'year');
}
