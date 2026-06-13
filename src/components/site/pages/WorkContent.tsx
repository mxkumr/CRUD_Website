'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../PageShell';
import PageHero from '../PageHero';
import SectionHeading from '../SectionHeading';
import StatStrip from '../StatStrip';
import ProcessSteps from '../ProcessSteps';
import FAQ from '../FAQ';
import WorkGrid from '../WorkGrid';
import TestimonialsMarquee from '../TestimonialsMarquee';
import { workPage } from '@/lib/pages-data';
import { industries } from '@/lib/showcase-data';

const ease = [0.22, 1, 0.36, 1] as const;

export default function WorkContent() {
  return (
    <PageShell>
      <PageHero
        eyebrow={workPage.eyebrow}
        titleTop={workPage.titleTop}
        titleAccent={workPage.titleAccent}
        titleBottom={workPage.titleBottom}
        lede={workPage.lede}
      />

      {/* headline stats */}
      <section className="px-5 pb-8 md:px-10">
        <StatStrip stats={workPage.stats} />
      </section>

      {/* approach */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="How we deliver">
          A different way <span className="font-serif font-normal normal-case italic text-volt">to work</span>
        </SectionHeading>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {workPage.approach.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="group rounded-2xl border border-line bg-ink-soft p-8 transition-colors duration-500 hover:bg-ink-raise"
            >
              <span className="font-display text-xs tracking-widest text-volt">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-bone-dim">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* selected works grid (reused homepage section) */}
      <WorkGrid />

      {/* outcomes band */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="Results, not vanity">
          Outcomes we’re <span className="font-serif font-normal normal-case italic text-volt">proud</span> of
        </SectionHeading>
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {workPage.outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="rounded-2xl border border-line bg-ink-soft p-7"
            >
              <p className="font-display text-4xl font-bold tracking-tight text-bone md:text-5xl">{o.metric}</p>
              <p className="mt-3 font-display text-sm font-semibold uppercase tracking-wider text-volt">{o.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-bone-dim">{o.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="The process">
          From brief <span className="font-serif font-normal normal-case italic text-volt">to</span> launch
        </SectionHeading>
        <div className="mt-16">
          <ProcessSteps steps={workPage.process} />
        </div>
      </section>

      {/* industries served */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Industries we serve">
            Built for <span className="font-serif font-normal normal-case italic text-volt">every</span> sector
          </SectionHeading>
          <Link
            href="/showcase"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-widest text-bone backdrop-blur-sm transition-colors hover:border-volt hover:text-volt"
          >
            Explore live concepts
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {industries.map((ind, i) => (
            <motion.span
              key={ind.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4), ease }}
              className="rounded-full border border-line bg-ink-soft px-5 py-2.5 font-display text-sm tracking-wide text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
            >
              <span className="mr-2 text-volt">{ind.glyph}</span>
              {ind.category}
            </motion.span>
          ))}
        </div>
      </section>

      {/* client voices */}
      <section className="border-t border-line py-24 md:py-32">
        <div className="px-5 md:px-10">
          <SectionHeading eyebrow="Client voices">
            Trusted by <span className="font-serif font-normal normal-case italic text-volt">businesses</span> everywhere
          </SectionHeading>
        </div>
        <div className="mt-14">
          <TestimonialsMarquee />
        </div>
      </section>

      {/* faq */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Good to know">
            Frequent <span className="font-serif font-normal normal-case italic text-volt">questions</span>
          </SectionHeading>
          <FAQ items={workPage.faqs} />
        </div>
      </section>
    </PageShell>
  );
}
