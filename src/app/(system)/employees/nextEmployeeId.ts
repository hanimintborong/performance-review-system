import type { Employee } from "@/types/employee";

export function nextEmployeeIds(existing: Employee[], count: number): string[] {
  const maxNum = existing.reduce((max, e) => {
    const num = parseInt(e.employeeId.replace(/\D/g, ""), 10);
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 0);

  return Array.from({ length: count }, (_, i) => `EMP${String(maxNum + i + 1).padStart(3, "0")}`);
}
