import type { Metadata } from 'next';
import ContactContent from '@/components/site/pages/ContactContent';

export const metadata: Metadata = {
  title: 'Contact - Start a Project | CRUD Studio',
  description:
    'Tell us where you want to go and we will map the fastest, most beautiful way to get there. Every inquiry gets a reply from a senior team member within one business day.',
};

export default function ContactPage() {
  return <ContactContent />;
}
