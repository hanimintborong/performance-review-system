import "server-only";

import { cache } from "react";
import { eq, inArray } from "drizzle-orm";

import { getEmployeeById, getEmployees } from "@/data/employees";
import { getReviewPlanById, getReviewPlans } from "@/data/reviewPlans";
import { reviewAssignments as reviewAssignmentsTable, reviewResponses as reviewResponsesTable } from "@/db/schema";
import { db } from "@/lib/db";
import type { Employee } from "@/types/employee";
import type { FinalOutcome, ReviewAssignment, ReviewStatus } from "@/types/review";

export const getReviewAssignments = cache(async (): Promise<ReviewAssignment[]> => {
  return db.select().from(reviewAssignmentsTable);
});

export async function saveReviewAssignment(assignment: ReviewAssignment): Promise<void> {
  await db.insert(reviewAssignmentsTable).values(assignment).onConflictDoUpdate({
    target: reviewAssignmentsTable.assignmentId,
    set: assignment,
  });
}

export async function deleteReviewAssignmentsByPlan(planId: string): Promise<void> {
  const toDelete = await db
    .select({ assignmentId: reviewAssignmentsTable.assignmentId })
    .from(reviewAssignmentsTable)
    .where(eq(reviewAssignmentsTable.planId, planId));

  if (toDelete.length > 0) {
    await db.delete(reviewResponsesTable).where(inArray(reviewResponsesTable.assignmentId, toDelete.map((r) => r.assignmentId)));
  }

  await db.delete(reviewAssignmentsTable).where(eq(reviewAssignmentsTable.planId, planId));
}

export const getReviewAssignmentById = cache(async (assignmentId: string): Promise<ReviewAssignment | undefined> => {
  const [record] = await db
    .select()
    .from(reviewAssignmentsTable)
    .where(eq(reviewAssignmentsTable.assignmentId, assignmentId))
    .limit(1);
  return record ?? undefined;
});

export type ReviewRow = {
  assignmentId: string;
  planId: string;
  employee: Employee;
  managerId: string;
  managerName: string;
  planTitle: string;
  deadline: string;
  status: ReviewStatus;
  employeeScore: number | null;
  managerScore: number | null;
  acknowledged: boolean;
  finalOutcome: FinalOutcome | null;
  finalOutcomeNotes: string | null;
  finalizedAt: string | null;
};

const OPEN_STATUSES: ReviewStatus[] = ["Not Started", "Self-Assessment", "Employee Submitted", "Manager Reviewing", "Manager Submitted"];

function effectiveStatus(status: ReviewStatus, deadline: string, today: string): ReviewStatus {
  if (OPEN_STATUSES.includes(status) && deadline < today) return "Overdue";
  return status;
}

function toReviewRow(
  assignment: ReviewAssignment,
  employee: Employee,
  manager: Employee,
  planTitle: string,
  today: string,
): ReviewRow {
  return {
    assignmentId: assignment.assignmentId,
    planId: assignment.planId,
    employee,
    managerId: assignment.managerId,
    managerName: manager.name,
    planTitle,
    deadline: assignment.deadline,
    status: effectiveStatus(assignment.status, assignment.deadline, today),
    employeeScore: assignment.employeeScore,
    managerScore: assignment.managerScore,
    acknowledged: assignment.acknowledged,
    finalOutcome: assignment.finalOutcome ?? null,
    finalOutcomeNotes: assignment.finalOutcomeNotes ?? null,
    finalizedAt: assignment.finalizedAt ?? null,
  };
}

export const getReviewRows = cache(async (): Promise<ReviewRow[]> => {
  const [assignments, employees, plans] = await Promise.all([
    getReviewAssignments(),
    getEmployees(),
    getReviewPlans(),
  ]);

  const employeeById = new Map(employees.map((employee) => [employee.employeeId, employee]));
  const planById = new Map(plans.map((plan) => [plan.planId, plan]));
  const today = new Date().toISOString().slice(0, 10);

  return assignments
    .map((assignment) => {
      const employee = employeeById.get(assignment.employeeId);
      const manager = employeeById.get(assignment.managerId);
      const plan = planById.get(assignment.planId);
      if (!employee || !manager || !plan) return null;

      return toReviewRow(assignment, employee, manager, plan.title, today);
    })
    .filter((row): row is ReviewRow => row !== null);
});

export const getReviewRowById = cache(async (assignmentId: string): Promise<ReviewRow | undefined> => {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment) return undefined;

  const [employee, manager, plan] = await Promise.all([
    getEmployeeById(assignment.employeeId),
    getEmployeeById(assignment.managerId),
    getReviewPlanById(assignment.planId),
  ]);
  if (!employee || !manager || !plan) return undefined;

  return toReviewRow(assignment, employee, manager, plan.title, new Date().toISOString().slice(0, 10));
});
