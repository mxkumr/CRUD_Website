'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lineEase = [0.65, 0, 0.13, 1] as const;

function RevealLine({
  children,
  delay,
  className = '',
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '110%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1, delay, ease: lineEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Large editorial hero used at the top of every standalone page.
 * `titleAccent` renders as the italic serif highlight word/phrase.
 */
export default function PageHero({
  eyebrow,
  titleTop,
  titleAccent,
  titleBottom,
  lede,
}: {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  titleBottom: string;
  lede: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-52"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(217,255,63,0.12) 0%, transparent 65%)' }}
      />

      <motion.div style={{ y, opacity: fade }} className="relative">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-volt" />
          <RevealLine delay={0.1} className="font-display text-xs uppercase tracking-[0.35em] text-bone-dim">
            {eyebrow}
          </RevealLine>
        </div>

        <h1 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-bone">
          <RevealLine delay={0.18} className="text-[12vw] md:text-[7.5vw]">
            {titleTop}
          </RevealLine>
          <RevealLine delay={0.28} className="text-[12vw] md:text-[7.5vw]">
            <span className="font-serif font-normal normal-case italic text-volt">{titleAccent} </span>
            {titleBottom}
          </RevealLine>
        </h1>

        <RevealLine
          delay={0.5}
          className="mt-10 max-w-2xl text-base leading-relaxed text-bone-dim md:text-lg"
        >
          {lede}
        </RevealLine>
      </motion.div>
    </section>
  );
}
