/**
 * LUNÉ — Gen Z fashion ecommerce concept.
 * Illustrative menswear + womenswear demo by CRUD Studio.
 * Product imagery sourced from Unsplash.
 */

export const brand = {
  name: 'LUNÉ',
  domain: 'lune.studio',
  tagline: 'Wear the moment.',
  blurb: 'Editorial streetwear for the feed generation — sharp cuts, loud energy, zero boring basics.',
} as const;

export type Gender = 'men' | 'women';

export type Product = {
  id: string;
  name: string;
  gender: Gender;
  category: string;
  price: number;
  compareAt?: number;
  badge?: string;
  colors: string[];
  sizes: string[];
  image: string;
  description: string;
  details: string[];
};

/** Unsplash CDN images — fashion editorial. */
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = u('photo-1469334031218-e382a71b716b', 1400);

export const products: Product[] = [
  {
    id: 'aurora-blazer',
    name: 'Aurora Crop Blazer',
    gender: 'women',
    category: 'Outerwear',
    price: 189,
    compareAt: 240,
    badge: 'Drop 01',
    colors: ['Ivory', 'Noir', 'Fuchsia'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: u('photo-1591369822096-ffd140ec948f'),
    description:
      'A sculpted crop blazer with sharp shoulders and a liquid satin finish. Made to throw over a tank and own the night.',
    details: ['Satin-touch twill', 'Padded shoulder', 'Lined', 'Dry clean'],
  },
  {
    id: 'velvet-midi',
    name: 'Velvet Archive Midi',
    gender: 'women',
    category: 'Dresses',
    price: 168,
    badge: 'Best seller',
    colors: ['Wine', 'Ink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: u('photo-1595777457583-95e059d581b8'),
    description:
      'Bias-cut midi that catches light like chrome. Side slit, invisible zip, zero effort drama.',
    details: ['Crushed velvet', 'Bias cut', 'Side slit', 'Hand wash cold'],
  },
  {
    id: 'chrome-tank',
    name: 'Chrome Mesh Tank',
    gender: 'women',
    category: 'Tops',
    price: 72,
    colors: ['Silver', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: u('photo-1515886657613-9f3515b0c78f'),
    description:
      'Sheer metallic mesh layered over a built-in bandeau. Club lighting optional, attitude required.',
    details: ['Metallic mesh', 'Built-in lining', 'Cropped fit'],
  },
  {
    id: 'orbit-skirt',
    name: 'Orbit Micro Skirt',
    gender: 'women',
    category: 'Bottoms',
    price: 98,
    badge: 'New',
    colors: ['Acid', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: u('photo-1583496661160-fb5886a0aaaa'),
    description:
      'Low-rise micro with a sculpted waistband and hidden phone pocket. Pair with boots, ruin timelines.',
    details: ['Stretch twill', 'Low rise', 'Hidden pocket'],
  },
  {
    id: 'halo-coat',
    name: 'Halo Oversized Coat',
    gender: 'women',
    category: 'Outerwear',
    price: 320,
    colors: ['Bone', 'Charcoal'],
    sizes: ['S', 'M', 'L'],
    image: u('photo-1548624313-0396c75e4b1a'),
    description:
      'Cocoon silhouette with Cinzel-level presence. Double-face wool blend that photographs like architecture.',
    details: ['Double-face wool blend', 'Cocoon cut', 'Horn buttons'],
  },
  {
    id: 'noir-trouser',
    name: 'Noir Wide Trouser',
    gender: 'men',
    category: 'Bottoms',
    price: 148,
    badge: 'Drop 01',
    colors: ['Ink', 'Stone'],
    sizes: ['28', '30', '32', '34', '36'],
    image: u('photo-1617137984095-74e4e5e3613f'),
    description:
      'Press-ready wide legs with a floating waist. Dress them up or leave them raw with a hoodie.',
    details: ['Italian wool blend', 'Floating waist', 'Tapered cuff'],
  },
  {
    id: 'pulse-hoodie',
    name: 'Pulse Oversized Hoodie',
    gender: 'men',
    category: 'Tops',
    price: 128,
    badge: 'Best seller',
    colors: ['Black', 'Fog', 'Fuchsia'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: u('photo-1556821840-3a63f95609a7'),
    description:
      'Heavyweight fleece with dropped shoulders and a tonal LUNÉ stamp. Soft enough to live in.',
    details: ['420gsm fleece', 'Dropped shoulder', 'Kangaroo pocket'],
  },
  {
    id: 'rift-jacket',
    name: 'Rift Leather Jacket',
    gender: 'men',
    category: 'Outerwear',
    price: 420,
    colors: ['Black', 'Oxblood'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: u('photo-1551028719-00167b16eac5'),
    description:
      'Butter-soft lambskin with asymmetric zip and matte hardware. The forever jacket.',
    details: ['Lambskin leather', 'Asymmetric zip', 'Quilted lining'],
  },
  {
    id: 'signal-tee',
    name: 'Signal Graphic Tee',
    gender: 'men',
    category: 'Tops',
    price: 58,
    badge: 'New',
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: u('photo-1521572163474-6864f9cf17ab'),
    description:
      'Boxy fit cotton with a heat-transfer orbit mark. Washes soft, stays loud.',
    details: ['Organic cotton', 'Boxy fit', 'Screen print'],
  },
  {
    id: 'vault-cargo',
    name: 'Vault Utility Cargo',
    gender: 'men',
    category: 'Bottoms',
    price: 158,
    colors: ['Olive', 'Black'],
    sizes: ['28', '30', '32', '34', '36'],
    image: u('photo-1624378439575-d8705ad7ae80'),
    description:
      'Multi-pocket cargos with articulated knees. Built for nights that start at golden hour.',
    details: ['Ripstop nylon', 'Articulated knee', 'Adjustable hem'],
  },
  {
    id: 'luna-set',
    name: 'Luna Knit Set',
    gender: 'women',
    category: 'Sets',
    price: 210,
    colors: ['Champagne', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: u('photo-1496747611176-843222e1e57c'),
    description:
      'Matching knit top and skirt with open stitch detailing. Soft glamour, hard to miss.',
    details: ['Merino blend', 'Open stitch', 'Two-piece set'],
  },
  {
    id: 'axis-sneaker',
    name: 'Axis Chrome Sneaker',
    gender: 'men',
    category: 'Footwear',
    price: 195,
    badge: 'Limited',
    colors: ['Chrome', 'Noir'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    image: u('photo-1549298916-b41d501d3772'),
    description:
      'Low-profile runner with mirrored toe cap and neon sockliner. Street meets runway.',
    details: ['Mirrored leather', 'Memory foam insole', 'Gum sole'],
  },
];

export const collections = [
  {
    id: 'drop-01',
    title: 'Drop 01 — Afterglow',
    sub: 'Night-first silhouettes for men & women',
    cta: 'Shop the drop',
    gender: undefined as Gender | undefined,
    image: u('photo-1509631179647-0177331693ae', 1000),
  },
  {
    id: 'women',
    title: 'Women',
    sub: 'Velvet, chrome & micro drama',
    cta: 'Shop women',
    gender: 'women' as Gender,
    image: u('photo-1483985988355-763728e1935b', 1000),
  },
  {
    id: 'men',
    title: 'Men',
    sub: 'Wide legs, heavyweight heat',
    cta: 'Shop men',
    gender: 'men' as Gender,
    image: u('photo-1617137968427-85924c800a22', 1000),
  },
];

export const lookbook = [
  {
    title: 'Midnight edit',
    caption: 'Blazer + micro + chrome',
    image: u('photo-1539109136881-3be0616acf4b', 800),
  },
  {
    title: 'Soft launch',
    caption: 'Knit set energy',
    image: u('photo-1515372039744-b8f02a3ae446', 800),
  },
  {
    title: 'Utility hour',
    caption: 'Cargos after dark',
    image: u('photo-1552374196-1ab2a1c593e8', 800),
  },
  {
    title: 'Runway residual',
    caption: 'Leather, always',
    image: u('photo-1529139574466-a303027c1d8b', 800),
  },
];

export const testimonials = [
  {
    quote: 'Looks expensive on camera and feels soft IRL. Instant wardrobe upgrade.',
    name: 'Maya K.',
    role: 'Creator',
  },
  {
    quote: 'Finally menswear that doesn’t look like a dad brunch. The hoodie is illegal soft.',
    name: 'Jules R.',
    role: 'Stylist',
  },
];

export function formatPrice(n: number) {
  return `$${n}`;
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function filterProducts(gender?: Gender | 'all', category?: string) {
  return products.filter((p) => {
    if (gender && gender !== 'all' && p.gender !== gender) return false;
    if (category && category !== 'All' && p.category !== category) return false;
    return true;
  });
}

export const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses', 'Sets', 'Footwear'];
