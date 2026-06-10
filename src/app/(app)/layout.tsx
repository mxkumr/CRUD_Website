
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/AppHeader';
import { Loader2 } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail'); // Fetch email
    
    if (token && role && loggedInUserEmail) { // Ensure email is also present
      setIsAuthenticated(true);
      setUserRole(role);
      
      const currentPath = window.location.pathname;
      const segment = currentPath.split('/')[1];
      const roleForSegment = (s: string): string | null => {
        if (s === 'hiring-manager') return 'hiring_manager';
        if (s === 'recruiter' || s === 'admin') return s;
        return null;
      };
      const expected = roleForSegment(segment);
      if (expected && role && expected !== role) {
        if (role === 'admin') router.replace('/admin');
        else if (role === 'recruiter') router.replace('/recruiter');
        else if (role === 'hiring_manager') router.replace('/hiring-manager');
      }

    } else {
      router.replace('/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Authenticating...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader isAuthenticated={true} userRole={userRole} />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border mt-auto">
        © {new Date().getFullYear()} TalentFlow. Internal recruiting demo.
      </footer>
    </div>
  );
}
