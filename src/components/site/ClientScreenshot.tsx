import Image from 'next/image';

function BrowserChrome({ domain, dark = false }: { domain: string; dark?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2"
      style={{
        borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
        background: dark ? '#050508' : '#f5f5f3',
      }}
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff5f57]" />
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#febc2e]" />
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#28c840]" />
      <span
        className="mx-auto min-w-0 truncate font-display text-[10px] tracking-wide"
        style={{ color: dark ? '#9CA3AF' : '#6B7280' }}
      >
        {domain}
      </span>
    </div>
  );
}

/** Static homepage screenshot inside browser chrome - fast, no iframe. */
export default function ClientScreenshot({
  screenshot,
  domain,
  title,
  accent,
  dark = false,
  priority = false,
}: {
  screenshot: string;
  domain: string;
  title: string;
  accent: string;
  dark?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl shadow-lg shadow-black/25"
      style={{
        border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
        background: dark ? '#0A0A0F' : '#fff',
      }}
    >
      <BrowserChrome domain={domain} dark={dark} />

      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(120% 100% at 50% 0%, ${accent}14 0%, transparent 60%)`,
          }}
        />
        <Image
          src={screenshot}
          alt={`${title} homepage`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          priority={priority}
        />
      </div>
    </div>
  );
}
