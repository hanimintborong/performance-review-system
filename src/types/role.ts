export type SystemRole = "hr" | "manager" | "employee" | "topManagement";

export type RoleMeta = {
  label: string;
  homeHref: string;
};

export const ROLE_META: Record<SystemRole, RoleMeta> = {
  hr: { label: "HR Admin", homeHref: "/dashboard" },
  manager: { label: "Manager", homeHref: "/manager/team" },
  employee: { label: "Employee", homeHref: "/employee/reviews" },
  topManagement: { label: "Top Management", homeHref: "/management/reviews" },
};
