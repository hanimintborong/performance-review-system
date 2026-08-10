import type { ParsedTiming } from "@/lib/parseWhenToSend";
import type { ReviewAssignment, ReviewPlan } from "@/types/review";

function referenceDate(reference: string, plan: ReviewPlan, assignment: ReviewAssignment, employeeSubmittedAt: string | null): string | null {
  if (reference === "Employee deadline") return plan.employeeDeadline;
  if (reference === "Manager deadline") return plan.managerDeadline;
  if (reference === "Employee submission") return employeeSubmittedAt?.slice(0, 10) ?? null;
  if (reference === "Finalisation") return assignment.finalizedAt?.slice(0, 10) ?? null;
  return null;
}

export function resolveTargetDate(
  timing: ParsedTiming,
  plan: ReviewPlan,
  assignment: ReviewAssignment,
  employeeSubmittedAt: string | null,
): string | null {
  if (timing.kind === "date") return timing.date;
  if (timing.kind === "launch") return null;

  const refDate = referenceDate(timing.reference, plan, assignment, employeeSubmittedAt);
  if (!refDate) return null;

  const offsetMs = (timing.direction === "before" ? -1 : 1) * timing.days * 86400000;
  return new Date(new Date(refDate).getTime() + offsetMs).toISOString().slice(0, 10);
}
