import type { Metadata } from 'next';
import WorkContent from '@/components/site/pages/WorkContent';

export const metadata: Metadata = {
  title: 'Work - Selected Projects & Case Studies | CRUD Studio',
  description:
    'A cross-section of the brands, products and platforms CRUD Studio has designed and engineered - the thinking, the process and the measurable outcomes behind each one.',
};

export default function WorkPage() {
  return <WorkContent />;
}
