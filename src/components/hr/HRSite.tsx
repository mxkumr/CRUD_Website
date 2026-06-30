'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  brand,
  candidateSteps,
  categories,
  companies,
  employerSteps,
  jobs,
  pipeline,
  stats,
  testimonial,
  type CountStat,
  type Category,
} from './data';

/* ============================================================
   TalentForge - a bespoke two-sided hiring platform.
   Friendly indigo/pink, a searchable job board, candidate &
   employer journeys, a live application-tracking dashboard
   mock, and trusted-company proof.
   ============================================================ */

const INK = '#1B1726';
const PINK = '#DB2777';
const INDIGO = '#6366F1';
const BG = '#FAF7FB';
const SUB = '#6B6675';
const LINE = 'rgba(27,23,38,0.10)';
const ease = [0.22, 1, 0.36, 1] as const;

function StatCounter({ stat, light }: { stat: CountStat; light?: boolean }) {
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
      <div className="font-display text-4xl font-bold md:text-5xl" style={{ color: light ? '#fff' : INK }}>
        {display}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: light ? 'rgba(255,255,255,0.6)' : SUB }}>
        {stat.label}
      </div>
    </div>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${PINK})` }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M16 6.5a3 3 0 0 1 0 5.5M17 19a5 5 0 0 0-3-4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight" style={{ color: light ? '#fff' : INK }}>
        Talent<span style={{ color: PINK }}>Forge</span>
      </span>
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
    { label: 'Jobs', href: '#jobs' },
    { label: 'Companies', href: '#companies' },
    { label: 'For employers', href: '#employers' },
    { label: 'How it works', href: '#how' },
  ];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: INK }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: PINK }}>Concept demo by CRUD Studio</p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:bg-white/10">← All demos</Link>
      </div>
      <header className={`fixed inset-x-0 top-7 z-[50] transition-all duration-300 ${scrolled ? 'shadow-lg shadow-slate-900/5' : ''}`} style={{ background: scrolled ? '#FFFFFFF2' : '#FFFFFF', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${LINE}` }}>
        <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#top"><Logo /></a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-[13px] font-semibold transition-colors hover:opacity-70" style={{ color: INK }}>{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#employers" className="hidden text-[13px] font-semibold sm:block" style={{ color: INK }}>Sign in</a>
            <a href="#employers" className="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105" style={{ background: PINK }}>Post a job</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden" style={{ borderColor: LINE }}>
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: INK }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: INK }} />
            </button>
          </div>
        </div>
        {open && (
          <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
            {nav.map((n) => (<a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: BG, color: INK }}>{n.label}</a>))}
          </div>
        )}
      </header>
    </>
  );
}

/* --- hero --------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-40 md:px-10 md:pt-48" style={{ background: BG }}>
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-10 h-96 w-96 rounded-full blur-3xl" style={{ background: `${PINK}22` }} />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full blur-3xl" style={{ background: `${INDIGO}22` }} />
      <div className="relative mx-auto max-w-6xl text-center">
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ background: `${PINK}1a`, color: PINK }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: PINK }} /> 24,000+ roles hiring now
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }} className="mx-auto mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl" style={{ color: INK }}>
          Your next role, <br className="hidden md:block" />matched in <span style={{ color: PINK }}>minutes.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.16, ease }} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed" style={{ color: SUB }}>
          Apply once, track everything - and let great companies come to you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease }} className="mx-auto mt-9 grid max-w-2xl gap-2 rounded-2xl bg-white p-3 shadow-xl shadow-slate-900/5 md:grid-cols-[1.6fr_1fr_auto]" style={{ border: `1px solid ${LINE}` }}>
          <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: BG }}><span style={{ color: PINK }}>⌕</span><span className="text-sm" style={{ color: SUB }}>Role, skill or company</span></div>
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm" style={{ background: BG, color: SUB }}>⌖ Anywhere</div>
          <a href="#jobs" className="rounded-xl px-7 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-white" style={{ background: INK }}>Search</a>
        </motion.div>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {stats.map((s) => (<StatCounter key={s.label} stat={s} />))}
        </div>
      </div>
    </section>
  );
}

/* --- job board (interactive) ------------------------------------------- */
function JobBoard() {
  const [cat, setCat] = useState<Category | 'All'>('All');
  const [q, setQ] = useState('');
  const filtered = jobs.filter(
    (j) => (cat === 'All' || j.category === cat) && (q === '' || `${j.title} ${j.company}`.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <section id="jobs" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: PINK }}>Open roles</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: INK }}>Find your fit</h2>
        </div>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-full px-4 py-2.5 lg:w-72" style={{ background: BG, border: `1px solid ${LINE}` }}>
            <span style={{ color: PINK }}>⌕</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roles…" className="w-full bg-transparent text-sm outline-none" style={{ color: INK }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', ...categories] as const).map((c) => (
              <button key={c} onClick={() => setCat(c)} className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors" style={cat === c ? { background: PINK, color: '#fff', borderColor: PINK } : { color: SUB, borderColor: LINE }}>{c}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((j) => (
              <motion.article key={j.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3, ease }} className="group flex flex-col gap-4 rounded-2xl bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between" style={{ border: `1px solid ${LINE}` }}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold text-white" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${PINK})` }}>{j.company[0]}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold" style={{ color: INK }}>{j.title}</h3>
                    <p className="text-sm" style={{ color: SUB }}>{j.company} · {j.location} · {j.type}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {j.tags.map((t) => (<span key={t} className="rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: BG, color: SUB }}>{t}</span>))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <div className="font-display text-sm font-bold" style={{ color: INK }}>{j.salary}</div>
                    <div className="text-xs" style={{ color: SUB }}>{j.posted}</div>
                  </div>
                  <span className="rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform group-hover:scale-105" style={{ background: INK }}>Apply</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm" style={{ color: SUB }}>No roles match - try another search.</p>}
      </div>
    </section>
  );
}

/* --- how it works ------------------------------------------------------- */
function HowItWorks() {
  return (
    <section id="how" className="px-5 py-20 md:px-10 md:py-28" style={{ background: BG }}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        {[
          { tag: 'For candidates', steps: candidateSteps, color: PINK },
          { tag: 'For employers', steps: employerSteps, color: INDIGO },
        ].map((col) => (
          <div key={col.tag} id={col.tag === 'For employers' ? 'employers' : undefined} className="rounded-3xl bg-white p-8 md:p-10" style={{ border: `1px solid ${LINE}` }}>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: col.color }}>{col.tag}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight" style={{ color: INK }}>{col.tag === 'For employers' ? 'Hire in three steps' : 'Land it in three steps'}</h2>
            <div className="mt-8 space-y-6">
              {col.steps.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white" style={{ background: col.color }}>{i + 1}</span>
                  <div>
                    <h3 className="font-display text-base font-bold" style={{ color: INK }}>{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- dashboard mock + companies ---------------------------------------- */
function Dashboard() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: PINK }}>Track everything</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: INK }}>Every application, in one place.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: SUB }}>
            Watch your candidates move through each stage in real time - no spreadsheets, no chasing, no guessing where things stand.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {['Real-time pipeline', 'Shared scorecards', 'Interview scheduling', 'Offer management'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm font-semibold" style={{ color: INK }}><span style={{ color: PINK }}>✓</span> {f}</div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }} className="rounded-3xl p-6" style={{ background: INK }}>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-sm font-bold text-white">Hiring pipeline · Senior Designer</span>
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" style={{ background: `${PINK}33`, color: '#fff' }}>Live</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {pipeline.map((p) => (
              <div key={p.stage} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="font-display text-2xl font-bold" style={{ color: p.color }}>{p.count}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/55">{p.stage}</div>
                <div className="mt-2 h-1 w-full rounded-full" style={{ background: p.color, opacity: 0.5 }} />
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {[
              { n: 'Aisha R.', s: 'Interview · Today 3:00pm', c: PINK },
              { n: 'Daniel O.', s: 'Screening · Scorecard due', c: INDIGO },
              { n: 'Meera I.', s: 'Offer sent · Awaiting', c: '#10B981' },
            ].map((r) => (
              <div key={r.n} className="flex items-center justify-between rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: r.c }}>{r.n[0]}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{r.n}</div>
                    <div className="text-[11px] text-white/55">{r.s}</div>
                  </div>
                </div>
                <span className="text-white/40">→</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* companies */}
      <div id="companies" className="mx-auto mt-20 max-w-6xl">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em]" style={{ color: SUB }}>Trusted by teams hiring at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((c) => (<span key={c} className="font-display text-xl font-bold tracking-tight" style={{ color: INK, opacity: 0.4 }}>{c}</span>))}
        </div>
      </div>
    </section>
  );
}

/* --- testimonial + CTA + footer ---------------------------------------- */
function Closing() {
  return (
    <>
      <section className="px-5 py-16 md:px-10" style={{ background: BG }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto max-w-3xl text-center">
          <span className="font-display text-6xl leading-none" style={{ color: PINK }}>“</span>
          <p className="-mt-3 font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl" style={{ color: INK }}>{testimonial.quote}</p>
          <div className="mt-6"><div className="font-display text-base font-bold" style={{ color: INK }}>{testimonial.name}</div><div className="text-sm" style={{ color: SUB }}>{testimonial.role}</div></div>
        </motion.div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {[
            { t: 'Looking for a job?', s: 'Create a profile and apply in one click.', b: 'Find jobs', c: PINK },
            { t: 'Hiring talent?', s: 'Post a role and meet candidates in days.', b: 'Post a job', c: INDIGO },
          ].map((card) => (
            <div key={card.t} className="rounded-3xl p-10 text-white" style={{ background: card.c }}>
              <h2 className="font-display text-3xl font-bold tracking-tight">{card.t}</h2>
              <p className="mt-2 text-white/85">{card.s}</p>
              <span className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-display text-sm font-bold uppercase tracking-wider" style={{ color: INK }}>{card.b} →</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-5 pb-10 pt-16 md:px-10" style={{ background: INK }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-white/55">A fictional hiring platform created by CRUD Studio for demonstration.</p>
          </div>
          {[
            { head: 'Candidates', links: ['Browse jobs', 'Companies', 'Career advice', 'Salary guide'] },
            { head: 'Employers', links: ['Post a job', 'Pricing', 'ATS', 'Resources'] },
            { head: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms'] },
          ].map((col) => (
            <div key={col.head}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: PINK }}>{col.head}</p>
              <ul className="space-y-2.5">{col.links.map((l) => (<li key={l}><a href="#" className="text-sm text-white/65 transition-colors hover:text-white">{l}</a></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/45">© 2026 {brand.name}.</p>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/70 hover:text-white">← All demos</Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white" style={{ background: PINK }}>Designed by CRUD →</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function HRSite() {
  return (
    <div className="min-h-screen scroll-smooth font-body antialiased [color-scheme:light]" style={{ background: '#fff', color: INK }}>
      <Header />
      <main>
        <Hero />
        <JobBoard />
        <HowItWorks />
        <Dashboard />
        <Closing />
      </main>
    </div>
  );
}
