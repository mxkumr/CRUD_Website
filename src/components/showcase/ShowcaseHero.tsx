'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.08 * i, ease },
  }),
};

const stats = [
  { value: '8', label: 'Industry concepts' },
  { value: '2', label: 'Device previews' },
  { value: '4–7', label: 'Weeks to launch' },
];

export default function ShowcaseHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(217,255,63,0.12), transparent 60%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim"
        >
          <span className="h-px w-8 bg-volt" /> Industry Solutions Showcase
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-8xl"
        >
          Demo work,
          <br />
          built for{' '}
          <span className="font-serif font-normal normal-case italic text-volt">your</span> world.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim"
        >
          Eight live, interactive concepts — one for every kind of business we love building for.
          Open any card to explore a working preview on desktop and mobile, see the feature set,
          the timeline and a transparent price band. This is exactly what we could build for{' '}
          <em className="font-serif text-bone">you</em>.
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap gap-8 border-t border-line pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold text-bone md:text-4xl">{s.value}</div>
              <div className="mt-1 font-display text-[11px] uppercase tracking-widest text-bone-dim">
                {s.label}
              </div>
            </div>
          ))}
          <p className="ml-auto hidden max-w-xs self-end text-sm leading-relaxed text-bone-dim md:block">
            <span className="text-volt">↓</span> Tap a card to expand it into a spatial preview
            window.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
