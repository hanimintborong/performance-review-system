"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getEmployees, getReviewAssignmentById, getReviewAssignments, getReviewPlanById, saveReviewAssignment } from "@/data/queries";
import { notify, notifyMany } from "@/lib/notify";
import type { FinalOutcome } from "@/types/review";

async function notifyIfCycleCompleted(planId: string, planTitle: string) {
  const assignments = await getReviewAssignments();
  const planAssignments = assignments.filter((a) => a.planId === planId);
  const allDone = planAssignments.length > 0 && planAssignments.every((a) => a.status === "Finalised");
  if (!allDone) return;

  const employees = await getEmployees();
  const recipients = employees
    .filter((e) => e.systemRole === "topManagement" || e.systemRole === "hr")
    .map((e) => ({ recipientId: e.employeeId, recipientName: e.name }));

  await notifyMany(recipients, {
    type: "cycle_completed",
    title: `${planTitle} is fully finalised`,
    message: `All ${planAssignments.length} reviews in this cycle have been finalised.`,
    assignmentId: null,
  });
}

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

  const [employee, manager, plan] = await Promise.all([
    getEmployeeById(assignment.employeeId),
    getEmployeeById(assignment.managerId),
    getReviewPlanById(assignment.planId),
  ]);

  if (employee) {
    await notify({
      recipientId: employee.employeeId,
      recipientName: employee.name,
      type: "review_finalised",
      title: "Your review has been finalised",
      message: `${plan?.title ?? "Your review"} outcome: ${finalOutcome}`,
      assignmentId,
    });
  }

  if (manager) {
    await notify({
      recipientId: manager.employeeId,
      recipientName: manager.name,
      type: "review_finalised",
      title: `${employee?.name ?? "An employee"}'s review has been finalised`,
      message: `Outcome: ${finalOutcome}`,
      assignmentId,
    });
  }

  await notifyIfCycleCompleted(assignment.planId, plan?.title ?? "Review cycle");

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
