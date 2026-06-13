'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { identity } from '@/lib/data';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <section id="contact" ref={ref} className="grain relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-soft"
        >
          [ 08 — Let&apos;s talk ]
        </motion.p>

        <motion.h2
          style={{ y, scale }}
          className="mx-auto mt-8 max-w-5xl font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-tighter md:text-[8rem]"
        >
          <span className="text-gradient">Let&apos;s build</span>
          <br />
          <span className="text-outline">something extraordinary</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-mute"
        >
          Whether it&apos;s research, a venture, a product, or breaking something before an attacker does — if it&apos;s
          ambitious, I want to hear about it.
        </motion.p>

        <motion.a
          href={`mailto:${identity.email}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-bone px-9 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.03]"
        >
          {identity.email}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.a>

        <p className="mx-auto mt-20 max-w-2xl font-display text-xl font-medium tracking-tight text-bone/60 md:text-2xl">
          {identity.thesis}
        </p>
      </div>

      <footer className="relative mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:flex-row">
        <span>© {new Date().getFullYear()} {identity.name}</span>
        <span>Designed &amp; built end-to-end</span>
      </footer>
    </section>
  );
}
