import type { Employee } from "@/types/employee";
import type { NotificationSendTo } from "@/types/notification";
import type { ReviewAssignment } from "@/types/review";

type Recipient = { recipientId: string; recipientName: string };

export function resolveRuleRecipients(sendTo: NotificationSendTo, assignment: ReviewAssignment, employees: Employee[]): Recipient[] {
  const byId = new Map(employees.map((e) => [e.employeeId, e]));
  const recipients: Recipient[] = [];

  if (sendTo === "employee" || sendTo === "employee_and_manager") {
    const employee = byId.get(assignment.employeeId);
    if (employee) recipients.push({ recipientId: employee.employeeId, recipientName: employee.name });
  }

  if (sendTo === "manager" || sendTo === "employee_and_manager") {
    const manager = byId.get(assignment.managerId);
    if (manager) recipients.push({ recipientId: manager.employeeId, recipientName: manager.name });
  }

  if (sendTo === "hr") {
    employees
      .filter((e) => e.systemRole === "hr")
      .forEach((e) => recipients.push({ recipientId: e.employeeId, recipientName: e.name }));
  }

  return recipients;
}
