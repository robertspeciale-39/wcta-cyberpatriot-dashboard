/**
 * WCTA CyberPatriot Dashboard — Cloudflare Worker API
 * Uses Cloudflare D1 (SQLite) for persistence
 *
 * Routes:
 *   GET  /api/rounds?season=XX-XX&round=round2
 *   POST /api/rounds  { season, round, teams: [...] }
 *   PUT  /api/rounds/:id  { ...updated fields }
 *   DELETE /api/rounds/:id
 *   GET  /api/health
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  })
}

function err(msg, status = 400) {
  return json({ error: msg }, status)
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS rounds (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  season      TEXT    NOT NULL,
  round       TEXT    NOT NULL,
  teamId      TEXT    NOT NULL,
  teamName    TEXT    NOT NULL,
  linux       REAL,
  winServer   REAL,
  windows     REAL,
  mint        REAL,
  win11       REAL,
  winServer22 REAL,
  linuxMint   REAL,
  winSrv22    REAL,
  winSrv19    REAL,
  ubuntu      REAL,
  adjust      REAL,
  packetQuiz  REAL,
  packetImage REAL,
  packetTracer REAL,
  webBased    REAL,
  ptQuiz      REAL,
  ptImage     REAL,
  totalScore  REAL,
  nationalRank INTEGER,
  nvRank      INTEGER,
  advanced    INTEGER DEFAULT 0,
  createdAt   TEXT    DEFAULT (datetime('now')),
  updatedAt   TEXT    DEFAULT (datetime('now')),
  UNIQUE(season, round, teamId)
);
`

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const { pathname } = url

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS })
    }

    // Init DB schema on first request
    try {
      await env.DB.exec(SCHEMA)
    } catch (e) {
      // Table likely already exists — fine
    }

    // Route: health
    if (pathname === '/api/health') {
      return json({ status: 'ok', ts: new Date().toISOString(), service: 'wcta-cyberpatriot' })
    }

    // Route: /api/rounds
    if (pathname === '/api/rounds') {
      // GET — fetch rounds
      if (request.method === 'GET') {
        const season = url.searchParams.get('season')
        const round  = url.searchParams.get('round')
        let query = 'SELECT * FROM rounds WHERE 1=1'
        const params = []
        if (season) { query += ' AND season = ?'; params.push(season) }
        if (round)  { query += ' AND round = ?';  params.push(round) }
        query += ' ORDER BY totalScore DESC'
        const { results } = await env.DB.prepare(query).bind(...params).all()
        return json({ season, round, count: results.length, data: results })
      }

      // POST — insert new round data
      if (request.method === 'POST') {
        const body = await request.json().catch(() => null)
        if (!body || !body.season || !body.round || !Array.isArray(body.teams)) {
          return err('Missing required fields: season, round, teams[]')
        }
        const inserted = []
        const errors   = []
        for (const t of body.teams) {
          if (!t.teamId || !t.teamName) { errors.push(`Missing teamId/teamName: ${JSON.stringify(t)}`); continue }
          try {
            const cols = ['season','round','teamId','teamName','linux','winServer','windows','mint','win11','winServer22',
              'linuxMint','winSrv22','winSrv19','ubuntu','adjust','packetQuiz','packetImage','packetTracer',
              'webBased','ptQuiz','ptImage','totalScore','nationalRank','nvRank','advanced']
            const vals = cols.map(c => {
              if (c==='season') return body.season
              if (c==='round')  return body.round
              if (c==='advanced') return t.advanced ? 1 : 0
              return t[c] ?? null
            })
            const placeholders = cols.map(() => '?').join(',')
            await env.DB.prepare(
              `INSERT OR REPLACE INTO rounds (${cols.join(',')}) VALUES (${placeholders})`
            ).bind(...vals).run()
            inserted.push(t.teamId)
          } catch (e) {
            errors.push(`${t.teamId}: ${e.message}`)
          }
        }
        return json({ inserted: inserted.length, errors, insertedIds: inserted }, 201)
      }
    }

    // Route: /api/rounds/:id
    const idMatch = pathname.match(/^\/api\/rounds\/(\d+)$/)
    if (idMatch) {
      const id = parseInt(idMatch[1])

      // PUT — update
      if (request.method === 'PUT') {
        const body = await request.json().catch(() => null)
        if (!body) return err('Invalid JSON body')
        const allowed = ['teamName','linux','winServer','windows','mint','win11','winServer22',
          'linuxMint','winSrv22','winSrv19','ubuntu','adjust','packetQuiz','packetImage',
          'packetTracer','webBased','ptQuiz','ptImage','totalScore','nationalRank','nvRank','advanced']
        const sets = []
        const vals = []
        for (const [k,v] of Object.entries(body)) {
          if (allowed.includes(k)) { sets.push(`${k} = ?`); vals.push(v) }
        }
        if (!sets.length) return err('No valid fields to update')
        sets.push("updatedAt = datetime('now')")
        vals.push(id)
        await env.DB.prepare(`UPDATE rounds SET ${sets.join(', ')} WHERE id = ?`).bind(...vals).run()
        return json({ updated: id })
      }

      // DELETE
      if (request.method === 'DELETE') {
        await env.DB.prepare('DELETE FROM rounds WHERE id = ?').bind(id).run()
        return json({ deleted: id })
      }
    }

    return json({ error: 'Not Found', path: pathname }, 404)
  }
}
