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

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="crud-site">
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
