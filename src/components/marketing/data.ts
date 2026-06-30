/**
 * Magnet - bespoke demo content.
 * A fictional full-funnel marketing agency used to show the kind of
 * bold, results-led website CRUD Studio builds for agencies.
 */

export const agency = {
  name: 'Magnet',
  domain: 'magnet.agency',
  tagline: 'We make brands impossible to ignore.',
} as const;

export const marqueeWords = ['Growth', 'Brand', 'Performance', 'Content', 'SEO', 'Paid Social', 'Creative', 'CRO'];

export type CountStat = { value: number; suffix?: string; prefix?: string; decimals?: number; label: string };

export const results: CountStat[] = [
  { value: 6.4, suffix: '×', decimals: 1, label: 'Average ROAS' },
  { value: 212, suffix: '%', prefix: '+', label: 'Lead growth' },
  { value: 180, suffix: '+', label: 'Brands scaled' },
  { value: 48, suffix: 'M', prefix: '₹', label: 'Ad spend managed' },
];

export const serviceCats = ['Paid', 'SEO', 'Brand', 'Web'] as const;
export type ServiceCat = (typeof serviceCats)[number];

export type Service = { no: string; title: string; body: string };

export const services: Service[] = [
  { no: '01', title: 'Performance Marketing', body: 'Paid social and search engineered for profit - not vanity metrics.' },
  { no: '02', title: 'Brand & Creative', body: 'Identity, content and campaigns people actually stop scrolling for.' },
  { no: '03', title: 'SEO & Content', body: 'Compounding organic growth that keeps paying long after the invoice.' },
  { no: '04', title: 'Web & CRO', body: 'Landing pages and funnels tuned to turn traffic into revenue.' },
];

export type CaseStudy = {
  client: string;
  category: ServiceCat;
  metric: string;
  metricLabel: string;
  blurb: string;
};

export const caseStudies: CaseStudy[] = [
  { client: 'Inego', category: 'Paid', metric: '7.2×', metricLabel: 'ROAS', blurb: 'Scaled a fashion DTC brand from ₹4L to ₹38L monthly revenue in two quarters.' },
  { client: 'MediNova', category: 'SEO', metric: '+318%', metricLabel: 'organic leads', blurb: 'Owned every local healthcare search term across three cities.' },
  { client: 'Haven', category: 'Web', metric: '+64%', metricLabel: 'conversion rate', blurb: 'Rebuilt the listing funnel and nearly doubled qualified enquiries.' },
  { client: 'JolloX', category: 'Brand', metric: '12M', metricLabel: 'launch reach', blurb: 'A launch identity and campaign that broke the startup out overnight.' },
  { client: 'Saffron & Smoke', category: 'Paid', metric: '+240%', metricLabel: 'reservations', blurb: 'Geo-targeted social that filled tables on the slowest weeknights.' },
  { client: 'Nebula', category: 'Web', metric: '2.1×', metricLabel: 'trial signups', blurb: 'A conversion-led relaunch that doubled product trials in 30 days.' },
];

export const process = [
  { no: '01', title: 'Diagnose', body: 'We audit your funnel, market and data to find where the money leaks.' },
  { no: '02', title: 'Strategy', body: 'A clear, opinionated plan with targets we’re willing to be measured on.' },
  { no: '03', title: 'Execute', body: 'Creative, media and dev sprint in lockstep - shipping every week.' },
  { no: '04', title: 'Scale', body: 'Double down on what works, kill what doesn’t, compound the wins.' },
];

export const clients = ['Inego', 'JolloX', 'Haven', 'MediNova', 'Nebula', 'Saffron', 'Tote', 'Ziba', 'H2H', 'Taraa'];

export const testimonial = {
  quote:
    'Magnet didn’t just run our ads - they rebuilt how we think about growth. Six months in, we’re spending more and making far more on every rupee.',
  name: 'Vikram Shetty',
  role: 'Founder, Inego',
};
