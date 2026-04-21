/* eslint-disable react-hooks/preserve-manual-memoization */
import { GlassCard } from "@/components/common/GlassCard";
import PageLoader from "@/components/common/PageLoader";
import PostsSkeleton from "@/components/common/PostsSkeleton";
import PostsProfile from "@/components/common/Profile/PostsProfile";
import useNotesAPI from "@/hooks/useNotesAPI";
import type { Post, Users } from "@/types/Note";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UserProfilePage = () => {
    const { userId } = useParams();
  
  const [open, setOpen] = useState(false);
  //   const [active, setActive] = useState<buttonProfile>("MyPosts");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<Users | null>(null);
  const [getallposts, setGetAllPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const { getAllPostsProfile, getUserProfileData, followAndUnfollow } = useNotesAPI();
  const navigate = useNavigate();

  useEffect(() => {
  const fetchMyPosts = async () => {
    if (!userId) return;
    setIsPostsLoading(true);

    const allposts = await getAllPostsProfile(userId);

    if (allposts) {
      setGetAllPosts(allposts);
      console.log("allposts from api:", allposts);
    } else {
      setGetAllPosts([]);
    }

    setIsPostsLoading(false);
  };

  fetchMyPosts();
}, [getAllPostsProfile,userId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      const data = await getUserProfileData(userId);
      setProfileData(data);
      setIsLoading(false);
    };

    fetchUserProfile();
  }, [userId, getUserProfileData]);

  const filteredPosts = useMemo(() => {
  if (!Array.isArray(getallposts)) return [];
  if (!profileData?._id) return [];

  return getallposts.filter((post) => post.user?._id === profileData._id);
}, [getallposts, profileData?._id]);


  const handleZoom = () => {
    setOpen((prev) => !prev);
  };

  const handleback = () => {
    navigate(-1);
  };

  const handleFollow = async (userId: string) => {
  const result = await followAndUnfollow(userId);

  if (result !== null) {
  setProfileData((prev) =>
    prev && {
      ...prev,
      isFollowing: result,
      followersCount: result
        ? (prev.followersCount || 0) + 1
        : Math.max((prev.followersCount || 0) - 1, 0),
    }
  );
}
};

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <button
          onClick={handleback}
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-left"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          Back
        </button>
        {/* Cover */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow sm:rounded-[28px]">
          {profileData?.cover ? (
            <div
              className="h-48 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]"
            >
                <img src={profileData?.cover} alt={profileData?.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-48 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]"></div>
          )}

          <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
            <GlassCard className="border border-white/60 bg-white/92 p-5  backdrop-blur-xl sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-white/70 bg-white/95 p-4">
                  <div className="flex items-end gap-3">
                    <div className="group/avatar relative shrink-0">
                      <button
                        type="button"
                        className="cursor-pointer rounded-full"
                      >
                        <img
                          alt={profileData?.name}
                          className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                          src={profileData?.photo}
                        />
                      </button>
                    </div>
                    <div className="min-w-0 pb-1">
                      <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                        {profileData?.name}
                      </h2>
                      <p className="text-sm font-semibold text-slate-500 sm:text-base">
                        {profileData?.username}
                      </p>
                    </div>
                </div>
                    <button
                      type="button"
                      onClick={()=>handleFollow(profileData?._id || "")}
                      className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto bg-[#1877f2] text-white hover:bg-[#166fe5]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-user-plus"
                        aria-hidden="true"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <line x1="19" x2="19" y1="8" y2="14"></line>
                        <line x1="22" x2="16" y1="11" y2="11"></line>
                      </svg>
                      {profileData?.isFollowing ? "Following" : "Follow"}
                    </button>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Tabs */}
        <section className="space-y-4">
          {/* Empty */}
          {isPostsLoading ? (
            <PostsSkeleton />
          ) : filteredPosts?.length > 0 ? (
            filteredPosts.map((post) => {
              const postId = post.id || post._id;
              const images = Array.isArray(post.image)
                ? post.image
                : post.image
                  ? [post.image]
                  : [];
              return (
                <PostsProfile
                  key={postId}
                  post={post}
                  postId={postId}
                  images={images}
                />
              );
            })
          ) : (
            <p className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-500">
              You have not posted yet.
            </p>
          )}
        </section>
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8 lg:p-12 ${open ? "block" : "hidden"}`}
        >
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
            src={profileData?.photo}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useNotesAPI from "@/hooks/useNotesAPI";
// import type { Users } from "@/types/Note";

// export default function UserProfilePage() {
//   const { userId } = useParams();
//   const { getUserProfileData } = useNotesAPI();
//   const [profileData, setProfileData] = useState<Users | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!userId) return;

//       setIsLoading(true);
//       const data = await getUserProfileData(userId);
//       setProfileData(data);
//       setIsLoading(false);
//     };

//     fetchUserProfile();
//   }, [userId, getUserProfileData]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{profileData?.name}</h1>
//       <p>@{profileData?.username}</p>
//       <img src={profileData?.photo} alt={profileData?.name} />
//     </div>
//   );
// }