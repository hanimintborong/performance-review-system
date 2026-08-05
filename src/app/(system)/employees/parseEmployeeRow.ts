import { DEPARTMENTS } from "@/constants/departments";
import type { NewEmployeeInput } from "@/app/(system)/employees/actions";
import type { SystemRole } from "@/types/role";

const VALID_ROLES: SystemRole[] = ["employee", "manager", "hr", "topManagement"];

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/[\s_-]/g, "");
}

export function parseEmployeeRow(row: Record<string, string>): NewEmployeeInput | null {
  const byKey = new Map(Object.entries(row).map(([k, v]) => [normalizeKey(k), (v ?? "").trim()]));
  const name = byKey.get("name") ?? "";
  const email = byKey.get("email") ?? "";
  if (!name || !email) return null;

  const department = byKey.get("department") ?? "";
  const role = byKey.get("systemrole") ?? "";

  return {
    name,
    email,
    department: DEPARTMENTS.includes(department) ? department : DEPARTMENTS[0],
    jobTitle: byKey.get("jobtitle") ?? "",
    managerEmail: byKey.get("manageremail") ?? "",
    systemRole: VALID_ROLES.includes(role as SystemRole) ? (role as SystemRole) : "employee",
  };
}
