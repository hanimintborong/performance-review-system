import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import type { Employee } from "@/types/employee";

const COLLECTION = "employees";

export const getEmployees = cache(
  async (): Promise<Employee[]> => {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .get();

    return snapshot.docs.map(
      (doc) => doc.data() as Employee,
    );
  },
);

export const getEmployeeById = cache(
  async (
    employeeId: string,
  ): Promise<Employee | undefined> => {
    const document = await getDb()
      .collection(COLLECTION)
      .doc(employeeId)
      .get();

    return document.exists
      ? (document.data() as Employee)
      : undefined;
  },
);

export async function saveEmployee(
  employee: Employee,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(employee.employeeId)
    .set(employee);
}

export async function saveEmployees(
  employees: Employee[],
): Promise<void> {
  const db = getDb();
  const batch = db.batch();

  employees.forEach((employee) => {
    batch.set(
      db.collection(COLLECTION).doc(employee.employeeId),
      employee,
    );
  });

  await batch.commit();
}