"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { SystemRole } from "@/types/role";

type RoleContextValue = {
  role: SystemRole;
  employeeId: string;
  name: string;
  jobTitle: string;
  notificationCount: number;
  primaryActionCount: number;
  wfhPendingCount: number;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({
  value,
  children,
}: {
  value: RoleContextValue;
  children: ReactNode;
}) {
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used inside RoleProvider");
  }

  return context;
}
