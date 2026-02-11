"use client";

import { useEffect, useState } from "react";
import { DetailedMatch } from "@/app/types/match";
import MatchDetails from "./MatchDetails";
import ChatWidget from "./ChatWidget";
import { getUserSession } from "@/lib/user";

export default function MatchDetailsWrapper({ match }: { match: DetailedMatch }) {
  const [userSession, setUserSession] = useState<{ userId: string; username: string } | null>(null);

  useEffect(() => {
    const session = getUserSession();
    setUserSession(session);
  }, []);

  if (!userSession) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        {/* Main Content - Full width */}
        <div>
          <MatchDetails match={match} />
        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget
        matchId={match.id}
        userId={userSession.userId}
        username={userSession.username}
      />
    </div>
  );
}
