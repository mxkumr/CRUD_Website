'use client';

import { motion } from 'framer-motion';
import { planets, type Planet } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;

function VentureCard({ planet, index }: { planet: Planet; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-8 md:p-10"
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: planet.hue }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* orbiting marker — the subtle "3D-ish" motif */}
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-line" />
            <motion.span
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full" style={{ background: planet.ringHue }} />
            </motion.span>
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: planet.hue }} />
          </span>
          <div>
            <h3 className="font-display text-3xl font-bold tracking-tight text-bone">{planet.name}</h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-mute">{planet.tagline}</p>
          </div>
        </div>
        <span className="font-mono text-xs text-mute">0{index + 1}</span>
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {planet.satellites.map((s) => (
          <div key={s.label} className="bg-ink p-5">
            <p className="font-display text-2xl font-bold text-bone">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Ventures() {
  return (
    <section id="ventures" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10">
      <div className="mb-14">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 04 — Ventures ]</p>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
          <span className="text-gradient">Two companies</span>{' '}
          <span className="text-outline">built from zero</span>
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {planets.map((p, i) => (
          <VentureCard key={p.id} planet={p} index={i} />
        ))}
      </div>
    </section>
  );
}
