"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getReviewAssignmentById, getReviewPlanById, getReviewResponse, getReviewTemplateById, saveReviewAssignment, saveReviewResponse } from "@/data/queries";
import { notify } from "@/lib/notify";
import { computeScore } from "@/lib/reviewScoring";
import { findOkrWeightageIssues } from "@/lib/reviewValidation";
import { mergeAnswers } from "@/types/reviewResponse";

async function persist(assignmentId: string, answers: Record<string, string>, comment: string, submit: boolean) {
  const [assignment, response] = await Promise.all([getReviewAssignmentById(assignmentId), getReviewResponse(assignmentId)]);
  if (!assignment) return;

  let template;
  if (submit) {
    const plan = await getReviewPlanById(assignment.planId);
    template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
    if (template && findOkrWeightageIssues(template.sections, answers).length > 0) {
      throw new Error("Objective weightage must total the required budget before submitting.");
    }
  }

  const mergedAnswers = mergeAnswers(response.answers, answers);
  await saveReviewResponse({
    ...response,
    answers: mergedAnswers,
    employeeComment: comment,
    employeeSubmittedAt: submit ? new Date().toISOString() : response.employeeSubmittedAt,
  });

  if (submit) {
    const score = template ? computeScore(template.sections, mergedAnswers, "employee") : null;
    await saveReviewAssignment({ ...assignment, employeeScore: score, status: "Employee Submitted" });

    const [employee, manager] = await Promise.all([getEmployeeById(assignment.employeeId), getEmployeeById(assignment.managerId)]);
    if (manager) {
      await notify({
        recipientId: manager.employeeId,
        recipientName: manager.name,
        type: "pending_manager_review",
        title: `${employee?.name ?? "An employee"} submitted their self-assessment`,
        message: "Ready for your evaluation.",
        assignmentId,
      });
    }
  } else if (assignment.status === "Not Started") {
    await saveReviewAssignment({ ...assignment, status: "Self-Assessment" });
  }

  revalidatePath("/employee/reviews");
  revalidatePath("/employee/evaluation");
  revalidatePath(`/employee/evaluation/${assignmentId}`);
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
  revalidatePath("/manager/notifications");
}

export async function saveSelfAssessmentDraftAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, false);
}

export async function submitSelfAssessmentAction(assignmentId: string, answers: Record<string, string>, comment: string) {
  await persist(assignmentId, answers, comment, true);
}
