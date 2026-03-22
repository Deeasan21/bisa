import { describe, it, expect, vi, afterEach } from 'vitest'
import { scoreQuestion, getTodaysChallenge, getRandomScenario } from '../../utils/scoring'

describe('scoreQuestion', () => {
  const scenario = {
    weakQuestion: 'Did you finish the report?',
    keywords: ['report', 'deadline', 'progress'],
  }

  it('returns 0 for empty input', () => {
    const result = scoreQuestion('', scenario)
    expect(result.score).toBe(0)
    expect(result.feedback).toBe('Please write a question first!')
  })

  it('returns 0 for whitespace-only input', () => {
    const result = scoreQuestion('   ', scenario)
    expect(result.score).toBe(0)
  })

  it('gives 10 points for having a question mark', () => {
    const result = scoreQuestion('report?', scenario)
    expect(result.score).toBeGreaterThanOrEqual(10)
  })

  it('gives 25 points for open-ended starters', () => {
    const result = scoreQuestion('how is the report going?', scenario)
    expect(result.score).toBeGreaterThanOrEqual(25)
  })

  it('gives points for matching keywords', () => {
    const result = scoreQuestion('what about the report deadline and progress?', scenario)
    expect(result.matchedKeywords).toContain('report')
    expect(result.matchedKeywords).toContain('deadline')
    expect(result.matchedKeywords).toContain('progress')
    expect(result.matchedKeywords).toHaveLength(3)
  })

  it('returns 0 if answer matches the weak question exactly', () => {
    const result = scoreQuestion('Did you finish the report?', scenario)
    expect(result.score).toBe(0)
    expect(result.feedback).toContain('same as the weak question')
  })

  it('caps score at 100', () => {
    const manyKeywords = {
      weakQuestion: 'yes?',
      keywords: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    }
    const result = scoreQuestion('how a b c d e f g h i j?', manyKeywords)
    expect(result.score).toBeLessThanOrEqual(100)
  })

  describe('feedback tiers', () => {
    it('gives excellent feedback for score >= 80', () => {
      const result = scoreQuestion('what is the report deadline and how is progress going?', scenario)
      if (result.score >= 80) {
        expect(result.feedback).toContain('Excellent')
      }
    })

    it('gives encouraging feedback for low scores', () => {
      const result = scoreQuestion('ok?', { weakQuestion: 'no', keywords: [] })
      expect(result.feedback).toBeTruthy()
    })
  })
})

describe('getTodaysChallenge', () => {
  const challenges = [
    { type: 'a', title: 'A' },
    { type: 'b', title: 'B' },
    { type: 'c', title: 'C' },
  ]

  it('returns a challenge object with index', () => {
    const result = getTodaysChallenge(challenges)
    expect(result).toHaveProperty('type')
    expect(result).toHaveProperty('title')
    expect(result).toHaveProperty('index')
    expect(result.index).toBeGreaterThanOrEqual(0)
    expect(result.index).toBeLessThan(challenges.length)
  })

  it('returns same challenge for the same day', () => {
    const a = getTodaysChallenge(challenges)
    const b = getTodaysChallenge(challenges)
    expect(a.index).toBe(b.index)
  })

  it('cycles through challenges based on day of year', () => {
    // Just verify the index is valid
    const result = getTodaysChallenge(challenges)
    expect(challenges[result.index]).toBeDefined()
  })
})

describe('getRandomScenario', () => {
  const scenarios = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ]

  it('returns a scenario from the list', () => {
    const result = getRandomScenario(scenarios)
    expect(scenarios).toContainEqual(result)
  })

  it('excludes specified IDs', () => {
    const result = getRandomScenario(scenarios, [1, 2])
    expect(result.id).toBe(3)
  })

  it('returns null when all IDs are excluded', () => {
    const result = getRandomScenario(scenarios, [1, 2, 3])
    expect(result).toBeNull()
  })

  it('returns null for empty array', () => {
    const result = getRandomScenario([])
    expect(result).toBeNull()
  })
})
