export type PermissionRow = {
  capability: string;
  hr: boolean;
  manager: boolean;
  employee: boolean;
  topManagement: boolean;
};

export const mockPermissions: PermissionRow[] = [
  { capability: "View HR dashboard & company-wide progress", hr: true, manager: false, employee: false, topManagement: false },
  { capability: "Manage review cycles & form templates", hr: true, manager: false, employee: false, topManagement: false },
  { capability: "Manage users, roles, and permissions", hr: true, manager: false, employee: false, topManagement: false },
  { capability: "Submit evaluations for own department's staff", hr: false, manager: true, employee: false, topManagement: false },
  { capability: "View results for own department's staff", hr: true, manager: true, employee: false, topManagement: false },
  { capability: "View own results & review history", hr: true, manager: true, employee: true, topManagement: false },
  { capability: "Send reminders for pending reviews", hr: true, manager: true, employee: false, topManagement: false },
  { capability: "Export analytics & performance reports", hr: true, manager: false, employee: false, topManagement: false },
  { capability: "Review company-wide compiled results", hr: true, manager: false, employee: false, topManagement: true },
  { capability: "Approve or reject WFH requests for own team", hr: false, manager: true, employee: false, topManagement: false },
];
