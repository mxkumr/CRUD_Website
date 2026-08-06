'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  brand,
  filterMenu,
  formatInr,
  heroImage,
  hours,
  interiorImage,
  menu,
  pourImage,
  rituals,
  testimonial,
  type MenuCategory,
} from './data';

/* ============================================================
   SOLSTICE — specialty café concept.
   Stone paper, sea-green accents, Fraunces + Sora.
   Views: Home · Menu · Visit
   ============================================================ */

const PAPER = '#F2EFE8';
const INK = '#1C1B19';
const SEA = '#2F6F5E';
const HONEY = '#C4893A';
const MUTED = '#6E6960';
const LINE = 'rgba(28,27,25,0.10)';
const ease = [0.22, 1, 0.36, 1] as const;
const display = 'var(--font-cafe-display), Fraunces, Georgia, serif';
const body = 'var(--font-cafe-body), Sora, sans-serif';

type View = 'home' | 'menu' | 'visit';

function Header({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 18));

  const links: { label: string; id: View }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'Visit', id: 'visit' },
  ];

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: INK }}>
        <p className="text-[11px] font-medium tracking-[0.14em]" style={{ color: HONEY, fontFamily: body }}>
          Concept demo by CRUD Studio
        </p>
        <Link
          href="/showcase"
          className="border px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/85 hover:bg-white/10"
          style={{ borderColor: 'rgba(255,255,255,0.2)', fontFamily: body }}
        >
          ← All demos
        </Link>
      </div>

      <header
        className="fixed inset-x-0 top-7 z-[50] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(242,239,232,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <button type="button" onClick={() => onNavigate('home')} className="text-left">
            <span className="block text-2xl tracking-tight" style={{ color: INK, fontFamily: display, fontWeight: 600 }}>
              {brand.name}
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em]" style={{ color: MUTED, fontFamily: body }}>
              {brand.neighbourhood}
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onNavigate(l.id)}
                className="text-[12px] uppercase tracking-[0.16em] transition-colors"
                style={{
                  color: view === l.id ? INK : MUTED,
                  fontFamily: body,
                  fontWeight: view === l.id ? 600 : 500,
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              className="hidden px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white sm:block"
              style={{ background: SEA, fontFamily: body }}
            >
              Reserve a table
            </button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center border md:hidden"
              style={{ borderColor: LINE }}
            >
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: INK }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: INK }} />
            </button>
          </div>
        </div>

        {open && (
          <div className="grid grid-cols-3 gap-2 border-t px-5 py-4 md:hidden" style={{ borderColor: LINE }}>
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  onNavigate(l.id);
                  setOpen(false);
                }}
                className="px-3 py-3 text-left text-sm"
                style={{ background: view === l.id ? SEA : 'rgba(28,27,25,0.04)', color: view === l.id ? '#fff' : INK, fontFamily: body }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

function HomeView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const featured = menu.filter((m) => m.category === 'Coffee').slice(0, 3);

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image src={heroImage} alt="Espresso and morning light at Solstice" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(28,27,25,0.78) 0%, rgba(28,27,25,0.35) 48%, rgba(28,27,25,0.15) 100%)' }} />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-40 md:px-8 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[11px] uppercase tracking-[0.28em] text-white/75"
            style={{ fontFamily: body }}
          >
            Specialty café · {brand.city}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.06, ease }}
            className="mt-4 max-w-3xl text-5xl leading-[0.98] text-white md:text-7xl lg:text-8xl"
            style={{ fontFamily: display, fontWeight: 500 }}
          >
            {brand.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease }}
            className="mt-5 max-w-md text-base text-white/80 md:text-lg"
            style={{ fontFamily: body }}
          >
            {brand.blurb}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ background: '#fff', color: INK, fontFamily: body }}
            >
              See the menu
            </button>
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              className="border border-white/40 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
              style={{ fontFamily: body }}
            >
              Plan a visit
            </button>
          </motion.div>
        </div>
      </section>

      <section className="border-y px-5 py-4 md:px-8" style={{ borderColor: LINE, background: '#EBE7DE' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          {hours.map((h) => (
            <div key={h.day} className="flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: body }}>
                {h.day}
              </span>
              <span className="text-sm" style={{ color: INK, fontFamily: display }}>
                {h.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: SEA, fontFamily: body }}>
            The house
          </p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
            Built for the stretch between first light and last pour.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: MUTED, fontFamily: body }}>
            We roast in small lots, plate a short kitchen menu, and keep the room calm enough to hear the espresso machine settle. No rush. No noise for noise&apos;s sake.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('visit')}
            className="mt-8 text-[12px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: SEA, fontFamily: body }}
          >
            Find us in {brand.neighbourhood} →
          </button>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={interiorImage} alt="Solstice café interior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="px-5 py-6 md:px-8" style={{ background: INK }}>
        <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[22rem] overflow-hidden">
            <Image src={pourImage} alt="Pouring filter coffee" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 md:px-12">
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: HONEY, fontFamily: body }}>
              On the bar
            </p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl" style={{ fontFamily: display, fontWeight: 500 }}>
              Signature pours
            </h2>
            <div className="mt-8 space-y-5">
              {featured.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-lg text-white" style={{ fontFamily: display }}>
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-white/55" style={{ fontFamily: body }}>
                      {item.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-white/80" style={{ fontFamily: body }}>
                    {formatInr(item.price)}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="mt-8 self-start px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ background: SEA, color: '#fff', fontFamily: body }}
            >
              Full menu
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: SEA, fontFamily: body }}>
          Day parts
        </p>
        <h2 className="mt-3 max-w-xl text-4xl md:text-5xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
          Three moods. One address.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {rituals.map((r) => (
            <article key={r.title} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <h3 className="mt-4 text-2xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED, fontFamily: body }}>
                {r.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t px-5 py-20 md:px-8" style={{ borderColor: LINE, background: '#EBE7DE' }}>
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="text-2xl leading-snug md:text-4xl" style={{ color: INK, fontFamily: display, fontWeight: 500, fontStyle: 'italic' }}>
            “{testimonial.quote}”
          </p>
          <footer className="mt-6 text-sm" style={{ color: MUTED, fontFamily: body }}>
            <span style={{ color: SEA }}>{testimonial.name}</span> · {testimonial.role}
          </footer>
        </blockquote>
      </section>
    </>
  );
}

function MenuView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const [cat, setCat] = useState<MenuCategory | 'All'>('All');
  const items = filterMenu(cat);
  const cats: Array<MenuCategory | 'All'> = ['All', 'Coffee', 'Kitchen', 'Bakery'];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
      <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: SEA, fontFamily: body }}>
        Menu
      </p>
      <h1 className="mt-3 text-4xl md:text-6xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
        What we&apos;re pouring
      </h1>
      <p className="mt-4 max-w-lg text-sm md:text-base" style={{ color: MUTED, fontFamily: body }}>
        A short list, cooked and brewed to the hour. Ask the bar for today&apos;s filter origin.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{
              background: cat === c ? SEA : 'transparent',
              color: cat === c ? '#fff' : MUTED,
              border: `1px solid ${cat === c ? SEA : LINE}`,
              fontFamily: body,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id}>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd8ce]">
              <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: body }}>
                  {item.category}
                  {item.note ? ` · ${item.note}` : ''}
                </p>
                <h2 className="mt-1 text-xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
                  {item.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED, fontFamily: body }}>
                  {item.blurb}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium" style={{ color: INK, fontFamily: body }}>
                {formatInr(item.price)}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 border-t pt-10" style={{ borderColor: LINE }}>
        <button
          type="button"
          onClick={() => onNavigate('visit')}
          className="px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          style={{ background: SEA, fontFamily: body }}
        >
          Reserve a table
        </button>
      </div>
    </section>
  );
}

function VisitView() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: SEA, fontFamily: body }}>
            Visit
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
            Come through
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED, fontFamily: body }}>
            Walk-ins welcome. Tables of four or more — send a note and we&apos;ll hold a corner.
          </p>

          <div className="mt-10 space-y-6 border-t pt-8" style={{ borderColor: LINE }}>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: body }}>
                Address
              </p>
              <p className="mt-2 text-lg" style={{ color: INK, fontFamily: display }}>
                14, Sterling Road
                <br />
                {brand.neighbourhood}, {brand.city}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: body }}>
                Hours
              </p>
              <ul className="mt-2 space-y-1">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 text-sm" style={{ color: INK, fontFamily: body }}>
                    <span style={{ color: MUTED }}>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: body }}>
                Contact
              </p>
              <p className="mt-2 text-sm" style={{ color: INK, fontFamily: body }}>
                hello@{brand.domain}
                <br />
                +91 44 4000 2211
              </p>
            </div>
          </div>
        </div>

        <div className="border p-6 md:p-8" style={{ borderColor: LINE, background: '#fff' }}>
          <h2 className="text-2xl" style={{ color: INK, fontFamily: display, fontWeight: 500 }}>
            Hold a table
          </h2>
          <p className="mt-2 text-sm" style={{ color: MUTED, fontFamily: body }}>
            Demo form — in production this syncs to your booking calendar.
          </p>
          {sent ? (
            <p className="mt-10 text-lg" style={{ color: SEA, fontFamily: display }}>
              Request noted. We&apos;ll confirm shortly.
            </p>
          ) : (
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: body }}>
                  Name
                </span>
                <input
                  required
                  className="mt-1.5 w-full border bg-transparent px-3 py-3 text-sm outline-none focus:border-[#2F6F5E]"
                  style={{ borderColor: LINE, color: INK, fontFamily: body }}
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: body }}>
                  Guests
                </span>
                <select
                  className="mt-1.5 w-full border bg-transparent px-3 py-3 text-sm outline-none"
                  style={{ borderColor: LINE, color: INK, fontFamily: body }}
                  defaultValue="2"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: MUTED, fontFamily: body }}>
                  Preferred time
                </span>
                <input
                  required
                  type="datetime-local"
                  className="mt-1.5 w-full border bg-transparent px-3 py-3 text-sm outline-none"
                  style={{ borderColor: LINE, color: INK, fontFamily: body }}
                />
              </label>
              <button
                type="submit"
                className="mt-2 w-full py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
                style={{ background: SEA, fontFamily: body }}
              >
                Request table
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <footer className="border-t px-5 py-14 md:px-8" style={{ borderColor: LINE, background: INK }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-3xl text-white" style={{ fontFamily: display, fontWeight: 500 }}>
            {brand.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-white/55" style={{ fontFamily: body }}>
            {brand.tagline} Concept café by CRUD Studio.
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          {(['home', 'menu', 'visit'] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onNavigate(v)}
              className="text-[11px] uppercase tracking-[0.16em] text-white/55 hover:text-white"
              style={{ fontFamily: body }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[11px] text-white/35" style={{ fontFamily: body }}>
        © 2026 {brand.name} · {brand.domain} · Demo only · Photos via Unsplash
      </p>
    </footer>
  );
}

export default function CafeSite() {
  const [view, setView] = useState<View>('home');

  const onNavigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK, fontFamily: body }}>
      <Header view={view} onNavigate={onNavigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
        >
          {view === 'home' && <HomeView onNavigate={onNavigate} />}
          {view === 'menu' && <MenuView onNavigate={onNavigate} />}
          {view === 'visit' && <VisitView />}
        </motion.div>
      </AnimatePresence>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
