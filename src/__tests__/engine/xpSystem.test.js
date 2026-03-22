import { describe, it, expect } from 'vitest'
import { XP_RULES, LEVELS, calculateLevel } from '../../engine/xpSystem'

describe('XP_RULES', () => {
  describe('practice', () => {
    it('returns 20 for score of 0', () => {
      expect(XP_RULES.practice(0)).toBe(20)
    })

    it('returns 50 for perfect score of 100', () => {
      expect(XP_RULES.practice(100)).toBe(50)
    })

    it('returns 35 for score of 50', () => {
      expect(XP_RULES.practice(50)).toBe(35)
    })
  })

  describe('dailyChallenge', () => {
    it('returns 25 when no score provided', () => {
      expect(XP_RULES.dailyChallenge()).toBe(25)
    })

    it('returns 25 when score is 0 (falsy)', () => {
      expect(XP_RULES.dailyChallenge(0)).toBe(25)
    })

    it('returns 50 for perfect score of 100', () => {
      expect(XP_RULES.dailyChallenge(100)).toBe(50)
    })

    it('returns 15 + 18 = 33 for score of 50', () => {
      expect(XP_RULES.dailyChallenge(50)).toBe(33)
    })
  })

  describe('lesson', () => {
    it('always returns 30', () => {
      expect(XP_RULES.lesson()).toBe(30)
    })
  })

  describe('simulation', () => {
    it('returns 40 for 0% quality', () => {
      expect(XP_RULES.simulation(0)).toBe(40)
    })

    it('returns 60 for 100% quality', () => {
      expect(XP_RULES.simulation(100)).toBe(60)
    })
  })

  describe('journal', () => {
    it('always returns 15', () => {
      expect(XP_RULES.journal()).toBe(15)
    })
  })

  describe('reviewSession', () => {
    it('always returns 20', () => {
      expect(XP_RULES.reviewSession()).toBe(20)
    })
  })

  describe('pattern', () => {
    it('returns 25 for score of 0', () => {
      expect(XP_RULES.pattern(0)).toBe(25)
    })

    it('returns 50 for perfect score of 100', () => {
      expect(XP_RULES.pattern(100)).toBe(50)
    })
  })

  describe('patternMirror', () => {
    it('always returns 20', () => {
      expect(XP_RULES.patternMirror()).toBe(20)
    })
  })

  describe('streakBonus', () => {
    it('returns 5 for 1-day streak', () => {
      expect(XP_RULES.streakBonus(1)).toBe(5)
    })

    it('returns 50 for 10-day streak (cap)', () => {
      expect(XP_RULES.streakBonus(10)).toBe(50)
    })

    it('caps at 50 for streaks longer than 10', () => {
      expect(XP_RULES.streakBonus(20)).toBe(50)
    })

    it('returns 0 for 0-day streak', () => {
      expect(XP_RULES.streakBonus(0)).toBe(0)
    })
  })

  describe('allQuestsBonus', () => {
    it('always returns 25', () => {
      expect(XP_RULES.allQuestsBonus()).toBe(25)
    })
  })
})

describe('LEVELS', () => {
  it('has 12 levels', () => {
    expect(LEVELS).toHaveLength(12)
  })

  it('starts at level 1 with 0 XP', () => {
    expect(LEVELS[0]).toEqual({ level: 1, name: 'Curious Beginner', xpRequired: 0 })
  })

  it('ends at level 12 with 20000 XP', () => {
    expect(LEVELS[11]).toEqual({ level: 12, name: 'Transcendent Asker', xpRequired: 20000 })
  })

  it('has monotonically increasing XP requirements', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i].xpRequired).toBeGreaterThan(LEVELS[i - 1].xpRequired)
    }
  })
})

describe('calculateLevel', () => {
  it('returns level 1 for 0 XP', () => {
    const result = calculateLevel(0)
    expect(result.level).toBe(1)
    expect(result.name).toBe('Curious Beginner')
  })

  it('returns level 1 for 99 XP (just below level 2)', () => {
    const result = calculateLevel(99)
    expect(result.level).toBe(1)
  })

  it('returns level 2 at exactly 100 XP', () => {
    const result = calculateLevel(100)
    expect(result.level).toBe(2)
    expect(result.name).toBe('Question Seeker')
  })

  it('returns level 12 for 20000+ XP', () => {
    const result = calculateLevel(20000)
    expect(result.level).toBe(12)
    expect(result.name).toBe('Transcendent Asker')
  })

  it('returns progress 1 at max level', () => {
    const result = calculateLevel(25000)
    expect(result.progress).toBe(1)
    expect(result.nextLevel).toBeUndefined()
  })

  it('calculates progress correctly mid-level', () => {
    // Level 1: 0-99, Level 2: 100-249
    const result = calculateLevel(50)
    expect(result.progress).toBe(50 / 100)
  })

  it('includes totalXP in the return', () => {
    const result = calculateLevel(500)
    expect(result.totalXP).toBe(500)
  })

  it('returns the correct next level', () => {
    const result = calculateLevel(0)
    expect(result.nextLevel.level).toBe(2)
    expect(result.nextLevel.xpRequired).toBe(100)
  })
})
