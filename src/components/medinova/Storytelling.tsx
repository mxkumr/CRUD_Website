'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { patientStories, tourStops, treatmentJourney } from '@/lib/medinova-data';

const ease = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   Animated treatment journey — scroll-driven timeline
   ============================================================ */
export function TreatmentJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.75', 'end 0.6'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" className="relative bg-slate-50 px-5 py-24 md:px-10">
      <div className="mb-14 text-center">
        <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          <span className="h-px w-8 bg-emerald-500" /> Your journey <span className="h-px w-8 bg-emerald-500" />
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          From symptom to recovery,
          <br />
          <span className="text-slate-400">one connected path.</span>
        </h2>
      </div>

      <div ref={trackRef} className="relative mx-auto max-w-3xl">
        {/* progress spine */}
        <div className="absolute bottom-4 left-5 top-4 w-px bg-slate-200 md:left-1/2" aria-hidden>
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-400"
            style={{ scaleY: lineScale }}
          />
        </div>

        <div className="space-y-12">
          {treatmentJourney.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease }}
              className={`relative flex gap-6 pl-14 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
              }`}
            >
              {/* node */}
              <div
                className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-white font-mono text-xs font-bold text-emerald-600 shadow-sm ${
                  i % 2 === 0 ? 'left-0 md:-right-5 md:left-auto' : 'left-0 md:-left-5'
                }`}
              >
                {step.phase}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">{step.duration}</span>
                <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Virtual hospital tour
   ============================================================ */
export function VirtualTour() {
  const [active, setActive] = useState(0);
  const stop = tourStops[active];

  return (
    <section id="tour" className="relative px-5 py-24 md:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-emerald-900/5">
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          {/* stage */}
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(80% 80% at 30% 20%, ${stop.hue}26 0%, transparent 60%), linear-gradient(150deg, #ECFDF5 10%, #F0FDFA 90%)`,
                }}
              >
                {/* abstract architecture lines */}
                <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
                  <defs>
                    <linearGradient id={`tg-${stop.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={stop.hue} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={stop.hue} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[...Array(7)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1={`${8 + i * 14}%`}
                      y1="100%"
                      x2={`${20 + i * 12}%`}
                      y2="0%"
                      stroke={`url(#tg-${stop.id})`}
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: i * 0.08 }}
                    />
                  ))}
                </svg>

                <div className="absolute bottom-0 left-0 p-8 md:p-10">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-block rounded-full border border-white bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur"
                    style={{ color: stop.hue }}
                  >
                    {stop.stat}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-3 font-display text-3xl font-bold text-slate-900 md:text-4xl"
                  >
                    {stop.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-2 max-w-md text-sm leading-relaxed text-slate-600"
                  >
                    {stop.description}
                  </motion.p>
                </div>

                {/* 360 badge */}
                <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="inline-block h-3.5 w-3.5 rounded-full border border-dashed"
                    style={{ borderColor: stop.hue }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">360° view</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* stop list */}
          <div className="flex flex-col justify-center gap-2 p-6 md:p-8">
            <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              <span className="h-px w-8 bg-emerald-500" /> Virtual tour
            </p>
            {tourStops.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                  active === i
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold"
                  style={{ background: `${s.hue}1a`, color: s.hue }}
                >
                  0{i + 1}
                </span>
                <span>
                  <span className={`block font-display font-bold ${active === i ? 'text-slate-900' : 'text-slate-500'}`}>
                    {s.name}
                  </span>
                  <span className="block text-xs text-slate-400">{s.stat}</span>
                </span>
                {active === i && (
                  <motion.span layoutId="tour-arrow" className="ml-auto text-emerald-600">
                    →
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Before / after patient recovery stories
   ============================================================ */
function StoryCard({ story, index }: { story: (typeof patientStories)[number]; index: number }) {
  const [after, setAfter] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            {story.name} <span className="font-normal text-slate-400">· {story.age}</span>
          </h3>
          <p className="text-xs uppercase tracking-wider text-slate-400">{story.condition}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
          {story.speciality}
        </span>
      </div>

      {/* before / after toggle */}
      <div className="mt-5 flex rounded-full border border-slate-200 bg-slate-50 p-1">
        {(['Before', 'After'] as const).map((label) => {
          const isAfter = label === 'After';
          const selected = after === isAfter;
          return (
            <button
              key={label}
              onClick={() => setAfter(isAfter)}
              className={`relative flex-1 rounded-full py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors ${
                selected ? 'text-white' : 'text-slate-500'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`ba-${story.id}`}
                  className={`absolute inset-0 rounded-full ${isAfter ? 'bg-emerald-600' : 'bg-slate-400'}`}
                  transition={{ duration: 0.35, ease }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={after ? 'a' : 'b'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-5 flex-1 text-sm leading-relaxed text-slate-600"
        >
          {after ? story.after : story.before}
        </motion.p>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>
          Hospital stay — <span className="font-bold text-slate-700">{story.days} days</span>
        </span>
        <span className={after ? 'text-emerald-600' : 'text-slate-400'}>{after ? '● Recovered' : '● At admission'}</span>
      </div>
    </motion.article>
  );
}

export function PatientStories() {
  return (
    <section id="stories" className="relative bg-slate-50 px-5 py-24 md:px-10">
      <div className="mb-12 md:flex md:items-end md:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            <span className="h-px w-8 bg-emerald-500" /> Patient stories
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Recovery,
            <br />
            <span className="text-slate-400">before &amp; after.</span>
          </h2>
        </div>
        <p className="mt-4 max-w-sm text-slate-500 md:mt-0">
          Real outcomes build real trust. Flip each story to see the difference clinical excellence makes.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {patientStories.map((s, i) => (
          <StoryCard key={s.id} story={s} index={i} />
        ))}
      </div>
    </section>
  );
}
