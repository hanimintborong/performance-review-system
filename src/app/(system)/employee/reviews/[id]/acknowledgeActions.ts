"use server";

import { revalidatePath } from "next/cache";

import { getReviewAssignmentById, saveReviewAssignment } from "@/data/queries";

export async function acknowledgeReviewAction(assignmentId: string) {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment) return;

  await saveReviewAssignment({ ...assignment, acknowledged: true });

  revalidatePath("/employee/reviews");
  revalidatePath(`/employee/reviews/${assignmentId}`);
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}
