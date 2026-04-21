import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Home, User } from "lucide-react";
import type { Tab } from "@/types/Note";
import { useEffect, useState } from "react";
import useAuthAPI from "@/hooks/useAuthAPI";
// import useNotesAPI from "@/hooks/useNotesAPI";

const tabs: Tab[] = [
  { name: "Feed", path: "/", icon: Home },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Notifications", path: "/notifications", icon: MessageCircle },
];
type Props= {
  count: number
}
export default function Header({count}:Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeIndex = tabs.findIndex((tab) => tab.path === location.pathname);
  const isNotifications = location.pathname === "/notifications";
  const { logOut } = useAuthAPI();
 
  const handleback = () => {
    navigate("/");
  };

  const handlelogout = () => {
    logOut();
    navigate("/auth", { replace: true });
  };
  const handlegoprofile = () => {
    navigate("/profile");
  };

  const handlemenu = () => {
    setShowMenu((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-user-menu]")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("count: ", count);
  

  return (
    <div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleback}
        >
          <img
            alt="Route Posts"
            className="h-9 w-9 rounded-xl object-cover"
            src="/src/assets/route.png"
          />
          <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
            Route Posts
          </p>
        </div>
        <nav className="relative flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <motion.div
            layoutId="activeTab"
            className="absolute top-1 bottom-1 rounded-xl bg-white shadow-sm hidden sm:block"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              width: isNotifications
                ? `${110 / tabs.length}%`
                : `${75 / tabs.length}%`,

              left: `${activeIndex * (90 / tabs.length)}%`,
            }}
          />
          <motion.div
            layoutId="activeTab"
            className="absolute top-1 bottom-1 rounded-xl bg-white shadow-sm block sm:hidden"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              width: `${80 / tabs.length}%`,

              left: isNotifications
                ? `${activeIndex * (104 / tabs.length)}%`
                : `${activeIndex * (110 / tabs.length)}%`,
            }}
          />

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            const isNotificationTab = tab.path === "/notifications";

            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="relative z-10 flex flex-1 items-center justify-center gap-2 px-4 py-2 font-bold transition-all duration-300"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    rotate: isActive ? 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative ${isActive ? "text-[#1f6fe5]" : "text-slate-600"}`}
                >
                  <Icon size={18} />

                  {isNotificationTab && count > 0 && (
                    <span className="absolute -right-1 -top-2 inline-flex min-w-[10px] items-center justify-center rounded-full bg-[#ef4444] px-0.5 text-[8px] font-black leading-4 text-white">
                      {count}
                    </span>
                  )}
                </motion.div>

                <span
                  className={`hidden text-sm sm:inline ${
                    isActive ? "text-[#1f6fe5]" : "text-slate-600"
                  }`}
                >
                  {tab.name}
                </span>

                <span className="sr-only sm:hidden">{tab.name}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="relative" data-user-menu>
          <button
            onClick={handlemenu}
            className="cursor-pointer flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100"
          >
            <img
              alt="Galal"
              className="h-8 w-8 rounded-full object-cover"
              src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            />
            <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-800 md:block">
              Galal
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu text-slate-500"
              aria-hidden="true"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg block">
              <button
                onClick={handlegoprofile}
                className="flex cursor-pointer w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </button>
              <button className="flex cursor-pointer w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-settings"
                  aria-hidden="true"
                >
                  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Settings
              </button>
              <div className="my-1 border-t border-slate-200"></div>
              <button
                onClick={handlelogout}
                className="flex cursor-pointer w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
