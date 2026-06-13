'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

type LenisContextValue = {
  scrollTo: (target: string, offset?: number) => void;
};

const LenisContext = createContext<LenisContextValue>({ scrollTo: () => {} });

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string, offset = 0) => {
    lenisRef.current?.scrollTo(target, { offset, duration: 1.4 });
  };

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>;
}
