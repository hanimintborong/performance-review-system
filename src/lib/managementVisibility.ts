import type { ReviewRow } from "@/data/queries";
import type { Employee } from "@/types/employee";

export function isVisibleToTopManagement(row: ReviewRow, employees: Employee[], topManagementId: string): boolean {
  if (row.managerId === topManagementId) return true;

  const directManager = employees.find((e) => e.employeeId === row.managerId);
  return directManager?.managerId === topManagementId;
}
