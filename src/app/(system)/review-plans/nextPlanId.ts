function maxPlanNumber(ids: string[]): number {
  return ids.reduce((max, id) => {
    const num = parseInt(id.replace(/\D/g, ""), 10);
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 0);
}

// Considers both existing plans and any assignment planIds (including orphans left behind by a
// deleted plan) so a reused/deleted ID number is never handed out again to a new plan.
export function nextPlanId(planIds: string[], assignmentPlanIds: string[]): string {
  const maxNum = Math.max(maxPlanNumber(planIds), maxPlanNumber(assignmentPlanIds));
  return `PLAN${String(maxNum + 1).padStart(3, "0")}`;
}
