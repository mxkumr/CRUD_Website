'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Shared eyebrow + headline used to open content sections. */
export default function SectionHeading({
  eyebrow,
  children,
  align = 'left',
  className = '',
}: {
  eyebrow: string;
  children: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease }}
      className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      <p
        className={`mb-4 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-8 bg-volt" /> {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-6xl">
        {children}
      </h2>
    </motion.div>
  );
}
