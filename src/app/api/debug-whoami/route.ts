import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { getUserRoleByEmail, normalizeEmail } from "@/lib/userRoles";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ step: "auth", userId: null });

  const user = await currentUser();
  if (!user) return NextResponse.json({ step: "currentUser", userId, user: null });

  const primaryEmail = user.primaryEmailAddress?.emailAddress ?? null;
  const fallbackEmail = user.emailAddresses[0]?.emailAddress ?? null;
  const resolvedEmail = primaryEmail ?? fallbackEmail;

  const dbUrlHost = (() => {
    try {
      return new URL(process.env.DATABASE_URL ?? "").host;
    } catch {
      return "unparseable";
    }
  })();

  let record = null;
  let dbError: string | null = null;
  try {
    record = resolvedEmail ? await getUserRoleByEmail(resolvedEmail) : null;
  } catch (e) {
    dbError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({
    step: "done",
    userId,
    primaryEmail,
    fallbackEmail,
    resolvedEmail,
    normalizedEmail: resolvedEmail ? normalizeEmail(resolvedEmail) : null,
    dbUrlHost,
    record,
    dbError,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    gitBranch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
  });
}
