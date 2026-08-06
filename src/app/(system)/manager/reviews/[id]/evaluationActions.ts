"use server";

import { revalidatePath } from "next/cache";

import { getReviewAssignmentById, getReviewPlanById, getReviewResponse, getReviewTemplateById, saveReviewAssignment, saveReviewResponse } from "@/data/queries";
import { computeScore } from "@/lib/reviewScoring";
import { mergeAnswers } from "@/types/reviewResponse";

async function persist(assignmentId: string, answers: Record<string, string>, comment: string, submit: boolean) {
  const [assignment, response] = await Promise.all([getReviewAssignmentById(assignmentId), getReviewResponse(assignmentId)]);
  if (!assignment) return;

  const mergedAnswers = mergeAnswers(response.answers, answers);
  await saveReviewResponse({
    ...response,
    answers: mergedAnswers,
    managerComment: comment,
    managerSubmittedAt: submit ? new Date().toISOString() : response.managerSubmittedAt,
  });

  if (submit) {
    const plan = await getReviewPlanById(assignment.planId);
    const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
    const score = template ? computeScore(template.sections, mergedAnswers, "manager") : null;

    await saveReviewAssignment({ ...assignment, managerScore: score, status: "Manager Submitted" });
  } else if (assignment.status === "Employee Submitted") {
    await saveReviewAssignment({ ...assignment, status: "Manager Reviewing" });
  }

  revalidatePath("/manager/team");
  revalidatePath(`/manager/reviews/${assignmentId}`);
  revalidatePath("/manager/review-progress");
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
  revalidatePath("/employee/reviews");
}

export async function saveManagerDraftAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, false);
}

export async function submitManagerEvaluationAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, true);
}
