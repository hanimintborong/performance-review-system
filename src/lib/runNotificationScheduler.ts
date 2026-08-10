import "server-only";

import { getEmployees, getNotificationRules, getReviewAssignments, getReviewPlans } from "@/data/queries";
import { processScheduledAssignment } from "@/lib/processScheduledAssignment";

export async function runNotificationScheduler(): Promise<{ sent: number; checked: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const [rules, plans, assignments, employees] = await Promise.all([
    getNotificationRules(),
    getReviewPlans(),
    getReviewAssignments(),
    getEmployees(),
  ]);

  const planById = new Map(plans.map((p) => [p.planId, p]));
  let sent = 0;
  let checked = 0;

  for (const rule of rules.filter((r) => r.status === "Active")) {
    const plan = planById.get(rule.planId);
    if (!plan) continue;

    const openAssignments = assignments.filter((a) => a.planId === rule.planId && a.status !== "Finalised");
    for (const assignment of openAssignments) {
      checked += 1;
      sent += await processScheduledAssignment(assignment, plan, rule, today, employees);
    }
  }

  return { sent, checked };
}
