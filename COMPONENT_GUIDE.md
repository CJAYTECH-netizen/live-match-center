# 🎨 Live Football Match Center - Component Guide

Complete guide to all UI components used in the Live Football Match Center application.

---

## 📋 Table of Contents

1. [MatchCard Component](#matchcard-component)
2. [ScoreHeader Section](#scoreheader-section)
3. [MatchTimeline Component](#matchtimeline-component)
4. [MatchStats Component](#matchstats-component)
5. [ChatBox Component](#chatbox-component)
6. [ConnectionStatus Indicator](#connectionstatus-indicator)
7. [Filter Tabs](#filter-tabs)
8. [CSS Utilities](#css-utilities)

---

## MatchCard Component

### Purpose
Displays an individual match card on the dashboard with live score, team info, and status.

### Location
`app/components/MatchCard.tsx`

### Data Props
```typescript
interface Match {
  id: string
  homeTeam: { name: string; shortName: string }
  awayTeam: { name: string; shortName: string }
  homeScore: number
  awayScore: number
  minute: number
  status: "NOT_STARTED" | "FIRST_HALF" | "HALF_TIME" | "SECOND_HALF" | "FULL_TIME"
  startTime: string
}
```

### Visual States

#### LIVE State
```
┌─────────────────────────────────┐
│ ● LIVE                          │
│                                 │
│       Manchester United         │
│           3                     │
│            ·                    │
│           2                     │
│    Liverpool FC                 │
│                                 │
│   ● 67' - SECOND HALF          │
└─────────────────────────────────┘
```
- Red glowing border
- Bright red LIVE badge with pulsing dot
- Red accent on minute/status
- Cyan color scheme for stats

#### NOT STARTED State
```
┌─────────────────────────────────┐
│                                 │
│       Arsenal FC                │
│                                 │
│       ---------                 │
│           ·                     │
│       ---------                 │
│      Tottenham Hotspur          │
│                                 │
│    Feb 15 • 15:00              │
└─────────────────────────────────┘
```
- Standard border
- Date and time display
- Neutral colors (gray text)

#### FULL TIME State
```
┌─────────────────────────────────┐
│ FINAL                           │
│       Chelsea FC                │
│           2                     │
│            -                    │
│           1                     │
│      Brighton & Hove            │
│                                 │
│         Match Ended             │
└─────────────────────────────────┘
```
- Muted styling
- FINAL badge in top right
- Gray text colors

### Features
- ✅ Responsive (mobile/tablet/desktop)
- ✅ Animated score display flash
- ✅ Hover scale effect (+5%)
- ✅ Live badge pulsing animation
- ✅ Status-based styling
- ✅ Clickable to navigate to detail view

---

## ScoreHeader Section

### Purpose
Premium scoreboard display in the match detail view

### Location
`app/components/MatchDetails.tsx` (ScoreHeader section)

### Visual Layout
```
┌────────────────────────────────────────┐
│  Manchester United        Chelsea FC   │
│           3       ·              2      │
│        67' - LIVE                      │
│  ● LIVE │ Reconnecting... (2) │ 15:30 │
└────────────────────────────────────────┘
```

### Features
- ✅ Massive numbers (72px-96px)
- ✅ Team names prominently displayed
- ✅ Status badges with animations
- ✅ Gradient background when live
- ✅ Responsive scaling
- ✅ Time/minute information

### Styling Classes
```tsx
className="card border-2 border-accent/50 p-6 sm:p-8 lg:p-10"
className="text-6xl sm:text-7xl lg:text-8xl font-black text-text-primary"
className="live-badge animate-pulse-glow"
```

---

## MatchTimeline Component

### Purpose
Display chronological match events with visual timeline

### Location
`app/components/MatchTimeline.tsx`

### Data Props
```typescript
interface MatchEvent {
  id: string
  type: "GOAL" | "YELLOW_CARD" | "RED_CARD" | "SUBSTITUTION" | "FOUL" | "SHOT"
  minute: number
  team: "home" | "away"
  player: string
  assistPlayer?: string
  description: string
  timestamp: string
}
```

### Visual Layout

#### Goal Event
```
⚽ │  67'  ●  15:30
   │  Harry Kane                          (GOAL - Green)
   │  Assist: Dejan Kulusevski
   │  Excellent finish into bottom corner
   │  ● HOME TEAM
```

#### Yellow Card Event
```
🟨 │  55'  ●  14:22
   │  Andy Robertson                  (YELLOW CARD - Yellow)
   │  Aggressive tackle
   │  ● HOME TEAM
```

#### Substitution Event
```
🔁 │  72'  ●  15:45
   │  Bruno Fernandes → Sofyan Amrabat    (SUB - Cyan)
   │  Tactical change
   │  ● AWAY TEAM
```

### Features
- ✅ Vertical timeline with connecting line
- ✅ Event icons with color coding
- ✅ Animated entry (bounce-in)
- ✅ Player names with emphasis for goals
- ✅ Assist information display
- ✅ Team indicators (cyan for home, orange for away)
- ✅ Timestamps and match minute

### Color Coding
| Event | Color | Icon |
|-------|-------|------|
| Goal | Green | ⚽ |
| Yellow Card | Yellow | 🟨 |
| Red Card | Red | 🟥 |
| Substitution | Cyan | 🔁 |
| Foul | Orange | 🚩 |
| Shot | Blue | 💥 |

---

## MatchStats Component

### Purpose
Display visual comparison statistics between teams

### Location
`app/components/MatchStats.tsx`

### Data Props
```typescript
interface MatchStatistics {
  possession: { home: number; away: number }
  shots: { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  corners: { home: number; away: number }
  fouls: { home: number; away: number }
  yellowCards: { home: number; away: number }
  redCards: { home: number; away: number }
}
```

### Visual Layout

#### Possession Stat
```
🔄 │ 55            Possession          45
   ├─────────────────────────────────────┤
   └● Cyan (55%) │ Orange (45%) ●
   └─55%─┴─────────────────────┴─45%─┘
```

#### Shots Stat
```
💥 │ 12             Shots              8
   ├───────────────────────────────┬────┤
   └● Cyan (60%) │ Orange (40%) ●
   └─60%─┴────────────────────┴─40%─┘
```

#### Corners Stat
```
⚡ │ 7             Corners            5
   ├─────────────────────────────┬──┤
   └● Cyan (58%) │ Orange (42%) ●
   └─58%─┴────────────────────────┴─42%─┘
```

### Features
- ✅ Animated bar transitions (350ms)
- ✅ Real-time updates
- ✅ Percentage display
- ✅ Icon for each statistic type
- ✅ Dual-color bars (cyan/orange)
- ✅ Responsive heights
- ✅ Hover tooltips with percentages

### Color Legend
- **Cyan (#06b6d4)**: Home team
- **Orange (#f97316)**: Away team

---

## ChatBox Component

### Purpose
Real-time chat panel for match discussion

### Location
`app/components/ChatBox.tsx`

### Data Props
```typescript
interface ChatBoxProps {
  matchId: string
  userId: string
  username: string
}

interface ChatMessage {
  id: string
  matchId: string
  userId: string
  username: string
  message: string
  timestamp: string
}
```

### Visual Layout

#### Chat Interface
```
┌──────────────────────────────┐
│ Live Chat        ✅ Active   │ (Header)
├──────────────────────────────┤
│                              │
│ Other User: "Great goal!"    │ (Left aligned, muted)
│ 14:32                        │
│                              │
│                    You: "Yes!" │ (Right aligned, cyan)
│                    14:33      │
│                              │
│ Someone is typing…           │ (Typing indicator)
│                              │
├──────────────────────────────┤
│ [Type message...] [Send →]  │ (Input section)
│ 0/500                        │
└──────────────────────────────┘
```

### Message States

#### Other User Message
```
┌─────────────────────────┐
│ John Doe               │ (Username)
│ What a great match!    │ (Message text)
│ 15:42                  │ (Timestamp)
└─────────────────────────┘
```
- Background: Dark Navy (#243455)
- Text: Light gray
- Aligned: Left

#### Own Message
```
┌──────────────────────────────┐
│                           You │ (Username)
│                 Amazing goal! │ (Message text)
│                         15:43 │ (Timestamp)
└──────────────────────────────┘
```
- Background: Cyan (#06b6d4)
- Text: White
- Aligned: Right

#### Typing Indicator
```
● ● ●  Someone is typing…
```
- Three animated dots
- Fade animation (1.4s)
- Staggered timing

### Features
- ✅ Real-time message updates
- ✅ Automatic scroll to latest message
- ✅ Typing indicators
- ✅ Character counter (max 500)
- ✅ Send button disabled when empty
- ✅ User identification (own vs others)
- ✅ Timestamps for all messages
- ✅ Connection status in header

### Input Features
- Max 500 characters with visual counter
- Color changes warning at 450+ chars
- Send button disabled when empty or loading
- Disabled during connection loss

---

## ConnectionStatus Indicator

### Purpose
Display real-time connection state to server

### Location
`app/components/ConnectionStatus.tsx`

### Visual States

#### Connected ✅
```
┌──────────────────────────────┐
│ ● Connected                  │
└──────────────────────────────┘
```
- Position: Fixed top-right
- Background: Green (#10b981) with 20% opacity
- Border: Green with 30% opacity
- Indicator: Green pulsing dot
- Duration: Pulse every 2 seconds

#### Connecting ⏳
```
┌──────────────────────────────┐
│ ⟳ Reconnecting… (3)         │
└──────────────────────────────┘
```
- Position: Fixed top-right
- Background: Yellow (#f59e0b) with 20% opacity
- Border: Yellow with 30% opacity
- Indicator: Spinning animation
- Shows reconnection attempt number

#### Disconnected ❌
```
┌──────────────────────────────┐
│ ● Disconnected              │
│ Connection lost             │
└──────────────────────────────┘
```
- Position: Fixed top-right
- Background: Red (#ef4444) with 20% opacity
- Border: Red with 30% opacity
- Indicator: Static red dot
- Shows error message if available

### Features
- ✅ Auto-hide when connected
- ✅ Animated transitions (slide-in)
- ✅ Status-specific styling
- ✅ Reconnection attempt counter
- ✅ Error message display
- ✅ Z-index: 50 (above most content)
- ✅ Backdrop blur effect

---

## Filter Tabs

### Purpose
Filter matches by status on dashboard

### Location
`app/components/LiveUpdates.tsx`

### Filter Options

#### All Matches
- Icon: 📺
- Shows: Every match

#### Live 🔴
- Icon: 🔴
- Shows: Matches in FIRST_HALF or SECOND_HALF
- Styling: Red badge, prominent

#### Upcoming ⏰
- Icon: ⏰
- Shows: Matches with status NOT_STARTED
- Styling: Yellow badge

#### Finished ✅
- Icon: ✅
- Shows: Matches with status FULL_TIME
- Styling: Gray badge, muted

### Visual States

#### Active Tab
```
┌──────────────────────────┐
│ 🔴 Live         [5]      │
└──────────────────────────┘
```
- Background: Cyan (#06b6d4)
- Text: White
- Badge: White with 20% opacity
- Shadow: Visible
- Font weight: 600

#### Inactive Tab
```
┌──────────────────────────┐
│ 📺 All Matches  [12]     │
└──────────────────────────┘
```
- Background: Dark tertiary
- Text: Light gray
- Border: Visible
- Hover: Lighter background
- Font weight: 600

### Features
- ✅ Dynamic match counts
- ✅ Real-time filter updates
- ✅ Responsive text (hidden on mobile for space)
- ✅ Icon always visible
- ✅ Smooth transitions
- ✅ Accessible keyboard navigation

---

## CSS Utilities

### Pre-built Classes

#### Card Classes
```css
.card {
  @apply bg-background-secondary border border-background-tertiary rounded-lg;
  box-shadow: var(--shadow-md);
}

.card:hover {
  @apply border-accent;
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.card-live {
  @apply card border-2 border-live;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}
```

#### Badge Classes
```css
.live-badge {
  @apply inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase;
  @apply bg-live text-white;
  animation: pulse-subtle 1s ease-in-out infinite;
}
```

#### Button Classes
```css
.btn {
  @apply px-4 py-2 rounded-lg font-semibold text-sm transition-all;
}

.btn-primary {
  @apply bg-accent text-white hover:bg-cyan-500;
}

.btn-secondary {
  @apply bg-background-tertiary text-text-primary hover:bg-background-secondary;
}

.btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}
```

#### Input Classes
```css
.input {
  @apply w-full px-4 py-2 bg-background-tertiary text-text-primary rounded-lg;
  @apply border border-background-secondary placeholder-text-muted;
  @apply focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent;
}
```

#### Chat Classes
```css
.chat-message {
  @apply px-4 py-2 rounded-xl max-w-xs;
  animation: bounce-in var(--transition-normal);
}

.chat-message-own {
  @apply bg-accent text-white ml-auto;
}

.chat-message-other {
  @apply bg-background-tertiary text-text-primary;
}
```

### Animation Variables
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Custom Animations
```css
/* Pulsing animation for badges and indicators */
@keyframes pulse-subtle { ... }

/* Expanding ring effect for live elements */
@keyframes pulse-glow { ... }

/* Slide in from top with fade */
@keyframes slide-in-top { ... }

/* Scale and fade entrance */
@keyframes bounce-in { ... }

/* Flash effect for score updates */
@keyframes score-flash { ... }
```

---

## 📱 Responsive Behavior Summary

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| MatchCard | 1 column | 2 columns | 3 columns |
| Score Header | Stacked | Horizontal | Horizontal |
| Chat | Toggle button | Toggle button | Always visible |
| Timeline | Full width | Full width | 60% width |
| Stats | Full width | Full width | 40% width |
| Filter Tabs | Icons only | Icons + labels | Icons + labels |

---

## 🎯 Best Practices

### When Using Components

1. **Always provide required props** - TypeScript will catch missing props
2. **Use the provided CSS classes** - Maintain consistency with `card`, `btn`, `input`
3. **Handle loading states** - Show spinners for async operations
4. **Consider accessibility** - Add aria labels where needed
5. **Test on mobile** - Components are designed mobile-first

### When Creating New Components

1. **Follow the dark theme** - Use CSS variables from globals.css
2. **Use Tailwind utilities** - Build with responsive classes
3. **Include animations** - Use pre-defined keyframes
4. **Make it responsive** - Test on 3+ breakpoints
5. **Document props** - Add TypeScript interfaces

### Performance Tips

1. **Use CSS animations** - Faster than JavaScript
2. **Lazy load images** - Use Next.js Image component
3. **Optimize re-renders** - Memoize expensive components
4. **Debounce listeners** - For chat input and search
5. **Monitor bundle size** - Keep it under 100KB gzipped

---

**Component Guide Version**: 1.0  
**Last Updated**: February 2026
