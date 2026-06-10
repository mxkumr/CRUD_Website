'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import Magnetic from './Magnetic';
import TestimonialsMarquee from './TestimonialsMarquee';
import { useLenis } from './SmoothScroll';
import { differentiators, studio } from '@/lib/site-data';

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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollTo } = useLenis();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden"
    >
      <HeroCanvas />

      {/* radial vignette so type stays readable over the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(13,13,11,0.55) 0%, rgba(13,13,11,0) 70%)',
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pt-28 md:px-10">
        <motion.div style={{ y: headlineY, opacity: fade }}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-volt" />
            <RevealLine delay={0.1} className="font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
              {studio.acronym}
            </RevealLine>
          </div>

          <h1 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-bone">
            <RevealLine delay={0.2} className="text-[13.5vw] md:text-[9vw]">
              Ideas to
            </RevealLine>
            <RevealLine delay={0.32} className="text-[13.5vw] md:text-[9vw]">
              <span className="font-serif font-normal normal-case italic text-volt">Iconic </span>
              Brands
            </RevealLine>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <RevealLine delay={0.5} className="max-w-md text-base leading-relaxed text-bone-dim md:text-lg">
              {studio.heroLede}
            </RevealLine>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: lineEase }}
            >
              <Magnetic strength={0.35}>
                <button
                  data-cursor="hover"
                  onClick={() => scrollTo('#work')}
                  className="group relative overflow-hidden rounded-full bg-volt px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-ink"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-bone">
                    See the work
                  </span>
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-raise transition-transform duration-400 ease-out group-hover:scale-y-100" />
                </button>
              </Magnetic>
              <Magnetic strength={0.35}>
                <button
                  data-cursor="hover"
                  onClick={() => scrollTo('#contact')}
                  className="rounded-full border border-line px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-bone transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
                >
                  Start a project
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* client testimonials marquee */}
      <motion.div
        className="relative z-10 border-t border-line py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <TestimonialsMarquee label="Trusted by businesses across Chennai" />
      </motion.div>

      {/* differentiators marquee */}
      <motion.div
        className="relative z-10 border-t border-line py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex w-max animate-marquee gap-0 will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {differentiators.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 px-6 font-display text-sm uppercase tracking-widest text-bone-dim"
                >
                  {item}
                  <span className="text-volt">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
