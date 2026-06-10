'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit } from 'lucide-react';
import type { Department } from '@/types';
import { DepartmentFormSchema, type DepartmentFormData } from '@/lib/schemas';
import React from 'react';

interface DepartmentFormDialogProps {
  department?: Department;
  onSave: (data: DepartmentFormData, id?: string) => void;
  triggerButton?: React.ReactNode;
  mode?: 'create' | 'edit';
}

export function DepartmentFormDialog({
  department,
  onSave,
  triggerButton,
  mode = 'create',
}: DepartmentFormDialogProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: department
      ? { ...department, openRoles: department.openRoles.join(', ') }
      : {
          name: '',
          hiringContact: '',
          email: '',
          phone: '',
          openRoles: '',
        },
  });

  React.useEffect(() => {
    if (department && open) {
      form.reset({ ...department, openRoles: department.openRoles.join(', ') });
    } else if (!department && open) {
      form.reset({
        name: '',
        hiringContact: '',
        email: '',
        phone: '',
        openRoles: '',
      });
    }
  }, [department, open, form]);

  const onSubmit = (data: DepartmentFormData) => {
    onSave(data, department?.id);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button variant={mode === 'create' ? 'default' : 'outline'} size={mode === 'create' ? 'default' : 'icon'}>
            {mode === 'create' ? <PlusCircle className="mr-2 h-4 w-4" /> : null}
            {mode === 'create' ? 'Add department' : <Edit className="h-4 w-4" />}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>{department ? 'Edit department' : 'Add department'}</DialogTitle>
          <DialogDescription>
            {department
              ? 'Update hiring contact and open roles for this department.'
              : 'Add a department or business unit you hire for.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Product & Engineering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hiringContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hiring manager / contact</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Jordan Kim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="hiring@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="openRoles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open roles (comma-separated)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="E.g., Senior Engineer, Product Designer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{department ? 'Save changes' : 'Add department'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
