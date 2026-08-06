'use client';

import Image from 'next/image';

export default function CrudLogo({
  className = '',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/crud-circle.png"
      alt="CRUD Studio"
      width={512}
      height={512}
      priority={priority}
      unoptimized
      className={`h-9 w-9 rounded-full object-cover md:h-11 md:w-11 ${className}`}
    />
  );
}
