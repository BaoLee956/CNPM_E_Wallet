// app/(customer)/notifications/page.tsx
import { CustomerPage } from "@/components/ui";
import { NotificationList } from "@/components/notifications/NotificationList";

export default function NotificationsPage() {
  return (
    <CustomerPage>
      <NotificationList />
    </CustomerPage>
  );
}
