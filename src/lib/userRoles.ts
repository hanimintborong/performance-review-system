import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import type { SystemUserRecord } from "@/types/systemUser";

const COLLECTION = "users";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const getUserRoleByEmail = cache(
  async (email: string): Promise<SystemUserRecord | null> => {
    const document = await getDb()
      .collection(COLLECTION)
      .doc(normalizeEmail(email))
      .get();

    return document.exists
      ? (document.data() as SystemUserRecord)
      : null;
  },
);

export const listSystemUsers = cache(
  async (): Promise<SystemUserRecord[]> => {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .orderBy("invitedAt", "desc")
      .limit(100)
      .get();

    return snapshot.docs.map(
      (document) => document.data() as SystemUserRecord,
    );
  },
);

export async function saveSystemUser(
  record: SystemUserRecord,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(normalizeEmail(record.email))
    .set(record);
}

export async function markUserActive(
  email: string,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(normalizeEmail(email))
    .update({
      status: "active",
    });
}