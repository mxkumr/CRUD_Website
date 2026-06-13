/**
 * MediNova — fictional multi-speciality hospital used as a live portfolio
 * demo on the CRUD Studio site (/work/medinova). All data is illustrative.
 */

export const hospital = {
  name: 'MediNova',
  tagline: 'Healthcare, engineered for humans.',
  lede: 'A 480-bed multi-speciality campus where precision medicine meets compassionate care — open every hour of every day.',
  phone: '+91 44 4000 9000',
  emergency: '108',
} as const;

export const metrics = [
  { label: 'Patients healed', value: 284000, suffix: '+' },
  { label: 'Specialist doctors', value: 312, suffix: '' },
  { label: 'Success rate', value: 98.6, suffix: '%', decimals: 1 },
  { label: 'Years of care', value: 32, suffix: '' },
] as const;

export type Speciality = {
  id: string;
  name: string;
  blurb: string;
  icon: string; // emoji-free glyph drawn via CSS; key into icon map
  procedures: number;
  hue: string;
};

export const specialities: Speciality[] = [
  { id: 'cardiology', name: 'Cardiology', blurb: 'Advanced cath labs, electrophysiology and preventive heart programs.', icon: 'heart', procedures: 120, hue: '#059669' },
  { id: 'neurology', name: 'Neurology', blurb: 'Stroke-ready 24/7 with dedicated neuro ICU and rehabilitation.', icon: 'brain', procedures: 86, hue: '#0D9488' },
  { id: 'orthopaedics', name: 'Orthopaedics', blurb: 'Robotic joint replacement and sports medicine under one roof.', icon: 'bone', procedures: 140, hue: '#0EA5E9' },
  { id: 'oncology', name: 'Oncology', blurb: 'Precision oncology with genomics-guided treatment planning.', icon: 'cell', procedures: 94, hue: '#16A34A' },
  { id: 'paediatrics', name: 'Paediatrics', blurb: 'Family-centred care from neonatal ICU to adolescent medicine.', icon: 'child', procedures: 75, hue: '#14B8A6' },
  { id: 'gastro', name: 'Gastroenterology', blurb: 'Endoscopic excellence and minimally invasive GI surgery.', icon: 'gut', procedures: 110, hue: '#0891B2' },
] as const;

export type Doctor = {
  id: string;
  name: string;
  speciality: string;
  role: string;
  experience: number;
  rating: number;
  languages: string[];
  /** Live availability sim: today's open slots */
  slots: string[];
  initials: string;
  hue: string;
};

export const doctors: Doctor[] = [
  { id: 'arya-menon', name: 'Dr. Arya Menon', speciality: 'cardiology', role: 'Director — Interventional Cardiology', experience: 18, rating: 4.9, languages: ['English', 'Tamil', 'Malayalam'], slots: ['09:30', '11:00', '16:15'], initials: 'AM', hue: '#059669' },
  { id: 'vikram-rao', name: 'Dr. Vikram Rao', speciality: 'cardiology', role: 'Senior Consultant — Cardiac Surgery', experience: 22, rating: 4.8, languages: ['English', 'Telugu', 'Hindi'], slots: ['10:15', '14:30'], initials: 'VR', hue: '#10B981' },
  { id: 'sana-iqbal', name: 'Dr. Sana Iqbal', speciality: 'neurology', role: 'Lead — Stroke & Neurocritical Care', experience: 14, rating: 4.9, languages: ['English', 'Urdu', 'Hindi'], slots: ['09:00', '12:45', '17:30'], initials: 'SI', hue: '#0D9488' },
  { id: 'dev-narayanan', name: 'Dr. Dev Narayanan', speciality: 'neurology', role: 'Consultant — Movement Disorders', experience: 11, rating: 4.7, languages: ['English', 'Tamil'], slots: ['11:30', '15:00'], initials: 'DN', hue: '#2DD4BF' },
  { id: 'meera-pillai', name: 'Dr. Meera Pillai', speciality: 'orthopaedics', role: 'Head — Robotic Joint Replacement', experience: 16, rating: 4.9, languages: ['English', 'Malayalam', 'Tamil'], slots: ['08:45', '13:15', '16:45'], initials: 'MP', hue: '#0EA5E9' },
  { id: 'rahul-sethi', name: 'Dr. Rahul Sethi', speciality: 'orthopaedics', role: 'Consultant — Sports Medicine', experience: 9, rating: 4.8, languages: ['English', 'Hindi', 'Punjabi'], slots: ['10:00', '14:00'], initials: 'RS', hue: '#38BDF8' },
  { id: 'lakshmi-venkat', name: 'Dr. Lakshmi Venkat', speciality: 'oncology', role: 'Director — Medical Oncology', experience: 20, rating: 4.9, languages: ['English', 'Tamil', 'Kannada'], slots: ['09:15', '12:00'], initials: 'LV', hue: '#16A34A' },
  { id: 'arjun-das', name: 'Dr. Arjun Das', speciality: 'paediatrics', role: 'Senior Consultant — Neonatology', experience: 13, rating: 4.8, languages: ['English', 'Bengali', 'Hindi'], slots: ['09:45', '11:45', '15:30'], initials: 'AD', hue: '#14B8A6' },
  { id: 'farah-khan', name: 'Dr. Farah Khan', speciality: 'gastro', role: 'Lead — Advanced Endoscopy', experience: 15, rating: 4.9, languages: ['English', 'Hindi', 'Marathi'], slots: ['10:30', '13:45'], initials: 'FK', hue: '#0891B2' },
] as const;

export type JourneyStep = {
  id: string;
  phase: string;
  title: string;
  body: string;
  duration: string;
};

export const treatmentJourney: JourneyStep[] = [
  { id: 'discover', phase: '01', title: 'Smart triage', body: 'Symptom intake online or at kiosk. AI-assisted triage routes you to the right speciality before you arrive.', duration: '2 min' },
  { id: 'consult', phase: '02', title: 'Specialist consult', body: 'Meet your doctor with records pre-loaded. Imaging and labs ordered digitally, results in one timeline.', duration: 'Day 1' },
  { id: 'plan', phase: '03', title: 'Care plan', body: 'A board of specialists reviews complex cases. You receive one clear plan with costs known upfront.', duration: 'Day 2' },
  { id: 'treat', phase: '04', title: 'Treatment', body: 'Robotic surgery suites and smart ICUs with family updates pushed to your phone at every milestone.', duration: 'Day 3–7' },
  { id: 'recover', phase: '05', title: 'Recovery at home', body: 'Remote vitals monitoring, tele-rehab and medication reminders until your care team signs you off.', duration: 'Week 2+' },
] as const;

export type TourStop = {
  id: string;
  name: string;
  description: string;
  stat: string;
  hue: string;
};

export const tourStops: TourStop[] = [
  { id: 'atrium', name: 'Healing Atrium', description: 'Daylight-flooded arrival with single-desk check-in — no queues, no counters maze.', stat: '4-min average check-in', hue: '#14B8A6' },
  { id: 'icu', name: 'Smart ICU', description: 'AI-monitored intensive care with glass-walled family visibility and noise-controlled pods.', stat: '1:1 nurse ratio', hue: '#0D9488' },
  { id: 'or', name: 'Hybrid OR', description: 'Robotic surgery theatres with intraoperative imaging — surgery and scans in one room.', stat: '12 robotic suites', hue: '#0891B2' },
  { id: 'wards', name: 'Recovery Wards', description: 'Single rooms with circadian lighting, family couches and bedside ordering.', stat: '480 beds', hue: '#16A34A' },
] as const;

export type PatientStory = {
  id: string;
  name: string;
  age: number;
  condition: string;
  before: string;
  after: string;
  days: number;
  speciality: string;
};

export const patientStories: PatientStory[] = [
  { id: 'ramesh', name: 'Ramesh K.', age: 58, condition: 'Triple-vessel heart disease', before: 'Could not climb a single flight of stairs without stopping. Angina daily.', after: 'Walks 5 km every morning, back at work full-time, zero episodes in 14 months.', days: 6, speciality: 'Cardiology' },
  { id: 'priya', name: 'Priya S.', age: 34, condition: 'Acute ischemic stroke', before: 'Arrived within the golden hour with right-side paralysis and slurred speech.', after: 'Full speech recovered in 3 weeks. Running her design practice again.', days: 9, speciality: 'Neurology' },
  { id: 'joseph', name: 'Joseph M.', age: 67, condition: 'Bilateral knee arthritis', before: 'Wheelchair-dependent for 2 years. Constant pain, sleep broken every night.', after: 'Robotic bilateral knee replacement — walking unaided at week 4.', days: 5, speciality: 'Orthopaedics' },
] as const;

export type HealthPackage = {
  id: string;
  name: string;
  price: string;
  tests: number;
  popular?: boolean;
  includes: string[];
};

export const healthPackages: HealthPackage[] = [
  { id: 'essential', name: 'Essential Check', price: '₹2,499', tests: 42, includes: ['Full blood panel', 'ECG + chest X-ray', 'Physician consult', 'Digital report in 24h'] },
  { id: 'advanced', name: 'Advanced 360°', price: '₹6,999', tests: 78, popular: true, includes: ['Everything in Essential', 'Treadmill test + Echo', 'Ultrasound abdomen', 'Diet & lifestyle plan', 'Specialist follow-up'] },
  { id: 'executive', name: 'Executive Elite', price: '₹14,999', tests: 112, includes: ['Everything in Advanced', 'MRI screening', 'Cancer markers panel', 'Cardiologist + Neurologist', 'Dedicated care manager'] },
] as const;

export type AnatomyPoint = {
  id: string;
  label: string;
  /** percentage position on the body figure */
  x: number;
  y: number;
  speciality: string;
  specialityId: string;
  conditions: string[];
};

export const anatomyPoints: AnatomyPoint[] = [
  { id: 'head', label: 'Brain & Nerves', x: 50, y: 8, speciality: 'Neurology', specialityId: 'neurology', conditions: ['Migraine', 'Stroke', 'Epilepsy', "Parkinson's"] },
  { id: 'heart', label: 'Heart & Vessels', x: 44, y: 28, speciality: 'Cardiology', specialityId: 'cardiology', conditions: ['Chest pain', 'Arrhythmia', 'Blockages', 'Hypertension'] },
  { id: 'stomach', label: 'Digestive System', x: 50, y: 42, speciality: 'Gastroenterology', specialityId: 'gastro', conditions: ['Acid reflux', 'IBS', 'Liver health', 'Endoscopy'] },
  { id: 'knee', label: 'Bones & Joints', x: 44, y: 76, speciality: 'Orthopaedics', specialityId: 'orthopaedics', conditions: ['Knee pain', 'Arthritis', 'Sports injury', 'Spine'] },
] as const;

export const symptomFlows: Record<string, { q: string; options: string[] }> = {
  start: { q: 'What brings you in today?', options: ['Chest discomfort', 'Frequent headaches', 'Joint pain', 'Stomach issues'] },
};

export const symptomResults: Record<string, { speciality: string; doctor: string; urgency: 'routine' | 'soon' | 'urgent' }> = {
  'Chest discomfort': { speciality: 'Cardiology', doctor: 'Dr. Arya Menon', urgency: 'urgent' },
  'Frequent headaches': { speciality: 'Neurology', doctor: 'Dr. Sana Iqbal', urgency: 'soon' },
  'Joint pain': { speciality: 'Orthopaedics', doctor: 'Dr. Meera Pillai', urgency: 'routine' },
  'Stomach issues': { speciality: 'Gastroenterology', doctor: 'Dr. Farah Khan', urgency: 'routine' },
};
