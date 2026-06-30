/**
 * Haven Estates - bespoke demo content.
 * A fictional property marketplace used to show the kind of
 * listing-led website CRUD Studio builds for real estate.
 */

export const brand = {
  name: 'Haven',
  full: 'Haven Estates',
  domain: 'havenestates.in',
  phone: '+91 44 4501 2200',
} as const;

export type CountStat = { value: number; suffix?: string; decimals?: number; label: string };

export const stats: CountStat[] = [
  { value: 12400, suffix: '+', label: 'Verified listings' },
  { value: 850, suffix: '+', label: 'Expert agents' },
  { value: 4.9, decimals: 1, suffix: '★', label: 'Customer rating' },
  { value: 18, suffix: 'k', label: 'Happy families' },
];

export const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial'] as const;
export type PropertyType = (typeof propertyTypes)[number];

export type Listing = {
  id: string;
  title: string;
  type: PropertyType;
  deal: 'Sale' | 'Rent';
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  featured?: boolean;
};

export const listings: Listing[] = [
  { id: 'l1', title: 'Sea-View Sky Apartment', type: 'Apartment', deal: 'Sale', price: '₹2.4 Cr', location: 'Besant Nagar', beds: 3, baths: 3, area: '1,850 sqft', featured: true },
  { id: 'l2', title: 'Modern Courtyard Villa', type: 'Villa', deal: 'Sale', price: '₹4.1 Cr', location: 'ECR', beds: 4, baths: 5, area: '3,400 sqft' },
  { id: 'l3', title: 'Smart 2 BHK Residence', type: 'Apartment', deal: 'Rent', price: '₹48k/mo', location: 'OMR', beds: 2, baths: 2, area: '1,150 sqft' },
  { id: 'l4', title: 'Garden Plot - DTCP', type: 'Plot', deal: 'Sale', price: '₹98 L', location: 'Sholinganallur', beds: 0, baths: 0, area: '2,400 sqft' },
  { id: 'l5', title: 'Penthouse Loft', type: 'Apartment', deal: 'Sale', price: '₹6.8 Cr', location: 'Nungambakkam', beds: 4, baths: 4, area: '4,200 sqft', featured: true },
  { id: 'l6', title: 'Grade-A Office Floor', type: 'Commercial', deal: 'Rent', price: '₹3.2 L/mo', location: 'Guindy', beds: 0, baths: 4, area: '6,000 sqft' },
  { id: 'l7', title: 'Lakeside Family Villa', type: 'Villa', deal: 'Sale', price: '₹3.5 Cr', location: 'Madhavaram', beds: 4, baths: 4, area: '2,900 sqft' },
  { id: 'l8', title: 'Retail Showroom Space', type: 'Commercial', deal: 'Sale', price: '₹5.4 Cr', location: 'T. Nagar', beds: 0, baths: 2, area: '3,800 sqft' },
];

export type Neighborhood = { name: string; count: number; note: string };

export const neighborhoods: Neighborhood[] = [
  { name: 'Besant Nagar', count: 184, note: 'Beachside living' },
  { name: 'OMR Tech Corridor', count: 421, note: 'IT hub & new builds' },
  { name: 'Adyar', count: 256, note: 'Leafy & central' },
  { name: 'ECR', count: 138, note: 'Villas & getaways' },
  { name: 'Nungambakkam', count: 167, note: 'Premium & posh' },
  { name: 'Velachery', count: 312, note: 'Connected & value' },
];

export type Agent = { name: string; area: string; deals: string; rating: string };

export const agents: Agent[] = [
  { name: 'Priya Subramanian', area: 'South Chennai', deals: '210+ closings', rating: '4.9★' },
  { name: 'Arun Kuppusamy', area: 'OMR & ECR', deals: '184+ closings', rating: '4.8★' },
  { name: 'Fatima Sheikh', area: 'Central Chennai', deals: '167+ closings', rating: '5.0★' },
];

export const features = [
  { title: 'Verified listings', body: 'Every property is physically verified - no fake photos, no bait-and-switch.' },
  { title: 'Immersive virtual tours', body: 'Walk through homes in 360° before you ever leave your sofa.' },
  { title: 'Site visits in a tap', body: 'Book a guided visit at a time that suits you, confirmed on WhatsApp.' },
  { title: 'Transparent pricing', body: 'Price history, locality trends and fair-value scores on every listing.' },
];

export const testimonial = {
  quote:
    'I shortlisted four homes from the virtual tours, visited two over a weekend, and closed within a month. Haven made the whole thing feel effortless.',
  name: 'Karthik & Divya',
  role: 'Bought a villa in ECR',
};
