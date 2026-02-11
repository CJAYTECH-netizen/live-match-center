"use client";

import { useEffect, useState } from "react";
import { connectSocket, subscribeToMatch, unsubscribeFromMatch } from "@/lib/socket";
import { Match } from "@/app/types/match";
import MatchCard from "./MatchCard";
import ChatWidget from "./ChatWidget";
import { getUserSession } from "@/lib/user";

type FilterType = "all" | "live" | "upcoming" | "finished";

export default function LiveUpdates({ initialMatches }: { initialMatches: Match[] }) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [filter, setFilter] = useState<FilterType>("all");
  const [userSession, setUserSession] = useState<{ userId: string; username: string } | null>(null);
  const socket = connectSocket();

  // Get user session
  useEffect(() => {
    const session = getUserSession();
    setUserSession(session);
  }, []);

  // Subscribe to all matches for real-time updates
  useEffect(() => {
    initialMatches.forEach((match) => subscribeToMatch(match.id));

    const handleScoreUpdate = (data: any) => {
      setMatches((prev) =>
        prev.map((m) =>
          m.id === data.matchId
            ? { ...m, homeScore: data.homeScore, awayScore: data.awayScore }
            : m
        )
      );
    };

    const handleStatusChange = (data: any) => {
      setMatches((prev) =>
        prev.map((m) =>
          m.id === data.matchId
            ? { ...m, status: data.status, minute: data.minute }
            : m
        )
      );
    };

    socket.on("score_update", handleScoreUpdate);
    socket.on("status_change", handleStatusChange);

    return () => {
      socket.off("score_update", handleScoreUpdate);
      socket.off("status_change", handleStatusChange);
      initialMatches.forEach((match) => unsubscribeFromMatch(match.id));
    };
  }, [initialMatches, socket]);

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    if (filter === "all") return true;
    if (filter === "live") return match.status === "FIRST_HALF" || match.status === "SECOND_HALF";
    if (filter === "upcoming") return match.status === "NOT_STARTED";
    if (filter === "finished") return match.status === "FULL_TIME";
    return true;
  });

  const filterTabs: { label: string; value: FilterType; icon: string }[] = [
    { label: "All Matches", value: "all", icon: "📺" },
    { label: "Live", value: "live", icon: "🔴" },
    { label: "Upcoming", value: "upcoming", icon: "⏰" },
    { label: "Finished", value: "finished", icon: "✅" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filter Tabs */}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {filterTabs.map((tab) => {
          const count = matches.filter((m) => {
            if (tab.value === "all") return true;
            if (tab.value === "live") return m.status === "FIRST_HALF" || m.status === "SECOND_HALF";
            if (tab.value === "upcoming") return m.status === "NOT_STARTED";
            if (tab.value === "finished") return m.status === "FULL_TIME";
          }).length;

          const isActive = filter === tab.value;
          
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap group
                ${
                  isActive
                    ? "btn btn-primary bg-accent text-white"
                    : "btn btn-secondary bg-background-tertiary text-text-secondary hover:bg-background-secondary hover:text-text-primary border border-background-secondary"
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-xs">{tab.value === "all" ? "All" : tab.label.split(" ")[0]}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                isActive ? "bg-white/20" : "bg-background-secondary/50"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-4xl mb-4">⚽</div>
          <p className="text-text-secondary text-base sm:text-lg">No matches in this category</p>
          <p className="text-text-tertiary text-sm mt-2">Try selecting a different filter</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}

      {/* Floating Chat Widget for Home Page */}
      {userSession && (
        <ChatWidget
          matchId="lobby"
          userId={userSession.userId}
          username={userSession.username}
        />
      )}
    </div>
  );
}
