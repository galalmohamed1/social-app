import { GlassCard } from "@/components/common/GlassCard";
import NotificationsList from "@/components/common/Notifications/NotificationsList";
import type { NotificationType } from "@/types/Note";
import { CheckCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useNotesAPI from "@/hooks/useNotesAPI";
import type { NotificationItem } from "@/types/Note";
import UnReadList from "@/components/common/Notifications/UnReadList";

type Props = {
  refreshUnreadCount: () => void;
};
export default function NotificationsPage({ refreshUnreadCount }: Props) {
  const [active, setActive] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getNotifications, markAllNotificationsRead, readNotificationOnly } =
    useNotesAPI();

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);

      const data = await getNotifications(1, 50);
      setNotifications(data);

      setIsLoading(false);
    };

    fetchNotifications();
    refreshUnreadCount();
  }, [getNotifications, refreshUnreadCount]);

  const visibleNotifications = useMemo(() => {
    return active === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;
  }, [notifications, active]);

  const handleactive = (type: NotificationType) => {
    setActive(type);
  };
  const handleReadAll = async () => {
    const result = await markAllNotificationsRead();

    if (result) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      refreshUnreadCount();
    }
  };
  const handleRead = async (id: string) => {
    const result = await readNotificationOnly(id);

    if (result) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );

      refreshUnreadCount();
    }
  };

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  console.log("active:", active);
  console.log("notifications:", notifications);
  console.log("visibleNotifications:", visibleNotifications);

  return (
    <GlassCard className="shadow-sm sm:rounded-2xl">
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              Notifications
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Realtime updates for likes, comments, shares, and follows.
            </p>
          </div>
          <button
            disabled={notifications.length === 0 || unreadCount === 0}
            onClick={handleReadAll}
            className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <CheckCheck />
            Mark all as read
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            type="button"
            onClick={() => handleactive("all")}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition ${
              active === "all"
                ? "bg-[#1877f2] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => handleactive("unread")}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition ${
              active === "unread"
                ? "bg-[#1877f2] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="rounded-full px-2 py-0.5 text-xs ml-1 bg-white text-[#1877f2]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2 p-3 sm:p-4">
        {active === "all" ? (
          <NotificationsList
            handleRead={handleRead}
            isLoading={isLoading}
            visibleNotifications={visibleNotifications}
          />
        ) : (
          <UnReadList
            notifications={visibleNotifications}
            isLoading={isLoading}
            onMarkRead={handleRead}
          />
        )}
      </div>
    </GlassCard>
  );
}
