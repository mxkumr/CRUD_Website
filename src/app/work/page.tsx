import type { Metadata } from 'next';
import WorkContent from '@/components/site/pages/WorkContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Work — Selected Projects & Case Studies',
  description:
    'A cross-section of the brands, products and platforms CRUD Studio has designed and engineered — the thinking, the process and the measurable outcomes behind each one.',
  path: '/work',
});

export default function WorkPage() {
  return <WorkContent />;
}
