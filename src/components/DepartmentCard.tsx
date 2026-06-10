'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DepartmentFormDialog } from '@/components/DepartmentFormDialog';
import type { Department } from '@/types';
import type { DepartmentFormData } from '@/lib/schemas';
import { Edit, Mail, MoreVertical, Phone, Trash2, Briefcase, Building2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface DepartmentCardProps {
  department: Department;
  onUpdateDepartment: (data: DepartmentFormData, id?: string) => void;
  onDeleteDepartment: (id: string) => void;
}

export function DepartmentCard({ department, onUpdateDepartment, onDeleteDepartment }: DepartmentCardProps) {
  return (
    <Card className="w-full shadow-lg bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Building2 className="mr-2 h-6 w-6 text-primary" />
            {department.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DepartmentFormDialog
                department={department}
                onSave={(data, id) => onUpdateDepartment(data, id ?? department.id)}
                mode="edit"
                triggerButton={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteDepartment(department.id)}
                className="text-destructive focus:text-destructive-foreground focus:bg-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-sm text-muted-foreground pt-1">
          Hiring contact: {department.hiringContact}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 space-y-2 text-sm">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-primary" />
          <a href={`mailto:${department.email}`} className="hover:underline">
            {department.email}
          </a>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-primary" />
          <a href={`tel:${department.phone}`} className="hover:underline">
            {department.phone}
          </a>
        </div>
        {department.openRoles.length > 0 && (
          <div className="flex items-start pt-1">
            <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <span className="font-medium">Open roles:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {department.openRoles.map((role, index) => (
                  <Badge key={index} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">Added: {format(parseISO(department.createdAt), 'MMM dd, yyyy')}</p>
      </CardFooter>
    </Card>
  );
}
