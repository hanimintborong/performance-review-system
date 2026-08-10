import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RoleProvider } from "@/components/layout/RoleContext";
import { canvas } from "@/constants/colors";
import { getNotificationsForRecipient, getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
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

  const [notifications, reviewRows] = await Promise.all([
    getNotificationsForRecipient(systemUser.employeeId),
    getReviewRows(),
  ]);
  const notificationCount = notifications.filter((n) => !n.read).length;
  const primaryActionCount = computePrimaryActionCount(systemUser.role, systemUser.employeeId, reviewRows);

  return (
    <RoleProvider
      value={{
        role: systemUser.role,
        employeeId: systemUser.employeeId,
        name: systemUser.name,
        jobTitle: "",
        notificationCount,
        primaryActionCount,
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