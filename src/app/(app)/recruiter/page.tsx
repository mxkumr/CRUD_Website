'use client';

import { RecruiterPanel } from '@/components/panels/RecruiterPanel';
import { UserSearch } from 'lucide-react';

export default function RecruiterDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <UserSearch className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Recruiter workspace</h1>
      </div>
      <RecruiterPanel />
    </div>
  );
}
