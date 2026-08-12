import "server-only";

import { cache } from "react";
import { eq } from "drizzle-orm";

import { getEmployees } from "@/data/employees";
import { wfhRequests } from "@/db/schema";
import { db } from "@/lib/db";
import type { Employee } from "@/types/employee";
import type { WfhRequest } from "@/types/wfh";

export const getWfhRequests = cache(async (): Promise<WfhRequest[]> => {
  return db.select().from(wfhRequests);
});

export const getWfhRequestById = cache(async (requestId: string): Promise<WfhRequest | undefined> => {
  const [record] = await db.select().from(wfhRequests).where(eq(wfhRequests.requestId, requestId)).limit(1);
  return record ?? undefined;
});

export async function saveWfhRequest(request: WfhRequest): Promise<void> {
  await db.insert(wfhRequests).values(request).onConflictDoUpdate({
    target: wfhRequests.requestId,
    set: request,
  });
}

export type WfhRequestRow = WfhRequest & { employee: Employee; approverName: string };

export const getWfhRequestRows = cache(async (): Promise<WfhRequestRow[]> => {
  const [requests, employees] = await Promise.all([getWfhRequests(), getEmployees()]);
  const employeeById = new Map(employees.map((e) => [e.employeeId, e]));

  return requests
    .map((request) => {
      const employee = employeeById.get(request.employeeId);
      if (!employee) return null;
      return { ...request, employee, approverName: employeeById.get(request.approverId)?.name ?? "—" };
    })
    .filter((row): row is WfhRequestRow => row !== null)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
});
