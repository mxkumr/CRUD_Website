'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MiniSite from './MiniSite';
import type { MiniSiteContent } from '@/lib/showcase-data';

type Device = 'desktop' | 'mobile';

function MonitorIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 20.5h6M12 16.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function SitePreview({ site }: { site: MiniSiteContent }) {
  const [device, setDevice] = useState<Device>('desktop');
  const mobile = device === 'mobile';

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/80">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-ink/60 px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-ink/70 px-3 py-1">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-volt">
            <path d="M6 10V8a6 6 0 1112 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="truncate font-display text-[11px] tracking-wide text-bone-dim">
            {site.domain}
          </span>
        </div>

        {/* device toggle */}
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-0.5">
          {(
            [
              { id: 'desktop' as const, icon: <MonitorIcon /> },
              { id: 'mobile' as const, icon: <PhoneIcon /> },
            ]
          ).map((d) => (
            <button
              key={d.id}
              data-cursor="hover"
              onClick={() => setDevice(d.id)}
              aria-label={`${d.id} preview`}
              aria-pressed={device === d.id}
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                device === d.id ? 'bg-volt text-ink' : 'text-bone-dim hover:text-bone'
              }`}
            >
              {d.icon}
            </button>
          ))}
        </div>
      </div>

      {/* viewport */}
      <div className="relative flex-1 overflow-hidden bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, rgba(217,255,63,0.06), transparent 60%)',
          }}
        />
        <div className="relative flex h-full justify-center">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className={`h-full overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 ${
              mobile
                ? 'my-3 w-[290px] rounded-[1.75rem] border-[6px] border-ink-raise shadow-2xl shadow-black/50'
                : 'w-full'
            }`}
          >
            <MiniSite site={site} mobile={mobile} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
