import type { Metadata } from 'next';
import CapabilitiesContent from '@/components/site/pages/CapabilitiesContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Capabilities — Web, Brand, UI/UX & Content',
  description:
    'Strategy, branding, web development, UI/UX, forward deployment engineering, AI automation and motion content under one roof. Explore exactly what CRUD Studio delivers.',
  path: '/capabilities',
});

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}
