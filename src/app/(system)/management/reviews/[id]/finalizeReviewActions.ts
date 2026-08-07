"use server";

import { revalidatePath } from "next/cache";

import { getReviewAssignmentById, saveReviewAssignment } from "@/data/queries";
import type { FinalOutcome } from "@/types/review";

export async function finalizeReviewAction(assignmentId: string, finalOutcome: FinalOutcome, notes: string) {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment) return;

  await saveReviewAssignment({
    ...assignment,
    status: "Finalised",
    finalOutcome,
    finalOutcomeNotes: notes,
    finalizedAt: new Date().toISOString(),
  });

  revalidatePath("/management/reviews");
  revalidatePath(`/management/reviews/${assignmentId}`);
  revalidatePath("/reviews");
  revalidatePath(`/reviews/${assignmentId}`);
  revalidatePath("/dashboard");
  revalidatePath("/employee/reviews");
  revalidatePath(`/employee/reviews/${assignmentId}`);
  revalidatePath("/manager/team");
  revalidatePath("/manager/review-progress");
}
