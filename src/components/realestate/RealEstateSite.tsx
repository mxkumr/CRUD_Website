'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  agents,
  brand,
  features,
  listings,
  neighborhoods,
  propertyTypes,
  stats,
  testimonial,
  type CountStat,
  type Listing,
  type PropertyType,
} from './data';

/* ============================================================
   Haven Estates — a bespoke property marketplace.
   Light, airy and listing-led: a search hero, filterable
   listings, neighbourhood explorer, a live EMI calculator
   and verified agents.
   ============================================================ */

const INK = '#0F172A';
const SKY = '#0EA5E9';
const EMERALD = '#10B981';
const BG = '#F6F9FB';
const SUB = '#64748B';
const LINE = 'rgba(15,23,42,0.10)';
const ease = [0.22, 1, 0.36, 1] as const;

const inr = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(1)} L` : `₹${Math.round(n).toLocaleString('en-IN')}`;

/* --- property "photo" --------------------------------------------------- */
function HomeImage({ tone = 0, className = '', children }: { tone?: number; className?: string; children?: React.ReactNode }) {
  const tones = [
    `linear-gradient(150deg, #38bdf8, #0ea5e9)`,
    `linear-gradient(150deg, #34d399, #10b981)`,
    `linear-gradient(150deg, #818cf8, #6366f1)`,
    `linear-gradient(150deg, #fbbf24, #f59e0b)`,
  ];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundImage: tones[tone % tones.length] }}>
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 h-2/3 w-full opacity-25" aria-hidden>
        <g fill="#fff">
          <polygon points="60,38 100,18 140,38" />
          <rect x="66" y="38" width="68" height="60" />
          <rect x="78" y="54" width="16" height="16" fill="#0f172a" opacity="0.3" />
          <rect x="106" y="54" width="16" height="16" fill="#0f172a" opacity="0.3" />
          <rect x="92" y="76" width="16" height="22" fill="#0f172a" opacity="0.3" />
        </g>
      </svg>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(15,23,42,0.55))' }} />
      {children}
    </div>
  );
}

function StatCounter({ stat }: { stat: CountStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setN(stat.value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);
  const display = stat.decimals ? n.toFixed(stat.decimals) : Math.round(n).toLocaleString('en-US');
  return (
    <div ref={ref}>
      <div className="font-display text-3xl font-bold md:text-4xl" style={{ color: INK }}>
        {display}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: SUB }}>
        {stat.label}
      </div>
    </div>
  );
}

/* --- header ------------------------------------------------------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));
  const nav = [
    { label: 'Buy', href: '#listings' },
    { label: 'Rent', href: '#listings' },
    { label: 'Neighbourhoods', href: '#areas' },
    { label: 'Calculator', href: '#emi' },
    { label: 'Agents', href: '#agents' },
  ];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: INK }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: SKY }}>
          Concept demo by CRUD Studio
        </p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:bg-white/10">
          ← All demos
        </Link>
      </div>
      <header className={`fixed inset-x-0 top-7 z-[50] transition-all duration-300 ${scrolled ? 'shadow-lg shadow-slate-900/5' : ''}`} style={{ background: scrolled ? '#FFFFFFF2' : '#FFFFFF', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${LINE}` }}>
        <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: SKY }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" fill="currentColor" /></svg>
            </span>
            <span className="font-display text-xl font-bold tracking-tight" style={{ color: INK }}>
              Haven<span style={{ color: SKY }}>Estates</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-[13px] font-semibold transition-colors hover:opacity-70" style={{ color: INK }}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#listings" className="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105" style={{ background: INK }}>
              List property
            </a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden" style={{ borderColor: LINE }}>
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: INK }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: INK }} />
            </button>
          </div>
        </div>
        {open && (
          <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
            {nav.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: BG, color: INK }}>
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

/* --- hero with search --------------------------------------------------- */
function Hero() {
  const [deal, setDeal] = useState<'Buy' | 'Rent'>('Buy');
  return (
    <section id="top" className="relative px-5 pt-40 md:px-10 md:pt-48" style={{ background: BG }}>
      <div className="mx-auto max-w-6xl">
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ background: `${SKY}1a`, color: SKY }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: SKY }} /> 12,400+ homes, verified
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }} className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl" style={{ color: INK }}>
          Find a place to <span style={{ color: SKY }}>love.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.16, ease }} className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: SUB }}>
          Smart search, immersive virtual tours and EMI planning — your next home, without the runaround.
        </motion.p>

        {/* search card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease }} className="mt-10 rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/5" style={{ border: `1px solid ${LINE}` }}>
          <div className="mb-3 inline-flex rounded-full p-1" style={{ background: BG }}>
            {(['Buy', 'Rent'] as const).map((d) => (
              <button key={d} onClick={() => setDeal(d)} className="rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors" style={deal === d ? { background: SKY, color: '#fff' } : { color: SUB }}>
                {d}
              </button>
            ))}
          </div>
          <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_auto]">
            <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: BG }}>
              <span style={{ color: SKY }}>⌖</span>
              <span className="text-sm" style={{ color: SUB }}>Location · Chennai</span>
            </div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm" style={{ background: BG, color: SUB }}>Property type ▾</div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm" style={{ background: BG, color: SUB }}>Budget ▾</div>
            <button className="rounded-xl px-7 py-3 font-display text-sm font-bold uppercase tracking-wider text-white" style={{ background: INK }}>
              Search
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- listings with filter ----------------------------------------------- */
function ListingCard({ l, tone }: { l: Listing; tone: number }) {
  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease }} className="group overflow-hidden rounded-2xl bg-white" style={{ border: `1px solid ${LINE}` }}>
      <HomeImage tone={tone} className="relative h-48">
        <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: l.deal === 'Sale' ? EMERALD : SKY }}>
          For {l.deal}
        </span>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base">♡</span>
        <span className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 font-display text-base font-bold" style={{ color: INK }}>
          {l.price}
        </span>
      </HomeImage>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold" style={{ color: INK }}>{l.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm" style={{ color: SUB }}>⌖ {l.location}</p>
        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: LINE }}>
          {l.beds > 0 && <Chip>{l.beds} Beds</Chip>}
          {l.baths > 0 && <Chip>{l.baths} Baths</Chip>}
          <Chip>{l.area}</Chip>
        </div>
      </div>
    </motion.article>
  );
}
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md px-2.5 py-1 text-xs font-semibold" style={{ background: BG, color: SUB }}>
      {children}
    </span>
  );
}

function Listings() {
  const [type, setType] = useState<PropertyType | 'All'>('All');
  const filtered = listings.filter((l) => type === 'All' || l.type === type);
  return (
    <section id="listings" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: SKY }}>Featured homes</p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: INK }}>Handpicked & visit-ready</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', ...propertyTypes] as const).map((t) => (
              <button key={t} onClick={() => setType(t)} className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors" style={type === t ? { background: SKY, color: '#fff', borderColor: SKY } : { color: SUB, borderColor: LINE }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((l, i) => (
              <ListingCard key={l.id} l={l} tone={i % 4} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* --- neighbourhoods ----------------------------------------------------- */
function Neighbourhoods() {
  return (
    <section id="areas" className="px-5 py-20 md:px-10 md:py-28" style={{ background: BG }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: SKY }}>Explore by area</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: INK }}>Know the neighbourhood</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((nb, i) => (
            <motion.a key={nb.name} href="#listings" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease }} className="group overflow-hidden rounded-2xl">
              <HomeImage tone={i % 4} className="flex h-44 flex-col justify-end p-5">
                <span className="font-display text-xl font-bold text-white">{nb.name}</span>
                <span className="text-sm text-white/80">{nb.count} listings · {nb.note}</span>
              </HomeImage>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- EMI calculator (interactive) -------------------------------------- */
function EMICalculator() {
  const [amount, setAmount] = useState(8000000); // 80L
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, total, interest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tot = e * n;
    return { emi: e, total: tot, interest: tot - amount };
  }, [amount, rate, years]);

  const Slider = ({ label, value, set, min, max, step, fmt }: { label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; fmt: (v: number) => string }) => (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: SUB }}>{label}</span>
        <span className="font-display text-base font-bold" style={{ color: INK }}>{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full" style={{ accentColor: SKY, background: `${SKY}33` }} />
    </div>
  );

  return (
    <section id="emi" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-12" style={{ background: INK }}>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: SKY }}>Plan with confidence</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">EMI calculator</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">Drag the sliders to see your monthly payment update instantly.</p>
            <div className="mt-8 space-y-7">
              <Slider label="Loan amount" value={amount} set={setAmount} min={1000000} max={50000000} step={500000} fmt={inr} />
              <Slider label="Interest rate" value={rate} set={setRate} min={6} max={14} step={0.1} fmt={(v) => `${v.toFixed(1)}%`} />
              <Slider label="Tenure" value={years} set={setYears} min={5} max={30} step={1} fmt={(v) => `${v} yrs`} />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white/[0.05] p-8" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Monthly EMI</span>
            <div className="mt-2 font-display text-5xl font-bold md:text-6xl" style={{ color: SKY }}>{inr(emi)}</div>
            <div className="mt-8 space-y-4">
              <Row label="Principal" value={inr(amount)} />
              <Row label="Total interest" value={inr(interest)} />
              <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <Row label="Total payable" value={inr(total)} strong />
            </div>
            <a href="#listings" className="mt-8 rounded-full py-3.5 text-center font-display text-sm font-bold uppercase tracking-wider text-white" style={{ background: SKY }}>
              Find homes in budget
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/60">{label}</span>
      <span className={`font-display ${strong ? 'text-xl font-bold text-white' : 'text-base font-semibold text-white/90'}`}>{value}</span>
    </div>
  );
}

/* --- features + agents -------------------------------------------------- */
function FeaturesAgents() {
  return (
    <section id="agents" className="px-5 py-20 md:px-10 md:py-28" style={{ background: BG }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease }} className="rounded-2xl bg-white p-6" style={{ border: `1px solid ${LINE}` }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl font-display font-bold" style={{ background: `${SKY}1a`, color: SKY }}>{i + 1}</span>
              <h3 className="mt-4 font-display text-base font-bold" style={{ color: INK }}>{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: SUB }}>{f.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl" style={{ color: INK }}>Top agents, ready to help</h2>
          <a href="#" className="text-xs font-bold uppercase tracking-wider" style={{ color: SKY }}>View all →</a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {agents.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="flex items-center gap-4 rounded-2xl bg-white p-5" style={{ border: `1px solid ${LINE}` }}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full font-display text-lg font-bold text-white" style={{ background: i % 2 ? EMERALD : SKY }}>
                {a.name.split(' ').map((w) => w[0]).join('')}
              </span>
              <div>
                <div className="font-display text-base font-bold" style={{ color: INK }}>{a.name}</div>
                <div className="text-sm" style={{ color: SUB }}>{a.area} · {a.deals}</div>
                <div className="text-sm font-semibold" style={{ color: EMERALD }}>{a.rating}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- testimonial + CTA + footer ---------------------------------------- */
function Closing() {
  return (
    <>
      <section className="px-5 py-20 md:px-10 md:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto max-w-3xl text-center">
          <span className="font-display text-6xl leading-none" style={{ color: SKY }}>“</span>
          <p className="-mt-3 font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl" style={{ color: INK }}>{testimonial.quote}</p>
          <div className="mt-6">
            <div className="font-display text-base font-bold" style={{ color: INK }}>{testimonial.name}</div>
            <div className="text-sm" style={{ color: SUB }}>{testimonial.role}</div>
          </div>
        </motion.div>
      </section>

      <section className="px-5 md:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24" style={{ background: `linear-gradient(135deg, ${SKY}, ${EMERALD})` }}>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">Ready to move?</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">Search homes, book a visit, or talk to a verified agent today.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider" style={{ color: INK }}>Search homes →</span>
            <span className="rounded-full border border-white/60 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white">Talk to an agent</span>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-10 pt-20 md:px-10" style={{ background: BG }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: SKY }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" fill="currentColor" /></svg>
              </span>
              <span className="font-display text-xl font-bold tracking-tight" style={{ color: INK }}>Haven<span style={{ color: SKY }}>Estates</span></span>
            </div>
            <p className="mt-4 max-w-xs text-sm" style={{ color: SUB }}>A fictional marketplace created by CRUD Studio for demonstration.</p>
            <p className="mt-3 text-sm font-semibold" style={{ color: INK }}>{brand.phone}</p>
          </div>
          {[
            { head: 'Explore', links: ['Buy', 'Rent', 'New projects', 'Commercial'] },
            { head: 'Company', links: ['About', 'Agents', 'Careers', 'Insights'] },
            { head: 'Support', links: ['Help centre', 'List property', 'Privacy', 'Terms'] },
          ].map((c) => (
            <div key={c.head}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUB }}>{c.head}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: INK }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: LINE }}>
          <p className="text-xs" style={{ color: SUB }}>© 2026 {brand.full}.</p>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ borderColor: LINE, color: SUB }}>← All demos</Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white" style={{ background: INK }}>Designed by CRUD →</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function RealEstateSite() {
  return (
    <div className="min-h-screen scroll-smooth font-body antialiased [color-scheme:light]" style={{ background: '#fff', color: INK }}>
      <Header />
      <main>
        <Hero />
        <Listings />
        <Neighbourhoods />
        <EMICalculator />
        <FeaturesAgents />
        <Closing />
      </main>
    </div>
  );
}
