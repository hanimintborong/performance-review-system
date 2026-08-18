"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getReviewAssignmentById, getReviewPlanById, saveReviewAssignment } from "@/data/queries";
import { notify } from "@/lib/notify";
import type { FinalOutcome } from "@/types/review";

export async function finalizeReviewAction(
  assignmentId: string,
  finalOutcome: FinalOutcome,
  notes: string,
  incrementPercentage: number | null = null,
  incrementEffectiveDate: string | null = null,
) {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment) return;

  await saveReviewAssignment({
    ...assignment,
    status: "Finalised",
    finalOutcome,
    finalOutcomeNotes: notes,
    incrementPercentage: finalOutcome === "Increment" ? incrementPercentage : null,
    incrementEffectiveDate: finalOutcome === "Increment" ? incrementEffectiveDate : null,
    finalizedAt: new Date().toISOString(),
  });

  const [employee, plan] = await Promise.all([
    getEmployeeById(assignment.employeeId),
    getReviewPlanById(assignment.planId),
  ]);

  const outcomeSummary = finalOutcome === "Increment" && incrementPercentage
    ? `Increment (${incrementPercentage}% effective ${incrementEffectiveDate ?? "TBC"})`
    : finalOutcome;

  if (employee) {
    await notify({
      recipientId: employee.employeeId,
      recipientName: employee.name,
      type: "review_finalised",
      title: "Your review has been finalised",
      message: `${plan?.title ?? "Your review"} outcome: ${outcomeSummary}`,
      assignmentId,
    });
  }

  revalidatePath("/management/reviews");
  revalidatePath(`/management/reviews/${assignmentId}`);
  revalidatePath("/reviews");
  revalidatePath(`/reviews/${assignmentId}`);
  revalidatePath("/dashboard");
  revalidatePath("/employee/reviews");
  revalidatePath(`/employee/reviews/${assignmentId}`);
  revalidatePath("/manager/team");
  revalidatePath("/manager/review-progress");
  revalidatePath("/employee/notifications");
  revalidatePath("/manager/notifications");
  revalidatePath("/management/notifications");
  revalidatePath("/notifications");
}
