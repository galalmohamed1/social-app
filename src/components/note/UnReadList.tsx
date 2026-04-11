import { useState } from "react";
import type { Notification } from "@/types/Note";
import NotificationCard from "../common/Notifications/NotificationCard";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
function UnReadList() {
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
  const handleread = (id: number) => {
    console.log(id);
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    setNotifications(updatedNotifications);
    console.log(updatedNotifications);
  };
  const handlereadall = () => {
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };
  const unread = notifications.filter((n) => !n.read);

  return (
    <>
      <button
        disabled={notifications.every((n) => n.read)}
        onClick={handlereadall}
        className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <CheckCheck />
        Mark all as read
      </button>
      {unread.length > 0 ? (
        unread.map((n) => (
          <NotificationCard
            key={n.id}
            notification={n}
            onMarkRead={handleread}
          />
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mb-3 text-3xl"
          >
            🔔
          </motion.div>
          <p className="text-sm font-semibold text-slate-500">
            No unread notifications yet.
          </p>
        </motion.div>
      )}
    </>
  );
}
export default UnReadList;
