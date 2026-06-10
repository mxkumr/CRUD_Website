"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusCircle, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Task, SystemUser, PanelAssigneeFilter } from "@/types";
import { TaskFormSchema, type TaskFormData } from "@/lib/schemas";
import { taskStatuses, taskTypes, taskImportances, getAssignableUsers } from "@/types";
import React, { useEffect, useState } from "react";

interface TaskFormDialogProps {
  task?: Task;
  onSave: (data: TaskFormData, id?: string) => void;
  triggerButton?: React.ReactNode;
  mode?: "create" | "edit";
  panelType?: PanelAssigneeFilter;
}

export function TaskFormDialog({ task, onSave, triggerButton, mode = "create", panelType }: TaskFormDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [assignableUsers, setAssignableUsers] = useState<SystemUser[]>([]);

  const defaultTypeForPanel = () => {
    if (panelType === "recruiter") return "sourcing";
    if (panelType === "hiring_manager") return "interview";
    return "meeting";
  };

  useEffect(() => {
    if (open) {
      setAssignableUsers(getAssignableUsers(panelType));
    }
  }, [open, panelType]);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: task
      ? { ...task, assignedToId: task.assignedToId || "unassigned" }
      : {
          title: "",
          description: "",
          status: "pending",
          type: defaultTypeForPanel(),
          deadline: format(new Date(), "yyyy-MM-dd"),
          importance: "medium",
          assignedToId: "unassigned",
        },
  });

  React.useEffect(() => {
    if (open) {
      if (task) {
        form.reset({ ...task, assignedToId: task.assignedToId || "unassigned" });
      } else {
        form.reset({
          title: "",
          description: "",
          status: "pending",
          type: defaultTypeForPanel(),
          deadline: format(new Date(), "yyyy-MM-dd"),
          importance: "medium",
          assignedToId: "unassigned",
        });
      }
    }
  }, [task, open, form, panelType]);

  const onSubmit = (data: TaskFormData) => {
    const dataToSave = {
      ...data,
      assignedToId: data.assignedToId === "unassigned" ? undefined : data.assignedToId,
    };
    onSave(dataToSave, task?.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button variant={mode === "create" ? "default" : "outline"} size={mode === "create" ? "default" : "icon"}>
            {mode === "create" ? <PlusCircle className="mr-2 h-4 w-4" /> : null}
            {mode === "create" ? "Add task" : <Edit className="h-4 w-4" />}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "New recruiting task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update this task." : "Track sourcing, interviews, offers, and onboarding steps."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Phone screen — Data Analyst" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Candidate, role, and next steps..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assignedToId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || "unassigned"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Team member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {assignableUsers.length === 0 && (
                          <SelectItem value="loading" disabled>
                            Loading…
                          </SelectItem>
                        )}
                        {assignableUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.desiredRole.replace("_", " ")})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taskStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taskTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="importance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Importance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taskImportances.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due date</FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                          setCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{task ? "Save" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
