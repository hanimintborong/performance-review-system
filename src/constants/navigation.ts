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
import type { UserRole } from "@/components/layout/RoleContext";

export type NavigationItem = {
  label: string;
  href: string;
  icon: IconType;
  count?: number;
};

export const navigationByRole: Record<UserRole, NavigationItem[]> = {
  hr: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: FiHome,
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: FiClipboard,
      count: 8,
    },
    {
      label: "Cycles",
      href: "/review-plans",
      icon: FiCalendar,
    },
    {
      label: "Analytics",
      href: "/reports",
      icon: FiBarChart2,
    },
    {
      label: "Roles & permissions",
      href: "/roles-access",
      icon: FiUsers,
    },
    {
      label: "WFH requests",
      href: "/wfh",
      icon: FiHome,
      count: 3,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FiBell,
      count: 3,
    },
  ],

  manager: [
    {
      label: "My team",
      href: "/manager/team",
      icon: FiUsers,
      count: 4,
    },
    {
      label: "WFH requests",
      href: "/wfh",
      icon: FiHome,
      count: 2,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FiBell,
      count: 3,
    },
  ],

  employee: [
    {
      label: "My reviews",
      href: "/employee/reviews",
      icon: FiClipboard,
    },
    {
      label: "My evaluation",
      href: "/employee/evaluation",
      icon: FiEdit3,
      count: 1,
    },
    {
      label: "WFH requests",
      href: "/wfh",
      icon: FiHome,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FiBell,
      count: 3,
    },
  ],
};