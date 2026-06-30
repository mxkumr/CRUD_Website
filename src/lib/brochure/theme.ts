/**
 * Light-theme tokens - mirrors the website.
 * Accent (volt/brand red) is used sparingly; structure uses ink/bone/line.
 */
export const colors = {
  ink: '#F5F3EC',
  inkSoft: '#ECE9E0',
  inkRaise: '#FFFFFF',
  bone: '#161610',
  boneDim: '#5B5952',
  charcoal: '#1A1A1A',
  volt: '#D32F2F',
  voltDim: '#B01C1C',
  brand: '#D32F2F',
  line: 'rgba(22, 22, 16, 0.14)',
  lineSolid: '#E0DDD4',
  onAccent: '#FFFFFF',
} as const;

export const FOOTER_RESERVE = 48;

/** Landscape A4 usable width helper */
export const PAGE = {
  x: 44,
  top: 40,
} as const;
