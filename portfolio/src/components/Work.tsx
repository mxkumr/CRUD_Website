'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { designProjects, type DesignProject } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;

function WorkCard({ project, index }: { project: DesignProject; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 160, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink-2 p-7 transition-colors hover:border-accent/40 md:min-h-[340px]"
    >
      {/* hue wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 100% at 80% 0%, ${project.hue}1f 0%, transparent 55%)` }}
      />
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-40"
        style={{ background: project.hue }}
      />

      <div className="relative flex items-start justify-between">
        <span className="rounded-full border border-line bg-ink/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mute backdrop-blur">
          {project.type}
        </span>
        <span className="font-mono text-[11px] text-mute">0{index + 1}</span>
      </div>

      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        <h3 className="font-display text-4xl font-bold tracking-tight text-bone md:text-5xl">{project.name}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.layers.map((layer) => (
            <span
              key={layer}
              className="translate-y-1 rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mute opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {layer}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 02 — Selected Work ]</p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
            <span className="text-gradient">Things</span> <span className="text-outline">I&apos;ve made</span>
          </h2>
        </div>
        <p className="max-w-sm text-mute">
          Product design and engineering across fashion, education, healthcare and internal tooling — research to shipped.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {designProjects.map((p, i) => (
          <WorkCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
