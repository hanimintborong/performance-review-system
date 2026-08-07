import "server-only";

import { getEmployees, getReviewAssignments, saveReviewAssignment } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

const ASSIGNABLE_ROLES = ["employee", "manager"];

export async function generateAssignmentsForPlan(plan: ReviewPlan): Promise<number> {
  const [employees, assignments] = await Promise.all([getEmployees(), getReviewAssignments()]);

  const alreadyAssigned = new Set(
    assignments.filter((a) => a.planId === plan.planId).map((a) => a.employeeId),
  );

  const eligible = employees.filter(
    (employee) =>
      employee.employmentStatus === "active" &&
      ASSIGNABLE_ROLES.includes(employee.systemRole) &&
      plan.departments.includes(employee.department) &&
      Boolean(employee.managerId) &&
      !alreadyAssigned.has(employee.employeeId),
  );

  await Promise.all(
    eligible.map((employee) =>
      saveReviewAssignment({
        assignmentId: `${plan.planId}-${employee.employeeId}`,
        planId: plan.planId,
        employeeId: employee.employeeId,
        managerId: employee.managerId as string,
        status: "Not Started",
        employeeScore: null,
        managerScore: null,
        deadline: plan.employeeDeadline,
        acknowledged: false,
        finalOutcome: null,
        finalOutcomeNotes: null,
        finalizedAt: null,
      }),
    ),
  );

  return eligible.length;
}
