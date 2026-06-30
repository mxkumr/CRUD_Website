'use client';

import { motion } from 'framer-motion';
import { clientTestimonials, type ClientTestimonial } from '@/lib/site-data';

type TestimonialsMarqueeProps = {
  items?: ClientTestimonial[];
  /** Optional small label rendered above the marquee */
  label?: string;
  /** Seconds for one full loop */
  speed?: number;
  className?: string;
};

export default function TestimonialsMarquee({
  items = clientTestimonials,
  label,
  speed = 110,
  className = '',
}: TestimonialsMarqueeProps) {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <p className="mb-6 flex items-center gap-3 px-5 font-display text-xs uppercase tracking-[0.3em] text-bone-dim md:px-10">
          <span className="h-px w-8 bg-volt" /> {label}
        </p>
      )}

      <div className="relative overflow-hidden">
        {/* edge fades so cards dissolve at the viewport borders */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-28"
        />

        <div
          className="flex w-max animate-marquee gap-4 will-change-transform hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
              {items.map((t, i) => (
                <motion.figure
                  key={`${copy}-${t.name}`}
                  initial={copy === 0 ? { opacity: 0, y: 24 } : false}
                  whileInView={copy === 0 ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
                  data-cursor="hover"
                  className="flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-line bg-ink-soft/80 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-ink-raise md:w-[360px]"
                >
                  <blockquote className="text-sm leading-relaxed text-bone-dim">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-volt font-display text-xs font-bold text-ink">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-bone">{t.name}</p>
                      <p className="font-display text-[0.65rem] uppercase tracking-wider text-bone-dim">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
