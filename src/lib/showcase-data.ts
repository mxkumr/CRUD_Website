/**
 * CRUD Studio — Industry Solutions Showcase
 * ------------------------------------------------------------
 * Eight ready-to-pitch website concepts, one per industry.
 * Each entry powers an interactive "mini product" card on
 * /showcase: a live in-browser preview (desktop + mobile),
 * feature highlights, an estimated timeline, an estimated
 * price band and the integrations that ship with it.
 *
 * All brands here are illustrative demos created by CRUD Studio.
 */

export type TimelinePhase = {
  label: string;
  detail: string;
  weeks: number;
};

export type MiniSiteContent = {
  /** drives which mini-site layout MiniSite renders */
  layout:
    | 'booking'
    | 'dashboard'
    | 'campus'
    | 'projects'
    | 'listings'
    | 'jobs'
    | 'menu'
    | 'agency';
  /** light or dark chrome for the previewed site */
  theme: 'light' | 'dark';
  brand: string;
  domain: string;
  accent: string;
  nav: string[];
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    secondary?: string;
  };
  /** generic content rows, interpreted per layout */
  items: { title: string; meta?: string; sub?: string }[];
  stats?: { value: string; label: string }[];
};

export type DemoPage = {
  /** lede shown above the value-prop grid */
  intro: string;
  valueProps: { title: string; body: string }[];
  showcase: { title: string; subtitle: string };
  testimonial: { quote: string; name: string; role: string };
  closing: { title: string; sub: string };
};

export type Industry = {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  /** primary + secondary accent used by the card art */
  hues: [string, string];
  /** single glyph drawn large behind the card */
  glyph: string;
  timelineLabel: string;
  timeline: TimelinePhase[];
  features: string[];
  integrations: string[];
  /** route to the full, standalone demo site */
  liveHref?: string;
  site: MiniSiteContent;
  /** extra copy used to build the full demo page */
  page: DemoPage;
};

export const industries: Industry[] = [
  /* ---------------------------------------------------------- 01 */
  {
    id: 'healthcare',
    number: '01',
    name: 'Healthcare / Hospital',
    category: 'Healthcare',
    tagline: 'Appointment-first hospital experiences that build trust on the first scroll.',
    description:
      'A multi-speciality hospital platform with live doctor availability, online booking, an AI symptom checker and a patient portal — engineered to convert anxious visitors into booked appointments.',
    hues: ['#22D3EE', '#0EA5E9'],
    glyph: '✚',
    timelineLabel: '6 weeks',
    timeline: [
      { label: 'Discovery', detail: 'Specialities, workflows, content audit', weeks: 1 },
      { label: 'Design', detail: 'Booking UX, patient journeys, UI kit', weeks: 2 },
      { label: 'Build', detail: 'Doctor finder, portal, integrations', weeks: 2 },
      { label: 'Launch', detail: 'QA, SEO, handover & training', weeks: 1 },
    ],
    features: [
      'Online appointment booking',
      'Doctor finder with live slots',
      'AI symptom checker',
      'Multi-speciality directory',
      'Patient portal & reports',
      'One-tap emergency dial',
    ],
    integrations: ['Razorpay', 'WhatsApp', 'Google Calendar', 'HMS / EHR', 'Twilio SMS', 'Google Maps'],
    liveHref: '/work/medinova',
    page: {
      intro:
        'A hospital website should lower anxiety, not add to it. MediNova puts the next available specialist, your records and emergency care a tap away.',
      valueProps: [
        { title: 'Book in two minutes', body: 'Real-time slot availability across every speciality, with instant confirmation on WhatsApp.' },
        { title: 'Care that follows you', body: 'Records, reports and care plans live in one patient portal — accessible anywhere, anytime.' },
        { title: 'Always-on emergency', body: 'One-tap ambulance dispatch and golden-hour-ready trauma response, every hour of every day.' },
      ],
      showcase: { title: 'Find your specialist', subtitle: 'Top doctors with live availability today.' },
      testimonial: {
        quote: 'Patients now book online instead of calling — our front-desk load dropped by half and no-shows are down.',
        name: 'Dr. Prasad E',
        role: 'Medical Director',
      },
      closing: { title: 'Healthier starts here.', sub: 'Book a specialist, run a health check, or reach emergency care in a few taps.' },
    },
    site: {
      layout: 'booking',
      theme: 'light',
      brand: 'MediNova',
      domain: 'medinova.health',
      accent: '#0D9488',
      nav: ['Specialities', 'Doctors', 'Packages', 'Emergency'],
      hero: {
        eyebrow: 'Multi-speciality • 24×7',
        title: 'Healthcare, engineered for humans.',
        sub: 'Book a specialist in under two minutes — records, slots and care plans in one place.',
        cta: 'Book appointment',
        secondary: 'Find a doctor',
      },
      items: [
        { title: 'Cardiology', sub: 'Dr. Arya Menon', meta: '09:30' },
        { title: 'Neurology', sub: 'Dr. Sana Iqbal', meta: '11:00' },
        { title: 'Orthopaedics', sub: 'Dr. Meera Pillai', meta: '16:15' },
        { title: 'Paediatrics', sub: 'Dr. Arjun Das', meta: '09:45' },
      ],
      stats: [
        { value: '312', label: 'Specialists' },
        { value: '98.6%', label: 'Success rate' },
        { value: '4 min', label: 'Avg check-in' },
      ],
    },
  },

  /* ---------------------------------------------------------- 02 */
  {
    id: 'saas',
    number: '02',
    name: 'SaaS / AI Startup',
    category: 'Technology',
    tagline: 'Conversion-obsessed product sites that turn curiosity into signups.',
    description:
      'A high-velocity launch site for a SaaS or AI product: a magnetic hero, an interactive product demo, transparent pricing, auth-ready dashboard shell and a built-in AI assistant.',
    hues: ['#8B5CF6', '#6366F1'],
    glyph: '◆',
    timelineLabel: '7 weeks',
    timeline: [
      { label: 'Strategy', detail: 'Positioning, messaging, funnel map', weeks: 1 },
      { label: 'Design', detail: 'Landing, product demo, pricing UI', weeks: 2 },
      { label: 'Build', detail: 'Auth, dashboard shell, CMS, billing', weeks: 3 },
      { label: 'Launch', detail: 'Analytics, A/B setup, go-live', weeks: 1 },
    ],
    features: [
      'High-conversion landing page',
      'Interactive product demo',
      'Pricing tiers + billing',
      'Auth & dashboard shell',
      'Blog & changelog CMS',
      'Built-in AI chat assistant',
    ],
    integrations: ['Stripe', 'Supabase', 'OpenAI', 'Intercom', 'PostHog', 'Vercel'],
    liveHref: '/showcase/saas',
    page: {
      intro:
        'Your product is fast. Your website should be faster — at turning curiosity into signups. Every section here is engineered to convert.',
      valueProps: [
        { title: 'Built to convert', body: 'A magnetic hero, undeniable social proof and a frictionless signup path — no wasted scroll.' },
        { title: 'Show, don’t tell', body: 'An interactive product demo lets prospects feel the value before they ever sign in.' },
        { title: 'Scales with you', body: 'Headless CMS, billing and an auth-ready dashboard shell. Ship features, not rebuilds.' },
      ],
      showcase: { title: 'Pricing that scales with you', subtitle: 'Start free. Upgrade only when you’re ready.' },
      testimonial: {
        quote: 'We doubled trial signups in the first month after launch. The interactive demo does the selling for us.',
        name: 'Ananya R',
        role: 'Founder, Nebula',
      },
      closing: { title: 'Ship faster.', sub: 'Start free, scale when you’re ready — no credit card, no friction.' },
    },
    site: {
      layout: 'dashboard',
      theme: 'dark',
      brand: 'Nebula',
      domain: 'nebula.ai',
      accent: '#8B5CF6',
      nav: ['Product', 'Pricing', 'Docs', 'Blog'],
      hero: {
        eyebrow: 'AI workflow engine',
        title: 'Ship faster with autonomous agents.',
        sub: 'Nebula turns messy operations into clean, automated workflows — in minutes, not months.',
        cta: 'Start free',
        secondary: 'Live demo',
      },
      items: [
        { title: 'Automations', meta: '+312%' },
        { title: 'Time saved', meta: '18h / wk' },
        { title: 'Active agents', meta: '1,204' },
      ],
      stats: [
        { value: '$0', label: 'Starter' },
        { value: '$29', label: 'Pro / mo' },
        { value: '$99', label: 'Scale / mo' },
      ],
    },
  },

  /* ---------------------------------------------------------- 03 */
  {
    id: 'education',
    number: '03',
    name: 'School / University',
    category: 'Education',
    tagline: 'Admissions-driving campus sites that make parents say yes.',
    description:
      'A warm, credible institution site with a program catalog, faculty profiles, an admissions enquiry funnel, events and a fee-payment-ready parent portal.',
    hues: ['#2563EB', '#22D3EE'],
    glyph: '◎',
    timelineLabel: '6 weeks',
    timeline: [
      { label: 'Discovery', detail: 'Programs, brand, content gathering', weeks: 1 },
      { label: 'Design', detail: 'Admissions funnel, catalog, UI kit', weeks: 2 },
      { label: 'Build', detail: 'Forms, portal, payments, CMS', weeks: 2 },
      { label: 'Launch', detail: 'SEO, accessibility, training', weeks: 1 },
    ],
    features: [
      'Admissions & enquiry funnel',
      'Program / course catalog',
      'Faculty & department profiles',
      'Events, news & calendar',
      'Student & parent portal',
      'Online fee payment',
    ],
    integrations: ['Razorpay', 'Google Workspace', 'Zoom', 'ERP / LMS', 'WhatsApp', 'Calendar'],
    liveHref: '/showcase/education',
    page: {
      intro:
        'Parents decide in minutes. A warm, credible site answers every question — and captures the enquiry — before they pick up the phone.',
      valueProps: [
        { title: 'Admissions made simple', body: 'A guided enquiry funnel captures qualified leads and routes them to your team instantly.' },
        { title: 'Programs that shine', body: 'Rich course pages, faculty profiles and campus stories that build genuine trust.' },
        { title: 'One parent portal', body: 'Fees, calendars and updates behind a single login — fewer calls, happier families.' },
      ],
      showcase: { title: 'Explore our programs', subtitle: 'Future-ready courses taught by world-class faculty.' },
      testimonial: {
        quote: 'Admission enquiries went up within weeks and parents find everything they need online.',
        name: 'Little Flower',
        role: 'School Administration',
      },
      closing: { title: 'Your campus, online.', sub: 'Open admissions, book a tour, or explore programs in a single click.' },
    },
    site: {
      layout: 'campus',
      theme: 'light',
      brand: 'Crestwood',
      domain: 'crestwood.edu',
      accent: '#2563EB',
      nav: ['Programs', 'Admissions', 'Campus', 'Faculty'],
      hero: {
        eyebrow: 'Est. 1962 • Ranked top 1%',
        title: 'Where curiosity becomes a career.',
        sub: 'World-class faculty, a future-ready curriculum and a campus built for big ideas.',
        cta: 'Apply now',
        secondary: 'Book a tour',
      },
      items: [
        { title: 'Computer Science', sub: 'B.Tech • 4 yrs', meta: '120 seats' },
        { title: 'Design & Media', sub: 'B.Des • 4 yrs', meta: '60 seats' },
        { title: 'Business', sub: 'BBA • 3 yrs', meta: '90 seats' },
        { title: 'Life Sciences', sub: 'B.Sc • 3 yrs', meta: '80 seats' },
      ],
      stats: [
        { value: '18k+', label: 'Students' },
        { value: '94%', label: 'Placement' },
        { value: '320+', label: 'Faculty' },
      ],
    },
  },

  /* ---------------------------------------------------------- 04 */
  {
    id: 'construction',
    number: '04',
    name: 'Construction Company',
    category: 'Construction',
    tagline: 'Project-proof websites that win bigger, better-qualified bids.',
    description:
      'A heavyweight contractor site that showcases completed projects, breaks down services, captures qualified quote requests and builds trust with certifications and a clear process.',
    hues: ['#F97316', '#FB923C'],
    glyph: '▲',
    timelineLabel: '5 weeks',
    timeline: [
      { label: 'Discovery', detail: 'Portfolio, services, positioning', weeks: 1 },
      { label: 'Design', detail: 'Project gallery, quote flow, UI', weeks: 1 },
      { label: 'Build', detail: 'CMS, estimate request, CRM hook', weeks: 2 },
      { label: 'Launch', detail: 'Local SEO, QA, handover', weeks: 1 },
    ],
    features: [
      'Project portfolio gallery',
      'Service & capability breakdown',
      'Quote / estimate request',
      'Step-by-step process timeline',
      'Team & certifications',
      'Client testimonials',
    ],
    integrations: ['WhatsApp', 'Google Maps', 'Zoho CRM', 'Mailchimp', 'Calendly', 'reCAPTCHA'],
    liveHref: '/showcase/construction',
    page: {
      intro:
        'Big projects start with trust. Show the work, the process and the proof — and win bigger, better-qualified bids.',
      valueProps: [
        { title: 'Proof over promises', body: 'A cinematic project portfolio that lets your craftsmanship close the deal.' },
        { title: 'Qualified enquiries only', body: 'A smart quote flow filters tyre-kickers and routes serious leads straight to your CRM.' },
        { title: 'On-time, on-record', body: 'A transparent process timeline and certifications that de-risk every decision.' },
      ],
      showcase: { title: 'Recent projects', subtitle: 'A portfolio built on trust and on-time delivery.' },
      testimonial: {
        quote: 'Our completed projects are showcased beautifully and clients trust us faster after seeing the site.',
        name: 'Zora Constructions',
        role: 'Managing Partner',
      },
      closing: { title: 'Let’s build it.', sub: 'Request a quote and get a clear scope, timeline and cost — no surprises.' },
    },
    site: {
      layout: 'projects',
      theme: 'light',
      brand: 'Apex BuildWorks',
      domain: 'apexbuild.co',
      accent: '#EA580C',
      nav: ['Projects', 'Services', 'Process', 'About'],
      hero: {
        eyebrow: 'Commercial & residential',
        title: 'We build landmarks, on time.',
        sub: '25 years of turnkey construction — from foundation to handover, delivered without surprises.',
        cta: 'Request a quote',
        secondary: 'View projects',
      },
      items: [
        { title: 'Skyline Towers', sub: 'Commercial', meta: '32 floors' },
        { title: 'Riverside Villas', sub: 'Residential', meta: '48 units' },
        { title: 'Metro Interchange', sub: 'Infrastructure', meta: '2.4 km' },
        { title: 'Aurora Mall', sub: 'Retail', meta: '4.1 L sqft' },
      ],
      stats: [
        { value: '480+', label: 'Projects' },
        { value: '25 yrs', label: 'Experience' },
        { value: '100%', label: 'On-time' },
      ],
    },
  },

  /* ---------------------------------------------------------- 05 */
  {
    id: 'real-estate',
    number: '05',
    name: 'Real Estate',
    category: 'Property',
    tagline: 'Listing platforms that move properties faster than the market.',
    description:
      'A property marketplace with filterable listings, map search, virtual tours, an EMI calculator and site-visit booking — designed to turn browsers into qualified leads.',
    hues: ['#0EA5E9', '#10B981'],
    glyph: '⬡',
    timelineLabel: '7 weeks',
    timeline: [
      { label: 'Discovery', detail: 'Inventory, filters, lead strategy', weeks: 1 },
      { label: 'Design', detail: 'Listings, map UX, detail pages', weeks: 2 },
      { label: 'Build', detail: 'Search, EMI calc, booking, CRM', weeks: 3 },
      { label: 'Launch', detail: 'SEO, performance, go-live', weeks: 1 },
    ],
    features: [
      'Filterable property listings',
      'Interactive map search',
      'Virtual tours & galleries',
      'Mortgage / EMI calculator',
      'Verified agent profiles',
      'Enquiry & site-visit booking',
    ],
    integrations: ['Google Maps', 'WhatsApp', 'Razorpay', 'HubSpot CRM', 'Mailchimp', '360° Tours'],
    liveHref: '/showcase/real-estate',
    page: {
      intro:
        'Buyers browse with their hearts and decide with their heads. Give them both — beautifully — and turn browsers into booked site visits.',
      valueProps: [
        { title: 'Search that feels effortless', body: 'Smart filters, map search and saved listings that keep buyers coming back.' },
        { title: 'See it before the visit', body: 'Virtual tours and rich galleries turn casual scrollers into serious enquiries.' },
        { title: 'Plan with confidence', body: 'A built-in EMI calculator and verified agents make the biggest decision easier.' },
      ],
      showcase: { title: 'Featured listings', subtitle: 'Handpicked homes — verified and visit-ready.' },
      testimonial: {
        quote: 'Buyers shortlist homes online and walk in already convinced — our visits convert far better now.',
        name: 'Haven Estates',
        role: 'Sales Head',
      },
      closing: { title: 'Find a place to love.', sub: 'Search homes, book a visit, or talk to a verified agent today.' },
    },
    site: {
      layout: 'listings',
      theme: 'light',
      brand: 'Haven',
      domain: 'havenestates.in',
      accent: '#0EA5E9',
      nav: ['Buy', 'Rent', 'Agents', 'Insights'],
      hero: {
        eyebrow: '12,400+ verified listings',
        title: 'Find a place to love.',
        sub: 'Smart search, virtual tours and EMI planning — your next home, without the runaround.',
        cta: 'Search homes',
        secondary: 'Talk to an agent',
      },
      items: [
        { title: '3 BHK Sea-View Apartment', sub: 'Besant Nagar', meta: '₹2.4 Cr' },
        { title: 'Modern 4 BHK Villa', sub: 'ECR', meta: '₹4.1 Cr' },
        { title: '2 BHK Smart Flat', sub: 'OMR', meta: '₹98 L' },
        { title: 'Penthouse Loft', sub: 'Nungambakkam', meta: '₹6.8 Cr' },
      ],
      stats: [
        { value: '12.4k', label: 'Listings' },
        { value: '850+', label: 'Agents' },
        { value: '4.9★', label: 'Rating' },
      ],
    },
  },

  /* ---------------------------------------------------------- 06 */
  {
    id: 'hr',
    number: '06',
    name: 'HR & Recruitment',
    category: 'Recruitment',
    tagline: 'Two-sided hiring platforms candidates actually enjoy using.',
    description:
      'A recruitment platform with a searchable job board, one-click apply, candidate dashboards and an employer portal with application tracking baked in.',
    hues: ['#EC4899', '#A855F7'],
    glyph: '◐',
    timelineLabel: '7 weeks',
    timeline: [
      { label: 'Discovery', detail: 'Roles, flows, ATS strategy', weeks: 1 },
      { label: 'Design', detail: 'Job board, apply flow, portals', weeks: 2 },
      { label: 'Build', detail: 'Auth, dashboards, tracking, uploads', weeks: 3 },
      { label: 'Launch', detail: 'Integrations, QA, go-live', weeks: 1 },
    ],
    features: [
      'Searchable job board',
      'One-click apply',
      'Candidate dashboard',
      'Employer portal',
      'Resume upload & parsing',
      'Application tracking',
    ],
    integrations: ['Greenhouse', 'LinkedIn', 'Calendly', 'Gmail', 'DocuSign', 'Slack'],
    liveHref: '/showcase/hr',
    page: {
      intro:
        'Great hiring is a two-way street. Make it effortless for candidates and employers alike — and watch time-to-hire collapse.',
      valueProps: [
        { title: 'Apply in one click', body: 'A delightful candidate flow with saved profiles and genuine one-tap applications.' },
        { title: 'Track everything', body: 'A real-time dashboard for candidates and an ATS-ready portal for employers.' },
        { title: 'Match, don’t search', body: 'Smart role matching surfaces the right jobs — and the right people — faster.' },
      ],
      showcase: { title: 'Latest openings', subtitle: 'Hundreds of roles from companies people love.' },
      testimonial: {
        quote: 'Time-to-hire dropped to under three days — the application tracking is a genuine game-changer.',
        name: 'TalentForge',
        role: 'Head of Talent',
      },
      closing: { title: 'Your next role, matched.', sub: 'Find a job or post an opening and start hiring in minutes.' },
    },
    site: {
      layout: 'jobs',
      theme: 'light',
      brand: 'TalentForge',
      domain: 'talentforge.io',
      accent: '#DB2777',
      nav: ['Jobs', 'Companies', 'For employers', 'Resources'],
      hero: {
        eyebrow: '24,000+ open roles',
        title: 'Your next role, matched in minutes.',
        sub: 'Apply once, track everything — and let great companies come to you.',
        cta: 'Find jobs',
        secondary: 'Post a job',
      },
      items: [
        { title: 'Senior Product Designer', sub: 'Nebula • Remote', meta: 'Full-time' },
        { title: 'Frontend Engineer', sub: 'Haven • Chennai', meta: 'Hybrid' },
        { title: 'Growth Marketer', sub: 'Magnet • Bengaluru', meta: 'Full-time' },
        { title: 'Data Analyst', sub: 'Crestwood • Remote', meta: 'Contract' },
      ],
      stats: [
        { value: '24k+', label: 'Open roles' },
        { value: '6.2k', label: 'Companies' },
        { value: '72h', label: 'Avg hire' },
      ],
    },
  },

  /* ---------------------------------------------------------- 07 */
  {
    id: 'restaurant',
    number: '07',
    name: 'Restaurant & Hospitality',
    category: 'Hospitality',
    tagline: 'Mouth-watering sites that fill tables and online carts.',
    description:
      'An appetising restaurant experience with a visual digital menu, table reservations, online ordering and review highlights — built to drive bookings and repeat orders.',
    hues: ['#EF4444', '#F59E0B'],
    glyph: '◗',
    timelineLabel: '4 weeks',
    timeline: [
      { label: 'Discovery', detail: 'Menu, brand mood, photography', weeks: 1 },
      { label: 'Design', detail: 'Menu UX, reservation flow, UI', weeks: 1 },
      { label: 'Build', detail: 'Ordering, bookings, integrations', weeks: 1 },
      { label: 'Launch', detail: 'Local SEO, QA, go-live', weeks: 1 },
    ],
    features: [
      'Visual digital menu',
      'Table reservations',
      'Online ordering & checkout',
      'Locations, hours & directions',
      'Reviews & ratings',
      'Private event booking',
    ],
    integrations: ['WhatsApp', 'Razorpay', 'Swiggy / Zomato', 'Google Maps', 'OpenTable', 'Instagram'],
    liveHref: '/showcase/restaurant',
    page: {
      intro:
        'People eat with their eyes first. Make every dish — and every booking — irresistible, on the busiest night of the week.',
      valueProps: [
        { title: 'A menu that sells', body: 'Mouth-watering photography and a fast, scannable menu built for cravings.' },
        { title: 'Tables, filled', body: 'Real-time reservations and online ordering that hold up when the kitchen is slammed.' },
        { title: 'Regulars, made', body: 'Reviews, events and offers that turn first-timers into Friday-night regulars.' },
      ],
      showcase: { title: 'From the kitchen', subtitle: 'Live-fire favourites, made to order.' },
      testimonial: {
        quote: 'The site loads fast and the ordering flow is so simple — online orders climbed steadily after launch.',
        name: 'Tic To Go',
        role: 'Owner',
      },
      closing: { title: 'A table awaits.', sub: 'Reserve, order in, or plan a private event — we’ll handle the rest.' },
    },
    site: {
      layout: 'menu',
      theme: 'light',
      brand: 'Saffron & Smoke',
      domain: 'saffronsmoke.com',
      accent: '#F59E0B',
      nav: ['Menu', 'Reserve', 'Order', 'Events'],
      hero: {
        eyebrow: 'Modern Indian • Chennai',
        title: 'Slow-smoked. Boldly spiced.',
        sub: 'A live-fire kitchen where heritage recipes meet modern technique. Book a table tonight.',
        cta: 'Reserve a table',
        secondary: 'Order online',
      },
      items: [
        { title: 'Smoked Lamb Galouti', sub: 'Chef’s signature', meta: '₹680' },
        { title: 'Charcoal Butter Chicken', sub: 'House favourite', meta: '₹540' },
        { title: 'Truffle Dal Saffron', sub: 'Vegetarian', meta: '₹460' },
        { title: 'Rose & Pistachio Kulfi', sub: 'Dessert', meta: '₹280' },
      ],
      stats: [
        { value: '4.8★', label: '2.1k reviews' },
        { value: '#3', label: 'In the city' },
        { value: '40 min', label: 'Delivery' },
      ],
    },
  },

  /* ---------------------------------------------------------- 08 */
  {
    id: 'marketing',
    number: '08',
    name: 'Digital Marketing Agency',
    category: 'Agency',
    tagline: 'Bold, results-led sites that prove you can do it for clients too.',
    description:
      'A high-energy agency site with scroll storytelling, a case-study showcase, productised service packages, hard results and a frictionless lead-capture funnel.',
    hues: ['#D9FF3F', '#A3E635'],
    glyph: '✦',
    timelineLabel: '5 weeks',
    timeline: [
      { label: 'Strategy', detail: 'Positioning, offer, narrative', weeks: 1 },
      { label: 'Design', detail: 'Storytelling, case studies, UI', weeks: 2 },
      { label: 'Build', detail: 'CMS, lead funnel, animations', weeks: 1 },
      { label: 'Launch', detail: 'Analytics, A/B, go-live', weeks: 1 },
    ],
    features: [
      'Bold scroll storytelling',
      'Case-study showcase',
      'Productised service packages',
      'Results & metrics proof',
      'Multi-step lead capture',
      'Insights / blog CMS',
    ],
    integrations: ['HubSpot', 'GA4', 'Calendly', 'Mailchimp', 'Meta Pixel', 'Notion'],
    liveHref: '/showcase/marketing',
    page: {
      intro:
        'If you can’t make your own brand impossible to ignore, why would a client trust you with theirs? This is the proof.',
      valueProps: [
        { title: 'Story-led, results-backed', body: 'Scroll storytelling that hooks, paired with hard numbers that close.' },
        { title: 'Proof that performs', body: 'A case-study showcase engineered to make prospects say “do that for us.”' },
        { title: 'Funnels that compound', body: 'Productised packages and a multi-step lead funnel that quietly fills your pipeline.' },
      ],
      showcase: { title: 'What we do', subtitle: 'Full-funnel growth, under one roof.' },
      testimonial: {
        quote: 'Branding, website, campaigns — all handled under one roof, and the leads keep compounding.',
        name: 'H2H',
        role: 'Brand Lead',
      },
      closing: { title: 'Impossible to ignore.', sub: 'Start a project and let’s build a brand the market can’t scroll past.' },
    },
    site: {
      layout: 'agency',
      theme: 'dark',
      brand: 'Magnet',
      domain: 'magnet.agency',
      accent: '#D9FF3F',
      nav: ['Work', 'Services', 'Results', 'Contact'],
      hero: {
        eyebrow: 'Growth • Brand • Performance',
        title: 'We make brands impossible to ignore.',
        sub: 'Full-funnel marketing that compounds — strategy, creative and media under one roof.',
        cta: 'Start a project',
        secondary: 'See the work',
      },
      items: [
        { title: 'Performance Marketing', sub: 'Paid social & search' },
        { title: 'Brand & Creative', sub: 'Identity & content' },
        { title: 'SEO & Content', sub: 'Organic growth' },
        { title: 'Web & CRO', sub: 'Funnels that convert' },
      ],
      stats: [
        { value: '6.4×', label: 'Avg ROAS' },
        { value: '+212%', label: 'Lead growth' },
        { value: '180+', label: 'Brands' },
      ],
    },
  },
];
