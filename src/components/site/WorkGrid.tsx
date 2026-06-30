'use client';

import { useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects, studio, type Project, type ServiceIcon } from '@/lib/site-data';

const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function useSiteTheme() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.classList.contains('theme-light') ? 'light' : 'dark'),
    () => 'dark',
  );
}

const INK_RGB: [number, number, number] = [22, 22, 16];

function parseHex(hex: string): [number, number, number] | null {
  const raw = hex.replace('#', '').trim();
  const normalized =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw.length === 6
        ? raw
        : null;
  if (!normalized) return null;
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  weightA: number,
): string {
  const w = weightA / 100;
  const channels = a.map((c, i) => Math.round(c * w + b[i] * (1 - w)));
  return `#${channels.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** Darkens a neon accent on light backgrounds; unchanged in dark mode. */
function serviceAccent(hue: string, isLight: boolean): string {
  const rgb = parseHex(hue);
  if (!rgb || !isLight) return hue;
  return mixRgb(rgb, INK_RGB, 64);
}

function serviceAccentMuted(hue: string, isLight: boolean): string {
  const rgb = parseHex(hue);
  if (!rgb) return isLight ? `${hue}99` : `${hue}66`;
  if (!isLight) return `${hue}66`;
  return mixRgb(rgb, INK_RGB, 44);
}

/* ------------------------------------------------------------------
   Bespoke line-art vectors for each service. Stroke uses the card's
   accent hue; soft secondary strokes use a dim version for depth.
   ------------------------------------------------------------------ */
function ServiceVector({
  icon,
  hue,
  dim,
}: {
  icon: ServiceIcon;
  hue: string;
  dim: string;
}) {
  const common = {
    fill: 'none',
    stroke: hue,
    strokeWidth: 2.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const vectors: Record<ServiceIcon, React.ReactNode> = {
    branding: (
      <>
        <circle cx="60" cy="60" r="30" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M60 26v68M26 60h68M37 37l46 46M83 37 37 83" />
        <circle cx="60" cy="60" r="9" fill={hue} stroke="none" />
      </>
    ),
    web: (
      <>
        <rect x="26" y="32" width="68" height="50" rx="6" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M26 44h68" />
        <circle cx="34" cy="38" r="1.8" fill={hue} stroke="none" />
        <circle cx="41" cy="38" r="1.8" fill={hue} stroke="none" />
        <circle cx="48" cy="38" r="1.8" fill={hue} stroke="none" />
        <path {...common} d="m50 56-7 7 7 7M70 56l7 7-7 7M62 54l-4 18" />
      </>
    ),
    app: (
      <>
        <rect x="42" y="24" width="36" height="64" rx="8" stroke={hue} strokeWidth={2.4} fill="none" />
        <path {...common} d="M54 30h12" />
        <rect x="49" y="40" width="22" height="14" rx="3" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M49 62h22M49 70h14" />
        <circle cx="60" cy="82" r="2.4" fill={hue} stroke="none" />
      </>
    ),
    uiux: (
      <>
        <rect x="24" y="30" width="46" height="36" rx="5" stroke={dim} strokeWidth={2.4} fill="none" />
        <rect x="42" y="48" width="46" height="40" rx="5" stroke={hue} strokeWidth={2.4} fill="none" />
        <path {...common} d="M50 58h30M50 66h22M50 74h16" />
        <path d="m64 40 16 6-6 3-3 6z" fill={hue} stroke="none" />
      </>
    ),
    software: (
      <>
        <rect x="24" y="32" width="72" height="50" rx="6" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M24 44h72" />
        <path {...common} d="m40 58-6 6 6 6M80 58l6 6-6 6M60 56l-4 16" />
        <circle cx="31" cy="38" r="1.8" fill={hue} stroke="none" />
      </>
    ),
    marketing: (
      <>
        <path {...common} d="M30 54v12l34 14V40z" />
        <path d="M30 54H22a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h8" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M64 40c10 0 18 5 18 20s-8 20-18 20M40 80l4 14h8l-3-12" />
        <path {...common} d="M88 50h8M86 60h10M88 70h6" />
      </>
    ),
    brand: (
      <>
        <path {...common} d="M58 24 40 78l18-8 18 8z" />
        <path {...common} d="m58 24 0 46" />
        <circle cx="58" cy="84" r="6" stroke={dim} strokeWidth={2.4} fill="none" />
        <path d="m58 56-6 14h12z" fill={hue} stroke="none" />
      </>
    ),
    strategy: (
      <>
        <circle cx="60" cy="60" r="28" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M60 32v56M32 60h56" />
        <path {...common} d="M60 60 78 42M60 60 42 78M60 60 78 78M60 60 42 42" />
        <circle cx="60" cy="60" r="6" fill={hue} stroke="none" />
        <path {...common} d="M60 48V32" />
      </>
    ),
    fde: (
      <>
        <circle cx="60" cy="44" r="14" stroke={hue} strokeWidth={2.4} fill="none" />
        <path {...common} d="M60 58v10M48 72h24" />
        <circle cx="34" cy="78" r="8" stroke={dim} strokeWidth={2.4} fill="none" />
        <circle cx="86" cy="78" r="8" stroke={dim} strokeWidth={2.4} fill="none" />
        <path {...common} d="M42 78h16M62 78h16M52 72V66M68 72V66" />
        <circle cx="60" cy="44" r="4" fill={hue} stroke="none" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3"
      style={{ filter: `drop-shadow(0 6px 20px ${hue}40)` }}
      aria-hidden
    >
      {vectors[icon]}
    </svg>
  );
}

function ProjectArt({ project }: { project: Project }) {
  const [hue] = project.hues;
  const isWide = project.span === 'wide';
  const isLight = useSiteTheme() === 'light';
  const accent = serviceAccent(hue, isLight);
  const accentMuted = serviceAccentMuted(hue, isLight);
  const artStyle = {
    '--work-hue-glow-a': isLight ? `${hue}42` : `${hue}26`,
    '--work-hue-glow-b': isLight ? `${hue}50` : `${hue}33`,
  } as React.CSSProperties;

  return (
    <div className="absolute inset-0 overflow-hidden" style={artStyle}>
      {/* base wash - uses theme tokens via CSS */}
      <div className="work-card-art__wash absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110" />
      {/* orbiting ring */}
      <div
        className="work-card-art__ring absolute -right-16 -top-16 h-56 w-56 rounded-full border opacity-40 transition-all duration-700 group-hover:rotate-45 group-hover:opacity-80"
        style={{ borderColor: hue, borderWidth: 1.5 }}
      />
      <div
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full transition-transform duration-700 group-hover:-translate-x-6 group-hover:translate-y-6"
        style={{ background: isLight ? `${hue}30` : `${hue}1f` }}
      />
      {/* the vector illustration */}
      <div
        className={`absolute flex items-center justify-center transition-transform duration-700 ${
          isWide
            ? 'inset-y-6 right-8 w-1/3'
            : 'left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-[60%]'
        }`}
      >
        <ServiceVector icon={project.icon} hue={accent} dim={accentMuted} />
      </div>
      {/* scanlines for texture */}
      <div aria-hidden className="work-card-art__scanlines absolute inset-0" />
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLight = useSiteTheme() === 'light';
  const accent = serviceAccent(project.hues[0], isLight);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 180, damping: 20 });
  const artX = useSpring(useTransform(mx, [0, 1], [10, -10]), { stiffness: 120, damping: 18 });
  const artY = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 120, damping: 18 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const spanClass =
    project.span === 'wide'
      ? 'md:col-span-2'
      : project.span === 'tall'
        ? 'md:row-span-2'
        : '';

  return (
    <motion.div
      custom={index}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={spanClass}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        data-cursor="view"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative h-full w-full overflow-hidden rounded-2xl border border-line bg-ink-soft ${
          project.span === 'tall' ? 'min-h-[28rem] md:min-h-full' : 'min-h-[18rem] md:min-h-[22rem]'
        }`}
      >
        <motion.div className="absolute inset-0" style={{ x: artX, y: artY, scale: 1.06 }}>
          <ProjectArt project={project} />
        </motion.div>

        {/* meta */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <span
            className="work-card__category rounded-full border bg-ink/60 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm"
            style={{
              borderColor: isLight ? `${accent}55` : `${project.hues[0]}59`,
              color: accent,
            }}
          >
            {project.category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-bone transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-bone-dim opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            {project.blurb}
          </p>
          <div className="mt-3 flex items-center gap-2 overflow-hidden">
            <span
              className="block h-px w-0 transition-all duration-500 group-hover:w-10"
              style={{ background: accent }}
            />
            <span
              className="-translate-x-4 font-display text-xs uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
              style={{ color: accent }}
            >
              Explore service
            </span>
          </div>
        </div>

        <Link href="/capabilities" aria-label={`${project.title} - explore`} className="absolute inset-0 z-10" />
      </motion.article>
    </motion.div>
  );
}

export default function WorkGrid() {
  return (
    <section id="work" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-bone-dim">
            <span className="h-px w-8 bg-volt" /> What we do
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-7xl">
            Our
            <br />
            <span className="text-stroke">Services</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-base leading-relaxed text-bone-dim">
            End-to-end capabilities under one roof - from first sketch to launch and beyond.{' '}
            <em className="font-serif text-bone">{studio.manifesto}</em>
          </p>
          <Link
            href="/showcase"
            data-cursor="hover"
            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-widest text-bone backdrop-blur-sm transition-colors hover:border-volt hover:text-volt"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-volt" />
            </span>
            Industry solutions showcase
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-flow-dense md:grid-cols-3">
        {projects.map((project, i) => (
          <WorkCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
