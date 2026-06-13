/**
 * TalentForge — bespoke demo content.
 * A fictional two-sided hiring platform used to show the kind of
 * recruitment website CRUD Studio builds for HR & staffing.
 */

export const brand = {
  name: 'TalentForge',
  domain: 'talentforge.io',
} as const;

export type CountStat = { value: number; suffix?: string; decimals?: number; label: string };

export const stats: CountStat[] = [
  { value: 24000, suffix: '+', label: 'Open roles' },
  { value: 6200, suffix: '+', label: 'Hiring companies' },
  { value: 72, suffix: 'h', label: 'Avg time to hire' },
  { value: 94, suffix: '%', label: 'Offer acceptance' },
];

export const categories = ['Engineering', 'Design', 'Product', 'Marketing', 'Data', 'Operations'] as const;
export type Category = (typeof categories)[number];

export type Job = {
  id: string;
  title: string;
  company: string;
  category: Category;
  location: string;
  type: 'Full-time' | 'Contract' | 'Hybrid' | 'Remote';
  salary: string;
  posted: string;
  tags: string[];
};

export const jobs: Job[] = [
  { id: 'j1', title: 'Senior Product Designer', company: 'Nebula', category: 'Design', location: 'Remote', type: 'Remote', salary: '₹38–52 LPA', posted: '2d ago', tags: ['Figma', 'Design systems'] },
  { id: 'j2', title: 'Frontend Engineer', company: 'Haven', category: 'Engineering', location: 'Chennai', type: 'Hybrid', salary: '₹24–36 LPA', posted: '1d ago', tags: ['React', 'TypeScript'] },
  { id: 'j3', title: 'Growth Marketing Lead', company: 'Magnet', category: 'Marketing', location: 'Bengaluru', type: 'Full-time', salary: '₹30–45 LPA', posted: '4d ago', tags: ['Paid social', 'SEO'] },
  { id: 'j4', title: 'Data Analyst', company: 'Crestwood', category: 'Data', location: 'Remote', type: 'Contract', salary: '₹18–28 LPA', posted: '3d ago', tags: ['SQL', 'Python'] },
  { id: 'j5', title: 'Product Manager', company: 'Nebula', category: 'Product', location: 'Hyderabad', type: 'Full-time', salary: '₹40–60 LPA', posted: '5d ago', tags: ['B2B SaaS', 'Roadmap'] },
  { id: 'j6', title: 'Backend Engineer', company: 'Apex', category: 'Engineering', location: 'Remote', type: 'Remote', salary: '₹28–42 LPA', posted: '1d ago', tags: ['Node', 'Postgres'] },
  { id: 'j7', title: 'Brand Designer', company: 'Magnet', category: 'Design', location: 'Bengaluru', type: 'Hybrid', salary: '₹20–32 LPA', posted: '6d ago', tags: ['Identity', 'Motion'] },
  { id: 'j8', title: 'People Operations Manager', company: 'Haven', category: 'Operations', location: 'Chennai', type: 'Full-time', salary: '₹22–34 LPA', posted: '2d ago', tags: ['HRIS', 'Culture'] },
  { id: 'j9', title: 'ML Engineer', company: 'Nebula', category: 'Data', location: 'Remote', type: 'Remote', salary: '₹45–70 LPA', posted: '1d ago', tags: ['PyTorch', 'LLMs'] },
  { id: 'j10', title: 'Lifecycle Marketer', company: 'Crestwood', category: 'Marketing', location: 'Remote', type: 'Contract', salary: '₹16–26 LPA', posted: '3d ago', tags: ['CRM', 'Email'] },
];

export const candidateSteps = [
  { title: 'Build your profile', body: 'One profile, saved forever — résumé parsed automatically into a polished candidate page.' },
  { title: 'Apply in one click', body: 'No re-typing the same details. Tap apply and you’re in the running.' },
  { title: 'Track everything', body: 'See every application, interview and offer move in real time on your dashboard.' },
];

export const employerSteps = [
  { title: 'Post in minutes', body: 'A guided job builder with AI-written descriptions and salary benchmarks.' },
  { title: 'Screen smarter', body: 'Auto-ranked candidates, structured scorecards and a shared hiring inbox.' },
  { title: 'Hire faster', body: 'Schedule, offer and onboard — all without leaving TalentForge.' },
];

export const companies = ['Nebula', 'Haven', 'Magnet', 'Crestwood', 'Apex', 'Saffron', 'MediNova', 'Vertex'];

export const pipeline = [
  { stage: 'Applied', count: 5, color: '#6366F1' },
  { stage: 'Screening', count: 3, color: '#8B5CF6' },
  { stage: 'Interview', count: 2, color: '#DB2777' },
  { stage: 'Offer', count: 1, color: '#10B981' },
];

export const testimonial = {
  quote:
    'We cut our time-to-hire from three weeks to three days. Candidates tell us applying on TalentForge is the smoothest process they’ve seen.',
  name: 'Nandita Rao',
  role: 'Head of Talent, Nebula',
};
