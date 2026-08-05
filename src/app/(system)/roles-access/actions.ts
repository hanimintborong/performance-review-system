"use server";

import { revalidatePath } from "next/cache";

import { inviteUser } from "@/lib/inviteUser";
import type { SystemRole } from "@/types/role";

export async function inviteUserAction(input: { email: string; role: SystemRole; employeeId: string }) {
  await inviteUser(input);
  revalidatePath("/roles-access");
}
