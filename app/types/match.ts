// Match Types
export type MatchStatus = "NOT_STARTED" | "FIRST_HALF" | "HALF_TIME" | "SECOND_HALF" | "FULL_TIME";

export type EventType = "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUBSTITUTION" | "FOUL" | "SHOT";

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
  startTime: string;
}

export interface MatchEvent {
  id: string;
  type: EventType;
  minute: number;
  team: "home" | "away";
  player: string;
  assistPlayer?: string;
  description: string;
  timestamp: string;
}

export interface MatchStatistics {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

export interface DetailedMatch extends Match {
  events: MatchEvent[];
  statistics: MatchStatistics;
}

// Chat Types
export interface ChatMessage {
  id: string;
  matchId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface TypingIndicator {
  matchId: string;
  userId: string;
  username: string;
  isTyping: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface MatchesResponse {
  matches: Match[];
  total: number;
}
