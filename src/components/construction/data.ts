/**
 * Apex BuildWorks - bespoke demo content.
 * A fictional turnkey construction firm used to show the kind of
 * industrial, project-led website CRUD Studio builds for builders.
 */

export const firm = {
  name: 'Apex BuildWorks',
  short: 'APEX',
  tagline: 'We build landmarks, on time.',
  founded: 2001,
  domain: 'apexbuild.co',
  phone: '+91 44 6620 0100',
  email: 'build@apexbuild.co',
  license: 'CIDB Grade 7 · Lic. TN-CC-48217',
} as const;

export const certifications = [
  'ISO 9001:2015',
  'ISO 45001 Safety',
  'OSHA Compliant',
  'LEED Accredited',
  'Green Building Council',
  'CIDB Grade 7',
] as const;

export type CountStat = { value: number; suffix?: string; decimals?: number; label: string };

export const stats: CountStat[] = [
  { value: 480, suffix: '+', label: 'Projects delivered' },
  { value: 25, suffix: '', label: 'Years building' },
  { value: 4.2, suffix: 'M', decimals: 1, label: 'Sq ft constructed' },
  { value: 100, suffix: '%', label: 'On-time completion' },
];

export type Service = { no: string; title: string; body: string };

export const services: Service[] = [
  { no: '01', title: 'General Contracting', body: 'Single-point accountability from groundbreaking to handover, with self-performed core trades.' },
  { no: '02', title: 'Design–Build', body: 'One contract for design and construction - faster delivery, fewer surprises, fixed cost.' },
  { no: '03', title: 'Pre-Construction', body: 'Estimating, value engineering and constructability reviews before the first shovel.' },
  { no: '04', title: 'Construction Management', body: 'Programme, cost and quality control with daily reporting straight to your inbox.' },
  { no: '05', title: 'Renovation & Fit-out', body: 'Occupied-space upgrades and interiors delivered without disrupting your operations.' },
  { no: '06', title: 'Infrastructure & Civil', body: 'Roads, bridges and utilities engineered to last and built to specification.' },
];

export const sectors = ['Commercial', 'Residential', 'Infrastructure', 'Retail', 'Industrial'] as const;
export type Sector = (typeof sectors)[number];

export type Project = {
  id: string;
  name: string;
  sector: Sector;
  metric: string;
  location: string;
  year: string;
  status: 'Completed' | 'In progress';
};

export const projects: Project[] = [
  { id: 'skyline', name: 'Skyline Towers', sector: 'Commercial', metric: '32 floors', location: 'Chennai', year: '2025', status: 'Completed' },
  { id: 'riverside', name: 'Riverside Villas', sector: 'Residential', metric: '48 units', location: 'ECR', year: '2024', status: 'Completed' },
  { id: 'metro', name: 'Metro Interchange', sector: 'Infrastructure', metric: '2.4 km viaduct', location: 'Chennai', year: '2026', status: 'In progress' },
  { id: 'aurora', name: 'Aurora Mall', sector: 'Retail', metric: '4.1 L sq ft', location: 'OMR', year: '2023', status: 'Completed' },
  { id: 'helix', name: 'Helix Tech Park', sector: 'Commercial', metric: '18 floors', location: 'Bengaluru', year: '2026', status: 'In progress' },
  { id: 'granite', name: 'Granite Logistics Hub', sector: 'Industrial', metric: '6.5 L sq ft', location: 'Sriperumbudur', year: '2024', status: 'Completed' },
  { id: 'meridian', name: 'The Meridian Residences', sector: 'Residential', metric: '120 units', location: 'Coimbatore', year: '2025', status: 'Completed' },
  { id: 'coastal', name: 'Coastal Expressway Bridge', sector: 'Infrastructure', metric: '1.8 km span', location: 'Mahabalipuram', year: '2023', status: 'Completed' },
  { id: 'vertex', name: 'Vertex Corporate HQ', sector: 'Commercial', metric: '24 floors', location: 'Hyderabad', year: '2026', status: 'In progress' },
];

export type Phase = { no: string; title: string; body: string; duration: string };

export const process: Phase[] = [
  { no: '01', title: 'Pre-construction', body: 'Feasibility, estimating, permits and a guaranteed maximum price before we mobilise.', duration: 'Weeks 1–4' },
  { no: '02', title: 'Design & engineering', body: 'Coordinated drawings, BIM clash detection and value engineering with your architects.', duration: 'Weeks 4–10' },
  { no: '03', title: 'Construction', body: 'Self-perform crews, live programme tracking and daily site reports pushed to your phone.', duration: 'Core build' },
  { no: '04', title: 'Handover & warranty', body: 'Commissioning, snag-free handover, as-builts and a 10-year structural warranty.', duration: 'Final 4 weeks' },
];

export const differentiators = [
  { title: 'Fixed-price certainty', body: 'A guaranteed maximum price locked in before we break ground - no creeping budgets.' },
  { title: 'In-house engineering', body: 'Structural, MEP and BIM teams under one roof keep design and build perfectly aligned.' },
  { title: 'Self-perform crews', body: 'Our own concrete, steel and finishing teams mean schedule control, not subcontractor risk.' },
  { title: 'Daily transparency', body: 'A client dashboard with photos, progress and spend updated every single working day.' },
];

export const safety = {
  headline: '1,200+ days',
  sub: 'without a lost-time incident across all active sites.',
  points: ['Zero-harm safety culture', 'Site inductions for every worker', 'Daily toolbox talks', 'Third-party safety audits'],
};

export const testimonial = {
  quote:
    'Apex handed over Skyline Towers two weeks early and on budget. The daily reporting meant we never had to chase for an update - a genuinely rare experience in construction.',
  name: 'Rajesh Menon',
  role: 'Managing Director, Skyline Group',
};
