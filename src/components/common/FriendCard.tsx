import { memo, useState } from "react";
import { Check, UserPlus } from "lucide-react";
import type { UserCard } from "@/types/Note";

type Props = {
  user: UserCard;
};

const FriendCard = ({ user }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = () => {
    // 🔥 Optimistic UI
    setIsFollowing((prev) => !prev);
  };
  return (
    <div className="rounded-xl border border-slate-200 p-2.5">
      <div className="flex items-center justify-between gap-2">
        {/* User Info */}
        <button className="cursor-pointer flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50">
          <img
            src={user.avatar}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-bold text-slate-900 hover:underline">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">@{user.username}</p>
          </div>
        </button>

        {/* Follow Button */}
        <button
          onClick={handleFollow}
          className={`cursor-pointer inline-flex items-center gap-1 rounded-full py-1.5 text-xs font-bold transition ${
            isFollowing
              ? "bg-slate-200 text-slate-700 px-2" 
              : "bg-[#e7f3ff] text-[#1877f2] px-3"
          }`}
        >
          {isFollowing ? <Check size={13} /> : <UserPlus size={13} />}
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Followers */}
      <div className="mt-2">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
          {user.followers} followers
        </span>
      </div>
    </div>
  );
};

export default memo(FriendCard);

