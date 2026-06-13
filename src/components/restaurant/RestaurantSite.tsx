'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  dishes,
  gallery,
  hours,
  menuCategories,
  place,
  reservationTimes,
  reviews,
  story,
  type MenuCategory,
} from './data';

/* ============================================================
   Saffron & Smoke — a bespoke fine-dining restaurant site.
   Moody, dark and photo-led, with serif elegance, an
   interactive menu, a live reservation widget and the chef’s
   story. Reservation-first throughout.
   ============================================================ */

const BG = '#100B09';
const SURFACE = 'rgba(255,255,255,0.04)';
const AMBER = '#E0A53B';
const RUST = '#C2410C';
const CREAM = '#F4ECE0';
const SUB = '#A8998A';
const LINE = 'rgba(244,236,224,0.12)';
const ease = [0.22, 1, 0.36, 1] as const;

/* --- moody "photo" ------------------------------------------------------ */
function FoodImage({ tone = 0, className = '', children }: { tone?: number; className?: string; children?: React.ReactNode }) {
  const tones = [
    'radial-gradient(120% 100% at 70% 20%, #5a2e12, #1a0f08)',
    'radial-gradient(120% 100% at 30% 30%, #6b3410, #160d07)',
    'radial-gradient(120% 100% at 60% 10%, #4a3315, #14100a)',
    'radial-gradient(120% 100% at 50% 40%, #732d1a, #170d09)',
  ];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundImage: tones[tone % tones.length] }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 30% 30%, ${AMBER}55, transparent 40%)` }} />
      <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(120% 120% at 50% 50%, transparent 30%, rgba(0,0,0,0.6))' }} />
      {children}
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 3c2 4 6 6 6 11a6 6 0 0 1-12 0c0-2 1-3.5 2-5" stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="15" r="2.4" fill={RUST} />
        <path d="M8 27h16" stroke={AMBER} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="font-serif text-2xl leading-none" style={{ color: CREAM }}>Saffron <span style={{ color: AMBER }}>&amp; Smoke</span></span>
    </span>
  );
}

/* --- header ------------------------------------------------------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30));
  const nav = [
    { label: 'Menu', href: '#menu' },
    { label: 'Reserve', href: '#reserve' },
    { label: 'Story', href: '#story' },
    { label: 'Visit', href: '#visit' },
  ];
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: '#000' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: AMBER }}>Concept demo by CRUD Studio</p>
        <Link href="/showcase" className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:bg-white/10">← All demos</Link>
      </div>
      <header className="fixed inset-x-0 top-7 z-[50] transition-all duration-500" style={{ background: scrolled ? `${BG}E6` : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent' }}>
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          <a href="#top"><Logo /></a>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (<a key={n.label} href={n.href} className="text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-white" style={{ color: SUB }}>{n.label}</a>))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#reserve" className="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105" style={{ background: AMBER, color: BG }}>Reserve</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden" style={{ borderColor: LINE }}>
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: CREAM }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: CREAM }} />
            </button>
          </div>
        </div>
        {open && (
          <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
            {nav.map((n) => (<a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider" style={{ background: SURFACE, color: CREAM }}>{n.label}</a>))}
          </div>
        )}
      </header>
    </>
  );
}

/* --- hero --------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative">
      <FoodImage tone={0} className="flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pt-32 md:px-10">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: AMBER }}>
            <span className="h-px w-8" style={{ background: AMBER }} /> {place.cuisine}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease }} className="mt-6 max-w-3xl font-serif text-6xl leading-[0.98] md:text-8xl" style={{ color: CREAM }}>
            Slow-smoked.
            <br />
            <span style={{ color: AMBER }}>Boldly spiced.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }} className="mt-7 max-w-lg text-lg leading-relaxed" style={{ color: SUB }}>
            A live-fire kitchen where heritage recipes meet modern technique. Book a table and taste the city’s most talked-about Indian dining.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#reserve" className="rounded-full px-8 py-4 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:scale-105" style={{ background: AMBER, color: BG }}>Reserve a table</a>
            <a href="#menu" className="rounded-full border px-8 py-4 font-display text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5" style={{ borderColor: LINE, color: CREAM }}>View the menu</a>
            <span className="font-display text-sm" style={{ color: SUB }}>★ 4.8 · 2,100+ reviews</span>
          </motion.div>
        </div>
      </FoodImage>
    </section>
  );
}

/* --- menu (interactive tabs) ------------------------------------------- */
function Menu() {
  const [cat, setCat] = useState<MenuCategory>('Small Plates');
  const items = dishes.filter((d) => d.category === cat);
  return (
    <section id="menu" className="px-5 py-20 md:px-10 md:py-28" style={{ background: BG }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: AMBER }}>The menu</p>
          <h2 className="font-serif text-5xl md:text-6xl" style={{ color: CREAM }}>From the kitchen</h2>
        </div>
        {/* tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {menuCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-colors" style={cat === c ? { background: AMBER, color: BG } : { color: SUB, border: `1px solid ${LINE}` }}>{c}</button>
          ))}
        </div>
        {/* items */}
        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }} className="grid gap-x-12 gap-y-7 md:grid-cols-2">
            {items.map((d) => (
              <div key={d.name} className="flex items-start gap-4">
                <span className="mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center border" style={{ borderColor: d.veg ? '#5BA35B' : '#C0392B' }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.veg ? '#5BA35B' : '#C0392B' }} />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl" style={{ color: CREAM }}>
                      {d.name}
                      {d.signature && <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider" style={{ color: AMBER }}>· Signature</span>}
                    </h3>
                    <span className="font-display text-base font-bold" style={{ color: AMBER }}>{d.price}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="mt-10 text-center text-xs uppercase tracking-wider" style={{ color: SUB }}>A full vegetarian tasting menu is available · please inform us of allergies</p>
      </div>
    </section>
  );
}

/* --- reservation (interactive) ----------------------------------------- */
function Reserve() {
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState('20:00');
  const [done, setDone] = useState(false);
  return (
    <section id="reserve" className="px-5 md:px-10">
      <FoodImage tone={2} className="mx-auto max-w-6xl">
        <div className="grid gap-10 p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: AMBER }}>Reservations</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl" style={{ color: CREAM }}>A table awaits.</h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed" style={{ color: SUB }}>
              Book in seconds. We hold tables for 15 minutes — for parties of 8 or more, please call us directly.
            </p>
            <div className="mt-6 space-y-2 text-sm" style={{ color: SUB }}>
              <p>📍 {place.address}</p>
              <p>📞 {place.phone}</p>
            </div>
          </div>

          <div className="rounded-2xl p-6 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.45)', border: `1px solid ${LINE}` }}>
            {/* guests */}
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: SUB }}>Guests</label>
            <div className="mt-2 flex items-center gap-3">
              <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="flex h-9 w-9 items-center justify-center rounded-full text-lg" style={{ border: `1px solid ${LINE}`, color: CREAM }}>−</button>
              <span className="font-display text-2xl font-bold" style={{ color: CREAM }}>{guests}</span>
              <button onClick={() => setGuests((g) => Math.min(8, g + 1))} className="flex h-9 w-9 items-center justify-center rounded-full text-lg" style={{ border: `1px solid ${LINE}`, color: CREAM }}>+</button>
            </div>
            {/* date */}
            <label className="mt-5 block text-xs font-bold uppercase tracking-wider" style={{ color: SUB }}>Date</label>
            <div className="mt-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm" style={{ background: SURFACE, color: CREAM }}>Friday, 20 June 2026 <span style={{ color: AMBER }}>▾</span></div>
            {/* time */}
            <label className="mt-5 block text-xs font-bold uppercase tracking-wider" style={{ color: SUB }}>Time</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {reservationTimes.map((t) => (
                <button key={t} onClick={() => setTime(t)} className="rounded-lg py-2 text-sm font-semibold transition-colors" style={time === t ? { background: AMBER, color: BG } : { background: SURFACE, color: CREAM }}>{t}</button>
              ))}
            </div>
            <button onClick={() => setDone(true)} className="mt-6 w-full rounded-full py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:scale-[1.02]" style={{ background: AMBER, color: BG }}>
              {done ? '✓ Table confirmed' : 'Find my table'}
            </button>
            {done && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-sm" style={{ color: '#5BA35B' }}>
                Table for {guests} at {time} — see you Friday!
              </motion.p>
            )}
          </div>
        </div>
      </FoodImage>
    </section>
  );
}

/* --- chef story --------------------------------------------------------- */
function Story() {
  return (
    <section id="story" className="px-5 py-20 md:px-10 md:py-28" style={{ background: BG }}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <FoodImage tone={1} className="h-80 lg:h-[28rem]">
          <div className="absolute bottom-6 left-6">
            <div className="font-serif text-2xl" style={{ color: CREAM }}>{story.chef}</div>
            <div className="text-sm" style={{ color: AMBER }}>Founder & Executive Chef</div>
          </div>
        </FoodImage>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: AMBER }}>Our story</p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl" style={{ color: CREAM }}>{story.title}</h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: SUB }}>{story.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {story.accolades.map((a) => (<span key={a} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: SURFACE, color: CREAM, border: `1px solid ${LINE}` }}>{a}</span>))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- gallery + reviews -------------------------------------------------- */
function GalleryReviews() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28" style={{ background: '#0A0706' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: AMBER }}>The room</p>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: CREAM }}>An evening to remember</h2>
        </div>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((g, i) => (
            <motion.div key={g} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease }} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <FoodImage tone={i % 4} className="flex h-full items-end p-4">
                <span className="font-display text-sm font-semibold" style={{ color: CREAM }}>{g}</span>
              </FoodImage>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure key={r.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="rounded-2xl p-6" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
              <div className="text-sm" style={{ color: AMBER }}>★★★★★</div>
              <blockquote className="mt-3 text-sm leading-relaxed" style={{ color: CREAM }}>{r.quote}</blockquote>
              <figcaption className="mt-4 text-xs" style={{ color: SUB }}>{r.name} · {r.detail}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- visit + footer ----------------------------------------------------- */
function Visit() {
  return (
    <>
      <section id="visit" className="px-5 py-20 md:px-10 md:py-28" style={{ background: BG }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: AMBER }}>Visit us</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl" style={{ color: CREAM }}>Find your way in.</h2>
            <p className="mt-5 text-base" style={{ color: SUB }}>{place.address}</p>
            <p className="mt-1 text-base" style={{ color: SUB }}>{place.phone}</p>
            <div className="mt-8 space-y-3">
              {hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between border-b pb-3" style={{ borderColor: LINE }}>
                  <span className="font-display text-sm font-semibold" style={{ color: CREAM }}>{h.day}</span>
                  <span className="text-sm" style={{ color: SUB }}>{h.time}</span>
                </div>
              ))}
            </div>
            <a href="#reserve" className="mt-8 inline-block rounded-full px-8 py-4 font-display text-sm font-bold uppercase tracking-wider" style={{ background: AMBER, color: BG }}>Reserve a table</a>
          </div>
          <FoodImage tone={3} className="min-h-[20rem] rounded-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.4)', color: CREAM }}>◵ Cathedral Road · Map</span>
            </div>
          </FoodImage>
        </div>
      </section>

      <footer className="px-5 pb-10 pt-16 md:px-10" style={{ background: '#000' }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <Logo />
          <p className="max-w-md text-sm" style={{ color: SUB }}>A fictional restaurant created by CRUD Studio for demonstration.</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider" style={{ color: SUB }}>
            {['Menu', 'Reserve', 'Private events', 'Gift cards', 'Instagram'].map((l) => (<a key={l} href="#" className="transition-colors hover:text-white">{l}</a>))}
          </div>
          <div className="flex gap-3">
            <Link href="/showcase" className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/70 hover:text-white">← All demos</Link>
            <Link href="/" className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ background: AMBER, color: BG }}>Designed by CRUD →</Link>
          </div>
          <p className="text-xs" style={{ color: 'rgba(168,153,138,0.6)' }}>© 2026 {place.name}.</p>
        </div>
      </footer>
    </>
  );
}

export default function RestaurantSite() {
  return (
    <div className="min-h-screen scroll-smooth font-body antialiased [color-scheme:dark]" style={{ background: BG, color: CREAM }}>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Reserve />
        <Story />
        <GalleryReviews />
        <Visit />
      </main>
    </div>
  );
}
