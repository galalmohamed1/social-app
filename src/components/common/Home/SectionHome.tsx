import { GlassCard } from "@/components/common/GlassCard";
import SidebarButton from "@/components/common/Home/SidebarButton";
import type { Asideleft, Post, Privacy, Users } from "@/types/Note";
import {
  Bookmark,
  Earth,
  Lock,
  Newspaper,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import PostsSection from "./PostsSection";
import PrograssPost from "../PrograssPost";
import useNotesAPI from "@/hooks/useNotesAPI";
import PostsSkeleton from "../PostsSkeleton";
import { Bounce, toast } from "react-toastify";

type Props = {
  profileData: Users | null;
};

const SectionHome = ({ profileData }: Props) => {
  const [isActive, setIsActive] = useState("feed");
  const [privacy, setPrivacy] = useState<Privacy>("public");
  const [postText, setPostText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const { createPost, getAllPosts, deletePost } = useNotesAPI();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [getallposts, setGetAllPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const fetchAllPosts = async () => {
      setIsPostsLoading(true);
      const allposts = await getAllPosts();
      if (allposts) {
        // console.log("All posts:", allposts);
        setGetAllPosts(allposts);
        setIsPostsLoading(false);
      }
    };

    fetchAllPosts();
  }, [getAllPosts]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...files]);
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove) URL.revokeObjectURL(imageToRemove);
      return prev.filter((_, i) => i !== index);
    });

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!postText.trim() && selectedImages.length === 0) return;

    setIsPublishing(true);
    setPublishProgress(0);

    const formData = new FormData();
    formData.append("body", postText);
    formData.append("privacy", privacy);

    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    const result = await createPost(formData);
    if (!result) {
      setIsPublishing(false);
      setPublishProgress(0);
      return;
    }
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;

      if (progress >= 100) {
        setPublishProgress(progress);
        clearInterval(interval);

        setTimeout(async () => {
          const allposts = await getAllPosts();
          if (allposts) {
            setGetAllPosts(allposts);
          }
          setIsPublishing(false);
          setPublishProgress(0);
          setPostText("");
          selectedImages.forEach((url) => URL.revokeObjectURL(url));
          setSelectedImages([]);
          setImageFiles([]);
        }, 300);
      } else {
        setPublishProgress(progress);
      }
    }, 200);
  };

  const handledelete = async (postId: string) => {
    const result = await deletePost(postId);
    if (result) {
      setGetAllPosts((prev) =>
        prev.filter((post) => (post._id || post.id) !== postId),
      );
      toast.success("Delete successful ✅", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } else {
      toast.error("Delete failed ❌", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  const renderIcon = () => {
    switch (privacy) {
      case "public":
        return <Earth width={12} height={12} />;
      case "following":
        return <UsersRound width={12} height={12} />;
      case "only_me":
        return <Lock width={12} height={12} />;
      default:
        return null;
    }
  };
  const handleside = (mode: Asideleft) => {
    if (mode === "feed") {
      setIsActive("feed");
    } else if (mode === "myposts") {
      setIsActive("myposts");
    } else if (mode === "community") {
      setIsActive("community");
    } else if (mode === "saved") {
      setIsActive("saved");
    }
  };

  const handleEmojy = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-emojy-menu]")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
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
      <div className="space-y-3 xl:hidden">
        <button
          type="button"
          className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
        >
          <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users text-[#1877f2]"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx={9} cy={7} r={4} />
            </svg>
            Suggested Friends
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
              5
            </span>
            <span className="text-xs font-bold text-[#1877f2]">Show</span>
          </span>
        </button>
      </div>
      <GlassCard className="p-4 shadow-sm">
        <div className="mb-3 flex items-start gap-3">
          <img
            alt={profileData?.name}
            className="h-11 w-11 rounded-full object-cover"
            src={profileData?.photo}
          />
          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900">
              {profileData?.name}
            </p>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
              {renderIcon()}
              <select
                value={privacy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPrivacy(e.target.value as Privacy)
                }
                className="bg-transparent outline-none"
              >
                <option value="public">Public</option>
                <option value="following">Followers</option>
                <option value="only_me">Only me</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative">
          <textarea
            rows={4}
            ref={textareaRef}
            placeholder="What's on your mind, Galal?"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
            // defaultValue={""}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="relative mt-3">
            {selectedImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white "
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="h-40 w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="relative flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image text-emerald-600"
                aria-hidden="true"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                <circle cx={9} cy={9} r={2} />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="hidden sm:inline">Photo/video</span>
              <input
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleImageChange}
              />
            </label>
            <button
              type="button"
              onClick={handleEmojy}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-smile text-amber-500"
                aria-hidden="true"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1={9} x2="9.01" y1={9} y2={9} />
                <line x1={15} x2="15.01" y1={9} y2={9} />
              </svg>
              <span className="hidden sm:inline">Feeling/activity</span>
            </button>
            <div className="absolute left-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div>
                <EmojiPicker
                  data-emojy-menu
                  open={open}
                  onEmojiClick={(emojiData) => {
                    const newText =
                      (textareaRef.current?.value || "") + emojiData.emoji;

                    if (textareaRef.current) {
                      textareaRef.current.value = newText;
                      textareaRef.current.focus();
                    }

                    setPostText(newText);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCreatePost}
              disabled={postText.trim() === "" && selectedImages.length === 0}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
            >
              Post
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
                className="lucide lucide-send"
                aria-hidden="true"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            </button>
          </div>
        </div>
      </GlassCard>
      <div className="space-y-4">
        {isPublishing && (
          <PrograssPost
            publishProgress={publishProgress}
            postText={postText}
            profileData={profileData}
          />
        )}
        {isPostsLoading ? (
          <PostsSkeleton />
        ) : getallposts?.length > 0 ? (
          getallposts.map((post) => {
            const postId = post.id || post._id;
            const images = Array.isArray(post.image)
              ? post.image
              : post.image
                ? [post.image]
                : [];
            return (
              <PostsSection
                key={postId}
                post={post}
                postId={postId}
                images={images}
                profileId={profileData?._id}
                handledelete={() => handledelete(postId)}
              />
            );
          })
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
            No posts yet. Be the first one to publish.
          </div>
        )}
      </div>
    </section>
  );
};
export default memo(SectionHome);
