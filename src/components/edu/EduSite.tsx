'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  accolades,
  admissionSteps,
  campusLife,
  deadlines,
  events,
  fields,
  levels,
  news,
  programs,
  research,
  stats,
  uni,
  voices,
  type CountStat,
  type Field,
  type Level,
} from './data';

/* ============================================================
   Crestwood University - a bespoke collegiate website.
   Navy + gold, serif display, crest, interactive program
   explorer, animated rankings, research, campus life,
   admissions pathway, news & events, big university footer.
   ============================================================ */

const NAVY = '#0A2540';
const NAVY_DEEP = '#06182B';
const NAVY_SOFT = '#13334F';
const GOLD = '#C8A24A';
const PAPER = '#F7F4EC';
const INK = '#152234';
const SUB = '#5C6675';
const LINE = 'rgba(10,37,64,0.12)';
const ease = [0.22, 1, 0.36, 1] as const;

/* --- crest mark --------------------------------------------------------- */
function Crest({ size = 34, light = false }: { size?: number; light?: boolean }) {
  const stroke = light ? '#FFFFFF' : NAVY;
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" aria-hidden>
      <path d="M20 2 L37 8 V22 C37 33 29 40 20 43 C11 40 3 33 3 22 V8 Z" fill={NAVY} stroke={GOLD} strokeWidth="1.5" />
      <path d="M11 16 H29 M13.5 16 V13 L20 9.5 L26.5 13 V16" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M14 16 V27 M20 16 V27 M26 16 V27 M11 29 H29" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="20" cy="35.5" r="1.6" fill={GOLD} />
      <path d="M20 0" stroke={stroke} />
    </svg>
  );
}

/* --- campus "photo" (CSS only, collegiate architecture) ----------------- */
function CampusImage({
  tone = 0,
  className = '',
  children,
}: {
  tone?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const tones = [
    `linear-gradient(155deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`,
    'linear-gradient(155deg, #243446 0%, #3c5066 100%)',
    'linear-gradient(155deg, #2c2415 0%, #4c3d22 100%)',
    'linear-gradient(155deg, #143037 0%, #245460 100%)',
  ];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: `radial-gradient(120% 90% at 80% 10%, ${GOLD}33, transparent 55%), ${tones[tone % tones.length]}` }}
    >
      {/* architectural silhouette */}
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 h-3/4 w-full opacity-[0.16]" aria-hidden>
        <polygon points="100,18 150,40 50,40" fill="#fff" />
        <rect x="52" y="40" width="96" height="6" fill="#fff" />
        {[58, 76, 94, 112, 130].map((x) => (
          <rect key={x} x={x} y="48" width="10" height="60" fill="#fff" />
        ))}
        <rect x="50" y="108" width="100" height="8" fill="#fff" />
      </svg>
      {/* grain/vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 120% at 50% 0%, transparent 40%, rgba(0,0,0,0.35))' }} />
      {children}
    </div>
  );
}

/* --- animated stat counter --------------------------------------------- */
function StatCounter({ stat }: { stat: CountStat }) {
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
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl leading-none md:text-6xl" style={{ color: GOLD }}>
        {display}
        {stat.suffix}
      </div>
      <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{stat.label}</div>
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
    { label: 'Academics', href: '#programs' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Research', href: '#research' },
    { label: 'Campus Life', href: '#campus' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      {/* concept banner */}
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: NAVY_DEEP }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
          Concept demo by CRUD Studio
        </p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 transition-colors hover:bg-white/10">
          ← All demos
        </Link>
      </div>

      <header className="fixed inset-x-0 top-7 z-[50]">
        {/* utility row */}
        <div className="hidden items-center justify-end gap-5 px-10 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70 lg:flex" style={{ background: NAVY_DEEP }}>
          {['Visit', 'Give', 'MyCrestwood', 'Library', 'Search'].map((u) => (
            <a key={u} href="#" className="transition-colors hover:text-white">
              {u}
            </a>
          ))}
        </div>

        {/* main nav */}
        <div
          className={`transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/10' : ''}`}
          style={{ background: scrolled ? '#FFFFFFF2' : '#FFFFFF', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between px-5 py-3 md:px-10">
            <a href="#top" className="flex items-center gap-3">
              <Crest size={36} />
              <span className="leading-none">
                <span className="block font-serif text-xl tracking-tight" style={{ color: NAVY }}>
                  {uni.full}
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  Est. {uni.founded}
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((n) => (
                <a key={n.label} href={n.href} className="group relative text-[13px] font-semibold uppercase tracking-wider" style={{ color: INK }}>
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{ background: GOLD }} />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="#admissions" className="rounded-sm px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105" style={{ background: NAVY }}>
                Apply Now
              </a>
              <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center rounded-sm border lg:hidden" style={{ borderColor: LINE }}>
                <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: INK }} />
                <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: INK }} />
              </button>
            </div>
          </div>

          {open && (
            <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
              {nav.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-sm px-4 py-3 text-sm font-semibold uppercase tracking-wider" style={{ background: PAPER, color: INK }}>
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
      <CampusImage tone={0} className="min-h-[92vh] w-full">
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 pb-24 pt-44 md:px-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} /> {uni.motto} · {uni.mottoEn}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="max-w-3xl font-serif text-5xl leading-[1.02] text-white md:text-8xl"
          >
            Where curiosity becomes a career.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/80"
          >
            For six decades, Crestwood has educated the people who go on to redefine their fields - through
            world-class faculty, a future-ready curriculum and a campus built for big ideas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#admissions" className="rounded-sm px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-105" style={{ background: GOLD, color: NAVY_DEEP }}>
              Apply for 2026
            </a>
            <a href="#programs" className="rounded-sm border border-white/40 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">
              Explore programs
            </a>
            <a href="#campus" className="rounded-sm border border-white/40 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">
              Book a campus tour
            </a>
          </motion.div>
        </div>
      </CampusImage>
    </section>
  );
}

/* --- accolades marquee -------------------------------------------------- */
function Accolades() {
  const row = [...accolades, ...accolades];
  return (
    <div className="overflow-hidden py-4" style={{ background: NAVY_DEEP }}>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((a, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
            {a}
            <span style={{ color: GOLD }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --- stats -------------------------------------------------------------- */
function Stats() {
  return (
    <section id="about" className="px-5 py-20 md:px-10 md:py-28" style={{ background: NAVY }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
            A university like no other
          </p>
          <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">
            Numbers tell part of the story. Our graduates tell the rest.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- interactive program explorer -------------------------------------- */
function ProgramExplorer() {
  const [level, setLevel] = useState<Level>('Undergraduate');
  const [field, setField] = useState<Field | 'All'>('All');

  const filtered = programs.filter((p) => p.level === level && (field === 'All' || p.field === field));

  return (
    <section id="programs" className="px-5 py-20 md:px-10 md:py-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Find your program
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl" style={{ color: NAVY }}>
              50+ programs. One that’s yours.
            </h2>
          </div>
          {/* level tabs */}
          <div className="inline-flex rounded-sm border p-1" style={{ borderColor: LINE, background: '#fff' }}>
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                style={level === l ? { background: NAVY, color: '#fff' } : { color: SUB }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* field chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(['All', ...fields] as const).map((f) => (
            <button
              key={f}
              onClick={() => setField(f)}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
              style={
                field === f
                  ? { background: GOLD, color: NAVY_DEEP, borderColor: GOLD }
                  : { color: SUB, borderColor: LINE }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* program grid */}
        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease }}
                className="group flex flex-col bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-black/5"
                style={{ border: `1px solid ${LINE}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                    {p.degree} · {p.field}
                  </span>
                  <span className="text-[11px] font-semibold" style={{ color: SUB }}>
                    {p.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-tight" style={{ color: NAVY }}>
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: SUB }}>
                  {p.blurb}
                </p>
                <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: LINE }}>
                  <span className="text-xs font-semibold" style={{ color: SUB }}>
                    {p.seats} seats
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-transform group-hover:translate-x-1" style={{ color: NAVY }}>
                    Learn more →
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm" style={{ color: SUB }}>
            No programs in this combination yet - try another field.
          </p>
        )}
      </div>
    </section>
  );
}

/* --- research ----------------------------------------------------------- */
function ResearchSpotlight() {
  return (
    <section id="research" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
            Research & innovation
          </p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl" style={{ color: NAVY }}>
            Discoveries that leave the lab and change the world.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-2"
          >
            <CampusImage tone={3} className="flex h-full min-h-[20rem] flex-col justify-end p-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {research[0].area}
              </span>
              <h3 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-white md:text-4xl">{research[0].title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{research[0].blurb}</p>
              <span className="mt-5 w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {research[0].stat}
              </span>
            </CampusImage>
          </motion.div>

          {/* side cards */}
          <div className="grid gap-6">
            {research.slice(1).map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="flex flex-col bg-white p-6"
                style={{ border: `1px solid ${LINE}` }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                  {r.area}
                </span>
                <h3 className="mt-2 font-serif text-xl leading-tight" style={{ color: NAVY }}>
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: SUB }}>
                  {r.blurb}
                </p>
                <span className="mt-3 text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                  {r.stat}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- campus life -------------------------------------------------------- */
function CampusGrid() {
  return (
    <section id="campus" className="px-5 py-20 md:px-10 md:py-28" style={{ background: NAVY }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Life at Crestwood
            </p>
            <h2 className="font-serif text-4xl leading-tight text-white md:text-5xl">More than a place to study.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            A residential campus where 200+ clubs, championship athletics and a global community turn four years
            into a lifetime network.
          </p>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {campusLife.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease }}
              className={i === 0 || i === 5 ? 'col-span-2 row-span-1' : ''}
            >
              <CampusImage tone={(i % 3) + 1} className="flex h-full flex-col justify-end p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  {c.tag}
                </span>
                <span className="font-serif text-xl leading-tight text-white">{c.label}</span>
              </CampusImage>
            </motion.div>
          ))}
        </div>

        {/* voices */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {voices.map((v, i) => (
            <motion.figure
              key={v.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="flex flex-col bg-white/[0.04] p-6"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className="font-serif text-4xl leading-none" style={{ color: GOLD }}>
                “
              </span>
              <blockquote className="-mt-2 flex-1 text-sm leading-relaxed text-white/85">{v.quote}</blockquote>
              <figcaption className="mt-4">
                <div className="text-sm font-bold text-white">{v.name}</div>
                <div className="text-xs text-white/60">{v.detail}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- admissions --------------------------------------------------------- */
function Admissions() {
  return (
    <section id="admissions" className="px-5 py-20 md:px-10 md:py-28" style={{ background: PAPER }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Admissions
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl" style={{ color: NAVY }}>
              Your path to Crestwood, in four steps.
            </h2>

            <div className="mt-10 space-y-6">
              {admissionSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className="flex gap-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-xl" style={{ background: NAVY, color: GOLD }}>
                    {i + 1}
                  </span>
                  <div className="border-b pb-5" style={{ borderColor: LINE }}>
                    <h3 className="font-display text-base font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                      {s.step}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: SUB }}>
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* deadlines card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease }}
            className="h-fit p-8 text-white lg:sticky lg:top-40"
            style={{ background: NAVY }}
          >
            <h3 className="font-serif text-2xl">Key dates · 2026</h3>
            <div className="mt-6 space-y-4">
              {deadlines.map((d) => (
                <div key={d.round} className="flex items-center justify-between border-b border-white/15 pb-4">
                  <span className="text-sm text-white/80">{d.round}</span>
                  <span className="font-display text-lg font-bold" style={{ color: GOLD }}>
                    {d.date}
                  </span>
                </div>
              ))}
            </div>
            <a href="#" className="mt-8 block rounded-sm py-4 text-center font-display text-sm font-bold uppercase tracking-wider" style={{ background: GOLD, color: NAVY_DEEP }}>
              Start your application
            </a>
            <p className="mt-4 text-center text-xs text-white/55">No application fee for early applicants.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- news & events ------------------------------------------------------ */
function NewsEvents() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* news */}
        <div>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl md:text-4xl" style={{ color: NAVY }}>
              Crestwood news
            </h2>
            <a href="#" className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
              All stories →
            </a>
          </div>
          <div className="space-y-5">
            {news.map((nws, i) => (
              <motion.a
                key={nws.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease }}
                className="group flex gap-5 border-b pb-5"
                style={{ borderColor: LINE }}
              >
                <CampusImage tone={i + 1} className="h-24 w-32 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                    {nws.tag} · {nws.date}
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl leading-tight transition-colors group-hover:opacity-70" style={{ color: NAVY }}>
                    {nws.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* events */}
        <div>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl md:text-4xl" style={{ color: NAVY }}>
              Upcoming
            </h2>
            <a href="#" className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
              Calendar →
            </a>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <motion.a
                key={e.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease }}
                className="group flex items-center gap-5 p-4 transition-colors"
                style={{ border: `1px solid ${LINE}`, background: '#fff' }}
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-sm" style={{ background: NAVY }}>
                  <span className="font-serif text-2xl leading-none" style={{ color: GOLD }}>
                    {e.day}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-white/70">{e.month}</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold leading-tight" style={{ color: NAVY }}>
                    {e.title}
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: SUB }}>
                    {e.kind} · {e.place}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- closing CTA -------------------------------------------------------- */
function ClosingCTA() {
  return (
    <section className="px-5 md:px-10">
      <CampusImage tone={0} className="mx-auto max-w-6xl px-8 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-white md:text-6xl">
            Your future has an address.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            Join the class of 2030. Applications for the autumn intake are now open.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#admissions" className="rounded-sm px-8 py-4 font-display text-sm font-bold uppercase tracking-wider" style={{ background: GOLD, color: NAVY_DEEP }}>
              Apply for 2026
            </a>
            <a href="#campus" className="rounded-sm border border-white/40 px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10">
              Book a campus tour
            </a>
          </div>
        </motion.div>
      </CampusImage>
    </section>
  );
}

/* --- footer ------------------------------------------------------------- */
function Footer() {
  const cols = [
    { head: 'Academics', links: ['Undergraduate', 'Postgraduate', 'Doctoral', 'Online & exec ed', 'Course catalog'] },
    { head: 'Admissions', links: ['Apply', 'Visit', 'Tuition & aid', 'Deadlines', 'International'] },
    { head: 'Campus', links: ['Library', 'Athletics', 'Housing', 'Dining', 'Health & safety'] },
    { head: 'Connect', links: ['News', 'Events', 'Alumni', 'Give', 'Careers'] },
  ];
  return (
    <footer style={{ background: NAVY_DEEP }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Crest size={40} light />
              <span className="font-serif text-2xl text-white">{uni.full}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {uni.location} · A fictional institution created by CRUD Studio for demonstration.
            </p>
            <p className="mt-4 font-serif italic text-white/70">“{uni.mottoEn}”</p>
          </div>
          {cols.map((c) => (
            <div key={c.head}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
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
          <p className="text-xs text-white/45">© 2026 {uni.full}. All rights reserved.</p>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/70 transition-colors hover:text-white">
              ← All demos
            </Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ background: GOLD, color: NAVY_DEEP }}>
              Designed by CRUD →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --- root --------------------------------------------------------------- */
export default function EduSite() {
  return (
    <div className="min-h-screen scroll-smooth bg-white font-body antialiased [color-scheme:light]" style={{ color: INK }}>
      <Header />
      <main>
        <Hero />
        <Accolades />
        <Stats />
        <ProgramExplorer />
        <ResearchSpotlight />
        <CampusGrid />
        <Admissions />
        <NewsEvents />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
