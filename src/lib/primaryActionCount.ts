import type { ReviewRow } from "@/data/queries";
import type { SystemRole } from "@/types/role";

const PENDING_EMPLOYEE_STATUSES = ["Not Started", "Self-Assessment"];

export function computePrimaryActionCount(role: SystemRole, employeeId: string, rows: ReviewRow[]): number {
  if (role === "hr") return rows.filter((r) => r.status === "Not Started" && r.planStatus === "Active").length;
  if (role === "manager") return rows.filter((r) => r.managerId === employeeId && r.status === "Employee Submitted").length;
  if (role === "employee") return rows.filter((r) => r.employee.employeeId === employeeId && PENDING_EMPLOYEE_STATUSES.includes(r.status)).length;
  return 0;
}
