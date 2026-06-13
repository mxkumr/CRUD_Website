'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Industry } from '@/lib/showcase-data';

/* ============================================================
   DemoSite — a full, standalone, themed landing page built
   for a single industry. Same idea as the MediNova demo, but
   data-driven so every showcase card has its own live page.
   Light theme by default; dark for SaaS & Marketing.
   ============================================================ */

const ease = [0.22, 1, 0.36, 1] as const;
const LIGHT_ACCENTS = new Set(['#D9FF3F', '#A3E635', '#F59E0B']);

type Tokens = {
  page: string;
  surface: string;
  surface2: string;
  text: string;
  sub: string;
  border: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  isDark: boolean;
};

function makeTokens(industry: Industry): Tokens {
  const accent = industry.site.accent;
  const accentText = LIGHT_ACCENTS.has(accent) ? '#0B0B12' : '#FFFFFF';
  if (industry.site.theme === 'dark') {
    return {
      page: '#08080C',
      surface: 'rgba(255,255,255,0.045)',
      surface2: 'rgba(255,255,255,0.025)',
      text: '#F5F5F7',
      sub: '#9A9AA6',
      border: 'rgba(255,255,255,0.10)',
      accent,
      accentText,
      accentSoft: `${accent}22`,
      isDark: true,
    };
  }
  return {
    page: '#F7F7F4',
    surface: '#FFFFFF',
    surface2: '#F0F0EC',
    text: '#14141A',
    sub: '#5C5C66',
    border: 'rgba(0,0,0,0.08)',
    accent,
    accentText,
    accentSoft: `${accent}14`,
    isDark: false,
  };
}

function gradientFor(seed: number, accent: string, isDark: boolean): string {
  const dark = [
    ['#1f2937', '#0f172a'],
    ['#3b3b4f', '#1f1f2e'],
    ['#2d3a3a', '#16201f'],
    ['#3a2d2d', '#201616'],
  ];
  const light = [
    ['#e7ecf3', '#d4dde9'],
    ['#efe7f3', '#e2d4e9'],
    ['#e7f3ee', '#d4e9df'],
    ['#f3ece7', '#e9ddd4'],
  ];
  const [a, b] = (isDark ? dark : light)[seed % 4];
  return `radial-gradient(120% 120% at 20% 15%, ${accent}55 0%, transparent 55%), linear-gradient(150deg, ${a}, ${b})`;
}

/* --- shared atoms ------------------------------------------------------- */

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, t }: { children: ReactNode; t: Tokens }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ background: t.accentSoft, color: t.accent }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
      {children}
    </span>
  );
}

function PrimaryBtn({ children, href, t }: { children: ReactNode; href: string; t: Tokens }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-sm font-bold transition-transform hover:scale-[1.03]"
      style={{ background: t.accent, color: t.accentText }}
    >
      {children}
    </a>
  );
}

function GhostBtn({ children, href, t }: { children: ReactNode; href: string; t: Tokens }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 font-display text-sm font-bold transition-colors"
      style={{ borderColor: t.border, color: t.text }}
    >
      {children}
    </a>
  );
}

function SectionHead({ eyebrow, title, sub, t, center }: { eyebrow: string; title: string; sub?: string; t: Tokens; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <Eyebrow t={t}>{eyebrow}</Eyebrow>
      <h2
        className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl"
        style={{ color: t.text }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-relaxed md:text-lg" style={{ color: t.sub }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Card({ children, t, className = '', style }: { children: ReactNode; t: Tokens; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ background: t.surface, border: `1px solid ${t.border}`, ...style }}
    >
      {children}
    </div>
  );
}

/* --- header ------------------------------------------------------------- */

function Header({ industry, t }: { industry: Industry; t: Tokens }) {
  const [open, setOpen] = useState(false);
  const { site } = industry;
  const targets = ['#why', '#showcase', '#process', '#contact'];

  return (
    <>
      {/* concept banner */}
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 bg-[#0B0B12] px-4 py-1.5">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: t.accent }}>
          Concept demo by CRUD Studio
        </p>
        <Link
          href="/showcase"
          className="rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 transition-colors hover:text-white"
          style={{ borderColor: `${t.accent}66` }}
        >
          ← All demos
        </Link>
      </div>

      <header
        className="fixed inset-x-0 top-7 z-[50] backdrop-blur-xl"
        style={{ background: `${t.page}CC`, borderBottom: `1px solid ${t.border}` }}
      >
        <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-lg font-bold"
              style={{ background: t.accent, color: t.accentText }}
            >
              {site.brand.charAt(0)}
            </span>
            <span className="font-display text-lg font-bold tracking-tight" style={{ color: t.text }}>
              {site.brand}
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {site.nav.map((n, i) => (
              <a key={n} href={targets[i] ?? '#'} className="text-[13px] font-semibold transition-colors" style={{ color: t.sub }}>
                {n}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <PrimaryBtn href="#contact" t={t}>
              {site.hero.cta}
            </PrimaryBtn>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
              style={{ borderColor: t.border }}
            >
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: t.text }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: t.text }} />
            </button>
          </div>
        </div>

        {open && (
          <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
            {site.nav.map((n, i) => (
              <a
                key={n}
                href={targets[i] ?? '#'}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold"
                style={{ background: t.surface2, color: t.text }}
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

/* --- hero --------------------------------------------------------------- */

function Hero({ industry, t }: { industry: Industry; t: Tokens }) {
  const { site } = industry;
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: `${t.accent}2e` }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Eyebrow t={t}>{site.hero.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl"
            style={{ color: t.text }}
          >
            {site.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: t.sub }}
          >
            {site.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <PrimaryBtn href="#contact" t={t}>
              {site.hero.cta} →
            </PrimaryBtn>
            {site.hero.secondary && (
              <GhostBtn href="#showcase" t={t}>
                {site.hero.secondary}
              </GhostBtn>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <HeroVisual industry={industry} t={t} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual({ industry, t }: { industry: Industry; t: Tokens }) {
  const { site } = industry;
  const item = site.items[0];

  switch (site.layout) {
    case 'booking':
      return (
        <Card t={t} className="p-6 shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-bold" style={{ color: t.text }}>
              Book an appointment
            </span>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: t.accentSoft, color: t.accent }}>
              Live slots
            </span>
          </div>
          {['Speciality', 'Preferred date', 'Doctor'].map((f) => (
            <div key={f} className="mt-3 flex items-center justify-between rounded-xl px-4 py-3 text-sm" style={{ background: t.surface2, color: t.sub }}>
              {f} <span style={{ color: t.text }}>▾</span>
            </div>
          ))}
          <div className="mt-4 rounded-xl py-3 text-center text-sm font-bold" style={{ background: t.accent, color: t.accentText }}>
            Confirm booking
          </div>
        </Card>
      );
    case 'dashboard':
      return (
        <Card t={t} className="p-6 shadow-2xl shadow-black/30">
          <div className="mb-4 flex gap-1.5">
            {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
              <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {site.items.slice(0, 3).map((it) => (
              <div key={it.title} className="rounded-xl px-3 py-3" style={{ background: t.surface2 }}>
                <div className="font-display text-lg font-bold" style={{ color: t.accent }}>
                  {it.meta}
                </div>
                <div className="mt-1 text-[11px] leading-tight" style={{ color: t.sub }}>
                  {it.title}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-28 items-end gap-1.5 rounded-xl p-3" style={{ background: t.surface2 }}>
            {[40, 65, 50, 80, 60, 95, 72, 88].map((h, i) => (
              <span key={i} className="flex-1 rounded-md" style={{ height: `${h}%`, background: i === 5 ? t.accent : `${t.accent}55` }} />
            ))}
          </div>
        </Card>
      );
    case 'listings':
    case 'menu':
      return (
        <Card t={t} className="overflow-hidden p-0 shadow-2xl shadow-black/10">
          <div className="relative h-52" style={{ backgroundImage: gradientFor(site.layout === 'menu' ? 3 : 0, t.accent, t.isDark) }}>
            <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-bold" style={{ background: t.accent, color: t.accentText }}>
              {item.meta}
            </span>
          </div>
          <div className="p-5">
            <div className="font-display text-lg font-bold" style={{ color: t.text }}>
              {item.title}
            </div>
            <div className="mt-1 text-sm" style={{ color: t.sub }}>
              {item.sub}
            </div>
            <div className="mt-4 rounded-xl py-3 text-center text-sm font-bold" style={{ background: t.accent, color: t.accentText }}>
              {site.layout === 'menu' ? 'Add to order' : 'Book a site visit'}
            </div>
          </div>
        </Card>
      );
    case 'jobs':
      return (
        <Card t={t} className="p-6 shadow-2xl shadow-black/10">
          <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm" style={{ background: t.surface2, color: t.sub }}>
            <span>⌕</span> Search 24,000+ roles
          </div>
          <div className="mt-4 rounded-xl p-4" style={{ background: t.surface2 }}>
            <div className="font-display text-base font-bold" style={{ color: t.text }}>
              {item.title}
            </div>
            <div className="mt-1 text-sm" style={{ color: t.sub }}>
              {item.sub}
            </div>
            <div className="mt-4 inline-block rounded-lg px-4 py-2 text-sm font-bold" style={{ background: t.accent, color: t.accentText }}>
              Apply in 1 click
            </div>
          </div>
        </Card>
      );
    case 'campus':
      return (
        <Card t={t} className="p-6 shadow-2xl shadow-black/10">
          <div className="h-32 rounded-xl" style={{ backgroundImage: gradientFor(2, t.accent, t.isDark) }} />
          <div className="mt-4 font-display text-base font-bold" style={{ color: t.text }}>
            Admissions open · 2026
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full" style={{ background: t.surface2 }}>
            <div className="h-full w-3/4 rounded-full" style={{ background: t.accent }} />
          </div>
          <div className="mt-2 text-sm" style={{ color: t.sub }}>
            74% seats filled — apply before June 30.
          </div>
        </Card>
      );
    case 'projects':
      return (
        <Card t={t} className="overflow-hidden p-0 shadow-2xl shadow-black/10">
          <div className="relative h-56" style={{ backgroundImage: gradientFor(0, t.accent, t.isDark) }}>
            <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold" style={{ background: t.accent, color: t.accentText }}>
              On-time delivery
            </span>
          </div>
          <div className="p-5">
            <div className="font-display text-lg font-bold" style={{ color: t.text }}>
              {item.title}
            </div>
            <div className="mt-1 text-sm" style={{ color: t.sub }}>
              {item.sub} · {item.meta}
            </div>
          </div>
        </Card>
      );
    case 'agency':
      return (
        <Card t={t} className="p-8 text-center shadow-2xl shadow-black/30">
          <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: t.sub }}>
            Avg client result
          </div>
          <div className="mt-2 font-display text-7xl font-bold leading-none" style={{ color: t.accent }}>
            +212%
          </div>
          <div className="mt-2 text-sm" style={{ color: t.sub }}>
            qualified leads in 90 days
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {site.stats?.map((s) => (
              <div key={s.label} className="rounded-xl py-3" style={{ background: t.surface2 }}>
                <div className="font-display text-lg font-bold" style={{ color: t.text }}>
                  {s.value}
                </div>
                <div className="text-[9px] uppercase tracking-wider" style={{ color: t.sub }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      );
    default:
      return null;
  }
}

/* --- value props -------------------------------------------------------- */

function ValueSection({ industry, t }: { industry: Industry; t: Tokens }) {
  return (
    <section id="why" className="px-5 py-20 md:px-10 md:py-28" style={{ borderTop: `1px solid ${t.border}` }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead eyebrow={`Why ${industry.site.brand}`} title={industry.page.intro} t={t} />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {industry.page.valueProps.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <Card t={t} className="h-full p-7">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold"
                  style={{ background: t.accentSoft, color: t.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold" style={{ color: t.text }}>
                  {v.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: t.sub }}>
                  {v.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- stats -------------------------------------------------------------- */

function StatsBand({ industry, t }: { industry: Industry; t: Tokens }) {
  if (!industry.site.stats) return null;
  return (
    <section className="px-5 md:px-10">
      <Reveal>
        <div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-3xl sm:grid-cols-3"
          style={{ background: t.border, border: `1px solid ${t.border}` }}
        >
          {industry.site.stats.map((s) => (
            <div key={s.label} className="px-6 py-10 text-center" style={{ background: t.page }}>
              <div className="font-display text-4xl font-bold md:text-5xl" style={{ color: t.accent }}>
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest" style={{ color: t.sub }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --- layout-specific showcase ------------------------------------------ */

function Showcase({ industry, t }: { industry: Industry; t: Tokens }) {
  const { site, page } = industry;
  const items = site.items;

  let body: ReactNode = null;

  switch (site.layout) {
    case 'booking':
      body = (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <Card t={t} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-full" style={{ background: t.accentSoft }} />
                  <div>
                    <div className="font-display text-base font-bold" style={{ color: t.text }}>
                      {it.title}
                    </div>
                    <div className="text-sm" style={{ color: t.sub }}>
                      {it.sub}
                    </div>
                  </div>
                </div>
                <span className="rounded-lg px-3 py-2 text-sm font-bold" style={{ background: t.accentSoft, color: t.accent }}>
                  Book {it.meta}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      );
      break;

    case 'dashboard':
      body = (
        <div className="grid gap-4 md:grid-cols-3">
          {site.stats?.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <Card t={t} className="h-full p-7" style={i === 1 ? { borderColor: t.accent, borderWidth: 2 } : undefined}>
                <div className="text-xs uppercase tracking-widest" style={{ color: t.sub }}>
                  {s.label}
                </div>
                <div className="mt-2 font-display text-4xl font-bold" style={{ color: t.text }}>
                  {s.value}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {industry.features.slice(i * 2, i * 2 + 2).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: t.sub }}>
                      <span style={{ color: t.accent }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-6 rounded-xl py-3 text-center text-sm font-bold"
                  style={i === 1 ? { background: t.accent, color: t.accentText } : { background: t.surface2, color: t.text }}
                >
                  Choose plan
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      );
      break;

    case 'campus':
      body = (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <Card t={t} className="h-full p-6">
                <div className="font-display text-lg font-bold" style={{ color: t.text }}>
                  {it.title}
                </div>
                <div className="mt-1 text-sm" style={{ color: t.sub }}>
                  {it.sub}
                </div>
                <div className="mt-4 inline-block rounded-lg px-3 py-1 text-xs font-semibold" style={{ background: t.accentSoft, color: t.accent }}>
                  {it.meta}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      );
      break;

    case 'projects':
      body = (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.border}` }}>
                <div className="h-44" style={{ backgroundImage: gradientFor(i, t.accent, t.isDark) }} />
                <div className="flex items-center justify-between p-5" style={{ background: t.surface }}>
                  <div>
                    <div className="font-display text-lg font-bold" style={{ color: t.text }}>
                      {it.title}
                    </div>
                    <div className="text-sm" style={{ color: t.sub }}>
                      {it.sub}
                    </div>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: t.accent }}>
                    {it.meta}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      );
      break;

    case 'listings':
      body = (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.border}` }}>
                <div className="relative h-32" style={{ backgroundImage: gradientFor(i + 1, t.accent, t.isDark) }}>
                  <span className="absolute right-3 top-3 rounded-lg px-2.5 py-1 text-sm font-bold" style={{ background: t.accent, color: t.accentText }}>
                    {it.meta}
                  </span>
                </div>
                <div className="p-4" style={{ background: t.surface }}>
                  <div className="font-display text-sm font-bold leading-tight" style={{ color: t.text }}>
                    {it.title}
                  </div>
                  <div className="mt-1 text-xs" style={{ color: t.sub }}>
                    {it.sub}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      );
      break;

    case 'jobs':
      body = (
        <Card t={t} className="overflow-hidden p-0">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div
                className="flex items-center justify-between gap-4 px-6 py-5"
                style={{ borderTop: i ? `1px solid ${t.border}` : undefined }}
              >
                <div>
                  <div className="font-display text-base font-bold" style={{ color: t.text }}>
                    {it.title}
                  </div>
                  <div className="text-sm" style={{ color: t.sub }}>
                    {it.sub}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden rounded-lg px-3 py-1.5 text-xs font-bold sm:inline" style={{ background: t.accentSoft, color: t.accent }}>
                    {it.meta}
                  </span>
                  <span className="rounded-lg px-4 py-2 text-sm font-bold" style={{ background: t.accent, color: t.accentText }}>
                    Apply
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </Card>
      );
      break;

    case 'menu':
      body = (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <Card t={t} className="flex items-center gap-4 p-4">
                <span className="h-20 w-20 shrink-0 rounded-xl" style={{ backgroundImage: gradientFor(i, t.accent, t.isDark) }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-base font-bold" style={{ color: t.text }}>
                      {it.title}
                    </div>
                    <span className="font-display text-base font-bold" style={{ color: t.accent }}>
                      {it.meta}
                    </span>
                  </div>
                  <div className="mt-1 text-sm" style={{ color: t.sub }}>
                    {it.sub}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      );
      break;

    case 'agency':
      body = (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <Card t={t} className="group h-full p-7">
                <span className="font-display text-2xl font-bold" style={{ color: t.accent }}>
                  →
                </span>
                <h3 className="mt-3 font-display text-xl font-bold" style={{ color: t.text }}>
                  {it.title}
                </h3>
                <p className="mt-1.5 text-sm" style={{ color: t.sub }}>
                  {it.sub}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      );
      break;
  }

  return (
    <section id="showcase" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead eyebrow="Showcase" title={page.showcase.title} sub={page.showcase.subtitle} t={t} />
        </Reveal>
        {body}
      </div>
    </section>
  );
}

/* --- process (from timeline) ------------------------------------------- */

function Process({ industry, t }: { industry: Industry; t: Tokens }) {
  return (
    <section id="process" className="px-5 py-20 md:px-10 md:py-28" style={{ background: t.surface2 }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead eyebrow={`Launch in ${industry.timelineLabel}`} title="How we build it" t={t} center />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-4">
          {industry.timeline.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <Card t={t} className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold" style={{ color: t.accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: t.sub }}>
                    {p.weeks}w
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold" style={{ color: t.text }}>
                  {p.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: t.sub }}>
                  {p.detail}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* integrations */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: t.sub }}>
              Works with your stack
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {industry.integrations.map((it) => (
                <span
                  key={it}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.text }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
                  {it}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- testimonial -------------------------------------------------------- */

function Testimonial({ industry, t }: { industry: Industry; t: Tokens }) {
  const { quote, name, role } = industry.page.testimonial;
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-serif text-6xl leading-none" style={{ color: t.accent }}>
            “
          </span>
          <p className="-mt-4 font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl" style={{ color: t.text }}>
            {quote}
          </p>
          <div className="mt-8">
            <div className="font-display text-base font-bold" style={{ color: t.text }}>
              {name}
            </div>
            <div className="text-sm" style={{ color: t.sub }}>
              {role}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --- closing CTA + footer ---------------------------------------------- */

function Closing({ industry, t }: { industry: Industry; t: Tokens }) {
  const { site, page } = industry;
  return (
    <section id="contact" className="px-5 pb-10 pt-4 md:px-10">
      <Reveal>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-24"
          style={{ background: t.accent }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl" style={{ color: t.accentText }}>
            {page.closing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg" style={{ color: t.accentText, opacity: 0.82 }}>
            {page.closing.sub}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <span
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-display text-sm font-bold"
              style={{ background: t.accentText, color: t.accent }}
            >
              {site.hero.cta} →
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ industry, t }: { industry: Industry; t: Tokens }) {
  const { site } = industry;
  return (
    <footer className="px-5 py-12 md:px-10" style={{ borderTop: `1px solid ${t.border}` }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-base font-bold" style={{ background: t.accent, color: t.accentText }}>
            {site.brand.charAt(0)}
          </span>
          <span className="font-display text-base font-bold" style={{ color: t.text }}>
            {site.brand}
          </span>
          <span className="text-sm" style={{ color: t.sub }}>
            · {site.domain}
          </span>
        </div>
        <p className="text-xs" style={{ color: t.sub }}>
          © 2026 {site.brand} — a fictional brand created by CRUD Studio for demonstration.
        </p>
        <div className="flex gap-3">
          <Link
            href="/showcase"
            className="rounded-full border px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors"
            style={{ borderColor: t.border, color: t.sub }}
          >
            ← All demos
          </Link>
          <Link
            href="/"
            className="rounded-full px-4 py-2 font-display text-xs font-bold uppercase tracking-wider"
            style={{ background: t.accent, color: t.accentText }}
          >
            Built by CRUD →
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* --- root --------------------------------------------------------------- */

export default function DemoSite({ industry }: { industry: Industry }) {
  const t = makeTokens(industry);

  return (
    <div
      className="min-h-screen scroll-smooth antialiased"
      style={{ background: t.page, color: t.text, colorScheme: t.isDark ? 'dark' : 'light' }}
    >
      <Header industry={industry} t={t} />
      <main>
        <Hero industry={industry} t={t} />
        <ValueSection industry={industry} t={t} />
        <StatsBand industry={industry} t={t} />
        <Showcase industry={industry} t={t} />
        <Process industry={industry} t={t} />
        <Testimonial industry={industry} t={t} />
        <Closing industry={industry} t={t} />
      </main>
      <Footer industry={industry} t={t} />
    </div>
  );
}
