import type { Metadata } from 'next';
import CapabilitiesContent from '@/components/site/pages/CapabilitiesContent';

export const metadata: Metadata = {
  title: 'Capabilities — Web, Brand, UI/UX & Content | CRUD Studio',
  description:
    'Strategy, branding, web development, UI/UX and motion content under one roof. Explore exactly what CRUD Studio delivers, how we work and the tools we trust.',
};

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}
