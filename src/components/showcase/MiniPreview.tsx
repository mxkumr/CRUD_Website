'use client';

import type { ReactNode } from 'react';
import type { Industry } from '@/lib/showcase-data';

/* ============================================================
   MiniPreviews — scaled-down replicas of each bespoke demo
   site. Used inside showcase cards and the SitePreview modal.
   ============================================================ */

type PreviewProps = { compact?: boolean; mobile?: boolean; embedded?: boolean };

function Frame({
  domain,
  dark = false,
  chrome = true,
  children,
  className = '',
}: {
  domain: string;
  dark?: boolean;
  chrome?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const shell = (
    <div
      className={`min-w-0 ${className}`}
      style={
        chrome
          ? {
              border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
              background: dark ? '#0A0A0F' : '#fff',
            }
          : undefined
      }
    >
      {chrome && (
        <div
          className="flex items-center gap-2 px-2.5 py-1.5"
          style={{
            borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
            background: dark ? '#050508' : '#f5f5f3',
          }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28c840]" />
          <span
            className="mx-auto min-w-0 truncate font-display text-[8px] tracking-wide"
            style={{ color: dark ? '#9CA3AF' : '#6B7280' }}
          >
            {domain}
          </span>
        </div>
      )}
      <div className="min-w-0 overflow-hidden">{children}</div>
    </div>
  );

  return chrome ? (
    <div className="overflow-hidden rounded-xl">{shell}</div>
  ) : (
    shell
  );
}

/** Shared layout flags for card thumbnails vs modal mobile viewport. */
function narrowFlags({ compact, mobile }: PreviewProps) {
  const narrow = Boolean(compact || mobile);
  return { narrow, cols: narrow ? 'grid-cols-1' : 'grid-cols-2' };
}

/* --- 01 Healthcare / MediNova ----------------------------------------- */
function HealthcarePreview({ compact, mobile, embedded }: PreviewProps) {
  const TEAL = '#0D9488';
  const { narrow, cols } = narrowFlags({ compact, mobile });
  const pad = narrow ? '8px' : '14px';
  return (
    <Frame domain="medinova.health" chrome={!embedded}>
      <div style={{ background: '#F8FAFC', padding: pad }}>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md text-[8px] font-bold text-white" style={{ background: TEAL }}>M</span>
            <span className="truncate text-[9px] font-bold" style={{ color: '#0F172A' }}>MediNova</span>
          </div>
          <span className="shrink-0 rounded-full px-2 py-0.5 text-[7px] font-bold text-white" style={{ background: TEAL }}>Book</span>
        </div>
        <div className="mt-2.5 min-w-0">
          <span className="block text-[7px] font-bold uppercase tracking-wider" style={{ color: TEAL }}>Multi-speciality · 24×7</span>
          <p className="mt-1 break-words text-[11px] font-bold leading-snug" style={{ color: '#0F172A', fontFamily: 'var(--font-display)' }}>
            Healthcare, engineered for humans.
          </p>
        </div>
        <div className={`mt-2 grid gap-1.5 ${cols}`}>
          <div className="rounded-lg p-2" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="text-[7px] font-bold uppercase" style={{ color: TEAL }}>Cardiology</div>
            <div className="mt-0.5 text-[8px]" style={{ color: '#64748B' }}>Dr. Arya · 09:30</div>
          </div>
          <div className="rounded-lg p-2" style={{ background: `${TEAL}12`, border: `1px solid ${TEAL}33` }}>
            <svg viewBox="0 0 80 20" className="h-3 w-full" aria-hidden>
              <path d="M0 10 H20 L24 10 28 4 32 16 36 10 H80" stroke={TEAL} strokeWidth="1.5" fill="none" />
            </svg>
            <div className="mt-1 text-[7px]" style={{ color: '#64748B' }}>Live vitals</div>
          </div>
        </div>
        {!narrow && (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {['312', '98.6%', '4 min'].map((v, i) => (
              <div key={v} className="rounded-md py-1.5 text-center" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                <div className="text-[9px] font-bold" style={{ color: TEAL }}>{v}</div>
                <div className="text-[6px] uppercase" style={{ color: '#94A3B8' }}>{['Doctors', 'Success', 'Check-in'][i]}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Frame>
  );
}

/* --- 02 SaaS / Nebula ------------------------------------------------- */
function SaaSPreview({ compact, mobile, embedded }: PreviewProps) {
  const V = '#8B5CF6';
  const I = '#6366F1';
  const { narrow } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="nebula.ai" dark chrome={!embedded}>
      <div className="relative min-w-0 px-3 py-3 text-center" style={{ background: '#08080F' }}>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20" style={{ background: `radial-gradient(circle, ${V}33, transparent 70%)` }} />
        <span className="relative inline-block rounded-full px-2 py-0.5 text-[6px] font-bold uppercase" style={{ background: `${V}33`, color: '#C4B5FD' }}>New · Nebula 3.0</span>
        <p className="relative mt-2 break-words text-[11px] font-bold leading-snug" style={{ color: '#F4F4F7', fontFamily: 'var(--font-display)' }}>
          Ship faster with{' '}
          <span style={{ backgroundImage: `linear-gradient(100deg, ${V}, #C4B5FD, ${I})`, WebkitBackgroundClip: 'text', color: 'transparent' }}>
            autonomous agents.
          </span>
        </p>
        <div className="relative mx-auto mt-2.5 w-full overflow-hidden rounded-lg text-left" style={{ background: '#0D0D17', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="p-2">
            <div className="grid grid-cols-3 gap-1">
              {['+312%', '18h', '1.2k'].map((m) => (
                <div key={m} className="rounded px-1 py-1 text-center text-[7px] font-bold" style={{ background: 'rgba(255,255,255,0.04)', color: V }}>{m}</div>
              ))}
            </div>
            {!narrow && (
              <div className="mt-1.5 flex h-6 items-end gap-0.5">
                {[40, 65, 50, 80, 95].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.22}px`, background: i === 4 ? V : `${V}55` }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* --- 03 Education / Crestwood ----------------------------------------- */
function EducationPreview({ compact, mobile, embedded }: PreviewProps) {
  const NAVY = '#0A2540';
  const GOLD = '#C8A24A';
  const { narrow, cols } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="crestwood.edu" chrome={!embedded}>
      <div className="min-w-0" style={{ background: '#F7F4EC' }}>
        <div className="px-3 py-2" style={{ background: NAVY }}>
          <div className="flex min-w-0 items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 40 44" fill="none" aria-hidden className="shrink-0">
              <path d="M20 2 L37 8 V22 C37 33 29 40 20 43 C11 40 3 33 3 22 V8 Z" fill={NAVY} stroke={GOLD} strokeWidth="2" />
            </svg>
            <span className="truncate font-serif text-[9px] font-bold text-white">Crestwood</span>
          </div>
        </div>
        <div className="relative isolate px-3 py-3">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30" style={{ background: `radial-gradient(120% 80% at 80% 0%, ${GOLD}44, transparent)` }} />
          <span className="relative block text-[7px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>Est. 1962 · Top 1%</span>
          <p className="relative mt-1.5 break-words font-serif text-[11px] font-bold leading-snug" style={{ color: NAVY }}>
            Where curiosity becomes a career.
          </p>
          <div className={`relative mt-2.5 grid gap-1.5 ${cols}`}>
            {['Computer Science', 'Design & Media'].map((p) => (
              <div key={p} className="min-w-0 rounded-md px-2 py-1.5" style={{ background: '#fff', border: `1px solid ${NAVY}18` }}>
                <div className="truncate text-[7px] font-bold" style={{ color: NAVY }}>{p}</div>
                <div className="text-[6px]" style={{ color: '#5C6675' }}>120 seats</div>
              </div>
            ))}
          </div>
          {!narrow && (
            <div className="relative mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: `${NAVY}15` }}>
              <div className="h-full w-3/4 rounded-full" style={{ background: GOLD }} />
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}

/* --- 04 Construction / Apex BuildWorks ------------------------------ */
function ConstructionPreview({ compact, mobile, embedded }: PreviewProps) {
  const INK = '#15150F';
  const ORANGE = '#EA580C';
  const { narrow, cols } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="apexbuild.co" dark chrome={!embedded}>
      <div className="min-w-0" style={{ background: INK }}>
        <div className="h-1" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${ORANGE} 0 8px, ${INK} 8px 16px)` }} />
        <div className="px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
              <rect x="1" y="1" width="30" height="30" rx="2" fill="#fff" />
              <path d="M16 7 L25 25 H7 Z" stroke={ORANGE} strokeWidth="2.4" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="truncate text-[9px] font-bold uppercase tracking-wider text-white">Apex BuildWorks</span>
          </div>
          <p className="mt-2 break-words text-[11px] font-bold leading-snug text-white" style={{ fontFamily: 'var(--font-display)' }}>
            We build landmarks, on time.
          </p>
          <div className={`mt-2 grid gap-1 ${cols}`}>
            {['Skyline Towers', 'Riverside Villas'].map((p, i) => (
              <div key={p} className="min-w-0 overflow-hidden rounded-md">
                <div className="h-8" style={{ background: `linear-gradient(155deg, #1c1f24, #343a42), radial-gradient(circle at 85% 0%, ${ORANGE}44, transparent)` }} />
                <div className="px-1.5 py-1" style={{ background: '#2A2A24' }}>
                  <div className="truncate text-[7px] font-bold text-white">{p}</div>
                  <div className="text-[6px]" style={{ color: '#6A6A60' }}>{['32 floors', '48 units'][i]}</div>
                </div>
              </div>
            ))}
          </div>
          {!narrow && (
            <div className="mt-2 flex flex-wrap gap-2">
              {['480+', '25 yrs', '100%'].map((s) => (
                <span key={s} className="text-[8px] font-bold" style={{ color: ORANGE }}>{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}

/* --- 05 Real Estate / Haven ------------------------------------------- */
function RealEstatePreview({ compact, mobile, embedded }: PreviewProps) {
  const SKY = '#0EA5E9';
  const { narrow, cols } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="havenestates.in" chrome={!embedded}>
      <div className="min-w-0" style={{ background: '#F6F9FB', padding: narrow ? '8px' : '10px' }}>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="truncate text-[9px] font-bold" style={{ color: '#0F172A' }}>Haven</span>
          <span className="shrink-0 rounded-md px-2 py-0.5 text-[7px] font-bold text-white" style={{ background: SKY }}>Search</span>
        </div>
        <div className="mt-2 flex min-w-0 items-center gap-1 rounded-lg px-2 py-1.5" style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.08)' }}>
          <span className="truncate text-[8px]" style={{ color: '#64748B' }}>⌕ Find homes in Chennai…</span>
        </div>
        <div className={`mt-2 grid gap-1.5 ${cols}`}>
          {[
            { title: '3 BHK Sea-View', price: '₹2.4 Cr' },
            { title: 'Modern Villa', price: '₹4.1 Cr' },
          ].map((l) => (
            <div key={l.title} className="min-w-0 overflow-hidden rounded-lg">
              <div className="relative h-10" style={{ background: `linear-gradient(150deg, #38bdf8, #0ea5e9)` }}>
                <span className="absolute right-1 top-1 rounded px-1 py-0.5 text-[6px] font-bold text-white" style={{ background: SKY }}>{l.price}</span>
              </div>
              <div className="px-1.5 py-1" style={{ background: '#fff' }}>
                <div className="truncate text-[7px] font-semibold" style={{ color: '#0F172A' }}>{l.title}</div>
              </div>
            </div>
          ))}
        </div>
        {!narrow && (
          <div className="mt-2 flex justify-between text-[7px] font-semibold uppercase" style={{ color: '#64748B' }}>
            <span>12.4k listings</span><span>4.9★ rating</span>
          </div>
        )}
      </div>
    </Frame>
  );
}

/* --- 06 HR / TalentForge ---------------------------------------------- */
function HRPreview({ compact, mobile, embedded }: PreviewProps) {
  const PINK = '#DB2777';
  const INDIGO = '#6366F1';
  const { narrow } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="talentforge.io" chrome={!embedded}>
      <div className="min-w-0" style={{ background: '#FAF7FB', padding: narrow ? '8px' : '10px' }}>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md text-white" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${PINK})` }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="2" /></svg>
          </span>
          <span className="truncate text-[9px] font-bold" style={{ color: '#1B1726' }}>
            Talent<span style={{ color: PINK }}>Forge</span>
          </span>
        </div>
        <p className="mt-2 break-words text-[10px] font-bold leading-snug" style={{ color: '#1B1726', fontFamily: 'var(--font-display)' }}>
          Your next role, matched in minutes.
        </p>
        <div className="mt-2 truncate rounded-lg px-2 py-1.5 text-[7px]" style={{ background: '#fff', border: '1px solid rgba(27,23,38,0.08)', color: '#6B6675' }}>
          ⌕ Search 24,000+ roles
        </div>
        <div className="mt-1.5 rounded-lg p-2" style={{ background: '#fff', border: '1px solid rgba(27,23,38,0.08)' }}>
          <div className="truncate text-[8px] font-bold" style={{ color: '#1B1726' }}>Senior Product Designer</div>
          <div className="truncate text-[6px]" style={{ color: '#6B6675' }}>Nebula · Remote</div>
          <span className="mt-1 inline-block rounded px-2 py-0.5 text-[6px] font-bold text-white" style={{ background: PINK }}>Apply in 1 click</span>
        </div>
      </div>
    </Frame>
  );
}

/* --- 07 Restaurant / Saffron & Smoke ---------------------------------- */
function RestaurantPreview({ compact, mobile, embedded }: PreviewProps) {
  const AMBER = '#E0A53B';
  const BG = '#100B09';
  const { narrow } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="saffronsmoke.com" dark chrome={!embedded}>
      <div className="min-w-0" style={{ background: BG, padding: narrow ? '8px' : '10px' }}>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="min-w-0 truncate font-serif text-[9px]" style={{ color: '#F4ECE0' }}>
            Saffron <span style={{ color: AMBER }}>&amp; Smoke</span>
          </span>
          <span className="shrink-0 rounded-full px-2 py-0.5 text-[6px] font-bold uppercase" style={{ background: AMBER, color: BG }}>Reserve</span>
        </div>
        <div className="relative mt-2 overflow-hidden rounded-lg">
          <div className="h-12" style={{ background: 'radial-gradient(120% 100% at 70% 20%, #5a2e12, #1a0f08)' }} />
          <div className="absolute inset-x-0 bottom-0 p-2">
            <p className="break-words font-serif text-[10px] font-bold leading-snug" style={{ color: '#F4ECE0' }}>
              Slow-smoked. Boldly spiced.
            </p>
          </div>
        </div>
        <div className="mt-2 flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-1.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="min-w-0">
            <div className="truncate text-[7px] font-semibold" style={{ color: '#F4ECE0' }}>Smoked Lamb Galouti</div>
            <div className="truncate text-[6px]" style={{ color: '#A8998A' }}>Chef&apos;s signature</div>
          </div>
          <span className="shrink-0 text-[8px] font-bold" style={{ color: AMBER }}>₹680</span>
        </div>
      </div>
    </Frame>
  );
}

/* --- 08 Marketing / Magnet -------------------------------------------- */
function MarketingPreview({ compact, mobile, embedded }: PreviewProps) {
  const LIME = '#D9FF3F';
  const { narrow } = narrowFlags({ compact, mobile });
  return (
    <Frame domain="magnet.agency" dark chrome={!embedded}>
      <div className="min-w-0" style={{ background: '#0A0A07', padding: narrow ? '8px' : '10px' }}>
        <span className="inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[6px] font-bold uppercase tracking-wider" style={{ border: '1px solid rgba(255,255,255,0.12)', color: LIME }}>
          <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: LIME }} /> Full-funnel studio
        </span>
        <p className="mt-2 break-words text-[11px] font-bold uppercase leading-snug tracking-tight" style={{ color: '#F2F2EC', fontFamily: 'var(--font-display)' }}>
          Impossible <span style={{ color: LIME }}>to ignore.</span>
        </p>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[
            { v: '6.4×', l: 'ROAS' },
            { v: '+212%', l: 'Leads' },
            { v: '180+', l: 'Brands' },
          ].map((s) => (
            <div key={s.l} className="min-w-0 rounded-md py-1.5 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-[8px] font-bold" style={{ color: LIME }}>{s.v}</div>
              <div className="truncate text-[5px] uppercase tracking-wider" style={{ color: '#8E8E84' }}>{s.l}</div>
            </div>
          ))}
        </div>
        {!narrow && (
          <div className="mt-2 flex flex-wrap gap-1">
            {['Performance', 'Brand', 'SEO'].map((s) => (
              <span key={s} className="rounded-full px-2 py-0.5 text-[6px] font-bold uppercase" style={{ background: `${LIME}18`, color: LIME }}>{s}</span>
            ))}
          </div>
        )}
      </div>
    </Frame>
  );
}

const PREVIEWS: Record<string, (props: PreviewProps) => ReactNode> = {
  healthcare: HealthcarePreview,
  saas: SaaSPreview,
  education: EducationPreview,
  construction: ConstructionPreview,
  'real-estate': RealEstatePreview,
  hr: HRPreview,
  restaurant: RestaurantPreview,
  marketing: MarketingPreview,
};

/** Renders the bespoke mini-site preview for a given industry id. */
export default function MiniPreview({
  industryId,
  compact = false,
  mobile = false,
  embedded = false,
  className = '',
}: {
  industryId: string;
  compact?: boolean;
  mobile?: boolean;
  embedded?: boolean;
  className?: string;
}) {
  const Preview = PREVIEWS[industryId];
  if (!Preview) return null;

  return (
    <div className={`min-w-0 ${className}`}>
      <Preview compact={compact} mobile={mobile} embedded={embedded} />
    </div>
  );
}

/** Convenience helper when you already have the full Industry object. */
export function MiniPreviewForIndustry({
  industry,
  ...props
}: { industry: Industry } & Omit<Parameters<typeof MiniPreview>[0], 'industryId'>) {
  return <MiniPreview industryId={industry.id} {...props} />;
}
