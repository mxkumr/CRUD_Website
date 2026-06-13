'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { animate, motion } from 'framer-motion';
import { useLenis } from '@/components/site/SmoothScroll';
import { industries } from '@/lib/showcase-data';

const ease = [0.22, 1, 0.36, 1] as const;
const lineEase = [0.65, 0, 0.13, 1] as const;

function RevealLine({
  children,
  delay,
  className = '',
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '110%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1, delay, ease: lineEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Counts a pure number (optionally with a trailing +) up on mount. */
function AnimatedNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const animatable = /^[\d.,]+\+?$/.test(value);
  const [display, setDisplay] = useState(animatable ? '0' : value);

  useEffect(() => {
    if (!animatable) return;
    const suffix = value.endsWith('+') ? '+' : '';
    const target = parseFloat(value.replace(/[+,]/g, ''));
    const controls = animate(0, target, {
      duration: 1.2,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [value, delay, animatable]);

  return <>{display}</>;
}

const stats = [
  { value: '8', label: 'Industry concepts' },
  { value: '8', label: 'Live demos' },
  { value: '2', label: 'Device previews' },
  { value: '4–7', label: 'Weeks to launch' },
];

export default function ShowcaseHero() {
  const { scrollTo } = useLenis();

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
      {/* ambient glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(217,255,63,0.14), transparent 62%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 62%)' }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(237,234,227,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 0%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* left — editorial intro */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-volt opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-volt" />
              </span>
              <RevealLine delay={0.1} className="font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
                Industry Solutions Showcase
              </RevealLine>
            </div>

            <h1 className="font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-bone md:text-8xl">
              <RevealLine delay={0.18}>Demo work,</RevealLine>
              <RevealLine delay={0.3}>
                built for{' '}
                <span className="font-serif font-normal normal-case italic text-volt">your</span> world.
              </RevealLine>
            </h1>

            <RevealLine delay={0.5} className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Eight live, interactive concepts — one for every kind of business we love building for.
              Open any card to explore a working preview on desktop and mobile, the feature set, the
              timeline and a transparent price band.
            </RevealLine>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                data-cursor="hover"
                onClick={() => scrollTo('#industries', -8)}
                className="group relative overflow-hidden rounded-full bg-volt px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-ink"
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-bone">
                  Explore concepts
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-raise transition-transform duration-400 ease-out group-hover:scale-y-100" />
              </button>
              <Link
                href="/#contact"
                data-cursor="hover"
                className="rounded-full border border-line px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-bone transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
              >
                Start a project
              </Link>
            </motion.div>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
              className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="bg-ink-soft p-5">
                  <div className="font-display text-3xl font-bold text-volt md:text-4xl">
                    <AnimatedNumber value={s.value} delay={0.9 + i * 0.1} />
                  </div>
                  <div className="mt-1.5 font-display text-[10px] uppercase tracking-widest text-bone-dim">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right — interactive concept index / launchpad */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="relative"
          >
            <div className="rounded-[1.6rem] border border-line bg-ink-soft/60 p-3 backdrop-blur-xl sm:p-4">
              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <p className="font-display text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                  The index
                </p>
                <span className="font-display text-[11px] tracking-widest text-bone-dim">08 / 08</span>
              </div>
              <ul>
                {industries.map((ind, i) => {
                  const [hue] = ind.hues;
                  return (
                    <motion.li
                      key={ind.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.05, ease }}
                    >
                      <Link
                        href={ind.liveHref ?? '#industries'}
                        data-cursor="view"
                        className="group flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-colors duration-300 hover:bg-white/5"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-base transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `${hue}1f`, color: hue }}
                        >
                          {ind.glyph}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-sm font-semibold text-bone">
                            {ind.name}
                          </span>
                          <span className="block truncate font-display text-[10px] uppercase tracking-widest text-bone-dim">
                            {ind.category}
                          </span>
                        </span>
                        <span
                          className="font-display text-xs tracking-widest text-bone-dim transition-all duration-300 group-hover:opacity-0"
                        >
                          {ind.number}
                        </span>
                        <span
                          className="-ml-5 translate-x-2 font-display text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          style={{ color: hue }}
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <p className="mt-4 px-2 text-center text-xs leading-relaxed text-bone-dim">
              <span className="text-volt">↗</span> Jump straight into any live demo, or scroll to expand
              each concept into a spatial preview.
            </p>
          </motion.div>
        </div>

        {/* category marquee */}
        <div className="relative mt-16 overflow-hidden border-y border-line py-5 md:mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-28"
          />
          <div className="flex w-max animate-marquee gap-0 will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {industries.map((ind) => (
                  <span
                    key={`${copy}-${ind.id}`}
                    className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-sm uppercase tracking-widest text-bone-dim"
                  >
                    <span style={{ color: ind.hues[0] }}>{ind.glyph}</span>
                    {ind.category}
                    <span className="text-volt">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
