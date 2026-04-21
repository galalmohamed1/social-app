import PostTime from "@/components/note/PostTime";
import type { Post } from "@/types/Note";
import { MessageCircle, Share2, ThumbsUp, X } from "lucide-react";
import { memo, useState } from "react";
type Props = {
  post: Post;
  images: string[];
  postId: string;
};
function PostsProfile({ post, images, postId }: Props) {
  const [open, setOpen] = useState(false);
  const handleZoom = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <article
        key={postId}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_6px_rgba(15,23,42,.05)] transition hover:shadow-sm"
      >
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
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

                <span className="mx-1">·</span>
              </div>
            </div>
            <button className="cursor-pointer rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
              View details
            </button>
          </div>

          {post.body && (
            <div className="mt-3">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {post.body}
              </p>
            </div>
          )}
        </div>
        {images.length > 0 && (
          <div onClick={handleZoom} className="relative flex w-full cursor-pointer bg-black items-center justify-center">
            <img
              src={images[0]}
              alt="post"
              className="max-h-[560px] w-auto max-w-full object-contain"
            />
          </div>
        )}

        <div className="mx-4 border-t border-slate-200"></div>

        <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <span className={`inline-flex items-center gap-2 font-semibold`}>
              <ThumbsUp size={18} />
              <span>{post.likesCount} likes</span>
            </span>

            <span className="inline-flex items-center gap-2 font-semibold">
              <MessageCircle size={18} />
              <span>Comment</span>
            </span>

            <span className="inline-flex items-center gap-2 font-semibold">
              <Share2 size={18} />
              <span>Share</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
            {post.createdAt ? (
              <PostTime createdAt={post.createdAt} />
            ) : (
              "Just now"
            )}
          </span>
        </div>
      </article>
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
        {images.length > 0 && (
          <div className="relative flex w-full cursor-pointer bg-black items-center justify-center">
            <img
              src={images[0]}
              alt="post"
              className="max-h-[560px] w-auto max-w-full object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
}
export default memo(PostsProfile);
