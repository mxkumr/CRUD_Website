'use client';

import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';
import { contact, services, studio } from '@/lib/site-data';

const ease = [0.22, 1, 0.36, 1] as const;

function Field({
  label,
  name,
  type = 'text',
  textarea = false,
  required = true,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const InputTag = textarea ? 'textarea' : 'input';

  return (
    <div className="group relative pt-6">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-display uppercase tracking-widest transition-all duration-300 ${
          active ? 'top-0 text-[10px] text-volt' : 'top-8 text-sm text-bone-dim'
        }`}
      >
        {label}
      </label>
      <InputTag
        id={name}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 3 : undefined}
        required={required}
        value={value}
        data-cursor="text"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full resize-none border-b border-line bg-transparent pb-3 pt-2 font-body text-lg text-bone outline-none transition-colors placeholder:text-transparent"
      />
      {/* animated focus underline */}
      <span
        className={`absolute bottom-0 left-0 h-px bg-volt transition-all duration-500 ease-out ${
          focused ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  );
}

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (id: string) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const website = (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';

    const interestLabels = services
      .filter((s) => interests.includes(s.id))
      .map((s) => s.title);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          interests: interestLabels,
          website,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');

      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setInterests([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <footer ref={sectionRef} id="contact" className="relative overflow-hidden border-t border-line">
      <div className="grid grid-cols-1 gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        {/* left: big type + contact details */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[14vw] font-bold uppercase leading-[0.9] tracking-tight text-bone lg:text-[6.5vw]"
          >
            Have a<br />
            project in{' '}
            <span className="font-serif font-normal normal-case italic text-volt">mind?</span>
          </motion.h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-bone-dim">{studio.ctaLine}</p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {contact.locations.map((loc) => (
              <div key={loc.label}>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-volt">
                  {loc.label}
                </p>
                <p className="mt-2 font-display text-sm text-bone">{loc.phone}</p>
                {'whatsapp' in loc && loc.whatsapp ? (
                  <p className="mt-1 font-display text-sm text-bone-dim">
                    WhatsApp · {loc.whatsapp}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <a
            data-cursor="hover"
            href={`mailto:${contact.email}`}
            className="group mt-10 inline-block font-serif text-2xl italic text-bone md:text-3xl"
          >
            {contact.email}
            <span className="mt-1 block h-px w-full origin-left scale-x-0 bg-volt transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        </div>

        {/* right: form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          {sent ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-2xl border border-line bg-ink-soft p-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-volt font-display text-2xl text-ink">
                ✓
              </span>
              <h3 className="mt-6 font-display text-3xl font-bold text-bone">Brief received.</h3>
              <p className="mt-3 max-w-sm text-bone-dim">
                Thanks — we got your message and will reply within 24 hours.
              </p>
              <button
                data-cursor="hover"
                onClick={() => {
                  setSent(false);
                  setError(null);
                }}
                className="mt-8 font-display text-xs uppercase tracking-widest text-volt underline-offset-4 hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <div>
                <p className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
                  I'm interested in
                </p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => {
                    const selected = interests.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        data-cursor="hover"
                        onClick={() => toggleInterest(s.id)}
                        aria-pressed={selected}
                        className={`rounded-full border px-5 py-2 font-display text-sm transition-all duration-300 ${
                          selected
                            ? 'border-volt bg-volt text-ink'
                            : 'border-line text-bone-dim hover:border-bone-dim hover:text-bone'
                        }`}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Your name" name="name" value={name} onChange={setName} />
              <Field label="Email address" name="email" type="email" value={email} onChange={setEmail} />
              <Field label="Tell us about your project" name="message" textarea value={message} onChange={setMessage} />

              {error && (
                <p className="rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-bone" role="alert">
                  {error}
                </p>
              )}

              <Magnetic strength={0.25} className="self-start">
                <button
                  type="submit"
                  disabled={sending}
                  data-cursor="hover"
                  className="group relative overflow-hidden rounded-full bg-bone px-10 py-5 font-display text-sm font-semibold uppercase tracking-wider text-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center gap-3 transition-colors duration-300">
                    {sending ? 'Sending…' : 'Send the brief'}
                    {!sending && (
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    )}
                  </span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-volt transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </button>
              </Magnetic>
            </form>
          )}
        </motion.div>
      </div>

      {/* watermark + legal */}
      <div className="relative border-t border-line">
        <motion.p
          aria-hidden
          style={{ y: watermarkY }}
          className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[28vw] font-bold uppercase leading-[0.8] tracking-tighter text-bone opacity-[0.06]"
        >
          CRUD<span className="text-brand-bright">.</span>
        </motion.p>

        <div className="flex flex-col items-center justify-between gap-4 px-5 pb-8 md:flex-row md:px-10">
          <p className="font-display text-xs uppercase tracking-wider text-bone-dim">
            © {new Date().getFullYear()} CRUD Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                data-cursor="hover"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-xs uppercase tracking-wider text-bone-dim transition-colors hover:text-volt"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="font-display text-xs uppercase tracking-wider text-bone-dim">
            {studio.acronym}
          </p>
        </div>
      </div>
    </footer>
  );
}
