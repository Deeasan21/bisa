import { describe, it, expect } from 'vitest'
import { sanitizeForPrompt } from '../../engine/sanitize'

describe('sanitizeForPrompt', () => {
  it('returns empty string for falsy input', () => {
    expect(sanitizeForPrompt(null)).toBe('')
    expect(sanitizeForPrompt(undefined)).toBe('')
    expect(sanitizeForPrompt('')).toBe('')
  })

  it('replaces smart double quotes with single quotes', () => {
    expect(sanitizeForPrompt('\u201CHello\u201D')).toBe("'Hello'")
    expect(sanitizeForPrompt('\u201Ctest\u201D')).toBe("'test'")
  })

  it('replaces straight double quotes with single quotes', () => {
    expect(sanitizeForPrompt('"hello"')).toBe("'hello'")
  })

  it('collapses 3+ newlines to 2', () => {
    expect(sanitizeForPrompt('a\n\n\nb')).toBe('a\n\nb')
    expect(sanitizeForPrompt('a\n\n\n\n\nb')).toBe('a\n\nb')
  })

  it('preserves double newlines (paragraphs)', () => {
    expect(sanitizeForPrompt('a\n\nb')).toBe('a\n\nb')
  })

  it('preserves single newlines', () => {
    expect(sanitizeForPrompt('a\nb')).toBe('a\nb')
  })

  it('caps input at 2000 characters', () => {
    const long = 'a'.repeat(3000)
    expect(sanitizeForPrompt(long).length).toBe(2000)
  })

  it('does not truncate input under 2000 chars', () => {
    const short = 'a'.repeat(500)
    expect(sanitizeForPrompt(short).length).toBe(500)
  })

  it('handles combined transformations', () => {
    const input = '"Hello"\n\n\n\nWorld'
    const result = sanitizeForPrompt(input)
    expect(result).toBe("'Hello'\n\nWorld")
  })
})
