import { memo } from "react";
import { UserPlus, Check } from "lucide-react";
import type { Notification } from "@/types/Note";

type Props = {
  notification: Notification;
  onMarkRead: (id: number) => void;
};

const NotificationCard = ({ notification, onMarkRead }: Props) => {
  return (
    <article
      className={`relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 ${notification.read ? "bg-white hover:bg-slate-50 " : "bg-[#edf4ff]"}`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <button className="block cursor-pointer">
          <img
            src={notification.avatar}
            alt={notification.name}
            className="h-11 w-11 rounded-full object-cover"
          />
        </button>

        {/* Icon */}
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-violet-600">
          <UserPlus size={14} />
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <p className="text-sm text-slate-800">
            <button className="font-extrabold hover:text-[#1877f2] hover:underline cursor-pointer">
              {notification.name}
            </button>{" "}
            followed you
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold text-slate-500">
              {notification.time}
            </span>
            {notification.read ? null : (
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
        
        <p className="mt-0.5 text-sm text-slate-600">{notification.message}</p>

        {/* Status */}
        <div className="mt-2 flex items-center gap-2">
          {notification.read ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <Check size={13} />
              Read
            </span>
          ) : (
            <button
              onClick={() => onMarkRead(notification.id)}
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
