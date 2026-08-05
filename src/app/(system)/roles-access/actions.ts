"use server";

import { revalidatePath } from "next/cache";

import { inviteUser } from "@/lib/inviteUser";
import { getUserRoleByEmail } from "@/lib/userRoles";
import type { SystemRole } from "@/types/role";

export async function inviteUserAction(input: { email: string; role: SystemRole; employeeId: string }) {
  await inviteUser(input);
  revalidatePath("/roles-access");
}

export async function resendInviteAction(email: string) {
  const record = await getUserRoleByEmail(email);
  if (!record) return;

  await inviteUser({ email: record.email, role: record.role, employeeId: record.employeeId });
  revalidatePath("/roles-access");
}
