export type ToolCategory =
  | 'formatting'
  | 'encoding'
  | 'text'
  | 'generators'
  | 'utilities'
  | 'design';

export interface ToolMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  popular?: boolean;
  tags: string[];
  features: string[];
  path: string;
  searchKeywords: string[];
}

export type ThemeMode = 'dark' | 'light' | 'system';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  hasConsented: boolean;
  timestamp?: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}
