import { describe, it, expect } from 'vitest'
import { ACHIEVEMENT_DEFS, getAchievementDef } from '../../engine/achievements'

describe('ACHIEVEMENT_DEFS', () => {
  it('has at least 25 achievements defined', () => {
    expect(Object.keys(ACHIEVEMENT_DEFS).length).toBeGreaterThanOrEqual(25)
  })

  it('every achievement has required fields', () => {
    for (const [id, def] of Object.entries(ACHIEVEMENT_DEFS)) {
      expect(def.title, `${id} missing title`).toBeTruthy()
      expect(def.description, `${id} missing description`).toBeTruthy()
      expect(typeof def.xp, `${id} xp should be number`).toBe('number')
      expect(def.xp, `${id} xp should be positive`).toBeGreaterThan(0)
      expect(typeof def.check, `${id} check should be function`).toBe('function')
    }
  })

  it('has no duplicate titles', () => {
    const titles = Object.values(ACHIEVEMENT_DEFS).map(d => d.title)
    expect(new Set(titles).size).toBe(titles.length)
  })
})

describe('achievement condition checks (progress-based)', () => {
  const makeProgress = (overrides = {}) => ({
    lessonsWithReflections: 0,
    totalPracticeAttempts: 0,
    challengesCompleted: 0,
    simulationsCompleted: 0,
    cardsLearned: 0,
    journalEntries: 0,
    patternAttempts: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalXP: 0,
    highScoreCount: 0,
    categoryMastery: 0,
    distinctSims: 0,
    ...overrides,
  })

  describe('first_lesson', () => {
    it('unlocks when lessonsWithReflections >= 1', () => {
      expect(ACHIEVEMENT_DEFS.first_lesson.check(makeProgress({ lessonsWithReflections: 1 }))).toBe(true)
    })

    it('stays locked with 0 lessons', () => {
      expect(ACHIEVEMENT_DEFS.first_lesson.check(makeProgress())).toBe(false)
    })
  })

  describe('first_question', () => {
    it('unlocks at 1 practice attempt', () => {
      expect(ACHIEVEMENT_DEFS.first_question.check(makeProgress({ totalPracticeAttempts: 1 }))).toBe(true)
    })
  })

  describe('practice_10', () => {
    it('unlocks at 10 attempts', () => {
      expect(ACHIEVEMENT_DEFS.practice_10.check(makeProgress({ totalPracticeAttempts: 10 }))).toBe(true)
    })

    it('stays locked at 9', () => {
      expect(ACHIEVEMENT_DEFS.practice_10.check(makeProgress({ totalPracticeAttempts: 9 }))).toBe(false)
    })
  })

  describe('practice_50', () => {
    it('unlocks at 50 attempts', () => {
      expect(ACHIEVEMENT_DEFS.practice_50.check(makeProgress({ totalPracticeAttempts: 50 }))).toBe(true)
    })
  })

  describe('streak_3', () => {
    it('unlocks at 3-day current streak', () => {
      expect(ACHIEVEMENT_DEFS.streak_3.check(makeProgress({ currentStreak: 3 }))).toBe(true)
    })

    it('unlocks if longest streak was 3+', () => {
      expect(ACHIEVEMENT_DEFS.streak_3.check(makeProgress({ longestStreak: 3 }))).toBe(true)
    })

    it('stays locked at 2-day streak', () => {
      expect(ACHIEVEMENT_DEFS.streak_3.check(makeProgress({ currentStreak: 2 }))).toBe(false)
    })
  })

  describe('streak_7', () => {
    it('unlocks at 7-day streak', () => {
      expect(ACHIEVEMENT_DEFS.streak_7.check(makeProgress({ currentStreak: 7 }))).toBe(true)
    })
  })

  describe('streak_30', () => {
    it('unlocks at 30-day streak', () => {
      expect(ACHIEVEMENT_DEFS.streak_30.check(makeProgress({ longestStreak: 30 }))).toBe(true)
    })
  })

  describe('streak_100', () => {
    it('unlocks at 100-day streak', () => {
      expect(ACHIEVEMENT_DEFS.streak_100.check(makeProgress({ currentStreak: 100 }))).toBe(true)
    })
  })

  describe('explorer', () => {
    it('unlocks when all modes tried at least once', () => {
      const progress = makeProgress({
        lessonsWithReflections: 1,
        totalPracticeAttempts: 1,
        challengesCompleted: 1,
        simulationsCompleted: 1,
        cardsLearned: 1,
        journalEntries: 1,
        patternAttempts: 1,
      })
      expect(ACHIEVEMENT_DEFS.explorer.check(progress)).toBe(true)
    })

    it('stays locked if any mode is missing', () => {
      const progress = makeProgress({
        lessonsWithReflections: 1,
        totalPracticeAttempts: 1,
        challengesCompleted: 1,
        simulationsCompleted: 1,
        cardsLearned: 1,
        journalEntries: 1,
        patternAttempts: 0, // missing
      })
      expect(ACHIEVEMENT_DEFS.explorer.check(progress)).toBe(false)
    })
  })

  describe('pattern milestones', () => {
    it('first_pattern unlocks at 1', () => {
      expect(ACHIEVEMENT_DEFS.first_pattern.check(makeProgress({ patternAttempts: 1 }))).toBe(true)
    })

    it('pattern_25 unlocks at 25', () => {
      expect(ACHIEVEMENT_DEFS.pattern_25.check(makeProgress({ patternAttempts: 25 }))).toBe(true)
    })

    it('pattern_100 unlocks at 100', () => {
      expect(ACHIEVEMENT_DEFS.pattern_100.check(makeProgress({ patternAttempts: 100 }))).toBe(true)
    })
  })

  describe('journal milestones', () => {
    it('journal_5 unlocks at 5', () => {
      expect(ACHIEVEMENT_DEFS.journal_5.check(makeProgress({ journalEntries: 5 }))).toBe(true)
    })

    it('reflector unlocks at 10', () => {
      expect(ACHIEVEMENT_DEFS.reflector.check(makeProgress({ journalEntries: 10 }))).toBe(true)
    })

    it('journal_20 unlocks at 20', () => {
      expect(ACHIEVEMENT_DEFS.journal_20.check(makeProgress({ journalEntries: 20 }))).toBe(true)
    })
  })

  describe('review milestones', () => {
    it('review_50 unlocks at 50 cards', () => {
      expect(ACHIEVEMENT_DEFS.review_50.check(makeProgress({ cardsLearned: 50 }))).toBe(true)
    })

    it('review_200 unlocks at 200 cards', () => {
      expect(ACHIEVEMENT_DEFS.review_200.check(makeProgress({ cardsLearned: 200 }))).toBe(true)
    })
  })

  describe('scholar', () => {
    it('unlocks at 13 lessons', () => {
      expect(ACHIEVEMENT_DEFS.scholar.check(makeProgress({ lessonsWithReflections: 13 }))).toBe(true)
    })
  })

  describe('all_lessons', () => {
    it('unlocks at 38 lessons', () => {
      expect(ACHIEVEMENT_DEFS.all_lessons.check(makeProgress({ lessonsWithReflections: 38 }))).toBe(true)
    })
  })

  describe('XP milestones', () => {
    it('xp_1000 unlocks at 1000 XP', () => {
      expect(ACHIEVEMENT_DEFS.xp_1000.check(makeProgress({ totalXP: 1000 }))).toBe(true)
    })

    it('xp_5000 unlocks at 5000 XP', () => {
      expect(ACHIEVEMENT_DEFS.xp_5000.check(makeProgress({ totalXP: 5000 }))).toBe(true)
    })

    it('xp_10000 unlocks at 10000 XP', () => {
      expect(ACHIEVEMENT_DEFS.xp_10000.check(makeProgress({ totalXP: 10000 }))).toBe(true)
    })

    it('rising_star unlocks at 500 XP (Silver league)', () => {
      expect(ACHIEVEMENT_DEFS.rising_star.check(makeProgress({ totalXP: 500 }))).toBe(true)
    })
  })

  describe('score-based achievements', () => {
    it('deep_thinker unlocks with 5 high scores', () => {
      expect(ACHIEVEMENT_DEFS.deep_thinker.check(makeProgress({ highScoreCount: 5 }))).toBe(true)
    })

    it('score_90 unlocks with 1 high score', () => {
      expect(ACHIEVEMENT_DEFS.score_90.check(makeProgress({ highScoreCount: 1 }))).toBe(true)
    })

    it('technique_master unlocks with 5 category mastery', () => {
      expect(ACHIEVEMENT_DEFS.technique_master.check(makeProgress({ categoryMastery: 5 }))).toBe(true)
    })

    it('sim_all unlocks with 7 distinct sims', () => {
      expect(ACHIEVEMENT_DEFS.sim_all.check(makeProgress({ distinctSims: 7 }))).toBe(true)
    })
  })

  describe('time-based achievements', () => {
    it('night_owl check returns a boolean', () => {
      const result = ACHIEVEMENT_DEFS.night_owl.check()
      expect(typeof result).toBe('boolean')
    })

    it('early_bird check returns a boolean', () => {
      const result = ACHIEVEMENT_DEFS.early_bird.check()
      expect(typeof result).toBe('boolean')
    })
  })
})

describe('getAchievementDef', () => {
  it('returns the definition for a valid ID', () => {
    const def = getAchievementDef('first_lesson')
    expect(def.title).toBe('First Step')
    expect(def.xp).toBe(25)
  })

  it('returns null for an invalid ID', () => {
    expect(getAchievementDef('nonexistent')).toBeNull()
  })
})
