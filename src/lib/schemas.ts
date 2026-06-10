import { z } from 'zod';
import { taskStatuses, taskTypes, taskImportances, userRoles } from '@/types';
import type { UserRole } from '@/types';

export const TaskFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.').max(120, 'Title must be at most 120 characters.'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters.')
    .max(800, 'Description must be at most 800 characters.'),
  assignedToId: z.string().optional(),
  status: z.enum(taskStatuses as [string, ...string[]]),
  type: z.enum(taskTypes as [string, ...string[]]),
  deadline: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'Deadline must be in YYYY-MM-DD format.',
  }),
  importance: z.enum(taskImportances as [string, ...string[]]),
});
export type TaskFormData = z.infer<typeof TaskFormSchema>;

/** Form uses comma-separated open roles; parse before saving to `Department`. */
export const DepartmentFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Department name must be at least 2 characters.'),
  hiringContact: z.string().min(2, 'Hiring contact name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z
    .string()
    .min(7, 'Phone number seems too short.')
    .refine((val) => /^[+]?[\d\s-()]+$/.test(val), { message: 'Invalid phone number format.' }),
  openRoles: z.string().min(2, 'List open roles (comma-separated).'),
});
export type DepartmentFormData = z.infer<typeof DepartmentFormSchema>;

export const SignupFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  desiredRole: z.enum(userRoles as [UserRole, ...UserRole[]]),
  message: z.string().optional(),
});
export type SignupFormData = z.infer<typeof SignupFormSchema>;
