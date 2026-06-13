/**
 * Crestwood University — bespoke demo content.
 * A fictional, prestigious institution used to show the kind of
 * collegiate website CRUD Studio builds for schools & universities.
 */

export const uni = {
  name: 'Crestwood',
  full: 'Crestwood University',
  founded: 1962,
  motto: 'Lux et Veritas Futura',
  mottoEn: 'Light and Truth for the Future',
  domain: 'crestwood.edu',
  location: 'Cambridge Hills',
} as const;

export const accolades = [
  'Ranked top 1% worldwide',
  'AACSB & ABET accredited',
  '#3 for graduate employability',
  'Carnegie R1 research university',
  '12 Rhodes Scholars',
  'Times Higher Ed — Gold',
] as const;

export type CountStat = { value: number; suffix?: string; decimals?: number; label: string };

export const stats: CountStat[] = [
  { value: 18400, suffix: '+', label: 'Students enrolled' },
  { value: 94, suffix: '%', label: 'Graduate placement' },
  { value: 320, suffix: '+', label: 'World-class faculty' },
  { value: 120, suffix: '', label: 'Countries represented' },
];

export const levels = ['Undergraduate', 'Postgraduate', 'Doctoral'] as const;
export type Level = (typeof levels)[number];

export const fields = ['Engineering', 'Business', 'Design', 'Sciences', 'Arts'] as const;
export type Field = (typeof fields)[number];

export type Program = {
  id: string;
  name: string;
  level: Level;
  field: Field;
  degree: string;
  duration: string;
  blurb: string;
  seats: number;
};

export const programs: Program[] = [
  { id: 'cs', name: 'Computer Science', level: 'Undergraduate', field: 'Engineering', degree: 'B.Tech', duration: '4 years', blurb: 'Systems, AI and software engineering with a year-long capstone in industry.', seats: 120 },
  { id: 'ai', name: 'AI & Data Science', level: 'Undergraduate', field: 'Engineering', degree: 'B.Tech', duration: '4 years', blurb: 'Machine learning, statistics and ethics — built for the intelligence age.', seats: 90 },
  { id: 'bdes', name: 'Communication Design', level: 'Undergraduate', field: 'Design', degree: 'B.Des', duration: '4 years', blurb: 'Visual, motion and interaction design in a studio-led curriculum.', seats: 60 },
  { id: 'bba', name: 'Business Administration', level: 'Undergraduate', field: 'Business', degree: 'BBA', duration: '3 years', blurb: 'Finance, strategy and entrepreneurship with a global immersion term.', seats: 90 },
  { id: 'bsc', name: 'Life Sciences', level: 'Undergraduate', field: 'Sciences', degree: 'B.Sc', duration: '3 years', blurb: 'Molecular biology and genomics with full lab access from year one.', seats: 80 },
  { id: 'ba', name: 'Liberal Arts', level: 'Undergraduate', field: 'Arts', degree: 'B.A.', duration: '3 years', blurb: 'Philosophy, literature and politics in a seminar-first tradition.', seats: 70 },
  { id: 'mtech', name: 'Computer Science', level: 'Postgraduate', field: 'Engineering', degree: 'M.Tech', duration: '2 years', blurb: 'Specialise in AI, security or distributed systems alongside research labs.', seats: 60 },
  { id: 'mba', name: 'Master of Business', level: 'Postgraduate', field: 'Business', degree: 'MBA', duration: '2 years', blurb: 'A top-ranked MBA with live consulting projects and 6.4× ROI on tuition.', seats: 120 },
  { id: 'mdes', name: 'Interaction Design', level: 'Postgraduate', field: 'Design', degree: 'M.Des', duration: '2 years', blurb: 'Human-centred design, research and prototyping for digital products.', seats: 40 },
  { id: 'msc', name: 'Data Science', level: 'Postgraduate', field: 'Sciences', degree: 'M.Sc', duration: '2 years', blurb: 'Applied statistics and computation across health, climate and finance.', seats: 50 },
  { id: 'phde', name: 'Engineering', level: 'Doctoral', field: 'Engineering', degree: 'Ph.D', duration: '4–6 years', blurb: 'Fully-funded research across robotics, photonics and intelligent systems.', seats: 30 },
  { id: 'phdm', name: 'Management', level: 'Doctoral', field: 'Business', degree: 'Ph.D', duration: '4–5 years', blurb: 'Rigorous research in economics, behaviour and organisational science.', seats: 18 },
];

export type Research = { area: string; title: string; blurb: string; stat: string };

export const research: Research[] = [
  {
    area: 'Intelligent Systems Lab',
    title: 'Teaching robots to learn like infants',
    blurb: 'Our reinforcement-learning group is rethinking how machines acquire physical intuition from a handful of examples.',
    stat: '$42M in active grants',
  },
  {
    area: 'Climate & Energy',
    title: 'Grid-scale storage from seawater',
    blurb: 'A breakthrough flow-battery chemistry developed at Crestwood is now in field trials across three continents.',
    stat: '18 patents filed',
  },
  {
    area: 'Genomics Institute',
    title: 'Mapping the cancer epigenome',
    blurb: 'A cross-disciplinary team is decoding the regulatory layer of tumours to design precision therapies.',
    stat: '6 Nature papers, 2025',
  },
];

export const campusLife = [
  { label: 'Heritage Quad', tag: 'Campus' },
  { label: '200+ student clubs', tag: 'Community' },
  { label: 'Olympic aquatic centre', tag: 'Athletics' },
  { label: 'The Lumen Library', tag: 'Study' },
  { label: 'Maker & robotics studio', tag: 'Innovation' },
  { label: 'Global residence halls', tag: 'Living' },
];

export type Voice = { quote: string; name: string; detail: string };

export const voices: Voice[] = [
  {
    quote: 'Crestwood gave me a lab, a mentor and a startup — all before I graduated. I never felt like just a roll number.',
    name: 'Aisha Rahman',
    detail: 'B.Tech AI & Data Science · ’25',
  },
  {
    quote: 'The seminar tradition changes how you think. I came to read books and left able to defend ideas.',
    name: 'Daniel Okafor',
    detail: 'B.A. Liberal Arts · ’24',
  },
  {
    quote: 'Global immersion in Singapore turned a textbook into a career. My cohort still runs a company together.',
    name: 'Meera Iyer',
    detail: 'MBA · ’23',
  },
];

export const admissionSteps = [
  { step: 'Explore', body: 'Browse programs, attend an open day or book a one-to-one with an admissions counsellor.' },
  { step: 'Apply', body: 'Submit one application online — transcripts, statement and references in a single portal.' },
  { step: 'Interview', body: 'Shortlisted applicants meet faculty for a conversation, on campus or online.' },
  { step: 'Join', body: 'Accept your offer, choose housing and meet your cohort before week one.' },
];

export type NewsItem = { tag: string; date: string; title: string };

export const news: NewsItem[] = [
  { tag: 'Research', date: 'June 9, 2026', title: 'Crestwood team wins international robotics grand challenge' },
  { tag: 'Campus', date: 'June 4, 2026', title: 'New $120M Lumen Library opens to students this fall' },
  { tag: 'Global', date: 'May 28, 2026', title: 'Five new exchange partners across Europe and Asia announced' },
];

export type EventItem = { day: string; month: string; title: string; kind: string; place: string };

export const events: EventItem[] = [
  { day: '21', month: 'JUN', title: 'Undergraduate Open Day', kind: 'Admissions', place: 'Heritage Quad' },
  { day: '28', month: 'JUN', title: 'Founder’s Lecture: The Next Decade of AI', kind: 'Lecture', place: 'Lumen Hall' },
  { day: '05', month: 'JUL', title: 'Postgraduate Information Evening', kind: 'Online', place: 'Webinar' },
];

export const deadlines = [
  { round: 'Early Action', date: 'Nov 1' },
  { round: 'Regular Decision', date: 'Jan 15' },
  { round: 'Scholarships', date: 'Feb 1' },
] as const;
