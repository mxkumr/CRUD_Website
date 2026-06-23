import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { studio, services, pillars, differentiators, testimonials, contact } from '../site-data';
import { studioStats, workPage, studioPage, contactPage } from '../pages-data';
import { industries } from '../showcase-data';
import { colors, FOOTER_RESERVE, PAGE } from './theme';
import { registerBrochureFonts } from './fonts';
import { PageChrome, CoverChrome, CardTopAccent } from './BrochureDecor';

registerBrochureFonts();

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.ink,
    color: colors.bone,
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    lineHeight: 1.55,
    paddingTop: PAGE.top,
    paddingBottom: FOOTER_RESERVE + 12,
    paddingHorizontal: PAGE.x,
  },
  coverPage: {
    backgroundColor: colors.ink,
    paddingTop: 0,
    paddingBottom: FOOTER_RESERVE + 12,
    paddingHorizontal: 0,
  },
  row: { flexDirection: 'row' },
  col: { flex: 1 },
  colHalf: { width: '48%' },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eyebrowLine: {
    width: 28,
    height: 1,
    backgroundColor: colors.boneDim,
    marginRight: 10,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.volt,
    marginRight: 10,
  },
  eyebrow: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 6.5,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: colors.boneDim,
  },
  h1: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 28,
    textTransform: 'uppercase',
    lineHeight: 0.95,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    textTransform: 'uppercase',
    lineHeight: 1.05,
    marginBottom: 10,
  },
  h3: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  accent: { color: colors.volt },
  body: { color: colors.boneDim, fontSize: 8.5, lineHeight: 1.6 },
  lede: { color: colors.bone, fontSize: 9.5, lineHeight: 1.65, marginBottom: 12 },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    marginVertical: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: PAGE.x,
    right: PAGE.x,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
  },
  footerLogo: { width: 52, height: 20 },
  footerText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 6.5,
    color: colors.boneDim,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  /* Stat strip — matches site StatStrip grid */
  statGrid: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    overflow: 'hidden',
  },
  statCell: {
    flex: 1,
    backgroundColor: colors.inkSoft,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: colors.line,
  },
  statCellLast: { borderRightWidth: 0 },
  statValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    color: colors.bone,
    marginBottom: 4,
  },
  statValueAccent: { color: colors.volt },
  statLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 6.5,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.bone,
  },
  statSub: { fontSize: 6.5, color: colors.boneDim, marginTop: 3 },
  card: {
    backgroundColor: colors.inkRaise,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 11,
    paddingTop: 13,
    position: 'relative',
    overflow: 'hidden',
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
  tag: {
    fontSize: 6.5,
    color: colors.boneDim,
    backgroundColor: colors.inkSoft,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    marginRight: 5,
    marginBottom: 5,
  },
  quoteBox: {
    backgroundColor: colors.inkRaise,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  quoteText: { fontSize: 8, color: colors.bone, lineHeight: 1.55, marginBottom: 6 },
  quoteAuthor: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, textTransform: 'uppercase' },
  quoteRole: { fontSize: 6.5, color: colors.boneDim, marginTop: 2 },
  processRow: { flexDirection: 'row' },
  processCard: {
    flex: 1,
    backgroundColor: colors.inkRaise,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  processNum: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7,
    color: colors.boneDim,
    letterSpacing: 1,
    marginBottom: 4,
  },
  outcomeBox: {
    flex: 1,
    backgroundColor: colors.inkSoft,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  outcomeMetric: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
    color: colors.bone,
  },
  timelineCard: {
    width: '48%',
    backgroundColor: colors.inkRaise,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  contactBlock: {
    backgroundColor: colors.inkRaise,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 14,
  },
  ctaPill: {
    backgroundColor: colors.bone,
    color: colors.inkRaise,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { width: '24%', marginBottom: 10 },
  industryCard: { width: '24%', marginBottom: 10 },
});

function Eyebrow({ children, pulse }: { children: React.ReactNode; pulse?: boolean }) {
  return (
    <View style={s.eyebrowRow}>
      {pulse ? <View style={s.eyebrowDot} /> : <View style={s.eyebrowLine} />}
      <Text style={s.eyebrow}>{children}</Text>
    </View>
  );
}

function PageFooter({ page, logoSrc }: { page: number; logoSrc: string }) {
  return (
    <View style={s.footer} fixed>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image src={logoSrc} style={s.footerLogo} />
        <Text style={[s.footerText, { marginLeft: 10 }]}>thecrudstudio.com</Text>
      </View>
      <Text style={s.footerText}>{page}</Text>
    </View>
  );
}

function SectionTitle({ eyebrow, title, accent, end, pulse }: {
  eyebrow: string;
  title: string;
  accent?: string;
  end?: string;
  pulse?: boolean;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Eyebrow pulse={pulse}>{eyebrow}</Eyebrow>
      <Text style={s.h2}>
        {title}
        {accent ? <Text style={s.accent}> {accent}</Text> : null}
        {end ?? ''}
      </Text>
    </View>
  );
}

function StatStrip() {
  return (
    <View style={s.statGrid}>
      {studioStats.map((stat, i) => (
        <View key={stat.label} style={[s.statCell, i === studioStats.length - 1 ? s.statCellLast : {}]}>
          <Text style={[s.statValue, i === 0 ? s.statValueAccent : {}]}>{stat.value}</Text>
          <Text style={s.statLabel}>{stat.label}</Text>
          {stat.sub ? <Text style={s.statSub}>{stat.sub}</Text> : null}
        </View>
      ))}
    </View>
  );
}

const clientNames = [
  'Adgro Hair', "Refai's Clinic", 'Subashini Fertility', 'Zora Constructions',
  'Little Flower', 'Tic To Go', 'Inego', 'H2H', 'Varahi Lakshmi Silks', 'Taraa Groups',
];

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP',
  'Three.js', 'WordPress', 'Webflow', 'Shopify', 'Figma', 'Vercel',
];

export function BrochureDocument({ logoSrc }: { logoSrc: string }) {
  return (
    <Document title="CRUD Studio — Ideas to Iconic Brands" author="CRUD Studio" subject="Marketing Brochure">

      {/* 1 COVER */}
      <Page size="A4" orientation="landscape" style={s.coverPage}>
        <CoverChrome />
        <View style={[s.row, { flex: 1, paddingTop: PAGE.top }]}>
          <View style={{ width: '38%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
            <Image src={logoSrc} style={{ width: 200 }} />
          </View>
          <View style={{ width: '62%', paddingRight: PAGE.x, paddingLeft: 28, justifyContent: 'center' }}>
            <Eyebrow pulse>{studio.acronym}</Eyebrow>
            <Text style={s.h1}>
              Ideas to <Text style={s.accent}>Iconic</Text> Brands
            </Text>
            <View style={{ width: 28, height: 1, backgroundColor: colors.boneDim, marginVertical: 14 }} />
            <Text style={[s.lede, { maxWidth: 460 }]}>{studio.heroLede}</Text>
            <Text style={[s.body, { maxWidth: 440 }]}>{studio.manifesto}</Text>
            <Text style={[s.footerText, { marginTop: 16, color: colors.boneDim }]}>{contact.email}</Text>
          </View>
        </View>
        <PageFooter page={1} logoSrc={logoSrc} />
      </Page>

      {/* 2 ABOUT */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome hue="#3FFFB5" />
        <View style={s.row}>
          <View style={[s.col, { paddingRight: 20 }]}>
            <SectionTitle eyebrow="The studio" title="We don't digitalize —" accent="we craft success" />
            <Text style={s.lede}>{studio.about}</Text>
            <Text style={s.body}>{studioPage.mission}</Text>
          </View>
          <View style={[s.col, { paddingLeft: 12 }]}>
            <Eyebrow>By the numbers</Eyebrow>
            <StatStrip />
            <View style={{ marginTop: 14 }}>
              <Eyebrow>What you get</Eyebrow>
              <View style={s.tagRow}>
                {differentiators.slice(0, 4).map((d) => (
                  <Text key={d} style={s.tag}>{d}</Text>
                ))}
              </View>
              <View style={s.tagRow}>
                {differentiators.slice(4).map((d) => (
                  <Text key={d} style={s.tag}>{d}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
        <PageFooter page={2} logoSrc={logoSrc} />
      </Page>

      {/* 3 JOURNEY + PRINCIPLES */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome hue="#9D3FFF" />
        <SectionTitle eyebrow="Our journey" title="From two people to" accent="two continents" />
        <View style={[s.row, { flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 14 }]}>
          {studioPage.timeline.map((item) => (
            <View key={item.year} style={s.timelineCard}>
              <Text style={[s.h3, { color: colors.boneDim }]}>{item.year}</Text>
              <Text style={s.h3}>{item.title}</Text>
              <Text style={s.body}>{item.body}</Text>
            </View>
          ))}
        </View>
        <View style={s.divider} />
        <Eyebrow>How we think</Eyebrow>
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          {studioPage.principles.map((p) => (
            <View key={p.title} style={[s.card, { width: '23.5%' }]}>
              <Text style={s.h3}>{p.title}</Text>
              <Text style={[s.body, { fontSize: 7.5 }]}>{p.body}</Text>
            </View>
          ))}
        </View>
        <PageFooter page={3} logoSrc={logoSrc} />
      </Page>

      {/* 4 SERVICES */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome hue="#3F9DFF" />
        <SectionTitle eyebrow="What we do" title="One studio," accent="every" end=" discipline" />
        <Text style={[s.body, { marginBottom: 12, maxWidth: 520 }]}>
          End-to-end capabilities under one roof — from first sketch to launch and beyond.
        </Text>
        <View style={s.serviceGrid}>
          {services.map((svc) => (
            <View key={svc.id} style={[s.card, s.serviceCard]}>
              <CardTopAccent color={svc.hues[0]} />
              <Text style={[s.h3, { color: svc.hues[0], fontSize: 7 }]}>{svc.index}</Text>
              <Text style={s.h3}>{svc.title}</Text>
              <Text style={[s.body, { fontSize: 7, marginBottom: 4 }]}>{svc.description}</Text>
              <View style={s.tagRow}>
                {svc.items.slice(0, 2).map((item) => (
                  <Text key={item} style={[s.tag, { fontSize: 6 }]}>{item}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <PageFooter page={4} logoSrc={logoSrc} />
      </Page>

      {/* 5 WHY + PILLARS */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome hue="#FF7A3F" />
        <SectionTitle eyebrow="Why CRUD" title="Built for" accent="bold" end=" brands" />
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          {pillars.map((p, i) => (
            <View key={p.title} style={[s.card, { width: '23.5%' }]}>
              <CardTopAccent color={services[i]?.hues[0] ?? colors.lineSolid} />
              <Text style={s.h3}>{p.title}</Text>
              <Text style={[s.body, { fontSize: 7.5 }]}>{p.body}</Text>
            </View>
          ))}
        </View>
        <View style={s.divider} />
        <View style={s.row}>
          <View style={[s.col, { paddingRight: 16 }]}>
            <Eyebrow>How we work</Eyebrow>
            <Text style={[s.h2, { fontSize: 14 }]}>Work that <Text style={s.accent}>moves</Text> the needle</Text>
            <Text style={s.body}>{workPage.lede}</Text>
          </View>
          <View style={[s.col, s.processRow]}>
            {workPage.process.map((step) => (
              <View key={step.n} style={s.processCard}>
                <Text style={s.processNum}>{step.n}</Text>
                <Text style={[s.h3, { fontSize: 8 }]}>{step.title}</Text>
                <Text style={[s.body, { fontSize: 7 }]}>{step.body}</Text>
              </View>
            ))}
          </View>
        </View>
        <PageFooter page={5} logoSrc={logoSrc} />
      </Page>

      {/* 6 RESULTS + TESTIMONIALS */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome />
        <SectionTitle eyebrow="Results" title="Outcomes that" accent="compound" />
        <View style={[s.row, { marginBottom: 16 }]}>
          {workPage.outcomes.map((o) => (
            <View key={o.label} style={s.outcomeBox}>
              <Text style={s.outcomeMetric}>{o.metric}</Text>
              <Text style={[s.statLabel, { marginTop: 4 }]}>{o.label}</Text>
              <Text style={[s.statSub, { textAlign: 'center' }]}>{o.detail}</Text>
            </View>
          ))}
        </View>
        <View style={s.row}>
          {testimonials.map((t) => (
            <View key={t.name} style={[s.quoteBox, { width: '48%' }]}>
              <Text style={s.quoteText}>&ldquo;{t.quote}&rdquo;</Text>
              <Text style={s.quoteAuthor}>{t.name}</Text>
              <Text style={s.quoteRole}>{t.role}</Text>
            </View>
          ))}
        </View>
        <PageFooter page={6} logoSrc={logoSrc} />
      </Page>

      {/* 7 CLIENTS + INDUSTRY */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome hue="#22D3EE" />
        <View style={s.row}>
          <View style={{ width: '32%', paddingRight: 16 }}>
            <SectionTitle eyebrow="Partners" title="Brands we've" accent="worked with" />
            <View style={s.tagRow}>
              {clientNames.map((name) => (
                <Text key={name} style={s.tag}>{name}</Text>
              ))}
            </View>
            <Text style={[s.body, { marginTop: 8, fontSize: 7.5 }]}>
              And 9+ more across healthcare, education, construction, F&B, fashion and fintech.
            </Text>
          </View>
          <View style={{ width: '68%' }}>
            <SectionTitle eyebrow="Industry solutions" title="See your site" accent="before" end=" we build it" />
            <View style={s.serviceGrid}>
              {industries.map((ind) => (
                <View key={ind.id} style={[s.card, s.industryCard]}>
                  <CardTopAccent color={ind.hues[0]} />
                  <Text style={[s.h3, { fontSize: 6.5, color: colors.boneDim }]}>
                    {ind.number} · {ind.timelineLabel}
                  </Text>
                  <Text style={[s.h3, { fontSize: 7.5 }]}>{ind.name}</Text>
                  <Text style={[s.body, { fontSize: 6.5 }]}>{ind.tagline}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <PageFooter page={7} logoSrc={logoSrc} />
      </Page>

      {/* 8 TECH + CONTACT */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <PageChrome hue="#D9FF3F" />
        <View style={s.row}>
          <View style={{ width: '40%', paddingRight: 20 }}>
            <SectionTitle eyebrow="Start a project" title="Let's build" accent="something" end=" iconic" pulse />
            <Text style={s.lede}>{contactPage.lede}</Text>
            <Text style={s.body}>{contactPage.promise}</Text>
            <Eyebrow>Tech we trust</Eyebrow>
            <View style={s.tagRow}>
              {techStack.map((t) => (
                <Text key={t} style={s.tag}>{t}</Text>
              ))}
            </View>
            <Text style={s.ctaPill}>{contact.email}</Text>
            <Text style={[s.body, { marginTop: 10, fontSize: 7 }]}>
              Marketing sites start in the low five figures. Fixed pricing. 7-day money-back guarantee.
            </Text>
          </View>
          <View style={{ width: '60%' }}>
            <View style={s.contactBlock}>
              <Text style={s.h3}>Get in touch</Text>
              <View style={[s.row, { marginTop: 12 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={s.statLabel}>Email</Text>
                  <Text style={{ fontSize: 9, color: colors.bone, marginTop: 4 }}>{contact.email}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.statLabel}>India</Text>
                  <Text style={[s.body, { marginTop: 4 }]}>{contact.locations[0].phone}</Text>
                  <Text style={[s.body, { fontSize: 7 }]}>WA {contact.locations[0].whatsapp}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.statLabel}>Germany</Text>
                  <Text style={[s.body, { marginTop: 4 }]}>{contact.locations[1].phone}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 14 }}>
              <Eyebrow>How it works</Eyebrow>
              <View style={[s.row, { flexWrap: 'wrap', justifyContent: 'space-between' }]}>
                {contactPage.steps.map((step) => (
                  <View key={step.n} style={[s.card, { width: '48%', marginBottom: 8 }]}>
                    <Text style={s.processNum}>{step.n}</Text>
                    <Text style={[s.h3, { fontSize: 8 }]}>{step.title}</Text>
                    <Text style={[s.body, { fontSize: 7 }]}>{step.body}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <Text style={[s.footerText, { textAlign: 'center', marginTop: 6 }]}>
          CRUD. Create. Refine. Unified. Designs.
        </Text>
        <PageFooter page={8} logoSrc={logoSrc} />
      </Page>

    </Document>
  );
}
