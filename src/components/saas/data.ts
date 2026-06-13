/**
 * Nebula — bespoke demo content.
 * A fictional AI workflow product used to show the kind of
 * sleek, conversion-led SaaS website CRUD Studio builds.
 */

export const product = {
  name: 'Nebula',
  domain: 'nebula.ai',
  tagline: 'The autonomous workflow engine.',
} as const;

export const logos = ['Acme', 'Vertex', 'Lumen', 'Northwind', 'Cobalt', 'Hyperion'];

export type FeatureTab = {
  key: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  metric: string;
  metricLabel: string;
};

export const featureTabs: FeatureTab[] = [
  {
    key: 'automate',
    label: 'Automate',
    title: 'Agents that run your busywork.',
    desc: 'Describe a workflow in plain English and Nebula builds, runs and monitors it — across every tool you already use.',
    bullets: ['Natural-language workflow builder', 'Trigger on any event', 'Self-healing retries'],
    metric: '+312%',
    metricLabel: 'team throughput',
  },
  {
    key: 'analyze',
    label: 'Analyze',
    title: 'Answers, not dashboards.',
    desc: 'Ask questions of your data in chat and get charts, summaries and the “so what” — no SQL, no waiting on analysts.',
    bullets: ['Natural-language analytics', 'Live anomaly alerts', 'Auto-generated reports'],
    metric: '18h',
    metricLabel: 'saved per week',
  },
  {
    key: 'collaborate',
    label: 'Collaborate',
    title: 'One workspace for humans + agents.',
    desc: 'Assign work to people or agents in the same board. Comment, review and approve — agents pick up the rest.',
    bullets: ['Shared agent inbox', 'Human-in-the-loop approvals', 'Full audit trail'],
    metric: '1,204',
    metricLabel: 'active agents',
  },
  {
    key: 'integrate',
    label: 'Integrate',
    title: 'Connected to your whole stack.',
    desc: 'Two-way sync with 120+ tools out of the box, plus a typed SDK and webhooks for everything else.',
    bullets: ['120+ native integrations', 'Typed SDK + REST API', 'Webhooks & events'],
    metric: '120+',
    metricLabel: 'integrations',
  },
];

export const bento = [
  { title: 'Enterprise-grade security', body: 'SOC 2 Type II, SSO/SAML, granular roles and row-level data isolation.', span: true },
  { title: 'Sub-second runs', body: 'A globally distributed runtime executes agents close to your data.' },
  { title: 'Version everything', body: 'Every workflow is versioned, diffable and instantly rollback-able.' },
  { title: 'Bring your own model', body: 'GPT, Claude, Llama or your fine-tune — switch models per step.', span: true },
];

export type Plan = {
  name: string;
  monthly: number;
  annual: number;
  blurb: string;
  features: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  { name: 'Starter', monthly: 0, annual: 0, blurb: 'For individuals exploring automation.', features: ['Up to 3 agents', '1,000 runs / mo', 'Community support', 'Core integrations'] },
  { name: 'Pro', monthly: 29, annual: 24, blurb: 'For teams shipping real workflows.', popular: true, features: ['Unlimited agents', '50,000 runs / mo', 'Priority support', 'All integrations', 'Version history'] },
  { name: 'Scale', monthly: 99, annual: 82, blurb: 'For orgs running mission-critical ops.', features: ['Everything in Pro', 'Unlimited runs', 'SSO / SAML & SOC 2', 'Dedicated success manager', 'SLA & on-prem option'] },
];

export const integrations = ['Slack', 'Notion', 'GitHub', 'Salesforce', 'Stripe', 'HubSpot', 'Linear', 'Snowflake', 'Gmail', 'Figma', 'Jira', 'Postgres'];

export const testimonial = {
  quote:
    'Nebula replaced a tangle of brittle scripts and three internal tools. We shipped our first production agent in an afternoon — and doubled trial signups within a month.',
  name: 'Ananya Rao',
  role: 'Founder & CEO',
};

export const metrics = [
  { value: '4.9/5', label: 'G2 rating' },
  { value: '8,000+', label: 'Teams' },
  { value: '99.99%', label: 'Uptime' },
  { value: '2.1B', label: 'Runs / month' },
];
