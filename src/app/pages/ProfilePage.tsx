import { GlassCard } from "@/components/common/GlassCard";
import { Bookmark, FileText, Mail, Users, X } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);

  const handleZoom = () =>{
    setOpen((prev) => !prev)
  }
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        {/* Cover */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow sm:rounded-[28px]">
          <div className="relative h-44 bg-gradient-to-r from-slate-900 via-blue-900 to-blue-400 sm:h-52 lg:h-60">
            {/* Add cover */}
            <label className="absolute right-3 top-3 cursor-pointer rounded-lg bg-black/50 px-3 py-1 text-xs font-bold text-white">
              Add cover
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
            <GlassCard className="border border-white/60 bg-white/92 p-5  backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-end gap-4">
                    <div className="group/avatar relative shrink-0">
                      <button
                        type="button"
                        className="cursor-pointer rounded-full"
                      >
                        <img
                          alt="Galal"
                          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                        />
                      </button>
                      <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                        📷
                        <input type="file" className="hidden" />{" "}
                      </label>
                      <button
                        type="button"
                        onClick={handleZoom}
                        className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                        title="View profile photo"
                        aria-label="View profile photo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-expand"
                          aria-hidden="true"
                        >
                          <path d="m15 15 6 6" />
                          <path d="m15 9 6-6" />
                          <path d="M21 16v5h-5" />
                          <path d="M21 8V3h-5" />
                          <path d="M3 16v5h5" />
                          <path d="m3 21 6-6" />
                          <path d="M3 8V3h5" />
                          <path d="M9 9 3 3" />
                        </svg>
                      </button>
                    </div>
                    <div className="min-w-0 pb-1">
                      <h2 className="text-2xl font-black sm:text-4xl">Galal</h2>
                      <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                        @galalmohamed
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-users"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <circle cx={9} cy={7} r={4} />
                        </svg>
                        Route Posts member
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 lg:w-[500px]">
                  {[
                    { label: "Followers", value: 7 },
                    { label: "Following", value: 3 },
                    { label: "Bookmarks", value: 0 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border bg-white p-3 text-center"
                    >
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-2xl font-black">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* About */}
              <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                <GlassCard className="bg-slate-50 p-4">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    About
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Mail width={15} height={15} />
                      gm3308769@gmail.com
                    </p>
                    <p className="flex items-center gap-2">
                      <Users width={15} height={15} />
                      Active on Route Posts
                    </p>
                  </div>
                </GlassCard>

                <div className="grid gap-3">
                  <GlassCard className="border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      My posts
                    </p>
                    <p className="mt-1 text-xl font-black text-slate-900">0</p>
                  </GlassCard>
                  <GlassCard className="border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      Saved posts
                    </p>
                    <p className="mt-1 text-xl font-black text-slate-900">0</p>
                  </GlassCard>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Tabs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1.5">
              <button className="flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-600 cursor-pointer">
                <FileText width={15} height={15} />
                My Posts
              </button>

              <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer">
                <Bookmark width={15} height={15} />
                Saved
              </button>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
              0
            </span>
          </div>

          {/* Empty */}
          <p className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-500">
            You have not posted yet.
          </p>
        </section>
        <div className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8 lg:p-12 ${open ? 'block' : 'hidden'}`}>
          <button
            type="button"
            onClick={handleZoom}
            className="cursor-pointer absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <img
            alt="Galal profile photo"
            className="max-h-full max-w-full object-contain"
            src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
          />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

{
  /* Profile Info */
}
// <div className="-mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 z-10">
//   <div className="rounded-3xl bg-white p-5 sm:p-7">

//     <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

//       {/* User */}
//       <div className="flex items-end gap-4">

//         {/* Avatar */}
//         <div className="relative">
//           <img
//             src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
//             className="h-28 w-28 rounded-full border-4 border-white"
//           />

//           <label className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-blue-600 p-2 text-white">
//             📷
//             <input type="file" className="hidden" />
//           </label>
//         </div>

//         {/* Name */}
//         <div>
//           <h2 className="text-2xl font-black sm:text-4xl">
//             Galal
//           </h2>
//           <p className="text-slate-500">@galalmohamed</p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-2 lg:w-[500px]">
//         {[
//           { label: "Followers", value: 7 },
//           { label: "Following", value: 3 },
//           { label: "Bookmarks", value: 0 },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="rounded-2xl border bg-white p-3 text-center"
//           >
//             <p className="text-xs text-slate-500">
//               {item.label}
//             </p>
//             <p className="text-2xl font-black">
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>

//   </div>
// </div>
