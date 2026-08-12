"use server";

import { revalidatePath } from "next/cache";

import { getEmployeeById, getWfhRequestById, saveWfhRequest } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { notify } from "@/lib/notify";
import type { WfhAvailability, WfhDuration } from "@/types/wfh";

export type NewWfhRequestInput = {
  date: string;
  duration: WfhDuration;
  reason: string;
  workPlan: string;
  availability: WfhAvailability[];
  availabilityOtherDetail: string;
  contactNumber: string;
  acknowledged: boolean;
  additionalNotes: string;
};

export async function createWfhRequestAction(input: NewWfhRequestInput): Promise<void> {
  const systemUser = await getCurrentSystemUser();
  const employee = systemUser ? await getEmployeeById(systemUser.employeeId) : undefined;
  if (!employee?.managerId) throw new Error("No approver found for this employee.");
  if (input.availability.includes("Other") && !input.availabilityOtherDetail.trim()) {
    throw new Error("Please specify the other availability option.");
  }

  const requestId = `WFH-${employee.employeeId}-${Date.now()}`;

  await saveWfhRequest({
    requestId,
    employeeId: employee.employeeId,
    approverId: employee.managerId,
    ...input,
    availabilityOtherDetail: input.availability.includes("Other") ? input.availabilityOtherDetail.trim() : null,
    additionalNotes: input.additionalNotes || null,
    status: "Pending Approval",
    approverComment: null,
    decidedAt: null,
    createdAt: new Date().toISOString(),
  });

  const approver = await getEmployeeById(employee.managerId);
  if (approver) {
    await notify({
      recipientId: approver.employeeId,
      recipientName: approver.name,
      type: "wfh_requested",
      title: `${employee.name} requested WFH on ${input.date}`,
      message: `${input.duration} · ${input.reason}`,
      assignmentId: requestId,
    });
  }

  revalidatePath("/wfh");
}

export async function cancelWfhRequestAction(requestId: string): Promise<void> {
  const request = await getWfhRequestById(requestId);
  if (!request || request.status !== "Pending Approval") return;

  await saveWfhRequest({ ...request, status: "Cancelled", decidedAt: new Date().toISOString() });
  revalidatePath("/wfh");
}
