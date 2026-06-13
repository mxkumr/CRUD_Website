'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  bento,
  featureTabs,
  integrations,
  logos,
  metrics,
  plans,
  product,
  testimonial,
} from './data';

/* ============================================================
   Nebula — a bespoke AI/SaaS product site.
   Dark, sleek and gradient-lit (Linear/Vercel energy): a
   product-UI hero, interactive feature tabs, a bento grid,
   a monthly/annual pricing toggle and integrations.
   ============================================================ */

const BG = '#08080F';
const SURFACE = 'rgba(255,255,255,0.04)';
const VIOLET = '#8B5CF6';
const INDIGO = '#6366F1';
const TEXT = '#F4F4F7';
const SUB = '#9CA3AF';
const LINE = 'rgba(255,255,255,0.10)';
const ease = [0.22, 1, 0.36, 1] as const;

const gradientText = {
  backgroundImage: `linear-gradient(100deg, ${VIOLET}, #C4B5FD, ${INDIGO})`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg, ${VIOLET}, ${INDIGO})` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 7H22l-6 4.5L18.5 22 12 17.5 5.5 22 8 13.5 2 9h7.5z" fill="#fff" /></svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight" style={{ color: TEXT }}>{product.name}</span>
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
    { label: 'Product', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Docs', href: '#' },
  ];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: '#05050A' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: VIOLET }}>Concept demo by CRUD Studio</p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:bg-white/10">← All demos</Link>
      </div>
      <header className="fixed inset-x-0 top-7 z-[50] transition-all duration-300" style={{ background: scrolled ? `${BG}D9` : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent' }}>
        <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#top"><Logo /></a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (<a key={n.label} href={n.href} className="text-[13px] font-medium transition-colors hover:text-white" style={{ color: SUB }}>{n.label}</a>))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden text-[13px] font-medium sm:block" style={{ color: SUB }}>Sign in</a>
            <a href="#pricing" className="rounded-lg px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105" style={{ background: VIOLET }}>Start free</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden" style={{ borderColor: LINE }}>
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: TEXT }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: TEXT }} />
            </button>
          </div>
        </div>
        {open && (<div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">{nav.map((n) => (<a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium" style={{ background: SURFACE, color: TEXT }}>{n.label}</a>))}</div>)}
      </header>
    </>
  );
}

/* --- hero with product UI ---------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-40 md:px-10 md:pt-48">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${VIOLET}33, transparent 60%)` }} />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.a href="#features" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium" style={{ background: SURFACE, border: `1px solid ${LINE}`, color: SUB }}>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase" style={{ background: VIOLET, color: '#fff' }}>New</span>
          Nebula 3.0 — agents that build themselves →
        </motion.a>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }} className="mx-auto mt-7 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl" style={{ color: TEXT }}>
          Ship faster with <span style={gradientText}>autonomous agents.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.16, ease }} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: SUB }}>
          Nebula turns messy operations into clean, automated workflows — in minutes, not months. No glue code, no babysitting.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease }} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#pricing" className="rounded-lg px-7 py-3.5 font-display text-sm font-bold text-white transition-transform hover:scale-105" style={{ background: VIOLET }}>Start free</a>
          <a href="#features" className="rounded-lg border px-7 py-3.5 font-display text-sm font-bold transition-colors hover:bg-white/5" style={{ borderColor: LINE, color: TEXT }}>Book a demo</a>
        </motion.div>

        {/* product UI mock */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.32, ease }} className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl text-left" style={{ background: '#0D0D17', border: `1px solid ${LINE}`, boxShadow: `0 40px 120px -40px ${VIOLET}66` }}>
          <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: LINE }}>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs" style={{ color: SUB }}>app.nebula.ai/agents</span>
          </div>
          <div className="grid grid-cols-[160px_1fr]">
            <div className="hidden border-r p-4 sm:block" style={{ borderColor: LINE }}>
              {['Overview', 'Agents', 'Runs', 'Data', 'Settings'].map((it, i) => (
                <div key={it} className="mb-1 rounded-lg px-3 py-2 text-xs font-medium" style={i === 1 ? { background: `${VIOLET}22`, color: TEXT } : { color: SUB }}>{it}</div>
              ))}
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                {[{ v: '+312%', l: 'Throughput' }, { v: '18h', l: 'Saved / wk' }, { v: '1,204', l: 'Agents' }].map((m) => (
                  <div key={m.l} className="rounded-xl p-3" style={{ background: SURFACE }}>
                    <div className="font-display text-lg font-bold" style={{ color: VIOLET }}>{m.v}</div>
                    <div className="text-[11px]" style={{ color: SUB }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-28 items-end gap-1.5 rounded-xl p-3" style={{ background: SURFACE }}>
                {[42, 60, 48, 72, 64, 88, 76, 95, 70, 84].map((h, i) => (<span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 7 ? VIOLET : `${VIOLET}55` }} />))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* logos */}
        <div className="mt-14 pb-4">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SUB }}>Powering teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((l) => (<span key={l} className="font-display text-xl font-bold tracking-tight" style={{ color: TEXT, opacity: 0.35 }}>{l}</span>))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- feature tabs (interactive) ---------------------------------------- */
function Features() {
  const [active, setActive] = useState(featureTabs[0].key);
  const tab = featureTabs.find((t) => t.key === active)!;
  return (
    <section id="features" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: VIOLET }}>Platform</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: TEXT }}>Everything you need to automate.</h2>
        </div>
        {/* tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {featureTabs.map((t) => (
            <button key={t.key} onClick={() => setActive(t.key)} className="rounded-lg px-5 py-2.5 font-display text-sm font-bold transition-colors" style={active === t.key ? { background: VIOLET, color: '#fff' } : { background: SURFACE, color: SUB, border: `1px solid ${LINE}` }}>{t.label}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }} className="grid items-center gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-12" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
            <div>
              <h3 className="font-display text-3xl font-bold tracking-tight" style={{ color: TEXT }}>{tab.title}</h3>
              <p className="mt-4 text-base leading-relaxed" style={{ color: SUB }}>{tab.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {tab.bullets.map((b) => (<li key={b} className="flex items-center gap-2.5 text-sm" style={{ color: TEXT }}><span style={{ color: VIOLET }}>✓</span> {b}</li>))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl p-10 text-center" style={{ background: `radial-gradient(circle at 50% 0%, ${VIOLET}22, transparent 70%), #0D0D17`, border: `1px solid ${LINE}` }}>
              <div className="font-display text-6xl font-bold" style={gradientText}>{tab.metric}</div>
              <div className="mt-2 text-sm uppercase tracking-wider" style={{ color: SUB }}>{tab.metricLabel}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* bento */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {bento.map((b) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, ease }} className={`rounded-2xl p-7 ${b.span ? 'md:col-span-2' : ''}`} style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
              <h3 className="font-display text-lg font-bold" style={{ color: TEXT }}>{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SUB }}>{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- pricing (interactive toggle) -------------------------------------- */
function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section id="pricing" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: VIOLET }}>Pricing</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: TEXT }}>Simple, scalable pricing.</h2>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full p-1" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
            <button onClick={() => setAnnual(false)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors" style={!annual ? { background: VIOLET, color: '#fff' } : { color: SUB }}>Monthly</button>
            <button onClick={() => setAnnual(true)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors" style={annual ? { background: VIOLET, color: '#fff' } : { color: SUB }}>
              Annual <span className="text-[11px]" style={{ color: annual ? '#fff' : VIOLET }}>−20%</span>
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const price = annual ? p.annual : p.monthly;
            return (
              <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, ease }} className="relative flex flex-col rounded-2xl p-7" style={p.popular ? { background: `radial-gradient(circle at 50% 0%, ${VIOLET}22, transparent 70%), #0D0D17`, border: `1.5px solid ${VIOLET}` } : { background: SURFACE, border: `1px solid ${LINE}` }}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: VIOLET }}>Most popular</span>}
                <h3 className="font-display text-lg font-bold" style={{ color: TEXT }}>{p.name}</h3>
                <p className="mt-1 text-sm" style={{ color: SUB }}>{p.blurb}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-5xl font-bold" style={{ color: TEXT }}>${price}</span>
                  <span className="mb-1.5 text-sm" style={{ color: SUB }}>{price === 0 ? 'forever' : '/ mo'}</span>
                </div>
                {annual && price > 0 && <p className="mt-1 text-xs" style={{ color: VIOLET }}>billed annually</p>}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: TEXT }}><span style={{ color: VIOLET }}>✓</span> {f}</li>))}
                </ul>
                <span className="mt-7 rounded-lg py-3 text-center font-display text-sm font-bold" style={p.popular ? { background: VIOLET, color: '#fff' } : { background: SURFACE, color: TEXT, border: `1px solid ${LINE}` }}>{price === 0 ? 'Start free' : 'Start trial'}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- integrations + metrics + testimonial ------------------------------ */
function IntegrationsBlock() {
  return (
    <section id="integrations" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: VIOLET }}>Integrations</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: TEXT }}>Connected to your stack.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {integrations.map((it) => (
            <span key={it} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold" style={{ background: SURFACE, border: `1px solid ${LINE}`, color: TEXT }}>
              <span className="h-2 w-2 rounded-full" style={{ background: VIOLET }} /> {it}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl py-12 md:grid-cols-4" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-4xl font-bold" style={gradientText}>{m.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider" style={{ color: SUB }}>{m.label}</div>
            </div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto mt-16 max-w-3xl text-center">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl" style={{ color: TEXT }}>“{testimonial.quote}”</p>
          <div className="mt-6"><div className="font-display text-base font-bold" style={{ color: TEXT }}>{testimonial.name}</div><div className="text-sm" style={{ color: SUB }}>{testimonial.role}</div></div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- CTA + footer ------------------------------------------------------- */
function Closing() {
  return (
    <>
      <section className="px-5 md:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-20 text-center md:py-28" style={{ background: `radial-gradient(circle at 50% 0%, ${VIOLET}44, transparent 60%), #0D0D17`, border: `1px solid ${LINE}` }}>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight md:text-6xl" style={{ color: TEXT }}>Ship faster, starting today.</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg" style={{ color: SUB }}>Start free, scale when you’re ready. No credit card required.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-lg px-7 py-3.5 font-display text-sm font-bold text-white" style={{ background: VIOLET }}>Start free →</span>
            <span className="rounded-lg border px-7 py-3.5 font-display text-sm font-bold" style={{ borderColor: LINE, color: TEXT }}>Talk to sales</span>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-10 pt-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm" style={{ color: SUB }}>A fictional product created by CRUD Studio for demonstration.</p>
          </div>
          {[
            { head: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
            { head: 'Developers', links: ['Docs', 'API', 'SDK', 'Status'] },
            { head: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { head: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
          ].map((c) => (
            <div key={c.head}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: VIOLET }}>{c.head}</p>
              <ul className="space-y-2.5">{c.links.map((l) => (<li key={l}><a href="#" className="text-sm transition-colors hover:text-white" style={{ color: SUB }}>{l}</a></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: LINE }}>
          <p className="text-xs" style={{ color: SUB }}>© 2026 {product.name}.</p>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ borderColor: LINE, color: SUB }}>← All demos</Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white" style={{ background: VIOLET }}>Designed by CRUD →</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function SaaSSite() {
  return (
    <div className="min-h-screen scroll-smooth font-body antialiased [color-scheme:dark]" style={{ background: BG, color: TEXT }}>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <IntegrationsBlock />
        <Closing />
      </main>
    </div>
  );
}
