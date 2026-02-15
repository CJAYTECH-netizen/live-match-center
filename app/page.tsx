import LiveUpdates from "@/app/components/LiveUpdates";
import { Match } from "@/app/types/match";

async function getMatches() {
  const res = await fetch(
    "https://live-match-center-blond.vercel.app/api/matches",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }

  return res.json();
}

export default async function DashboardPage() {
  const data = await getMatches();
  const matches: Match[] = data.data.matches;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-primary via-background-primary to-background-secondary py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-live/20 border border-live/50">
            <span className="text-xs font-bold uppercase tracking-widest text-live">
              ⚽ Live Football Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-accent via-text-primary to-accent bg-clip-text text-transparent">
            EPL Match Center
          </h1>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Real-time match data, live statistics, and instant chat
          </p>
        </div>

        {/* Live Updates Component */}
        <LiveUpdates initialMatches={matches} />
      </div>
    </div>
  );
}