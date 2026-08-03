'use client';

import type { CSSProperties } from 'react';
import type { MiniSiteContent } from '@/lib/showcase-data';

/* ============================================================
   MiniSite - a self-contained, responsive miniature of the
   website CRUD Studio would build for each industry. Rendered
   inside the SitePreview browser frame as a "live" preview.
   Purely presentational; colours come from the industry data
   so each preview reads as its own distinct brand.
   ============================================================ */

const LIGHT_ACCENTS = new Set(['#D9FF3F', '#A3E635', '#F59E0B']);

type Tokens = {
  page: string;
  surface: string;
  surface2: string;
  text: string;
  sub: string;
  border: string;
  accent: string;
  accentText: string;
  accentSoft: string;
};

function tokens(site: MiniSiteContent): Tokens {
  const accentText = LIGHT_ACCENTS.has(site.accent) ? '#0B0B12' : '#FFFFFF';
  if (site.theme === 'dark') {
    return {
      page: '#0A0A11',
      surface: 'rgba(255,255,255,0.05)',
      surface2: 'rgba(255,255,255,0.025)',
      text: '#F4F4F7',
      sub: '#9A9AA6',
      border: 'rgba(255,255,255,0.10)',
      accent: site.accent,
      accentText,
      accentSoft: `${site.accent}22`,
    };
  }
  return {
    page: '#F7F7F4',
    surface: '#FFFFFF',
    surface2: '#F0F0EC',
    text: '#16161B',
    sub: '#6B6B73',
    border: 'rgba(0,0,0,0.08)',
    accent: site.accent,
    accentText,
    accentSoft: `${site.accent}1A`,
  };
}

function gradientFor(seed: number, accent: string): string {
  const hues = [
    ['#1f2937', '#0f172a'],
    ['#3b3b4f', '#1f1f2e'],
    ['#2d3a3a', '#16201f'],
    ['#3a2d2d', '#201616'],
  ];
  const [a, b] = hues[seed % hues.length];
  return `radial-gradient(120% 120% at 20% 15%, ${accent}66 0%, transparent 55%), linear-gradient(150deg, ${a}, ${b})`;
}

/* --- shared atoms ------------------------------------------------------- */

function Btn({
  children,
  primary,
  t,
}: {
  children: React.ReactNode;
  primary?: boolean;
  t: Tokens;
}) {
  const style: CSSProperties = primary
    ? { background: t.accent, color: t.accentText, borderColor: t.accent }
    : { background: 'transparent', color: t.text, borderColor: t.border };
  return (
    <span
      className="inline-flex items-center justify-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold"
      style={style}
    >
      {children}
    </span>
  );
}

function Eyebrow({ children, t }: { children: React.ReactNode; t: Tokens }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
      style={{ background: t.accentSoft, color: t.accent }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: t.accent }} />
      {children}
    </span>
  );
}

function Header({ site, t, mobile }: { site: MiniSiteContent; t: Tokens; mobile: boolean }) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 backdrop-blur-md"
      style={{ background: `${t.page}D9`, borderBottom: `1px solid ${t.border}` }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-bold"
          style={{ background: t.accent, color: t.accentText }}
        >
          {site.brand.charAt(0)}
        </span>
        <span className="text-[12px] font-bold tracking-tight" style={{ color: t.text }}>
          {site.brand}
        </span>
      </div>

      {!mobile && (
        <nav className="flex items-center gap-4">
          {site.nav.map((n) => (
            <span key={n} className="text-[10px] font-medium" style={{ color: t.sub }}>
              {n}
            </span>
          ))}
        </nav>
      )}

      {mobile ? (
        <span className="flex flex-col gap-[3px]">
          <span className="h-[1.5px] w-3.5 rounded" style={{ background: t.text }} />
          <span className="h-[1.5px] w-3.5 rounded" style={{ background: t.text }} />
        </span>
      ) : (
        <Btn primary t={t}>
          {site.hero.cta}
        </Btn>
      )}
    </header>
  );
}

function Hero({
  site,
  t,
  mobile,
  visual,
}: {
  site: MiniSiteContent;
  t: Tokens;
  mobile: boolean;
  visual: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-6 pt-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full blur-3xl"
        style={{ background: `${t.accent}33` }}
      />
      <div className={`relative grid items-center gap-5 ${mobile ? 'grid-cols-1' : 'grid-cols-[1.1fr_1fr]'}`}>
        <div>
          <Eyebrow t={t}>{site.hero.eyebrow}</Eyebrow>
          <h1
            className={`mt-3 font-bold leading-[1.05] tracking-tight ${mobile ? 'text-[20px]' : 'text-[24px]'}`}
            style={{ color: t.text, fontFamily: 'var(--font-display), sans-serif' }}
          >
            {site.hero.title}
          </h1>
          <p className="mt-2.5 max-w-[34ch] text-[11px] leading-relaxed" style={{ color: t.sub }}>
            {site.hero.sub}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn primary t={t}>
              {site.hero.cta}
            </Btn>
            {site.hero.secondary && <Btn t={t}>{site.hero.secondary}</Btn>}
          </div>
        </div>
        <div className={mobile ? 'mt-1' : ''}>{visual}</div>
      </div>
    </section>
  );
}

function StatStrip({ site, t }: { site: MiniSiteContent; t: Tokens }) {
  if (!site.stats) return null;
  return (
    <div
      className="mx-4 mb-5 grid grid-cols-3 overflow-hidden rounded-xl"
      style={{ background: t.surface, border: `1px solid ${t.border}` }}
    >
      {site.stats.map((s, i) => (
        <div
          key={s.label}
          className="px-3 py-3 text-center"
          style={{ borderLeft: i ? `1px solid ${t.border}` : undefined }}
        >
          <div className="text-[15px] font-bold" style={{ color: t.text }}>
            {s.value}
          </div>
          <div className="mt-0.5 text-[8.5px] uppercase tracking-wider" style={{ color: t.sub }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ children, t }: { children: React.ReactNode; t: Tokens }) {
  return (
    <h2
      className="mb-3 px-4 text-[14px] font-bold tracking-tight"
      style={{ color: t.text, fontFamily: 'var(--font-display), sans-serif' }}
    >
      {children}
    </h2>
  );
}

function Card({
  children,
  t,
  className = '',
  style,
}: {
  children: React.ReactNode;
  t: Tokens;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-xl p-3 ${className}`}
      style={{ background: t.surface, border: `1px solid ${t.border}`, ...style }}
    >
      {children}
    </div>
  );
}

/* --- hero visuals ------------------------------------------------------- */

function BookingVisual({ t }: { t: Tokens }) {
  return (
    <Card t={t} className="shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold" style={{ color: t.text }}>
          Book an appointment
        </span>
        <span className="rounded-full px-2 py-0.5 text-[8px] font-bold" style={{ background: t.accentSoft, color: t.accent }}>
          Live slots
        </span>
      </div>
      {['Speciality', 'Preferred date', 'Doctor'].map((f) => (
        <div
          key={f}
          className="mt-2 flex items-center justify-between rounded-lg px-2.5 py-2 text-[10px]"
          style={{ background: t.surface2, color: t.sub }}
        >
          {f}
          <span style={{ color: t.text }}>▾</span>
        </div>
      ))}
      <div
        className="mt-2.5 rounded-lg py-2 text-center text-[10px] font-bold"
        style={{ background: t.accent, color: t.accentText }}
      >
        Confirm booking
      </div>
    </Card>
  );
}

function DashboardVisual({ site, t }: { site: MiniSiteContent; t: Tokens }) {
  return (
    <Card t={t} className="shadow-sm">
      <div className="mb-2 flex gap-1">
        {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
          <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {site.items.slice(0, 3).map((it) => (
          <div key={it.title} className="rounded-lg px-2 py-2" style={{ background: t.surface2 }}>
            <div className="text-[11px] font-bold" style={{ color: t.accent }}>
              {it.meta}
            </div>
            <div className="mt-0.5 text-[7.5px] leading-tight" style={{ color: t.sub }}>
              {it.title}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex h-12 items-end gap-1 rounded-lg p-2" style={{ background: t.surface2 }}>
        {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${h}%`, background: i === 5 ? t.accent : `${t.accent}55` }}
          />
        ))}
      </div>
    </Card>
  );
}

function ImageCard({ seed, t, label, badge }: { seed: number; t: Tokens; label: string; badge?: string }) {
  return (
    <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${t.border}` }}>
      <div className="relative h-24" style={{ backgroundImage: gradientFor(seed, t.accent) }}>
        {badge && (
          <span
            className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[8px] font-bold"
            style={{ background: t.accent, color: t.accentText }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="px-2.5 py-2" style={{ background: t.surface }}>
        <div className="text-[10.5px] font-semibold" style={{ color: t.text }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function heroVisual(site: MiniSiteContent, t: Tokens): React.ReactNode {
  switch (site.layout) {
    case 'booking':
      return <BookingVisual t={t} />;
    case 'dashboard':
      return <DashboardVisual site={site} t={t} />;
    case 'campus':
      return (
        <Card t={t} className="shadow-sm">
          <div className="h-16 rounded-lg" style={{ backgroundImage: gradientFor(2, t.accent) }} />
          <div className="mt-2 text-[11px] font-bold" style={{ color: t.text }}>
            Admissions open · 2026
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: t.surface2 }}>
            <div className="h-full w-3/4 rounded-full" style={{ background: t.accent }} />
          </div>
          <div className="mt-1 text-[9px]" style={{ color: t.sub }}>
            74% seats filled - apply before June 30
          </div>
        </Card>
      );
    case 'projects':
      return <ImageCard seed={0} t={t} label={site.items[0].title} badge="On-time delivery" />;
    case 'listings':
      return (
        <Card t={t} className="!p-0 overflow-hidden shadow-sm">
          <div className="h-20" style={{ backgroundImage: gradientFor(0, t.accent) }} />
          <div className="p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold" style={{ color: t.text }}>
                {site.items[0].meta}
              </span>
              <span className="text-[9px]" style={{ color: t.sub }}>
                {site.items[0].sub}
              </span>
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {['3 Beds', '2 Baths', '1,450 sqft'].map((c) => (
                <span key={c} className="rounded-md px-1.5 py-0.5 text-[8px]" style={{ background: t.surface2, color: t.sub }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Card>
      );
    case 'jobs':
      return (
        <Card t={t} className="shadow-sm">
          <div
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px]"
            style={{ background: t.surface2, color: t.sub }}
          >
            <span>⌕</span> Search 24,000+ roles
          </div>
          <div className="mt-2 rounded-lg p-2.5" style={{ background: t.surface2 }}>
            <div className="text-[11px] font-bold" style={{ color: t.text }}>
              {site.items[0].title}
            </div>
            <div className="mt-0.5 text-[9px]" style={{ color: t.sub }}>
              {site.items[0].sub}
            </div>
            <div className="mt-2 inline-block rounded-md px-2.5 py-1 text-[9px] font-bold" style={{ background: t.accent, color: t.accentText }}>
              Apply in 1 click
            </div>
          </div>
        </Card>
      );
    case 'menu':
      return (
        <Card t={t} className="!p-0 overflow-hidden shadow-sm">
          <div className="h-20" style={{ backgroundImage: gradientFor(3, t.accent) }} />
          <div className="flex items-center justify-between p-2.5">
            <div>
              <div className="text-[11px] font-bold" style={{ color: t.text }}>
                {site.items[0].title}
              </div>
              <div className="text-[9px]" style={{ color: t.sub }}>
                {site.items[0].sub}
              </div>
            </div>
            <span className="rounded-md px-2 py-1 text-[9px] font-bold" style={{ background: t.accent, color: t.accentText }}>
              {site.items[0].meta}
            </span>
          </div>
        </Card>
      );
    case 'agency':
      return (
        <Card t={t} className="text-center shadow-sm">
          <div className="text-[8px] font-bold uppercase tracking-widest" style={{ color: t.sub }}>
            Avg client result
          </div>
          <div className="mt-1 text-[34px] font-bold leading-none" style={{ color: t.accent, fontFamily: 'var(--font-display), sans-serif' }}>
            +212%
          </div>
          <div className="mt-1 text-[9px]" style={{ color: t.sub }}>
            qualified leads in 90 days
          </div>
        </Card>
      );
    case 'shop':
      return (
        <Card t={t} className="!p-0 overflow-hidden shadow-sm">
          <div className="h-24" style={{ backgroundImage: gradientFor(1, t.accent) }} />
          <div className="flex items-center justify-between p-2.5">
            <div>
              <div className="text-[8px] font-bold uppercase tracking-widest" style={{ color: t.accent }}>
                Drop 01
              </div>
              <div className="mt-0.5 text-[11px] font-bold" style={{ color: t.text }}>
                {site.items[0].title}
              </div>
              <div className="text-[9px]" style={{ color: t.sub }}>
                {site.items[0].sub}
              </div>
            </div>
            <span className="rounded-md px-2 py-1 text-[9px] font-bold" style={{ background: t.accent, color: t.accentText }}>
              {site.items[0].meta}
            </span>
          </div>
        </Card>
      );
    default:
      return null;
  }
}

/* --- body sections ------------------------------------------------------ */

function bodySection(site: MiniSiteContent, t: Tokens, mobile: boolean): React.ReactNode {
  const cols = mobile ? 'grid-cols-1' : 'grid-cols-2';

  switch (site.layout) {
    case 'booking':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>Top specialists, available today</SectionTitle>
          <div className="px-4 pb-5">
            <Card t={t} className="!p-0">
              {site.items.map((it, i) => (
                <div
                  key={it.title}
                  className="flex items-center justify-between px-3 py-2.5"
                  style={{ borderTop: i ? `1px solid ${t.border}` : undefined }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-7 rounded-full" style={{ background: t.accentSoft }} />
                    <div>
                      <div className="text-[11px] font-semibold" style={{ color: t.text }}>
                        {it.title}
                      </div>
                      <div className="text-[9px]" style={{ color: t.sub }}>
                        {it.sub}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-md px-2 py-1 text-[9px] font-bold" style={{ background: t.accentSoft, color: t.accent }}>
                    {it.meta}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </>
      );

    case 'dashboard':
      return (
        <>
          <SectionTitle t={t}>Simple, scalable pricing</SectionTitle>
          <div className={`grid gap-2.5 px-4 pb-5 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {site.stats?.map((s, i) => (
              <Card key={s.label} t={t} style={i === 1 ? { borderColor: t.accent } : undefined}>
                <div className="text-[9px] uppercase tracking-wider" style={{ color: t.sub }}>
                  {s.label}
                </div>
                <div className="mt-1 text-[20px] font-bold" style={{ color: t.text }}>
                  {s.value}
                </div>
                <div
                  className="mt-2.5 rounded-md py-1.5 text-center text-[9px] font-bold"
                  style={i === 1 ? { background: t.accent, color: t.accentText } : { background: t.surface2, color: t.text }}
                >
                  Choose
                </div>
              </Card>
            ))}
          </div>
        </>
      );

    case 'campus':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>Explore programs</SectionTitle>
          <div className={`grid gap-2.5 px-4 pb-5 ${cols}`}>
            {site.items.map((it) => (
              <Card key={it.title} t={t}>
                <div className="text-[11.5px] font-bold" style={{ color: t.text }}>
                  {it.title}
                </div>
                <div className="mt-0.5 text-[9px]" style={{ color: t.sub }}>
                  {it.sub}
                </div>
                <div className="mt-2 inline-block rounded-md px-2 py-0.5 text-[8.5px] font-semibold" style={{ background: t.accentSoft, color: t.accent }}>
                  {it.meta}
                </div>
              </Card>
            ))}
          </div>
        </>
      );

    case 'projects':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>Recent projects</SectionTitle>
          <div className={`grid gap-2.5 px-4 pb-5 ${cols}`}>
            {site.items.map((it, i) => (
              <div key={it.title} className="overflow-hidden rounded-xl" style={{ border: `1px solid ${t.border}` }}>
                <div className="h-16" style={{ backgroundImage: gradientFor(i, t.accent) }} />
                <div className="px-2.5 py-2" style={{ background: t.surface }}>
                  <div className="text-[10.5px] font-semibold" style={{ color: t.text }}>
                    {it.title}
                  </div>
                  <div className="flex items-center justify-between text-[8.5px]" style={{ color: t.sub }}>
                    <span>{it.sub}</span>
                    <span>{it.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'listings':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>Featured listings</SectionTitle>
          <div className={`grid gap-2.5 px-4 pb-5 ${cols}`}>
            {site.items.map((it, i) => (
              <div key={it.title} className="overflow-hidden rounded-xl" style={{ border: `1px solid ${t.border}` }}>
                <div className="relative h-16" style={{ backgroundImage: gradientFor(i + 1, t.accent) }}>
                  <span className="absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-bold" style={{ background: t.accent, color: t.accentText }}>
                    {it.meta}
                  </span>
                </div>
                <div className="px-2.5 py-2" style={{ background: t.surface }}>
                  <div className="text-[10px] font-semibold leading-tight" style={{ color: t.text }}>
                    {it.title}
                  </div>
                  <div className="text-[8.5px]" style={{ color: t.sub }}>
                    {it.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'jobs':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>Latest openings</SectionTitle>
          <div className="px-4 pb-5">
            <Card t={t} className="!p-0">
              {site.items.map((it, i) => (
                <div
                  key={it.title}
                  className="flex items-center justify-between px-3 py-2.5"
                  style={{ borderTop: i ? `1px solid ${t.border}` : undefined }}
                >
                  <div>
                    <div className="text-[11px] font-semibold" style={{ color: t.text }}>
                      {it.title}
                    </div>
                    <div className="text-[9px]" style={{ color: t.sub }}>
                      {it.sub}
                    </div>
                  </div>
                  <span className="rounded-md px-2 py-1 text-[8.5px] font-bold" style={{ background: t.accentSoft, color: t.accent }}>
                    {it.meta}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </>
      );

    case 'menu':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>From the kitchen</SectionTitle>
          <div className="px-4 pb-5">
            <Card t={t} className="!p-0">
              {site.items.map((it, i) => (
                <div
                  key={it.title}
                  className="flex items-center justify-between px-3 py-2.5"
                  style={{ borderTop: i ? `1px solid ${t.border}` : undefined }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-9 w-9 rounded-lg" style={{ backgroundImage: gradientFor(i, t.accent) }} />
                    <div>
                      <div className="text-[11px] font-semibold" style={{ color: t.text }}>
                        {it.title}
                      </div>
                      <div className="text-[9px]" style={{ color: t.sub }}>
                        {it.sub}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: t.accent }}>
                    {it.meta}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </>
      );

    case 'agency':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>What we do</SectionTitle>
          <div className={`grid gap-2.5 px-4 pb-5 ${cols}`}>
            {site.items.map((it) => (
              <Card key={it.title} t={t}>
                <span className="text-[14px] font-bold" style={{ color: t.accent }}>
                  →
                </span>
                <div className="mt-1 text-[11.5px] font-bold" style={{ color: t.text }}>
                  {it.title}
                </div>
                <div className="mt-0.5 text-[9px]" style={{ color: t.sub }}>
                  {it.sub}
                </div>
              </Card>
            ))}
          </div>
        </>
      );

    case 'shop':
      return (
        <>
          <StatStrip site={site} t={t} />
          <SectionTitle t={t}>From the drop</SectionTitle>
          <div className={`grid gap-2.5 px-4 pb-5 ${cols}`}>
            {site.items.map((it, i) => (
              <Card key={it.title} t={t} className="!p-0 overflow-hidden">
                <div className="h-14" style={{ backgroundImage: gradientFor(i, t.accent) }} />
                <div className="p-2.5">
                  <div className="text-[11px] font-bold" style={{ color: t.text }}>
                    {it.title}
                  </div>
                  <div className="mt-0.5 text-[9px]" style={{ color: t.sub }}>
                    {it.sub}
                  </div>
                  <div className="mt-1.5 text-[11px] font-bold" style={{ color: t.accent }}>
                    {it.meta}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      );

    default:
      return null;
  }
}

/* --- root --------------------------------------------------------------- */

export default function MiniSite({ site, mobile = false }: { site: MiniSiteContent; mobile?: boolean }) {
  const t = tokens(site);

  return (
    <div
      className="min-h-full w-full"
      style={{ background: t.page, color: t.text, fontFamily: 'var(--font-body), sans-serif' }}
    >
      <Header site={site} t={t} mobile={mobile} />
      <Hero site={site} t={t} mobile={mobile} visual={heroVisual(site, t)} />
      {bodySection(site, t, mobile)}
      <footer
        className="flex items-center justify-between px-4 py-3 text-[8.5px]"
        style={{ borderTop: `1px solid ${t.border}`, color: t.sub }}
      >
        <span>© 2026 {site.brand}</span>
        <span>{site.domain}</span>
      </footer>
    </div>
  );
}
