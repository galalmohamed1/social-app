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
  SendHorizontal,
  Smile,
  ImageIcon,
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
} from "@/components/ui/alert-dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Post } from "@/types/Note";
import { memo, useEffect, useState } from "react";
import PostTime from "@/components/note/PostTime";

type Props = {
  post: Post;
  images: string[];
  postId: string;
  profileId: string | undefined;
  handledelete: (postId:string)=> void;
};

function PostsSection({ post, images, postId, profileId, handledelete}: Props) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [openedCommentPostId, setOpenedCommentPostId] = useState<string | null>(
    null,
  );

  const isMyPost = post.user?._id === profileId;
  const isSaved = savedPosts[postId];
  const isMenuOpen = selectedPostId === postId;

  const handleChangePost = (postId: string) => {
    setSelectedPostId((prev) => (prev === postId ? null : postId));
  };

  const handleSave = (postId: string) => {
    setSavedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    setSelectedPostId(null);
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
                  {post?.user?.name}
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
                  {renderIcon(post.privacy)}
                  {post.privacy}
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
                  {isSaved ? "Unsave post" : "Save post"}
                </button>

                {isMyPost && (
                  <>
                    <button className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <Pencil size={15} />
                      Edit post
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                        >
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
                          <AlertDialogCancel variant="outline" className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={() => handledelete(postId)}>
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

          {post.body && (
            <div className="mt-3">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {post.body}
              </p>
            </div>
          )}

          {savedPosts[postId] && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-2.5 py-1 text-[11px] font-bold text-[#1877f2]">
              <Bookmark size={15} />
              Saved
            </div>
          )}
        </div>

        {images.length > 0 && (
          <div className="border-y border-slate-200 z-10">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((img: string, index: number) => (
                  <CarouselItem key={index} className="basis-full">
                    <img
                      src={img}
                      alt={`post-${index}`}
                      className="block h-auto w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
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
                className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline"
              >
                {post.likesCount} likes
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <span>{post.sharesCount} shares</span>
              <span>{post.commentsCount} comments</span>

              <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                View details
              </button>
            </div>
          </div>
        </div>

        <div className="mx-4 border-t border-slate-200"></div>
        <div className="grid grid-cols-3 gap-1 p-1">
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:gap-2 sm:text-sm">
            <ThumbsUp size={18} />
            <span>Like</span>
          </button>

          <button
            onClick={() => handleToggleComments(postId)}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:gap-2 sm:text-sm"
          >
            <MessageCircle size={18} />
            <span>Comment</span>
          </button>

          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:gap-2 sm:text-sm">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
        {openedCommentPostId === postId && (
          <div className="border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-extrabold tracking-wide text-slate-700">
                  Comments
                </p>
                <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]">
                  {post.comments?.length || 0}
                </span>
              </div>

              <select className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:bg-white focus:ring-2">
                <option value="relevant">Most relevant</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="space-y-2">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="relative flex items-start gap-2"
                  >
                    <img
                      alt={comment.commentCreator?.name || "user"}
                      className="mt-0.5 h-8 w-8 rounded-full object-cover"
                      src={
                        comment.commentCreator?.photo ||
                        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                      }
                    />

                    <div className="min-w-0 flex-1">
                      <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {comment.commentCreator?.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              @{comment.commentCreator?.username || "user"} ·{" "}
                              <PostTime createdAt={comment.createdAt} />
                            </p>
                          </div>
                        </div>

                        <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                          {comment.content}
                        </p>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between px-1">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-semibold text-slate-400">
                            <PostTime createdAt={comment.createdAt} />
                          </span>
                          <button className="text-xs font-semibold text-slate-500 hover:underline disabled:opacity-60">
                            Like ({comment.likesCount || 0})
                          </button>
                          <button className="text-xs font-semibold text-slate-500 transition hover:text-[#1877f2] hover:underline disabled:opacity-60">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center">
                  <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
                    <MessageCircle size={22} />
                  </div>
                  <p className="text-lg font-extrabold text-slate-800">
                    No comments yet
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Be the first to comment.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3">
              <div className="flex items-start gap-2">
                <img
                  alt={post?.user?.name || "User"}
                  className="h-9 w-9 rounded-full object-cover"
                  src={
                    post?.user?.photo ||
                    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                  }
                />

                <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white">
                  <textarea
                    placeholder={`Comment as ${post?.user?.name || "User"}...`}
                    rows={1}
                    className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
                  />

                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                        <ImageIcon size={16} />
                        <input
                          accept="image/*"
                          className="hidden"
                          type="file"
                        />
                      </label>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
                      >
                        <Smile size={16} />
                      </button>
                    </div>

                    <button
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
                      disabled
                    >
                      <SendHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
export default memo(PostsSection);
