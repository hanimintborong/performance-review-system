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
  section?: string;
};

export const navigationByRole: Record<SystemRole, NavigationItem[]> = {
  hr: [
    { label: "Dashboard", href: "/dashboard", icon: FiHome },
    { label: "Templates", href: "/review-templates", icon: FiEdit3, section: "Review management" },
    { label: "Cycles", href: "/review-plans", icon: FiCalendar, section: "Review management" },
    { label: "Reviews", href: "/reviews", icon: FiClipboard, section: "Review management" },
    { label: "Employees", href: "/employees", icon: FiUsers, section: "People" },
    { label: "Roles & permissions", href: "/roles-access", icon: FiUsers, section: "People" },
    { label: "Self-assessment", href: "/employee/evaluation", icon: FiEdit3, section: "My own review" },
    { label: "Review results", href: "/employee/reviews", icon: FiClipboard, section: "My own review" },
    { label: "WFH requests", href: "/wfh", icon: FiHome, section: "Workplace" },
    { label: "Notifications", href: "/notifications", icon: FiBell, section: "Updates" },
  ],

  manager: [
    { label: "My team", href: "/manager/team", icon: FiUsers, section: "Team Reviews"},
    { label: "My self-assessment", href: "/employee/evaluation", icon: FiEdit3, section: "My own review" },
    { label: "My review results", href: "/employee/reviews", icon: FiClipboard, section: "My own review" },
    { label: "WFH requests", href: "/wfh", icon: FiHome, section: "Workplace" },
    { label: "Notifications", href: "/manager/notifications", icon: FiBell, section: "Updates" },
  ],

  employee: [
    { label: "My reviews", href: "/employee/reviews", icon: FiClipboard, section: "My reviews" },
    { label: "My evaluation", href: "/employee/evaluation", icon: FiEdit3, section: "My reviews" },
    { label: "WFH requests", href: "/wfh", icon: FiHome, section: "Workplace" },
    { label: "Notifications", href: "/employee/notifications", icon: FiBell, section: "Updates" },
  ],

  topManagement: [
    { label: "Finalise reviews", href: "/management/reviews", icon: FiClipboard, section: "Management review" },
    { label: "Managers evaluations", href: "/manager/team", icon: FiUsers, section: "Management review" },
    { label: "WFH requests", href: "/wfh", icon: FiHome, section: "Workplace" },
    { label: "Notifications", href: "/management/notifications", icon: FiBell, section: "Updates" },
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
  "/management/reviews": "Finalise reviews",
  "/management/notifications": "Notifications",
};
