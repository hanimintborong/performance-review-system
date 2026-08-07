import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import { getEmployeeById, getEmployees } from "@/data/employees";
import { getReviewPlanById, getReviewPlans } from "@/data/reviewPlans";
import type { Employee } from "@/types/employee";
import type { FinalOutcome, ReviewAssignment, ReviewStatus } from "@/types/review";

const COLLECTION = "reviewAssignments";

export const getReviewAssignments = cache(
  async (): Promise<ReviewAssignment[]> => {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .get();

    return snapshot.docs.map(
      (doc) => doc.data() as ReviewAssignment,
    );
  },
);

export async function saveReviewAssignment(
  assignment: ReviewAssignment,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(assignment.assignmentId)
    .set(assignment);
}

export const getReviewAssignmentById = cache(
  async (
    assignmentId: string,
  ): Promise<ReviewAssignment | undefined> => {
    const document = await getDb()
      .collection(COLLECTION)
      .doc(assignmentId)
      .get();

    return document.exists
      ? (document.data() as ReviewAssignment)
      : undefined;
  },
);

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

export const getReviewRows = cache(
  async (): Promise<ReviewRow[]> => {
    const [assignments, employees, plans] = await Promise.all([
      getReviewAssignments(),
      getEmployees(),
      getReviewPlans(),
    ]);

    const employeeById = new Map(
      employees.map((employee) => [
        employee.employeeId,
        employee,
      ]),
    );

    const planById = new Map(
      plans.map((plan) => [
        plan.planId,
        plan,
      ]),
    );

    return assignments
      .map((assignment) => {
        const employee = employeeById.get(
          assignment.employeeId,
        );

        const manager = employeeById.get(
          assignment.managerId,
        );

        const plan = planById.get(
          assignment.planId,
        );

        if (!employee || !manager || !plan) {
          return null;
        }

        return {
          assignmentId: assignment.assignmentId,
          planId: assignment.planId,
          employee,
          managerId: assignment.managerId,
          managerName: manager.name,
          planTitle: plan.title,
          deadline: assignment.deadline,
          status: assignment.status,
          employeeScore: assignment.employeeScore,
          managerScore: assignment.managerScore,
          acknowledged: assignment.acknowledged,
          finalOutcome: assignment.finalOutcome ?? null,
          finalOutcomeNotes: assignment.finalOutcomeNotes ?? null,
          finalizedAt: assignment.finalizedAt ?? null,
        };
      })
      .filter(
        (row): row is ReviewRow => row !== null,
      );
  },
);

export const getReviewRowById = cache(
  async (
    assignmentId: string,
  ): Promise<ReviewRow | undefined> => {
    const assignment =
      await getReviewAssignmentById(assignmentId);

    if (!assignment) {
      return undefined;
    }

    const [employee, manager, plan] = await Promise.all([
      getEmployeeById(assignment.employeeId),
      getEmployeeById(assignment.managerId),
      getReviewPlanById(assignment.planId),
    ]);

    if (!employee || !manager || !plan) {
      return undefined;
    }

    return {
      assignmentId: assignment.assignmentId,
      planId: assignment.planId,
      employee,
      managerId: assignment.managerId,
      managerName: manager.name,
      planTitle: plan.title,
      deadline: assignment.deadline,
      status: assignment.status,
      employeeScore: assignment.employeeScore,
      managerScore: assignment.managerScore,
      acknowledged: assignment.acknowledged,
      finalOutcome: assignment.finalOutcome ?? null,
      finalOutcomeNotes: assignment.finalOutcomeNotes ?? null,
      finalizedAt: assignment.finalizedAt ?? null,
    };
  },
);