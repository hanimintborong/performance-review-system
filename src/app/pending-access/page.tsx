import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { AuthShell } from "@/components/auth/AuthShell";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function PendingAccessPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const systemUser = await getCurrentSystemUser();
  if (systemUser) redirect("/dashboard");

  return (
    <AuthShell>
      <AppCard p="24px" textAlign="center" w="100%">
        <Text fontSize="16px" fontWeight="700" color="grey.80">Account not yet linked</Text>
        <Text fontSize="13px" color="grey.60" mt="8px">
          You&apos;re signed in, but no role has been assigned to your account yet. Ask HR to invite you from
          Roles &amp; Permissions.
        </Text>
        <SignOutButton>
          <SecondaryButton mt="16px">Sign out</SecondaryButton>
        </SignOutButton>
      </AppCard>
    </AuthShell>
  );
}
