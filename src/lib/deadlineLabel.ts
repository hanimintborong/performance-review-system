import type { ReviewStatus } from "@/types/review";

export function deadlineLabel(deadline: string, status: ReviewStatus): string {
  if (status === "Finalised") return "";

  const diffDays = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return "Due today";
  return `${diffDays} days left`;
}
