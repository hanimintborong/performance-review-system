import {
  FiBarChart2,
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
    { label: "Reviews", href: "/reviews", icon: FiClipboard, count: 8 },
    { label: "Cycles", href: "/review-plans", icon: FiCalendar },
    { label: "Templates", href: "/review-templates", icon: FiEdit3 },
    { label: "Analytics", href: "/reports", icon: FiBarChart2 },
    { label: "Employees", href: "/employees", icon: FiUsers },
    { label: "Roles & permissions", href: "/roles-access", icon: FiUsers },
    { label: "WFH requests", href: "/wfh", icon: FiHome, count: 3 },
    { label: "Notifications", href: "/notifications", icon: FiBell, count: 3 },
  ],

  manager: [
    { label: "My team", href: "/manager/team", icon: FiUsers, count: 4 },
    { label: "WFH requests", href: "/wfh", icon: FiHome, count: 2 },
    { label: "Notifications", href: "/manager/notifications", icon: FiBell, count: 3 },
  ],

  employee: [
    { label: "My reviews", href: "/employee/reviews", icon: FiClipboard },
    { label: "My evaluation", href: "/employee/evaluation", icon: FiEdit3, count: 1 },
    { label: "WFH requests", href: "/wfh", icon: FiHome },
    { label: "Notifications", href: "/employee/notifications", icon: FiBell, count: 3 },
  ],

  topManagement: [
    { label: "Review summary", href: "/management/reviews", icon: FiClipboard },
  ],
};

export const pageTitleOverrides: Record<string, string> = {
  "/dashboard": "HR dashboard",
  "/review-plans": "Review cycles",
  "/notifications": "Notification & Reminder",
  "/reports": "Analytics & reporting",
  "/manager/team": "My team",
  "/manager/notifications": "Notifications",
  "/employee/reviews": "My reviews",
  "/employee/evaluation": "My evaluation",
  "/employee/notifications": "Notifications",
  "/management/reviews": "Review summary",
};
