/**
 * SOLSTICE — specialty café concept by CRUD Studio.
 * Quiet mornings, precise espresso, day-part cooking.
 */

export const brand = {
  name: 'Solstice',
  domain: 'solsticecafe.com',
  tagline: 'Coffee with the day.',
  blurb:
    'A neighbourhood specialty café for slow mornings and sharp espresso — roasted in small lots, plated with the same care.',
  city: 'Chennai',
  neighbourhood: 'Alwarpet',
} as const;

export type MenuCategory = 'Coffee' | 'Kitchen' | 'Bakery';

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  blurb: string;
  note?: string;
  image: string;
};

const u = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = u('photo-1495474472287-4d71bcdd2085', 1600);
export const interiorImage = u('photo-1554118811-1e0d58224f24', 1200);
export const pourImage = u('photo-1511920170033-f8396924c348', 1000);

export const menu: MenuItem[] = [
  {
    id: 'house-espresso',
    name: 'House Espresso',
    category: 'Coffee',
    price: 180,
    blurb: 'Chocolate, orange peel, clean finish. Our daily lot.',
    note: 'Double',
    image: u('photo-1510591509098-f4fdc6d0ff04'),
  },
  {
    id: 'oat-flat-white',
    name: 'Oat Flat White',
    category: 'Coffee',
    price: 260,
    blurb: 'Velvet microfoam over a double ristretto.',
    image: u('photo-1577968897966-3d4325b36b61'),
  },
  {
    id: 'batch-filter',
    name: 'Batch Filter',
    category: 'Coffee',
    price: 220,
    blurb: 'Seasonal single origin, brewed for the hour.',
    note: 'Rotating',
    image: u('photo-1497935582031-027b5760bd0d'),
  },
  {
    id: 'cold-brew',
    name: '16-hour Cold Brew',
    category: 'Coffee',
    price: 280,
    blurb: 'Steeped overnight. Soft, low-acid, no bitterness.',
    image: u('photo-1517701604599-bb29b565090c'),
  },
  {
    id: 'shakshuka',
    name: 'Skillet Shakshuka',
    category: 'Kitchen',
    price: 420,
    blurb: 'Eggs in roasted tomato, warm spices, grilled sourdough.',
    note: 'Until 12',
    image: u('photo-1590412200988-a436970781fa'),
  },
  {
    id: 'mushroom-toast',
    name: 'Forest Mushroom Toast',
    category: 'Kitchen',
    price: 380,
    blurb: 'Sourdough, thyme butter, soft herbs, cracked pepper.',
    image: u('photo-1482049016688-2d3e1b311543'),
  },
  {
    id: 'grain-bowl',
    name: 'Citrus Grain Bowl',
    category: 'Kitchen',
    price: 450,
    blurb: 'Farro, roasted vegetables, labneh, toasted seeds.',
    image: u('photo-1512621776951-a57141f2eefd'),
  },
  {
    id: 'butter-croissant',
    name: 'Cultured Butter Croissant',
    category: 'Bakery',
    price: 160,
    blurb: 'Laminated daily. Shatter on the outside, cloud within.',
    image: u('photo-1555507036-ab1f4038808a'),
  },
  {
    id: 'cardamom-bun',
    name: 'Cardamom Morning Bun',
    category: 'Bakery',
    price: 180,
    blurb: 'Soft swirl, sugar crust, warm spice.',
    image: u('photo-1509365465985-273da4640c0f'),
  },
  {
    id: 'olive-focaccia',
    name: 'Olive Oil Focaccia',
    category: 'Bakery',
    price: 140,
    blurb: 'Sea salt, rosemary, tear and share.',
    image: u('photo-1509440159596-0249088772ff'),
  },
];

export const hours = [
  { day: 'Mon – Thu', time: '7:30 – 21:00' },
  { day: 'Fri – Sat', time: '7:30 – 22:00' },
  { day: 'Sunday', time: '8:00 – 18:00' },
];

export const rituals = [
  {
    title: 'Morning light',
    body: 'Batch filter and pastry before the city fully wakes.',
    image: u('photo-1453614512568-c4024d13c247', 900),
  },
  {
    title: 'Midday table',
    body: 'Skillets, bowls, and a second espresso if the day asks.',
    image: u('photo-1445116572660-236099ec97a0', 900),
  },
  {
    title: 'Golden hour',
    body: 'Quieter chairs, cold brew, conversations that linger.',
    image: u('photo-1501339847302-ac426a4a7cbb', 900),
  },
];

export const testimonial = {
  quote: 'It feels like a café that knows the difference between busy and alive. The coffee is precise without being precious.',
  name: 'Priya M.',
  role: 'Regular · Alwarpet',
};

export function formatInr(n: number) {
  return `₹${n}`;
}

export function filterMenu(category: MenuCategory | 'All') {
  if (category === 'All') return menu;
  return menu.filter((m) => m.category === category);
}
