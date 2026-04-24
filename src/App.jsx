import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Splash from './pages/Splash.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TeamExplorer from './pages/TeamExplorer.jsx'
import TeamDetail from './pages/TeamDetail.jsx'
import Analytics from './pages/Analytics.jsx'
import DataEntry from './pages/DataEntry.jsx'
import Layout from './components/Layout.jsx'

export default function App() {
  const loc = useLocation()
  const isDashboard = loc.pathname !== '/'

  return (
    <div className="app">
      <div className="grid-lines" />
      <div className="noise" />
      <div className="scanline" />
      <div className="tear" />
      <div className="crt" />
      <div className="vignette" />
      <div className="content">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teams" element={<TeamExplorer />} />
            <Route path="/teams/:teamId" element={<TeamDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/entry" element={<DataEntry />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}
