import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRoundData, seasons, seasonLabels, rounds, roundLabels } from '../data/dataUtils.js'

export default function TeamExplorer() {
  const navigate = useNavigate()
  const [season, setSeason] = useState('25-26')
  const [round, setRound] = useState('round2')
  const [sort, setSort] = useState({ col:'totalScore', dir:-1 })
  const [search, setSearch] = useState('')

  const raw = getRoundData(season, round)

  const data = useMemo(() => {
    let d = raw.filter(t => t.teamName && (!search || t.teamName.toLowerCase().includes(search.toLowerCase()) || t.teamId.includes(search)))
    d = [...d].sort((a,b) => {
      const av = a[sort.col] ?? -Infinity
      const bv = b[sort.col] ?? -Infinity
      if (typeof av === 'number' && typeof bv === 'number') return sort.dir * (av - bv)
      return sort.dir * String(av).localeCompare(String(bv))
    })
    return d
  }, [raw, sort, search])

  const sortBy = col => setSort(s => ({ col, dir: s.col===col ? -s.dir : -1 }))
  const Th = ({ col, label, cls }) => (
    <th className={cls} onClick={() => sortBy(col)} style={{ cursor:'pointer' }}>
      {label} {sort.col===col ? (sort.dir===-1 ? '▼' : '▲') : <span style={{opacity:.3}}>⇅</span>}
    </th>
  )

  // Determine columns based on round
  const cols = useMemo(() => {
    if (round === 'round1' && season === '25-26') return ['linux','winServer','windows','packetQuiz','packetImage']
    if (round === 'round2' && season === '25-26') return ['mint','winServer22','win11','packetQuiz','packetImage']
    if (round === 'state') return ['linuxMint','winSrv22','ubuntu','packetTracer']
    if (round === 'semis') return ['linuxMint','webBased','ptQuiz','ptImage']
    return ['linux','winServer','windows','packetTracer']
  }, [round, season])

  const colLabel = {
    linux:'Linux', mint:'Linux (Mint)', linuxMint:'Linux Mint', windows:'Windows', win11:'Windows 11',
    winServer:'Win Server', winServer22:'Win Srv 22', winSrv22:'Win Srv 22', ubuntu:'Ubuntu',
    packetQuiz:'PT Quiz', packetImage:'PT Image', packetTracer:'Packet Tracer',
    webBased:'Web Based', ptQuiz:'PT Quiz', ptImage:'PT Image'
  }

  const maxScore = data.length ? Math.max(...data.map(t => t.totalScore||0)) : 1

  return (
    <div style={{ paddingTop:26 }}>
      {/* Controls */}
      <div className="panel" style={{ marginBottom:22 }}>
        <div className="phead"><span className="id">[X-01]</span> TEAM EXPLORER — FILTER &amp; SORT <span className="tag">◆ {data.length} TEAMS</span></div>
        <div className="pbody" style={{ display:'flex', gap:20, flexWrap:'wrap', alignItems:'flex-end' }}>
          <div>
            <label>Season</label>
            <select value={season} onChange={e => { setSeason(e.target.value); setRound('round2') }} style={{ minWidth:130 }}>
              {seasons.map(s => <option key={s} value={s}>{seasonLabels[s]}</option>)}
            </select>
          </div>
          <div>
            <label>Round</label>
            <select value={round} onChange={e => setRound(e.target.value)} style={{ minWidth:130 }}>
              {rounds.filter(r => {
                const d = getRoundData(season, r)
                return d && d.length > 0
              }).map(r => <option key={r} value={r}>{roundLabels[r]}</option>)}
            </select>
          </div>
          <div style={{ flex:1, minWidth:200 }}>
            <label>Search Team</label>
            <input
              placeholder="Team name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width:'100%' }}
            />
          </div>
          <div style={{ fontSize:11, color:'var(--mute)', letterSpacing:'.15em', textTransform:'uppercase', paddingBottom:4 }}>
            {data.length} result{data.length!==1?'s':''} · click row for detail
          </div>
        </div>
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--mute)', fontFamily:'var(--mono)', letterSpacing:'.15em' }}>
          &gt; NO DATA FOR {seasonLabels[season]} {roundLabels[round]} — try a different selection
        </div>
      ) : (
        <table className="lb">
          <thead>
            <tr>
              <th style={{ width:60 }}>#</th>
              <Th col="teamName" label="Team" />
              <Th col="teamId" label="ID" />
              {cols.map(c => <Th key={c} col={c} label={colLabel[c]||c} cls="n" />)}
              {round === 'state' && <Th col="advanced" label="Adv." />}
              <Th col="totalScore" label="Total Score" />
              {(round==='round1'||round==='round2') && <Th col="nationalRank" label="Natl. Rank" cls="n" />}
              {(round==='round1'||round==='round2'||round==='state') && <Th col="nvRank" label="NV Rank" cls="n" />}
            </tr>
          </thead>
          <tbody>
            {data.map((t, i) => (
              <tr key={t.teamId} onClick={() => navigate(`/teams/${t.teamId}`)} style={{ cursor:'pointer' }}>
                <td style={{ color:'var(--mute)', fontWeight:500 }}>
                  {i===0 ? <span style={{color:'var(--gold)'}}>◆ 1</span> : i+1}
                </td>
                <td className="team-name">{t.teamName}</td>
                <td style={{ color:'var(--dim)', fontSize:11 }}>{t.teamId}</td>
                {cols.map(c => (
                  <td key={c} className="n" style={{
                    color: (t[c]||0) >= 90 ? 'var(--green)' : (t[c]||0) >= 60 ? 'var(--fg)' : 'var(--mute)'
                  }}>
                    {typeof t[c]==='number' ? t[c].toFixed(1) : (t[c]??'—')}
                  </td>
                ))}
                {round==='state' && (
                  <td style={{ color: t.advanced ? 'var(--green)' : 'var(--dim)', fontSize:11, letterSpacing:'.1em' }}>
                    {t.advanced ? 'ADV. ▶' : '—'}
                  </td>
                )}
                <td className="bar-cell">
                  <span className="bar-fill" style={{ width:`${Math.min(100,((t.totalScore||0)/maxScore)*100)}%` }} />
                  <span className="bar-label">{t.totalScore?.toFixed(1)??'—'}</span>
                </td>
                {(round==='round1'||round==='round2') && (
                  <td className="n" style={{ color:'var(--mute)', fontSize:11 }}>{t.nationalRank ? `#${t.nationalRank}` : '—'}</td>
                )}
                {(round==='round1'||round==='round2'||round==='state') && (
                  <td className="n" style={{ color:'var(--green)', fontSize:11 }}>{t.nvRank ? `#${t.nvRank}` : '—'}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
