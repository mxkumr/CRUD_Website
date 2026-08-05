import type { Metadata } from 'next';

/** Canonical production origin — used for sitemap, robots, OG, JSON-LD. */
export const SITE_URL = 'https://thecrudstudio.com';

export const siteConfig = {
  name: 'CRUD Studio',
  shortName: 'CRUD',
  tagline: 'Ideas to Iconic Brands',
  description:
    'CRUD (Create Refine Unified Designs) is a design agency crafting powerful brands through innovative design, seamless web development, and strategic digital solutions.',
  email: 'thecrudstudio@gmail.com',
  locale: 'en_IN',
  lang: 'en',
  twitterHandle: '@crudstudio',
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/** Build consistent per-page Metadata with canonical + Open Graph + Twitter. */
export function pageMetadata({
  title,
  description,
  path = '/',
  image = '/opengraph-image',
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: 'Create Refine Unified Designs',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-dark.png`,
    email: siteConfig.email,
    description: siteConfig.description,
    sameAs: [
      'https://instagram.com',
      'https://x.com',
      'https://facebook.com',
      'https://youtube.com',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-99406-34910',
        contactType: 'sales',
        areaServed: ['IN', 'DE'],
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    publisher: { '@type': 'Organization', name: siteConfig.name },
    inLanguage: siteConfig.lang,
  };
}
