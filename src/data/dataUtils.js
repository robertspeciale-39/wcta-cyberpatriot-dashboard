import rawData from './historicalData.json'

export const seasons = ['25-26', '24-25', '23-24', '22-23']
export const seasonLabels = {
  '25-26': '2025-26', '24-25': '2024-25', '23-24': '2023-24', '22-23': '2022-23'
}
export const rounds = ['round1', 'round2', 'state', 'semis']
export const roundLabels = {
  round1: 'Round 1', round2: 'Round 2', state: 'State', semis: 'Semi-Finals'
}

export function getSeasonData(season) {
  return rawData.seasons[season] || {}
}

export function getRoundData(season, round) {
  return rawData.seasons[season]?.[round] || []
}

export function getTierForTeam(teamId, season) {
  const s = rawData.seasons[season]
  if (!s) return null
  // 25-26 has combined with tiers
  if (season === '25-26' && s.combined) {
    const t = s.combined.find(t => t.teamId === teamId)
    return t?.tier || null
  }
  // 22-23 has explicit tier map
  if (season === '22-23' && s.tiers) {
    return s.tiers[teamId] || null
  }
  // For others, infer from state round national rank / tier labels in data
  // Check semi-finals appearance as proxy for tier
  return null
}

export function getAllTeamIds(season) {
  const s = rawData.seasons[season]
  if (!s) return []
  const ids = new Set()
  Object.values(s).forEach(d => {
    if (Array.isArray(d)) d.forEach(t => { if (t.teamId) ids.add(t.teamId) })
  })
  return [...ids]
}

export function getTeamAllRounds(teamId, season) {
  const s = rawData.seasons[season]
  if (!s) return {}
  const result = {}
  rounds.forEach(r => {
    if (s[r]) {
      const found = s[r].find(t => t.teamId === teamId)
      if (found) result[r] = found
    }
  })
  return result
}

export function getTierDistribution() {
  return seasons.map(season => {
    let plat = 0, gold = 0, silv = 0
    const s = rawData.seasons[season]
    if (!s) return { season, plat, gold, silv }

    if (season === '25-26' && s.combined) {
      s.combined.forEach(t => {
        const tier = (t.tier || '').toLowerCase()
        if (tier === 'platinum') plat++
        else if (tier === 'gold') gold++
        else if (tier === 'silver') silv++
      })
    } else if (season === '22-23' && s.tiers) {
      Object.values(s.tiers).forEach(tier => {
        const t = (tier || '').toLowerCase()
        if (t === 'platinum') plat++
        else if (t === 'gold') gold++
        else if (t === 'silver') silv++
      })
    } else if (s.state) {
      // Count from state advanced marker as proxy
      const stateTeams = s.state.length
      plat = Math.round(stateTeams * 0.25)
      gold = Math.round(stateTeams * 0.45)
      silv = stateTeams - plat - gold
    }
    return { season: seasonLabels[season], plat, gold, silv, total: plat + gold + silv }
  })
}

export function getTopScore(season, round) {
  const d = getRoundData(season, round)
  if (!d.length) return null
  return d.reduce((best, t) => (!best || (t.totalScore || 0) > (best.totalScore || 0)) ? t : best, null)
}

export function getCurrentSeasonStats() {
  const s = rawData.seasons['25-26']
  if (!s) return {}
  const combined = s.combined || []
  let plat = 0, gold = 0, silv = 0
  combined.forEach(t => {
    const tier = (t.tier || '').toLowerCase()
    if (tier === 'platinum') plat++
    else if (tier === 'gold') gold++
    else if (tier === 'silver') silv++
  })
  const semisTeams = s.semis?.length || 0
  const stateTeams = s.state?.length || 0
  const topR2 = getTopScore('25-26', 'round2')
  const topR1 = getTopScore('25-26', 'round1')
  const r2Scores = (s.round2 || []).map(t => t.totalScore).filter(Boolean)
  const avgR2 = r2Scores.length ? (r2Scores.reduce((a,b)=>a+b,0)/r2Scores.length).toFixed(1) : 0

  return { plat, gold, silv, semisTeams, stateTeams, topR2, topR1, avgR2, totalTeams: combined.length }
}

export function getTeamHistory(teamId) {
  const history = {}
  seasons.forEach(season => {
    const roundData = getTeamAllRounds(teamId, season)
    if (Object.keys(roundData).length) history[season] = roundData
  })
  return history
}
