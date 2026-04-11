import { GlassCard } from "@/components/common/GlassCard";
import NotificationsList from "@/components/common/Notifications/NotificationsList";
import UnReadList from "@/components/note/UnReadList";
import type { Notification, NotificationType } from "@/types/Note";
import { CheckCheck } from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [active, setActive] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: 1,
        name: "mohamed",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        time: "1h",
        message: "mohamed",
        read: false,
      },
      {
        id: 2,
        name: "mohamed",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        time: "1h",
        message: "mohamed",
        read: false,
      },
      {
        id: 3,
        name: "Galal",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        time: "1h",
        message: "mohamed",
        read: false,
      },
      {
        id: 4,
        name: "Mayada",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        time: "1h",
        message: "mohamed",
        read: false,
      },
    ]);
    const countunread = notifications.filter((n) => !n.read).length;
  const handleactive = (type: NotificationType) => {
    if (type === "all") {
      setActive("all");
    } else {
      setActive("unread");
    }
  };
  const handlereadall = () =>{
    const updatedNotifications = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
  }

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
            disabled={notifications.every((n) => n.read)}
            onClick={handlereadall}
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
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition 
              ${
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
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition 
              ${
                active === "unread"
                  ? "bg-[#1877f2] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            Unread{" "}
            {countunread > 0 &&(
            <span className="rounded-full px-2 py-0.5 text-xs bg-white/25 text-white">{countunread}</span>
            )}
          </button>
        </div>
      </div>
      <div className="space-y-2 p-3 sm:p-4">
        {active === "all" ? (
          <NotificationsList />
        ) : (
          <UnReadList />
        )}
      </div>
    </GlassCard>
  );
}
