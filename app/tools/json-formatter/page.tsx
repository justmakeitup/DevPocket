import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { JsonFormatterTool } from '@/components/tools/JsonFormatterTool';

export const metadata: Metadata = constructMetadata({
  title: 'JSON Formatter & Validator — DevPocket',
  description:
    'Free online JSON Formatter, beautifier, minifier, and validator. Inspect object depth, sort keys, and detect syntax errors with line/column coordinates locally in your browser.',
  path: '/tools/json-formatter',
  keywords: ['json formatter', 'pretty print json', 'minify json', 'json validator', 'json lint'],
});

export default function JsonFormatterPage() {
  const tool = getToolBySlug('json-formatter')!;

  const faqs = [
    {
      question: 'Is my JSON uploaded to a server or stored?',
      answer:
        'No. DevPocket runs JSON validation and formatting 100% locally in your browser using standard ECMAScript JSON engines. Zero payload data is transmitted over the network.',
    },
    {
      question: 'How does key sorting work?',
      answer:
        'When enabled, key sorting recursively orders all dictionary object keys alphabetically (A-Z). It never modifies array element order, numbers, or string contents.',
    },
    {
      question: 'What is the maximum JSON payload size supported?',
      answer:
        'Since parsing occurs client-side, the limit depends on your browser’s available memory. Payloads up to several megabytes process smoothly within milliseconds.',
    },
    {
      question: 'Can I download the formatted JSON?',
      answer:
        'Yes. Click the "Download" button in the output toolbar to immediately save a clean `.json` file to your computer.',
    },
  ];

  const docsLinks = [
    { label: 'MDN JSON Spec', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON' },
    { label: 'RFC 8259', url: 'https://datatracker.ietf.org/doc/html/rfc8259' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <JsonFormatterTool />
    </ToolLayout>
  );
}
