import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { UuidGeneratorTool } from '@/components/tools/UuidGeneratorTool';

export const metadata: Metadata = constructMetadata({
  title: 'UUID / GUID Generator (v4 Cryptographic) — DevPocket',
  description:
    'Bulk generate cryptographically secure RFC 4122 Version 4 UUIDs using browser Web Cryptography API. Download as TXT or JSON with custom formatting options.',
  path: '/tools/uuid-generator',
  keywords: ['uuid generator', 'guid generator', 'uuid v4', 'cryptographic uuid', 'bulk uuid generator'],
});

export default function UuidGeneratorPage() {
  const tool = getToolBySlug('uuid-generator')!;

  const faqs = [
    {
      question: 'Are these UUIDs cryptographically secure?',
      answer:
        'Yes. DevPocket uses window.crypto.randomUUID() and crypto.getRandomValues(), seeded by hardware entropy. We never use pseudo-random Math.random().',
    },
    {
      question: 'What is a Version 4 UUID?',
      answer:
        'An RFC 4122 UUID v4 is a 128-bit identifier generated using random bytes, with 6 fixed bits indicating the version (4) and variant (RFC 4122). The collision probability is negligible.',
    },
    {
      question: 'Can I generate UUIDs without hyphens or in uppercase?',
      answer:
        'Yes. Toggle the "Uppercase" and "Include Hyphens" options in the toolbar before generating or copying your batch.',
    },
  ];

  const docsLinks = [
    { label: 'RFC 4122 Specification', url: 'https://datatracker.ietf.org/doc/html/rfc4122' },
    { label: 'Web Crypto API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <UuidGeneratorTool />
    </ToolLayout>
  );
}
