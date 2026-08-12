import { WfhClient } from "@/app/(system)/wfh/WfhClient";
import { getEmployees, getWfhRequestRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function WfhPage() {
  const systemUser = await getCurrentSystemUser();
  const [rows, employees] = await Promise.all([getWfhRequestRows(), getEmployees()]);

  const employee = employees.find((e) => e.employeeId === systemUser?.employeeId);
  const myRequests = rows.filter((r) => r.employeeId === systemUser?.employeeId);
  const teamRequests = rows.filter((r) => r.approverId === systemUser?.employeeId);
  const isApprover = employees.some((e) => e.managerId === systemUser?.employeeId);
  const isHr = systemUser?.role === "hr";

  if (!employee) return null;

  return (
    <WfhClient
      employee={employee}
      myRequests={myRequests}
      teamRequests={teamRequests}
      allRequests={isHr ? rows : []}
      isApprover={isApprover}
      isHr={isHr}
    />
  );
}
