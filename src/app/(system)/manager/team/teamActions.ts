"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getReviewAssignmentById } from "@/data/queries";
import { notify } from "@/lib/notify";

export async function sendReminderAction(assignmentId: string): Promise<void> {
  const assignment = await getReviewAssignmentById(assignmentId);
  if (!assignment) return;

  const [employee, manager] = await Promise.all([
    getEmployeeById(assignment.employeeId),
    getEmployeeById(assignment.managerId),
  ]);
  if (!employee) return;

  await notify({
    recipientId: employee.employeeId,
    recipientName: employee.name,
    type: "upcoming_deadline",
    title: "Reminder: complete your self-assessment",
    message: `${manager?.name ?? "Your manager"} sent you a reminder.`,
    assignmentId,
  });

  revalidatePath("/employee/notifications");
}
