import type { SystemRole } from "@/types/role";

export type SystemUserStatus = "invited" | "active";

export type SystemUserRecord = {
  email: string;
  role: SystemRole;
  employeeId: string;
  status: SystemUserStatus;
  invitedAt: string;
};
