import type { Metadata } from 'next';
import StudioContent from '@/components/site/pages/StudioContent';

export const metadata: Metadata = {
  title: 'Studio - Our Story, Mission & Principles | CRUD Studio',
  description:
    'CRUD - Create, Refine, Unified, Designs - is a design and engineering studio pairing award-level craft with a relentless focus on growth. Meet the studio behind the work.',
};

export default function StudioPage() {
  return <StudioContent />;
}
