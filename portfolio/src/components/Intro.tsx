'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const metrics = [
  { value: 9.14, suffix: 'B', label: 'Interactions analyzed', decimals: 2 },
  { value: 50, suffix: '+', label: 'Projects shipped', decimals: 0 },
  { value: 50, suffix: '+', label: 'Workshops delivered', decimals: 0 },
  { value: 2, suffix: '', label: 'Ventures founded', decimals: 0 },
];

function Counter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN((value * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

const words = 'I build at the intersection of security, design and research — where rigour meets craft.'.split(' ');

export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 01 — Profile ]</p>

      <p ref={ref} className="max-w-4xl font-display text-3xl font-medium leading-[1.25] tracking-tight md:text-5xl">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            >
              {w === 'security,' || w === 'design' || w === 'research' ? (
                <span className="text-accent-soft">{w}&nbsp;</span>
              ) : (
                <span className="text-bone">{w}&nbsp;</span>
              )}
            </motion.span>
          </span>
        ))}
      </p>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-ink-2 p-7"
          >
            <p className="font-display text-4xl font-bold text-bone md:text-5xl">
              <Counter value={m.value} suffix={m.suffix} decimals={m.decimals} />
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-mute">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
