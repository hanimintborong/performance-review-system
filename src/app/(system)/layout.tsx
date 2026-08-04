import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RoleProvider } from "@/components/layout/RoleContext";

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleProvider>
      <Box minH="100vh" bg="#FAFAFA">
        <AppSidebar />
        <AppHeader />

        <Box
          as="main"
          ml="292px"
          pt="102px"
          px="30px"
          pb="36px"
          minH="100vh"
        >
          {children}
        </Box>
      </Box>
    </RoleProvider>
  );
}