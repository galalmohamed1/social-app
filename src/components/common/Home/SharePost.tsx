import type { Post } from "@/types/Note";
import { X } from "lucide-react";
import { memo } from "react";

type Props = {
  setShareText: (value: React.SetStateAction<string>) => void;
  handleShare: () => void;
  handleCloseShareModal: () => void;
  shareText: string;
  sharePreviewPost: Post;
};

function SharePost({
  setShareText,
  handleShare,
  handleCloseShareModal,
  shareText,
  sharePreviewPost,
}: Props) {
  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-[2px]">
      
        <div className="w-full max-w-[560px] rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h2 className="text-base font-extrabold text-slate-900">Share post</h2>

            <button
              onClick={handleCloseShareModal}
              className="cursor-pointer rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <textarea
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Say something about this..."
              className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2]/20"
            />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-4">
                <img
                  src={sharePreviewPost.user?.photo}
                  alt={sharePreviewPost.user?.name}
                  className="h-8 w-8 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900">
                    {sharePreviewPost.user?.name}
                  </h3>
                  <p className="truncate text-xs font-semibold text-slate-500">
                    @{sharePreviewPost.user?.username}
                  </p>
                </div>
              </div>

              {sharePreviewPost.body && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">
                  {sharePreviewPost.body}
                </p>
              )}

              {sharePreviewPost.image && (
                <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                  <img
                    src={
                      Array.isArray(sharePreviewPost.image)
                        ? sharePreviewPost.image[0]
                        : sharePreviewPost.image
                    }
                    alt="Shared preview"
                    className="mt-2 max-h-[220px] w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
            <button
              onClick={handleCloseShareModal}
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              onClick={handleShare}
              className="cursor-pointer inline-flex items-center rounded-lg bg-[#1877f2] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Share now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SharePost);
