import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RoleProvider } from "@/components/layout/RoleContext";
import { canvas } from "@/constants/colors";
import { getEmployees, getNotificationsForRecipient, getReviewRows, getWfhRequestRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { computeUnreadNotificationCount } from "@/lib/notificationFeed";
import { computePrimaryActionCount } from "@/lib/primaryActionCount";

export default async function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const systemUser = await getCurrentSystemUser();

  if (!systemUser) {
    redirect("/pending-access");
  }

  const [notifications, reviewRows, wfhRows, employees] = await Promise.all([
    getNotificationsForRecipient(systemUser.employeeId),
    getReviewRows(),
    getWfhRequestRows(),
    getEmployees(),
  ]);
  const notificationCount = computeUnreadNotificationCount(systemUser.role, systemUser.employeeId, notifications, reviewRows, employees);
  const primaryActionCount = computePrimaryActionCount(systemUser.role, systemUser.employeeId, reviewRows);
  const wfhPendingCount = wfhRows.filter((r) => r.approverId === systemUser.employeeId && r.status === "Pending Approval").length;

  return (
    <RoleProvider
      value={{
        role: systemUser.role,
        employeeId: systemUser.employeeId,
        name: systemUser.name,
        jobTitle: "",
        notificationCount,
        primaryActionCount,
        wfhPendingCount,
      }}
    >
      <Box minH="100vh" bg={canvas}>
        <AppSidebar />
        <AppHeader />

        <Box
          as="main"
          ml="232px"
          pt="88px"
          px="24px"
          pb="32px"
          minH="100vh"
        >
          {children}
        </Box>
      </Box>
    </RoleProvider>
  );
}