import { useState, useEffect } from 'react'

const pad = n => String(n).padStart(2, '0')

export default function StatusBar({ activePage }) {
  const [clock, setClock] = useState('')
  const [uptime, setUptime] = useState('00:00:00')
  const [start] = useState(Date.now())

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(`${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`)
      const s = Math.floor((Date.now() - start) / 1000)
      setUptime(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [start])

  return (
    <div className="statusbar">
      <div>
        <span className="sb-seg">
          <span className="sb-dot blink" />
          <b>LINK</b> SECURE
        </span>
        <span className="sb-seg">NODE <b>wcta-01</b></span>
        <span className="sb-seg">UPTIME <b>{uptime}</b></span>
        <span className="sb-seg">SEASON <b>25–26</b></span>
      </div>
      <div className="sb-path">
        <span className="sep">/</span>wcta
        <span className="sep">/</span>cyberpatriot
        <span className="sep">/</span>
        <span className="on">{activePage}</span>
      </div>
      <div className="sb-right">
        {clock} UTC &nbsp;·&nbsp; <span style={{ color: 'var(--red)' }}>◉ LIVE</span>
      </div>
    </div>
  )
}
