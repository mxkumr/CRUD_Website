import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const body = Hanken_Grotesk({
  variable: '--font-body',
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Manish Kumar Bala Kumar — Security Researcher, Founder, Designer',
  description:
    'Cybersecurity researcher, two-time founder, designer and AI builder. ICSE 2026 published. Building secure digital futures.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} bg-ink font-body text-bone antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
