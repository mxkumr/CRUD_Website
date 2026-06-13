'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Magnetic from './Magnetic';
import { useLenis } from './SmoothScroll';
import { contact } from '@/lib/site-data';

type NavLink = { label: string; target?: string; href?: string };

const links: NavLink[] = [
  { label: 'Work', target: '#work' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Capabilities', target: '#capabilities' },
  { label: 'Studio', target: '#studio' },
  { label: 'Contact', target: '#contact' },
];

const overlayEase = [0.76, 0, 0.24, 1] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo } = useLenis();

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

  const go = (target: string) => {
    setOpen(false);
    // wait for the overlay to start collapsing before scrolling
    setTimeout(() => scrollTo(target, -8), open ? 350 : 0);
  };

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
            <button
              data-cursor="hover"
              onClick={() => go('#top')}
              className="flex items-center"
              aria-label="CRUD Studio — back to top"
            >
              <Image
                src="/logo.png"
                alt="CRUD Studio"
                width={652}
                height={248}
                priority
                className="h-8 w-auto md:h-9"
              />
            </button>
          </Magnetic>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => {
              const inner = (
                <>
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="absolute left-0 top-full block text-volt transition-transform duration-300 group-hover:-translate-y-full">
                    {link.label}
                  </span>
                </>
              );
              const className =
                'group relative overflow-hidden font-display text-sm uppercase tracking-widest text-bone-dim transition-colors hover:text-bone';
              return link.href ? (
                <Link key={link.label} href={link.href} data-cursor="hover" className={className}>
                  {inner}
                </Link>
              ) : (
                <button key={link.label} data-cursor="hover" onClick={() => go(link.target!)} className={className}>
                  {inner}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                data-cursor="hover"
                onClick={() => go('#contact')}
                className="hidden rounded-full border border-line bg-bone px-5 py-2 font-display text-sm font-medium text-ink transition-colors duration-300 hover:bg-brand hover:text-bone md:block"
              >
                Start a project
              </button>
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
                      {link.href ? (
                        <Link
                          href={link.href}
                          data-cursor="hover"
                          onClick={() => setOpen(false)}
                          className={className}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <button data-cursor="hover" onClick={() => go(link.target!)} className={className}>
                          {inner}
                        </button>
                      )}
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
