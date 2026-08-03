
import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono, Space_Grotesk, Inter, Instrument_Serif, Cinzel } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'CRUD Studio | Ideas to Iconic Brands',
  description:
    'CRUD (Create Refine Unified Designs) is a design agency crafting powerful brands through innovative design, seamless web development, and strategic digital solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="crud-theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem('crud-theme')==='light')document.documentElement.classList.add('theme-light')}catch(e){}`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${cinzel.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
