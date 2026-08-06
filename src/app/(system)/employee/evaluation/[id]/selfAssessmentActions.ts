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
    employeeComment: comment,
    employeeSubmittedAt: submit ? new Date().toISOString() : response.employeeSubmittedAt,
  });

  if (submit) {
    const plan = await getReviewPlanById(assignment.planId);
    const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
    const score = template ? computeScore(template.sections, mergedAnswers, "employee") : null;

    await saveReviewAssignment({ ...assignment, employeeScore: score, status: "Employee Submitted" });
  } else if (assignment.status === "Not Started") {
    await saveReviewAssignment({ ...assignment, status: "Self-Assessment In Progress" });
  }

  revalidatePath("/employee/reviews");
  revalidatePath("/employee/evaluation");
  revalidatePath(`/employee/evaluation/${assignmentId}`);
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}

export async function saveSelfAssessmentDraftAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, false);
}

export async function submitSelfAssessmentAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, true);
}
