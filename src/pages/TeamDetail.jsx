import { useParams, useNavigate } from 'react-router-dom'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { getTeamHistory, getTeamAllRounds, getTierForTeam, seasons, seasonLabels, roundLabels } from '../data/dataUtils.js'

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--line)', padding:'10px 14px', fontFamily:'var(--mono)', fontSize:11 }}>
      <div style={{ color:'var(--green)', marginBottom:6 }}>{label}</div>
      {payload.map((p,i) => <div key={i} style={{ color:p.color }}>{p.name}: {typeof p.value==='number'?p.value.toFixed(1):p.value}</div>)}
    </div>
  )
}

export default function TeamDetail() {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const history = getTeamHistory(teamId)

  const latestSeason = Object.keys(history).sort().reverse()[0]
  const latestRounds = latestSeason ? history[latestSeason] : {}
  const latestData = Object.values(latestRounds)[Object.values(latestRounds).length - 1] || {}
  const teamName = latestData.teamName || teamId

  // Build score progression across seasons/rounds
  const progression = []
  seasons.slice().reverse().forEach(season => {
    if (!history[season]) return
    const rd = history[season]
    ;['round1','round2','state','semis'].forEach(r => {
      if (rd[r]) {
        progression.push({
          label: `${seasonLabels[season]} ${roundLabels[r]}`,
          score: rd[r].totalScore || 0,
          nvRank: rd[r].nvRank || null,
          nationalRank: rd[r].nationalRank || null,
        })
      }
    })
  })

  // Radar data for latest round2 or state
  const radarSource = latestRounds.round2 || latestRounds.state || latestRounds.round1 || {}
  const radarData = [
    { subject:'Linux', value: radarSource.linux ?? radarSource.linuxMint ?? radarSource.mint ?? 0, max:100 },
    { subject:'Windows', value: radarSource.windows ?? radarSource.win11 ?? radarSource.ubuntu ?? 0, max:100 },
    { subject:'Server', value: radarSource.winServer ?? radarSource.winServer22 ?? radarSource.winSrv22 ?? 0, max:100 },
    { subject:'Packet', value: (radarSource.packetQuiz||0)+(radarSource.packetImage||0)+(radarSource.packetTracer||0), max:30 },
  ].map(d => ({ ...d, pct: Math.min(100, (d.value/d.max)*100) }))

  const tierBadge = (tier) => {
    if (!tier) return null
    const t = tier.toLowerCase()
    const cls = t==='platinum'?'tier-plat':t==='gold'?'tier-gold':'tier-silv'
    return <span className={`tier-badge ${cls}`}>{tier.toUpperCase()}</span>
  }

  if (!Object.keys(history).length) {
    return (
      <div style={{ paddingTop:60, textAlign:'center', fontFamily:'var(--mono)', color:'var(--mute)', letterSpacing:'.15em' }}>
        <div style={{ fontSize:48, color:'var(--dim)', marginBottom:20 }}>?</div>
        <div>&gt; TEAM {teamId} NOT FOUND IN ARCHIVE</div>
        <button className="btn" style={{ marginTop:24 }} onClick={() => navigate('/teams')}>← BACK TO EXPLORER</button>
      </div>
    )
  }

  return (
    <div style={{ paddingTop:26 }}>
      {/* Back + header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:26 }}>
        <button className="btn btn-sm" onClick={() => navigate('/teams')}>← BACK</button>
        <div>
          <div style={{ fontSize:22, fontWeight:800, color:'#d7ffe1', letterSpacing:'.02em', textShadow:'0 0 18px rgba(0,255,65,.2)' }}>
            {teamName}
          </div>
          <div style={{ fontSize:11, letterSpacing:'.25em', color:'var(--mute)', marginTop:4, textTransform:'uppercase' }}>
            {teamId} · NV · West Career &amp; Technical Academy
          </div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:10, alignItems:'center' }}>
          {seasons.map(s => history[s] && tierBadge(getTierForTeam(teamId, s)) ? (
            <div key={s} style={{ textAlign:'center' }}>
              {tierBadge(getTierForTeam(teamId, s))}
              <div style={{ fontSize:9, color:'var(--dim)', letterSpacing:'.15em', marginTop:4 }}>{seasonLabels[s]}</div>
            </div>
          ) : null)}
        </div>
      </div>

      {/* Hero stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }}>
        {/* Score progression chart */}
        <div className="panel">
          <div className="phead"><span className="id">[P-01]</span> SCORE PROGRESSION <span className="tag">◆ ALL ROUNDS</span></div>
          <div className="pbody">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={progression} margin={{ top:10, right:10, bottom:0, left:-15 }}>
                <CartesianGrid stroke="rgba(0,255,65,.06)" />
                <XAxis dataKey="label" tick={{ fill:'var(--mute)', fontFamily:'var(--mono)', fontSize:9 }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" height={45} />
                <YAxis tick={{ fill:'var(--dim)', fontFamily:'var(--mono)', fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<QTip />} />
                <Line type="monotone" dataKey="score" name="Score" stroke="#00FF41" strokeWidth={2} dot={{ fill:'#00FF41', r:4, strokeWidth:0 }} activeDot={{ r:6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar */}
        <div className="panel">
          <div className="phead"><span className="id">[P-02]</span> CATEGORY RADAR · LATEST DATA <span className="tag">◆ S{latestSeason}</span></div>
          <div className="pbody">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,255,65,.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill:'var(--mute)', fontFamily:'var(--mono)', fontSize:11 }} />
                <Radar name="Score %" dataKey="pct" stroke="#00FF41" fill="rgba(0,255,65,.18)" strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Round-by-round breakdown */}
      {seasons.slice().reverse().map(season => {
        if (!history[season]) return null
        const rd = history[season]
        return (
          <section key={season} style={{ marginTop:30 }}>
            <div className="sec-head">
              <span className="num">§</span>
              <span className="ttl">Season {seasonLabels[season]}</span>
              <span className="rule" />
              <span className="meta">{Object.keys(rd).length} round{Object.keys(rd).length!==1?'s':''} recorded</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(Object.keys(rd).length,4)},1fr)`, gap:16 }}>
              {['round1','round2','state','semis'].map(r => {
                if (!rd[r]) return null
                const d = rd[r]
                const scoreKeys = Object.entries(d).filter(([k,v]) => typeof v==='number' && !['totalScore','nationalRank','nvRank'].includes(k) && v > 0 && v <= 200)
                return (
                  <div key={r} className="panel">
                    <div className="phead"><span className="id">[{r[0].toUpperCase()}]</span> {roundLabels[r]}</div>
                    <div className="pbody" style={{ padding:'14px' }}>
                      <div style={{ fontSize:32, fontWeight:800, color:'var(--green)', textShadow:'0 0 14px rgba(0,255,65,.3)', marginBottom:12 }}>
                        {d.totalScore?.toFixed(1) ?? '—'}
                      </div>
                      {scoreKeys.slice(0,6).map(([k,v]) => (
                        <div key={k} style={{ marginBottom:8 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--mute)', marginBottom:4 }}>
                            <span>{k.replace(/([A-Z])/g,' $1').trim()}</span>
                            <span style={{ color: v>=80?'var(--green)':v>=50?'var(--fg)':'var(--mute)' }}>{v.toFixed(1)}</span>
                          </div>
                          <div style={{ height:3, background:'var(--bg-2)', position:'relative' }}>
                            <div style={{ position:'absolute', inset:0, right:`${100 - Math.min(100,(v/100)*100)}%`, background:'linear-gradient(90deg,var(--green),rgba(0,255,65,.4))', boxShadow:'0 0 6px rgba(0,255,65,.3)' }} />
                          </div>
                        </div>
                      ))}
                      {d.nvRank && <div style={{ marginTop:10, fontSize:11, color:'var(--green)', letterSpacing:'.12em' }}>NV Rank: #{d.nvRank}</div>}
                      {d.nationalRank && <div style={{ fontSize:11, color:'var(--mute)', letterSpacing:'.12em' }}>Natl: #{d.nationalRank}</div>}
                      {d.advanced !== undefined && (
                        <div style={{ marginTop:8, fontSize:11, color: d.advanced ? 'var(--green)' : 'var(--dim)', letterSpacing:'.12em' }}>
                          {d.advanced ? '▶ ADVANCED' : '— DID NOT ADVANCE'}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
