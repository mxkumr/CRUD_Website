import type { Metadata } from 'next';
import MediHero from '@/components/medinova/MediHero';
import { AnatomyExplorer, DoctorFinder, SymptomChecker } from '@/components/medinova/Interactive';
import { PatientStories, TreatmentJourney, VirtualTour } from '@/components/medinova/Storytelling';
import { EmergencyBand, MediFooter, MediNav, Packages } from '@/components/medinova/Shell';

export const metadata: Metadata = {
  title: 'MediNova - Hospital Website Concept | CRUD Studio',
  description:
    'A futuristic multi-speciality hospital website concept by CRUD Studio: interactive doctor finder, symptom checker, live availability, virtual tour and animated patient journeys.',
};

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
