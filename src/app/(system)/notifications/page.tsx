import { NotificationsClient } from "@/app/(system)/notifications/NotificationsClient";
import { getNotificationHistory, getNotificationRules, getReviewPlans } from "@/data/queries";

export default async function NotificationsPage() {
  const [rules, history, plans] = await Promise.all([
    getNotificationRules(),
    getNotificationHistory(),
    getReviewPlans(),
  ]);

  const titleById = new Map(plans.map((p) => [p.planId, p.title]));
  const ruleRows = rules.map((rule) => ({ ...rule, planTitle: titleById.get(rule.planId) ?? "All plans" }));

  return <NotificationsClient rules={ruleRows} history={history} plans={plans} />;
}
