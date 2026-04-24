import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Splash.css'

const BOOT_LINES = [
  '> INITIALIZING WCTA CYBERPATRIOT COMMAND CONSOLE v2.6.1...',
  '> LOADING HISTORICAL DATA — SEASONS 2022-2026...',
  '> AUTHENTICATING OPERATOR SESSION [coach.admin]...',
  '> ESTABLISHING SECURE LINK TO NV-01 NODE...',
  '> TELEMETRY STREAM ACTIVE — 4 SEASONS — 16 ROUNDS...',
  '> RENDERING DASHBOARD INTERFACE...',
  '> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '> SYSTEM READY.',
]

export default function Splash() {
  const navigate = useNavigate()
  const [lines, setLines] = useState([])
  const [ready, setReady] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const pad = n => String(n).padStart(2, '0')
    const tick = () => {
      const now = new Date()
      setClock(pad(now.getUTCHours())+':'+pad(now.getUTCMinutes())+':'+pad(now.getUTCSeconds())+' UTC')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let i = 0
    const addLine = () => {
      if (i < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[i]])
        i++
        setTimeout(addLine, 280 + Math.random() * 200)
      } else {
        setTimeout(() => setReady(true), 400)
      }
    }
    setTimeout(addLine, 600)
  }, [])

  return (
    <div className="splash">
      <div className="splash-center">
        <div className="splash-logo">
          <svg viewBox="0 0 120 120" className="logo-svg">
            <defs>
              <linearGradient id="lg1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#00FF41" />
                <stop offset="100%" stopColor="#0b9e35" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g fill="none" stroke="url(#lg1)" strokeWidth="1.5" filter="url(#glow)">
              <path d="M12 20 L60 6 L108 20 L108 60 Q108 96 60 114 Q12 96 12 60 Z" />
              <path d="M22 28 L60 16 L98 28 L98 60 Q98 88 60 104 Q22 88 22 60 Z" opacity=".6" />
            </g>
            <path d="M36 60 L52 76 L86 42" fill="none" stroke="#00FF41" strokeWidth="3.5" strokeLinecap="square" filter="url(#glow)" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,255,65,.12)" strokeWidth="1" />
          </svg>
        </div>

        <div className="splash-title">
          <div className="splash-tagline">WEST CAREER &amp; TECHNICAL ACADEMY</div>
          <h1 className="splash-h1">
            WCTA<span className="acc">::</span>CYBER<span className="acc2">PATRIOT</span>
          </h1>
          <div className="splash-sub">OPERATIONS CONSOLE · SEASON 2022–2026</div>
        </div>

        <div className="splash-terminal">
          <div className="term-bar">
            <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
            <span className="term-title">wcta@cyberpatriot:~$</span>
            <span className="term-clock">{clock}</span>
          </div>
          <div className="term-body">
            {lines.map((l, i) => (
              <div key={i} className="term-line">{l}</div>
            ))}
            {!ready && <span className="term-cursor">█</span>}
          </div>
        </div>

        <div className={'splash-cta' + (ready ? ' visible' : '')}>
          <button className="enter-btn" onClick={() => navigate('/dashboard')}>
            <span className="btn-prefix">&gt;&gt;</span>
            ENTER COMMAND CONSOLE
            <span className="btn-suffix">←</span>
          </button>
          <div className="enter-hint">SEASON 25-26 · 16 TEAMS · 4 ROUNDS · 8 SEMI-FINALISTS</div>
        </div>
      </div>
    </div>
  )
}
