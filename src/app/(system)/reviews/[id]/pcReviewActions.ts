"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getReviewAssignmentById, saveReviewAssignment } from "@/data/queries";
import { notify } from "@/lib/notify";

function revalidateReviewPaths(assignmentId: string) {
  revalidatePath("/reviews");
  revalidatePath(`/reviews/${assignmentId}`);
  revalidatePath("/management/reviews");
  revalidatePath(`/management/reviews/${assignmentId}`);
  revalidatePath("/dashboard");
}

export async function startPcReviewAction(assignmentId: string): Promise<void> {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment || assignment.status !== "Manager Submitted") return;

  await saveReviewAssignment({ ...assignment, status: "P&C Review" });
  revalidateReviewPaths(assignmentId);
}

export async function sendToManagementAction(assignmentId: string): Promise<void> {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment || assignment.status !== "P&C Review") return;

  await saveReviewAssignment({ ...assignment, status: "Management Review" });

  const manager = await getEmployeeById(assignment.managerId);
  const employee = await getEmployeeById(assignment.employeeId);
  const topManagement = manager?.managerId ? await getEmployeeById(manager.managerId) : undefined;

  if (topManagement) {
    await notify({
      recipientId: topManagement.employeeId,
      recipientName: topManagement.name,
      type: "ready_for_management",
      title: `${employee?.name ?? "A review"} is ready for finalisation`,
      message: `Evaluated by ${manager?.name ?? "the manager"}, compiled by People & Culture.`,
      assignmentId,
    });
  }

  revalidateReviewPaths(assignmentId);
  revalidatePath("/management/notifications");
}
