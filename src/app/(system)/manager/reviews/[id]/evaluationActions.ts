"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getReviewAssignmentById, getReviewPlanById, getReviewResponse, getReviewTemplateById, saveReviewAssignment, saveReviewResponse } from "@/data/queries";
import { notify } from "@/lib/notify";
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

    const [employee, manager] = await Promise.all([getEmployeeById(assignment.employeeId), getEmployeeById(assignment.managerId)]);

    if (employee) {
      await notify({
        recipientId: employee.employeeId,
        recipientName: employee.name,
        type: "manager_submitted",
        title: "Your manager has completed your evaluation",
        message: "Awaiting finalisation.",
        assignmentId,
      });
    }

    if (manager?.managerId) {
      const topManagement = await getEmployeeById(manager.managerId);
      if (topManagement) {
        await notify({
          recipientId: topManagement.employeeId,
          recipientName: topManagement.name,
          type: "ready_for_management",
          title: `${employee?.name ?? "A review"} is ready for finalisation`,
          message: `Evaluated by ${manager.name}.`,
          assignmentId,
        });
      }
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
