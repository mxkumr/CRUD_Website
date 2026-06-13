'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import type { Stat } from '@/lib/pages-data';

const ease = [0.22, 1, 0.36, 1] as const;

const NUM_RE = /^([^\d]*)([\d.,]+)(.*)$/;

/** Counts up the leading number inside a value like "250+" or "4.9★". */
function AnimatedValue({ value, play }: { value: string; play: boolean }) {
  const parts = NUM_RE.exec(value);
  const [display, setDisplay] = useState(parts ? `${parts[1]}0${parts[3]}` : value);

  useEffect(() => {
    const match = NUM_RE.exec(value);
    if (!match || !play) return;
    const [, prefix, numStr, suffix] = match;
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const target = parseFloat(numStr.replace(/,/g, ''));

    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [value, play]);

  if (!parts) return <>{value}</>;
  return <>{display}</>;
}

export default function StatStrip({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.08, ease }}
          className="bg-ink-soft p-7 md:p-9"
        >
          <p className="font-display text-4xl font-bold tracking-tight text-volt md:text-6xl">
            <AnimatedValue value={stat.value} play={inView} />
          </p>
          <p className="mt-3 font-display text-sm font-semibold uppercase tracking-wider text-bone">
            {stat.label}
          </p>
          {stat.sub && <p className="mt-1 text-sm leading-relaxed text-bone-dim">{stat.sub}</p>}
        </motion.div>
      ))}
    </div>
  );
}
