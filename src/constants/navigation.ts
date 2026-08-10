import {
  FiBell,
  FiCalendar,
  FiClipboard,
  FiEdit3,
  FiHome,
  FiUsers,
} from "react-icons/fi";

import type { IconType } from "react-icons";
import type { SystemRole } from "@/types/role";

export type NavigationItem = {
  label: string;
  href: string;
  icon: IconType;
  count?: number;
};

export const navigationByRole: Record<SystemRole, NavigationItem[]> = {
  hr: [
    { label: "Dashboard", href: "/dashboard", icon: FiHome },
    { label: "Templates", href: "/review-templates", icon: FiEdit3 },
    { label: "Cycles", href: "/review-plans", icon: FiCalendar },
    { label: "Reviews", href: "/reviews", icon: FiClipboard },
    { label: "Employees", href: "/employees", icon: FiUsers },
    { label: "Roles & permissions", href: "/roles-access", icon: FiUsers },
    { label: "WFH requests", href: "/wfh", icon: FiHome, count: 3 },
    { label: "Notifications", href: "/notifications", icon: FiBell },
  ],

  manager: [
    { label: "My team", href: "/manager/team", icon: FiUsers },
    { label: "My self-assessment", href: "/employee/evaluation", icon: FiEdit3 },
    { label: "My review results", href: "/employee/reviews", icon: FiClipboard },
    { label: "WFH requests", href: "/wfh", icon: FiHome, count: 2 },
    { label: "Notifications", href: "/manager/notifications", icon: FiBell },
  ],

  employee: [
    { label: "My reviews", href: "/employee/reviews", icon: FiClipboard },
    { label: "My evaluation", href: "/employee/evaluation", icon: FiEdit3 },
    { label: "WFH requests", href: "/wfh", icon: FiHome },
    { label: "Notifications", href: "/employee/notifications", icon: FiBell },
  ],

  topManagement: [
    { label: "Review summary", href: "/management/reviews", icon: FiClipboard },
    { label: "Managers to evaluate", href: "/manager/team", icon: FiUsers },
    { label: "Notifications", href: "/management/notifications", icon: FiBell },
  ],
};

export const PRIMARY_ACTION_LABEL: Partial<Record<SystemRole, string>> = {
  hr: "Reviews",
  manager: "My team",
  employee: "My evaluation",
};

export const pageTitleOverrides: Record<string, string> = {
  "/dashboard": "HR dashboard",
  "/review-plans": "Review cycles",
  "/notifications": "Notification & Reminder",
  "/reports": "Analytics & reporting",
  "/manager/notifications": "Notifications",
  "/employee/notifications": "Notifications",
  "/management/reviews": "Review summary",
  "/management/notifications": "Notifications",
};
