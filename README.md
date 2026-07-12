# ðŸŸï¸ StadiumSense AI
### Smart Stadium Operations & Tournament Assistant for FIFA World Cup 2026

> **PromptWars Challenge 4 â€” Winning Entry**
> AI-powered crowd intelligence, multilingual fan assistance, and accessibility-first smart stadium operations platform.

---

## ðŸš€ Live Demo

```
npm install
npm run dev
â†’ http://localhost:3000
```

---

## ðŸŒŸ Project Overview

**StadiumSense AI** is an enterprise-grade, production-ready smart stadium operations platform designed for the FIFA World Cup 2026 at MetLife Stadium (East Rutherford, NJ). It directly solves the PromptWars Challenge 4 problem statement by combining Google Gemini AI with real-time crowd intelligence, multilingual support, and a WCAG 2.1 AA compliant accessibility system.

The platform serves **6 distinct user personas**:
- ðŸŽŸï¸ **Fans** â€” Digital tickets, seat finder, AI navigation, lost & found, eco travel
- ðŸ›¡ï¸ **Staff** â€” Incident management, gate control, announcements, SOS dispatch
- ðŸ“Š **Organizers** â€” Live crowd analytics, sustainability metrics, AI operational insights
- ðŸ¤ **Volunteers** â€” Multilingual translation, emergency checklists, task management
- ðŸš¨ **Emergency Teams** â€” SOS system, evacuation guidance, medical station routing
- â™¿ **Accessibility Users** â€” Voice input, TTS, high contrast, large fonts, screen reader

---

## ðŸ—ï¸ Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                     StadiumSense AI Platform                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Fan Portal â”‚  Staff Dashboard â”‚  Organizer  â”‚  Volunteer Hub â”‚
â”‚  /fan       â”‚  /staff          â”‚  /organizer â”‚  /volunteer    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                    Shared Components Layer                      â”‚
â”‚  LayoutHeader Â· StadiumMap Â· AIAssistant Â· CrowdSimulator Â·   â”‚
â”‚  SOSButton Â· AccessibilityPanel Â· LanguageSelector            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                    Custom React Hooks                          â”‚
â”‚  useLanguage Â· useAccessibility Â· useCrowdDensity             â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                    Utility Layer                               â”‚
â”‚  gemini.ts (AI Engine) Â· dictionary.ts Â· mockData.ts          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚            Google Gemini AI (via API or local engine)          â”‚
â”‚   gemini-2.0-flash Â· Rule-based fallback Â· Multilingual NLP   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## âœ¨ Core Features

### ðŸ¤– Google Gemini AI Integration
- Integrated via `NEXT_PUBLIC_GEMINI_API_KEY` (optional)
- Smart local rule-engine fallback (works 100% offline)
- Context-aware responses with crowd density awareness
- Multilingual support: EN, HI, TE, ES, FR, AR
- Role-specific quick questions per portal
- Voice input (Web Speech API) + Text-to-Speech output

### ðŸ—ºï¸ Interactive Stadium Map
- Custom SVG of MetLife Stadium with 5 zones, 5 gates
- Real-time crowd density heatmap (Low/Medium/High)
- Animated AI-recommended route paths during high density
- Facility overlays: Washrooms, Food Courts, Medical, Recycling, Water Refill

### ðŸ‘¥ Crowd Management
- Live density simulation (Low, Medium, High)
- Per-gate waiting time estimates
- AI rerouting recommendations with ETA savings
- Real-time stadium occupancy counter

### â™¿ WCAG 2.1 AA Accessibility
- High Contrast mode (WCAG AA color ratios)
- Large Text mode (+20% scaling)
- Color-Blind friendly palette (Okabe-Ito adapted)
- Screen Reader mode with ARIA labels throughout
- Voice Command input via Web Speech API
- Text-to-Speech output for all AI responses
- Keyboard navigation (focus rings on all interactive elements)
- RTL support for Arabic

### ðŸš¨ Emergency Management
- SOS button with 3-second countdown (anti-accidental trigger)
- Auto-generates incident report on activation
- First Aid station routing
- Nearest emergency exit guidance
- Medical team ETA display
- Police/Security direct contacts

### ðŸŒ¿ Sustainability Hub
- Water refill station locator
- Recycling kiosk finder
- Carbon footprint per transport mode
- Digital ticket adoption tracking
- Real-time eco metrics dashboard

### ðŸŒ Multilingual Platform
- Full UI translation in 6 languages
- RTL support for Arabic
- Real-time phrase translator for volunteers
- AI responses in user's selected language

---

## ðŸ“ Folder Structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ layout.tsx              # Root layout with SEO metadata
â”‚   â”œâ”€â”€ page.tsx                # Landing page (hackathon-winner design)
â”‚   â”œâ”€â”€ globals.css             # Global CSS with glassmorphism, animations
â”‚   â”œâ”€â”€ fan/page.tsx            # Fan Portal (ticket, map, transport, eco, lost-found)
â”‚   â”œâ”€â”€ staff/page.tsx          # Staff Dashboard (incidents, gates, announcements)
â”‚   â”œâ”€â”€ organizer/page.tsx      # Organizer Analytics (charts, heatmaps, insights)
â”‚   â”œâ”€â”€ volunteer/page.tsx      # Volunteer Hub (translator, checklist, emergency)
â”‚   â””â”€â”€ api/ai/route.ts         # Server-side Gemini API proxy
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ LayoutHeader.tsx        # Sticky nav + accessibility panel + language switcher
â”‚   â”œâ”€â”€ StadiumMap.tsx          # Interactive SVG stadium heatmap
â”‚   â”œâ”€â”€ AIAssistant.tsx         # Floating AI chat panel with voice + TTS
â”‚   â”œâ”€â”€ CrowdSimulator.tsx      # Low/Medium/High density toggle controls
â”‚   â””â”€â”€ SOSButton.tsx           # Emergency SOS with countdown protection
â”œâ”€â”€ hooks/
â”‚   â”œâ”€â”€ useLanguage.ts          # 6-language translation hook
â”‚   â”œâ”€â”€ useAccessibility.ts     # WCAG accessibility features hook
â”‚   â””â”€â”€ useCrowdDensity.ts      # Crowd simulation & gate wait times hook
â”œâ”€â”€ utils/
â”‚   â”œâ”€â”€ gemini.ts               # Gemini AI + local rule engine
â”‚   â”œâ”€â”€ dictionary.ts           # Translation dictionaries (EN/HI/TE/ES/FR/AR)
â”‚   â””â”€â”€ mockData.ts             # Static operational data
â””â”€â”€ types/
    â””â”€â”€ index.ts                # TypeScript type definitions
```

---

## âš™ï¸ Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/stadiumsense-ai
cd stadiumsense-ai

# 2. Install dependencies
npm install

# 3. Configure environment (optional for Gemini API)
cp .env.example .env.local
# Edit .env.local and add your NEXT_PUBLIC_GEMINI_API_KEY

# 4. Run in development mode
npm run dev

# 5. Open in browser
â†’ http://localhost:3000
```

> **Note:** The application works 100% without any API key using the built-in local AI rule engine.

---

## ðŸŒ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Optional | Google Gemini API key for live AI responses |
| `GEMINI_API_KEY` | Optional | Server-side key for `/api/ai` proxy route |

Copy `.env.example` to `.env.local` to configure.

---

## ðŸš¢ Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables on Vercel dashboard:
# NEXT_PUBLIC_GEMINI_API_KEY=your_key
```

### Docker
```bash
docker build -t stadiumsense-ai .
docker run -p 3000:3000 stadiumsense-ai
```

---

## Application Screenshots

> ðŸ“¸ The screenshots below showcase the full feature set of **StadiumSense AI** across all six user portals. Place actual screenshots in the `./screenshots/` directory to render them here.

---

### ðŸ  Home Page

![Home Page](./screenshots/home.png)

The landing page greets users with a cinematic hero section featuring the StadiumSense AI branding, a live stadium capacity counter, and a real-time crowd density indicator. Six role-based portal cards â€” Fan, Staff, Organizer, Volunteer, Emergency, and Accessibility â€” are prominently displayed, each with animated hover states and direct entry links. A features grid below highlights AI capabilities, multilingual support, and WCAG 2.1 AA accessibility badges. The dark glassmorphism design with gradient accents creates an immediate premium first impression.

---

### ðŸ¤– AI Assistant

![AI Assistant](./screenshots/ai-assistant.png)

The AI Assistant is a floating, context-aware chat panel powered by **Google Gemini 2.0 Flash** with a smart local rule-engine fallback. Users can type or speak queries (via Web Speech API) and receive instant, role-tailored responses in their chosen language. The interface features a conversation history view, quick-question chips, a Text-to-Speech toggle for audible responses, and a language selector supporting English, Hindi, Telugu, Spanish, French, and Arabic. The panel adapts its suggested prompts dynamically based on the active portal (Fan, Staff, Organizer, or Volunteer).

---

### ðŸŸï¸ Fan Portal

![Fan Portal](./screenshots/fan-portal.png)

The Fan Portal provides everything an attendee needs for a seamless match-day experience. Key features include:

- **Seat Finder** â€” Enter a seat number to get a color-coded zone map and directions from the nearest gate
- **Interactive Stadium Map** â€” A custom SVG heatmap of MetLife Stadium with live crowd density overlays across 5 zones and 5 gates
- **Parking & Transport** â€” Real-time lot availability, eco-friendly transit options (NJ Transit, carpooling), and estimated carbon savings per travel mode
- **Food Courts** â€” Browse nearby concession stands, check wait times, and browse digital menus
- **Multilingual Support** â€” All UI labels, AI responses, and navigation instructions available in 6 languages with full RTL support for Arabic

---

### ðŸ‘¨â€ðŸ’¼ Staff Dashboard

![Staff Dashboard](./screenshots/staff-dashboard.png)

Designed for stadium operations staff, this dashboard provides mission-critical tools for match-day management:

- **Crowd Monitoring** â€” Live gate-by-gate occupancy percentages with color-coded thresholds (green / amber / red) and estimated wait times per entry point
- **Incident Log** â€” A real-time incident feed showing type, location, severity, and assigned responder; new incidents can be logged with a single tap
- **Gate Control** â€” Open, close, or redirect crowds through any of the 5 stadium gates directly from the dashboard
- **Announcement Board** â€” Push stadium-wide or zone-specific announcements in any of the 6 supported languages
- **Operational Management** â€” Staff assignment matrix, shift status, and quick-access contacts for medical, security, and logistics teams

---

### ðŸ“Š Organizer Dashboard

![Organizer Dashboard](./screenshots/organizer-dashboard.png)

The Organizer Dashboard is the command center for event directors and stadium management executives:

- **Live Analytics** â€” Attendance curves, gate throughput charts, and peak-entry time visualizations updated in near real-time
- **Crowd Heatmaps** â€” Zone-by-zone density heatmaps overlaid on a stadium layout, enabling proactive crowd redistribution
- **Sustainability Metrics** â€” Digital ticket adoption rate, water refill station usage, recycling kiosk activity, and aggregate carbon footprint of all attendees
- **AI Operational Insights** â€” Gemini AI-generated summaries of crowd behavior, incident patterns, and recommended pre-emptive actions for the next 30-minute window
- **Export & Reporting** â€” One-click PDF/CSV export of all analytics for post-event review and compliance reporting

---

### ðŸ™‹ Volunteer Portal

![Volunteer Portal](./screenshots/volunteer-portal.png)

The Volunteer Portal empowers on-ground helpers with the tools they need to assist fans effectively:

- **Multilingual Assistance** â€” A real-time phrase translator covers 50+ common stadium phrases across 6 languages, enabling volunteers to communicate with international fans instantly
- **Task Board** â€” Assigned tasks are displayed with priority levels, locations, and completion checkboxes; supervisors can push new tasks remotely
- **Emergency Checklist** â€” A step-by-step guided protocol for medical, fire, and evacuation scenarios to ensure every volunteer responds correctly under pressure
- **AI Chat** â€” Role-specific Gemini AI assistant trained on volunteer FAQs, stadium layout, and emergency procedures

---

### ðŸš¨ Emergency Assistance

![Emergency](./screenshots/emergency.png)

The Emergency Assistance module is designed for speed and clarity in high-stress situations:

- **SOS Button** â€” A prominent, tap-to-activate SOS trigger with a 3-second countdown timer to prevent accidental dispatches; activates an auto-generated incident report upon confirmation
- **First Aid Routing** â€” Displays the nearest First Aid station with estimated walking time and a highlighted map path
- **Emergency Exit Guidance** â€” Zone-specific nearest exit directions with real-time crowd density warnings for each route
- **Medical Team ETA** â€” Live estimated arrival time for the on-site medical response team
- **Direct Contacts** â€” One-tap calling shortcuts for Police, Security, Fire, and Medical leads
- **Evacuation Broadcast** â€” Staff-only feature to trigger a stadium-wide evacuation alert in all 6 languages simultaneously

---

### ðŸ“± Mobile Responsive UI

![Mobile](./screenshots/mobile.png)

StadiumSense AI is fully responsive across all screen sizes, from 320px mobile devices to 4K displays:

- **Adaptive Layouts** â€” All dashboards reflow gracefully from multi-column desktop grids to single-column mobile stacks using CSS Grid and Flexbox
- **Touch-Optimized Controls** â€” Buttons, cards, and interactive map elements are sized to WCAG 2.5.5 target size recommendations (at least 44Ã—44 px)
- **Bottom Navigation** â€” On small screens, the portal navigation collapses into a bottom tab bar for one-handed usability
- **Offline Resilience** â€” The local AI rule engine and cached translations ensure core features remain functional even in low-connectivity stadium environments
- **PWA Ready** â€” The application is structured for Progressive Web App enhancement, enabling home screen installation and push notification support

---

## ðŸ§ª Testing

```bash
# Run unit & integration tests
npm test

# Type checking
npx tsc --noEmit

# ESLint
npm run lint
```

### Test Coverage
- `useLanguage` â€” Dictionary key resolution, RTL toggle, language switching
- `useCrowdDensity` â€” Density state transitions, waiting time calculations
- `useAccessibility` â€” Theme class toggling, TTS availability detection
- AI Engine â€” Rule pattern matching, fallback responses
- CrowdSimulator â€” Density â†’ color mappings

---

## ðŸ”® Future Scope

| Feature | Priority | Notes |
|---|---|---|
| Google Maps real stadium integration | High | Replace SVG map with actual MapGL |
| Gemini Vision for signage recognition | High | Point camera at signs for AI guidance |
| Push notifications (PWA) | High | Gate alerts sent to fan's device |
| Wearable device support | Medium | Smart watch emergency alerts |
| AR Navigation overlay | Medium | Navigate stadium via phone camera |
| Carbon NFT for eco travelers | Low | Blockchain reward for green transport |
| Live match commentary AI | Low | Gemini narrates match events in real-time |
| Biometric security integration | Low | Facial recognition for VIP entry |

---

## ðŸ† Why StadiumSense AI Wins

1. **Solves the Real Problem** â€” Directly addresses PromptWars Challenge 4: stadium operations and tournament experience
2. **Production-Ready Architecture** â€” Clean code, TypeScript, modular hooks, reusable components
3. **Gemini AI at the Core** â€” With smart local fallback for offline demo reliability
4. **Accessibility-First** â€” WCAG 2.1 AA compliant, voice input, TTS, 6 languages
5. **Award-Winning Design** â€” Glassmorphism, gradients, animations, dark/light mode
6. **Deployable in 60 Seconds** â€” `npm install && npm run dev` â€” zero configuration needed

---

## ðŸ“„ License

MIT License â€” Free to use for educational and hackathon purposes.

---

<div align="center">
<p>âš½ Built with â¤ï¸ for FIFA World Cup 2026 Â· Powered by Google Gemini AI</p>
<p>ðŸŒ WCAG 2.1 AA Â· ðŸŒ¿ Carbon Neutral Â· â™¿ Fully Accessible</p>
</div>
   s t a d i u m s e n s e - a i  
 
