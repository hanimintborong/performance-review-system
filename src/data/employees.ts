import "server-only";

import { cache } from "react";
import { desc, eq } from "drizzle-orm";

import { employees as employeesTable } from "@/db/schema";
import { db } from "@/lib/db";
import type { Employee } from "@/types/employee";

export const getEmployees = cache(async (): Promise<Employee[]> => {
  return db.select().from(employeesTable).orderBy(desc(employeesTable.createdAt));
});

export const getEmployeeById = cache(async (employeeId: string): Promise<Employee | undefined> => {
  const [record] = await db.select().from(employeesTable).where(eq(employeesTable.employeeId, employeeId)).limit(1);
  return record ?? undefined;
});

export async function saveEmployee(employee: Employee): Promise<void> {
  await db.insert(employeesTable).values(employee).onConflictDoUpdate({
    target: employeesTable.employeeId,
    set: employee,
  });
}

export async function saveEmployees(employeesList: Employee[]): Promise<void> {
  await Promise.all(employeesList.map(saveEmployee));
}
