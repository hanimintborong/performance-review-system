import type { RepeatFrequency } from "@/types/notification";

export function shouldSendToday(targetDate: string, today: string, repeat: RepeatFrequency): boolean {
  if (targetDate > today) return false;

  const daysSince = Math.round((new Date(today).getTime() - new Date(targetDate).getTime()) / 86400000);

  if (repeat === "daily") return true;
  if (repeat === "weekly") return daysSince % 7 === 0;
  return daysSince === 0;
}
