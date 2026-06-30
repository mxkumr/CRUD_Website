'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  certifications,
  differentiators,
  firm,
  process,
  projects,
  sectors,
  services,
  safety,
  stats,
  testimonial,
  type CountStat,
  type Sector,
} from './data';

/* ============================================================
   Apex BuildWorks - a bespoke construction-firm website.
   Industrial concrete + steel, hi-vis orange, blueprint and
   crane motifs, animated metrics, an interactive project
   portfolio filtered by sector, a build process, safety &
   certifications, and a request-a-quote funnel.
   ============================================================ */

const INK = '#15150F';
const STEEL = '#2A2A24';
const CONCRETE = '#6A6A60';
const PAPER = '#F2F1EC';
const ORANGE = '#EA580C';
const ORANGE_DEEP = '#C2410C';
const LINE = 'rgba(21,21,15,0.14)';
const ease = [0.22, 1, 0.36, 1] as const;

/* --- mark --------------------------------------------------------------- */
function Mark({ size = 30, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="2" fill={light ? '#FFFFFF' : INK} />
      <path d="M16 7 L25 25 H7 Z" fill="none" stroke={ORANGE} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M11.5 25 L16 16 L20.5 25" fill="none" stroke={ORANGE} strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

/* --- industrial "photo" (CSS + crane/structure silhouette) -------------- */
function SiteImage({
  tone = 0,
  className = '',
  children,
}: {
  tone?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const tones = [
    'linear-gradient(155deg, #1c1f24 0%, #343a42 100%)',
    'linear-gradient(155deg, #2b2620 0%, #4a4239 100%)',
    'linear-gradient(155deg, #20262b 0%, #3a4650 100%)',
    'linear-gradient(155deg, #15150F 0%, #2A2A24 100%)',
  ];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: `radial-gradient(120% 90% at 85% 0%, ${ORANGE}33, transparent 50%), ${tones[tone % tones.length]}` }}
    >
      {/* tower crane + building frame silhouette */}
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMax meet" className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
        {/* building frame */}
        <g stroke="#fff" strokeWidth="1.4" fill="none">
          <rect x="30" y="55" width="70" height="75" />
          <line x1="30" y1="74" x2="100" y2="74" />
          <line x1="30" y1="93" x2="100" y2="93" />
          <line x1="30" y1="112" x2="100" y2="112" />
          <line x1="53" y1="55" x2="53" y2="130" />
          <line x1="77" y1="55" x2="77" y2="130" />
        </g>
        {/* tower crane */}
        <g stroke="#fff" strokeWidth="1.6" fill="none">
          <line x1="150" y1="20" x2="150" y2="130" />
          <line x1="144" y1="130" x2="156" y2="130" />
          <line x1="110" y1="20" x2="195" y2="20" />
          <line x1="150" y1="8" x2="178" y2="20" />
          <line x1="150" y1="8" x2="130" y2="20" />
          <line x1="120" y1="20" x2="120" y2="34" />
        </g>
      </svg>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 120% at 50% 0%, transparent 35%, rgba(0,0,0,0.45))' }} />
      {children}
    </div>
  );
}

/* hi-vis hazard tape divider */
function HazardTape() {
  return (
    <div
      className="h-2 w-full"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${ORANGE} 0 14px, ${INK} 14px 28px)`,
      }}
    />
  );
}

/* --- animated counter --------------------------------------------------- */
function StatCounter({ stat, light }: { stat: CountStat; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const dur = 1700;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  const display = stat.decimals ? n.toFixed(stat.decimals) : Math.round(n).toLocaleString('en-US');

  return (
    <div ref={ref}>
      <div className="font-display text-5xl font-bold md:text-6xl" style={{ color: ORANGE }}>
        {display}
        {stat.suffix}
      </div>
      <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: light ? 'rgba(255,255,255,0.55)' : CONCRETE }}>
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
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Safety', href: '#safety' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: INK }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>
          Concept demo by CRUD Studio
        </p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 transition-colors hover:bg-white/10">
          ← All demos
        </Link>
      </div>

      <header className="fixed inset-x-0 top-7 z-[50]">
        {/* utility strip */}
        <div className="hidden items-center justify-between px-10 py-1.5 lg:flex" style={{ background: STEEL }}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">{firm.license}</span>
          <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-wider text-white/70">
            <span>Licensed &amp; insured</span>
            <a href={`tel:${firm.phone}`} className="transition-colors hover:text-white" style={{ color: ORANGE }}>
              {firm.phone}
            </a>
          </div>
        </div>

        <div className={`transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/10' : ''}`} style={{ background: '#FFFFFF', borderBottom: `1px solid ${LINE}` }}>
          <div className="flex items-center justify-between px-5 py-3 md:px-10">
            <a href="#top" className="flex items-center gap-3">
              <Mark size={34} />
              <span className="font-display text-xl font-bold uppercase tracking-tight" style={{ color: INK }}>
                Apex<span style={{ color: ORANGE }}>BuildWorks</span>
              </span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((n) => (
                <a key={n.label} href={n.href} className="group relative font-display text-[13px] font-bold uppercase tracking-wider" style={{ color: INK }}>
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{ background: ORANGE }} />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="#quote" className="hidden items-center gap-2 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105 sm:flex" style={{ background: ORANGE }}>
                Request a Quote
              </a>
              <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center border lg:hidden" style={{ borderColor: LINE }}>
                <span className={`absolute h-0.5 w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: INK }} />
                <span className={`absolute h-0.5 w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: INK }} />
              </button>
            </div>
          </div>

          {open && (
            <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
              {nav.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="px-4 py-3 font-display text-sm font-bold uppercase tracking-wider" style={{ background: PAPER, color: INK }}>
                  {n.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

/* --- hero --------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative">
      <SiteImage tone={0} className="min-h-[94vh] w-full">
        {/* blueprint corner ticks */}
        <div className="pointer-events-none absolute inset-6 hidden border border-white/10 md:block">
          <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2" style={{ borderColor: ORANGE }} />
          <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2" style={{ borderColor: ORANGE }} />
          <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2" style={{ borderColor: ORANGE }} />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2" style={{ borderColor: ORANGE }} />
        </div>

        <div className="relative mx-auto flex min-h-[94vh] max-w-6xl flex-col justify-center px-5 pb-24 pt-44 md:px-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex w-fit items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
            style={{ background: ORANGE }}
          >
            Turnkey construction · Since {firm.founded}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white md:text-8xl"
          >
            We build landmarks,
            <br />
            <span style={{ color: ORANGE }}>on time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/80"
          >
            25 years of commercial, residential and infrastructure construction - delivered with fixed-price
            certainty, self-perform crews and daily transparency from foundation to handover.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#quote" className="px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-105" style={{ background: ORANGE }}>
              Request a quote
            </a>
            <a href="#projects" className="border border-white/40 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">
              View projects
            </a>
          </motion.div>
        </div>
      </SiteImage>

      {/* certifications marquee */}
      <div className="overflow-hidden py-3.5" style={{ background: INK }}>
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {[...certifications, ...certifications].map((c, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.15em] text-white/65">
              {c}
              <span style={{ color: ORANGE }}>▲</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- stats -------------------------------------------------------------- */
function Stats() {
  return (
    <section id="about" className="px-5 py-20 md:px-10 md:py-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
              01 - Track record
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl" style={{ color: INK }}>
              Built to spec.
              <br />
              Delivered on schedule.
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: CONCRETE }}>
            From high-rise towers to expressway bridges, Apex BuildWorks has delivered hundreds of complex
            projects across South India - every one to programme, to budget, and to a standard our clients
            return for.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 border-t pt-12 md:grid-cols-4" style={{ borderColor: LINE }}>
          {stats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- services ----------------------------------------------------------- */
function Services() {
  return (
    <section id="services" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
            02 - Capabilities
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl" style={{ color: INK }}>
            One contractor. Every discipline.
          </h2>
        </div>

        <div className="grid gap-px md:grid-cols-3" style={{ background: LINE }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease }}
              className="group p-8 transition-colors"
              style={{ background: '#fff' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold" style={{ color: ORANGE }}>
                  {s.no}
                </span>
                <span className="h-8 w-8 border-2 transition-colors group-hover:bg-current" style={{ borderColor: INK, color: ORANGE }} />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight" style={{ color: INK }}>
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: CONCRETE }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- interactive project portfolio ------------------------------------- */
function Portfolio() {
  const [sector, setSector] = useState<Sector | 'All'>('All');
  const filtered = projects.filter((p) => sector === 'All' || p.sector === sector);

  return (
    <section id="projects" className="px-5 py-20 md:px-10 md:py-28" style={{ background: INK }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
              03 - Portfolio
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              Proof, poured in concrete.
            </h2>
          </div>
        </div>

        {/* sector filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(['All', ...sectors] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className="px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors"
              style={sector === s ? { background: ORANGE, color: '#fff' } : { color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* project grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease }}
                className="group overflow-hidden"
              >
                <SiteImage tone={i % 4} className="relative h-56">
                  <span
                    className="absolute right-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={p.status === 'Completed' ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: INK }}
                  >
                    {p.status}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-white/70">
                      {p.sector} · {p.location}
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white">
                      {p.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-white/70">
                      <span style={{ color: ORANGE }}>{p.metric}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                </SiteImage>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* --- process ------------------------------------------------------------ */
function Process() {
  return (
    <section id="process" className="px-5 py-20 md:px-10 md:py-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
            04 - How we build
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl" style={{ color: INK }}>
            A method, not a gamble.
          </h2>
        </div>

        <div className="grid gap-px md:grid-cols-4" style={{ background: LINE }}>
          {process.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="relative p-8"
              style={{ background: '#fff' }}
            >
              <span className="font-display text-5xl font-bold" style={{ color: `${ORANGE}33` }}>
                {p.no}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight" style={{ color: INK }}>
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: CONCRETE }}>
                {p.body}
              </p>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>
                {p.duration}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- safety & differentiators ------------------------------------------ */
function Safety() {
  return (
    <section id="safety" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* safety highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease }}
        >
          <SiteImage tone={3} className="flex h-full min-h-[22rem] flex-col justify-end p-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
              Safety first, always
            </p>
            <div className="mt-3 font-display text-6xl font-bold uppercase tracking-tight text-white md:text-7xl">
              {safety.headline}
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">{safety.sub}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {safety.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs text-white/80">
                  <span style={{ color: ORANGE }}>✓</span> {pt}
                </li>
              ))}
            </ul>
          </SiteImage>
        </motion.div>

        {/* differentiators */}
        <div>
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
            05 - Why Apex
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl" style={{ color: INK }}>
            Built different.
          </h2>
          <div className="mt-8 divide-y" style={{ borderColor: LINE }}>
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="flex gap-5 py-5"
                style={{ borderColor: LINE }}
              >
                <span className="font-display text-sm font-bold" style={{ color: ORANGE }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight" style={{ color: INK }}>
                    {d.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: CONCRETE }}>
                    {d.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- testimonial -------------------------------------------------------- */
function Testimonial() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: STEEL }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="font-display text-6xl font-bold leading-none" style={{ color: ORANGE }}>
          “
        </span>
        <p className="-mt-2 font-display text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl">
          {testimonial.quote}
        </p>
        <div className="mt-8">
          <div className="font-display text-base font-bold uppercase tracking-wider text-white">{testimonial.name}</div>
          <div className="text-sm text-white/60">{testimonial.role}</div>
        </div>
      </motion.div>
    </section>
  );
}

/* --- quote CTA ---------------------------------------------------------- */
function QuoteCTA() {
  return (
    <section id="quote" className="px-5 md:px-10">
      <div className="mx-auto max-w-6xl" style={{ background: ORANGE }}>
        <div className="grid gap-8 p-10 md:grid-cols-[1.3fr_1fr] md:items-center md:p-16">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              Let&apos;s build it.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
              Tell us about your project and get a clear scope, programme and guaranteed price - no obligation,
              no surprises.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="flex items-center justify-center px-7 py-4 font-display text-sm font-bold uppercase tracking-wider" style={{ background: INK, color: '#fff' }}>
              Request a quote →
            </span>
            <a href={`tel:${firm.phone}`} className="flex items-center justify-center gap-2 border border-white/40 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Call {firm.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- footer ------------------------------------------------------------- */
function Footer() {
  const cols = [
    { head: 'Services', links: ['General Contracting', 'Design–Build', 'Pre-Construction', 'Renovation', 'Infrastructure'] },
    { head: 'Sectors', links: ['Commercial', 'Residential', 'Infrastructure', 'Retail', 'Industrial'] },
    { head: 'Company', links: ['About', 'Projects', 'Careers', 'Safety', 'News'] },
  ];
  return (
    <footer style={{ background: INK }}>
      <HazardTape />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Mark size={36} light />
              <span className="font-display text-xl font-bold uppercase tracking-tight text-white">
                Apex<span style={{ color: ORANGE }}>BuildWorks</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              A fictional construction firm created by CRUD Studio for demonstration.
            </p>
            <p className="mt-4 text-sm text-white/70">{firm.phone}</p>
            <p className="text-sm text-white/70">{firm.email}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-white/40">{firm.license}</p>
          </div>
          {cols.map((c) => (
            <div key={c.head}>
              <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
                {c.head}
              </p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/65 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/45">© 2026 {firm.name}. All rights reserved.</p>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/70 transition-colors hover:text-white">
              ← All demos
            </Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white" style={{ background: ORANGE }}>
              Designed by CRUD →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --- root --------------------------------------------------------------- */
export default function ConstructionSite() {
  return (
    <div className="min-h-screen scroll-smooth bg-white font-body antialiased [color-scheme:light]" style={{ color: INK }}>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <Process />
        <Safety />
        <Testimonial />
        <QuoteCTA />
      </main>
      <Footer />
    </div>
  );
}
