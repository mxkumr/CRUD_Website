'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export type Step = { n: string; title: string; body: string; points?: string[] };

function StaticSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-[19px]" />
      <div className="flex flex-col gap-10 md:gap-12">
        {steps.map((step) => (
          <div
            key={step.n}
            className="relative grid grid-cols-1 gap-4 pl-12 md:grid-cols-[1fr_1.4fr] md:gap-10 md:pl-16"
          >
            <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-ink-soft font-display text-xs font-bold text-volt md:h-10 md:w-10 md:text-sm">
              {step.n}
            </span>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone md:text-3xl">
              {step.title}
            </h3>
            <div>
              <p className="max-w-xl text-base leading-relaxed text-bone-dim">{step.body}</p>
              {step.points && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line px-3 py-1 font-display text-[11px] uppercase tracking-wider text-bone-dim"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Compact scroll-scrubbed process: Discover shows first, then each
 * following step as you scroll through a short sticky track — not a
 * full-page scrolljack section.
 */
export default function ProcessSteps({ steps }: { steps: Step[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.55', 'end 0.45'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!steps.length) return;
    // Hold step 0 briefly at the start, then advance evenly.
    const held = Math.max(0, (v - 0.04) / 0.96);
    const next = Math.min(steps.length - 1, Math.floor(held * steps.length));
    setActive(next);
  });

  if (reduced) return <StaticSteps steps={steps} />;

  const step = steps[active] ?? steps[0];
  // ~38vh per step → ~152vh for 4 steps. Short enough to feel local.
  const trackVh = Math.max(steps.length, 2) * 38;

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${trackVh}vh` }}
      aria-label="Process steps"
    >
      <div className="sticky top-24 flex min-h-[18rem] flex-col justify-center md:top-28 md:min-h-[22rem]">
        {/* step index pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Process progress">
          {steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <span
                key={s.n}
                role="tab"
                aria-selected={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-display text-[10px] uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'border-volt bg-volt text-ink'
                    : isDone
                      ? 'border-volt/40 text-volt'
                      : 'border-line text-bone-dim'
                }`}
              >
                <span className="tabular-nums">{s.n}</span>
                <span className="hidden sm:inline">{s.title}</span>
              </span>
            );
          })}
        </div>

        {/* progress line */}
        <div className="relative mb-8 h-px w-full max-w-xl overflow-hidden bg-line" aria-hidden>
          <motion.div
            className="absolute inset-y-0 left-0 origin-left bg-volt"
            style={{ scaleX: lineScale }}
          />
        </div>

        <div className="relative min-h-[11rem] md:min-h-[12rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease }}
              className="grid grid-cols-1 gap-5 md:grid-cols-[0.9fr_1.3fr] md:gap-12"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-volt/50 bg-ink-soft font-display text-sm font-bold text-volt">
                  {step.n}
                </span>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-5xl">
                  {step.title}
                </h3>
              </div>
              <div>
                <p className="max-w-xl text-base leading-relaxed text-bone-dim md:text-lg">{step.body}</p>
                {step.points && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.points.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-line px-3.5 py-1.5 font-display text-[11px] uppercase tracking-wider text-bone-dim"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 font-display text-[10px] uppercase tracking-[0.25em] text-bone-dim">
          Scroll to continue · {active + 1} / {steps.length}
        </p>
      </div>
    </div>
  );
}
