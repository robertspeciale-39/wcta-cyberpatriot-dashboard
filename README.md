# WCTA CyberPatriot Dashboard
## Matrix Cyber Theme · React + Cloudflare

### Pages
- **Splash** (`/`) — Boot sequence, animated terminal, enter button
- **Dashboard** (`/dashboard`) — Live stats, tier YoY chart, score trend, semi-finalists
- **Team Explorer** (`/teams`) — Filterable/sortable by season + round
- **Team Detail** (`/teams/:teamId`) — Score progression, radar chart, round breakdown
- **Analytics** (`/analytics`) — Category trends, advancement rates, top performers
- **Data Entry** (`/entry`) — Form to add new round data, CSV export, Cloudflare D1 save

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Cloudflare Deployment

### Step 1 — Install Wrangler CLI
```bash
npm install -g wrangler
wrangler login
```

### Step 2 — Create D1 Database
```bash
wrangler d1 create wcta-cyberpatriot
# Copy the database_id from output
```

### Step 3 — Update wrangler.toml
Replace `YOUR_D1_DATABASE_ID` with the ID from Step 2.

### Step 4 — Initialize Database Schema
```bash
wrangler d1 execute wcta-cyberpatriot --command "
CREATE TABLE IF NOT EXISTS rounds (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  season       TEXT    NOT NULL,
  round        TEXT    NOT NULL,
  teamId       TEXT    NOT NULL,
  teamName     TEXT    NOT NULL,
  linux        REAL, winServer REAL, windows REAL,
  mint         REAL, win11 REAL, winServer22 REAL,
  linuxMint    REAL, winSrv22 REAL, winSrv19 REAL,
  ubuntu       REAL, adjust REAL,
  packetQuiz   REAL, packetImage REAL, packetTracer REAL,
  webBased     REAL, ptQuiz REAL, ptImage REAL,
  totalScore   REAL, nationalRank INTEGER, nvRank INTEGER,
  advanced     INTEGER DEFAULT 0,
  createdAt    TEXT DEFAULT (datetime('now')),
  updatedAt    TEXT DEFAULT (datetime('now')),
  UNIQUE(season, round, teamId)
);"
```

### Step 5 — Build + Deploy
```bash
npm run build
wrangler pages deploy dist --project-name wcta-cyberpatriot-dashboard
```

### Step 6 — Deploy Worker (API)
```bash
wrangler deploy
```

### Step 7 — Connect to Your Website
Once deployed, your dashboard will be at:
`https://wcta-cyberpatriot-dashboard.pages.dev`

To add to your main website, link to it as:
```html
<a href="https://wcta-cyberpatriot-dashboard.pages.dev/dashboard">
  CyberPatriot Scoreboard
</a>
```

---

## API Endpoints

```
GET    /api/health
GET    /api/rounds?season=25-26&round=round2
POST   /api/rounds  { season, round, teams: [...] }
PUT    /api/rounds/:id  { ...fields }
DELETE /api/rounds/:id
```

### Example POST payload
```json
{
  "season": "25-26",
  "round": "round2",
  "teams": [
    {
      "teamId": "18-1535",
      "teamName": "Shake and Bake",
      "mint": 100.0,
      "winServer22": 81.0,
      "win11": 96.0,
      "packetQuiz": 10.0,
      "packetImage": 19.2,
      "nationalRank": 91,
      "nvRank": 2
    }
  ]
}
```

---

## Project Structure
```
wcta-dashboard/
├── src/
│   ├── pages/
│   │   ├── Splash.jsx          # Boot screen + enter button
│   │   ├── Splash.css
│   │   ├── Dashboard.jsx       # Main overview
│   │   ├── TeamExplorer.jsx    # Sortable/filterable table
│   │   ├── TeamDetail.jsx      # Individual team deep-dive
│   │   ├── Analytics.jsx       # Club-level analytics
│   │   └── DataEntry.jsx       # Input form + CSV export
│   ├── components/
│   │   └── Layout.jsx          # Shared header, nav, statusbar
│   ├── data/
│   │   ├── historicalData.json # Extracted from Excel
│   │   └── dataUtils.js        # Query helpers
│   ├── App.jsx                 # Router
│   ├── main.jsx                # Entry point
│   └── global.css              # Matrix theme tokens + shared styles
├── worker/
│   └── index.js                # Cloudflare Worker API
├── wrangler.toml               # Cloudflare config
├── vite.config.js
└── package.json
```

---

## Adding New Season Data

### Option A: Data Entry UI
1. Go to `/entry`
2. Select new season + round
3. Enter team scores
4. Click "COMMIT TO STORE"

### Option B: API
```bash
curl -X POST https://your-worker.workers.dev/api/rounds \
  -H "Content-Type: application/json" \
  -d '{"season":"26-27","round":"round1","teams":[...]}'
```

### Option C: Update historicalData.json
Add the new season data to `src/data/historicalData.json` and rebuild.

---

## Cost Estimate
- Cloudflare Pages: **Free** (unlimited bandwidth)
- Cloudflare Workers: **Free** (100k req/day)
- Cloudflare D1: **Free** (5GB storage, 25M reads/day)
- **Total: ~$0/month**

Paid tier needed only if you exceed free limits (extremely unlikely for this use case).
