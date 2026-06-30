'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { hospital, metrics } from '@/lib/medinova-data';

/* ---------- animated counter ---------- */
function CountUp({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((value * eased).toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ---------- looping ECG trace ---------- */
function EcgTrace({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" fill="none" className={className} aria-hidden>
      <motion.path
        d="M0 20 H40 L48 20 56 6 64 34 72 20 H110 L118 20 126 10 132 30 138 20 H200"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: [0, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

/* ---------- floating vitals card ---------- */
function VitalsCard({
  title,
  value,
  unit,
  delay,
  className = '',
  children,
}: {
  title: string;
  value: string;
  unit: string;
  delay: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-44 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-xl shadow-emerald-900/5 backdrop-blur-xl"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
        <p className="mt-1 font-display text-2xl font-bold text-slate-900">
          {value} <span className="text-xs font-medium text-slate-400">{unit}</span>
        </p>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- rotating 3D ecosystem ---------- */
function Ecosystem() {
  const nodes = [
    { label: '+', hue: '#059669', size: 44 },
    { label: '♥', hue: '#10B981', size: 38 },
    { label: '✚', hue: '#0D9488', size: 34 },
    { label: '◉', hue: '#14B8A6', size: 40 },
    { label: '✦', hue: '#0891B2', size: 32 },
    { label: '+', hue: '#34D399', size: 36 },
  ];

  return (
    <div className="relative h-[420px] w-[420px] max-w-full" style={{ perspective: 1200 }} aria-hidden>
      {/* tilted plane holds the rings */}
      <div className="absolute inset-0" style={{ transform: 'rotateX(58deg)', transformStyle: 'preserve-3d' }}>
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border"
            style={{
              inset: `${ring * 56}px`,
              borderColor: `rgba(5, 150, 105, ${0.35 - ring * 0.09})`,
              boxShadow: `0 0 ${40 - ring * 10}px rgba(16,185,129,0.1) inset`,
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 26 + ring * 10, repeat: Infinity, ease: 'linear' }}
          >
            {nodes.slice(ring * 2, ring * 2 + 2).map((node, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${i * 180}deg)`, transformOrigin: `50% ${(210 - ring * 56)}px` }}
              >
                {/* counter-rotate so badges stay upright on the tilted plane */}
                <motion.div
                  animate={{ rotate: ring % 2 === 0 ? -360 : 360 }}
                  transition={{ duration: 26 + ring * 10, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center justify-center rounded-2xl border border-white font-display font-bold text-white shadow-lg backdrop-blur-md"
                  style={{
                    width: node.size,
                    height: node.size,
                    background: `linear-gradient(135deg, ${node.hue}, ${node.hue}cc)`,
                    boxShadow: `0 8px 28px ${node.hue}55`,
                    transform: 'rotateX(-58deg)',
                  }}
                >
                  {node.label}
                </motion.div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* glowing core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-28 w-28 items-center justify-center rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #6EE7B7 0%, #059669 45%, #047857 100%)',
            boxShadow: '0 0 80px rgba(16,185,129,0.4), 0 0 160px rgba(16,185,129,0.18)',
          }}
        >
          <span className="font-display text-4xl font-bold text-white">+</span>
        </motion.div>
        {/* pulse rings */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-emerald-400/50"
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  );
}

export default function MediHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pt-40">
      {/* ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 75% 15%, rgba(16,185,129,0.12) 0%, transparent 60%), radial-gradient(50% 40% at 12% 80%, rgba(13,148,136,0.1) 0%, transparent 60%)',
        }}
      />
      {/* grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
        {/* copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Emergency open 24×7 - call {hospital.emergency}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-slate-900 md:text-7xl">
            {['Healthcare,', 'engineered'].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.65, 0, 0.13, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.34, ease: [0.65, 0, 0.13, 1] }}
              >
                for humans.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-slate-500"
          >
            {hospital.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#book"
              className="group relative overflow-hidden rounded-full bg-emerald-600 px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/20 transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">Book appointment</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#doctors"
              className="rounded-full border border-slate-300 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-700 transition-colors hover:border-emerald-500 hover:text-emerald-700"
            >
              Find a doctor
            </a>
          </motion.div>

          {/* metrics */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-200 pt-8 sm:grid-cols-4"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-slate-400">{m.label}</dt>
                <dd className="font-display text-3xl font-bold text-slate-900">
                  <CountUp value={m.value} suffix={m.suffix} decimals={'decimals' in m ? m.decimals : 0} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* 3D ecosystem + floating vitals */}
        <motion.div style={{ y: orbY, opacity: fade }} className="relative mx-auto flex items-center justify-center">
          <Ecosystem />

          <VitalsCard title="Heart rate" value="72" unit="bpm" delay={0.9} className="-left-2 top-6 md:left-0">
            <EcgTrace className="mt-2 h-8 w-full text-emerald-500" />
          </VitalsCard>

          <VitalsCard title="Blood oxygen" value="98.4" unit="% SpO₂" delay={1.1} className="-right-2 top-1/3 md:right-0">
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                initial={{ width: '0%' }}
                animate={{ width: '98%' }}
                transition={{ duration: 1.4, delay: 1.3, ease: 'easeOut' }}
              />
            </div>
          </VitalsCard>

          <VitalsCard title="Next OT slot" value="09:30" unit="today" delay={1.3} className="bottom-4 left-8 md:bottom-8">
            <p className="mt-1 text-[11px] font-medium text-emerald-600">● 14 doctors available now</p>
          </VitalsCard>
        </motion.div>
      </div>
    </section>
  );
}
