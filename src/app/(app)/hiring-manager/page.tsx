'use client';

import { HiringManagerPanel } from '@/components/panels/HiringManagerPanel';
import { Briefcase } from 'lucide-react';

export default function HiringManagerDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Briefcase className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Hiring manager workspace</h1>
      </div>
      <HiringManagerPanel />
    </div>
  );
}
