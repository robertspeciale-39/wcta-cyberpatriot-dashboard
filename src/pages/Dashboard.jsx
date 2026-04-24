import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { getCurrentSeasonStats, getTierDistribution, getRoundData, getTopScore } from '../data/dataUtils.js'

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--line)', padding:'10px 14px', fontFamily:'var(--mono)', fontSize:11 }}>
      <div style={{ color:'var(--green)', marginBottom:6, letterSpacing:'.15em' }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ color:p.color }}>{p.name}: {p.value}</div>)}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const stats = getCurrentSeasonStats()
  const tierData = getTierDistribution()
  const [logItems, setLogItems] = useState([
    { t:'23:14:02', l:'ok',  lb:'SCR', m:'Shake & Bake R2 score posted — 306.0', em:'Shake & Bake' },
    { t:'23:12:47', l:'info',lb:'INF', m:'Tier recalc · 4 platinum · 4 gold · 2 silver' },
    { t:'23:09:15', l:'ok',  lb:'SCR', m:'AFR windows image — 100.0/100', em:'AFR' },
    { t:'23:04:33', l:'warn',lb:'FLG', m:'Forensic flag detected · Linux host · +5.0' },
    { t:'22:58:10', l:'ok',  lb:'SCR', m:'Keyboard Krumbs packet tracer +2.4', em:'Keyboard Krumbs' },
    { t:'22:50:21', l:'info',lb:'INF', m:'Round 2 locked · 12 teams active' },
    { t:'22:41:08', l:'err', lb:'ERR', m:'VM snapshot failed · BirdBrains · retrying', em:'BirdBrains' },
    { t:'22:33:55', l:'ok',  lb:'ADV', m:'Silk Road advanced to semis', em:'Silk Road' },
  ])

  const trendData = [
    { season:'S22 R1', avg:133 }, { season:'S22 R2', avg:155 },
    { season:'S23 R2', avg:171 }, { season:'S24 R1', avg:174 },
    { season:'S24 R2', avg:189 }, { season:'S25 R1', avg:194 },
    { season:'S25 R2', avg:218 },
  ]
  const r2 = getRoundData('25-26', 'round2')
  const r2scores = r2.map(t => t.totalScore).filter(Boolean)
  const realAvgR2 = r2scores.length ? Math.round(r2scores.reduce((a,b)=>a+b,0)/r2scores.length) : 218
  trendData[trendData.length-1].avg = realAvgR2

  useEffect(() => {
    const evts = [
      { l:'ok', lb:'SCR', m:'Shake & Bake sweep +0.4', em:'Shake & Bake' },
      { l:'info', lb:'INF', m:'Heartbeat · all teams nominal' },
      { l:'warn', lb:'FLG', m:'Late submission · Silk Road · grace window', em:'Silk Road' },
      { l:'ok', lb:'ADV', m:'AFR checkpoint saved', em:'AFR' },
    ]
    const id = setInterval(() => {
      const e = evts[Math.floor(Math.random()*evts.length)]
      const now = new Date()
      const p = n => String(n).padStart(2,'0')
      setLogItems(prev => [{ ...e, t:`${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}` }, ...prev].slice(0,12))
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const r2top = getTopScore('25-26', 'round2')
  const semisTeams = getRoundData('25-26', 'semis')
  const stateTeams = getRoundData('25-26', 'state')

  const lc = item => ({
    color: item.l==='ok' ? 'var(--green)' : item.l==='warn' ? 'var(--gold)' : item.l==='err' ? '#ff6b6b' : 'var(--mute)',
    borderColor: item.l==='ok' ? 'var(--green)' : item.l==='warn' ? 'var(--gold)' : item.l==='err' ? '#ff6b6b' : 'var(--dim)',
  })

  return (
    <div style={{ paddingTop:26 }}>
      {/* Registers */}
      <div className="panel">
        <div className="phead"><span className="id">[R-01]</span> TEAM REGISTERS <span className="tag">◆ S25-26 LIVE</span></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[
            { k:'Platinum Teams', v: stats.plat ?? 4, sub:'▲ +1 vs S24-25', c:'var(--green)' },
            { k:'Teams in Semis', v:`${semisTeams.length || 8}/16`, sub:'advanced from State', c:'var(--fg)' },
            { k:'Avg Score · R2',  v: realAvgR2, sub:'all teams', c:'var(--fg)' },
            { k:'Top Score · R2',  v: r2top?.totalScore?.toFixed(1) ?? '306.0', sub: r2top?.teamName ?? 'Shake and Bake', c:'var(--green)' },
          ].map((reg, i) => (
            <div key={i} style={{ padding:'18px', borderRight: i<3 ? '1px dashed var(--line-dim)' : 'none' }}>
              <div style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--mute)', display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ color:'var(--red)' }}>$</span>{reg.k}
              </div>
              <div style={{ fontWeight:800, fontSize:40, lineHeight:1, marginTop:10, color:reg.c, textShadow:'0 0 18px rgba(0,255,65,.18)', letterSpacing:'-.01em' }}>{reg.v}</div>
              <div style={{ marginTop:8, fontSize:11, color:'var(--mute)' }}>{reg.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier chart + log */}
      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:22, marginTop:22 }}>
        <div className="panel">
          <div className="phead"><span className="id">[D-03]</span> TIER DISTRIBUTION · YEAR OVER YEAR <span className="tag">◆ 4 SEASONS</span></div>
          <div className="pbody">
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={tierData} margin={{ top:10, right:10, bottom:0, left:-15 }}>
                <CartesianGrid stroke="rgba(0,255,65,.06)" vertical={false} />
                <XAxis dataKey="season" tick={{ fill:'var(--mute)', fontFamily:'var(--mono)', fontSize:10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'var(--dim)', fontFamily:'var(--mono)', fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<QTip />} cursor={{ fill:'rgba(0,255,65,.04)' }} />
                <Bar dataKey="plat" name="Platinum" fill="rgba(255,215,0,.5)"   stroke="#FFD700" strokeWidth={1} radius={[2,2,0,0]} />
                <Bar dataKey="gold" name="Gold"     fill="rgba(255,165,0,.45)"  stroke="#FFA500" strokeWidth={1} radius={[2,2,0,0]} />
                <Bar dataKey="silv" name="Silver"   fill="rgba(192,192,192,.35)" stroke="#C0C0C0" strokeWidth={1} radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display:'flex', gap:16, marginTop:10, fontSize:11, color:'var(--mute)', letterSpacing:'.15em', textTransform:'uppercase' }}>
              {[['#FFD700','rgba(255,215,0,.5)','Platinum'],['#FFA500','rgba(255,165,0,.45)','Gold'],['#C0C0C0','rgba(192,192,192,.35)','Silver']].map(([sc,bg,name]) => (
                <span key={name}><span style={{ display:'inline-block', width:12, height:12, background:bg, border:`1px solid ${sc}`, marginRight:6, verticalAlign:'middle' }} />{name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="phead"><span className="id">[L-04]</span> EVENT LOG · TAIL -f <span className="tag">◆ STREAM</span></div>
          <div style={{ fontFamily:'var(--mono)', fontSize:12, color:'#b7d7bd', height:330, overflowY:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60, background:'linear-gradient(180deg,transparent,var(--bg-0))', zIndex:1, pointerEvents:'none' }} />
            <ul style={{ listStyle:'none', padding:'12px 14px 0', margin:0 }}>
              {logItems.map((item, i) => (
                <li key={i} style={{ padding:'4px 0', borderBottom:'1px dashed var(--line-dim)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  <span style={{ color:'var(--dim)', marginRight:10 }}>{item.t}</span>
                  <span style={{ display:'inline-block', width:46, textAlign:'center', marginRight:10, fontSize:10, letterSpacing:'.15em', border:'1px solid', padding:'1px 0', ...lc(item) }}>{item.lb}</span>
                  <span style={{ color:'var(--fg)' }}>{item.m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Score trend */}
      <div className="panel" style={{ marginTop:22 }}>
        <div className="phead"><span className="id">[T-05]</span> AVERAGE SCORE TREND · ALL SEASONS <span className="tag">◆ HISTORICAL</span></div>
        <div className="pbody">
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={trendData} margin={{ top:10, right:20, bottom:0, left:-10 }}>
              <CartesianGrid stroke="rgba(0,255,65,.06)" />
              <XAxis dataKey="season" tick={{ fill:'var(--mute)', fontFamily:'var(--mono)', fontSize:10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'var(--dim)', fontFamily:'var(--mono)', fontSize:10 }} axisLine={false} tickLine={false} domain={['auto','auto']} />
              <Tooltip content={<QTip />} />
              <Line type="monotone" dataKey="avg" name="Avg Score" stroke="#00FF41" strokeWidth={2} dot={{ fill:'#00FF41', r:4, strokeWidth:0 }} activeDot={{ r:6, fill:'#fff', stroke:'#00FF41' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Semi-finalists quick table */}
      <section style={{ marginTop:34 }}>
        <div className="sec-head">
          <span className="num">§ 02</span>
          <span className="ttl">Semi-Finalists — S25-26</span>
          <span className="rule" />
          <span className="meta">{semisTeams.length} teams · click to view detail</span>
        </div>
        <table className="lb">
          <thead>
            <tr>
              <th>#</th><th>Team</th>
              <th className="n">Linux</th><th className="n">Server</th>
              <th className="n">Web</th><th className="n">PT Score</th>
              <th>Total Score</th><th className="n">NV Rank</th>
            </tr>
          </thead>
          <tbody>
            {[...semisTeams].sort((a,b)=>(a.nvRank||99)-(b.nvRank||99)).map((t,i) => (
              <tr key={t.teamId} onClick={()=>navigate(`/teams/${t.teamId}`)} style={{ cursor:'pointer' }}>
                <td style={{ color: i===0?'var(--gold)':'var(--mute)', fontWeight:500 }}>{i===0?'◆ 01':`0${i+1}`}</td>
                <td className="team-name">{t.teamName}<small>{t.teamId} · NV</small></td>
                <td className="n">{t.linuxMint?.toFixed(1)??'—'}</td>
                <td className="n">{(t.winSrv19??t.winSrv22)?.toFixed(1)??'—'}</td>
                <td className="n">{t.webBased?.toFixed(1)??'—'}</td>
                <td className="n">{t.ptImage?.toFixed(2)??'—'}</td>
                <td className="bar-cell">
                  <span className="bar-fill" style={{ width:`${Math.min(100,((t.totalScore||0)/380)*100)}%` }} />
                  <span className="bar-label">{t.totalScore?.toFixed(1)??'—'}</span>
                </td>
                <td className="n" style={{ color:'var(--green)' }}>#{t.nvRank??'—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
