"use client";

import { MatchEvent, EventType } from "@/app/types/match";

const EVENT_ICONS: Record<EventType, string> = {
  GOAL: "⚽",
  YELLOW_CARD: "🟨",
  RED_CARD: "🟥",
  SUBSTITUTION: "�",
  FOUL: "🚩",
  SHOT: "💥",
};

const EVENT_COLORS: Record<EventType, { bg: string; border: string; highlight: string }> = {
  GOAL: { 
    bg: "bg-gradient-to-r from-success/20 to-transparent",
    border: "border-success/50",
    highlight: "text-success font-bold"
  },
  YELLOW_CARD: { 
    bg: "bg-gradient-to-r from-warning/20 to-transparent",
    border: "border-warning/50",
    highlight: "text-warning"
  },
  RED_CARD: { 
    bg: "bg-gradient-to-r from-danger/20 to-transparent",
    border: "border-danger/50",
    highlight: "text-danger"
  },
  SUBSTITUTION: { 
    bg: "bg-gradient-to-r from-accent/20 to-transparent",
    border: "border-accent/50",
    highlight: "text-accent"
  },
  FOUL: { 
    bg: "bg-gradient-to-r from-orange-500/20 to-transparent",
    border: "border-orange-500/50",
    highlight: "text-orange-400"
  },
  SHOT: { 
    bg: "bg-gradient-to-r from-blue-500/20 to-transparent",
    border: "border-blue-500/50",
    highlight: "text-blue-400"
  },
};

export default function MatchTimeline({ events }: { events: MatchEvent[] }) {
  const sortedEvents = [...events].sort((a, b) => parseInt(String(b.minute)) - parseInt(String(a.minute)));

  if (events.length === 0) {
    return (
      <div className="card border-2 border-background-tertiary p-6">
        <div className="flex flex-col items-center justify-center py-12 text-text-tertiary">
          <div className="text-4xl mb-3">⏱️</div>
          <p className="text-sm">Match hasn't started yet. Events will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-2 border-background-tertiary p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-2xl">⚽</span>
        <h3 className="text-2xl font-bold text-text-primary">Match Timeline</h3>
      </div>

      <div className="relative space-y-2 sm:space-y-3 pl-2">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-12 bottom-0 timeline-line" style={{ height: "calc(100% - 48px)" }}></div>

        {sortedEvents.map((event, index) => {
          const colors = EVENT_COLORS[event.type];
          const isHomeTeam = event.team === "home";
          
          return (
            <div
              key={event.id}
              className={`animate-bounce-in relative flex gap-3 sm:gap-4 group`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Timeline dot */}
              <div className="flex-shrink-0 flex flex-col items-center pt-1">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-base sm:text-lg border-2 font-bold
                    ${isHomeTeam 
                      ? "bg-cyan-500/20 border-cyan-500" 
                      : "bg-orange-500/20 border-orange-500"
                    } relative z-10 group-hover:scale-125 transition-transform`}
                >
                  {EVENT_ICONS[event.type]}
                </div>
              </div>

              {/* Event details card */}
              <div
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 timeline-item group-hover:border-accent
                  ${colors.bg} ${colors.border} min-w-0 mb-2`}
              >
                {/* Header: Minute and time */}
                <div className="flex justify-between items-baseline gap-2 mb-2">
                  <span className="font-bold text-sm sm:text-base text-text-primary">
                    {event.minute}'
                  </span>
                  <span className="timeline-dot" style={{
                    backgroundColor: isHomeTeam ? "#06b6d4" : "#f97316",
                    opacity: 0.6
                  }}></span>
                  <span className="text-xs text-text-tertiary flex-shrink-0">
                    {new Date(event.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Player name - emphasized for goals */}
                <p className={`font-bold text-sm sm:text-base truncate mb-1 ${event.type === "GOAL" ? colors.highlight : "text-text-primary"}`}>
                  {event.player}
                </p>

                {/* Assist player */}
                {event.assistPlayer && (
                  <p className="text-xs text-text-secondary truncate mb-1">
                    ✓ Assist: <span className="font-semibold">{event.assistPlayer}</span>
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary break-words leading-snug">
                  {event.description}
                </p>

                {/* Team badge */}
                <div className="mt-2 flex gap-1 items-center">
                  <span className={`inline-block w-2 h-2 rounded-full ${isHomeTeam ? "bg-cyan-500" : "bg-orange-500"}`}></span>
                  <span className="text-xs font-semibold text-text-tertiary">
                    {isHomeTeam ? "HOME TEAM" : "AWAY TEAM"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
