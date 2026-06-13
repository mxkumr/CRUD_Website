/**
 * Saffron & Smoke — bespoke demo content.
 * A fictional modern-Indian restaurant used to show the kind of
 * moody, reservation-first website CRUD Studio builds for hospitality.
 */

export const place = {
  name: 'Saffron & Smoke',
  domain: 'saffronsmoke.com',
  cuisine: 'Modern Indian · Live-fire kitchen',
  phone: '+91 44 4890 7700',
  address: '14 Cathedral Road, Chennai 600 086',
} as const;

export const menuCategories = ['Small Plates', 'From the Fire', 'Mains', 'Desserts'] as const;
export type MenuCategory = (typeof menuCategories)[number];

export type Dish = {
  name: string;
  category: MenuCategory;
  price: string;
  desc: string;
  veg: boolean;
  signature?: boolean;
};

export const dishes: Dish[] = [
  { name: 'Smoked Lamb Galouti', category: 'Small Plates', price: '₹680', desc: 'Melt-in-mouth lamb kebab, saffron warqi paratha, mint.', veg: false, signature: true },
  { name: 'Beetroot & Goat Cheese Tikki', category: 'Small Plates', price: '₹420', desc: 'Charred beetroot, whipped goat cheese, tamarind glaze.', veg: true },
  { name: 'Crab Bonda', category: 'Small Plates', price: '₹560', desc: 'Spiced lump crab, curry-leaf aioli, lime.', veg: false },
  { name: 'Charcoal Butter Chicken', category: 'From the Fire', price: '₹540', desc: 'Tandoor-smoked, tomato-fenugreek, white butter.', veg: false, signature: true },
  { name: 'Tandoori Jackfruit', category: 'From the Fire', price: '₹460', desc: 'Young jackfruit, pickle masala, burnt-onion raita.', veg: true },
  { name: 'Malai Prawns', category: 'From the Fire', price: '₹720', desc: 'Tiger prawns, cardamom cream, charred lime.', veg: false },
  { name: 'Truffle Dal Saffron', category: 'Mains', price: '₹460', desc: 'Black dal, 24-hour simmer, black truffle, saffron.', veg: true, signature: true },
  { name: 'Coastal Fish Curry', category: 'Mains', price: '₹640', desc: 'Line-caught catch, coconut-kokum, steamed red rice.', veg: false },
  { name: 'Wild Mushroom Biryani', category: 'Mains', price: '₹520', desc: 'Sealed-dum, morels, fried onion, burani raita.', veg: true },
  { name: 'Rose & Pistachio Kulfi', category: 'Desserts', price: '₹280', desc: 'Slow-churned kulfi, rose syrup, crushed pistachio.', veg: true },
  { name: 'Smoked Gulab Jamun', category: 'Desserts', price: '₹320', desc: 'Hickory-smoked, saffron rabri, gold leaf.', veg: true, signature: true },
  { name: 'Filter Coffee Tiramisu', category: 'Desserts', price: '₹340', desc: 'Madras filter coffee, mascarpone, jaggery dust.', veg: true },
];

export const story = {
  chef: 'Chef Iqbal Rasheed',
  title: 'Heritage on an open flame.',
  body:
    'Raised between his grandmother’s Chettinad kitchen and the tandoors of Old Delhi, Chef Iqbal built Saffron & Smoke around a single idea: that the best of Indian cooking happens over live fire. Every dish is built from regional recipes, then reimagined with modern technique and the cleanest local produce.',
  accolades: ['Michelin recommended', '#3 in the city — Condé Nast', '“Best new restaurant” — 2025'],
};

export const gallery = ['The live-fire counter', 'Private dining room', 'Courtyard seating', 'The spice cellar', 'Cocktail bar', 'Chef’s table'];

export const reviews = [
  { quote: 'The smoked galouti alone is worth the trip. Easily the most exciting Indian food in the city.', name: 'Ritu M.', detail: 'Diner · 5★' },
  { quote: 'Service like clockwork, a room that glows, and a dal I still dream about. We’ve booked again already.', name: 'Aravind S.', detail: 'Regular · 5★' },
  { quote: 'Booked a private dinner for twelve — flawless from the first cocktail to the last kulfi.', name: 'Nisha & Kabir', detail: 'Anniversary · 5★' },
];

export const hours = [
  { day: 'Mon – Thu', time: '6:00 pm – 11:30 pm' },
  { day: 'Fri – Sat', time: '12:30 pm – 1:00 am' },
  { day: 'Sunday', time: '12:30 pm – 11:00 pm' },
];

export const reservationTimes = ['12:30', '13:30', '19:00', '20:00', '20:30', '21:30'];
