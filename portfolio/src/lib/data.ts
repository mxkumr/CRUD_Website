/**
 * Manish Kumar Bala Kumar — portfolio content.
 * Single source of truth for every section of the experience.
 */

export const identity = {
  name: 'MANISH KUMAR BALA KUMAR',
  shortName: 'MANISH',
  roles: ['RESEARCHER', 'FOUNDER', 'DESIGNER', 'BUILDER'],
  thesis: 'BUILDING SECURE DIGITAL FUTURES',
  email: 'thecrudstudio@gmail.com',
  cta: "Let's Build Something Extraordinary",
} as const;

/* ---------- Digital DNA ---------- */
export type DnaStrand = {
  id: string;
  label: string;
  hue: string;
  detail: {
    projects: string[];
    experience: string;
    achievements: string[];
    tools: string[];
  };
};

export const dnaStrands: DnaStrand[] = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    hue: '#00FFA3',
    detail: {
      projects: ['Fuzzing framework for protocol testing', 'Threat modeling toolkit', 'Vulnerability analysis pipeline'],
      experience: 'Security research spanning fuzzing, threat modeling and secure architecture design.',
      achievements: ['Security lab workshops', 'Live attack-graph demonstrations'],
      tools: ['AFL++', 'Burp Suite', 'Ghidra', 'Wireshark', 'Metasploit'],
    },
  },
  {
    id: 'ai',
    label: 'AI',
    hue: '#7C6FFF',
    detail: {
      projects: ['AI-assisted triage interfaces', 'LLM-powered research tooling', 'Mining pipelines at billion scale'],
      experience: 'Building AI-native interfaces and large-scale data analysis systems.',
      achievements: ['9.14B interactions analyzed for ICSE 2026 publication'],
      tools: ['PyTorch', 'LangChain', 'OpenAI API', 'Pandas', 'Spark'],
    },
  },
  {
    id: 'research',
    label: 'Research',
    hue: '#00D4FF',
    detail: {
      projects: ['Multilingual open source communities study', 'Empirical software engineering at scale'],
      experience: 'First-author empirical research accepted at ICSE 2026 (A* venue).',
      achievements: ['ICSE 2026 publication', '9.14B GitHub interactions mined'],
      tools: ['Python', 'BigQuery', 'R', 'LaTeX', 'GHTorrent'],
    },
  },
  {
    id: 'design',
    label: 'Product Design',
    hue: '#FF6FD8',
    detail: {
      projects: ['INEGO clothing brand store', 'CRUD Flow product suite', 'School & medical websites'],
      experience: 'End-to-end product design — research, wireframes, design systems, ship.',
      achievements: ['Best UI Nominee', 'Client work across 6+ industries'],
      tools: ['Figma', 'Framer', 'After Effects', 'Spline', 'Webflow'],
    },
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    hue: '#FFB347',
    detail: {
      projects: ['Cybernaut — education & training startup', 'CRUD — design & development agency'],
      experience: 'Founded and scaled two ventures across education and digital services.',
      achievements: ['Entrepreneurship Award', '50+ delivered projects', '50+ workshops conducted'],
      tools: ['Notion', 'Linear', 'Stripe', 'Analytics'],
    },
  },
  {
    id: 'development',
    label: 'Development',
    hue: '#00FFC8',
    detail: {
      projects: ['Full-stack web applications', 'Next.js production deployments', '3D interactive experiences'],
      experience: 'Senior full-stack engineering with a bias for motion and polish.',
      achievements: ['50+ production projects shipped'],
      tools: ['TypeScript', 'Next.js', 'React', 'Three.js', 'Node.js', 'PostgreSQL'],
    },
  },
  {
    id: 'speaking',
    label: 'Public Speaking',
    hue: '#FF3D5A',
    detail: {
      projects: ['Technical workshops', 'Student bootcamps', 'Security awareness sessions'],
      experience: '50+ workshops delivered to students and professionals.',
      achievements: ['Ivy League Hackathon Finalist', 'Campus ambassador programs'],
      tools: ['Keynote', 'OBS', 'Live demos'],
    },
  },
];

/* ---------- Research impact ---------- */
export const research = {
  headlineNumber: 9.14,
  headlineUnit: 'BILLION',
  headlineLabel: 'INTERACTIONS ANALYZED',
  venue: 'ICSE 2026',
  venueDetail: 'A* Research Publication',
  topic: 'Multilingual Open Source Research',
  storyBeats: [
    { id: 'mine', stat: '9.14B', label: 'GitHub interactions mined', body: 'Commits, issues, reviews and discussions — captured at planetary scale.' },
    { id: 'repos', stat: '10M+', label: 'repositories traversed', body: 'Every star in this galaxy is a community leaving its linguistic fingerprint.' },
    { id: 'langs', stat: '100+', label: 'natural languages detected', body: 'Open source speaks more than English. We measured how, where, and what it costs.' },
    { id: 'icse', stat: 'A*', label: 'venue — ICSE 2026', body: 'The premier software engineering conference. First-author publication.' },
  ],
} as const;

/* ---------- Startup universe ---------- */
export type Planet = {
  id: string;
  name: string;
  tagline: string;
  hue: string;
  ringHue: string;
  satellites: { label: string; value: string }[];
};

export const planets: Planet[] = [
  {
    id: 'cybernaut',
    name: 'CYBERNAUT',
    tagline: 'Education & technology training venture',
    hue: '#00D4FF',
    ringHue: '#00FFA3',
    satellites: [
      { label: 'Projects delivered', value: '50+' },
      { label: 'Workshops conducted', value: '50+' },
      { label: 'Students trained', value: '1000+' },
      { label: 'Focus', value: 'Education' },
    ],
  },
  {
    id: 'crud',
    name: 'CRUD',
    tagline: 'Design & development agency',
    hue: '#FF6FD8',
    ringHue: '#7C6FFF',
    satellites: [
      { label: 'Branding systems', value: '20+' },
      { label: 'Product design', value: 'End-to-end' },
      { label: 'Web applications', value: '30+' },
      { label: 'Industries', value: '6+' },
    ],
  },
];

/* ---------- Security lab ---------- */
export type LabModule = {
  id: string;
  name: string;
  command: string;
  output: string[];
  description: string;
  nodes: number;
};

export const labModules: LabModule[] = [
  {
    id: 'fuzzing',
    name: 'Fuzzing Framework',
    command: 'fuzz --target protocol_parser --mutations 1e6',
    output: ['[+] 1,000,000 mutations generated', '[+] 14 crash states isolated', '[!] heap-overflow @ 0x7f3a...', '[+] 3 CVEs candidate paths'],
    description: 'Custom mutation-based fuzzer for protocol parsers — coverage-guided, crash triage built in.',
    nodes: 14,
  },
  {
    id: 'threat',
    name: 'Threat Modeling',
    command: 'threatmap --scope payment_flow --framework STRIDE',
    output: ['[+] 6 trust boundaries mapped', '[+] 23 threat vectors enumerated', '[!] 4 critical: spoofing, tampering', '[+] mitigations generated'],
    description: 'STRIDE-driven threat models that turn architecture diagrams into attack surfaces you can reason about.',
    nodes: 23,
  },
  {
    id: 'vuln',
    name: 'Vulnerability Analysis',
    command: 'vulnscan --depth full --chain exploits',
    output: ['[+] dependency graph: 412 packages', '[!] 9 vulnerable transitive deps', '[+] exploit chains simulated: 3', '[+] patch priority queue ready'],
    description: 'Full-depth dependency and binary analysis with exploit-chain simulation.',
    nodes: 9,
  },
  {
    id: 'arch',
    name: 'Secure Architecture',
    command: 'archreview --zero-trust --verify boundaries',
    output: ['[+] zero-trust policy lattice built', '[+] 11 services, 28 edges verified', '[+] mTLS coverage: 100%', '[+] blast radius: contained'],
    description: 'Designing systems where compromise of one component never means compromise of all.',
    nodes: 28,
  },
];

/* ---------- Design universe ---------- */
export type DesignProject = {
  id: string;
  name: string;
  type: string;
  hue: string;
  layers: string[];
};

export const designProjects: DesignProject[] = [
  { id: 'inego', name: 'INEGO', type: 'Clothing brand & store', hue: '#FF6FD8', layers: ['Research', 'Wireframes', 'Design System', 'Final Product'] },
  { id: 'crudflow', name: 'CRUD Flow', type: 'Product suite', hue: '#7C6FFF', layers: ['Research', 'Wireframes', 'Design System', 'Final Product'] },
  { id: 'schools', name: 'School Websites', type: 'Education platforms', hue: '#00D4FF', layers: ['Research', 'Wireframes', 'Design System', 'Final Product'] },
  { id: 'medical', name: 'Medical Websites', type: 'Healthcare experiences', hue: '#00FFA3', layers: ['Research', 'Wireframes', 'Design System', 'Final Product'] },
];

/* ---------- Achievement constellation ---------- */
export type Achievement = {
  id: string;
  title: string;
  story: string;
  /** star positions in the constellation, % of viewport */
  stars: { x: number; y: number }[];
};

export const achievements: Achievement[] = [
  {
    id: 'icse',
    title: 'ICSE 2026 — A* Publication',
    story: 'First-author paper accepted at the premier software engineering venue, analyzing 9.14 billion interactions across multilingual open source.',
    stars: [{ x: 12, y: 22 }, { x: 18, y: 14 }, { x: 25, y: 19 }, { x: 21, y: 30 }],
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship Award',
    story: 'Recognized for founding and scaling two ventures — Cybernaut and CRUD — while still studying.',
    stars: [{ x: 42, y: 12 }, { x: 49, y: 18 }, { x: 55, y: 11 }, { x: 51, y: 26 }],
  },
  {
    id: 'ivy',
    title: 'Ivy League Hackathon Finalist',
    story: 'Built and pitched under pressure against global competition — and reached the final round.',
    stars: [{ x: 72, y: 20 }, { x: 79, y: 14 }, { x: 84, y: 24 }, { x: 76, y: 30 }],
  },
  {
    id: 'bestui',
    title: 'Best UI Nominee',
    story: 'Product design work nominated for interface excellence.',
    stars: [{ x: 20, y: 58 }, { x: 27, y: 52 }, { x: 33, y: 60 }],
  },
  {
    id: 'workshops',
    title: '50+ Workshops',
    story: 'Trained over a thousand students across security, development and design.',
    stars: [{ x: 52, y: 55 }, { x: 58, y: 48 }, { x: 65, y: 54 }, { x: 60, y: 64 }],
  },
  {
    id: 'projects',
    title: '50+ Projects',
    story: 'Shipped production work across education, healthcare, fintech, fashion and more.',
    stars: [{ x: 80, y: 56 }, { x: 87, y: 50 }, { x: 90, y: 62 }, { x: 84, y: 68 }],
  },
];

/* ---------- Time tunnel ---------- */
export type Era = {
  year: string;
  era: string;
  title: string;
  body: string;
  hue: string;
};

export const timeline: Era[] = [
  { year: '2019', era: 'Origins', title: 'First lines of code', body: 'Curiosity becomes obsession. Building small tools, breaking bigger ones.', hue: '#475569' },
  { year: '2020', era: 'Builder era', title: 'Web development begins', body: 'First client projects. Learning that shipping beats perfection.', hue: '#00D4FF' },
  { year: '2021', era: 'Startup era', title: 'Cybernaut founded', body: 'Education venture launches. Workshops begin scaling.', hue: '#00FFA3' },
  { year: '2022', era: 'Startup era', title: 'CRUD agency born', body: 'Design meets engineering. Brand systems, products, websites.', hue: '#FF6FD8' },
  { year: '2023', era: 'Security era', title: 'Deep into cybersecurity', body: 'Fuzzing, threat modeling, vulnerability research. The lab takes shape.', hue: '#FF3D5A' },
  { year: '2024', era: 'Scale era', title: '50+ projects milestone', body: 'Both ventures compound. Award recognition arrives.', hue: '#FFB347' },
  { year: '2025', era: 'Research era', title: '9.14B interactions mined', body: 'The multilingual open source study — months of pipeline engineering.', hue: '#7C6FFF' },
  { year: '2026', era: 'Research era', title: 'ICSE 2026 acceptance', body: 'A* publication. The thesis crystallizes: building secure digital futures.', hue: '#00FFA3' },
];

/* ---------- AI guide ---------- */
export type GuideEntry = {
  q: string;
  a: string;
  target: string;
};

export const guideEntries: GuideEntry[] = [
  { q: 'Who is Manish?', a: 'Cybersecurity researcher, two-time founder, designer and AI builder. ICSE 2026 published. This whole experience is his mind — scroll or jump in.', target: '#hero' },
  { q: 'Show me the research', a: 'ICSE 2026, A* venue. 9.14 billion GitHub interactions analyzed for multilingual open source research. Taking you there.', target: '#research' },
  { q: 'Startup experience?', a: 'Two ventures: Cybernaut (education, 50+ workshops) and CRUD (design agency, 50+ projects). Entering the startup universe.', target: '#startups' },
  { q: 'Design work?', a: 'INEGO, CRUD Flow, school and medical platforms — full process from research to design system. Opening the design universe.', target: '#design' },
  { q: 'Security skills?', a: 'Fuzzing, threat modeling, vulnerability analysis, secure architecture. The lab is live — explore the terminals.', target: '#lab' },
  { q: 'Achievements?', a: 'ICSE 2026, Entrepreneurship Award, Ivy League Hackathon Finalist, Best UI Nominee and more. Look up — they are constellations.', target: '#constellation' },
];
