import type { Metadata } from 'next';
import MediHero from '@/components/medinova/MediHero';
import { AnatomyExplorer, DoctorFinder, SymptomChecker } from '@/components/medinova/Interactive';
import { PatientStories, TreatmentJourney, VirtualTour } from '@/components/medinova/Storytelling';
import { EmergencyBand, MediFooter, MediNav, Packages } from '@/components/medinova/Shell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'MediNova — Hospital Website Concept',
  description:
    'A futuristic multi-speciality hospital website concept by CRUD Studio: interactive doctor finder, symptom checker, live availability, virtual tour and animated patient journeys.',
  path: '/work/medinova',
});

export default function MediNovaPage() {
  return (
    <div className="min-h-screen scroll-smooth bg-white font-body text-slate-700 antialiased [color-scheme:light]">
      <MediNav />
      <main>
        <MediHero />
        <TreatmentJourney />
        <AnatomyExplorer />
        <DoctorFinder />
        <SymptomChecker />
        <VirtualTour />
        <PatientStories />
        <Packages />
        <EmergencyBand />
      </main>
      <MediFooter />
    </div>
  );
}
