import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import type { Employee } from "@/types/employee";

export async function getEmployees(): Promise<Employee[]> {
  const snapshot = await getDb().collection("employees").get();
  return snapshot.docs.map((doc) => doc.data() as Employee);
}

export async function getEmployeeById(employeeId: string): Promise<Employee | undefined> {
  const doc = await getDb().collection("employees").doc(employeeId).get();
  return doc.exists ? (doc.data() as Employee) : undefined;
}

export async function saveEmployee(employee: Employee): Promise<void> {
  await getDb().collection("employees").doc(employee.employeeId).set(employee);
}

export async function saveEmployees(employees: Employee[]): Promise<void> {
  const db = getDb();
  const batch = db.batch();
  employees.forEach((employee) => batch.set(db.collection("employees").doc(employee.employeeId), employee));
  await batch.commit();
}
