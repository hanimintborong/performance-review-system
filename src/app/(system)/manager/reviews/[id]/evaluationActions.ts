"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getReviewAssignmentById, getReviewPlanById, getReviewResponse, getReviewTemplateById, saveReviewAssignment, saveReviewResponse } from "@/data/queries";
import { notify, notifyMany } from "@/lib/notify";
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
        message: "It will now be reviewed by People & Culture.",
        assignmentId,
      });
    }

    const discussionRecipients = [employee, manager]
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ recipientId: p.employeeId, recipientName: p.name }));

    if (discussionRecipients.length > 0) {
      await notifyMany(discussionRecipients, {
        type: "discussion_required",
        title: "Discuss the evaluation results",
        message: "Schedule a performance discussion outside the system before People & Culture review. This is informational only, not a blocking step.",
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
