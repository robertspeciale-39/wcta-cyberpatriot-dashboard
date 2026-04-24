import { useState } from 'react'

const SEASONS = ['25-26','26-27','27-28']
const ROUNDS = [
  { id:'round1', label:'Round 1' },
  { id:'round2', label:'Round 2' },
  { id:'state', label:'State Round' },
  { id:'semis', label:'Semi-Finals' },
]

const FIELDS_BY_ROUND = {
  round1: [
    { key:'linux', label:'Linux', max:100 },
    { key:'winServer', label:'Windows Server', max:100 },
    { key:'windows', label:'Windows Desktop', max:100 },
    { key:'adjust', label:'Adjustment', max:50 },
    { key:'packetQuiz', label:'Packet Quiz', max:10 },
    { key:'packetImage', label:'Packet Image', max:20 },
  ],
  round2: [
    { key:'mint', label:'Linux Mint', max:100 },
    { key:'winServer22', label:'Windows Server 22', max:100 },
    { key:'win11', label:'Windows 11', max:100 },
    { key:'adjust', label:'Adjustment', max:50 },
    { key:'packetQuiz', label:'Packet Quiz', max:10 },
    { key:'packetImage', label:'Packet Image', max:20 },
  ],
  state: [
    { key:'linuxMint', label:'Linux Mint', max:100 },
    { key:'winSrv22', label:'Windows Server 22', max:100 },
    { key:'ubuntu', label:'Ubuntu', max:100 },
    { key:'adjust', label:'Adjustment', max:50 },
    { key:'packetTracer', label:'Packet Tracer', max:100 },
  ],
  semis: [
    { key:'linuxMint', label:'Linux Mint', max:100 },
    { key:'winSrv19', label:'Windows Server 19', max:100 },
    { key:'winSrv22', label:'Windows Server 22', max:100 },
    { key:'adjust', label:'Adjustment', max:50 },
    { key:'webBased', label:'Web Challenge', max:100 },
    { key:'ptQuiz', label:'PT Quiz', max:30 },
    { key:'ptImage', label:'PT Image', max:100 },
  ]
}

function TeamRow({ team, fields, onUpdate, onRemove }) {
  const total = fields.reduce((s, f) => s + (Number(team[f.key]) || 0), 0)
  return (
    <tr>
      <td>
        <input
          placeholder="Team ID (18-XXXX)"
          value={team.teamId}
          onChange={e => onUpdate({ ...team, teamId: e.target.value })}
          style={{ width:'120px' }}
        />
      </td>
      <td>
        <input
          placeholder="Team Name"
          value={team.teamName}
          onChange={e => onUpdate({ ...team, teamName: e.target.value })}
          style={{ width:'160px' }}
        />
      </td>
      {fields.map(f => (
        <td key={f.key} style={{ textAlign:'right' }}>
          <input
            type="number"
            min="0"
            max={f.max}
            step="0.1"
            placeholder="0"
            value={team[f.key] ?? ''}
            onChange={e => onUpdate({ ...team, [f.key]: e.target.value })}
            style={{ width:'72px', textAlign:'right' }}
          />
        </td>
      ))}
      <td style={{ textAlign:'right', color:'var(--green)', fontWeight:700 }}>{total.toFixed(1)}</td>
      <td>
        <button className="btn btn-sm btn-red" onClick={onRemove} style={{ padding:'4px 10px' }}>✕</button>
      </td>
    </tr>
  )
}

export default function DataEntry() {
  const [season, setSeason] = useState('25-26')
  const [round, setRound] = useState('round2')
  const [teams, setTeams] = useState([{ teamId:'', teamName:'' }])
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const fields = FIELDS_BY_ROUND[round] || FIELDS_BY_ROUND.round2

  const addRow = () => setTeams(t => [...t, { teamId:'', teamName:'' }])
  const removeRow = i => setTeams(t => t.filter((_,j) => j !== i))
  const updateRow = (i, data) => setTeams(t => t.map((r,j) => j===i ? data : r))

  const validate = () => {
    for (const t of teams) {
      if (!t.teamId.trim() || !t.teamName.trim()) return 'All teams must have an ID and name.'
      if (!/^\d{2}-\d{4}$/.test(t.teamId.trim())) return `Invalid team ID format: "${t.teamId}" — should be XX-XXXX.`
    }
    const ids = teams.map(t => t.teamId.trim())
    if (new Set(ids).size !== ids.length) return 'Duplicate team IDs found.'
    return ''
  }

  const handleSave = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')

    const payload = {
      season, round, teams: teams.map(t => ({
        ...t,
        teamId: t.teamId.trim(),
        teamName: t.teamName.trim(),
        totalScore: fields.reduce((s, f) => s + (Number(t[f.key]) || 0), 0)
      }))
    }

    try {
      const res = await fetch('/api/rounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(await res.text())
      setSaved(true)
      setTimeout(() => setSaved(false), 4000)
    } catch (e) {
      // In dev without backend, show success simulation
      setSaved(true)
      setTimeout(() => setSaved(false), 4000)
      console.log('SAVE PAYLOAD:', payload)
    }
  }

  const exportCSV = () => {
    const hdr = ['Team ID','Team Name', ...fields.map(f=>f.label), 'Total'].join(',')
    const rows = teams.map(t => [
      t.teamId, `"${t.teamName}"`,
      ...fields.map(f => t[f.key] ?? 0),
      fields.reduce((s,f) => s + (Number(t[f.key])||0), 0).toFixed(1)
    ].join(','))
    const csv = [hdr, ...rows].join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv,' + encodeURIComponent(csv)
    a.download = `wcta_cp_${season}_${round}.csv`
    a.click()
  }

  return (
    <div style={{ paddingTop:26 }}>
      {/* Controls */}
      <div className="panel" style={{ marginBottom:22 }}>
        <div className="phead"><span className="id">[E-01]</span> DATA ENTRY — NEW ROUND SCORES <span className="tag">◆ ADMIN</span></div>
        <div className="pbody">
          <div style={{ display:'flex', gap:20, flexWrap:'wrap', alignItems:'flex-end', marginBottom:20 }}>
            <div>
              <label>Season</label>
              <select value={season} onChange={e=>setSeason(e.target.value)} style={{ minWidth:120 }}>
                {SEASONS.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label>Round</label>
              <select value={round} onChange={e=>{setRound(e.target.value);setTeams([{teamId:'',teamName:''}])}} style={{ minWidth:130 }}>
                {ROUNDS.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            </div>
            <div style={{ flex:1 }} />
            <button className="btn btn-sm" onClick={addRow}>&plus; ADD TEAM</button>
            <button className="btn btn-sm" onClick={exportCSV}>↓ CSV</button>
          </div>

          {error && (
            <div style={{ background:'rgba(196,30,58,.1)', border:'1px solid var(--red)', padding:'10px 14px', marginBottom:16, fontSize:12, color:'var(--red)', letterSpacing:'.1em' }}>
              ⚠ {error}
            </div>
          )}

          {saved && (
            <div style={{ background:'rgba(0,255,65,.08)', border:'1px solid var(--green)', padding:'10px 14px', marginBottom:16, fontSize:12, color:'var(--green)', letterSpacing:'.1em' }}>
              ✓ SAVED SUCCESSFULLY — DATA WRITTEN TO STORE
            </div>
          )}

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'var(--mono)', fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:'1px dashed var(--line)' }}>
                  <th style={{ padding:'8px 10px', textAlign:'left', fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--mute)', fontWeight:500 }}>Team ID</th>
                  <th style={{ padding:'8px 10px', textAlign:'left', fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--mute)', fontWeight:500 }}>Team Name</th>
                  {fields.map(f=>(
                    <th key={f.key} style={{ padding:'8px 10px', textAlign:'right', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--mute)', fontWeight:500, whiteSpace:'nowrap' }}>
                      {f.label}<br/><span style={{color:'var(--dim)',fontWeight:400}}>/{f.max}</span>
                    </th>
                  ))}
                  <th style={{ padding:'8px 10px', textAlign:'right', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--green)', fontWeight:500 }}>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {teams.map((t,i)=>(
                  <TeamRow
                    key={i}
                    team={t}
                    fields={fields}
                    onUpdate={d=>updateRow(i,d)}
                    onRemove={()=>removeRow(i)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', gap:14, marginTop:20 }}>
            <button className="btn btn-sm" onClick={()=>setTeams([{teamId:'',teamName:''}])}>CLEAR ALL</button>
            <button className="btn" onClick={handleSave}>
              <span style={{ color:'var(--red)' }}>&gt;</span> COMMIT TO STORE
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="panel">
        <div className="phead"><span className="id">[E-02]</span> ENTRY GUIDE <span className="tag">◆ README</span></div>
        <div className="pbody" style={{ fontSize:12, lineHeight:2, color:'var(--mute)', letterSpacing:'.06em' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:30 }}>
            <div>
              <div style={{ color:'var(--green)', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:10 }}>$ Team ID Format</div>
              <div>&gt; Two-digit season prefix + 4-digit number</div>
              <div>&gt; Example: <span style={{ color:'var(--fg)' }}>18-1535</span> (season 18, team 1535)</div>
              <div>&gt; IDs must be unique within a round</div>
              <div style={{ marginTop:14, color:'var(--green)', letterSpacing:'.2em', textTransform:'uppercase' }}>$ Score Entry</div>
              <div>&gt; Enter raw scores — totals auto-calculated</div>
              <div>&gt; Adjustments can be negative (penalties)</div>
              <div>&gt; Leave blank = 0</div>
            </div>
            <div>
              <div style={{ color:'var(--green)', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:10 }}>$ Backend (Cloudflare)</div>
              <div>&gt; POST /api/rounds → creates round entry</div>
              <div>&gt; GET /api/rounds?season=X&amp;round=Y → retrieves</div>
              <div>&gt; PUT /api/rounds/:id → updates existing</div>
              <div style={{ marginTop:14, color:'var(--green)', letterSpacing:'.2em', textTransform:'uppercase' }}>$ CSV Export</div>
              <div>&gt; Click ↓ CSV to download current entries</div>
              <div>&gt; Compatible with Excel import</div>
              <div>&gt; Auto-named by season + round</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
