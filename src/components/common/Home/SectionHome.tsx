// import { GlassCard } from "@/components/common/GlassCard";
import type { Post, Privacy, Users } from "@/types/Note";
import { Earth, Lock, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useNotesAPI from "@/hooks/useNotesAPI";
import PostsSection from "./PostsSection";
import PostsSkeleton from "../PostsSkeleton";
import PrograssPost from "../PrograssPost";
import CreatePostCard from "./CreatePostCard";

type Props = {
  profileData: Users | null;
  setprofileData: React.Dispatch<React.SetStateAction<Users | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  isPostsLoading: boolean;
  isLoadingMore: boolean;
  lastPostRef: (node: HTMLDivElement | null) => void;
};

export default function SectionHome({
  profileData,
  setprofileData,
  posts,
  setPosts,
  isPostsLoading,
  isLoadingMore,
  lastPostRef,
}: Props) {
  const [privacy, setPrivacy] = useState<Privacy>("public");
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [publishingText, setPublishingText] = useState("");
  const [publishingImages, setPublishingImages] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { createPost, deletePost, updatePost } = useNotesAPI();

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

  const renderIcon = () => {
    switch (privacy) {
      case "public":
        return <Earth width={12} height={12} />;
      case "following":
        return <UsersRound width={12} height={12} />;
      case "only_me":
        return <Lock width={12} height={12} />;
      default:
        return <Earth width={12} height={12} />;
    }
  };

  const handleEmojy = () => {
    setOpen((prev) => !prev);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (selectedImages[0]) {
      URL.revokeObjectURL(selectedImages[0]);
    }

    const imageUrl = URL.createObjectURL(file);

    setImageFiles([file]);
    setSelectedImages([imageUrl]);
  };
  const handleDeleteImage = () => {
    if (selectedImages[0]) {
      URL.revokeObjectURL(selectedImages[0]);
    }

    setSelectedImages([]);
    setImageFiles([]);
  };

  const handleCreatePost = async () => {
    const currentText = textareaRef.current?.value || postText;

    if (!currentText.trim() && selectedImages.length === 0) return;

    const currentImages = [...selectedImages];
    const currentFiles = [...imageFiles];

    setPublishingText(currentText);
    setPublishingImages(currentImages);
    setIsPublishing(true);
    setPublishProgress(0);

    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;

      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }

      setPublishProgress(progress);
    }, 250);

    const formData = new FormData();
    formData.append("body", currentText);
    formData.append("privacy", privacy);

    currentFiles.forEach((file) => {
      formData.append("image", file);
    });

    const result = await createPost(formData);

    clearInterval(interval);

    if (!result) {
      setIsPublishing(false);
      setPublishProgress(0);
      setPublishingText("");
      setPublishingImages([]);
      return;
    }

    const newPost = {
      ...result,
      user: {
        ...profileData!,
        _id: profileData?._id || "",
        id: profileData?.id || profileData?._id || "",
      },
      liked: result.likes?.includes(profileData?._id || "") || false,
      commentsCount: result.commentsCount || 0,
      sharesCount: result.sharesCount || 0,
    };

    setPublishProgress(100);

    setTimeout(() => {
      setPosts((prev) => [newPost, ...prev]);

      setIsPublishing(false);
      setPublishProgress(0);
      setPublishingText("");
      setPublishingImages([]);

      setPostText("");

      if (textareaRef.current) {
        textareaRef.current.value = "";
      }

      currentImages.forEach((url) => URL.revokeObjectURL(url));
      setSelectedImages([]);
      setImageFiles([]);
    }, 400);
  };

  const handledelete = async (postId: string) => {
    const deletedPost = posts.find((post) => (post._id || post.id) === postId);
    const wasSaved = deletedPost?.bookmarked === true;

    const result = await deletePost(postId);

    if (result) {
      if (wasSaved) {
        setprofileData((prev) =>
          prev
            ? {
                ...prev,
                bookmarksCount: Math.max((prev.bookmarksCount || 0) - 1, 0),
              }
            : prev,
        );
      }

      setPosts((prev) =>
        prev.filter((post) => (post._id || post.id) !== postId),
      );
    }
  };

  const handleChangePrivacy = async (
  postId: string,
  newPrivacy: Privacy,
  currentBody: string
) => {
  setPrivacy(newPrivacy);

  const result = await updatePost(postId, currentBody, newPrivacy);

  if (result) {
    setPosts((prev) =>
      prev.map((post) =>
        (post._id || post.id) === postId
          ? {
                ...post,
                ...result,
                user: {
                  ...profileData!,
                  _id: profileData?._id || "",
                   id: profileData?._id || profileData?.id || "",
                },
                liked: result.likes?.includes(profileData?._id || profileData?.id || "") || false,
              }
          : post
      )
    );
  }
};

  const handleEditPost = async (
    postId: string,
    body: string,
    privacy: string,
  ) => {
    const result = await updatePost(postId, body, privacy);

    if (result) {
      setPosts((prev) =>
        prev.map((post) =>
          (post._id || post.id) === postId
            ? {
                ...post,
                ...result,
                user: {
                  ...profileData!,
                  _id: profileData?._id || "",
                   id: profileData?._id || profileData?.id || "",
                },
                liked: result.likes?.includes(profileData?._id || profileData?.id || "") || false,
              }
            : post,
        ),
      );
    }
  };

  return (
    <>
      <CreatePostCard
        profileData={profileData}
        privacy={privacy}
        setPrivacy={setPrivacy}
        postText={postText}
        setPostText={setPostText}
        selectedImages={selectedImages}
        handleDeleteImage={handleDeleteImage}
        handleImageChange={handleImageChange}
        handleEmojy={handleEmojy}
        handleCreatePost={handleCreatePost}
        renderIcon={renderIcon}
        open={open}
        textareaRef={textareaRef}
      />

      {isPublishing && (
        <PrograssPost
          publishProgress={publishProgress}
          postText={publishingText}
          publishingImages={publishingImages}
          profileData={profileData}
        />
      )}

      {isPostsLoading ? (
        <PostsSkeleton />
      ) : posts.length > 0 ? (
        <>
          {posts.map((post, index) => {
            const postId = post.id || post._id;
            const images = Array.isArray(post.image)
              ? post.image
              : post.image
                ? [post.image]
                : [];

            const isLastPost = index === posts.length - 1;

            return (
              <div key={postId} ref={isLastPost ? lastPostRef : null}>
                <PostsSection
                  post={post}
                  postId={postId}
                  images={images}
                  profileId={profileData?._id}
                  handledelete={() => handledelete(postId)}
                  setPosts={setPosts}
                  handleEditPost={() =>
                    handleEditPost(postId, post.body, post.privacy)
                  }
                  handleChangePrivacy={(newPrivacy) =>
                    handleChangePrivacy(postId, newPrivacy, post.body)
                  }
                />
              </div>
            );
          })}

          {isLoadingMore && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm font-semibold text-slate-500 shadow-sm">
              Loading more posts...
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          No posts yet. Be the first one to publish.
        </div>
      )}
    </>
  );
}
