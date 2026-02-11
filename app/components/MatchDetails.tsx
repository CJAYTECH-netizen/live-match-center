"use client";

import { useEffect, useState } from "react";
import { connectSocket, subscribeToMatch, unsubscribeFromMatch } from "@/lib/socket";
import { DetailedMatch } from "@/app/types/match";
import MatchStats from "./MatchStats";
import MatchTimeline from "./MatchTimeline";

export default function MatchDetails({ match: initialMatch }: { match: DetailedMatch }) {
  const [match, setMatch] = useState<DetailedMatch>(initialMatch);

  useEffect(() => {
    const socket = connectSocket();
    subscribeToMatch(initialMatch.id);

    // Handle score updates
    const handleScoreUpdate = (data: any) => {
      if (data.matchId === initialMatch.id) {
        setMatch((prev) => ({
          ...prev,
          homeScore: data.homeScore,
          awayScore: data.awayScore,
        }));
      }
    };

    // Handle match events
    const handleMatchEvent = (data: any) => {
      if (data.matchId === initialMatch.id) {
        setMatch((prev) => ({
          ...prev,
          events: [...prev.events, data],
        }));
      }
    };

    // Handle statistics updates
    const handleStatsUpdate = (data: any) => {
      if (data.matchId === initialMatch.id) {
        setMatch((prev) => ({
          ...prev,
          statistics: data.statistics,
        }));
      }
    };

    // Handle status and minute changes
    const handleStatusChange = (data: any) => {
      if (data.matchId === initialMatch.id) {
        setMatch((prev) => ({
          ...prev,
          status: data.status,
          minute: data.minute,
        }));
      }
    };

    socket.on("score_update", handleScoreUpdate);
    socket.on("match_event", handleMatchEvent);
    socket.on("stats_update", handleStatsUpdate);
    socket.on("status_change", handleStatusChange);

    // Cleanup
    return () => {
      socket.off("score_update", handleScoreUpdate);
      socket.off("match_event", handleMatchEvent);
      socket.off("stats_update", handleStatsUpdate);
      socket.off("status_change", handleStatusChange);
      unsubscribeFromMatch(initialMatch.id);
    };
  }, [initialMatch.id]);

  const isLive = match.status === "FIRST_HALF" || match.status === "SECOND_HALF";

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Score Header - Premium Design */}
      <div className="card border-2 border-accent/50 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-background-secondary via-background-secondary to-background-tertiary overflow-hidden relative">
        {/* Background decoration */}
        {isLive && (
          <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-live/5 blur-3xl"></div>
        )}

        <div className="relative z-10 space-y-8">
          {/* Team Names and Score */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary mb-2">
                {match.homeTeam.name}
              </h2>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-text-tertiary">
                {match.homeTeam.shortName}
              </p>
            </div>

            {/* Score Display */}
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-2 sm:gap-4">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-text-primary leading-none">
                  {match.homeScore}
                </div>
                <div className="text-2xl sm:text-3xl text-text-tertiary font-light mb-6">
                  {isLive ? "●" : "−"}
                </div>
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-text-primary leading-none">
                  {match.awayScore}
                </div>
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center flex-1 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-secondary mb-2">
                {match.awayTeam.name}
              </h2>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-text-tertiary">
                {match.awayTeam.shortName}
              </p>
            </div>
          </div>

          {/* Match Status Badge */}
          <div className="flex items-center justify-center gap-4 flex-wrap border-t border-background-tertiary pt-6">
            {isLive && (
              <div className="live-badge animate-pulse-glow">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse-subtle"></span>
                <span>LIVE</span>
              </div>
            )}

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider ${
              isLive 
                ? "bg-live/20 text-live border border-live/50"
                : "bg-text-tertiary/20 text-text-secondary border border-text-tertiary/50"
            }`}>
              {isLive ? `${match.minute}'` : match.status.replace(/_/g, " ")}
            </div>

            <div className="text-xs text-text-tertiary font-semibold">
              {new Date(match.startTime).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        {/* Timeline - Larger on desktop */}
        <div className="lg:col-span-3">
          <MatchTimeline events={match.events} />
        </div>

        {/* Statistics - Sidebar on desktop */}
        <div className="lg:col-span-2">
          <MatchStats stats={match.statistics} />
        </div>
      </div>
    </div>
  );
}
