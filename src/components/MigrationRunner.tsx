'use client';

import { useEffect } from 'react';
import { runHrLocalStorageMigration } from '@/lib/migrate-hr';

export function MigrationRunner() {
  useEffect(() => {
    runHrLocalStorageMigration();
  }, []);
  return null;
}
