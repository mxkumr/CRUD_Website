/**
 * CRUD Studio - long-form marketing content for the dedicated
 * Work, Capabilities, Studio and Contact pages.
 *
 * Kept separate from `site-data.ts` (the canonical brand/source data)
 * so the homepage and the deep pages can evolve independently.
 */

export type Stat = { value: string; label: string; sub?: string };

/** Headline numbers reused across pages. */
export const studioStats: Stat[] = [
  { value: '250+', label: 'Projects shipped', sub: 'Across web, brand & product' },
  { value: '19', label: 'Industries served', sub: 'From healthcare to fintech' },
  { value: '2', label: 'Continents', sub: 'India & Germany' },
  { value: '7-day', label: 'Money-back promise', sub: 'Risk-free, every time' },
];

/* ============================================================
   WORK PAGE
   ============================================================ */

export const workPage = {
  eyebrow: 'The portfolio',
  titleTop: 'Work that',
  titleAccent: 'moves',
  titleBottom: 'the needle',
  lede:
    'Every engagement starts with a business problem and ends with a measurable result. Below is a cross-section of the brands, products and platforms we have designed and engineered - and the thinking behind them.',
  stats: studioStats,
  /** what makes our delivery different */
  approach: [
    {
      title: 'Outcomes, not deliverables',
      body: 'We design backwards from the metric that matters - bookings, signups, qualified leads, revenue - then build only what moves it.',
    },
    {
      title: 'Senior hands, end to end',
      body: 'No hand-offs to juniors. The strategist, designer and engineer in your first call are the same people who ship your launch.',
    },
    {
      title: 'Built to be handed over',
      body: 'Native source files, clean code and documentation come standard. You own everything - no lock-in, no hostage situations.',
    },
  ],
  /** delivery phases */
  process: [
    {
      n: '01',
      title: 'Discover',
      body: 'Stakeholder interviews, competitor teardown and an audit of what you have today. We leave with a sharp problem statement and success metrics.',
      points: ['Brand & market audit', 'Goals & KPIs', 'Content & asset review'],
    },
    {
      n: '02',
      title: 'Design',
      body: 'Information architecture, wireframes and high-fidelity UI - designed in the open with you, iterated until it is undeniably right.',
      points: ['UX architecture', 'Visual identity', 'Interactive prototype'],
    },
    {
      n: '03',
      title: 'Build',
      body: 'Production engineering with performance, accessibility and SEO baked in from the first commit - not bolted on at the end.',
      points: ['Front-end & CMS', 'Integrations', 'QA & performance'],
    },
    {
      n: '04',
      title: 'Launch & grow',
      body: 'A confident go-live, analytics wired up, and an iteration plan so the site keeps compounding long after launch day.',
      points: ['Go-live & handover', 'Analytics & SEO', 'Iteration roadmap'],
    },
  ],
  /** mini case-study highlights with invented-but-realistic outcomes */
  outcomes: [
    { metric: '+212%', label: 'Lead growth', detail: 'for a full-funnel agency rebrand' },
    { metric: '−50%', label: 'Front-desk load', detail: 'after a hospital booking redesign' },
    { metric: '2×', label: 'Trial signups', detail: 'from an interactive SaaS launch site' },
    { metric: '4.9★', label: 'Avg. client rating', detail: 'across every engagement' },
  ],
  faqs: [
    {
      q: 'How long does a typical project take?',
      a: 'Most marketing sites ship in 4–7 weeks depending on scope. Platforms and product builds run longer - we give you a firm timeline after discovery, with weekly checkpoints so there are no surprises.',
    },
    {
      q: 'Do you work with our existing brand?',
      a: 'Absolutely. We can extend and elevate an existing identity, or build one from scratch. Either way you receive a documented system you can hand to any future team.',
    },
    {
      q: 'What happens after launch?',
      a: 'You own all source files and we hand over a clean, documented codebase. Many clients keep us on a retainer for iteration, content and growth - but you are never locked in.',
    },
  ],
};

/* ============================================================
   CAPABILITIES PAGE
   ============================================================ */

export const capabilitiesPage = {
  eyebrow: 'What we do',
  titleTop: 'One studio,',
  titleAccent: 'every',
  titleBottom: 'discipline',
  lede:
    'Strategy, brand, design, engineering and content under one roof - so your project never falls through the cracks between agencies. Here is exactly what we deliver, how we work and the tools we trust.',
};

export type CapabilityDetail = {
  /** the single most important promise of this service */
  outcome: string;
  deliverables: string[];
  /** representative tooling */
  stack: string[];
};

/** Keyed by `service.id` in site-data. */
export const capabilityDetails: Record<string, CapabilityDetail> = {
  branding: {
    outcome: 'A distinctive identity system that earns trust in the first three seconds.',
    deliverables: [
      'Brand strategy & positioning',
      'Logo & visual identity',
      'Typography & colour systems',
      'Messaging & tone of voice',
      'Brand guidelines',
      'Collateral & social kits',
    ],
    stack: ['Figma', 'Illustrator', 'Photoshop', 'After Effects'],
  },
  'web-development': {
    outcome: 'Fast, beautiful, conversion-ready sites that load in a blink and rank on page one.',
    deliverables: [
      'Custom Next.js & headless builds',
      'WordPress & Webflow development',
      'E-commerce & checkout flows',
      '3D, motion & scroll storytelling',
      'Core Web Vitals & SEO foundations',
      'CMS training & documentation',
    ],
    stack: ['Next.js', 'React', 'Webflow', 'WordPress', 'Shopify', 'Vercel'],
  },
  'app-development': {
    outcome: 'Native-grade mobile apps that feel instant and keep users coming back.',
    deliverables: [
      'iOS & Android apps',
      'React Native / Flutter cross-platform',
      'Offline-first & push notifications',
      'Secure API & backend integration',
      'App Store & Play Store launch',
      'Analytics & crash monitoring',
    ],
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
  },
  'uiux-design': {
    outcome: 'Research-led product design that turns first-time users into power users.',
    deliverables: [
      'UX audit & heuristic review',
      'User research & journey mapping',
      'Wireframes & prototypes',
      'Design systems & component libraries',
      'Usability testing',
      'Hand-off & dev support',
    ],
    stack: ['Figma', 'Maze', 'Storybook', 'Notion'],
  },
  'software-development': {
    outcome: 'Reliable, scalable software built around your exact business logic.',
    deliverables: [
      'Custom web applications',
      'SaaS platforms & dashboards',
      'REST & GraphQL APIs',
      'Cloud architecture & DevOps',
      'Third-party integrations',
      'Workflow automation',
    ],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
  },
  'digital-marketing': {
    outcome: 'Compounding reach and revenue from campaigns engineered to perform.',
    deliverables: [
      'SEO & technical optimisation',
      'Paid search & social campaigns',
      'Content & email marketing',
      'Conversion-rate optimisation',
      'Marketing automation',
      'Analytics & reporting',
    ],
    stack: ['Google Ads', 'Meta Ads', 'GA4', 'HubSpot', 'Ahrefs'],
  },
  'brand-building': {
    outcome: 'A brand that stays sharp and consistent across every single touchpoint.',
    deliverables: [
      'Brand guideline systems',
      'Marketing & sales collateral',
      'Social-first content kits',
      'Packaging & print design',
      'Pitch & presentation decks',
      'Art direction',
    ],
    stack: ['Figma', 'Illustrator', 'InDesign', 'After Effects'],
  },
  'ai-strategy': {
    outcome: 'A clear AI roadmap and operating model so adoption moves fast - without flying blind.',
    deliverables: [
      'AI readiness & maturity assessment',
      'Use-case prioritisation & ROI modelling',
      'Governance, policy & compliance frameworks',
      'Team enablement & change management',
      'Vendor & stack evaluation',
      'Transformation roadmap & milestones',
    ],
    stack: ['Miro', 'Notion', 'OpenAI', 'Azure AI', 'Databricks'],
  },
  'forward-deployment': {
    outcome: 'Production-ready AI and automation shipped inside your team - not slid over the wall.',
    deliverables: [
      'Custom AI agents & copilots',
      'LLM integration & prompt engineering',
      'Workflow & process automation',
      'Embedded engineering on-site or remote',
      'Legacy system integration',
      'Deployment, monitoring & handover',
    ],
    stack: ['OpenAI', 'LangChain', 'Python', 'n8n', 'Node.js', 'AWS'],
  },
};

export const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'Three.js',
  'Lenis',
  'WordPress',
  'Webflow',
  'Shopify',
  'Figma',
  'Node.js',
  'Vercel',
  'OpenAI',
  'LangChain',
  'Python',
];

export const capabilityProcess = [
  {
    n: '01',
    title: 'Audit & strategy',
    body: 'We start by understanding the business, the audience and the competition - then define a strategy with clear success metrics.',
  },
  {
    n: '02',
    title: 'Design & prototype',
    body: 'Identity, UX and interface come to life as interactive prototypes you can click through before a line of code is written.',
  },
  {
    n: '03',
    title: 'Engineer & integrate',
    body: 'Production-grade builds with performance, accessibility and your tools - payments, CRM, CMS - wired in cleanly.',
  },
  {
    n: '04',
    title: 'Launch & iterate',
    body: 'We ship with confidence, measure what matters and keep refining so results compound over time.',
  },
];

export const capabilitiesFaqs = [
  {
    q: 'Can you handle everything end to end?',
    a: 'Yes. Strategy, brand, design, build and content all live under one roof, so you have a single accountable team instead of stitching agencies together.',
  },
  {
    q: 'Do you offer unlimited revisions?',
    a: 'On our subscription engagements, yes - unlimited requests and revisions, with senior designers only. For fixed-scope projects we agree on revision rounds upfront so expectations are crystal clear.',
  },
  {
    q: 'Which platforms do you build on?',
    a: 'We are platform-agnostic. We recommend Next.js for ambitious custom builds, Webflow or WordPress for content-led sites, and Shopify for commerce - always the right tool for your goals and team.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Many clients stay on a monthly retainer for iteration, content and growth. You always retain full ownership of source files and can take the work in-house at any time.',
  },
];

/* ============================================================
   STUDIO PAGE
   ============================================================ */

export const studioPage = {
  eyebrow: 'The studio',
  titleTop: 'We don’t',
  titleAccent: 'digitalize',
  titleBottom: '- we craft success',
  lede:
    'CRUD - Create, Refine, Unified, Designs - is a design and engineering studio for founders and teams who refuse to blend in. We pair award-level craft with a relentless focus on the numbers that grow your business.',
  mission:
    'Our mission is simple: turn bold ideas into iconic brands, and iconic brands into measurable growth - through design that is as effective as it is beautiful.',
  principles: [
    {
      title: 'Craft is a competitive advantage',
      body: 'In a sea of templates, taste is what makes a brand impossible to scroll past. We sweat every pixel, transition and word.',
    },
    {
      title: 'Strategy before pixels',
      body: 'Beauty without a goal is decoration. Every decision ladders up to a business outcome we agreed on together.',
    },
    {
      title: 'Partners, not vendors',
      body: 'We embed with your team, share context openly and tell you the truth - even when it is not what you hoped to hear.',
    },
    {
      title: 'Ship, learn, refine',
      body: 'Launch is the start, not the finish line. We measure, iterate and keep compounding results long after go-live.',
    },
  ],
  timeline: [
    { year: '2019', title: 'The studio is born', body: 'CRUD starts as a two-person design team obsessed with doing fewer things, better.' },
    { year: '2021', title: 'Full-stack delivery', body: 'We add in-house engineering - strategy, design and build finally under one roof.' },
    { year: '2023', title: 'Going global', body: 'A second base in Germany opens; we begin serving clients across two continents.' },
    { year: '2026', title: 'Industry showcase', body: 'We launch a library of live, industry-specific concepts so clients can see their future site before we build it.' },
  ],
  stats: studioStats,
};

/* ============================================================
   CONTACT PAGE
   ============================================================ */

export const contactPage = {
  eyebrow: 'Start a project',
  titleTop: 'Let’s build',
  titleAccent: 'something',
  titleBottom: 'iconic',
  lede:
    'Tell us where you want to go and we will map the fastest, most beautiful way to get there. Every inquiry gets a reply from a senior team member within one business day.',
  promise: 'We reply to every inquiry within 24 hours - usually much faster.',
  steps: [
    {
      n: '01',
      title: 'Share your brief',
      body: 'Send us the form below or a quick email. The more context, the sharper our first response - but even a one-liner is enough to start.',
    },
    {
      n: '02',
      title: 'Discovery call',
      body: 'We hop on a 30-minute call to understand your goals, scope and timeline - and to make sure we are the right fit for each other.',
    },
    {
      n: '03',
      title: 'Proposal & plan',
      body: 'You receive a clear proposal with scope, timeline and fixed pricing. No jargon, no hidden costs, no surprises.',
    },
    {
      n: '04',
      title: 'Kick-off',
      body: 'We schedule the start, set up a shared workspace and get moving - with weekly checkpoints from day one.',
    },
  ],
  faqs: [
    {
      q: 'How much does a project cost?',
      a: 'It depends on scope, but we are transparent from the first call. Marketing sites typically start in the low five figures (INR / EUR equivalent); platforms and ongoing partnerships are quoted to fit. You always get fixed pricing before we begin.',
    },
    {
      q: 'How soon can we start?',
      a: 'We usually have a discovery call within a couple of days and can kick off new projects within one to two weeks, depending on our current pipeline.',
    },
    {
      q: 'Do you work with international clients?',
      a: 'Yes - with bases in India and Germany we work comfortably across time zones, in English, with fully remote collaboration.',
    },
    {
      q: 'What if I only need part of the work?',
      a: 'That is fine. Need just branding, just a build, or just motion content? We scope to exactly what you need and nothing you don’t.',
    },
  ],
};
