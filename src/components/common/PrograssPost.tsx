import type { Users } from "@/types/Note";

type Props={
    publishProgress:number;
    postText:string | null;
    profileData: Users | null;
}
function PrograssPost({publishProgress, postText, profileData}:Props){
  return (
    <>
      <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img
              src={profileData?.photo}
              alt={profileData?.name}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div className="pt-2">
              <h3 className="font-extrabold text-foreground">
                {profileData?.name}
              </h3>
              <p className="mt-3 text-sm leading-none text-[#1877f2]">
                Publishing... {publishProgress}%
              </p>
            </div>
          </div>

          {postText && (
            <div className="mt-12">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {postText}
              </p>
            </div>
          )}

          <div className="mt-6 h-4 w-full rounded-full bg-slate-200">
            <div
              className="h-4 rounded-full bg-[#1877f2] transition-all duration-200"
              style={{ width: `${publishProgress}%` }}
            />
          </div>
        </div>
      </article>
    </>
  );
}

export default PrograssPost;
