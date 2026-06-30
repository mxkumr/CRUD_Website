'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ClientScreenshot from './ClientScreenshot';
import { premiumClients, type PremiumClient } from '@/lib/site-data';

const ease = [0.22, 1, 0.36, 1] as const;

function Star({ fill }: { fill: number }) {
  return (
    <span className="relative inline-block h-3.5 w-3.5 shrink-0">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-line" aria-hidden>
        <path
          d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.35 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${Math.min(1, Math.max(0, fill)) * 100}%` }}
      >
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-volt" aria-hidden>
          <path
            d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.35 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </span>
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} fill={rating - i} />
        ))}
      </div>
      <span className="font-display text-xs font-semibold tabular-nums text-bone">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ClientCard({ client, index }: { client: PremiumClient; index: number }) {
  const [h1] = client.hues;
  const darkPreview = client.id === 'inego';

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease }}
      className="group flex h-full flex-col"
    >
      <Link
        href={client.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors duration-500 hover:border-bone-dim/40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: `radial-gradient(120% 120% at 15% 0%, ${h1}20 0%, transparent 55%)` }}
        />

        <div className="relative p-4 pb-0">
          <div className="overflow-hidden rounded-xl transition-transform duration-500 group-hover:-translate-y-1">
            <ClientScreenshot
              screenshot={client.screenshot}
              domain={client.domain}
              title={client.name}
              accent={h1}
              dark={darkPreview}
              priority={index < 2}
            />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 pt-4">
          <span className="w-fit rounded-full border border-line bg-ink/50 px-3 py-1 font-display text-[10px] uppercase tracking-widest text-bone-dim backdrop-blur-sm">
            {client.category}
          </span>

          <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-bone transition-transform duration-500 group-hover:-translate-y-0.5 md:text-2xl">
            {client.name}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bone-dim">
            {client.description}
          </p>

          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-2 font-display text-[10px] uppercase tracking-[0.25em] text-bone-dim">
              Client rating
            </p>
            <StarRating rating={client.rating} />
            <p className="mt-2 text-sm italic leading-relaxed text-bone-dim">
              “{client.praise}”
            </p>
          </div>

          <div className="mt-auto flex items-center gap-2 overflow-hidden pt-4">
            <span className="block h-px w-0 bg-volt transition-all duration-500 group-hover:w-8" />
            <span className="-translate-x-3 font-display text-[11px] uppercase tracking-widest text-volt opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              Visit {client.domain} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function PremiumClients() {
  return (
    <section id="clients" className="relative border-t border-line px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
            <span className="h-px w-8 bg-volt" /> Premium clients
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-7xl">
            Built for brands
            <br />
            <span className="font-serif font-normal normal-case italic text-volt">that lead</span>
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-bone-dim">
          Homepage snapshots of real sites we shipped. Click any card to open the live website in a
          new tab.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {premiumClients.map((client, i) => (
          <ClientCard key={client.id} client={client} index={i} />
        ))}
      </div>
    </section>
  );
}
