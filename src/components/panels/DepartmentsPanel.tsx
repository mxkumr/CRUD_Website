'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DepartmentCard } from '@/components/DepartmentCard';
import { DepartmentFormDialog } from '@/components/DepartmentFormDialog';
import type { Department } from '@/types';
import type { DepartmentFormData } from '@/lib/schemas';
import { mockDepartments } from '@/lib/constants';
import { PlusCircle, Search, Building2 } from 'lucide-react';

function parseOpenRoles(openRoles: string): string[] {
  return openRoles
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export function DepartmentsPanel() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (data: DepartmentFormData, id?: string) => {
    const openRoles = parseOpenRoles(data.openRoles);
    if (id) {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                name: data.name,
                hiringContact: data.hiringContact,
                email: data.email,
                phone: data.phone,
                openRoles,
              }
            : d
        )
      );
    } else {
      const newDept: Department = {
        id: `dept-${Date.now()}`,
        name: data.name,
        hiringContact: data.hiringContact,
        email: data.email,
        phone: data.phone,
        openRoles,
        createdAt: new Date().toISOString(),
      };
      setDepartments((prev) => [newDept, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  const filtered = departments
    .filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.hiringContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-foreground">Departments & open roles</h2>
        <DepartmentFormDialog onSave={handleSave} mode="create" />
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search departments..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <DepartmentCard
              key={d.id}
              department={d}
              onUpdateDepartment={handleSave}
              onDeleteDepartment={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No departments found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try another search or add a department.</p>
        </div>
      )}
    </div>
  );
}
