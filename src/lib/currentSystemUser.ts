import "server-only";

import { currentUser } from "@clerk/nextjs/server";

import { getUserRoleByEmail, markUserActive } from "@/lib/userRoles";
import type { SystemUserRecord } from "@/types/systemUser";

export type CurrentSystemUser = SystemUserRecord & {
  name: string;
};

export async function getCurrentSystemUser(): Promise<CurrentSystemUser | null> {
  const user = await currentUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const record = await getUserRoleByEmail(email);
  if (!record) return null;

  if (record.status === "invited") {
    await markUserActive(email);
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email;

  return { ...record, status: "active", name };
}
