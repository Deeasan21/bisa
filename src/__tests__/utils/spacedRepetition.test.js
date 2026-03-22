import { describe, it, expect } from 'vitest'
import { calculateNextReview } from '../../utils/spacedRepetition'

describe('calculateNextReview (SM-2 algorithm)', () => {
  const defaultEase = 2.5
  const defaultReps = 0
  const defaultInterval = 0

  describe('first correct response (quality >= 3)', () => {
    it('sets interval to 1 day on first correct', () => {
      const result = calculateNextReview(4, defaultEase, 0, 0)
      expect(result.newInterval).toBe(1)
      expect(result.newRepetitions).toBe(1)
    })

    it('sets interval to 6 days on second correct', () => {
      const result = calculateNextReview(4, defaultEase, 1, 1)
      expect(result.newInterval).toBe(6)
      expect(result.newRepetitions).toBe(2)
    })

    it('multiplies interval by ease factor on 3rd+ correct', () => {
      const result = calculateNextReview(4, 2.5, 2, 6)
      expect(result.newInterval).toBe(Math.round(6 * 2.5))
      expect(result.newRepetitions).toBe(3)
    })
  })

  describe('incorrect response (quality < 3)', () => {
    it('resets repetitions to 0', () => {
      const result = calculateNextReview(2, 2.5, 5, 30)
      expect(result.newRepetitions).toBe(0)
    })

    it('resets interval to 1', () => {
      const result = calculateNextReview(1, 2.5, 5, 30)
      expect(result.newInterval).toBe(1)
    })

    it('resets on quality 0 (complete blackout)', () => {
      const result = calculateNextReview(0, 2.5, 10, 60)
      expect(result.newRepetitions).toBe(0)
      expect(result.newInterval).toBe(1)
    })
  })

  describe('ease factor updates', () => {
    it('increases ease factor for quality 5 (perfect)', () => {
      const result = calculateNextReview(5, 2.5, 0, 0)
      expect(result.newEaseFactor).toBeGreaterThan(2.5)
    })

    it('decreases ease factor for quality 3 (barely correct)', () => {
      const result = calculateNextReview(3, 2.5, 0, 0)
      expect(result.newEaseFactor).toBeLessThan(2.5)
    })

    it('enforces minimum ease factor of 1.3', () => {
      // quality 0 with ease already at minimum
      const result = calculateNextReview(0, 1.3, 0, 0)
      expect(result.newEaseFactor).toBeGreaterThanOrEqual(1.3)
    })

    it('enforces minimum even when calculation goes below', () => {
      // Repeated bad answers should not go below 1.3
      let ease = 2.5
      for (let i = 0; i < 20; i++) {
        const result = calculateNextReview(0, ease, 0, 1)
        ease = result.newEaseFactor
      }
      expect(ease).toBeGreaterThanOrEqual(1.3)
    })
  })

  describe('quality clamping', () => {
    it('clamps quality above 5 to 5', () => {
      const result = calculateNextReview(10, 2.5, 0, 0)
      const expected = calculateNextReview(5, 2.5, 0, 0)
      expect(result.newEaseFactor).toBe(expected.newEaseFactor)
    })

    it('clamps negative quality to 0', () => {
      const result = calculateNextReview(-3, 2.5, 0, 0)
      const expected = calculateNextReview(0, 2.5, 0, 0)
      expect(result.newEaseFactor).toBe(expected.newEaseFactor)
    })
  })

  describe('return shape', () => {
    it('returns all expected fields', () => {
      const result = calculateNextReview(4, 2.5, 0, 0)
      expect(result).toHaveProperty('newInterval')
      expect(result).toHaveProperty('newEaseFactor')
      expect(result).toHaveProperty('newRepetitions')
      expect(result).toHaveProperty('nextReviewDate')
    })

    it('returns a valid ISO date string', () => {
      const result = calculateNextReview(4, 2.5, 0, 0)
      expect(() => new Date(result.nextReviewDate)).not.toThrow()
      expect(new Date(result.nextReviewDate).toISOString()).toBe(result.nextReviewDate)
    })
  })
})
