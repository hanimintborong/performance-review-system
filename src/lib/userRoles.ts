import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import type { SystemUserRecord } from "@/types/systemUser";

const COLLECTION = "users";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getUserRoleByEmail(email: string): Promise<SystemUserRecord | null> {
  const doc = await getDb().collection(COLLECTION).doc(normalizeEmail(email)).get();
  return doc.exists ? (doc.data() as SystemUserRecord) : null;
}

export async function listSystemUsers(): Promise<SystemUserRecord[]> {
  const snapshot = await getDb().collection(COLLECTION).orderBy("invitedAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data() as SystemUserRecord);
}

export async function saveSystemUser(record: SystemUserRecord): Promise<void> {
  await getDb().collection(COLLECTION).doc(normalizeEmail(record.email)).set(record);
}

export async function markUserActive(email: string): Promise<void> {
  await getDb().collection(COLLECTION).doc(normalizeEmail(email)).update({ status: "active" });
}
