import { NotificationsClient } from "@/app/(system)/notifications/NotificationsClient";
import { getCustomNotifications, getEmployees, getNotificationHistory, getNotificationsForRecipient } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { toNotificationView } from "@/lib/notificationView";

export default async function NotificationsPage() {
  const systemUser = await getCurrentSystemUser();
  const [customNotifications, history, employees, ownNotifications] = await Promise.all([
    getCustomNotifications(),
    getNotificationHistory(),
    getEmployees(),
    systemUser ? getNotificationsForRecipient(systemUser.employeeId) : Promise.resolve([]),
  ]);

  const alerts = ownNotifications.map((n) => toNotificationView(n, "employee"));

  return <NotificationsClient customNotifications={customNotifications} history={history} employees={employees} alerts={alerts} />;
}
