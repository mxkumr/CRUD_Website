import type { Metadata } from 'next';
import ContactContent from '@/components/site/pages/ContactContent';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact — Start a Project',
  description:
    'Tell us where you want to go and we will map the fastest, most beautiful way to get there. Every inquiry gets a reply from a senior team member within one business day.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactContent />;
}
