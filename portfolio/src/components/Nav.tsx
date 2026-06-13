'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLenis } from './SmoothScroll';

const links = [
  { label: 'Work', target: '#work' },
  { label: 'Research', target: '#research' },
  { label: 'Ventures', target: '#ventures' },
  { label: 'Expertise', target: '#expertise' },
  { label: 'Timeline', target: '#timeline' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo } = useLenis();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(target, -10);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
        scrolled ? 'border-b border-line bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#hero" onClick={go('#hero')} className="group flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface font-display text-sm font-bold text-bone">
            M
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute transition-colors group-hover:text-bone">
            mkb
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.target}
              onClick={go(l.target)}
              className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={go('#contact')}
          className="group flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-accent/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Contact
        </a>
      </div>
    </motion.header>
  );
}
