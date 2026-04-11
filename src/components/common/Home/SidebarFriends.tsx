import { useState, useMemo } from "react";
import { Users, Search } from "lucide-react";
import FriendCard from "../FriendCard";

export default function SidebarFriends() {
  const [search, setSearch] = useState("");

  const users = useMemo(
    () => [
      {
        id: 1,
        name: "Ahmed Abd Al-Muti",
        username: "ahmedmutti",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775310477363-9f97d1ff-699a-4b66-a04f-bd6dee14d2b7-496835614_1859398661547861_5183785968671576388_n.webp",
        followers: 15,
      },
      {
        id: 2,
        name: "Alaa Ashraf",
        username: "alaaashraf",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775412292104-abcb6dbf-b0cd-4392-8084-3dc4d79abf8d-profile.webp",
        followers: 7,
      },
      {
        id: 3,
        name: "MrMo",
        username: "mrmo",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775481389234-6864d396-b531-4836-be61-ce6ca8afc277-profile.webp",
        followers: 6,
      },
      {
        id: 4,
        name: "menna",
        username: "gbngssssb",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        followers: 5,
      },
      {
        id: 5,
        name: "Jade",
        username: "jade",
        avatar:
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        followers: 5,
      },
    ],
    [],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, users]);

  return (
    <aside className="hidden xl:block sticky top-[84px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-[#1877f2]" size={18} />
            <h3 className="text-base font-extrabold">Suggested Friends</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 text-xs font-bold">
            {filteredUsers.length}
          </span>
        </div>

        {/* Search */}
        <div className="mb-3 relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1877f2]"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <FriendCard key={user.id} user={user} />
          ))}
        </div>

        {/* View More */}
        <button className="cursor-pointer mt-3 w-full rounded-xl border bg-slate-50 px-3 py-2 text-sm font-bold hover:bg-slate-100">
          View more
        </button>
      </div>
    </aside>
  );
}
