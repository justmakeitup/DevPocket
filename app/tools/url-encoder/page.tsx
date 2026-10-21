import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { UrlEncoderTool } from '@/components/tools/UrlEncoderTool';

export const metadata: Metadata = constructMetadata({
  title: 'URL Encoder & Decoder — DevPocket',
  description:
    'Free online URL encoder and decoder. Percent-encode URI components, inspect query parameters, and decode malformed URLs with live client-side validation.',
  path: '/tools/url-encoder',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'encodeURIComponent', 'query string parser'],
});

export default function UrlEncoderPage() {
  const tool = getToolBySlug('url-encoder')!;

  const faqs = [
    {
      question: 'What is the difference between encodeURIComponent and encodeURI?',
      answer:
        'encodeURIComponent escapes all reserved characters including delimiters like ?, &, =, /, and :. It is meant for query parameter values. encodeURI preserves URL structure delimiters and is intended for complete URLs.',
    },
    {
      question: 'Why does malformed percent-encoding occur?',
      answer:
        'Malformed sequences happen when a % character is not followed by two valid hexadecimal digits, or when multi-byte UTF-8 percent-sequences are truncated.',
    },
    {
      question: 'Are URLs executed or navigated to?',
      answer:
        'Never. DevPocket treats all URL inputs as plain string data and never executes, fetches, or navigates to user-provided URLs.',
    },
  ];

  const docsLinks = [
    { label: 'RFC 3986 URI Spec', url: 'https://datatracker.ietf.org/doc/html/rfc3986' },
    { label: 'MDN encodeURIComponent', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <UrlEncoderTool />
    </ToolLayout>
  );
}
