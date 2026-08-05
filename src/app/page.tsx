import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { ROLE_META } from "@/types/role";

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const systemUser = await getCurrentSystemUser();
  if (!systemUser) redirect("/pending-access");

  redirect(ROLE_META[systemUser.role].homeHref);
}
