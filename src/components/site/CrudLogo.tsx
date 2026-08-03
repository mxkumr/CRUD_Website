'use client';

import Image from 'next/image';
import { useSyncExternalStore } from 'react';

function useSiteTheme() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.classList.contains('theme-light') ? 'light' : 'dark'),
    () => 'dark',
  );
}

export default function CrudLogo({
  className = '',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const theme = useSiteTheme();
  // logo-dark = white mark for dark backgrounds; logo-light = dark mark for light backgrounds
  const src = theme === 'light' ? '/logo-light.png' : '/logo-dark.png';

  return (
    <Image
      src={src}
      alt="CRUD Studio"
      width={513}
      height={186}
      priority={priority}
      unoptimized
      className={`h-9 w-auto md:h-11 ${className}`}
    />
  );
}
