import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Earth,
  UsersRound,
  Lock,
  Ellipsis,
  Bookmark,
  Trash2,
  Pencil,
  Trash2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Post, Privacy } from "@/types/Note";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import PostTime from "@/components/note/PostTime";
import useNotesAPI from "@/hooks/useNotesAPI";
import { Bounce, toast } from "react-toastify";
import SharePost from "./SharePost";
import { useNavigate } from "react-router-dom";
import CommentList from "../comment/CommentList";

type Props = {
  post: Post;
  images: string[];
  postId: string;
  profileId: string | undefined;
  handledelete: (postId: string) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  handleEditPost: (postId: string, body: string, privacy: string) => void;

  handleChangePrivacy: (newPrivacy: Privacy) => void;
};

function PostsSection({
  post,
  images,
  postId,
  profileId,
  handledelete,
  setPosts,
  handleEditPost,
  handleChangePrivacy,
}: Props) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [openedCommentPostId, setOpenedCommentPostId] = useState<string | null>(
    null,
  );
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [openShareModal, setOpenShareModal] = useState(false);
  const [selectedSharePostId, setSelectedSharePostId] = useState<string | null>(
    null,
  );
  const [sharePreviewPost, setSharePreviewPost] = useState<Post | null>(null);
  const [shareText, setShareText] = useState("");
  const [postText, setPostText] = useState("");
  const [privacy, setPrivacy] = useState<Privacy>(post.privacy as Privacy);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { savePost, likePost, sharePost,createComment } = useNotesAPI();

  const navigate = useNavigate();

  const isLiked = post.liked;
  const isMyPost = post.user?._id === profileId;
  const isMenuOpen = selectedPostId === postId;

  const handleChangePost = (postId: string) => {
    setSelectedPostId((prev) => (prev === postId ? null : postId));
  };

  const handleSave = async (postId: string) => {
    setIsSaveLoading(true);
    const result = await savePost(postId);

    if (result) {
      setPosts((prev) =>
        prev.map((post) =>
          (post._id || post.id) === postId
            ? { ...post, bookmarked: !post.bookmarked }
            : post,
        ),
      );
      setSelectedPostId(null);
      setIsSaveLoading(false);
    }
  };

  const handleToggleLike = async (postId: string) => {
    setIsLikeLoading(true);

    const result = await likePost(postId);

    if (result) {
      const liked = result.data.liked;
      const likesCount = result.data.likesCount;

      setPosts((prev) =>
        prev.map((post) =>
          (post._id || post.id) === postId
            ? {
                ...post,
                liked: liked,
                likesCount: likesCount,
              }
            : post,
        ),
      );
    }

    setSelectedPostId(null);
    setIsLikeLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-post-menu]")) {
        setSelectedPostId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderIcon = (privacy?: string) => {
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
  const handleToggleComments = (postId: string) => {
    setOpenedCommentPostId((prev) => (prev === postId ? null : postId));
  };
  const handleShare = async () => {
    if (!selectedSharePostId) return;

    const result = await sharePost(selectedSharePostId, shareText);

    if (result) {
      setPosts((prev) => [result, ...prev]);
      handleCloseShareModal();

      toast.success("Post shared successfully ✅", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } else {
      toast.error("Share failed ❌", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };
  const handleCloseShareModal = () => {
    setOpenShareModal(false);
    setSelectedSharePostId(null);
    setSharePreviewPost(null);
    setShareText("");
  };
  const handleOpenShareModal = useCallback((post: Post) => {
    const postId = post.id || post._id;

    setSelectedSharePostId(postId);
    setSharePreviewPost(post);
    setShareText("");
    setOpenShareModal(true);
  }, []);

  const handleOpenEdit = () => {
    setIsOpenEdit((prev) => !prev);
    setPostText(post.body || "");
  };

  const handleAddComment = async (postId: string, text: string) => {
  const result = await createComment(postId, text);

  if (result) {
    // setComments((prev) => [result, ...prev]);
  }
};
  return (
    <>
      <article
        key={postId}
        className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img
              alt={post?.user?.name}
              className="h-11 w-11 rounded-full object-cover"
              src={post?.user.photo}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span className="font-extrabold text-foreground">
                  <button onClick={() => navigate(`/profile/${post.user._id}`)} className="cursor-pointer">
                    {post?.user?.name}
                  </button>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                {<span>{post?.user.username}</span>}
                {post?.user.username && <span>·</span>}

                <button
                  type="button"
                  className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                >
                  {post.createdAt ? (
                    <PostTime createdAt={post.createdAt} />
                  ) : (
                    "Just now"
                  )}
                </button>

                <span className="mx-1">·</span>

                <span className="inline-flex items-center gap-1">
                  {profileId === post.user?._id ? (
                    <>
                      {renderIcon(post.privacy)}
                      <select
                        value={post.privacy}
                        onChange={(e) => {
                          handleChangePrivacy(e.target.value as Privacy);
                          setPrivacy(e.target.value as Privacy);
                        }}
                        className="bg-transparent outline-none"
                      >
                        <option value="public">Public</option>
                        <option value="following">Followers</option>
                        <option value="only_me">Only me</option>
                      </select>
                    </>
                  ) : (
                    <>
                      {renderIcon(post.privacy)}
                      {post.privacy}
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="relative" data-post-menu>
              <button
                onClick={() => handleChangePost(postId)}
                className="cursor-pointer rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                <Ellipsis size={18} />
              </button>

              <div
                className={`absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => handleSave(postId)}
                  className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Bookmark size={15} />

                  {post.bookmarked
                    ? isSaveLoading
                      ? "Unsave Loading..."
                      : "Unsave post"
                    : isSaveLoading
                      ? "Save Loading..."
                      : "Save post"}
                </button>

                {isMyPost && (
                  <>
                    <button
                      onClick={handleOpenEdit}
                      className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil size={15} />
                      Edit post
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50">
                          <Trash2 size={15} />
                          Delete post
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                          </AlertDialogMedia>
                          <AlertDialogTitle>Delete post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this Post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            variant="outline"
                            className="cursor-pointer"
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() => handledelete(postId)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </div>
          </div>
          {isOpenEdit ? (
            <div className="mt-3">
              <textarea
                ref={textareaRef}
                value={postText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setPostText(e.target.value)
                }
                placeholder="What's on your Edit"
                className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2"
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsOpenEdit((e) => !e)}
                  className="cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEditPost(postId, postText, privacy)}
                  className="cursor-pointer rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] disabled:opacity-60"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            post.body && (
              <div className="mt-3">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {post.body}
                </p>
              </div>
            )
          )}

          {post.bookmarked && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-2.5 py-1 text-[11px] font-bold text-[#1877f2]">
              <Bookmark size={15} />
              Saved
            </div>
          )}
        </div>
        {post.isShare && post.sharedPost && (
          <div className="mt-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 m-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.sharedPost.user?.photo}
                  alt={post.sharedPost.user?.name}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                  <h4 className="text-[18px] font-extrabold text-slate-900">
                    {post.sharedPost.user?.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    @{post.sharedPost.user?.username}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="text-[15px] font-extrabold text-[#1877f2] hover:underline"
              >
                Original Post
              </button>
            </div>

            {post.sharedPost.body && (
              <p className="mt-5 whitespace-pre-wrap text-[17px] leading-relaxed text-slate-900">
                {post.sharedPost.body}
              </p>
            )}

            {post.sharedPost.image && (
              <div className="mt-4 overflow-visible rounded-2xl border border-slate-200 bg-white">
                <img
                  src={
                    Array.isArray(post.sharedPost.image)
                      ? post.sharedPost.image[0]
                      : post.sharedPost.image
                  }
                  alt="Shared post"
                  className="max-h-[560px] w-full object-cover"
                />
              </div>
            )}
          </div>
        )}

        {images.length > 0 && (
          <div className="max-h-[620px] overflow-hidden border-y border-slate-200">
            <img src={images[0]} alt="post" className="w-full object-cover" />
          </div>
        )}

        <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                <ThumbsUp size={12} />
              </span>

              <button
                type="button"
                className="cursor-pointer font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline"
              >
                {post.likesCount} likes
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <span>{post.sharesCount} shares</span>
              <span>{post.commentsCount} comments</span>

              <button className="cursor-pointer rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                View details
              </button>
            </div>
          </div>
        </div>

        <div className="mx-4 border-t border-slate-200"></div>
        <div className="grid grid-cols-3 gap-1 p-1">
          <button
            onClick={() => handleToggleLike(postId)}
            disabled={isLikeLoading}
            className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors sm:gap-2 sm:text-sm ${
              isLiked
                ? "bg-[#e7f3ff] text-[#1877f2] hover:bg-[#dbeafe]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ThumbsUp size={18} />
            <span>{isLikeLoading ? "Like Loding..." : "Like"}</span>
          </button>

          <button
            onClick={() => handleToggleComments(postId)}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:gap-2 sm:text-sm"
          >
            <MessageCircle size={18} />
            <span>Comment</span>
          </button>

          <button
            onClick={() => handleOpenShareModal(post)}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:gap-2 sm:text-sm"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
        {openedCommentPostId === postId && (
          <CommentList handleAddComment={handleAddComment} post={post} />
        )}

        {openShareModal && sharePreviewPost && (
          <SharePost
            handleCloseShareModal={handleCloseShareModal}
            handleShare={handleShare}
            setShareText={setShareText}
            sharePreviewPost={sharePreviewPost}
            shareText={shareText}
          />
        )}
      </article>
    </>
  );
}
export default memo(PostsSection);
