import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SmoothScroll from '@/components/site/SmoothScroll';
import CustomCursor from '@/components/site/CustomCursor';
import ShowcaseHero from '@/components/showcase/ShowcaseHero';
import ShowcaseGrid from '@/components/showcase/ShowcaseGrid';
import { studio } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Industry Solutions Showcase | CRUD Studio',
  description:
    'Eight live, interactive website concepts by CRUD Studio — one per industry. Explore working desktop and mobile previews, feature sets, timelines, pricing and integrations.',
};

export default function ShowcasePage() {
  return (
    <SmoothScroll>
      <div className="crud-site min-h-screen">
        <CustomCursor />

        {/* top bar */}
        <header className="fixed inset-x-0 top-0 z-[120]">
          <div className="flex items-center justify-between border-b border-line bg-ink/60 px-5 py-4 backdrop-blur-xl md:px-10">
            <Link href="/" data-cursor="hover" className="flex items-center" aria-label="CRUD Studio — home">
              <Image src="/logo.png" alt="CRUD Studio" width={652} height={248} priority className="h-8 w-auto md:h-9" />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                data-cursor="hover"
                className="hidden font-display text-sm uppercase tracking-widest text-bone-dim transition-colors hover:text-bone sm:block"
              >
                ← Back to studio
              </Link>
              <Link
                href="/#contact"
                data-cursor="hover"
                className="rounded-full border border-line bg-bone px-5 py-2 font-display text-sm font-medium text-ink transition-colors duration-300 hover:bg-volt"
              >
                Start a project
              </Link>
            </div>
          </div>
        </header>

        <main>
          <ShowcaseHero />
          <ShowcaseGrid />
        </main>

        {/* closing CTA */}
        <footer className="relative border-t border-line px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
                <span className="h-px w-8 bg-volt" /> Don&apos;t see your industry?
              </p>
              <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-6xl">
                Let&apos;s build{' '}
                <span className="font-serif font-normal normal-case italic text-volt">yours</span>.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-bone-dim">{studio.ctaLine}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/#contact"
                data-cursor="hover"
                className="rounded-full border border-line bg-bone px-7 py-4 text-center font-display text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-volt"
              >
                Start a project →
              </Link>
              <Link
                href="/"
                data-cursor="hover"
                className="rounded-full border border-line px-7 py-4 text-center font-display text-sm font-bold uppercase tracking-widest text-bone-dim transition-colors hover:text-bone"
              >
                Back to studio
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
