'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import SitePreview from './SitePreview';
import { industries, type Industry } from '@/lib/showcase-data';

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.06 * i, ease },
  }),
};

function Check({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path d="M5 13l4 4L19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   Card — a "mini product" tile with Vision Pro-style depth:
   pointer-tracked tilt, a specular glare that follows the
   cursor, and a glassy floating surface.
   ============================================================ */
function IndustryCard({
  industry,
  index,
  onOpen,
}: {
  industry: Industry;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hue, hue2] = industry.hues;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 22 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, ${hue}26, transparent 45%)`,
  );

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      custom={index}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      style={{ perspective: 1200 }}
    >
      <motion.button
        ref={ref}
        data-cursor="view"
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={onOpen}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileTap={{ scale: 0.985 }}
        className="group relative block h-full w-full overflow-hidden rounded-[1.6rem] border border-line bg-ink-soft/70 p-6 text-left backdrop-blur-xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/40 md:p-8"
      >
        {/* tinted wash */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120% 120% at 0% 0%, ${hue}1f 0%, transparent 45%), radial-gradient(120% 120% at 100% 100%, ${hue2}1a 0%, transparent 50%)`,
          }}
        />
        {/* oversized glyph */}
        <span
          aria-hidden
          className="absolute -bottom-10 -right-4 select-none font-display text-[10rem] font-bold leading-none opacity-[0.06] transition-all duration-700 group-hover:-translate-y-3 group-hover:opacity-[0.12]"
          style={{ color: hue }}
        >
          {industry.glyph}
        </span>
        {/* specular glare */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />

        <div className="relative" style={{ transform: 'translateZ(40px)' }}>
          {/* top row */}
          <div className="flex items-start justify-between">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-2xl shadow-lg backdrop-blur-md"
              style={{ background: `${hue}1f`, color: hue, boxShadow: `0 8px 24px -12px ${hue}80` }}
            >
              {industry.glyph}
            </span>
            <span className="font-display text-xs tracking-widest text-bone-dim">
              {industry.number}
            </span>
          </div>

          <p className="mt-6 font-display text-[11px] uppercase tracking-[0.25em]" style={{ color: hue }}>
            {industry.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-bone md:text-[1.7rem]">
            {industry.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-dim">{industry.tagline}</p>

          {/* meta chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/40 px-3 py-1.5 font-display text-[11px] text-bone-dim backdrop-blur-sm">
              <span className="text-bone">◷</span> {industry.timelineLabel}
            </span>
            {industry.liveHref && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[11px] font-semibold"
                style={{ background: `${hue}1f`, color: hue }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full" style={{ background: hue }} />
                  <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: hue }} />
                </span>
                Live demo
              </span>
            )}
          </div>

          {/* open affordance */}
          <div className="mt-6 flex items-center gap-2 overflow-hidden">
            <span className="h-px w-0 transition-all duration-500 group-hover:w-10" style={{ background: hue }} />
            <span
              className="-translate-x-4 font-display text-xs uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
              style={{ color: hue }}
            >
              Open interactive preview →
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ============================================================
   Detail — the expanded "spatial window". Glass panel with a
   gentle pointer tilt, live preview on the left and the
   product details (features, timeline, pricing, integrations)
   on the right.
   ============================================================ */
function IndustryDetail({ industry, onClose }: { industry: Industry; onClose: () => void }) {
  const [hue, hue2] = industry.hues;
  const totalWeeks = industry.timeline.reduce((sum, p) => sum + p.weeks, 0);

  const panelRef = useRef<HTMLDivElement>(null);
  const tx = useMotionValue(0.5);
  const ty = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(ty, [0, 1], [1.6, -1.6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(tx, [0, 1], [-1.6, 1.6]), { stiffness: 120, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    tx.set((e.clientX - rect.left) / rect.width);
    ty.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink/70 backdrop-blur-2xl"
        onClick={onClose}
        aria-hidden
      />

      {/* spatial window */}
      <motion.div
        ref={panelRef}
        onMouseMove={onMove}
        role="dialog"
        aria-modal="true"
        aria-label={`${industry.name} preview`}
        style={{ rotateX, rotateY, transformPerspective: 1600 }}
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border border-white/15 shadow-2xl shadow-black/60"
      >
        {/* glass material */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(100% 80% at 0% 0%, ${hue}1f, transparent 55%), radial-gradient(100% 80% at 100% 100%, ${hue2}1a, transparent 55%), rgba(18,18,16,0.92)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 backdrop-blur-2xl" />

        {/* header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-xl"
              style={{ background: `${hue}1f`, color: hue, boxShadow: `0 8px 24px -12px ${hue}80` }}
            >
              {industry.glyph}
            </span>
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.25em]" style={{ color: hue }}>
                {industry.category} · Concept by CRUD
              </p>
              <h2 className="font-display text-lg font-bold tracking-tight text-bone sm:text-xl">
                {industry.name}
              </h2>
            </div>
          </div>
          <button
            data-cursor="hover"
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-bone-dim transition-colors hover:border-white/40 hover:text-bone"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1.12fr_0.88fr] lg:overflow-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15">
          {/* live preview */}
          <div className="flex min-h-0 flex-col gap-3 p-4 sm:p-5 lg:h-full">
            <div className="h-[360px] sm:h-[440px] lg:h-full lg:min-h-0">
              <SitePreview site={industry.site} />
            </div>
            {industry.liveHref && (
              <Link
                href={industry.liveHref}
                data-cursor="hover"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.02]"
                style={{ background: hue }}
              >
                Open the full live demo →
              </Link>
            )}
          </div>

          {/* details */}
          <div className="min-h-0 border-t border-white/10 px-5 py-6 sm:px-7 lg:border-l lg:border-t-0 lg:overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15">
            <p className="text-sm leading-relaxed text-bone-dim">{industry.description}</p>

            {/* features */}
            <h3 className="mt-7 font-display text-[11px] uppercase tracking-[0.25em] text-bone-dim">
              Feature highlights
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
              {industry.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-bone">
                  <Check color={hue} />
                  {f}
                </li>
              ))}
            </ul>

            {/* timeline */}
            <div className="mt-7 flex items-center justify-between">
              <h3 className="font-display text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                Estimated timeline
              </h3>
              <span className="font-display text-sm font-bold text-bone">{industry.timelineLabel}</span>
            </div>
            <div className="mt-3 flex gap-1 overflow-hidden rounded-full">
              {industry.timeline.map((p, i) => (
                <div
                  key={p.label}
                  className="h-2 rounded-full"
                  style={{
                    flex: p.weeks,
                    background: hue,
                    opacity: 1 - i * 0.18,
                  }}
                  title={`${p.label} · ${p.weeks}w`}
                />
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {industry.timeline.map((p) => (
                <div key={p.label} className="flex items-baseline justify-between gap-3 text-[12px]">
                  <span className="font-display font-semibold text-bone">{p.label}</span>
                  <span className="flex-1 truncate text-bone-dim">{p.detail}</span>
                  <span className="shrink-0 text-bone-dim">{p.weeks}w</span>
                </div>
              ))}
            </div>

            {/* integrations */}
            <h3 className="mt-7 font-display text-[11px] uppercase tracking-[0.25em] text-bone-dim">
              Industry integrations
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {industry.integrations.map((it) => (
                <span
                  key={it}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/40 px-3 py-1.5 text-[12px] text-bone-dim"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: hue }} />
                  {it}
                </span>
              ))}
            </div>

            {/* cta */}
            <Link
              href="/#contact"
              data-cursor="hover"
              className="mt-8 flex items-center justify-center gap-2 rounded-full border border-white/15 bg-bone px-5 py-3.5 font-display text-sm font-bold text-ink transition-colors hover:bg-volt"
            >
              Build this for my business →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Grid
   ============================================================ */
export default function ShowcaseGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = industries.find((i) => i.id === activeId) ?? null;

  return (
    <section id="industries" className="relative px-5 pb-28 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
        {industries.map((industry, i) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            index={i}
            onOpen={() => setActiveId(industry.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && <IndustryDetail industry={active} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </section>
  );
}
