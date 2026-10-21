import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ColorToolsTool } from '@/components/tools/ColorToolsTool';

export const metadata: Metadata = constructMetadata({
  title: 'Color Converter & WCAG Contrast Checker — DevPocket',
  description:
    'Convert HEX, RGB, HSL, and HSV colors. Generate harmonic complementary and triadic palettes, and verify WCAG 2.2 AA/AAA contrast ratios for accessible web design.',
  path: '/tools/color-tools',
  keywords: ['color converter', 'wcag contrast checker', 'hex to rgb', 'hsl converter', 'color palette generator'],
});

export default function ColorToolsPage() {
  const tool = getToolBySlug('color-tools')!;

  const faqs = [
    {
      question: 'How is WCAG 2.2 contrast ratio calculated?',
      answer:
        'Contrast ratio is calculated using relative luminance: (L1 + 0.05) / (L2 + 0.05), where sRGB values are linearized per W3C specification.',
    },
    {
      question: 'What are the WCAG AA and AAA thresholds?',
      answer:
        'For normal body text (under 18pt or 14pt bold), Level AA requires at least 4.5:1 and Level AAA requires 7.0:1. For large text (at least 18pt or 14pt bold), Level AA requires 3.0:1 and Level AAA requires 4.5:1.',
    },
    {
      question: 'Can I export generated palettes?',
      answer:
        'Yes. Click "Export JSON" to download the complete color data including HEX, RGB, HSL, HSV, and contrast ratings in standard JSON format.',
    },
  ];

  const docsLinks = [
    { label: 'W3C WCAG 2.2 Contrast Standards', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html' },
    { label: 'MDN CSS Color Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value' },
  ];

  return (
    <ToolLayout tool={tool} faqs={faqs} docsLinks={docsLinks}>
      <ColorToolsTool />
    </ToolLayout>
  );
}
