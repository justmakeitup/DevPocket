import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { Base64Tool } from '@/components/tools/Base64Tool';

export const metadata: Metadata = constructMetadata({
  title: 'Base64 Encoder & Decoder — DevPocket',
  description:
    'Free UTF-8 safe Base64 encoder and decoder. Encode and decode strings, emoji, and international Unicode text securely in your browser without data corruption.',
  path: '/tools/base64',
  keywords: ['base64 encoder', 'base64 decoder', 'utf-8 base64', 'btoa unicode', 'atob decode'],
});

export default function Base64Page() {
  const tool = getToolBySlug('base64')!;

  const faqs = [
    {
      question: 'Why does standard JavaScript btoa() fail on Unicode?',
      answer:
        'The legacy btoa() method only operates on Latin1 binary strings (code points 0–255). DevPocket uses modern TextEncoder to transform Unicode strings into UTF-8 byte arrays before encoding, safely supporting emoji and international text.',
    },
    {
      question: 'Can I decode arbitrary binary files?',
      answer:
        'This tool converts between Base64 and UTF-8 formatted text. If the Base64 represents raw arbitrary binary bytes (such as JPEG images or compiled binaries) that are not valid UTF-8, the decoder will warn you.',
    },
    {
      question: 'Is padding with "=" mandatory?',
      answer:
        'Yes. Standard RFC 4648 Base64 requires padding to align the output to multiples of 4 characters.',
    },
  ];

  const docsLinks = [
    { label: 'RFC 4648 Specification', url: 'https://datatracker.ietf.org/doc/html/rfc4648' },
    { label: 'MDN Base64 Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <Base64Tool />
    </ToolLayout>
  );
}
