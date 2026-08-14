import "server-only";

import { cache } from "react";
import { desc, eq } from "drizzle-orm";

import { systemUsers } from "@/db/schema";
import { db } from "@/lib/db";
import type { SystemRole } from "@/types/role";
import type { SystemUserRecord } from "@/types/systemUser";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const getUserRoleByEmail = cache(async (email: string): Promise<SystemUserRecord | null> => {
  const [record] = await db.select().from(systemUsers).where(eq(systemUsers.email, normalizeEmail(email))).limit(1);
  return record ?? null;
});

export const listSystemUsers = cache(async (): Promise<SystemUserRecord[]> => {
  return db.select().from(systemUsers).orderBy(desc(systemUsers.invitedAt)).limit(100);
});

export async function saveSystemUser(record: SystemUserRecord): Promise<void> {
  const row = { ...record, email: normalizeEmail(record.email) };
  await db.insert(systemUsers).values(row).onConflictDoUpdate({ target: systemUsers.email, set: row });
}

export async function markUserActive(email: string): Promise<void> {
  await db.update(systemUsers).set({ status: "active" }).where(eq(systemUsers.email, normalizeEmail(email)));
}

export async function syncUserRole(email: string, role: SystemRole): Promise<void> {
  const record = await getUserRoleByEmail(email);
  if (!record) return;

  await saveSystemUser({ ...record, role });
}

export async function renameSystemUserEmail(oldEmail: string, newEmail: string): Promise<void> {
  const from = normalizeEmail(oldEmail);
  const to = normalizeEmail(newEmail);
  if (from === to) return;

  // A changed email is an unproven identity Clerk has never seen — always require a fresh invite/sign-in,
  // regardless of whether the old email was already active.
  await db.update(systemUsers).set({ email: to, status: "invited" }).where(eq(systemUsers.email, from));
}
