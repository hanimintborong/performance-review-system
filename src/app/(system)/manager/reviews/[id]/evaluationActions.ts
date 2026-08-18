"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getEmployees, getReviewAssignmentById, getReviewPlanById, getReviewResponse, getReviewTemplateById, saveReviewAssignment, saveReviewResponse } from "@/data/queries";
import { notifyMany } from "@/lib/notify";
import { computeScore } from "@/lib/reviewScoring";
import { mergeAnswers } from "@/types/reviewResponse";

async function persist(assignmentId: string, answers: Record<string, string>, comment: string, submit: boolean) {
  const [assignment, response] = await Promise.all([getReviewAssignmentById(assignmentId), getReviewResponse(assignmentId)]);
  if (!assignment) return;

  const plan = await getReviewPlanById(assignment.planId);
  if (plan?.status === "Closed") {
    throw new Error("This review cycle is closed — no further edits are allowed.");
  }

  const mergedAnswers = mergeAnswers(response.answers, answers);
  await saveReviewResponse({
    ...response,
    answers: mergedAnswers,
    managerComment: comment,
    managerSubmittedAt: submit ? new Date().toISOString() : response.managerSubmittedAt,
  });

  if (submit) {
    const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
    const score = template ? computeScore(template.sections, mergedAnswers, "manager") : null;

    await saveReviewAssignment({ ...assignment, managerScore: score, status: "Manager Submitted" });

    const [employee, employees] = await Promise.all([getEmployeeById(assignment.employeeId), getEmployees()]);
    const recipients = employees
      .filter((e) => e.systemRole === "topManagement" || e.systemRole === "hr")
      .map((e) => ({ recipientId: e.employeeId, recipientName: e.name }));

    if (recipients.length > 0) {
      await notifyMany(recipients, {
        type: "ready_for_management",
        title: `${employee?.name ?? "A review"} is ready for finalisation`,
        message: "The manager has submitted their evaluation.",
        assignmentId,
      });
    }
  } else if (assignment.status === "Employee Submitted") {
    await saveReviewAssignment({ ...assignment, status: "Manager Reviewing" });
  }

  revalidatePath("/manager/team");
  revalidatePath(`/manager/reviews/${assignmentId}`);
  revalidatePath("/manager/review-progress");
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
  revalidatePath("/employee/reviews");
  revalidatePath("/employee/notifications");
  revalidatePath("/management/notifications");
}

export async function saveManagerDraftAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, false);
}

export async function submitManagerEvaluationAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, true);
}
