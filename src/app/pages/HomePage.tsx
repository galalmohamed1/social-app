import { GlassCard } from "@/components/common/GlassCard";
import type { Asideleft, Post, Users } from "@/types/Note";
import { Bookmark, Earth, Newspaper, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionHome from "../../components/common/Home/SectionHome";
import SidebarButton from "@/components/common/Home/SidebarButton";
import SidebarFriends from "@/components/common/Home/SidebarFriends";
import useNotesAPI from "@/hooks/useNotesAPI";
import PageLoader from "@/components/common/PageLoader";

export default function HomePage() {
  const [isActive, setIsActive] = useState<Asideleft>("feed");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<Users | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const { getMyProfileData, getAllPosts } = useNotesAPI();

  const handleside = (mode: Asideleft) => {
    setIsActive(mode);
  };

  const feedOnly = useMemo<"all" | "me" | "following">(() => {
    if (isActive === "myposts") return "me";
    if (isActive === "community") return "following";
    return "all";
  }, [isActive]);

  const normalizePosts = useCallback(
    (items: Post[]) =>
      items.map((post) => ({
        ...post,
        liked: post.likes?.includes(profileData?._id || "") || false,
      })),
    [profileData?._id],
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfileData();
        if (data) {
          setProfileData(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      if (!profileData?._id) return;

      setIsPostsLoading(true);

      const allposts = await getAllPosts(feedOnly, 1, 5);

      if (allposts && allposts.length > 0) {
        setPosts(normalizePosts(allposts));
        setHasMore(allposts.length === 5);
      } else {
        setPosts([]);
        setHasMore(false);
      }

      setPage(1);
      setIsPostsLoading(false);
    };

    fetchInitialPosts();
  }, [feedOnly, getAllPosts, normalizePosts, profileData?._id]);

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || !hasMore || isActive === "saved") return;

    setIsLoadingMore(true);

    const nextPage = page + 1;
    const morePosts = await getAllPosts(feedOnly, nextPage, 5);

    if (morePosts && morePosts.length > 0) {
      const updatedPosts = normalizePosts(morePosts);

      setPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post._id || post.id));
        const uniqueNewPosts = updatedPosts.filter(
          (post) => !existingIds.has(post._id || post.id),
        );

        return [...prev, ...uniqueNewPosts];
      });

      setHasMore(morePosts.length === 5);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }

    setIsLoadingMore(false);
  }, [
    feedOnly,
    getAllPosts,
    hasMore,
    isActive,
    isLoadingMore,
    normalizePosts,
    page,
  ]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore || isPostsLoading || isActive === "saved") return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, isActive, isLoadingMore, isPostsLoading, loadMorePosts],
  );

  const filteredPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    if (isActive === "saved") {
      return posts.filter((post) => post.bookmarked === true);
    }

    return posts;
  }, [isActive, posts]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
      <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
        <GlassCard className="p-3 text-sm shadow-sm">
          <SidebarButton
            active={isActive === "feed"}
            onClick={() => handleside("feed")}
            icon={<Newspaper />}
            label="Feed"
          />
          <SidebarButton
            active={isActive === "myposts"}
            onClick={() => handleside("myposts")}
            icon={<Sparkles />}
            label="My Posts"
          />
          <SidebarButton
            active={isActive === "community"}
            onClick={() => handleside("community")}
            icon={<Earth />}
            label="Community"
          />
          <SidebarButton
            active={isActive === "saved"}
            onClick={() => handleside("saved")}
            icon={<Bookmark />}
            label="Saved"
          />
        </GlassCard>
      </aside>
      <section className="space-y-4">
        <GlassCard className="p-2 shadow-sm xl:hidden">
          <div className="grid grid-cols-2 gap-2">
            <SidebarButton
              active={isActive === "feed"}
              onClick={() => handleside("feed")}
              icon={<Newspaper />}
              label="Feed"
            />
            <SidebarButton
              active={isActive === "myposts"}
              onClick={() => handleside("myposts")}
              icon={<Sparkles />}
              label="My Posts"
            />
            <SidebarButton
              active={isActive === "community"}
              onClick={() => handleside("community")}
              icon={<Earth />}
              label="Community"
            />
            <SidebarButton
              active={isActive === "saved"}
              onClick={() => handleside("saved")}
              icon={<Bookmark />}
              label="Saved"
            />
          </div>
        </GlassCard>
        <SectionHome
          profileData={profileData}
          setprofileData={setProfileData}
          posts={filteredPosts}
          setPosts={setPosts}
          isPostsLoading={isPostsLoading}
          isLoadingMore={isLoadingMore}
          lastPostRef={lastPostRef}
        />
      </section>

      <SidebarFriends />
    </div>
  );
}
