import { describe, it, expect, vi, afterEach } from 'vitest'
import { getTodayString, getTimeOfDayGreeting, getHoursUntilMidnight, formatDate, daysAgo } from '../../utils/dateHelpers'

describe('getTodayString', () => {
  afterEach(() => vi.useRealTimers())

  it('returns YYYY-MM-DD format', () => {
    const result = getTodayString()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('pads single-digit months and days', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 5)) // Jan 5
    expect(getTodayString()).toBe('2025-01-05')
    vi.useRealTimers()
  })
})

describe('getTimeOfDayGreeting', () => {
  afterEach(() => vi.useRealTimers())

  it('returns "Good morning" before noon', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 9, 0))
    expect(getTimeOfDayGreeting()).toBe('Good morning')
  })

  it('returns "Good afternoon" between noon and 5pm', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 14, 0))
    expect(getTimeOfDayGreeting()).toBe('Good afternoon')
  })

  it('returns "Good evening" after 5pm', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 20, 0))
    expect(getTimeOfDayGreeting()).toBe('Good evening')
  })

  it('returns "Good morning" at exactly midnight', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 0, 0))
    expect(getTimeOfDayGreeting()).toBe('Good morning')
  })

  it('returns "Good afternoon" at exactly noon', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 12, 0))
    expect(getTimeOfDayGreeting()).toBe('Good afternoon')
  })

  it('returns "Good evening" at exactly 5pm', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 17, 0))
    expect(getTimeOfDayGreeting()).toBe('Good evening')
  })
})

describe('getHoursUntilMidnight', () => {
  afterEach(() => vi.useRealTimers())

  it('returns a positive number', () => {
    expect(getHoursUntilMidnight()).toBeGreaterThan(0)
  })

  it('returns 24 at exactly midnight', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 0, 0, 0, 0))
    expect(getHoursUntilMidnight()).toBe(24)
  })

  it('returns 1 at 11pm', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 0, 1, 23, 0, 0, 0))
    expect(getHoursUntilMidnight()).toBe(1)
  })

  it('returns at most 24', () => {
    expect(getHoursUntilMidnight()).toBeLessThanOrEqual(24)
  })
})

describe('formatDate', () => {
  it('returns empty string for falsy input', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
    expect(formatDate('')).toBe('')
  })

  it('formats a date string correctly', () => {
    const result = formatDate('2025-03-15')
    expect(result).toContain('Mar')
    expect(result).toContain('15')
    expect(result).toContain('2025')
  })
})

describe('daysAgo', () => {
  afterEach(() => vi.useRealTimers())

  it('returns null for falsy input', () => {
    expect(daysAgo(null)).toBeNull()
    expect(daysAgo(undefined)).toBeNull()
    expect(daysAgo('')).toBeNull()
  })

  it('returns "Today" for today', () => {
    const today = new Date().toISOString()
    expect(daysAgo(today)).toBe('Today')
  })

  it('returns "Yesterday" for yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    // Set to midday to avoid timezone edge cases
    yesterday.setHours(12, 0, 0, 0)
    vi.useFakeTimers()
    const now = new Date(yesterday)
    now.setDate(now.getDate() + 1)
    now.setHours(12, 0, 0, 0)
    vi.setSystemTime(now)
    expect(daysAgo(yesterday.toISOString())).toBe('Yesterday')
  })

  it('returns "X days ago" for older dates', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 5, 10, 12, 0))
    const fiveDaysAgo = new Date(2025, 5, 5, 12, 0).toISOString()
    expect(daysAgo(fiveDaysAgo)).toBe('5 days ago')
  })
})
