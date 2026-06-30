'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  anatomyPoints,
  doctors,
  specialities,
  symptomFlows,
  symptomResults,
  type Doctor,
} from '@/lib/medinova-data';

const ease = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   Doctor finder wizard + live availability
   ============================================================ */
function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: (d: Doctor, slot: string) => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease }}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${doctor.hue}, ${doctor.hue}bb)`, boxShadow: `0 8px 24px ${doctor.hue}33` }}
        >
          {doctor.initials}
        </div>
        <div className="min-w-0">
          <h4 className="truncate font-display text-lg font-bold text-slate-900">{doctor.name}</h4>
          <p className="truncate text-sm text-slate-500">{doctor.role}</p>
          <p className="mt-1 text-xs text-slate-400">
            {doctor.experience} yrs · ★ {doctor.rating} · {doctor.languages.join(' / ')}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Available today
        </p>
        <div className="flex flex-wrap gap-2">
          {doctor.slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onBook(doctor, slot)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600 transition-all hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function DoctorFinder() {
  const [speciality, setSpeciality] = useState<string | null>(null);
  const [booked, setBooked] = useState<{ doctor: Doctor; slot: string } | null>(null);

  const filtered = useMemo(
    () => (speciality ? doctors.filter((d) => d.speciality === speciality) : doctors.slice(0, 6)),
    [speciality]
  );

  return (
    <section id="doctors" className="relative bg-slate-50 px-5 py-24 md:px-10">
      <div className="mb-12 md:flex md:items-end md:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            <span className="h-px w-8 bg-emerald-500" /> Doctor finder
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            The right specialist,
            <br />
            <span className="text-slate-400">in three clicks.</span>
          </h2>
        </div>
        <p className="mt-4 max-w-sm text-slate-500 md:mt-0">
          Live availability, real slots. Pick a speciality and book directly into the doctor&apos;s calendar.
        </p>
      </div>

      {/* step 1 - speciality pills */}
      <div className="mb-10 flex flex-wrap gap-3">
        <button
          onClick={() => setSpeciality(null)}
          className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all ${
            speciality === null
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
          }`}
        >
          All specialists
        </button>
        {specialities.map((s) => (
          <button
            key={s.id}
            onClick={() => setSpeciality(s.id)}
            className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all ${
              speciality === s.id
                ? 'text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
            style={speciality === s.id ? { background: s.hue, boxShadow: `0 6px 18px ${s.hue}33` } : undefined}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* step 2 - doctor grid with live slots */}
      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((d) => (
            <DoctorCard key={d.id} doctor={d} onBook={(doctor, slot) => setBooked({ doctor, slot })} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* step 3 - booking confirmation */}
      <AnimatePresence>
        {booked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-sm"
            onClick={() => setBooked(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600"
              >
                ✓
              </motion.div>
              <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">Slot reserved</h3>
              <p className="mt-2 text-slate-500">
                {booked.doctor.name} · today at <span className="font-mono font-semibold text-emerald-600">{booked.slot}</span>
              </p>
              <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-400">
                This is a CRUD Studio concept demo - in production this confirms against the hospital&apos;s live HIS calendar with OTP verification.
              </p>
              <button
                onClick={() => setBooked(null)}
                className="mt-6 w-full rounded-full bg-emerald-600 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   Symptom checker preview
   ============================================================ */
export function SymptomChecker() {
  const [choice, setChoice] = useState<string | null>(null);
  const result = choice ? symptomResults[choice] : null;

  const urgencyStyle = {
    urgent: { label: 'See a doctor today', color: '#DC2626' },
    soon: { label: 'Book within this week', color: '#D97706' },
    routine: { label: 'Routine consultation', color: '#059669' },
  } as const;

  return (
    <section id="book" className="relative px-5 py-24 md:px-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 shadow-sm md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              <span className="h-px w-8 bg-emerald-500" /> Symptom checker
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Not sure which department?
            </h2>
            <p className="mt-4 max-w-sm text-slate-500">
              Answer one question and we route you to the right speciality instantly - the full version asks 4–6 adaptive questions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-emerald-900/5">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="q" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                  <p className="font-display text-lg font-semibold text-slate-900">{symptomFlows.start.q}</p>
                  <div className="mt-5 grid gap-2.5">
                    {symptomFlows.start.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setChoice(opt)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-sm text-slate-700 transition-all hover:border-emerald-400 hover:bg-emerald-50"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="r" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: `${urgencyStyle[result.urgency].color}18`, color: urgencyStyle[result.urgency].color }}
                  >
                    {urgencyStyle[result.urgency].label}
                  </span>
                  <p className="mt-4 text-sm text-slate-500">Recommended department</p>
                  <p className="font-display text-2xl font-bold text-slate-900">{result.speciality}</p>
                  <p className="mt-3 text-sm text-slate-500">
                    Suggested specialist - <span className="font-semibold text-emerald-600">{result.doctor}</span>
                  </p>
                  <div className="mt-6 flex gap-3">
                    <a href="#doctors" className="flex-1 rounded-full bg-emerald-600 py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20">
                      Book now
                    </a>
                    <button
                      onClick={() => setChoice(null)}
                      className="rounded-full border border-slate-300 px-5 py-3 font-display text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400"
                    >
                      Restart
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Interactive anatomy explorer
   ============================================================ */
export function AnatomyExplorer() {
  const [active, setActive] = useState(anatomyPoints[1]);

  return (
    <section id="specialities" className="relative px-5 py-24 md:px-10">
      <div className="mb-12 text-center">
        <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          <span className="h-px w-8 bg-emerald-500" /> Anatomy explorer <span className="h-px w-8 bg-emerald-500" />
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Where does it hurt?
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
        {/* body figure */}
        <div className="relative mx-auto h-[480px] w-56">
          {/* stylized silhouette */}
          <svg viewBox="0 0 100 220" className="h-full w-full text-emerald-100" aria-hidden>
            <circle cx="50" cy="16" r="13" fill="currentColor" />
            <path
              d="M50 32 C30 32 26 48 26 62 L26 96 C26 102 30 106 34 106 L36 106 L36 150 C36 158 38 164 40 172 L42 204 C42 210 46 214 50 214 C54 214 58 210 58 204 L60 172 C62 164 64 158 64 150 L64 106 L66 106 C70 106 74 102 74 96 L74 62 C74 48 70 32 50 32 Z"
              fill="currentColor"
            />
            <path d="M26 64 L14 100 C12 106 16 110 20 108 L30 92" fill="currentColor" />
            <path d="M74 64 L86 100 C88 106 84 110 80 108 L70 92" fill="currentColor" />
          </svg>

          {/* hotspots */}
          {anatomyPoints.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              aria-label={p.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="relative flex h-5 w-5">
                {active.id === p.id && (
                  <motion.span
                    layoutId="anatomy-ring"
                    className="absolute -inset-2 rounded-full border-2 border-emerald-500"
                    transition={{ duration: 0.45, ease }}
                  />
                )}
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
                <span
                  className={`relative h-5 w-5 rounded-full border-2 transition-colors ${
                    active.id === p.id ? 'border-emerald-600 bg-emerald-500' : 'border-emerald-400 bg-white'
                  }`}
                />
              </span>
            </button>
          ))}
        </div>

        {/* detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-emerald-900/5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">{active.speciality}</p>
            <h3 className="mt-2 font-display text-3xl font-bold text-slate-900">{active.label}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {active.conditions.map((c) => (
                <span key={c} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-600">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-5 border-t border-slate-100 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-slate-900">
                  {doctors.filter((d) => d.speciality === active.specialityId).length * 12 + 8}
                </p>
                <p className="text-xs text-slate-400">specialists in dept.</p>
              </div>
              <a
                href="#doctors"
                className="ml-auto rounded-full bg-slate-100 px-6 py-3 font-display text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-600 hover:text-white"
              >
                See doctors →
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* speciality bento */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialities.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
          >
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
              style={{ background: s.hue }}
            />
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${s.hue}, ${s.hue}bb)` }}
            >
              +
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.blurb}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {s.procedures}+ procedures
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
