'use client';

import { motion } from 'framer-motion';
import PageShell from '../PageShell';
import PageHero from '../PageHero';
import SectionHeading from '../SectionHeading';
import ProcessSteps from '../ProcessSteps';
import FAQ from '../FAQ';
import Capabilities from '../Capabilities';
import { services } from '@/lib/site-data';
import {
  capabilitiesPage,
  capabilityDetails,
  capabilityProcess,
  capabilitiesFaqs,
  techStack,
} from '@/lib/pages-data';

const ease = [0.22, 1, 0.36, 1] as const;

export default function CapabilitiesContent() {
  return (
    <PageShell>
      <PageHero
        eyebrow={capabilitiesPage.eyebrow}
        titleTop={capabilitiesPage.titleTop}
        titleAccent={capabilitiesPage.titleAccent}
        titleBottom={capabilitiesPage.titleBottom}
        lede={capabilitiesPage.lede}
      />

      {/* interactive capability list (reused homepage section) */}
      <Capabilities />

      {/* deliverables breakdown per service */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="What you get">
          Inside every <span className="font-serif font-normal normal-case italic text-volt">engagement</span>
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((service, i) => {
            const detail = capabilityDetails[service.id];
            const [h1] = service.hues;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease }}
                className="relative overflow-hidden rounded-2xl border border-line bg-ink-soft p-8 md:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: `radial-gradient(circle, ${h1}22 0%, transparent 70%)` }}
                />
                <div className="relative flex items-baseline gap-4">
                  <span className="font-display text-sm tracking-widest" style={{ color: h1 }}>
                    {service.index}
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-bone">
                    {service.title}
                  </h3>
                </div>
                <p className="relative mt-4 max-w-md text-base leading-relaxed text-bone">
                  {detail?.outcome}
                </p>

                <ul className="relative mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {detail?.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm leading-relaxed text-bone-dim">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: h1 }} />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
                  {detail?.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 font-display text-[11px] uppercase tracking-wider text-bone-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* tech stack marquee */}
      <section className="border-t border-line py-20 md:py-28">
        <p className="mb-8 flex items-center gap-3 px-5 font-display text-xs uppercase tracking-[0.3em] text-bone-dim md:px-10">
          <span className="h-px w-8 bg-volt" /> Our toolkit
        </p>
        <div className="flex w-max animate-marquee gap-0 will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {techStack.map((tool) => (
                <span
                  key={`${copy}-${tool}`}
                  className="flex items-center gap-8 whitespace-nowrap px-8 font-display text-2xl font-bold uppercase tracking-tight text-bone-dim md:text-4xl"
                >
                  {tool}
                  <span className="text-volt">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="How we work">
          A clear path <span className="font-serif font-normal normal-case italic text-volt">to</span> results
        </SectionHeading>
        <div className="mt-16">
          <ProcessSteps steps={capabilityProcess} />
        </div>
      </section>

      {/* faq */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Good to know">
            Frequent <span className="font-serif font-normal normal-case italic text-volt">questions</span>
          </SectionHeading>
          <FAQ items={capabilitiesFaqs} />
        </div>
      </section>
    </PageShell>
  );
}
