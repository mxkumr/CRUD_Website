'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskCard } from '@/components/TaskCard';
import { TaskFormDialog } from '@/components/TaskFormDialog';
import { AIPrioritizationSection } from '@/components/AIPrioritizationSection';
import type { Task, TaskStatus, CandidateImport, CandidateRow, UserRole, SystemUser, TaskType } from '@/types';
import { normalizeTask } from '@/types';
import { TaskFormData } from '@/lib/schemas';
import { mockTasks } from '@/lib/constants';
import {
  PlusCircle,
  Search,
  Filter,
  ListChecks,
  Trash2,
  Eye,
  FileSpreadsheet,
} from 'lucide-react';
import { CampaignUploadDialog } from '@/components/marketing/CampaignUploadDialog';
import { CampaignDataViewer } from '@/components/marketing/CampaignDataViewer';
import { parseCsv, generateCsv } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getAssignableUsers } from '@/types';

const HM_TASKS_KEY = 'hiringManagerTasks';
const CANDIDATE_IMPORTS_KEY = 'candidateImports';

const HM_TASK_TYPES: Task['type'][] = ['interview', 'offer', 'onboarding', 'background-check', 'meeting'];

export function HiringManagerPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pools, setPools] = useState<CandidateImport[]>([]);
  const [selectedPool, setSelectedPool] = useState<CandidateImport | null>(null);

  const [searchTermTasks, setSearchTermTasks] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [importanceFilter, setImportanceFilter] = useState<Task['importance'] | 'all'>('all');

  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hiringManagers, setHiringManagers] = useState<SystemUser[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem('userRole') as UserRole | null;
    const userId = localStorage.getItem('loggedInUserId');
    setCurrentUserRole(role);
    setCurrentUserId(userId);

    const storedTasks = JSON.parse(localStorage.getItem(HM_TASKS_KEY) || 'null');
    if (storedTasks && Array.isArray(storedTasks)) {
      setTasks(storedTasks.map((t: Task) => normalizeTask(t)));
    } else {
      const initial = mockTasks.filter((task) => HM_TASK_TYPES.includes(task.type));
      setTasks(initial);
      localStorage.setItem(HM_TASKS_KEY, JSON.stringify(initial));
    }

    const storedPools = JSON.parse(localStorage.getItem(CANDIDATE_IMPORTS_KEY) || '[]');
    setPools(storedPools);

    if (role === 'admin') {
      const all = getAssignableUsers('hiring_manager');
      setHiringManagers(all.filter((u) => u.desiredRole === 'hiring_manager'));
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem(HM_TASKS_KEY, JSON.stringify(updatedTasks));
  };

  const savePoolsToLocalStorage = useCallback((updated: CandidateImport[]) => {
    localStorage.setItem(CANDIDATE_IMPORTS_KEY, JSON.stringify(updated));
  }, []);

  const handleSaveTask = (data: TaskFormData, id?: string) => {
    let updatedTasks: Task[];
    if (id) {
      updatedTasks = tasks.map((task) =>
        task.id === id ? normalizeTask({ ...task, ...data, type: data.type as TaskType } as Task) : task
      );
    } else {
      const newTask: Task = normalizeTask({
        id: `task-${Date.now()}`,
        ...data,
        type: data.type as TaskType,
        createdAt: new Date().toISOString(),
      } as Task);
      updatedTasks = [newTask, ...tasks];
    }
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, status } : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handlePrioritizedTasks = (prioritizedTasks: Task[]) => {
    setTasks(prioritizedTasks);
  };

  const handleFileUpload = (file: File, poolName: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const { headers, data } = parseCsv(text);
        if (headers.length === 0 || data.length === 0) {
          toast({
            title: 'Empty or invalid CSV',
            description: 'The CSV file seems empty or incorrectly formatted.',
            variant: 'destructive',
          });
          return;
        }
        const newPool: CandidateImport = {
          id: `pool-${Date.now()}`,
          name: poolName,
          headers,
          data,
          uploadedByRole: currentUserRole || undefined,
          uploaderId: currentUserId || undefined,
          createdAt: new Date().toISOString(),
        };
        const updated = [...pools, newPool];
        setPools(updated);
        savePoolsToLocalStorage(updated);
        toast({
          title: 'Candidates imported',
          description: `"${poolName}" — ${data.length} row(s).`,
        });
      } catch (error) {
        console.error('CSV parse error:', error);
        toast({
          title: 'CSV error',
          description: 'Could not parse the CSV file.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleExportPool = (pool: CandidateImport) => {
    try {
      const csvString = generateCsv(pool.headers, pool.data);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${pool.name.replace(/\s+/g, '_')}_export.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: 'Exported', description: `Saved ${pool.name}.csv` });
    } catch (error) {
      console.error(error);
      toast({ title: 'Export failed', variant: 'destructive' });
    }
  };

  const handleDeletePool = (poolId: string) => {
    const updated = pools.filter((p) => p.id !== poolId);
    setPools(updated);
    savePoolsToLocalStorage(updated);
    if (selectedPool?.id === poolId) setSelectedPool(null);
    toast({ title: 'Pool removed', description: 'Candidate import list deleted.' });
  };

  const handleDeleteRows = (poolId: string, leadIndices: number[]) => {
    setPools((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== poolId) return p;
        const newData = p.data.filter((_, index) => !leadIndices.includes(index));
        return { ...p, data: newData };
      });
      savePoolsToLocalStorage(updated);
      if (selectedPool?.id === poolId) {
        setSelectedPool(updated.find((p) => p.id === poolId) || null);
      }
      return updated;
    });
    toast({ title: 'Rows removed', description: `${leadIndices.length} row(s) deleted.` });
  };

  const handleCreateTasksFromRows = (poolId: string, rows: CandidateRow[]) => {
    const pool = pools.find((p) => p.id === poolId);
    const newTasks: Task[] = rows.map((row, index) =>
      normalizeTask({
        id: `task-from-${poolId.slice(-4)}-${Date.now()}-${index}`,
        title: `Follow up: ${row.Name || row.name || `Candidate ${index + 1}`}`,
        description: `Pool: ${pool?.name ?? 'N/A'}. ${Object.entries(row)
          .map(([k, v]) => `${k}: ${v}`)
          .join('; ')}`,
        status: 'pending',
        type: (row.Email || row.email ? 'screening' : 'sourcing') as TaskType,
        deadline: format(new Date(new Date().setDate(new Date().getDate() + 7)), 'yyyy-MM-dd'),
        importance: 'medium',
        assignedToId: pool?.assignedToId || currentUserId || undefined,
        createdAt: new Date().toISOString(),
      } as Task)
    );

    setTasks((prev) => {
      const combined = [...newTasks, ...prev];
      saveTasksToLocalStorage(combined);
      return combined;
    });
    toast({
      title: 'Tasks created',
      description: `${rows.length} recruiting task(s) added to your list.`,
      duration: 5000,
    });
  };

  const handleAssignPool = (poolId: string, userId: string | 'unassigned') => {
    setPools((prev) => {
      const updated = prev.map((p) =>
        p.id === poolId ? { ...p, assignedToId: userId === 'unassigned' ? undefined : userId } : p
      );
      savePoolsToLocalStorage(updated);
      if (selectedPool?.id === poolId) {
        setSelectedPool(updated.find((p) => p.id === poolId) || null);
      }
      return updated;
    });
    toast({ title: 'Assignment updated' });
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTermTasks.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTermTasks.toLowerCase())
    )
    .filter((task) => statusFilter === 'all' || task.status === statusFilter)
    .filter((task) => importanceFilter === 'all' || task.importance === importanceFilter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const visiblePools = pools
    .filter((p) => {
      if (currentUserRole === 'admin') return true;
      if (currentUserRole === 'hiring_manager') return p.assignedToId === currentUserId || !p.assignedToId;
      return false;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const aiTasks = filteredTasks.filter((t) => !['sourcing', 'screening', 'reference'].includes(t.type));

  if (selectedPool) {
    return (
      <div className="p-4 md:p-6">
        <Button onClick={() => setSelectedPool(null)} variant="outline" className="mb-4">
          &larr; Back to candidate pools & tasks
        </Button>
        <CampaignDataViewer
          campaign={selectedPool}
          onExport={handleExportPool}
          onDeleteLeads={handleDeleteRows}
          onCreateTasksFromLeads={handleCreateTasksFromRows}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center">
            <FileSpreadsheet className="mr-3 h-7 w-7 text-primary" />
            Candidate imports (CSV)
          </h2>
          <CampaignUploadDialog onUpload={handleFileUpload} />
        </div>

        {visiblePools.length === 0 ? (
          <Card className="text-center py-8 bg-muted/30">
            <CardContent>
              <ListChecks className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-xl font-semibold">No candidate pools yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Import a CSV (e.g. from your ATS) to track and convert rows into tasks.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePools.map((pool) => (
              <Card key={pool.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="truncate" title={pool.name}>
                    {pool.name}
                  </CardTitle>
                  <CardDescription>
                    {pool.data.length} row(s). Created {format(new Date(pool.createdAt), 'MMM dd, yyyy')}.
                    {pool.assignedToId && hiringManagers.find((m) => m.id === pool.assignedToId) && (
                      <span className="block text-xs mt-1">
                        Assigned: {hiringManagers.find((m) => m.id === pool.assignedToId)?.name}
                      </span>
                    )}
                    {pool.assignedToId && !hiringManagers.find((m) => m.id === pool.assignedToId) && (
                      <span className="block text-xs mt-1 text-muted-foreground italic">Assignee not found</span>
                    )}
                    {!pool.assignedToId && (
                      <span className="block text-xs mt-1 text-muted-foreground italic">Unassigned</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {currentUserRole === 'admin' && (
                    <div className="mb-2">
                      <Label htmlFor={`assign-${pool.id}`} className="text-xs">
                        Assign to hiring manager:
                      </Label>
                      <Select
                        value={pool.assignedToId || 'unassigned'}
                        onValueChange={(value) => handleAssignPool(pool.id, value)}
                      >
                        <SelectTrigger id={`assign-${pool.id}`} className="h-8 text-xs mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {hiringManagers.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                          {hiringManagers.length === 0 && (
                            <SelectItem value="none" disabled>
                              No hiring managers
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPool(pool)}>
                    <Eye className="mr-2 h-4 w-4" /> View rows
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete “{pool.name}”?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes the imported list from TalentFlow. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePool(pool.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Hiring manager tasks</h2>
          <TaskFormDialog
            onSave={handleSaveTask}
            mode="create"
            panelType="hiring_manager"
            triggerButton={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add task
              </Button>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10"
              value={searchTermTasks}
              onChange={(e) => setSearchTermTasks(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TaskStatus | 'all')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {(['pending', 'in-progress', 'completed', 'blocked'] as TaskStatus[]).map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s.replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={importanceFilter}
            onValueChange={(value) => setImportanceFilter(value as Task['importance'] | 'all')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {(['high', 'medium', 'low'] as Task['importance'][]).map((i) => (
                <SelectItem key={i} value={i} className="capitalize">
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AIPrioritizationSection tasks={aiTasks.length > 0 ? aiTasks : filteredTasks} onPrioritizedTasks={handlePrioritizedTasks} />

        {filteredTasks.length > 0 ? (
          <div className="masonry-columns md:columns-2 lg:columns-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdateTask={handleSaveTask}
                onDeleteTask={handleDeleteTask}
                onUpdateStatus={handleUpdateStatus}
                panelType="hiring_manager"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold">No tasks</h3>
            <p className="mt-1 text-sm text-muted-foreground">Adjust filters or add a task.</p>
          </div>
        )}
      </section>
    </div>
  );
}
