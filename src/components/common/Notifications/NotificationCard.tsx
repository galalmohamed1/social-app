import { memo } from "react";
import { UserPlus, Check, Heart, MessageCircle, Share2 } from "lucide-react";
import type { NotificationItem } from "@/types/Note";
import PostTime from "@/components/note/PostTime";

type Props = {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
};

const NotificationCard = ({ notification, onMarkRead }: Props) => {
  const getNotificationText = () => {
    switch (notification.type) {
      case "follow_user":
        return "followed you";
      case "like_post":
        return "liked your post";
      case "comment_post":
        return "commented on your post";
      case "share_post":
        return "shared your post";
      default:
        return "sent you a notification";
    }
  };

  const renderIcon = () => {
    switch (notification.type) {
      case "follow_user":
        return <UserPlus size={14} />;
      case "like_post":
        return <Heart size={14} />;
      case "comment_post":
        return <MessageCircle size={14} />;
      case "share_post":
        return <Share2 size={14} />;
      default:
        return <UserPlus size={14} />;
    }
  };

  const renderIconColor = () => {
    switch (notification.type) {
      case "follow_user":
        return "text-violet-600";
      case "like_post":
        return "text-rose-600";
      case "comment_post":
        return "text-emerald-600";
      case "share_post":
        return "text-sky-600";
      default:
        return "text-violet-600";
    }
  };

  return (
    <article
      className={`relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 ${
        notification.isRead ? "bg-white hover:bg-slate-50" : "bg-[#edf4ff]"
      }`}
    >
      <div className="relative shrink-0">
        <button className="block cursor-pointer">
          <img
            src={notification.actor.photo}
            alt={notification.actor.name}
            className="h-11 w-11 rounded-full object-cover"
          />
        </button>

        <span
          className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white ${renderIconColor()}`}
        >
          {renderIcon()}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <p className="text-sm text-slate-800">
            <button className="cursor-pointer font-extrabold hover:text-[#1877f2] hover:underline">
              {notification.actor.name}
            </button>{" "}
            {getNotificationText()}
          </p>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold text-slate-500">
              <PostTime createdAt={notification.createdAt} />
            </span>

            {notification.isRead ? null : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-dot text-[#1877f2]"
                aria-hidden="true"
              >
                <circle cx="12.1" cy="12.1" r={1} />
              </svg>
            )}
          </div>
        </div>
        <p className="mt-0.5 text-sm text-slate-600">
          {notification.entity?.body}
        </p>
        <p className="mt-0.5 text-sm text-slate-600">
          {notification.entityType === "user" && notification.actor.name}
        </p>

        <div className="mt-2 flex items-center gap-2">
          {notification.isRead ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <Check size={13} />
              Read
            </span>
          ) : (
            <button
              onClick={() => onMarkRead(notification._id)}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff]"
            >
              <Check size={13} />
              Mark as read
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(NotificationCard);