import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Page not found',
  description: 'This page does not exist. Head back to CRUD Studio to explore our work, showcase and capabilities.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="crud-site flex min-h-svh flex-col items-center justify-center bg-ink px-5 text-center text-bone">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-volt">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-bone-dim">
        The page you are looking for does not exist or has moved. Let&apos;s get you back to the studio.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-volt px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink"
        >
          Back home
        </Link>
        <Link
          href="/showcase"
          className="rounded-full border border-line px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bone"
        >
          View showcase
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bone"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
