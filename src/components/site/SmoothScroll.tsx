'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';

type LenisContextValue = {
  scrollTo: (target: string | number, offset?: number) => void;
};

const LenisContext = createContext<LenisContextValue>({ scrollTo: () => {} });

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number, offset = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 });
    } else {
      // Reduced-motion fallback: jump natively
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView();
      } else {
        window.scrollTo(0, target);
      }
    }
  }, []);

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>;
}
