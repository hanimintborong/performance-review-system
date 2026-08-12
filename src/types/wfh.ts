export type WfhDuration = "Full Day" | "Half Day AM" | "Half Day PM";
export type WfhAvailability = "Email" | "Phone" | "Lark" | "Other";
export type WfhStatus = "Pending Approval" | "Approved" | "Rejected" | "Cancelled";

export const WFH_DURATIONS: WfhDuration[] = ["Full Day", "Half Day AM", "Half Day PM"];
export const WFH_AVAILABILITY_OPTIONS: WfhAvailability[] = ["Email", "Phone", "Lark", "Other"];

export type WfhRequest = {
  requestId: string;
  employeeId: string;
  approverId: string;
  date: string;
  duration: WfhDuration;
  reason: string;
  workPlan: string;
  availability: WfhAvailability[];
  availabilityOtherDetail: string | null;
  contactNumber: string;
  acknowledged: boolean;
  additionalNotes: string | null;
  status: WfhStatus;
  approverComment: string | null;
  decidedAt: string | null;
  createdAt: string;
};
