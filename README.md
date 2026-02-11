# ⚽ EPL Live Match Center

A real-time football match center application built with Next.js, displaying live match data, statistics, events, and a live chat feature.

## Features

### 🎯 Core Features
- **Real-time Match Dashboard** - View all matches with live score updates
- **Match Filtering** - Filter matches by status (Live, Upcoming, Finished)
- **Detailed Match View** - Complete match information with live score, timeline, and statistics
- **Live Chat** - Real-time chat with typing indicators and user persistence
- **Connection Status** - Visual indicator for real-time connection status
- **Responsive Design** - Optimized for all devices

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO Client
- **HTTP**: Native fetch API
- **State**: React Hooks

## Key Design Decisions

### Server-Side Rendering
- Initial data fetched on the server (via Next.js Server Components)
- **Benefit**: Eliminates CORS issues, improves SEO, faster initial load
- **Trade-off**: Slightly higher server load

### Socket.IO for Real-time Updates
- **Benefit**: Low latency, efficient bandwidth, built-in reconnection
- **Alternative Considered**: REST polling (higher latency and bandwidth)

### Client-Side Filtering
- **Benefit**: Instant filtering, no extra API calls
- **Trade-off**: Limited to loaded matches

### Local Storage for User Identity
- **Benefit**: No login required, persistent across sessions
- **Trade-off**: Privacy-friendly but no true user tracking

## Architecture

```
app/
├── components/
│   ├── ConnectionStatus.tsx      # Connection indicator
│   ├── MatchCard.tsx             # Individual match card
│   ├── MatchDetails.tsx          # Match details with updates
│   ├── MatchDetailsWrapper.tsx    # Layout wrapper
│   ├── MatchStats.tsx            # Statistics display
│   ├── MatchTimeline.tsx         # Event timeline
│   ├── ChatBox.tsx               # Real-time chat
│   └── LiveUpdates.tsx           # Match grid & filtering
└── lib/
    ├── socket.ts                 # Socket.IO utilities
    └── user.ts                   # User session management
```

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
npm run build
npm start
```

### Vercel Deployment
```bash
vercel deploy
```

## Performance Optimizations

1. **Server-side Data Fetching** - CORS-free, SEO-friendly
2. **Efficient Real-time Updates** - Only deltas sent over WebSocket
3. **Automatic Connection Recovery** - 10 retry attempts with backoff
4. **Local State Management** - No external state library overhead

## Troubleshooting

- **Socket Connection Issues**: Check firewall allows WebSocket
- **Chat Not Working**: Verify localStorage enabled
- **Styling Issues**: Clear `.next` cache and rebuild

## Future Enhancements

- Push notifications for goals
- User authentication and profiles
- Video highlights and replays
- Advanced statistics and heatmaps
- Multi-language support

---

**Built with ❤️ for football fans**
