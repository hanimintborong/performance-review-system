"use server";

import { revalidatePath } from "next/cache";

import { nextEmployeeIds } from "@/app/(system)/employees/nextEmployeeId";
import { getEmployees, saveEmployee, saveEmployees } from "@/data/queries";
import { getInitials } from "@/lib/initials";
import { renameSystemUserEmail, syncUserRole } from "@/lib/userRoles";
import type { Employee } from "@/types/employee";
import type { SystemRole } from "@/types/role";

export type NewEmployeeInput = {
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  managerEmail: string;
  systemRole: SystemRole;
};

async function buildEmployees(inputs: NewEmployeeInput[]): Promise<Employee[]> {
  const existing = await getEmployees();
  const ids = nextEmployeeIds(existing, inputs.length);
  const now = Date.now();

  const created: Employee[] = inputs.map((input, i) => ({
    employeeId: ids[i],
    name: input.name,
    email: input.email.trim().toLowerCase(),
    department: input.department,
    jobTitle: input.jobTitle,
    managerId: null,
    managerName: null,
    systemRole: input.systemRole,
    employmentStatus: "active",
    initials: getInitials(input.name),
    createdAt: new Date(now + i).toISOString(),
  }));

  const byEmail = new Map([...existing, ...created].map((e) => [e.email.toLowerCase(), e]));
  created.forEach((employee, i) => {
    const manager = byEmail.get(inputs[i].managerEmail.trim().toLowerCase());
    employee.managerId = manager?.employeeId ?? null;
    employee.managerName = manager?.name ?? null;
  });

  return created;
}

export async function createEmployeeAction(input: NewEmployeeInput): Promise<Employee> {
  const [employee] = await buildEmployees([input]);
  await saveEmployees([employee]);
  revalidatePath("/employees");
  revalidatePath("/roles-access");

  return employee;
}

export async function importEmployeesAction(inputs: NewEmployeeInput[]): Promise<number> {
  const employees = await buildEmployees(inputs);
  await saveEmployees(employees);
  revalidatePath("/employees");
  revalidatePath("/roles-access");

  return employees.length;
}

export async function updateEmployeeAction(employeeId: string, input: NewEmployeeInput): Promise<Employee> {
  const existing = await getEmployees();
  const current = existing.find((e) => e.employeeId === employeeId);
  if (!current) throw new Error("Employee not found");

  const email = input.email.trim().toLowerCase();
  const byEmail = new Map(
    existing.filter((e) => e.employeeId !== employeeId).map((e) => [e.email.toLowerCase(), e]),
  );
  const manager = byEmail.get(input.managerEmail.trim().toLowerCase());

  const updated: Employee = {
    ...current,
    name: input.name,
    email,
    department: input.department,
    jobTitle: input.jobTitle,
    managerId: manager?.employeeId ?? null,
    managerName: manager?.name ?? null,
    systemRole: input.systemRole,
    initials: getInitials(input.name),
  };

  await saveEmployee(updated);
  if (email !== current.email.toLowerCase()) {
    await renameSystemUserEmail(current.email, email);
  }
  await syncUserRole(email, input.systemRole);

  revalidatePath("/employees");
  revalidatePath("/roles-access");

  return updated;
}
