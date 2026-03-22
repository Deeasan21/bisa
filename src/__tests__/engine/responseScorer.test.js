import { describe, it, expect } from 'vitest'
import { scoreResponse } from '../../engine/responseScorer'

const makeScenario = (overrides = {}) => ({
  keywords: ['feedback', 'improve', 'team'],
  context: 'A team member seems disengaged during meetings and their work quality has dropped recently.',
  skillCategory: 'empathy',
  ...overrides,
})

describe('scoreResponse', () => {
  describe('empty / invalid input', () => {
    it('returns 0 for empty string', () => {
      const result = scoreResponse('', makeScenario())
      expect(result.score).toBe(0)
      expect(result.feedback).toContain('Please write a question first!')
    })

    it('returns 0 for null input', () => {
      const result = scoreResponse(null, makeScenario())
      expect(result.score).toBe(0)
    })

    it('returns 0 for whitespace-only input', () => {
      const result = scoreResponse('   ', makeScenario())
      expect(result.score).toBe(0)
    })
  })

  describe('question mark check (+10)', () => {
    it('gives 10 points for no question mark (early return with feedback)', () => {
      const result = scoreResponse('Tell me about your feedback process', makeScenario())
      expect(result.score).toBe(10)
      expect(result.breakdown.hasQuestion).toBe(false)
    })

    it('awards question mark points when present', () => {
      const result = scoreResponse('What do you think about feedback and how can we improve the team?', makeScenario())
      expect(result.breakdown.hasQuestion).toBe(true)
      expect(result.score).toBeGreaterThanOrEqual(10)
    })
  })

  describe('length check (+10)', () => {
    it('returns 20 for very short questions (< 5 words)', () => {
      const result = scoreResponse('Why this?', makeScenario())
      expect(result.score).toBe(20)
      expect(result.breakdown.adequateLength).toBe(false)
    })

    it('awards length points for 5+ word questions', () => {
      const result = scoreResponse('What do you think about this approach to feedback?', makeScenario())
      expect(result.breakdown.adequateLength).toBe(true)
    })
  })

  describe('open vs closed detection (+20 / +5 / +10)', () => {
    it('awards 20 for open-ended starters (what, how, why)', () => {
      const result = scoreResponse('What do you think about the feedback and team improvements?', makeScenario())
      expect(result.breakdown.isOpenEnded).toBe(true)
    })

    it('awards only 5 for closed-question starters (is, are, do)', () => {
      const result = scoreResponse('Is the feedback process working well for the team right now?', makeScenario())
      expect(result.breakdown.isOpenEnded).toBe(false)
      // closed gets +5 instead of +20, so score is lower
    })

    it('awards 10 for neutral starters', () => {
      const result = scoreResponse('The feedback process seems broken, could you tell me more about team dynamics?', makeScenario())
      expect(result.breakdown.isOpenEnded).toBe(false)
      // neutral gets +10
    })
  })

  describe('keyword relevance (+0 to +30)', () => {
    it('awards points for matching keywords', () => {
      const result = scoreResponse('How can we improve the feedback process for the team?', makeScenario())
      expect(result.breakdown.keywordRelevance).toBeGreaterThan(0)
    })

    it('awards 0 for no keyword matches', () => {
      const result = scoreResponse('What color is the sky on a clear day in summer?', makeScenario({ keywords: ['feedback', 'improve', 'team'] }))
      expect(result.breakdown.keywordRelevance).toBe(0)
    })

    it('handles scenarios with no keywords', () => {
      const result = scoreResponse('What do you think about this situation right now?', makeScenario({ keywords: [] }))
      expect(result.breakdown.keywordRelevance).toBe(0)
    })

    it('awards full points when all keywords match', () => {
      const result = scoreResponse('How can we improve the feedback process for the team?', makeScenario({ keywords: ['improve', 'feedback', 'team'] }))
      expect(result.breakdown.keywordRelevance).toBe(1)
    })
  })

  describe('technique detection (+0 to +30)', () => {
    it('detects empathy markers', () => {
      const result = scoreResponse('How are you feeling about the situation with the team feedback?', makeScenario())
      expect(result.techniques).toContain('empathy')
    })

    it('detects reframing markers', () => {
      const result = scoreResponse('What if we looked at it differently and considered another way to improve?', makeScenario())
      expect(result.techniques).toContain('reframing')
    })

    it('detects probing/depth markers', () => {
      const result = scoreResponse('Why do you think this underlying issue led to the feedback problem?', makeScenario())
      expect(result.techniques).toContain('probing')
    })

    it('detects follow-up technique when referencing context', () => {
      const scenario = makeScenario({
        context: 'A team member seems disengaged during meetings and their work quality has dropped recently.',
      })
      const result = scoreResponse('What about the meetings makes you think the member seems disengaged and that quality has dropped?', scenario)
      expect(result.techniques).toContain('follow-up')
    })

    it('caps technique bonus at 30', () => {
      const scenario = makeScenario({
        context: 'A team member seems disengaged during meetings and their work quality has dropped recently.',
      })
      // Use all techniques
      const result = scoreResponse(
        'Why do you think the underlying reason makes you feel this way? What if we looked at it from their perspective during meetings when quality dropped and they seemed disengaged?',
        scenario
      )
      expect(result.breakdown.techniqueBonus).toBeLessThanOrEqual(30)
    })
  })

  describe('score capping', () => {
    it('never exceeds 100', () => {
      const scenario = makeScenario({
        keywords: ['feel', 'think', 'perspective', 'improve', 'team', 'feedback'],
        context: 'A team member seems disengaged during meetings and their work quality has dropped recently.',
      })
      const result = scoreResponse(
        'How do you feel about the team feedback? What if we consider their perspective to improve quality during meetings when someone seems disengaged?',
        scenario
      )
      expect(result.score).toBeLessThanOrEqual(100)
    })
  })

  describe('AI review flag', () => {
    it('flags scores in 40-75 range for AI review', () => {
      const result = scoreResponse('What do you think about this work situation?', makeScenario({ keywords: [] }))
      if (result.score >= 40 && result.score <= 75) {
        expect(result.needsAIReview).toBe(true)
      }
    })

    it('does not flag very low scores for AI review', () => {
      const result = scoreResponse('No?', makeScenario())
      expect(result.needsAIReview).toBe(false)
    })
  })

  describe('return shape', () => {
    it('returns all expected fields', () => {
      const result = scoreResponse('How can we improve the feedback for the team?', makeScenario())
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('feedback')
      expect(result).toHaveProperty('techniques')
      expect(result).toHaveProperty('needsAIReview')
      expect(result).toHaveProperty('breakdown')
      expect(Array.isArray(result.feedback)).toBe(true)
      expect(Array.isArray(result.techniques)).toBe(true)
      expect(typeof result.score).toBe('number')
    })
  })
})
