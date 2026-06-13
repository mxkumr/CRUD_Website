'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects, studio, type Project } from '@/lib/site-data';

const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function ProjectArt({ project }: { project: Project }) {
  const [hue] = project.hues;
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base wash */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{
          background: `radial-gradient(120% 120% at 20% 10%, ${hue}26 0%, transparent 50%),
                       radial-gradient(100% 100% at 85% 90%, ${hue}33 0%, transparent 55%),
                       linear-gradient(160deg, #1C1C19 0%, #121210 100%)`,
        }}
      />
      {/* orbiting ring */}
      <div
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full border opacity-40 transition-all duration-700 group-hover:rotate-45 group-hover:opacity-80"
        style={{ borderColor: hue, borderWidth: 1.5 }}
      />
      <div
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full transition-transform duration-700 group-hover:-translate-x-6 group-hover:translate-y-6"
        style={{ background: `${hue}1f` }}
      />
      {/* oversized glyph */}
      <span
        aria-hidden
        className="absolute -bottom-10 -left-3 select-none font-display text-[11rem] font-bold leading-none opacity-[0.07] transition-all duration-700 group-hover:-translate-y-4 group-hover:opacity-[0.14]"
        style={{ color: hue }}
      >
        {project.title.charAt(0)}
      </span>
      {/* scanlines for texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 3px, rgba(237,234,227,0.5) 3px 4px)',
        }}
      />
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

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
          <span className="rounded-full border border-line bg-ink/60 px-3 py-1 font-display text-[11px] uppercase tracking-widest text-bone-dim backdrop-blur-sm">
            {project.category}
          </span>
          <span className="font-display text-[11px] tracking-widest text-bone-dim">
            ©{project.year}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-bone transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
            {project.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 overflow-hidden">
            <span className="block h-px w-0 bg-volt transition-all duration-500 group-hover:w-10" />
            <span className="-translate-x-4 font-display text-xs uppercase tracking-widest text-volt opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              {project.href ? 'Open live demo' : 'View case study'}
            </span>
          </div>
        </div>

        {project.href && (
          <Link href={project.href} aria-label={`Open ${project.title} live demo`} className="absolute inset-0 z-10" />
        )}
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
            <span className="h-px w-8 bg-volt" /> Our proud display
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-7xl">
            Selected
            <br />
            <span className="text-stroke">Works</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-base leading-relaxed text-bone-dim">
            Explore our creations — crafted to inspire, designed to make an impact.{' '}
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

      <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project, i) => (
          <WorkCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
