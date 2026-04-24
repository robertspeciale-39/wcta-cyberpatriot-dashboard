import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Layout() {
  const [clock, setClock] = useState('')
  const [uptime, setUptime] = useState('00:00:00')
  const [startTime] = useState(Date.now())
  const navigate = useNavigate()

  useEffect(() => {
    const pad = n => String(n).padStart(2, '0')
    const tick = () => {
      const now = new Date()
      setClock(`${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`)
      const s = Math.floor((Date.now() - startTime) / 1000)
      setUptime(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [startTime])

  const tabs = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/teams', label: 'Team Explorer' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/entry', label: 'Data Entry' },
  ]

  return (
    <div className="shell">
      {/* Status Bar */}
      <div className="statusbar">
        <div>
          <span className="seg"><span className="dot" /><b>LINK</b> SECURE</span>
          <span className="seg">NODE <b>wcta-01</b></span>
          <span className="seg">UPTIME <b>{uptime}</b></span>
          <span className="seg">SEASON <b>25–26</b></span>
        </div>
        <div className="path">
          <span className="sep">/</span>wcta<span className="sep">/</span>cyberpatriot<span className="sep">/</span>
          <span className="on">dashboard</span>
        </div>
        <div className="right">
          {clock} UTC &nbsp;·&nbsp;
          <button
            onClick={() => navigate('/')}
            style={{ background:'none', border:'none', color:'var(--mute)', cursor:'pointer', fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase' }}
          >
            ← EXIT
          </button>
        </div>
      </div>

      {/* Header */}
      <header style={{ marginTop:22, display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:24, alignItems:'end', paddingBottom:14, borderBottom:'1px solid var(--line)' }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:18 }}>
          <div style={{ width:64, height:64, flexShrink:0, position:'relative', border:'1px solid var(--green)', background:'radial-gradient(circle at 50% 50%, rgba(0,255,65,.18), transparent 70%)' }}>
            <svg viewBox="0 0 64 64" style={{ position:'absolute', inset:0 }}>
              <defs>
                <linearGradient id="mg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#00FF41" />
                  <stop offset="1" stopColor="#0b9e35" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="url(#mg)" strokeWidth="1.2">
                <path d="M7 11 L32 4 L57 11 L57 32 Q57 50 32 61 Q7 50 7 32 Z" />
                <path d="M13 17 L32 11 L51 17 L51 32 Q51 46 32 55 Q13 46 13 32 Z" opacity=".55" />
              </g>
              <path d="M20 31 L29 40 L46 22" fill="none" stroke="#00FF41" strokeWidth="2.2" strokeLinecap="square" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontFamily:'var(--mono)', fontWeight:800, fontSize:28, letterSpacing:'.02em', lineHeight:1, color:'#d7ffe1', textShadow:'0 0 1px rgba(0,255,65,.6), 0 0 18px rgba(0,255,65,.25)' }}>
              WCTA<span style={{ color:'var(--green)' }}>::</span>CYBERPATRIOT
            </h1>
            <div style={{ fontSize:11, fontWeight:500, letterSpacing:'.3em', color:'var(--red)', marginTop:8 }}>
              WEST CAREER &amp; TECHNICAL ACADEMY — OPERATIONS CONSOLE
            </div>
          </div>
        </div>
        <div style={{ textAlign:'right', fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--mute)' }}>
          <div>SESSION <b style={{ color:'var(--fg)' }}>#0x4A2F</b> · OPERATOR <b style={{ color:'var(--fg)' }}>coach.admin</b></div>
          <div style={{ marginTop:4 }}>BUILD <b style={{ color:'var(--fg)' }}>v2.6.1-arena</b> · REGION <b style={{ color:'var(--green)' }}>NV-01</b></div>
          <div style={{ marginTop:4, color:'var(--red)' }}>◉ REC · LIVE TELEMETRY</div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="tabs">
        {tabs.map(t => (
          <NavLink key={t.path} to={t.path}>
            {({ isActive }) => (
              <button className={isActive ? 'active' : ''}>{t.label}</button>
            )}
          </NavLink>
        ))}
        <div className="sp" />
        <div style={{ color:'var(--dim)', padding:'12px 4px 10px', fontSize:11 }}>⌘K · QUERY</div>
      </nav>

      <Outlet />

      <footer style={{ marginTop:40, paddingTop:12, borderTop:'1px dashed var(--line)', display:'flex', justifyContent:'space-between', fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'var(--dim)' }}>
        <div style={{ letterSpacing:0, fontFamily:'var(--mono)' }}>└── wcta · cyberpatriot · 25-26 ────────── 0xFF41 / 0x1E3A / 0xFFD7 ──</div>
        <div style={{ color:'var(--mute)' }}>END OF TRANSMISSION · <span style={{ color:'var(--green)' }}>●</span> SECURE</div>
      </footer>
    </div>
  )
}
