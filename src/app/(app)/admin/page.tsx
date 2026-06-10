'use client';

import { useEffect, useState } from 'react';
import type { SystemUser } from '@/types';
import { DepartmentsPanel } from '@/components/panels/DepartmentsPanel';
import { PendingRequestsPanel } from '@/components/admin/PendingRequestsPanel';
import { RecruiterPanel } from '@/components/panels/RecruiterPanel';
import { HiringManagerPanel } from '@/components/panels/HiringManagerPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserSearch, Briefcase } from 'lucide-react';
import {
  SIGNUP_REQUESTS_STORAGE_KEY,
  SIGNUP_REQUESTS_CHANGED_EVENT,
} from '@/lib/signup-requests-events';

export default function AdminDashboardPage() {
  const [pendingRequestCount, setPendingRequestCount] = useState(0);

  useEffect(() => {
    const updatePendingCount = () => {
      if (typeof window !== 'undefined') {
        const storedRequests: SystemUser[] = JSON.parse(localStorage.getItem(SIGNUP_REQUESTS_STORAGE_KEY) || '[]');
        const pendingCount = storedRequests.filter((req) => req.status === 'pending').length;
        setPendingRequestCount(pendingCount);
      }
    };

    updatePendingCount();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SIGNUP_REQUESTS_STORAGE_KEY) {
        updatePendingCount();
      }
    };

    const handleLocalChange = () => updatePendingCount();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(SIGNUP_REQUESTS_CHANGED_EVENT, handleLocalChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(SIGNUP_REQUESTS_CHANGED_EVENT, handleLocalChange);
    };
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">HR admin</h1>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="flex items-center justify-start w-full overflow-x-auto h-12 rounded-md bg-muted p-1 text-muted-foreground mb-6">
          <TabsTrigger value="departments" className="px-3 py-1.5">
            <Users className="mr-2 h-4 w-4 flex-shrink-0" /> Departments
          </TabsTrigger>
          <TabsTrigger value="pending-requests" className="px-3 py-1.5 flex items-center">
            <UserCheck className="mr-2 h-4 w-4 flex-shrink-0" /> Access requests
            {pendingRequestCount > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {pendingRequestCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="recruiter-tasks" className="px-3 py-1.5">
            <UserSearch className="mr-2 h-4 w-4 flex-shrink-0" /> Recruiter tasks
          </TabsTrigger>
          <TabsTrigger value="hm-tasks" className="px-3 py-1.5">
            <Briefcase className="mr-2 h-4 w-4 flex-shrink-0" /> Hiring manager
          </TabsTrigger>
        </TabsList>
        <TabsContent value="departments">
          <DepartmentsPanel />
        </TabsContent>
        <TabsContent value="pending-requests">
          <PendingRequestsPanel />
        </TabsContent>
        <TabsContent value="recruiter-tasks">
          <RecruiterPanel />
        </TabsContent>
        <TabsContent value="hm-tasks">
          <HiringManagerPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
