import "server-only";

import { NOTIFICATION_TYPE_LABELS } from "@/constants/notificationTypes";
import { getReviewResponse } from "@/data/queries";
import type { Employee } from "@/types/employee";
import { notify } from "@/lib/notify";
import { parseWhenToSend } from "@/lib/parseWhenToSend";
import { resolveTargetDate } from "@/lib/resolveTargetDate";
import { shouldSendToday } from "@/lib/scheduleDecision";
import { resolveRuleRecipients } from "@/lib/scheduleRecipients";
import type { NotificationRule } from "@/types/notification";
import type { ReviewAssignment, ReviewPlan } from "@/types/review";

export async function processScheduledAssignment(
  assignment: ReviewAssignment,
  plan: ReviewPlan,
  rule: NotificationRule,
  today: string,
  employees: Employee[],
): Promise<number> {
  const timing = parseWhenToSend(rule.whenToSend);
  if (!timing || timing.kind === "launch") return 0;

  const needsSubmission = timing.kind === "relative" && timing.reference === "Employee submission";
  const response = needsSubmission ? await getReviewResponse(assignment.assignmentId) : null;

  const targetDate = resolveTargetDate(timing, plan, assignment, response?.employeeSubmittedAt ?? null);
  if (!targetDate || !shouldSendToday(targetDate, today, rule.repeat)) return 0;

  const recipients = resolveRuleRecipients(rule.sendTo, assignment, employees);
  await Promise.all(recipients.map((r) => notify({
    ...r,
    type: rule.type,
    title: NOTIFICATION_TYPE_LABELS[rule.type],
    message: `Scheduled reminder: ${rule.whenToSend}`,
    assignmentId: assignment.assignmentId,
    dedupeKey: today,
  })));

  return recipients.length;
}
