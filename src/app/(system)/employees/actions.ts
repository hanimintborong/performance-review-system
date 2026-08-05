"use server";

import { revalidatePath } from "next/cache";

import { nextEmployeeIds } from "@/app/(system)/employees/nextEmployeeId";
import { getEmployees, saveEmployees } from "@/data/queries";
import { getInitials } from "@/lib/initials";
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
