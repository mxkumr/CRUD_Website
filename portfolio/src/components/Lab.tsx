'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { labModules } from '@/lib/data';

function Terminal({ module }: { module: (typeof labModules)[number] }) {
  const [lines, setLines] = useState<string[]>([]);
  const [typed, setTyped] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines([]);
    setTyped('');

    const cmd = module.command;
    let i = 0;
    const typeCmd = () => {
      if (i <= cmd.length) {
        setTyped(cmd.slice(0, i));
        i++;
        timers.current.push(setTimeout(typeCmd, 22));
      } else {
        module.output.forEach((line, idx) => {
          timers.current.push(
            setTimeout(() => setLines((prev) => [...prev, line]), 260 + idx * 240)
          );
        });
      }
    };
    timers.current.push(setTimeout(typeCmd, 200));
    return () => timers.current.forEach(clearTimeout);
  }, [module]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0A0A10] font-mono text-[13px]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-mute">{module.id}@lab</span>
      </div>
      <div className="min-h-[180px] space-y-1.5 p-5 leading-relaxed">
        <p className="text-bone">
          <span className="text-accent-soft">➜</span> <span className="text-mute">~</span> {typed}
          {typed.length < module.command.length && <span className="caret" />}
        </p>
        {lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={l.startsWith('[!]') ? 'text-[#FF6B6B]' : 'text-bone/70'}
          >
            {l}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

export default function Lab() {
  const [active, setActive] = useState(0);
  const mod = labModules[active];

  return (
    <section id="lab" className="relative overflow-hidden border-y border-line bg-ink-2 py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#5b6cff 1px, transparent 1px), linear-gradient(90deg, #5b6cff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 06 — Security Lab ]</p>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
          <span className="text-gradient">I break things</span>{' '}
          <span className="text-outline">on purpose</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-2.5">
            {labModules.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`group flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                  active === i ? 'border-accent/50 bg-accent/10' : 'border-line bg-ink hover:border-bone/30'
                }`}
              >
                <div>
                  <p className={`font-display text-lg font-semibold ${active === i ? 'text-bone' : 'text-bone/80'}`}>{m.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-mute">{m.nodes} nodes mapped</p>
                </div>
                <span className={`font-mono text-lg transition-transform ${active === i ? 'translate-x-0 text-accent-soft' : '-translate-x-2 text-mute opacity-0 group-hover:opacity-100'}`}>
                  →
                </span>
              </button>
            ))}
          </div>

          <div>
            <Terminal module={mod} />
            <p className="mt-4 text-sm leading-relaxed text-mute">{mod.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
