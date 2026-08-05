import type { Metadata } from 'next';
import StudioContent from '@/components/site/pages/StudioContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Studio — Our Story, Mission & Principles',
  description:
    'CRUD — Create, Refine, Unified, Designs — is a design and engineering studio pairing award-level craft with a relentless focus on growth. Meet the studio behind the work.',
  path: '/studio',
});

export default function StudioPage() {
  return <StudioContent />;
}
