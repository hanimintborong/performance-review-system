import type { SystemRole } from "@/types/role";

export type EmploymentStatus = "active" | "inactive";

export type Employee = {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  managerId: string | null;
  managerName: string | null;
  systemRole: SystemRole;
  employmentStatus: EmploymentStatus;
  initials: string;
  createdAt: string;
};
