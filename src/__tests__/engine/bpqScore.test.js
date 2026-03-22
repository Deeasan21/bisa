import { describe, it, expect } from 'vitest'
import { BPQ_LEVELS, getBPQLevel } from '../../engine/bpqScore'

describe('BPQ_LEVELS', () => {
  it('has 7 levels', () => {
    expect(BPQ_LEVELS).toHaveLength(7)
  })

  it('covers the full 0-1000 range', () => {
    expect(BPQ_LEVELS[0].min).toBe(0)
    expect(BPQ_LEVELS[BPQ_LEVELS.length - 1].max).toBe(1000)
  })

  it('has no gaps between levels', () => {
    for (let i = 1; i < BPQ_LEVELS.length; i++) {
      expect(BPQ_LEVELS[i].min).toBe(BPQ_LEVELS[i - 1].max + 1)
    }
  })

  it('every level has label, min, max', () => {
    for (const level of BPQ_LEVELS) {
      expect(level.label).toBeTruthy()
      expect(typeof level.min).toBe('number')
      expect(typeof level.max).toBe('number')
    }
  })
})

describe('getBPQLevel', () => {
  it('returns "Curious Beginner" for 0', () => {
    expect(getBPQLevel(0)).toBe('Curious Beginner')
  })

  it('returns "Curious Beginner" for 149', () => {
    expect(getBPQLevel(149)).toBe('Curious Beginner')
  })

  it('returns "Active Listener" for 150', () => {
    expect(getBPQLevel(150)).toBe('Active Listener')
  })

  it('returns "Question Sage" for 900', () => {
    expect(getBPQLevel(900)).toBe('Question Sage')
  })

  it('returns "Question Sage" for 1000', () => {
    expect(getBPQLevel(1000)).toBe('Question Sage')
  })

  it('returns "Curious Beginner" as default for out-of-range', () => {
    expect(getBPQLevel(1500)).toBe('Curious Beginner')
    expect(getBPQLevel(-10)).toBe('Curious Beginner')
  })

  it('returns correct level for each boundary', () => {
    const expected = [
      [0, 'Curious Beginner'],
      [150, 'Active Listener'],
      [300, 'Thoughtful Asker'],
      [450, 'Skilled Questioner'],
      [600, 'Question Strategist'],
      [750, 'Master Communicator'],
      [900, 'Question Sage'],
    ]
    for (const [score, label] of expected) {
      expect(getBPQLevel(score)).toBe(label)
    }
  })
})
