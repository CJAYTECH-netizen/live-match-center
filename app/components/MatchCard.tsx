"use client";

import Link from "next/link";
import { Match } from "@/app/types/match";

export default function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "FIRST_HALF" || match.status === "SECOND_HALF";
  const isUpcoming = match.status === "NOT_STARTED";
  const isFinished = match.status === "FULL_TIME";
  const isHalfTime = match.status === "HALF_TIME";

  let borderClass = "border-background-tertiary";
  let bgOverlay = "";
  
  if (isLive) {
    borderClass = "border-live";
    bgOverlay = "bg-gradient-to-br from-live/5 to-transparent";
  } else if (isHalfTime) {
    borderClass = "border-warning";
    bgOverlay = "bg-gradient-to-br from-warning/5 to-transparent";
  }

  const startDate = new Date(match.startTime);
  const formattedTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = startDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/matches/${match.id}`} className="block group">
      <div
        className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer
          card ${borderClass} ${isLive ? "card-live" : ""}`}
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 ${bgOverlay} pointer-events-none`}></div>

        {/* Live indicator badge */}
        {isLive && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <div className="live-badge animate-pulse-glow">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse-subtle"></span>
              <span>LIVE</span>
            </div>
          </div>
        )}

        {/* Half-time badge */}
        {isHalfTime && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-warning text-white">
              Half Time
            </div>
          </div>
        )}

        {/* Match finished badge */}
        {isFinished && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-text-muted text-background-primary">
              Final
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-5 space-y-4 sm:space-y-5">
          {/* Home Team */}
          <div className="text-center">
            <p className="team-name">{match.homeTeam.name}</p>
            <p className="text-xs text-text-tertiary font-medium">{match.homeTeam.shortName}</p>
          </div>

          {/* Score Section - The Crown Jewel */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 py-2 sm:py-4">
            <div className="text-center flex-1">
              <p className="score text-4xl sm:text-5xl lg:text-6xl font-black">{match.homeScore}</p>
              <p className="text-xs sm:text-sm text-text-tertiary mt-1 font-semibold">HOME</p>
            </div>
            
            <div className="text-xl sm:text-2xl text-text-tertiary font-light px-2">
              {isLive ? "●" : "-"}
            </div>

            <div className="text-center flex-1">
              <p className="score text-4xl sm:text-5xl lg:text-6xl font-black">{match.awayScore}</p>
              <p className="text-xs sm:text-sm text-text-tertiary mt-1 font-semibold">AWAY</p>
            </div>
          </div>

          {/* Away Team */}
          <div className="text-center">
            <p className="team-name team-away">{match.awayTeam.name}</p>
            <p className="text-xs text-text-tertiary font-medium">{match.awayTeam.shortName}</p>
          </div>

          {/* Status and Time */}
          <div className="flex flex-col items-center gap-3 border-t border-background-tertiary pt-4 sm:pt-5">
            {isLive && (
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="w-2 h-2 rounded-full bg-live animate-pulse-subtle"></span>
                <span className="font-bold text-live text-xs sm:text-sm">
                  {match.minute}' - {match.status.replace(/_/g, " ")}
                </span>
              </div>
            )}

            {isHalfTime && (
              <div className="font-bold text-warning text-xs sm:text-sm">
                HALF TIME - {match.minute}'
              </div>
            )}

            {isUpcoming && (
              <div className="text-xs sm:text-sm text-text-secondary font-semibold text-center">
                <div>{formattedDate}</div>
                <div className="text-text-tertiary">{formattedTime}</div>
              </div>
            )}

            {isFinished && (
              <div className="text-xs sm:text-sm text-text-tertiary font-semibold">
                Match Ended
              </div>
            )}
          </div>
        </div>

        {/* Hover effect glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
          style={{
            boxShadow: isLive 
              ? "inset 0 0 30px rgba(239, 68, 68, 0.1)"
              : "inset 0 0 30px rgba(6, 182, 212, 0.05)"
          }}>
        </div>
      </div>
    </Link>
  );
}
