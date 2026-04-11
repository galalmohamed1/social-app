import { useState } from "react";
import NotificationCard from "./NotificationCard";
import type { Notification } from "@/types/Note";

const NotificationsList = () => {
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
  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} onMarkRead={handleread} />
      ))}
    </div>
  );
};

export default NotificationsList;
