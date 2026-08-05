import "server-only";

import { clerkClient } from "@clerk/nextjs/server";

import { normalizeEmail, saveSystemUser } from "@/lib/userRoles";
import type { SystemRole } from "@/types/role";

type InviteUserInput = {
  email: string;
  role: SystemRole;
  employeeId: string;
};

export async function inviteUser({ email, role, employeeId }: InviteUserInput): Promise<void> {
  const normalizedEmail = normalizeEmail(email);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  await saveSystemUser({
    email: normalizedEmail,
    role,
    employeeId,
    status: "invited",
    invitedAt: new Date().toISOString(),
  });

  const clerk = await clerkClient();
  await clerk.invitations.createInvitation({
    emailAddress: normalizedEmail,
    redirectUrl: `${appUrl}/sign-up`,
    ignoreExisting: true,
  });
}
