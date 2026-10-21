import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devpocket.dev';

export interface PageSeoProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
}

export function constructMetadata({
  title,
  description,
  path = '',
  keywords = [],
  ogType = 'website',
}: PageSeoProps): Metadata {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const defaultKeywords = [
    'developer tools',
    'dev toolkit',
    'json formatter',
    'base64 encode',
    'url encoder',
    'regex tester',
    'uuid generator',
    'timestamp converter',
    'diff checker',
    'color converter',
    'wcag contrast',
    'free developer utilities',
    'client-side dev tools',
  ];

  return {
    title,
    description,
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    authors: [{ name: 'DevPocket Lab' }],
    creator: 'DevPocket',
    publisher: 'DevPocket',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'DevPocket',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'DevPocket — Every developer tool. One pocket.',
        },
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
      creator: '@devpocket',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getStructuredDataWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevPocket',
    url: BASE_URL,
    description: 'Every developer tool. One pocket. Fast, free, privacy-focused developer utilities.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getStructuredDataBreadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}
