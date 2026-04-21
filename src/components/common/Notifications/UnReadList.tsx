import type { NotificationItem } from "@/types/Note";
import NotificationCard from "./NotificationCard";
import NoNotifications from "@/components/note/NoNotifications";


type Props = {
  notifications: NotificationItem[];
  isLoading: boolean;
  onMarkRead: (id: string) => void;
};

function UnReadList({ notifications, isLoading, onMarkRead }: Props) {
  const unread = notifications.filter((n) => !n.isRead);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm font-semibold text-slate-500">
          Loading unread notifications...
        </p>
      </div>
    );
  }

  return (
    <>
      {unread.length > 0 ? (
        unread.map((n) => (
          <NotificationCard
            key={n._id}
            notification={n}
            onMarkRead={onMarkRead}
          />
        ))
      ) : (
        <NoNotifications />
      )}
    </>
  );
}

export default UnReadList;
