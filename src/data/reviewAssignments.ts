import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import { getEmployeeById, getEmployees } from "@/data/employees";
import { getReviewPlanById, getReviewPlans } from "@/data/reviewPlans";
import type { Employee } from "@/types/employee";
import type { ReviewAssignment, ReviewStatus } from "@/types/review";

const COLLECTION = "reviewAssignments";

export async function getReviewAssignments(): Promise<ReviewAssignment[]> {
  const snapshot = await getDb().collection(COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as ReviewAssignment);
}

export async function saveReviewAssignment(assignment: ReviewAssignment): Promise<void> {
  await getDb().collection(COLLECTION).doc(assignment.assignmentId).set(assignment);
}

export type ReviewRow = {
  assignmentId: string;
  planId: string;
  employee: Employee;
  managerName: string;
  planTitle: string;
  deadline: string;
  status: ReviewStatus;
  employeeScore: number | null;
  managerScore: number | null;
  acknowledged: boolean;
};

export async function getReviewRows(): Promise<ReviewRow[]> {
  const [assignments, employees, plans] = await Promise.all([
    getReviewAssignments(),
    getEmployees(),
    getReviewPlans(),
  ]);
  const employeeById = new Map(employees.map((e) => [e.employeeId, e]));
  const planById = new Map(plans.map((p) => [p.planId, p]));

  return assignments
    .map((assignment) => {
      const employee = employeeById.get(assignment.employeeId);
      const manager = employeeById.get(assignment.managerId);
      const plan = planById.get(assignment.planId);

      if (!employee || !manager || !plan) return null;

      return {
        assignmentId: assignment.assignmentId,
        planId: assignment.planId,
        employee,
        managerName: manager.name,
        planTitle: plan.title,
        deadline: assignment.deadline,
        status: assignment.status,
        employeeScore: assignment.employeeScore,
        managerScore: assignment.managerScore,
        acknowledged: assignment.acknowledged,
      };
    })
    .filter((row): row is ReviewRow => row !== null);
}

export async function getReviewRowById(assignmentId: string): Promise<ReviewRow | undefined> {
  const doc = await getDb().collection(COLLECTION).doc(assignmentId).get();
  if (!doc.exists) return undefined;

  const assignment = doc.data() as ReviewAssignment;
  const [employee, manager, plan] = await Promise.all([
    getEmployeeById(assignment.employeeId),
    getEmployeeById(assignment.managerId),
    getReviewPlanById(assignment.planId),
  ]);
  if (!employee || !manager || !plan) return undefined;

  return {
    assignmentId: assignment.assignmentId,
    planId: assignment.planId,
    employee,
    managerName: manager.name,
    planTitle: plan.title,
    deadline: assignment.deadline,
    status: assignment.status,
    employeeScore: assignment.employeeScore,
    managerScore: assignment.managerScore,
    acknowledged: assignment.acknowledged,
  };
}
