import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getStructuredDataBreadcrumbs } from '@/lib/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ name: 'Home', path: '/' }, ...items];
  const structuredData = getStructuredDataBreadcrumbs(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs text-neutral-500 mb-6 flex-wrap gap-1.5">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-neon-cyan transition-colors"
          aria-label="Home"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.path}>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-neon-cyan transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
