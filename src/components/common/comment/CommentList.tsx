import PostTime from "@/components/note/PostTime";
import useNotesAPI from "@/hooks/useNotesAPI";
import type { Post } from "@/types/Note";
import EmojiPicker from "emoji-picker-react";
import {
  ImageIcon,
  MessageCircle,
  SendHorizontal,
  Smile,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  post: Post;
  handleAddComment: (postId: string, text: string) => void;
};
export default function CommentList({ post, handleAddComment }: Props) {
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [comments, setComments] = useState();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const {getComments} = useNotesAPI();

  console.log(imageFiles);
   useEffect(() => {
  const fetchComments = async () => {
    const data = await getComments(post?._id, 1, 10);
    setComments(data);
    console.log("comments", comments);
    
  };

  fetchComments();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [post?._id]);

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
    <>
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

            <div className="relative w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white">
              <textarea
                ref={textareaRef}
                rows={2}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setPostText(e.target.value)
                }
                placeholder={`Comment as ${post?.user?.name || "User"}...`}
                className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
              />

              <div className="relative mt-3">
                {selectedImages.length > 0 && (
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="group relative flex items-center justify-center rounded-xl border border-slate-200 bg-white">
                      <img
                        src={selectedImages[0]}
                        alt="Preview"
                        className="h-40 w-full object-contain"
                      />

                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-1" data-emojy-menu>
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                    <ImageIcon size={16} />
                    <input
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      type="file"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleEmojy}
                    className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
                  >
                    <Smile size={16} />
                  </button>
                  {open && (
                    <div className="absolute left-0 top-[calc(100%+8px)] z-[9999] rounded-2xl border border-slate-200 bg-white shadow-xl">
                      <EmojiPicker
                        open={open}
                        onEmojiClick={(emojiData) => {
                          const newText =
                            (textareaRef.current?.value || "") +
                            emojiData.emoji;

                          if (textareaRef.current) {
                            textareaRef.current.value = newText;
                            textareaRef.current.focus();
                          }

                          setPostText(newText);
                        }}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAddComment(post?._id, postText)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
                  disabled={
                    // eslint-disable-next-line react-hooks/refs
                    (textareaRef.current?.value || postText).trim() === "" &&
                    selectedImages.length === 0
                  }
                >
                  <SendHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
