'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  brand,
  categories,
  collections,
  filterProducts,
  formatPrice,
  getProduct,
  heroImage,
  lookbook,
  products,
  testimonials,
  type Gender,
  type Product,
} from './data';

/* ============================================================
   LUNÉ — Gen Z fashion ecommerce (white theme).
   Cinzel display + Unsplash imagery.
   Views: Home · Shop · Product (men & women).
   ============================================================ */

const BG = '#FFFFFF';
const SURFACE = '#F7F5F2';
const FUCHSIA = '#E11D6A';
const INK = '#121212';
const SUB = '#6B6560';
const LINE = 'rgba(18,18,18,0.08)';
const ease = [0.22, 1, 0.36, 1] as const;
const cinzel = 'var(--font-cinzel), Cinzel, serif';

type View = 'home' | 'shop' | 'product';

type NavState = {
  view: View;
  productId?: string;
  gender: Gender | 'all';
};

function ProductArt({
  product,
  className = '',
  showCaption = true,
  priority = false,
}: {
  product: Product;
  className?: string;
  showCaption?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#ECEAE6] ${className}`}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={priority}
      />
      {showCaption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 md:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80" style={{ fontFamily: cinzel }}>
            {product.gender}
          </p>
          <p className="mt-1 text-lg font-medium leading-tight text-white md:text-xl" style={{ fontFamily: cinzel }}>
            {product.name}
          </p>
        </div>
      )}
    </div>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2.5 text-left">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold tracking-widest text-white"
        style={{ background: FUCHSIA, fontFamily: cinzel }}
      >
        L
      </span>
      <span className="text-xl tracking-[0.18em]" style={{ color: INK, fontFamily: cinzel }}>
        {brand.name}
      </span>
    </button>
  );
}

function Header({
  nav,
  bagCount,
  onNavigate,
}: {
  nav: NavState;
  bagCount: number;
  onNavigate: (next: Partial<NavState>) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 16));

  const links = [
    { label: 'Home', action: () => onNavigate({ view: 'home' }) },
    { label: 'Shop', action: () => onNavigate({ view: 'shop', gender: 'all' }) },
    { label: 'Women', action: () => onNavigate({ view: 'shop', gender: 'women' }) },
    { label: 'Men', action: () => onNavigate({ view: 'shop', gender: 'men' }) },
  ];

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 px-4 py-1.5" style={{ background: INK }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: FUCHSIA }}>
          Concept demo by CRUD Studio
        </p>
        <Link
          href="/showcase"
          className="rounded-full border border-white/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:bg-white/10"
        >
          ← All demos
        </Link>
      </div>

      <header
        className="fixed inset-x-0 top-7 z-[50] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <Logo onClick={() => onNavigate({ view: 'home' })} />
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const active =
                (l.label === 'Home' && nav.view === 'home') ||
                (l.label === 'Shop' && nav.view === 'shop' && nav.gender === 'all') ||
                (l.label === 'Women' && nav.gender === 'women') ||
                (l.label === 'Men' && nav.gender === 'men');
              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={l.action}
                  className="text-[12px] font-medium uppercase tracking-[0.16em] transition-colors"
                  style={{ color: active ? INK : SUB, fontFamily: cinzel }}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ view: 'shop', gender: 'all' })}
              className="relative rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ borderColor: LINE, color: INK, fontFamily: cinzel }}
            >
              Bag
              {bagCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                  style={{ background: FUCHSIA }}
                >
                  {bagCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
              style={{ borderColor: LINE }}
            >
              <span className={`absolute h-px w-4 transition-all ${open ? 'rotate-45' : '-translate-y-1'}`} style={{ background: INK }} />
              <span className={`absolute h-px w-4 transition-all ${open ? '-rotate-45' : 'translate-y-1'}`} style={{ background: INK }} />
            </button>
          </div>
        </div>
        {open && (
          <div className="grid grid-cols-2 gap-2 px-5 pb-4 lg:hidden">
            {links.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => {
                  l.action();
                  setOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium"
                style={{ background: SURFACE, color: INK, fontFamily: cinzel }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

function HomeView({ onNavigate }: { onNavigate: (next: Partial<NavState>) => void }) {
  const featured = products.slice(0, 4);
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pt-44">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: FUCHSIA, fontFamily: cinzel }}
            >
              Men · Women · After dark
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.06, ease }}
              className="mt-5 max-w-xl text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
              style={{ color: INK, fontFamily: cinzel }}
            >
              {brand.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease }}
              className="mt-5 max-w-md text-base leading-relaxed md:text-lg"
              style={{ color: SUB }}
            >
              {brand.blurb}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() => onNavigate({ view: 'shop', gender: 'all' })}
                className="rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.03]"
                style={{ background: FUCHSIA, fontFamily: cinzel }}
              >
                Shop the drop
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ view: 'shop', gender: 'women' })}
                className="rounded-full border px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:bg-black/5"
                style={{ borderColor: LINE, color: INK, fontFamily: cinzel }}
              >
                Women
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ view: 'shop', gender: 'men' })}
                className="rounded-full border px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:bg-black/5"
                style={{ borderColor: LINE, color: INK, fontFamily: cinzel }}
              >
                Men
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]"
          >
            <Image src={heroImage} alt="LUNÉ fashion editorial" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/80" style={{ fontFamily: cinzel }}>
                SS26 · Drop 01
              </p>
              <p className="mt-2 text-3xl leading-none text-white md:text-5xl" style={{ fontFamily: cinzel }}>
                Afterglow
              </p>
              <p className="mt-3 max-w-xs text-sm text-white/75">
                Velvet mids, chrome tanks, wide-leg nocturnes — styled for the timeline.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y px-5 py-4 md:px-10" style={{ borderColor: LINE, background: SURFACE }}>
        <div className="mx-auto flex max-w-6xl animate-marquee gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, loop) => (
            <div key={loop} className="flex gap-10">
              {['New drop live', 'Free returns 14 days', 'Ships worldwide', 'Men & women', 'Limited chrome sneakers', 'Velvet archive'].map(
                (t) => (
                  <span key={`${loop}-${t}`} className="text-xs uppercase tracking-[0.22em]" style={{ color: SUB, fontFamily: cinzel }}>
                    ✦ {t}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: FUCHSIA, fontFamily: cinzel }}>
          Collections
        </p>
        <h2 className="mt-2 text-3xl md:text-5xl" style={{ color: INK, fontFamily: cinzel }}>
          Pick your lane
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {collections.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onNavigate({ view: 'shop', gender: c.gender ?? 'all' })}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] text-left"
            >
              <Image src={c.image} alt={c.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/80" style={{ fontFamily: cinzel }}>
                  {c.cta}
                </p>
                <h3 className="mt-2 text-2xl text-white md:text-3xl" style={{ fontFamily: cinzel }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{c.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: FUCHSIA, fontFamily: cinzel }}>
              Featured
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl" style={{ color: INK, fontFamily: cinzel }}>
              Trending now
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ view: 'shop', gender: 'all' })}
            className="hidden text-xs uppercase tracking-[0.18em] md:block"
            style={{ color: SUB, fontFamily: cinzel }}
          >
            View all →
          </button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} onOpen={() => onNavigate({ view: 'product', productId: p.id })} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: FUCHSIA, fontFamily: cinzel }}>
          Lookbook
        </p>
        <h2 className="mt-2 text-3xl md:text-5xl" style={{ color: INK, fontFamily: cinzel }}>
          Styled for the scroll
        </h2>
        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {lookbook.map((l) => (
            <div key={l.title} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={l.image} alt={l.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-lg text-white" style={{ fontFamily: cinzel }}>
                  {l.title}
                </p>
                <p className="mt-1 text-xs text-white/70">{l.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t px-5 py-20 md:px-10" style={{ borderColor: LINE, background: SURFACE }}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-[1.5rem] border bg-white p-8" style={{ borderColor: LINE }}>
              <p className="text-xl leading-snug md:text-2xl" style={{ color: INK, fontFamily: cinzel }}>
                “{t.quote}”
              </p>
              <footer className="mt-6 text-sm" style={{ color: SUB }}>
                <span style={{ color: FUCHSIA, fontFamily: cinzel }}>{t.name}</span> · {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}

function ProductCard({
  product,
  onOpen,
  priority = false,
}: {
  product: Product;
  onOpen: () => void;
  priority?: boolean;
}) {
  return (
    <button type="button" onClick={onOpen} className="group text-left">
      <ProductArt product={product} showCaption={false} priority={priority} className="aspect-[3/4] rounded-2xl" />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: SUB, fontFamily: cinzel }}>
            {product.category}
          </p>
          <h3 className="mt-1 text-base leading-tight" style={{ color: INK, fontFamily: cinzel }}>
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold" style={{ color: INK }}>
            {formatPrice(product.price)}
          </p>
          {product.compareAt && (
            <p className="text-xs line-through" style={{ color: SUB }}>
              {formatPrice(product.compareAt)}
            </p>
          )}
        </div>
      </div>
      {product.badge && (
        <span
          className="mt-2 inline-block rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
          style={{ background: `${FUCHSIA}14`, color: FUCHSIA, fontFamily: cinzel }}
        >
          {product.badge}
        </span>
      )}
    </button>
  );
}

function ShopView({
  gender,
  onNavigate,
}: {
  gender: Gender | 'all';
  onNavigate: (next: Partial<NavState>) => void;
}) {
  const [cat, setCat] = useState('All');
  const list = filterProducts(gender, cat);
  const title = gender === 'women' ? 'Women' : gender === 'men' ? 'Men' : 'Shop all';

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: FUCHSIA, fontFamily: cinzel }}>
        {brand.domain}
      </p>
      <h1 className="mt-3 text-4xl md:text-6xl" style={{ color: INK, fontFamily: cinzel }}>
        {title}
      </h1>
      <p className="mt-3 max-w-lg text-sm md:text-base" style={{ color: SUB }}>
        Filter by vibe. Every piece is built for men and women who dress like the algorithm is watching.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(['all', 'women', 'men'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onNavigate({ view: 'shop', gender: g })}
            className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{
              background: gender === g ? FUCHSIA : SURFACE,
              color: gender === g ? '#fff' : INK,
              border: `1px solid ${gender === g ? FUCHSIA : LINE}`,
              fontFamily: cinzel,
            }}
          >
            {g === 'all' ? 'All' : g}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className="rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              background: cat === c ? INK : 'transparent',
              color: cat === c ? '#fff' : SUB,
              border: `1px solid ${cat === c ? INK : LINE}`,
              fontFamily: cinzel,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.18em]" style={{ color: SUB, fontFamily: cinzel }}>
        {list.length} pieces
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={() => onNavigate({ view: 'product', productId: p.id })} />
        ))}
      </div>
    </section>
  );
}

function ProductView({
  productId,
  onNavigate,
  onAdd,
}: {
  productId: string;
  onNavigate: (next: Partial<NavState>) => void;
  onAdd: () => void;
}) {
  const product = getProduct(productId) ?? products[0];
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.gender === product.gender && p.id !== product.id).slice(0, 3);

  useEffect(() => {
    setSize(product.sizes[1] ?? product.sizes[0]);
    setColor(product.colors[0]);
    setAdded(false);
  }, [product.id, product.sizes, product.colors]);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <button
        type="button"
        onClick={() => onNavigate({ view: 'shop', gender: product.gender })}
        className="text-[11px] uppercase tracking-[0.18em]"
        style={{ color: SUB, fontFamily: cinzel }}
      >
        ← Back to {product.gender}
      </button>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductArt product={product} showCaption={false} priority className="aspect-[4/5] rounded-[2rem]" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: FUCHSIA, fontFamily: cinzel }}>
            {product.gender} · {product.category}
          </p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl" style={{ color: INK, fontFamily: cinzel }}>
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold" style={{ color: INK }}>
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-base line-through" style={{ color: SUB }}>
                {formatPrice(product.compareAt)}
              </span>
            )}
            {product.badge && (
              <span
                className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
                style={{ background: `${FUCHSIA}14`, color: FUCHSIA, fontFamily: cinzel }}
              >
                {product.badge}
              </span>
            )}
          </div>
          <p className="mt-6 text-sm leading-relaxed md:text-base" style={{ color: SUB }}>
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: SUB, fontFamily: cinzel }}>
              Color — {color}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{
                    border: `1px solid ${color === c ? FUCHSIA : LINE}`,
                    background: color === c ? `${FUCHSIA}12` : SURFACE,
                    color: INK,
                    fontFamily: cinzel,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: SUB, fontFamily: cinzel }}>
              Size — {size}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="min-w-12 rounded-full px-3 py-2 text-[11px] font-bold"
                  style={{
                    border: `1px solid ${size === s ? INK : LINE}`,
                    background: size === s ? INK : 'transparent',
                    color: size === s ? '#fff' : INK,
                    fontFamily: cinzel,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAdd();
              setAdded(true);
            }}
            className="mt-8 w-full rounded-full py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.01]"
            style={{ background: FUCHSIA, fontFamily: cinzel }}
          >
            {added ? 'Added to bag ✓' : 'Add to bag'}
          </button>

          <ul className="mt-8 space-y-2 border-t pt-6" style={{ borderColor: LINE }}>
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm" style={{ color: SUB }}>
                <span style={{ color: FUCHSIA }}>✦</span> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl" style={{ color: INK, fontFamily: cinzel }}>
            You might also want
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={() => onNavigate({ view: 'product', productId: p.id })} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (next: Partial<NavState>) => void }) {
  return (
    <footer className="border-t px-5 py-14 md:px-10" style={{ borderColor: LINE, background: SURFACE }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-3xl tracking-[0.16em]" style={{ color: INK, fontFamily: cinzel }}>
            {brand.name}
          </p>
          <p className="mt-3 max-w-sm text-sm" style={{ color: SUB }}>
            {brand.tagline} Concept ecommerce experience by CRUD Studio.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button type="button" onClick={() => onNavigate({ view: 'shop', gender: 'women' })} className="text-xs uppercase tracking-[0.16em]" style={{ color: SUB, fontFamily: cinzel }}>
            Women
          </button>
          <button type="button" onClick={() => onNavigate({ view: 'shop', gender: 'men' })} className="text-xs uppercase tracking-[0.16em]" style={{ color: SUB, fontFamily: cinzel }}>
            Men
          </button>
          <button type="button" onClick={() => onNavigate({ view: 'shop', gender: 'all' })} className="text-xs uppercase tracking-[0.16em]" style={{ color: SUB, fontFamily: cinzel }}>
            Shop
          </button>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[11px]" style={{ color: '#9A948C' }}>
        © 2026 {brand.name} · {brand.domain} · Demo only · Photos via Unsplash
      </p>
    </footer>
  );
}

export default function FashionSite() {
  const [nav, setNav] = useState<NavState>({ view: 'home', gender: 'all' });
  const [bagCount, setBagCount] = useState(0);

  const onNavigate = (next: Partial<NavState>) => {
    setNav((prev) => ({ ...prev, ...next }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: BG, color: INK }}>
      <Header nav={nav} bagCount={bagCount} onNavigate={onNavigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${nav.view}-${nav.productId ?? ''}-${nav.gender}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
        >
          {nav.view === 'home' && <HomeView onNavigate={onNavigate} />}
          {nav.view === 'shop' && <ShopView gender={nav.gender} onNavigate={onNavigate} />}
          {nav.view === 'product' && nav.productId && (
            <ProductView
              productId={nav.productId}
              onNavigate={onNavigate}
              onAdd={() => setBagCount((n) => n + 1)}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
