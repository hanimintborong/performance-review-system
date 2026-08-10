import { NextResponse } from "next/server";

import { runNotificationScheduler } from "@/lib/runNotificationScheduler";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runNotificationScheduler();
  return NextResponse.json(result);
}
