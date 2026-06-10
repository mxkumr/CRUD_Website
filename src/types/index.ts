import type { Task as AITaskInput } from '@/ai/flows/prioritize-tasks';

export type StaffMember = {
  id: string;
  name: string;
  role: 'recruiter' | 'hiring_manager' | 'admin';
};

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';
export const taskStatuses: TaskStatus[] = ['pending', 'in-progress', 'completed', 'blocked'];

/** Recruiting workflow steps */
export type TaskType =
  | 'sourcing'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'reference'
  | 'onboarding'
  | 'background-check'
  | 'meeting';
export const taskTypes: TaskType[] = [
  'sourcing',
  'screening',
  'interview',
  'offer',
  'reference',
  'onboarding',
  'background-check',
  'meeting',
];

export type TaskImportance = 'high' | 'medium' | 'low';
export const taskImportances: TaskImportance[] = ['high', 'medium', 'low'];

export type Task = {
  id: string;
  title: string;
  description: string;
  assignedToId?: string;
  status: TaskStatus;
  type: TaskType;
  deadline: string;
  importance: TaskImportance;
  createdAt: string;
};

/** Legacy task types from older app versions → normalized TaskType */
const LEGACY_TASK_TYPE_MAP: Record<string, TaskType> = {
  'cold-call': 'sourcing',
  email: 'screening',
  development: 'interview',
  design: 'screening',
  research: 'reference',
  'content-creation': 'screening',
  meeting: 'meeting',
};

export function normalizeTaskType(type: string): TaskType {
  if (taskTypes.includes(type as TaskType)) return type as TaskType;
  return LEGACY_TASK_TYPE_MAP[type] ?? 'meeting';
}

export function normalizeTask(task: Task): Task {
  return { ...task, type: normalizeTaskType(task.type as unknown as string) };
}

/** Department / business unit hiring for */
export type Department = {
  id: string;
  name: string;
  hiringContact: string;
  email: string;
  phone: string;
  openRoles: string[];
  createdAt: string;
};

export function mapToAITask(task: Task): AITaskInput {
  let aiTaskType: 'marketing' | 'development' = 'marketing';
  if (['interview', 'offer', 'onboarding', 'background-check'].includes(task.type)) {
    aiTaskType = 'development';
  } else if (['sourcing', 'screening', 'reference', 'meeting'].includes(task.type)) {
    aiTaskType = 'marketing';
  }

  return {
    id: task.id,
    description: `${task.title} - ${task.description}`,
    deadline: task.deadline,
    importance: task.importance,
    type: aiTaskType,
  };
}

export type UserRole = 'admin' | 'recruiter' | 'hiring_manager';
export const userRoles: UserRole[] = ['admin', 'recruiter', 'hiring_manager'];

export function formatRoleLabel(role: string): string {
  return role
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export type SignupRequestStatus = 'pending' | 'approved' | 'rejected';

export type SystemUser = {
  id: string;
  name: string;
  email: string;
  desiredRole: UserRole;
  status: SignupRequestStatus;
  requestedAt: string;
  message?: string;
};

export type SignupRequest = SystemUser;

export type PanelAssigneeFilter = 'recruiter' | 'hiring_manager' | 'admin';

export const getAssignableUsers = (panelType?: PanelAssigneeFilter): SystemUser[] => {
  if (typeof window === 'undefined') return [];
  const storedUsers: SystemUser[] = JSON.parse(localStorage.getItem('signupRequests') || '[]');
  const approvedUsers = storedUsers.filter((user) => user.status === 'approved');

  if (panelType === 'recruiter') {
    return approvedUsers.filter((user) => user.desiredRole === 'recruiter' || user.desiredRole === 'admin');
  }
  if (panelType === 'hiring_manager') {
    return approvedUsers.filter((user) => user.desiredRole === 'hiring_manager' || user.desiredRole === 'admin');
  }
  return approvedUsers;
};

export type CandidateRow = Record<string, string>;

/** Imported candidate spreadsheet (e.g. from ATS export) */
export type CandidateImport = {
  id: string;
  name: string;
  data: CandidateRow[];
  headers: string[];
  assignedToId?: string;
  uploadedByRole?: UserRole;
  uploaderId?: string;
  createdAt: string;
};

/** @deprecated Use CandidateImport — kept for legacy UI components */
export type Campaign = CandidateImport;
export type CampaignLead = CandidateRow;
