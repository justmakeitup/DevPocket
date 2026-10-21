import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { TimestampConverterTool } from '@/components/tools/TimestampConverterTool';

export const metadata: Metadata = constructMetadata({
  title: 'Timestamp Converter & Epoch Clock — DevPocket',
  description:
    'Convert Unix epoch timestamps to human-readable dates, ISO 8601, and local time. Includes a live seconds/milliseconds ticker and automatic unit detection.',
  path: '/tools/timestamp',
  keywords: ['unix timestamp converter', 'epoch converter', 'epoch to date', 'iso 8601 converter', 'epoch clock'],
});

export default function TimestampPage() {
  const tool = getToolBySlug('timestamp')!;

  const faqs = [
    {
      question: 'How do I know if my timestamp is seconds or milliseconds?',
      answer:
        'Standard Unix timestamps in seconds have 10 digits (e.g. 1770000000), while millisecond timestamps have 13 digits (e.g. 1770000000000). DevPocket includes smart heuristics to alert you if a mismatch is detected.',
    },
    {
      question: 'What is Unix Epoch time?',
      answer:
        'Unix time is the number of seconds (or milliseconds) that have elapsed since 00:00:00 Coordinated Universal Time (UTC) on Thursday, 1 January 1970, minus leap seconds.',
    },
    {
      question: 'How are timezones formatted?',
      answer:
        'The tool outputs UTC, your browser’s current local timezone, and the universal ISO 8601 standard format.',
    },
  ];

  const docsLinks = [
    { label: 'ISO 8601 Standard', url: 'https://en.wikipedia.org/wiki/ISO_8601' },
    { label: 'MDN Date Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <TimestampConverterTool />
    </ToolLayout>
  );
}
