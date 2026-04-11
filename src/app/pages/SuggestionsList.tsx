import useNotesAPI from "@/hooks/useNotesAPI";
import type { SuggestionUser } from "@/types/Note";
import { useEffect, useState } from "react";

export default function SuggestionsList() {
  const { getSuggestions } = useNotesAPI();
  const [suggestions, setSuggestions] = useState<SuggestionUser[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const data = await getSuggestions();

      if (data) {
        setSuggestions(data.users || data.suggestions || []);
      }
    };

    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(suggestions.length);
  return (
    <div>
      
      {suggestions.map((user: SuggestionUser) => (
        <div>
          <h1>hello</h1>
          <div key={user._id}>{user.name}</div>
        </div>
      ))}
    </div>
  );
}
