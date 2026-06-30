'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Magnetic from './Magnetic';
import CrudLogo from './CrudLogo';
import { contact } from '@/lib/site-data';

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' },
];

const overlayEase = [0.76, 0, 0.24, 1] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { scrollY } = useScroll();

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('crud-theme')) as
      | 'dark'
      | 'light'
      | null;
    const initial = stored ?? 'dark';
    setTheme(initial);
    document.documentElement.classList.toggle('theme-light', initial === 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('crud-theme', next);
      } catch {
        /* ignore */
      }
      document.documentElement.classList.toggle('theme-light', next === 'light');
      return next;
    });
  };

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > 480 && latest > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: overlayEase }}
      >
        <div
          className={`flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-10 ${
            scrolled && !open ? 'bg-ink/70 backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <Magnetic strength={0.25}>
            <Link
              href="/"
              data-cursor="hover"
              className="flex items-center"
              aria-label="CRUD Studio - home"
            >
              <CrudLogo priority />
            </Link>
          </Magnetic>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                data-cursor="hover"
                className="group relative overflow-hidden font-display text-sm uppercase tracking-widest text-bone-dim transition-colors hover:text-bone"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute left-0 top-full block text-volt transition-transform duration-300 group-hover:-translate-y-full">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                type="button"
                data-cursor="hover"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line bg-ink-soft/80 text-bone backdrop-blur transition-colors hover:text-volt"
              >
                {/* Sun (shown in dark mode → click for light) */}
                <span
                  className={`absolute transition-all duration-500 ${
                    theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                    </g>
                  </svg>
                </span>
                {/* Moon (shown in light mode → click for dark) */}
                <span
                  className={`absolute transition-all duration-500 ${
                    theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                data-cursor="hover"
                className="hidden rounded-full border border-line bg-bone px-5 py-2 font-display text-sm font-medium text-ink transition-colors duration-300 hover:bg-brand hover:text-bone md:block"
              >
                Start a project
              </Link>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                data-cursor="hover"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-soft/80 backdrop-blur"
              >
                <span
                  className={`absolute h-px w-4 bg-bone transition-all duration-300 ${
                    open ? 'rotate-45' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`absolute h-px w-4 bg-bone transition-all duration-300 ${
                    open ? '-rotate-45' : 'translate-y-1'
                  }`}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink-soft px-5 pb-10 pt-28 md:px-10"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: overlayEase }}
          >
            <nav className="flex flex-col" aria-label="Menu">
              {links.map((link, i) => {
                const inner = (
                  <>
                    <span className="font-display text-sm text-volt">0{i + 1}</span>
                    <span className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-bone transition-transform duration-500 group-hover:translate-x-4 md:text-8xl">
                      {link.label}
                    </span>
                    <span className="ml-auto hidden font-serif text-2xl italic text-bone-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                      →
                    </span>
                  </>
                );
                const className = 'group flex w-full items-baseline gap-4 py-4 text-left md:py-6';
                return (
                  <div key={link.label} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.6, delay: 0.08 * i + 0.15, ease: overlayEase }}
                    >
                      <Link
                        href={link.href}
                        data-cursor="hover"
                        onClick={() => setOpen(false)}
                        className={className}
                      >
                        {inner}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <p className="font-display text-xs uppercase tracking-widest text-bone-dim">
                  New business
                </p>
                <a
                  data-cursor="hover"
                  href={`mailto:${contact.email}`}
                  className="font-serif text-2xl italic text-bone underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex gap-6">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    data-cursor="hover"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-xs uppercase tracking-widest text-bone-dim transition-colors hover:text-volt"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
