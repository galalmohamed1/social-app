import { getTimeAgo } from "@/types/GetTimeAgo";
import { useEffect, useState } from "react";


type Props = {
  createdAt: string;
};

export default function PostTime({ createdAt }: Props) {
  const [now, setNow] = useState(()=>Date.now());

  
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  return <span>{getTimeAgo(createdAt, now)}</span>;
}