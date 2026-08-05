import { ImageResponse } from 'next/og';

export const alt = 'CRUD Studio — Ideas to Iconic Brands';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0D0D0B 0%, #161610 50%, #1A1210 100%)',
          color: '#F4F1EA',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              background: '#FF3F3F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 28, letterSpacing: 6, fontWeight: 600 }}>CRUD STUDIO</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Ideas to Iconic Brands
          </div>
          <div style={{ fontSize: 26, color: '#A8A29A', maxWidth: 780, lineHeight: 1.35 }}>
            Design, web development, and digital products — Create. Refine. Unified. Designs.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, color: '#D9FF3F' }}>thecrudstudio.com</div>
          <div style={{ fontSize: 18, color: '#A8A29A' }}>Brand · Web · Product</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
