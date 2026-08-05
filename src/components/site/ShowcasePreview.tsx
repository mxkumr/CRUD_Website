'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MiniPreview from '@/components/showcase/MiniPreview';
import { industries } from '@/lib/showcase-data';

const ease = [0.22, 1, 0.36, 1] as const;

function ShowcaseCard({ industry, index }: { industry: (typeof industries)[number]; index: number }) {
  const [h1] = industry.hues;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease }}
    >
      <Link
        href={industry.liveHref ?? '/showcase'}
        data-cursor="view"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors duration-500 hover:border-bone-dim/40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(120% 120% at 15% 0%, ${h1}18 0%, transparent 55%)` }}
        />

        <div className="relative p-4 pb-0">
          <div className="pointer-events-none overflow-hidden rounded-xl shadow-lg shadow-black/25 transition-transform duration-500 group-hover:-translate-y-1">
            <MiniPreview industryId={industry.id} compact />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs tracking-[0.3em]" style={{ color: h1 }}>
              {industry.number}
            </span>
            <span className="rounded-full border border-line bg-ink/50 px-3 py-1 font-display text-[10px] uppercase tracking-widest text-bone-dim backdrop-blur-sm">
              {industry.category}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-bone transition-transform duration-500 group-hover:-translate-y-0.5 md:text-2xl">
            {industry.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bone-dim">{industry.tagline}</p>
          <div className="mt-auto flex items-center gap-2 overflow-hidden pt-4">
            <span className="block h-px w-0 bg-volt transition-all duration-500 group-hover:w-8" />
            <span className="-translate-x-3 font-display text-[11px] uppercase tracking-widest text-volt opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              Explore concept →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ShowcasePreview() {
  const featured = industries.slice(0, 6);
  return (
    <section id="showcase" className="relative border-t border-line px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
            <span className="h-px w-8 bg-volt" /> Industry solutions
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-7xl">
            See your site
            <br />
            <span className="font-serif font-normal normal-case italic text-volt">before</span> we build it
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-base leading-relaxed text-bone-dim">
            Live, interactive website concepts - one per industry. Click through working desktop and
            mobile previews, feature sets, timelines and pricing.
          </p>
          <Link
            href="/showcase"
            data-cursor="hover"
            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-widest text-bone backdrop-blur-sm transition-colors hover:border-volt hover:text-volt"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-volt" />
            </span>
            View all 9 concepts
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((industry, i) => (
          <ShowcaseCard key={industry.id} industry={industry} index={i} />
        ))}
      </div>
    </section>
  );
}
