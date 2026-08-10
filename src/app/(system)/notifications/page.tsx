import { NotificationsClient } from "@/app/(system)/notifications/NotificationsClient";
import { getNotificationHistory, getNotificationRules, getNotificationsForRecipient, getReviewPlans } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { toNotificationView } from "@/lib/notificationView";

export default async function NotificationsPage() {
  const systemUser = await getCurrentSystemUser();
  const [rules, history, plans, ownNotifications] = await Promise.all([
    getNotificationRules(),
    getNotificationHistory(),
    getReviewPlans(),
    systemUser ? getNotificationsForRecipient(systemUser.employeeId) : Promise.resolve([]),
  ]);

  const titleById = new Map(plans.map((p) => [p.planId, p.title]));
  const ruleRows = rules.map((rule) => ({ ...rule, planTitle: titleById.get(rule.planId) ?? "All plans" }));
  const alerts = ownNotifications.map((n) => toNotificationView(n, "employee"));

  return <NotificationsClient rules={ruleRows} history={history} plans={plans} alerts={alerts} />;
}
