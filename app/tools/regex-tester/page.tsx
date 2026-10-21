import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { RegexTesterTool } from '@/components/tools/RegexTesterTool';

export const metadata: Metadata = constructMetadata({
  title: 'Regular Expression Tester — DevPocket',
  description:
    'Test JavaScript regular expressions with real-time match highlighting, captured group inspection, safety limits, and common developer pattern presets.',
  path: '/tools/regex-tester',
  keywords: ['regex tester', 'regular expression tester', 'regex match', 'javascript regex', 'capture groups'],
});

export default function RegexTesterPage() {
  const tool = getToolBySlug('regex-tester')!;

  const faqs = [
    {
      question: 'Which regular expression engine is used?',
      answer:
        'DevPocket executes JavaScript ECMAScript standard RegExp. Note that some syntax from PCRE or Python (such as possessive quantifiers or recursion) is not supported in native JS.',
    },
    {
      question: 'How does DevPocket protect against catastrophic backtracking (ReDoS)?',
      answer:
        'We enforce strict execution loops, limit maximum match counts to 250, and truncate test strings to safe lengths to prevent thread lockups.',
    },
    {
      question: 'What do the flags (g, i, m, s, u) mean?',
      answer:
        'g enables global search for all matches; i enables case-insensitivity; m allows ^ and $ to match start/end of each line; s allows dot (.) to match newlines; u enables full Unicode code-point matching.',
    },
  ];

  const docsLinks = [
    { label: 'MDN Regular Expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions' },
    { label: 'ECMAScript RegExp Spec', url: 'https://tc39.es/ecma262/#sec-regexp-regular-expression-objects' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <RegexTesterTool />
    </ToolLayout>
  );
}
