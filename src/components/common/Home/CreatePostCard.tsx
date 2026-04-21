import EmojiPicker from "emoji-picker-react";
import { Image, Smile, X, Send } from "lucide-react";
import type { Privacy, Users } from "@/types/Note";
import { memo } from "react";
import { GlassCard } from "../GlassCard";

type Props = {
  profileData: Users | null;
  privacy: Privacy;
  setPrivacy: React.Dispatch<React.SetStateAction<Privacy>>;
  postText: string;
  setPostText: React.Dispatch<React.SetStateAction<string>>;
  selectedImages: string[];
  handleDeleteImage: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmojy: () => void;
  handleCreatePost: () => void;
  renderIcon: () => React.ReactNode;
  open: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
};

function CreatePostCard({
  profileData,
  privacy,
  setPrivacy,
  postText,
  setPostText,
  selectedImages,
  handleDeleteImage,
  handleImageChange,
  handleEmojy,
  handleCreatePost,
  renderIcon,
  open,
  textareaRef,
}: Props) {
  return (
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
          ref={textareaRef}
          rows={4}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPostText(e.target.value)
          }
          placeholder="What's on your mind, Galal?"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
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
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <div className="relative overflow-visible flex items-center gap-2" data-emojy-menu>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
            <Image size={18} color="#009966" />
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
            <Smile size={18} color="#fe9a00" />
            <span className="hidden sm:inline">Feeling/activity</span>
          </button>

          {open && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-[9999] rounded-2xl border border-slate-200 bg-white shadow-xl">
              <EmojiPicker
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
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCreatePost}
            disabled={
              // eslint-disable-next-line react-hooks/refs
              (textareaRef.current?.value || postText).trim() === "" &&
              selectedImages.length === 0
            }
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
          >
            Post
            <Send size={16} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

export default memo(CreatePostCard);
