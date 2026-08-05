import type { Metadata } from 'next';
import SmoothScroll from '@/components/site/SmoothScroll';
import CustomCursor from '@/components/site/CustomCursor';
import Navigation from '@/components/site/Navigation';
import Hero from '@/components/site/Hero';
import WorkGrid from '@/components/site/WorkGrid';
import Capabilities from '@/components/site/Capabilities';
import ShowcasePreview from '@/components/site/ShowcasePreview';
import PremiumClients from '@/components/site/PremiumClients';
import Studio from '@/components/site/Studio';
import ContactFooter from '@/components/site/ContactFooter';
import { pageMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="crud-site">
        {/* Always present for crawlers / view-source (visually hidden) */}
        <div className="sr-only">
          <p>
            {siteConfig.name} — {siteConfig.tagline}. {siteConfig.description}
          </p>
        </div>
        <noscript>
          <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 720 }}>
            <p>
              <strong>{siteConfig.name}</strong> — {siteConfig.tagline}
            </p>
            <p>{siteConfig.description}</p>
            <p>
              <a href="/work">Work</a> · <a href="/showcase">Showcase</a> ·{' '}
              <a href="/capabilities">Capabilities</a> · <a href="/contact">Contact</a>
            </p>
          </div>
        </noscript>
        <CustomCursor />
        <Navigation />
        <main>
          <Hero />
          <WorkGrid />
          <Capabilities />
          <ShowcasePreview />
          <PremiumClients />
          <Studio />
        </main>
        <ContactFooter />
      </div>
    </SmoothScroll>
  );
}
