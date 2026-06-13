'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export type Step = { n: string; title: string; body: string; points?: string[] };

/** Vertical, scroll-revealed process timeline with a running connector. */
export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      {/* connector line */}
      <div aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-[19px]" />
      <div className="flex flex-col gap-12 md:gap-16">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.06, ease }}
            className="relative grid grid-cols-1 gap-5 pl-12 md:grid-cols-[1fr_1.4fr] md:gap-12 md:pl-16"
          >
            {/* node */}
            <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-ink-soft font-display text-xs font-bold text-volt md:h-10 md:w-10 md:text-sm">
              {step.n}
            </span>

            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone md:text-4xl">
              {step.title}
            </h3>
            <div>
              <p className="max-w-xl text-base leading-relaxed text-bone-dim">{step.body}</p>
              {step.points && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {step.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line px-4 py-1.5 font-display text-xs uppercase tracking-wider text-bone-dim"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
