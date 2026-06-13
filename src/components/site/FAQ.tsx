'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export type FaqItem = { q: string; a: string };

function Row({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      className="border-b border-line"
    >
      <button
        data-cursor="hover"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="font-display text-lg font-semibold tracking-tight text-bone md:text-2xl">
          {item.q}
        </span>
        <span
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 ${
            open ? 'bg-volt text-ink' : 'text-bone-dim'
          }`}
        >
          <span className="absolute h-px w-3.5 bg-current" />
          <span
            className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${
              open ? 'rotate-90' : ''
            }`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-base leading-relaxed text-bone-dim">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <Row key={item.q} item={item} index={i} />
      ))}
    </div>
  );
}
