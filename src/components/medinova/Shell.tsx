'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { healthPackages, hospital } from '@/lib/medinova-data';

const ease = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   Demo nav - the 9 "pages" map to sections of this concept
   ============================================================ */
const navLinks = [
  { label: 'Home', target: '#home' },
  { label: 'About', target: '#about' },
  { label: 'Doctors', target: '#doctors' },
  { label: 'Specialities', target: '#specialities' },
  { label: 'Book', target: '#book' },
  { label: 'Packages', target: '#packages' },
  { label: 'Emergency', target: '#emergency' },
  { label: 'Stories', target: '#stories' },
  { label: 'Contact', target: '#contact' },
];

export function MediNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30));

  return (
    <>
      {/* concept banner */}
      <div className="fixed inset-x-0 top-0 z-[110] flex items-center justify-center gap-3 bg-slate-900 px-4 py-1.5">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Concept demo by CRUD Studio
        </p>
        <Link
          href="/"
          className="rounded-full border border-emerald-300/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100 transition-colors hover:bg-emerald-300 hover:text-slate-900"
        >
          ← Back to CRUD
        </Link>
      </div>

      <header
        className={`fixed inset-x-0 top-7 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-white/85 shadow-sm shadow-slate-900/5 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#home" className="flex items-center gap-2.5" aria-label="MediNova home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-display text-lg font-bold text-white shadow-md shadow-emerald-600/20">
              +
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              Medi<span className="text-emerald-600">Nova</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="MediNova primary">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.target}
                className={`font-display text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-emerald-600 ${
                  l.label === 'Emergency' ? 'text-red-600 hover:text-red-500' : 'text-slate-500'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="hidden rounded-full bg-emerald-600 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 transition-transform hover:scale-105 md:block"
            >
              Book now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 xl:hidden"
            >
              <span className={`absolute h-px w-4 bg-slate-700 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`absolute h-px w-4 bg-slate-700 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-[105] grid grid-cols-2 gap-2 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl xl:hidden"
            aria-label="MediNova mobile"
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.target}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 font-display text-sm font-semibold ${
                  l.label === 'Emergency' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   Health packages
   ============================================================ */
export function Packages() {
  return (
    <section id="packages" className="relative px-5 py-24 md:px-10">
      <div className="mb-12 text-center">
        <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          <span className="h-px w-8 bg-emerald-500" /> Health packages <span className="h-px w-8 bg-emerald-500" />
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Prevention, priced clearly.
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {healthPackages.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease }}
            className={`relative flex flex-col rounded-3xl border p-7 ${
              p.popular
                ? 'border-emerald-300 bg-gradient-to-b from-emerald-50 to-white shadow-xl shadow-emerald-900/10'
                : 'border-slate-200 bg-white shadow-sm'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20">
                Most chosen
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-slate-900">{p.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{p.tests} tests included</p>
            <p className="mt-5 font-display text-4xl font-bold text-slate-900">
              {p.price}
              <span className="text-sm font-normal text-slate-400"> / person</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {p.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="mt-0.5 text-emerald-600">✓</span> {item}
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className={`mt-8 rounded-full py-3.5 text-center font-display text-sm font-bold uppercase tracking-wider transition-transform hover:scale-[1.02] ${
                p.popular
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
              }`}
            >
              Book this package
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Emergency band - red stays (universal medical signal)
   ============================================================ */
export function EmergencyBand() {
  return (
    <section id="emergency" className="relative px-5 py-12 md:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-red-200 bg-gradient-to-r from-red-50 via-white to-white p-8 shadow-sm md:p-12"
      >
        <motion.div
          aria-hidden
          className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-red-200/40 blur-3xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-red-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Emergency &amp; trauma - 24×7
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 md:text-5xl">
              Golden hour ready.
              <span className="text-red-600"> Always.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
              Dedicated trauma bays, stroke and cardiac fast-tracks, and an ambulance network with live GPS dispatch - door-to-needle in under 20 minutes.
            </p>
          </div>
          <a
            href={`tel:${hospital.emergency}`}
            className="group flex items-center gap-4 rounded-2xl border border-red-300 bg-red-600 px-7 py-5 text-white shadow-lg shadow-red-600/20 transition-transform hover:scale-105"
          >
            <span className="font-display text-5xl font-bold">{hospital.emergency}</span>
            <span className="text-left text-xs uppercase leading-relaxed tracking-wider text-red-50">
              Tap to call
              <br />
              ambulance
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Footer / contact
   ============================================================ */
export function MediFooter() {
  return (
    <footer id="contact" className="relative border-t border-slate-200 bg-slate-50 px-5 pb-10 pt-20 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-display text-lg font-bold text-white shadow-md shadow-emerald-600/20">
              +
            </span>
            <span className="font-display text-lg font-bold text-slate-900">
              Medi<span className="text-emerald-600">Nova</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">{hospital.tagline}</p>
          <p className="mt-6 font-display text-2xl font-bold text-slate-900">{hospital.phone}</p>
          <p className="text-xs uppercase tracking-wider text-slate-400">Appointments &amp; enquiries</p>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Visit</p>
          <p className="text-sm leading-relaxed text-slate-500">
            MediNova Health City
            <br />
            200 Feet Radial Road
            <br />
            Chennai 600 089
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Quick links</p>
          <div className="grid gap-2 text-sm text-slate-500">
            <a href="#doctors" className="transition-colors hover:text-emerald-600">Find a doctor</a>
            <a href="#packages" className="transition-colors hover:text-emerald-600">Health packages</a>
            <a href="#emergency" className="transition-colors hover:text-emerald-600">Emergency care</a>
            <a href="#stories" className="transition-colors hover:text-emerald-600">Patient stories</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 md:flex-row">
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} MediNova - a fictional brand created for demonstration.</p>
        <Link
          href="/"
          className="rounded-full border border-slate-300 px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-700"
        >
          Designed &amp; built by CRUD Studio →
        </Link>
      </div>
    </footer>
  );
}
