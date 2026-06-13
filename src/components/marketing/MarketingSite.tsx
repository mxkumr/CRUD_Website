'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  agency,
  caseStudies,
  clients,
  marqueeWords,
  process,
  results,
  serviceCats,
  services,
  testimonial,
  type CountStat,
  type ServiceCat,
} from './data';

/* ============================================================
   Magnet — a bespoke marketing-agency site.
   Bold, dark and high-energy with a lime accent: a massive
   typographic hero, marquees, animated results, an
   interactive case-study filter and a punchy CTA.
   ============================================================ */

const BG = '#0A0A07';
const SURFACE = 'rgba(255,255,255,0.04)';
const LIME = '#D9FF3F';
const TEXT = '#F2F2EC';
const SUB = '#8E8E84';
const LINE = 'rgba(255,255,255,0.12)';
const ease = [0.22, 1, 0.36, 1] as const;

function StatCounter({ stat }: { stat: CountStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1700);
      setN(stat.value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);
  const display = stat.decimals ? n.toFixed(stat.decimals) : Math.round(n).toLocaleString('en-US');
  return (
    <div ref={ref}>
      <div className="font-display text-5xl font-bold md:text-7xl" style={{ color: LIME }}>
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: SUB }}>{stat.label}</div>
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="font-display text-2xl font-bold tracking-tight" style={{ color: TEXT }}>{agency.name}</span>
      <span className="text-xl" style={{ color: LIME }}>✦</span>
    </span>
  );
}

/* --- header ------------------------------------------------------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));
  const nav = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Process', href: '#process' },
  ];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: '#000' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }}>Concept demo by CRUD Studio</p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:bg-white/10">← All demos</Link>
      </div>
      <header className="fixed inset-x-0 top-7 z-[50] transition-all duration-300" style={{ background: scrolled ? `${BG}E6` : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent' }}>
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          <a href="#top"><Logo /></a>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (<a key={n.label} href={n.href} className="text-[13px] font-bold uppercase tracking-wider transition-colors hover:text-white" style={{ color: SUB }}>{n.label}</a>))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105" style={{ background: LIME, color: BG }}>Start a project</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden" style={{ borderColor: LINE }}>
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: TEXT }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: TEXT }} />
            </button>
          </div>
        </div>
        {open && (<div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">{nav.map((n) => (<a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider" style={{ background: SURFACE, color: TEXT }}>{n.label}</a>))}</div>)}
      </header>
    </>
  );
}

/* --- hero --------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-10 pt-40 md:px-10 md:pt-52">
      <div aria-hidden className="pointer-events-none absolute -right-20 top-20 h-[30rem] w-[30rem] rounded-full blur-3xl" style={{ background: `${LIME}1f` }} />
      <div className="relative mx-auto max-w-6xl">
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ border: `1px solid ${LINE}`, color: LIME }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} /> Full-funnel growth studio
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }} className="mt-6 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight md:text-[8.5rem]" style={{ color: TEXT }}>
          We make brands
          <br />
          <span style={{ color: LIME }}>impossible</span> to ignore.
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg leading-relaxed" style={{ color: SUB }}>
            Strategy, creative and media under one roof — engineered to compound. We don’t do awareness for awareness’ sake; we do revenue.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full px-8 py-4 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:scale-105" style={{ background: LIME, color: BG }}>Start a project</a>
            <a href="#work" className="rounded-full border px-8 py-4 font-display text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5" style={{ borderColor: LINE, color: TEXT }}>See the work</a>
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="mt-16 overflow-hidden border-y py-5" style={{ borderColor: LINE }}>
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-4xl font-bold uppercase tracking-tight" style={{ color: i % 2 ? TEXT : 'transparent', WebkitTextStroke: i % 2 ? undefined : `1px ${SUB}` }}>
              {w} <span style={{ color: LIME }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- results ------------------------------------------------------------ */
function Results() {
  return (
    <section id="results" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: LIME }}>The numbers</p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl" style={{ color: TEXT }}>We’re measured on outcomes.</h2>
        </div>
        <div className="grid grid-cols-2 gap-10 border-t pt-12 md:grid-cols-4" style={{ borderColor: LINE }}>
          {results.map((s) => (<StatCounter key={s.label} stat={s} />))}
        </div>
      </div>
    </section>
  );
}

/* --- services ----------------------------------------------------------- */
function Services() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section id="services" className="px-5 py-20 md:px-10 md:py-28" style={{ background: '#070705' }}>
      <div className="mx-auto max-w-6xl">
        <p className="mb-12 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: LIME }}>What we do</p>
        <div className="divide-y" style={{ borderColor: LINE }}>
          {services.map((s) => (
            <div key={s.no} onMouseEnter={() => setHover(s.no)} onMouseLeave={() => setHover(null)} className="group flex flex-col gap-3 py-8 transition-colors md:flex-row md:items-center md:justify-between" style={{ borderColor: LINE }}>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-sm font-bold" style={{ color: LIME }}>{s.no}</span>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight transition-transform group-hover:translate-x-3 md:text-5xl" style={{ color: hover === s.no ? LIME : TEXT }}>{s.title}</h3>
              </div>
              <p className="max-w-sm text-sm leading-relaxed md:text-right" style={{ color: SUB }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- case studies (interactive filter) --------------------------------- */
function Work() {
  const [cat, setCat] = useState<ServiceCat | 'All'>('All');
  const filtered = caseStudies.filter((c) => cat === 'All' || c.category === cat);
  const tones = ['#1f2937', '#3b2f1f', '#2d1f3a', '#1f3a2d', '#3a1f2d', '#1f2f3a'];
  return (
    <section id="work" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: LIME }}>Selected work</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl" style={{ color: TEXT }}>Proof, not promises.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', ...serviceCats] as const).map((c) => (
              <button key={c} onClick={() => setCat(c)} className="rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider transition-colors" style={cat === c ? { background: LIME, color: BG } : { color: SUB, border: `1px solid ${LINE}` }}>{c}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.article key={c.client} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease }} className="group relative overflow-hidden rounded-2xl p-6" style={{ background: `linear-gradient(160deg, ${tones[i % tones.length]}, #0c0c0a)`, border: `1px solid ${LINE}` }}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold uppercase tracking-wider" style={{ color: TEXT }}>{c.client}</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" style={{ background: `${LIME}22`, color: LIME }}>{c.category}</span>
                </div>
                <div className="mt-8 font-display text-6xl font-bold" style={{ color: LIME }}>{c.metric}</div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: SUB }}>{c.metricLabel}</div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: SUB }}>{c.blurb}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* --- process + clients -------------------------------------------------- */
function Process() {
  return (
    <section id="process" className="px-5 py-20 md:px-10 md:py-28" style={{ background: '#070705' }}>
      <div className="mx-auto max-w-6xl">
        <p className="mb-12 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: LIME }}>How we work</p>
        <div className="grid gap-px md:grid-cols-4" style={{ background: LINE }}>
          {process.map((p, i) => (
            <motion.div key={p.no} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="p-8" style={{ background: BG }}>
              <span className="font-display text-5xl font-bold" style={{ color: `${LIME}33` }}>{p.no}</span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight" style={{ color: TEXT }}>{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SUB }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <p className="mb-6 text-center font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: SUB }}>Trusted by ambitious brands</p>
          <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (<span key={i} className="font-display text-2xl font-bold uppercase tracking-tight" style={{ color: TEXT, opacity: 0.4 }}>{c}</span>))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto mt-16 max-w-3xl text-center">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl" style={{ color: TEXT }}>“{testimonial.quote}”</p>
          <div className="mt-6"><div className="font-display text-base font-bold uppercase tracking-wider" style={{ color: TEXT }}>{testimonial.name}</div><div className="text-sm" style={{ color: SUB }}>{testimonial.role}</div></div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- CTA + footer ------------------------------------------------------- */
function Closing() {
  return (
    <>
      <section id="contact" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl rounded-3xl px-8 py-20 text-center md:py-28" style={{ background: LIME }}>
          <h2 className="mx-auto max-w-3xl font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-8xl" style={{ color: BG }}>Let’s make noise.</h2>
          <p className="mx-auto mt-5 max-w-lg text-lg font-medium" style={{ color: 'rgba(10,10,7,0.7)' }}>Tell us your growth target. We’ll tell you how we’ll hit it.</p>
          <span className="mt-8 inline-block rounded-full px-9 py-4 font-display text-sm font-bold uppercase tracking-wider text-white" style={{ background: BG }}>Start a project →</span>
        </div>
      </section>

      <footer className="px-5 pb-10 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm" style={{ color: SUB }}>A fictional agency created by CRUD Studio for demonstration.</p>
          </div>
          {[
            { head: 'Services', links: ['Performance', 'Brand', 'SEO', 'Web & CRO'] },
            { head: 'Studio', links: ['Work', 'About', 'Careers', 'Journal'] },
            { head: 'Connect', links: ['Instagram', 'LinkedIn', 'X', 'Contact'] },
          ].map((c) => (
            <div key={c.head}>
              <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em]" style={{ color: LIME }}>{c.head}</p>
              <ul className="space-y-2.5">{c.links.map((l) => (<li key={l}><a href="#" className="text-sm transition-colors hover:text-white" style={{ color: SUB }}>{l}</a></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: LINE }}>
          <p className="text-xs" style={{ color: SUB }}>© 2026 {agency.name}.</p>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ borderColor: LINE, color: SUB }}>← All demos</Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ background: LIME, color: BG }}>Designed by CRUD →</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function MarketingSite() {
  return (
    <div className="min-h-screen scroll-smooth font-body antialiased [color-scheme:dark]" style={{ background: BG, color: TEXT }}>
      <Header />
      <main>
        <Hero />
        <Results />
        <Services />
        <Work />
        <Process />
        <Closing />
      </main>
    </div>
  );
}
