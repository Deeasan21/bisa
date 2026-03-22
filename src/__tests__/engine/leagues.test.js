import { describe, it, expect } from 'vitest'
import { LEAGUES, getLeague, getNextLeague, getLeagueProgress, getSimulatedRanking } from '../../engine/leagues'

describe('LEAGUES', () => {
  it('has 6 leagues', () => {
    expect(LEAGUES).toHaveLength(6)
  })

  it('starts at Bronze with 0 minXP', () => {
    expect(LEAGUES[0].name).toBe('Bronze')
    expect(LEAGUES[0].minXP).toBe(0)
  })

  it('ends at Master with Infinity maxXP', () => {
    expect(LEAGUES[LEAGUES.length - 1].name).toBe('Master')
    expect(LEAGUES[LEAGUES.length - 1].maxXP).toBe(Infinity)
  })

  it('has no gaps between leagues', () => {
    for (let i = 1; i < LEAGUES.length; i++) {
      expect(LEAGUES[i].minXP).toBe(LEAGUES[i - 1].maxXP + 1)
    }
  })
})

describe('getLeague', () => {
  it('returns Bronze for 0 XP', () => {
    expect(getLeague(0).name).toBe('Bronze')
  })

  it('returns Bronze for 499 XP', () => {
    expect(getLeague(499).name).toBe('Bronze')
  })

  it('returns Silver for 500 XP', () => {
    expect(getLeague(500).name).toBe('Silver')
  })

  it('returns Gold for 1500 XP', () => {
    expect(getLeague(1500).name).toBe('Gold')
  })

  it('returns Master for 15000+ XP', () => {
    expect(getLeague(15000).name).toBe('Master')
    expect(getLeague(50000).name).toBe('Master')
  })
})

describe('getNextLeague', () => {
  it('returns Silver as next for 0 XP', () => {
    expect(getNextLeague(0).name).toBe('Silver')
  })

  it('returns null when at Master league', () => {
    expect(getNextLeague(15000)).toBeNull()
  })

  it('returns Gold as next for Silver XP', () => {
    expect(getNextLeague(500).name).toBe('Gold')
  })
})

describe('getLeagueProgress', () => {
  it('returns 0 at the start of a league', () => {
    expect(getLeagueProgress(0)).toBe(0)
  })

  it('returns 1 at max league', () => {
    expect(getLeagueProgress(15000)).toBe(1)
  })

  it('returns 0.5 halfway through Bronze', () => {
    // Bronze: 0-499, next is Silver at 500
    const progress = getLeagueProgress(250)
    expect(progress).toBe(250 / 500)
  })

  it('returns progress as a fraction between 0 and 1', () => {
    const progress = getLeagueProgress(1000)
    expect(progress).toBeGreaterThanOrEqual(0)
    expect(progress).toBeLessThanOrEqual(1)
  })
})

describe('getSimulatedRanking', () => {
  it('returns 50th percentile for 0 XP', () => {
    const result = getSimulatedRanking(0)
    expect(result.percentile).toBe(50)
    expect(result.message).toBe('Start your journey!')
  })

  it('returns a message and percentile for positive XP', () => {
    const result = getSimulatedRanking(1000)
    expect(result.percentile).toBeGreaterThan(0)
    expect(result.message).toBeTruthy()
  })

  it('returns high percentile for high XP', () => {
    const result = getSimulatedRanking(15000)
    // 99 ± 2 variance
    expect(result.percentile).toBeGreaterThanOrEqual(95)
  })

  it('percentile is always between 5 and 99', () => {
    for (const xp of [1, 100, 500, 1500, 3500, 7000, 15000]) {
      const result = getSimulatedRanking(xp)
      expect(result.percentile).toBeGreaterThanOrEqual(5)
      expect(result.percentile).toBeLessThanOrEqual(99)
    }
  })
})
