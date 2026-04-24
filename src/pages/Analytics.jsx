import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid } from 'recharts'
import { getRoundData, seasons, seasonLabels, roundLabels } from '../data/dataUtils.js'

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--line)', padding:'10px 14px', fontFamily:'var(--mono)', fontSize:11 }}>
      <div style={{ color:'var(--green)', marginBottom:6 }}>{label}</div>
      {payload.map((p,i) => <div key={i} style={{ color:p.color||'var(--fg)' }}>{p.name}: {typeof p.value==='number'?p.value.toFixed(1):p.value}</div>)}
    </div>
  )
}

function Stat({ label, value, sub, color }) {
  return (
    <div style={{ padding:'16px', borderRight:'1px dashed var(--line-dim)' }}>
      <div style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--mute)', display:'flex', alignItems:'center', gap:6 }}>
        <span style={{ color:'var(--red)' }}>$</span>{label}
      </div>
      <div style={{ fontWeight:800, fontSize:32, lineHeight:1, marginTop:8, color:color||'var(--fg)', textShadow:'0 0 14px rgba(0,255,65,.15)' }}>{value}</div>
      {sub && <div style={{ marginTop:6, fontSize:11, color:'var(--mute)' }}>{sub}</div>}
    </div>
  )
}

export default function Analytics() {
  // National percentile trend (from rounds that have rank data)
  const pctTrend = useMemo(() => {
    const pts = []
    seasons.slice().reverse().forEach(s => {
      ;['round1','round2'].forEach(r => {
        const d = getRoundData(s, r)
        if (!d.length) return
        const ranked = d.filter(t => t.nationalRank && t.nationalRank > 0)
        if (!ranked.length) return
        // Figure total teams from data or estimate
        const totals = { 'round1':{'22-23':0,'23-24':0,'24-25':2160,'25-26':1964}, 'round2':{'22-23':0,'23-24':2120,'24-25':2085,'25-26':1973} }
        const total = totals[r]?.[s] || 1964
        const avgRank = ranked.reduce((a,b) => a + (b.nationalRank||0), 0) / ranked.length
        const pct = Math.round(((total - avgRank) / total) * 100)
        pts.push({ label:`${seasonLabels[s]} ${roundLabels[r]}`, pct, avgRank:Math.round(avgRank), total })
      })
    })
    return pts
  }, [])

  // Category averages by season (using R2 data where available)
  const catData = useMemo(() => {
    return seasons.map(s => {
      const d = getRoundData(s, 'round2').filter(t => t.totalScore)
      if (!d.length) return { season:seasonLabels[s], linux:0, windows:0, server:0, packet:0 }
      const avg = key => {
        const vals = d.map(t => t[key]).filter(v => typeof v==='number' && v > 0)
        return vals.length ? Math.round(vals.reduce((a,b)=>a+b,0)/vals.length) : 0
      }
      return {
        season: seasonLabels[s],
        linux: avg('linux') || avg('mint') || avg('linuxMint'),
        windows: avg('windows') || avg('win11'),
        server: avg('winServer') || avg('winServer22') || avg('winSrv22'),
        packet: Math.round((avg('packetQuiz')||0) + (avg('packetImage')||0) + (avg('packetTracer')||0))
      }
    })
  }, [])

  // Top performers matrix for 25-26 R2
  const r2 = getRoundData('25-26', 'round2')
  const topLinux = [...r2].sort((a,b)=>(b.mint||b.linux||0)-(a.mint||a.linux||0)).slice(0,5)
  const topWindows = [...r2].sort((a,b)=>(b.win11||b.windows||0)-(a.win11||a.windows||0)).slice(0,5)
  const topServer = [...r2].sort((a,b)=>(b.winServer22||b.winServer||0)-(a.winServer22||a.winServer||0)).slice(0,5)
  const topPacket = [...r2].sort((a,b)=>((b.packetQuiz||0)+(b.packetImage||0))-((a.packetQuiz||0)+(a.packetImage||0))).slice(0,5)

  // Semi advancement rates
  const advData = seasons.map(s => {
    const state = getRoundData(s, 'state')
    const semis = getRoundData(s, 'semis')
    const adv = state.filter(t=>t.advanced).length || semis.length
    return { season:seasonLabels[s], teams:state.length||semis.length, advanced:adv, rate: state.length ? Math.round((adv/state.length)*100) : 0 }
  })

  // 25-26 current season stats
  const curr = getRoundData('25-26', 'round2')
  const currScores = curr.map(t=>t.totalScore).filter(Boolean)
  const currAvg = currScores.length ? (currScores.reduce((a,b)=>a+b,0)/currScores.length).toFixed(1) : '—'
  const currMax = currScores.length ? Math.max(...currScores).toFixed(1) : '—'
  const currMin = currScores.length ? Math.min(...currScores).toFixed(1) : '—'

  const TopTable = ({ title, data: td, key1, key2 }) => (
    <div>
      <div style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--green)', marginBottom:8, display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ color:'var(--red)' }}>$</span>{title}
      </div>
      {td.map((t, i) => (
        <div key={t.teamId} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
          <span style={{ width:20, color:'var(--dim)', fontSize:11 }}>{i+1}</span>
          <span style={{ flex:1, fontSize:12, color: i===0?'#d7ffe1':'var(--fg)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {t.teamName}
          </span>
          <span style={{ color: i===0?'var(--green)':'var(--mute)', fontSize:13, fontWeight:700, letterSpacing:'.02em' }}>
            {((t[key1]||t[key2]||0)).toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ paddingTop:26 }}>

      {/* Summary stats */}
      <div className="panel">
        <div className="phead"><span className="id">[A-01]</span> CURRENT SEASON ANALYTICS · S25-26 R2 <span className="tag">◆ LIVE</span></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          <Stat label="Avg Score" value={currAvg} sub="Round 2 · S25-26" color="var(--fg)" />
          <Stat label="Top Score" value={currMax} sub="Best team this season" color="var(--green)" />
          <Stat label="Min Score" value={currMin} sub="Bottom performer" color="var(--mute)" />
          <Stat label="Teams" value={curr.length} sub="Competing this season" color="var(--fg)" />
        </div>
      </div>

      {/* National percentile + category trends */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22, marginTop:22 }}>

        {/* Category averages YoY */}
        <div className="panel">
          <div className="phead"><span className="id">[A-02]</span> CATEGORY AVG · YEAR OVER YEAR <span className="tag">◆ R2 DATA</span></div>
          <div className="pbody">
            {catData.filter(d=>d.linux||d.windows).length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={catData.filter(d=>d.linux||d.windows)} margin={{ top:10, right:10, bottom:0, left:-15 }}>
                  <CartesianGrid stroke="rgba(0,255,65,.06)" vertical={false} />
                  <XAxis dataKey="season" tick={{ fill:'var(--mute)', fontFamily:'var(--mono)', fontSize:9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:'var(--dim)', fontFamily:'var(--mono)', fontSize:9 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<QTip />} cursor={{ fill:'rgba(0,255,65,.04)' }} />
                  <Bar dataKey="linux"   name="Linux"   fill="rgba(0,255,65,.6)"    stroke="#00FF41"  strokeWidth={1} radius={[2,2,0,0]} />
                  <Bar dataKey="windows" name="Windows" fill="rgba(0,200,255,.45)"  stroke="#00C8FF"  strokeWidth={1} radius={[2,2,0,0]} />
                  <Bar dataKey="server"  name="Server"  fill="rgba(255,215,0,.4)"   stroke="#FFD700"  strokeWidth={1} radius={[2,2,0,0]} />
                  <Bar dataKey="packet"  name="Packet"  fill="rgba(255,165,0,.35)"  stroke="#FFA500"  strokeWidth={1} radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div style={{ color:'var(--mute)', textAlign:'center', padding:'40px', fontSize:12 }}>&gt; INSUFFICIENT MULTI-SEASON R2 DATA</div>}
          </div>
        </div>

        {/* Semi advancement rate */}
        <div className="panel">
          <div className="phead"><span className="id">[A-03]</span> SEMI-FINAL ADVANCEMENT <span className="tag">◆ ALL SEASONS</span></div>
          <div className="pbody">
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'var(--mono)', fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:'1px dashed var(--line)' }}>
                  {['Season','State Teams','To Semis','Rate'].map(h => (
                    <th key={h} style={{ padding:'6px 10px', textAlign:'left', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--mute)', fontWeight:500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {advData.map(d => (
                  <tr key={d.season} style={{ borderBottom:'1px dashed var(--line-dim)' }}>
                    <td style={{ padding:'10px', color:'var(--fg)' }}>{d.season}</td>
                    <td style={{ padding:'10px', color:'var(--mute)' }}>{d.teams || '—'}</td>
                    <td style={{ padding:'10px', color:'var(--green)' }}>{d.advanced || '—'}</td>
                    <td style={{ padding:'10px' }}>
                      {d.rate > 0 ? (
                        <span>
                          <span style={{ color:'var(--green)', fontWeight:700 }}>{d.rate}%</span>
                          <div style={{ marginTop:4, height:3, background:'var(--bg-2)', position:'relative', width:'80px' }}>
                            <div style={{ position:'absolute', inset:0, right:`${100-d.rate}%`, background:'var(--green)', opacity:.7 }} />
                          </div>
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Category Masters — S25-26 R2 */}
      <section style={{ marginTop:34 }}>
        <div className="sec-head">
          <span className="num">§ 02</span>
          <span className="ttl">Category Masters — S25-26 R2</span>
          <span className="rule" />
          <span className="meta">top 5 per category</span>
        </div>
        <div className="panel">
          <div className="pbody" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:30 }}>
            <TopTable title="Linux / Mint" data={topLinux} key1="mint" key2="linux" />
            <TopTable title="Windows Desktop" data={topWindows} key1="win11" key2="windows" />
            <TopTable title="Windows Server" data={topServer} key1="winServer22" key2="winServer" />
            <TopTable title="Packet Tracer" data={topPacket} key1="packetQuiz" key2="packetImage" />
          </div>
        </div>
      </section>

      {/* Score Distribution Histogram for 25-26 R2 */}
      <section style={{ marginTop:34 }}>
        <div className="sec-head">
          <span className="num">§ 03</span>
          <span className="ttl">Score Distribution · S25-26 R2</span>
          <span className="rule" />
          <span className="meta">all {curr.length} teams</span>
        </div>
        <div className="panel">
          <div className="pbody">
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[...curr].sort((a,b)=>(b.totalScore||0)-(a.totalScore||0)).map((t,i) => (
                <div key={t.teamId} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ width:20, color:'var(--dim)', fontSize:10, textAlign:'right' }}>{i+1}</span>
                  <span style={{ width:180, fontSize:12, color:'var(--fg)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.teamName}</span>
                  <div style={{ flex:1, height:12, background:'var(--bg-2)', position:'relative' }}>
                    <div style={{
                      position:'absolute', left:0, top:0, bottom:0,
                      width:`${Math.min(100,((t.totalScore||0)/Number(currMax))*100)}%`,
                      background: i===0 ? 'linear-gradient(90deg,#00FF41,rgba(0,255,65,.4))' : `linear-gradient(90deg, rgba(0,255,65,${0.6-(i*0.03)}), rgba(0,255,65,${0.2-(i*0.01)}))`,
                      boxShadow: i===0 ? '0 0 10px rgba(0,255,65,.5)' : 'none'
                    }} />
                  </div>
                  <span style={{ width:60, textAlign:'right', fontSize:12, fontWeight:700, color: i===0?'var(--green)':'var(--fg)' }}>{t.totalScore?.toFixed(1)??'—'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
