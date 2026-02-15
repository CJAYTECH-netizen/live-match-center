import { NextResponse } from "next/server";

// Sample EPL match data
const mockMatches = [
  // LIVE MATCHES
  {
    id: "match_001",
    homeTeam: {
      name: "Manchester United",
      shortName: "MAN",
      logo: "https://via.placeholder.com/40?text=MAN",
    },
    awayTeam: {
      name: "Liverpool",
      shortName: "LIV",
      logo: "https://via.placeholder.com/40?text=LIV",
    },
    homeScore: 2,
    awayScore: 1,
    status: "FIRST_HALF",
    startTime: new Date().toISOString(),
    venue: "Old Trafford",
    round: 28,
  },
  {
    id: "match_002",
    homeTeam: {
      name: "Chelsea",
      shortName: "CHE",
      logo: "https://via.placeholder.com/40?text=CHE",
    },
    awayTeam: {
      name: "Arsenal",
      shortName: "ARS",
      logo: "https://via.placeholder.com/40?text=ARS",
    },
    homeScore: 1,
    awayScore: 1,
    status: "SECOND_HALF",
    startTime: new Date(Date.now() - 3600000).toISOString(),
    venue: "Stamford Bridge",
    round: 28,
  },
  // FINISHED MATCHES
  {
    id: "match_003",
    homeTeam: {
      name: "Manchester City",
      shortName: "MCI",
      logo: "https://via.placeholder.com/40?text=MCI",
    },
    awayTeam: {
      name: "Tottenham",
      shortName: "TOT",
      logo: "https://via.placeholder.com/40?text=TOT",
    },
    homeScore: 3,
    awayScore: 0,
    status: "FULL_TIME",
    startTime: new Date(Date.now() - 7200000).toISOString(),
    venue: "Etihad Stadium",
    round: 28,
  },
  {
    id: "match_004",
    homeTeam: {
      name: "Brighton",
      shortName: "BHA",
      logo: "https://via.placeholder.com/40?text=BHA",
    },
    awayTeam: {
      name: "Aston Villa",
      shortName: "AVL",
      logo: "https://via.placeholder.com/40?text=AVL",
    },
    homeScore: 2,
    awayScore: 2,
    status: "FULL_TIME",
    startTime: new Date(Date.now() - 10800000).toISOString(),
    venue: "Amex Stadium",
    round: 28,
  },
  {
    id: "match_005",
    homeTeam: {
      name: "Newcastle",
      shortName: "NEW",
      logo: "https://via.placeholder.com/40?text=NEW",
    },
    awayTeam: {
      name: "Brentford",
      shortName: "BRE",
      logo: "https://via.placeholder.com/40?text=BRE",
    },
    homeScore: 1,
    awayScore: 0,
    status: "FULL_TIME",
    startTime: new Date(Date.now() - 14400000).toISOString(),
    venue: "St James Park",
    round: 28,
  },
  // UPCOMING MATCHES
  {
    id: "match_006",
    homeTeam: {
      name: "West Ham",
      shortName: "WHU",
      logo: "https://via.placeholder.com/40?text=WHU",
    },
    awayTeam: {
      name: "Nottingham Forest",
      shortName: "NFO",
      logo: "https://via.placeholder.com/40?text=NFO",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 3600000).toISOString(),
    venue: "London Stadium",
    round: 28,
  },
  {
    id: "match_007",
    homeTeam: {
      name: "Fulham",
      shortName: "FUL",
      logo: "https://via.placeholder.com/40?text=FUL",
    },
    awayTeam: {
      name: "Bournemouth",
      shortName: "BOU",
      logo: "https://via.placeholder.com/40?text=BOU",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 7200000).toISOString(),
    venue: "Craven Cottage",
    round: 28,
  },
  {
    id: "match_008",
    homeTeam: {
      name: "Everton",
      shortName: "EVE",
      logo: "https://via.placeholder.com/40?text=EVE",
    },
    awayTeam: {
      name: "Wolverhampton",
      shortName: "WOL",
      logo: "https://via.placeholder.com/40?text=WOL",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 10800000).toISOString(),
    venue: "Goodison Park",
    round: 28,
  },
  {
    id: "match_009",
    homeTeam: {
      name: "Crystal Palace",
      shortName: "CRY",
      logo: "https://via.placeholder.com/40?text=CRY",
    },
    awayTeam: {
      name: "Ipswich Town",
      shortName: "IPS",
      logo: "https://via.placeholder.com/40?text=IPS",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 14400000).toISOString(),
    venue: "Selhurst Park",
    round: 28,
  },
  {
    id: "match_010",
    homeTeam: {
      name: "Luton Town",
      shortName: "LUT",
      logo: "https://via.placeholder.com/40?text=LUT",
    },
    awayTeam: {
      name: "Leicester City",
      shortName: "LEI",
      logo: "https://via.placeholder.com/40?text=LEI",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 18000000).toISOString(),
    venue: "Kenilworth Road",
    round: 28,
  },
  {
    id: "match_011",
    homeTeam: {
      name: "Southampton",
      shortName: "SOU",
      logo: "https://via.placeholder.com/40?text=SOU",
    },
    awayTeam: {
      name: "Manchester United",
      shortName: "MAN",
      logo: "https://via.placeholder.com/40?text=MAN",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 21600000).toISOString(),
    venue: "St Mary's Stadium",
    round: 28,
  },
  {
    id: "match_012",
    homeTeam: {
      name: "Coventry City",
      shortName: "COV",
      logo: "https://via.placeholder.com/40?text=COV",
    },
    awayTeam: {
      name: "Burnley",
      shortName: "BUR",
      logo: "https://via.placeholder.com/40?text=BUR",
    },
    homeScore: 0,
    awayScore: 0,
    status: "NOT_STARTED",
    startTime: new Date(Date.now() + 86400000).toISOString(),
    venue: "Coventry Stadium",
    round: 28,
  },
];

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: {
          matches: mockMatches,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
