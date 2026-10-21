import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { DiffCheckerTool } from '@/components/tools/DiffCheckerTool';

export const metadata: Metadata = constructMetadata({
  title: 'Text & Code Diff Checker — DevPocket',
  description:
    'Compare two text snippets or code files side-by-side or unified. Highlights additions, deletions, and line counts with ignore whitespace and case options.',
  path: '/tools/diff-checker',
  keywords: ['diff checker', 'code diff', 'text compare', 'git diff tool', 'side by side diff'],
});

export default function DiffCheckerPage() {
  const tool = getToolBySlug('diff-checker')!;

  const faqs = [
    {
      question: 'Which diff algorithm is used?',
      answer:
        'DevPocket uses Myers diff algorithm, the same proven algorithm powering Git diff and GNU patch, providing precise line-by-line and character-level comparisons.',
    },
    {
      question: 'Can I export a unified patch format?',
      answer:
        'Yes. Click "Copy Patch" in the toolbar to copy a standard unified diff patch ready to use with patch utilities or Git.',
    },
    {
      question: 'What is the difference between side-by-side and unified views?',
      answer:
        'Side-by-side view splits the screen into original and modified panes, making changes easy to compare visually. Unified view provides a stacked, linear log optimal for mobile devices.',
    },
  ];

  const docsLinks = [
    { label: 'Myers Diff Paper', url: 'http://www.xmailserver.org/diff2.pdf' },
    { label: 'Git Diff Documentation', url: 'https://git-scm.com/docs/git-diff' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <DiffCheckerTool />
    </ToolLayout>
  );
}
