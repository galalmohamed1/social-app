import { GlassCard } from "@/components/common/GlassCard";
import type { Asideleft, Users } from "@/types/Note";
import { Bookmark, Earth, Newspaper, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHome from "../../components/common/Home/SectionHome";
import SidebarButton from "@/components/common/Home/SidebarButton";
import SidebarFriends from "@/components/common/Home/SidebarFriends";
import useNotesAPI from "@/hooks/useNotesAPI";
import PageLoader from "@/components/common/PageLoader";

export default function HomePage() {
  const [isActive, setIsActive] = useState("feed");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<Users | null>(null);
  const { getProfileData } = useNotesAPI();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileData();
        if (data) {
          console.log("Profile data:", data);
          setProfileData(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
      <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
        <GlassCard className="p-3 shadow-sm text-sm">
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
      <SectionHome profileData={profileData}/>
      <SidebarFriends />
    </div>
  );
}
