'use client';

import { motion } from 'framer-motion';
import PageShell from '../PageShell';
import PageHero from '../PageHero';
import SectionHeading from '../SectionHeading';
import ProcessSteps from '../ProcessSteps';
import FAQ from '../FAQ';
import { contact } from '@/lib/site-data';
import { contactPage } from '@/lib/pages-data';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactContent() {
  return (
    <PageShell>
      <PageHero
        eyebrow={contactPage.eyebrow}
        titleTop={contactPage.titleTop}
        titleAccent={contactPage.titleAccent}
        titleBottom={contactPage.titleBottom}
        lede={contactPage.lede}
      />

      {/* response promise + quick contact */}
      <section className="px-5 pb-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-8 rounded-2xl border border-line bg-ink-soft p-8 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-volt">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-volt opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-volt" />
              </span>
              Available for new projects
            </p>
            <p className="mt-4 max-w-md font-display text-2xl font-bold leading-snug tracking-tight text-bone md:text-3xl">
              {contactPage.promise}
            </p>
          </div>
          <a
            data-cursor="hover"
            href={`mailto:${contact.email}`}
            className="group shrink-0 font-serif text-2xl italic text-bone md:text-3xl"
          >
            {contact.email}
            <span className="mt-1 block h-px w-full origin-left scale-x-0 bg-volt transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        </motion.div>
      </section>

      {/* what happens next */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="What happens next">
          From hello <span className="font-serif font-normal normal-case italic text-volt">to</span> kick-off
        </SectionHeading>
        <div className="mt-16">
          <ProcessSteps steps={contactPage.steps} />
        </div>
      </section>

      {/* locations */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="Where we are">
          Two bases, <span className="font-serif font-normal normal-case italic text-volt">one</span> studio
        </SectionHeading>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contact.locations.map((loc, i) => (
            <motion.div
              key={loc.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="rounded-2xl border border-line bg-ink-soft p-8 md:p-10"
            >
              <p className="font-display text-xs uppercase tracking-[0.3em] text-volt">{loc.label}</p>
              <p className="mt-5 font-display text-2xl font-bold tracking-tight text-bone">{loc.phone}</p>
              {'whatsapp' in loc && loc.whatsapp ? (
                <p className="mt-2 font-display text-sm text-bone-dim">WhatsApp · {loc.whatsapp}</p>
              ) : null}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-6">
          {contact.socials.map((s) => (
            <a
              key={s.label}
              data-cursor="hover"
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group font-display text-sm uppercase tracking-widest text-bone-dim transition-colors hover:text-volt"
            >
              {s.label}
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="border-t border-line px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before you ask">
            Frequent <span className="font-serif font-normal normal-case italic text-volt">questions</span>
          </SectionHeading>
          <FAQ items={contactPage.faqs} />
        </div>
      </section>
    </PageShell>
  );
}
