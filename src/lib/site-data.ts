/**
 * CRUD Studio — content extracted from the original site (thecrudstudio.com)
 * on 2026-06-10. Single source of truth for the marketing site.
 */

export const studio = {
  name: 'CRUD',
  fullName: 'CRUD Studio',
  acronym: 'Create. Refine. Unified. Designs.',
  tagline: 'Ideas to Iconic Brands',
  heroLede:
    'We create powerful brands through innovative design, seamless web development, and strategic digital solutions that connect and engage.',
  manifesto:
    "We don't just digitalize products — we create success stories.",
  about:
    'CRUD (Create Refine Unified Designs) is a dynamic design agency providing end-to-end solutions in brand building, web development, graphic design, and digital marketing. We transform ideas into powerful brands with a seamless blend of creativity and innovation.',
  ctaLine: 'From Vision to Reality: Bringing Your Boldest Ideas to Life.',
} as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  items: string[];
  /** hue pair used by the dynamic preview panel */
  hues: [string, string];
};

export const services: Service[] = [
  {
    id: 'branding',
    index: '01',
    title: 'Branding',
    description:
      'Brand strategy, positioning and identity systems that turn first impressions into lasting loyalty.',
    items: ['Brand Strategy', 'Positioning', 'Visual Identity', 'Logo Design'],
    hues: ['#FF7A3F', '#FF3F8E'],
  },
  {
    id: 'web-development',
    index: '02',
    title: 'Web Development',
    description:
      'Full-stack, 3D and content-driven websites engineered to perform — from first paint to first conversion.',
    items: ['Custom Websites', 'Headless / CMS', 'E-commerce', 'Performance & SEO'],
    hues: ['#3FFFB5', '#3F9DFF'],
  },
  {
    id: 'app-development',
    index: '03',
    title: 'App Development',
    description:
      'Native-grade iOS and Android apps with fluid, delightful experiences users keep coming back to.',
    items: ['iOS & Android', 'Cross-platform', 'API Integration', 'Store Launch'],
    hues: ['#3F9DFF', '#9D3FFF'],
  },
  {
    id: 'uiux-design',
    index: '04',
    title: 'UI/UX Design',
    description:
      'Research-driven product design — from audit and discovery to scalable, consistent design systems.',
    items: ['UX Audit', 'User Research', 'Prototyping', 'Design Systems'],
    hues: ['#9D3FFF', '#FF3F8E'],
  },
  {
    id: 'software-development',
    index: '05',
    title: 'Software Development',
    description:
      'Robust, maintainable software and platforms built around your business logic and built to scale.',
    items: ['Custom Software', 'SaaS Platforms', 'Cloud & APIs', 'Automation'],
    hues: ['#D9FF3F', '#3FFFB5'],
  },
  {
    id: 'digital-marketing',
    index: '06',
    title: 'Digital Marketing',
    description:
      'Performance campaigns, SEO and content that compound your reach and revenue month after month.',
    items: ['SEO', 'Paid Social', 'Content', 'Analytics'],
    hues: ['#FF3F8E', '#FF7A3F'],
  },
  {
    id: 'brand-building',
    index: '07',
    title: 'Brand Building & Design',
    description:
      'Ongoing creative, guidelines and collateral that keep your brand sharp and consistent everywhere.',
    items: ['Brand Guidelines', 'Collateral', 'Social Kits', 'Art Direction'],
    hues: ['#FFD23F', '#FF7A3F'],
  },
];

export type ServiceIcon =
  | 'branding'
  | 'web'
  | 'app'
  | 'uiux'
  | 'software'
  | 'marketing'
  | 'brand';

export type Project = {
  id: string;
  title: string;
  /** short label shown in the top chip */
  category: string;
  /** one-line description revealed on hover */
  blurb: string;
  /** which vector illustration to render */
  icon: ServiceIcon;
  /** bento sizing on desktop */
  span: 'wide' | 'tall' | 'standard';
  hues: [string, string];
};

/** The things we do — rendered as the "Selected Works" bento. */
export const projects: Project[] = [
  { id: 'branding', title: 'Branding', category: 'Identity & Strategy', blurb: 'Names, marks and brand systems that make first impressions unforgettable.', icon: 'branding', span: 'wide', hues: ['#FF7A3F', '#0D0D0B'] },
  { id: 'web-development', title: 'Web Development', category: 'Sites & Platforms', blurb: 'Fast, scalable, content-driven websites engineered to convert.', icon: 'web', span: 'standard', hues: ['#3FFFB5', '#0D0D0B'] },
  { id: 'app-development', title: 'App Development', category: 'iOS & Android', blurb: 'Native-grade mobile apps with delightful, fluid experiences.', icon: 'app', span: 'standard', hues: ['#3F9DFF', '#0D0D0B'] },
  { id: 'uiux-design', title: 'UI / UX Design', category: 'Product Design', blurb: 'Research-led interfaces — from discovery and audit to scale.', icon: 'uiux', span: 'tall', hues: ['#9D3FFF', '#0D0D0B'] },
  { id: 'software-development', title: 'Software Development', category: 'Custom Systems', blurb: 'Robust, maintainable software built around your business logic.', icon: 'software', span: 'standard', hues: ['#D9FF3F', '#0D0D0B'] },
  { id: 'digital-marketing', title: 'Digital Marketing', category: 'Growth & Reach', blurb: 'Performance campaigns and SEO that compound your audience.', icon: 'marketing', span: 'standard', hues: ['#FF3F8E', '#0D0D0B'] },
  { id: 'brand-building', title: 'Brand Building & Design', category: 'Visual Systems', blurb: 'Guidelines, collateral and creative that keep your brand consistent.', icon: 'brand', span: 'standard', hues: ['#FFD23F', '#0D0D0B'] },
];

export const differentiators = [
  'Unlimited requests',
  'Unlimited revisions',
  'Unlimited brand profiles',
  'Native source files',
  '7-day money-back guarantee',
  'Real-time collaboration',
  'Cancel anytime',
  'Senior designers only',
] as const;

export const pillars = [
  {
    title: 'Exceptional Talent',
    body: 'Your projects are handled by middle and senior designers with proven expertise — every design crafted with precision and creativity that elevates your brand.',
  },
  {
    title: 'Seamless Collaboration',
    body: 'Real-time collaboration with our team keeps you involved and informed at every stage while your vision comes to life flawlessly.',
  },
  {
    title: 'Unlimited Possibilities',
    body: 'Unlimited requests, revisions and brand profiles — flexibility that adapts to your evolving business without compromise.',
  },
  {
    title: 'Risk-Free Guarantee',
    body: 'A 7-day money-back guarantee and native source files delivered. Complete peace of mind and full ownership of every project.',
  },
] as const;

export const testimonials = [
  {
    name: 'Dr. Diwakar GP',
    role: 'Website Client',
    quote:
      'Collaborating with CRUD for our website was an exceptional experience. Their research-driven approach and creative execution brought our vision to life. The unique features and seamless navigation they designed truly capture the essence of our modern curriculum.',
  },
  {
    name: 'Michael Berillo',
    role: 'WordPress Client',
    quote:
      "CRUD's expertise in WordPress development was pivotal in elevating our brand's digital presence. The website they built aligns perfectly with our aesthetic and functions flawlessly across devices. Their commitment to perfection ensured a smooth and rewarding project.",
  },
] as const;

export type ClientTestimonial = {
  name: string;
  role: string;
  quote: string;
};

/** Client testimonials — businesses worked with, mostly in and around Chennai. */
export const clientTestimonials: ClientTestimonial[] = [
  {
    name: 'Adgro Hair',
    role: 'Salon · Kovilambakkam',
    quote:
      'Our salon page looks really classy and booking enquiries come straight to WhatsApp now. New customers from Kovilambakkam and Madipakkam side say they found us online itself.',
  },
  {
    name: 'Astrologer Live Tracking',
    role: 'Astrology Platform',
    quote:
      'The live consultation tracking they built runs without any hiccups, even during peak evening hours. Clients see their slot timings clearly and sessions start on time.',
  },
  {
    name: 'Ayyapa Catering Service',
    role: 'Catering · Chennai',
    quote:
      'Once the website went live, wedding season enquiries were nonstop. The menu pages and photo gallery made it very easy for families to shortlist us.',
  },
  {
    name: 'Buddha Creations',
    role: 'Design Studio',
    quote:
      'They understood our creative style and delivered a portfolio site that actually feels like us. Clean work, on-time delivery, no unnecessary back and forth.',
  },
  {
    name: 'Dr. Prasad E',
    role: 'Medical Practitioner',
    quote:
      'Patients now book appointments online instead of waiting on phone calls. The site is simple, fast and exactly what a clinic needs.',
  },
  {
    name: 'Finance App',
    role: 'Fintech Product',
    quote:
      'From wireframes to the final build, the team was thorough. The app feels premium and our early users keep complimenting how smooth it is.',
  },
  {
    name: 'H2H',
    role: 'Brand Client',
    quote:
      'Branding, website, everything handled under one roof. They respond quickly even for small changes — very rare to find that.',
  },
  {
    name: 'Inego',
    role: 'Clothing Brand',
    quote:
      'Most of our drops sell through Instagram, and the store they built converts that traffic really well. Checkout is smooth and the brand vibe stays intact.',
  },
  {
    name: 'JolloX',
    role: 'Startup Brand',
    quote:
      'Sharp logo, solid identity and a landing page that gets the idea across in seconds. Exactly the launch presence we wanted.',
  },
  {
    name: 'Little Flower',
    role: 'Education',
    quote:
      'Parents find admission details easily now and enquiries went up within weeks. Very patient team — they handled all our corrections happily.',
  },
  {
    name: 'Mithran Traders',
    role: 'Investments',
    quote:
      'They presented our investment plans in a clean, trustworthy way. Clients understand the schemes much better and follow-ups have become easier.',
  },
  {
    name: "Refai's Clinic",
    role: 'Healthcare',
    quote:
      'Neat clinic website with timings, directions and booking — delivered within the promised date. Patients from Chromepet side locate us easily now.',
  },
  {
    name: 'Subashini Fertility Clinic',
    role: 'Fertility Clinic',
    quote:
      'They handled our requirement with a lot of care, and the website feels warm and reassuring for couples. We get steady appointment requests from across South Chennai.',
  },
  {
    name: 'Taraa Groups',
    role: 'Business Group',
    quote:
      'A proper corporate presence for all our verticals in one place. Professional team, clear communication, delivered ahead of schedule.',
  },
  {
    name: 'Tic To Go',
    role: 'F&B Brand',
    quote:
      'Ours is a quirky brand and they matched the energy perfectly. The site loads fast and the ordering flow is super simple for customers.',
  },
  {
    name: 'Tote Bag',
    role: 'Lifestyle Brand',
    quote:
      'Product photos, catalogue, enquiry flow — everything arranged so neatly that bulk order enquiries nearly doubled. Worth every rupee.',
  },
  {
    name: 'Varahi Lakshmi Silks',
    role: 'Silk Sarees',
    quote:
      'Our sarees finally look as grand online as they do in the shop. Customers browse the collection at home and walk in asking for specific designs.',
  },
  {
    name: 'Ziba',
    role: 'Boutique',
    quote:
      "Elegant, minimal and very 'us'. The team has a good eye for detail and the whole process was completely stress-free.",
  },
  {
    name: 'Zora Constructions',
    role: 'Construction',
    quote:
      'Our completed projects are showcased beautifully and clients trust us faster after seeing the site. Enquiries are more serious and better qualified now.',
  },
];

export const contact = {
  email: 'thecrudstudio@gmail.com',
  locations: [
    { label: 'India', phone: '(+91) 99406 34910', whatsapp: '(+91) 87786 45672' },
    { label: 'Germany', phone: '(+49) 1521 407 4301' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'X / Twitter', href: 'https://x.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
} as const;
