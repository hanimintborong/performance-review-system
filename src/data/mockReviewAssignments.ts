import type { ReviewAssignment } from "@/types/review";

export const mockReviewAssignments: ReviewAssignment[] = [
  { assignmentId: "ASG001", planId: "PLAN001", employeeId: "EMP001", managerId: "EMP101", status: "Finalised", employeeScore: 4.6, managerScore: 4.6, deadline: "2026-08-15", acknowledged: true },
  { assignmentId: "ASG002", planId: "PLAN001", employeeId: "EMP002", managerId: "EMP101", status: "Self-Assessment In Progress", employeeScore: null, managerScore: null, deadline: "2026-08-08", acknowledged: false },
  { assignmentId: "ASG003", planId: "PLAN001", employeeId: "EMP003", managerId: "EMP101", status: "Not Started", employeeScore: null, managerScore: null, deadline: "2026-08-08", acknowledged: false },
  { assignmentId: "ASG004", planId: "PLAN001", employeeId: "EMP004", managerId: "EMP101", status: "Overdue", employeeScore: null, managerScore: null, deadline: "2026-07-20", acknowledged: false },
  { assignmentId: "ASG005", planId: "PLAN001", employeeId: "EMP005", managerId: "EMP101", status: "Manager Reviewing", employeeScore: 4.3, managerScore: null, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG006", planId: "PLAN001", employeeId: "EMP006", managerId: "EMP101", status: "Employee Submitted", employeeScore: 4.0, managerScore: null, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG007", planId: "PLAN001", employeeId: "EMP007", managerId: "EMP102", status: "Manager Submitted", employeeScore: 4.3, managerScore: 4.4, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG008", planId: "PLAN001", employeeId: "EMP008", managerId: "EMP102", status: "Awaiting Discussion", employeeScore: 4.1, managerScore: 4.2, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG009", planId: "PLAN001", employeeId: "EMP009", managerId: "EMP103", status: "Awaiting HR Review", employeeScore: 4.4, managerScore: 4.5, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG010", planId: "PLAN001", employeeId: "EMP010", managerId: "EMP103", status: "Awaiting Management Review", employeeScore: 4.5, managerScore: 4.5, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG011", planId: "PLAN001", employeeId: "EMP011", managerId: "EMP104", status: "Overdue", employeeScore: null, managerScore: null, deadline: "2026-07-20", acknowledged: false },
  { assignmentId: "ASG012", planId: "PLAN001", employeeId: "EMP012", managerId: "EMP104", status: "Finalised", employeeScore: 4.0, managerScore: 4.1, deadline: "2026-08-15", acknowledged: false },
  { assignmentId: "ASG013", planId: "PLAN001", employeeId: "EMP013", managerId: "EMP105", status: "Finalised", employeeScore: 4.6, managerScore: 4.7, deadline: "2026-08-15", acknowledged: true },
  { assignmentId: "ASG014", planId: "PLAN001", employeeId: "EMP014", managerId: "EMP105", status: "Self-Assessment In Progress", employeeScore: null, managerScore: null, deadline: "2026-08-08", acknowledged: false },
];
