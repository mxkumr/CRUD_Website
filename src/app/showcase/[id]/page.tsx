import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { notFound, redirect } from 'next/navigation';
import DemoSite from '@/components/showcase/DemoSite';
import EduSite from '@/components/edu/EduSite';
import ConstructionSite from '@/components/construction/ConstructionSite';
import RealEstateSite from '@/components/realestate/RealEstateSite';
import HRSite from '@/components/hr/HRSite';
import RestaurantSite from '@/components/restaurant/RestaurantSite';
import SaaSSite from '@/components/saas/SaaSSite';
import MarketingSite from '@/components/marketing/MarketingSite';
import { industries } from '@/lib/showcase-data';

type Params = Promise<{ id: string }>;

/**
 * Bespoke, domain-specific demo sites. Each entry replaces the
 * generic DemoSite with a hand-built experience for that industry.
 */
const customDemos: Record<string, ComponentType> = {
  education: EduSite,
  construction: ConstructionSite,
  'real-estate': RealEstateSite,
  hr: HRSite,
  restaurant: RestaurantSite,
  saas: SaaSSite,
  marketing: MarketingSite,
};

export function generateStaticParams() {
  return industries.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const industry = industries.find((i) => i.id === id);
  if (!industry) return { title: 'Demo — CRUD Studio' };
  return {
    title: `${industry.site.brand} — ${industry.name} Concept | CRUD Studio`,
    description: industry.description,
  };
}

export default async function ShowcaseDemoPage({ params }: { params: Params }) {
  const { id } = await params;
  const industry = industries.find((i) => i.id === id);
  if (!industry) notFound();

  // Healthcare ships a bespoke, hand-built demo.
  if (industry.id === 'healthcare') redirect('/work/medinova');

  const Custom = customDemos[industry.id];
  if (Custom) return <Custom />;

  return <DemoSite industry={industry} />;
}
