'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { services } from '@/lib/site-data';

const ease = [0.22, 1, 0.36, 1] as const;

function Preview({ activeIndex }: { activeIndex: number }) {
  const service = services[activeIndex];
  const [h1, h2] = service.hues;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-ink-soft">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={service.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* morphing gradient blobs */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${h1}40 0%, transparent 65%)` }}
            animate={{ x: ['-55%', '-40%', '-55%'], y: ['-55%', '-45%', '-55%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${h2}33 0%, transparent 65%)` }}
            animate={{ x: ['-30%', '-60%', '-30%'], y: ['-40%', '-60%', '-40%'] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* rotating dashed orbit */}
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed opacity-30"
            style={{ borderColor: h1 }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="font-display text-sm tracking-[0.4em]" style={{ color: h1 }}>
              {service.index}
            </span>
            <span className="font-serif text-4xl italic text-bone md:text-5xl">
              {service.title}
            </span>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {service.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease }}
                  className="rounded-full border border-line bg-ink/50 px-4 py-1.5 font-display text-xs uppercase tracking-wider text-bone-dim backdrop-blur-sm"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Capabilities() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const activeIndex = hoverIndex ?? scrollIndex;

  return (
    <section id="capabilities" className="relative border-t border-line px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="mb-4 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
          <span className="h-px w-8 bg-volt" /> What we do best
        </p>
        <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-7xl">
          One-stop <span className="font-serif font-normal normal-case italic text-volt">digital</span>
          <br />
          Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* sticky dynamic preview - desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-28 h-[calc(100vh-9rem)] min-h-[28rem]">
            <Preview activeIndex={activeIndex} />
          </div>
        </div>

        {/* scroll-bound service list */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              onViewportEnter={() => setScrollIndex(i)}
              viewport={{ amount: 0.6, margin: '-10% 0px -10% 0px' }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              data-cursor="hover"
              className={`group border-b border-line py-12 transition-colors duration-500 md:py-16 lg:min-h-[60vh] lg:py-20 ${
                activeIndex === i ? 'opacity-100' : 'lg:opacity-40'
              }`}
            >
              <div className="flex items-baseline gap-5">
                <span
                  className="font-display text-sm tracking-widest transition-colors duration-300"
                  style={{ color: activeIndex === i ? service.hues[0] : undefined }}
                >
                  {service.index}
                </span>
                <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-bone transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
                  {service.title}
                </h3>
              </div>
              <p className="mt-5 max-w-md pl-10 text-base leading-relaxed text-bone-dim md:pl-12">
                {service.description}
              </p>

              {/* inline preview for mobile/tablet */}
              <div className="mt-6 flex flex-wrap gap-2 pl-10 md:pl-12 lg:hidden">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-4 py-1.5 font-display text-xs uppercase tracking-wider text-bone-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
