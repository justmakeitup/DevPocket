import { CookiePreferences, ThemeMode } from '@/types';

const THEME_KEY = 'devpocket_theme';
const COOKIE_PREFS_KEY = 'devpocket_cookie_prefs';
const ANNOUNCEMENT_DISMISSED_KEY = 'devpocket_announcement_dismissed';

export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // LocalStorage blocked
  }
  return 'dark';
}

export function setStoredTheme(theme: ThemeMode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore error
  }
}

export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore
  }
  return null;
}

export function setStoredCookiePreferences(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore
  }
}

export function isAnnouncementDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAnnouncementDismissed() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, 'true');
  } catch {
    // Ignore
  }
}
