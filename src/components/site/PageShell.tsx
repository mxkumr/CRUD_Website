'use client';

import type { ReactNode } from 'react';
import SmoothScroll from './SmoothScroll';
import CustomCursor from './CustomCursor';
import Navigation from './Navigation';
import ContactFooter from './ContactFooter';

/**
 * Consistent chrome for every standalone page: smooth scroll,
 * custom cursor, navigation and the shared contact / footer block.
 */
export default function PageShell({
  children,
  showContactFooter = true,
}: {
  children: ReactNode;
  showContactFooter?: boolean;
}) {
  return (
    <SmoothScroll>
      <div className="crud-site min-h-screen">
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        {showContactFooter && <ContactFooter />}
      </div>
    </SmoothScroll>
  );
}
