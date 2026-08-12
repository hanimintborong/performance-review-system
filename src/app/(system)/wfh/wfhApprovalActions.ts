"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getWfhRequestById, saveWfhRequest } from "@/data/queries";
import { notify } from "@/lib/notify";

export async function approveWfhRequestAction(requestId: string): Promise<void> {
  const request = await getWfhRequestById(requestId);
  if (!request || request.status !== "Pending Approval") return;

  await saveWfhRequest({ ...request, status: "Approved", decidedAt: new Date().toISOString() });

  const employee = await getEmployeeById(request.employeeId);
  if (employee) {
    await notify({
      recipientId: employee.employeeId,
      recipientName: employee.name,
      type: "wfh_approved",
      title: "Your WFH request was approved",
      message: `${request.date} · ${request.duration}`,
      assignmentId: requestId,
    });
  }

  revalidatePath("/wfh");
}

export async function rejectWfhRequestAction(requestId: string, comment: string): Promise<void> {
  const request = await getWfhRequestById(requestId);
  if (!request || request.status !== "Pending Approval") return;
  if (!comment.trim()) throw new Error("A comment is required to reject a request.");

  await saveWfhRequest({ ...request, status: "Rejected", approverComment: comment, decidedAt: new Date().toISOString() });

  const employee = await getEmployeeById(request.employeeId);
  if (employee) {
    await notify({
      recipientId: employee.employeeId,
      recipientName: employee.name,
      type: "wfh_rejected",
      title: "Your WFH request was rejected",
      message: comment,
      assignmentId: requestId,
    });
  }

  revalidatePath("/wfh");
}
