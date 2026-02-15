import Link from "next/link";
import { DetailedMatch } from "@/app/types/match";
import MatchDetailsWrapper from "@/app/components/MatchDetailsWrapper";

async function getMatch(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/matches/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch match");
  }

  return res.json();
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getMatch(id);
  const match: DetailedMatch = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-primary via-background-primary to-background-secondary">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background-secondary/95 backdrop-blur-sm border-b border-background-tertiary shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-accent hover:text-cyan-400 font-semibold text-sm sm:text-base transition-colors"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Matches</span>
          </Link>
          
          <div className="flex-1 text-center">
            <h1 className="text-lg sm:text-2xl font-bold text-text-primary">
              <span className="text-accent">{match.homeTeam.shortName}</span>
              <span className="text-text-tertiary mx-3">vs</span>
              <span className="text-accent">{match.awayTeam.shortName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-text-tertiary mt-1">
              {new Date(match.startTime).toLocaleDateString([], { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="hidden sm:block w-32"></div>
        </div>
      </div>

      {/* Main Content */}
      <MatchDetailsWrapper match={match} />
    </div>
  );
}