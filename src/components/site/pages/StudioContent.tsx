'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageShell from '../PageShell';
import PageHero from '../PageHero';
import SectionHeading from '../SectionHeading';
import StatStrip from '../StatStrip';
import { pillars, testimonials, studio } from '@/lib/site-data';
import { studioPage } from '@/lib/pages-data';

const ease = [0.22, 1, 0.36, 1] as const;

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function ScrollRevealStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className="flex max-w-4xl flex-wrap gap-x-[0.3em] gap-y-1 font-display text-2xl font-medium leading-snug text-bone md:text-4xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

export default function StudioContent() {
  return (
    <PageShell>
      <PageHero
        eyebrow={studioPage.eyebrow}
        titleTop={studioPage.titleTop}
        titleAccent={studioPage.titleAccent}
        titleBottom={studioPage.titleBottom}
        lede={studioPage.lede}
      />

      {/* mission scroll statement */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <p className="mb-10 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
          <span className="h-px w-8 bg-volt" /> Our mission
        </p>
        <ScrollRevealStatement text={studioPage.mission} />
      </section>

      {/* stats */}
      <section className="px-5 pb-8 md:px-10">
        <StatStrip stats={studioPage.stats} />
      </section>

      {/* principles */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="What we believe">
          The principles we <span className="font-serif font-normal normal-case italic text-volt">live by</span>
        </SectionHeading>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {studioPage.principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease }}
              className="group rounded-2xl border border-line bg-ink-soft p-8 transition-colors duration-500 hover:bg-ink-raise md:p-10"
            >
              <span className="font-display text-xs tracking-widest text-volt">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone">{p.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-bone-dim transition-colors duration-500 group-hover:text-bone">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="The journey">
          How we got <span className="font-serif font-normal normal-case italic text-volt">here</span>
        </SectionHeading>
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {studioPage.timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="relative rounded-2xl border border-line bg-ink-soft p-7"
            >
              <span className="font-display text-4xl font-bold tracking-tight text-volt md:text-5xl">
                {t.year}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-bone">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* what makes us different (pillars) */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="Why teams choose us">
          Built different, <span className="font-serif font-normal normal-case italic text-volt">on purpose</span>
        </SectionHeading>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="group bg-ink-soft p-7 transition-colors duration-500 hover:bg-ink-raise"
            >
              <span className="font-display text-xs tracking-widest text-volt">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-bone">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim transition-colors duration-500 group-hover:text-bone">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* testimonials */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="In their words">
          What our clients <span className="font-serif font-normal normal-case italic text-volt">say</span>
        </SectionHeading>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="relative overflow-hidden rounded-2xl border border-line bg-ink-soft p-8 md:p-10"
            >
              <span aria-hidden className="absolute -top-6 right-4 font-serif text-[10rem] italic leading-none text-volt opacity-10">
                ”
              </span>
              <blockquote className="relative text-base leading-relaxed text-bone md:text-lg">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-volt font-display text-sm font-bold text-ink">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-bone">{t.name}</p>
                  <p className="font-display text-xs uppercase tracking-wider text-bone-dim">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-16 max-w-2xl font-serif text-2xl italic leading-snug text-bone-dim md:text-3xl">
          “{studio.manifesto}”
        </p>
      </section>
    </PageShell>
  );
}
