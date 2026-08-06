import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RoleProvider } from "@/components/layout/RoleContext";
import { canvas } from "@/constants/colors";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

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

  return (
    <RoleProvider
      value={{
        role: systemUser.role,
        employeeId: systemUser.employeeId,
        name: systemUser.name,
        jobTitle: "",
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