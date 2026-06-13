'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/lib/data';

function Row({ era, index }: { era: (typeof timeline)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[64px_1fr] gap-6 pb-12 md:grid-cols-[120px_1fr] md:gap-10"
    >
      <div className="text-right">
        <p className="font-display text-2xl font-bold text-bone md:text-4xl">{era.year}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{era.era}</p>
      </div>

      {/* node */}
      <div className="absolute left-[64px] top-2 -translate-x-1/2 md:left-[120px]">
        <span className="block h-3 w-3 rounded-full border-2 border-accent bg-ink" />
      </div>

      <div className="pl-6 md:pl-10">
        <h3 className="font-display text-xl font-semibold text-bone md:text-2xl">{era.title}</h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-mute">{era.body}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="timeline" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10">
      <div className="mb-16">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 07 — Timeline ]</p>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
          <span className="text-gradient">2019</span> <span className="text-outline">→ 2026</span>
        </h2>
      </div>

      <div ref={ref} className="relative">
        {/* track */}
        <div className="absolute left-[64px] top-0 h-full w-px -translate-x-1/2 bg-line md:left-[120px]" aria-hidden />
        <motion.div
          aria-hidden
          style={{ height }}
          className="absolute left-[64px] top-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent to-accent/0 md:left-[120px]"
        />
        {timeline.map((era, i) => (
          <Row key={era.year} era={era} index={i} />
        ))}
      </div>
    </section>
  );
}
