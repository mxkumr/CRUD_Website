
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { SystemUser, SignupRequestStatus, UserRole } from '@/types';
import { userRoles, formatRoleLabel } from '@/types';
import { CheckCircle, XCircle, UserCheck, Hourglass, Mail, ShieldQuestion, MessageSquare, RefreshCw } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Added import for Label
import {
  SIGNUP_REQUESTS_STORAGE_KEY,
  SIGNUP_REQUESTS_CHANGED_EVENT,
  notifySignupRequestsChanged,
} from '@/lib/signup-requests-events';
import { DEMO_SUPER_ADMIN_EMAIL } from '@/lib/demo-auth';


export function PendingRequestsPanel() {
  const [requests, setRequests] = useState<SystemUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchRequests = useCallback((background = false) => {
    if (!background) setIsLoading(true);
    const delay = background ? 0 : 500;
    window.setTimeout(() => {
      const storedRequests: SystemUser[] = JSON.parse(localStorage.getItem(SIGNUP_REQUESTS_STORAGE_KEY) || '[]');
      setRequests(storedRequests.sort((a, b) => parseISO(b.requestedAt).getTime() - parseISO(a.requestedAt).getTime()));
      setIsLoading(false);
    }, delay);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    const reload = () => fetchRequests(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === SIGNUP_REQUESTS_STORAGE_KEY || e.key === null) reload();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(SIGNUP_REQUESTS_CHANGED_EVENT, reload);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(SIGNUP_REQUESTS_CHANGED_EVENT, reload);
    };
  }, [fetchRequests]);

  const updateLocalStorageAndState = (updatedRequests: SystemUser[]) => {
    localStorage.setItem(SIGNUP_REQUESTS_STORAGE_KEY, JSON.stringify(updatedRequests));
    notifySignupRequestsChanged();
    setRequests(updatedRequests.sort((a, b) => parseISO(b.requestedAt).getTime() - parseISO(a.requestedAt).getTime()));
  };

  const handleUpdateRequestStatus = async (requestId: string, newStatus: SignupRequestStatus) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    updateLocalStorageAndState(updatedRequests);

    toast({
      title: `Request ${newStatus}`,
      description: `User request has been ${newStatus}.`,
    });
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const userToChange = requests.find(user => user.id === userId);
    if (!userToChange) return;

    const currentAdmins = requests.filter(user => user.status === 'approved' && user.desiredRole === 'admin');
    
    // Safety check: Prevent changing the last admin's role to non-admin
    if (userToChange.desiredRole === 'admin' && newRole !== 'admin' && currentAdmins.length === 1 && userToChange.id === currentAdmins[0].id) {
      toast({
        title: "Action Restricted",
        description: "Cannot change the role of the last administrator.",
        variant: "destructive",
      });
      // Revert UI change if select was optimistic
      setRequests([...requests]); // Trigger re-render to revert select
      return;
    }
    
    // Safety check: Prevent changing role of super admin by other admins (optional, good for strictness)
    // For this demo, we allow super admin's role to be changed if there are other admins.
    // If the super admin is the *only* admin, the above check handles it.

    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedRequests = requests.map(user =>
      user.id === userId ? { ...user, desiredRole: newRole } : user
    );
    updateLocalStorageAndState(updatedRequests);

    toast({
      title: "Role Updated",
      description: `${userToChange.name}'s role changed to ${formatRoleLabel(newRole)}.`,
    });

    // If an admin changes their own role, they might need to re-login to see changes reflect in header/access.
    // This is a more complex state management issue beyond this component.
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail'); // Assuming email is stored on login
    if (userToChange.email === loggedInUserEmail && userToChange.desiredRole !== newRole) {
        localStorage.setItem('userRole', newRole); // Update current session role
         toast({
            title: "Your Role Changed",
            description: "Your role has been updated. Some changes may require a page refresh or re-login.",
            variant: "default"
        });
    }
  };
  
  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Hourglass className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading user data...</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center">
              <UserCheck className="mr-2 h-6 w-6 text-primary" />
              HR access & users
            </CardTitle>
            <CardDescription>
              Approve recruiter and hiring manager access; adjust roles for existing users.
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={() => fetchRequests(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Alert variant="default" className="mb-6 border-muted-foreground/25">
          <ShieldQuestion className="h-4 w-4" />
          <AlertTitle>Same browser only</AlertTitle>
          <AlertDescription>
            Sign-up data is stored in this browser. A request submitted in a private/incognito window (or another browser)
            will not appear here—open the admin dashboard in that same window, or use the same normal browser profile for both
            sign-up and admin.
          </AlertDescription>
        </Alert>
        <h3 className="text-lg font-semibold mb-2">Pending access requests ({pendingRequests.length})</h3>
        {pendingRequests.length === 0 ? (
          <Alert variant="default" className="border-primary mb-6">
            <ShieldQuestion className="h-4 w-4 text-primary" />
            <AlertTitle>No Pending Requests</AlertTitle>
            <AlertDescription>
              There are currently no new sign-up requests awaiting approval.
            </AlertDescription>
          </Alert>
        ) : (
          <ScrollArea className="h-[300px] pr-4 mb-6">
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <Card key={request.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{request.name}</CardTitle>
                        <Badge variant='secondary' className="capitalize">
                            {request.status}
                        </Badge>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground">
                      Requested: {format(parseISO(request.requestedAt), "MMM dd, yyyy 'at' hh:mm a")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm pb-3">
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary/80" /> {request.email}</p>
                    <p className="flex items-center"><ShieldQuestion className="mr-2 h-4 w-4 text-primary/80" /> Requested role: <span className="ml-1 font-medium">{formatRoleLabel(request.desiredRole)}</span></p>
                    {request.message && (
                      <p className="flex items-start pt-1">
                        <MessageSquare className="mr-2 h-4 w-4 text-primary/80 mt-0.5 flex-shrink-0" /> 
                        <span className="italic text-muted-foreground">{request.message}</span>
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}>
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button size="sm" onClick={() => handleUpdateRequestStatus(request.id, 'approved')}>
                      <CheckCircle className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        <h3 className="text-lg font-semibold mb-2 mt-8">Manage Existing Users ({processedRequests.length})</h3>
         {processedRequests.length === 0 ? (
             <Alert variant="default">
                <UserCheck className="h-4 w-4" />
                <AlertTitle>No Processed User Requests</AlertTitle>
                <AlertDescription>Once requests are processed, they will appear here.</AlertDescription>
             </Alert>
         ) : (
            <ScrollArea className="h-[350px] pr-4">
            <div className="space-y-3">
            {processedRequests.map(user => (
                 <Card key={user.id} className={`bg-muted/20 ${user.status === 'approved' ? 'border-green-500/30' : 'border-red-500/30'}`}>
                    <CardHeader className="p-3 pb-2">
                         <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{user.name} ({user.email})</p>
                            <Badge variant={user.status === 'approved' ? 'default' : 'destructive'} className="capitalize">
                                {user.status}
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requested role: {formatRoleLabel(user.desiredRole)} · Submitted: {format(parseISO(user.requestedAt), "MMM dd, yyyy")}
                        </p>
                    </CardHeader>
                    {user.status === 'approved' && (
                      <CardContent className="p-3 pt-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`role-select-${user.id}`} className="text-xs whitespace-nowrap">Current Role:</Label>
                          <Select
                            value={user.desiredRole}
                            onValueChange={(newRole) => handleRoleChange(user.id, newRole as UserRole)}
                            disabled={user.email === DEMO_SUPER_ADMIN_EMAIL && requests.filter(u => u.status === 'approved' && u.desiredRole === 'admin').length === 1}
                          >
                            <SelectTrigger id={`role-select-${user.id}`} className="h-8 text-xs flex-grow">
                              <SelectValue placeholder="Change role" />
                            </SelectTrigger>
                            <SelectContent>
                              {userRoles.map(role => (
                                <SelectItem key={role} value={role} className="text-xs">
                                  {formatRoleLabel(role)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                         {user.email === DEMO_SUPER_ADMIN_EMAIL && requests.filter(u => u.status === 'approved' && u.desiredRole === 'admin').length === 1 && (
                            <p className="text-xs text-destructive mt-1">Cannot change role of the sole super admin.</p>
                        )}
                      </CardContent>
                    )}
                     {user.status === 'rejected' && (
                         <CardFooter className="p-3 pt-1 flex justify-end">
                            <Button variant="outline" size="sm" onClick={() => handleUpdateRequestStatus(user.id, 'approved')}>
                                <CheckCircle className="mr-1 h-3 w-3" /> Re-approve
                            </Button>
                         </CardFooter>
                     )}
                </Card>
            ))}
            </div>
          </ScrollArea>
         )}
      </CardContent>
    </Card>
  );
}
