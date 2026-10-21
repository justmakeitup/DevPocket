import React from 'react';
import Link from 'next/link';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { ToolMeta } from '@/types';
import { TOOLS } from '@/lib/tools-data';

interface FaqItem {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  tool: ToolMeta;
  children: React.ReactNode;
  faqs?: FaqItem[];
  docsLinks?: { label: string; url: string }[];
}

export function ToolLayout({
  tool,
  children,
  faqs = [],
  docsLinks = [],
}: ToolLayoutProps) {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Tools', path: '/tools' },
    { name: tool.name, path: tool.path },
  ];

  const relatedTools = TOOLS.filter((t) => t.id !== tool.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
              {tool.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" /> Browser Processed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {tool.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Quick Docs links if provided */}
        {docsLinks.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {docsLinks.map((doc) => (
              <a
                key={doc.url}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neon-cyan transition-colors px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
              >
                <span>{doc.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Tool Area */}
      <div className="py-8">{children}</div>

      {/* Privacy Notice Box */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-neon-cyan/10 text-neon-cyan shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-bold text-foreground">Privacy Guarantee: </span>
          All data processing in {tool.name} is executed 100% locally inside your web browser. Neither your input text, keys, configurations, nor the resulting output are ever uploaded to a server or stored in a remote database.
        </div>
      </div>

      {/* Tool Features and Capabilities */}
      {tool.features && tool.features.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-foreground mb-4">Key Capabilities & Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tool.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-2 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-neon-violet" />
            <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2"
              >
                <h3 className="font-semibold text-sm text-foreground">{faq.question}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Utilities */}
      <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Related Utilities</h2>
          <Link
            href="/tools"
            className="text-xs font-bold text-neon-cyan hover:underline flex items-center gap-1"
          >
            <span>All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map((rel) => (
            <Link
              key={rel.id}
              href={rel.path}
              className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neon-cyan/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {rel.categoryLabel}
                </span>
                <h3 className="text-sm font-bold text-foreground group-hover:text-neon-cyan transition-colors mt-1">
                  {rel.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{rel.tagline}</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-neon-cyan">
                <span>Open tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
