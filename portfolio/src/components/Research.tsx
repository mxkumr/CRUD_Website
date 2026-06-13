'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { research } from '@/lib/data';

/* contained starfield → clusters; loops gently, no scroll-jack */
function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; r: number; tw: number; cluster: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    if (!starsRef.current.length) {
      starsRef.current = Array.from({ length: 520 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        cluster: Math.floor(Math.random() * 5),
      }));
    }
    const centers = Array.from({ length: 5 }, (_, i) => ({
      x: 0.5 + 0.32 * Math.cos((i / 5) * Math.PI * 2),
      y: 0.5 + 0.28 * Math.sin((i / 5) * Math.PI * 2),
    }));

    let raf = 0;
    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      // organization oscillates slowly between chaos and order
      const org = 0.5 + Math.sin(time * 0.00018) * 0.5;

      for (const s of starsRef.current) {
        const c = centers[s.cluster];
        const px = (s.x + (c.x - s.x) * org * 0.8) * w;
        const py = (s.y + (c.y - s.y) * org * 0.8) * h;
        const tw = 0.5 + Math.sin(time * 0.0013 + s.tw) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, s.r * dpr, 0, Math.PI * 2);
        const hue = s.cluster % 2 === 0 ? '139,150,255' : '236,234,227';
        ctx.fillStyle = `rgba(${hue},${(0.3 + org * 0.4) * tw})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}

function BigNumber() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState('0.00');
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN((research.headlineNumber * eased).toFixed(2));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}

export default function Research() {
  return (
    <section id="research" className="relative overflow-hidden border-y border-line bg-ink-2 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 03 — Research ]</p>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex items-end gap-3">
              <h2 className="font-display text-7xl font-bold leading-none tracking-tighter text-bone md:text-[9rem]">
                <BigNumber />
              </h2>
              <span className="mb-3 font-display text-3xl font-bold text-accent-soft md:text-5xl">{research.headlineUnit}</span>
            </div>
            <p className="mt-2 font-mono text-sm uppercase tracking-[0.3em] text-mute">{research.headlineLabel}</p>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-mute">
              A planetary-scale study of how open-source communities collaborate across natural languages — the
              data pipeline, analysis and findings behind a first-author paper.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-6 py-4">
              <span className="font-display text-3xl font-bold text-bone">{research.venue}</span>
              <span className="h-8 w-px bg-line" />
              <span className="font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-accent-soft">
                {research.venueDetail}
                <br />
                {research.topic}
              </span>
            </div>
          </div>

          {/* data field + beats */}
          <div>
            <div className="relative h-64 overflow-hidden rounded-3xl border border-line bg-ink">
              <DataField />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(70% 70% at 50% 50%, transparent 50%, #08080b)' }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {research.storyBeats.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-line bg-ink p-4"
                >
                  <p className="font-display text-xl font-bold text-bone">
                    <span className="text-accent-soft">{b.stat}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-mute">{b.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
