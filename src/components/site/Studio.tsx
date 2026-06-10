'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pillars, studio, testimonials } from '@/lib/site-data';

function ScrollRevealStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className="flex max-w-4xl flex-wrap gap-x-[0.3em] gap-y-1 font-display text-2xl font-medium leading-snug text-bone md:text-4xl">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export default function Studio() {
  return (
    <section id="studio" className="relative border-t border-line px-5 py-24 md:px-10 md:py-36">
      <p className="mb-10 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
        <span className="h-px w-8 bg-volt" /> The studio
      </p>

      <ScrollRevealStatement text={studio.about} />

      {/* pillars */}
      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="hover"
            className="group bg-ink-soft p-7 transition-colors duration-500 hover:bg-ink-raise"
          >
            <span className="font-display text-xs tracking-widest text-volt">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-bone">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-dim transition-colors duration-500 group-hover:text-bone">
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* testimonials */}
      <div className="mt-24 md:mt-32">
        <h3 className="mb-10 font-display text-3xl font-bold uppercase tracking-tight text-bone md:text-5xl">
          What our clients <span className="font-serif font-normal normal-case italic text-volt">say</span>
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-line bg-ink-soft p-8 md:p-10"
            >
              <span aria-hidden className="absolute -top-6 right-4 font-serif text-[10rem] italic leading-none text-volt opacity-10">
                ”
              </span>
              <blockquote className="relative text-base leading-relaxed text-bone md:text-lg">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-volt font-display text-sm font-bold text-ink">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-bone">{t.name}</p>
                  <p className="font-display text-xs uppercase tracking-wider text-bone-dim">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
