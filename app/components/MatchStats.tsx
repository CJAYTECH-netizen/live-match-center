"use client";

import { MatchStatistics } from "@/app/types/match";

const STAT_LABELS: Record<keyof MatchStatistics, { label: string; icon: string }> = {
  possession: { label: "Possession", icon: "🔄" },
  shots: { label: "Shots", icon: "💥" },
  shotsOnTarget: { label: "Shots on Target", icon: "🎯" },
  corners: { label: "Corners", icon: "⚡" },
  fouls: { label: "Fouls", icon: "🚩" },
  yellowCards: { label: "Yellow Cards", icon: "🟨" },
  redCards: { label: "Red Cards", icon: "🟥" },
};

export default function MatchStats({ stats }: { stats: MatchStatistics }) {
  const entries = Object.entries(stats) as [keyof MatchStatistics, any][];

  return (
    <div className="card border-2 border-background-tertiary p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        <h3 className="text-2xl font-bold text-text-primary">Match Statistics</h3>
      </div>

      <div className="space-y-6 sm:space-y-7">
        {entries.map(([key, stat]) => {
          const homeValue = stat.home ?? 0;
          const awayValue = stat.away ?? 0;
          const total = homeValue + awayValue;
          const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
          const statConfig = STAT_LABELS[key];

          return (
            <div key={key} className="space-y-3">
              {/* Label and values */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{statConfig.icon}</span>
                  <span className="text-sm font-semibold text-text-secondary">
                    {homeValue}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-tertiary text-center flex-1 px-2">
                  {statConfig.label}
                </span>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-sm font-semibold text-text-secondary">
                    {awayValue}
                  </span>
                </div>
              </div>

              {/* Stats bar */}
              <div className="flex gap-1 h-3 stat-bar rounded-full overflow-hidden">
                <div
                  className="stat-bar-fill-home"
                  style={{ width: `${homePercent}%` }}
                  title={`Home: ${homeValue} (${Math.round(homePercent)}%)`}
                ></div>
                <div
                  className="stat-bar-fill-away"
                  style={{ width: `${100 - homePercent}%` }}
                  title={`Away: ${awayValue} (${Math.round(100 - homePercent)}%)`}
                ></div>
              </div>

              {/* Percentage display */}
              <div className="flex justify-between text-xs text-text-tertiary font-medium">
                <span>{Math.round(homePercent)}%</span>
                <span>{Math.round(100 - homePercent)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
