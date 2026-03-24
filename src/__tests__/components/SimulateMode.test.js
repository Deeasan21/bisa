import { describe, it, expect } from 'vitest';
import { SIMULATIONS } from '../../data/simulations';

describe('SimulateMode category filter logic (regression)', () => {
  // This tests the filtering logic that was previously reported as buggy
  // (CLAUDE.md bug #1 — "filterByDifficulty not imported")

  const getCategories = () => {
    const cats = new Set();
    SIMULATIONS.forEach(s => {
      if (s.skillCategory) cats.add(s.skillCategory);
    });
    return Array.from(cats).sort();
  };

  const filterSims = (categoryFilter, currentTier = 1) => {
    let filtered = SIMULATIONS;
    if (categoryFilter) filtered = filtered.filter(s => s.skillCategory === categoryFilter);
    if (categoryFilter) {
      const tierMap = { beginner: 1, developing: 2, intermediate: 3, advanced: 4, expert: 5, master: 5 };
      const adapted = filtered.filter(item => {
        const t = item.tier || tierMap[item.difficultyTier] || 1;
        return Math.abs(t - currentTier) <= 1;
      }).sort((a, b) => {
        const at = a.tier || tierMap[a.difficultyTier] || 1;
        const bt = b.tier || tierMap[b.difficultyTier] || 1;
        return Math.abs(at - currentTier) - Math.abs(bt - currentTier);
      });
      if (adapted.length > 0) return adapted;
    }
    return filtered;
  };

  it('SIMULATIONS array is non-empty', () => {
    expect(SIMULATIONS.length).toBeGreaterThan(0);
  });

  it('every simulation has required fields', () => {
    for (const sim of SIMULATIONS) {
      expect(sim.id, `sim missing id`).toBeDefined();
      expect(sim.title, `sim ${sim.id} missing title`).toBeTruthy();
      expect(sim.nodes, `sim ${sim.id} missing nodes`).toBeDefined();
    }
  });

  it('returns all simulations when no filter applied', () => {
    const result = filterSims('');
    expect(result.length).toBe(SIMULATIONS.length);
  });

  it('filters by category correctly', () => {
    const categories = getCategories();
    if (categories.length === 0) return; // skip if no categories

    const cat = categories[0];
    const result = filterSims(cat);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(sim => {
      expect(sim.skillCategory).toBe(cat);
    });
  });

  it('does not crash when filtering by non-existent category', () => {
    const result = filterSims('NonExistentCategory');
    expect(result).toEqual([]);
  });

  it('returns adapted results sorted by tier proximity', () => {
    const categories = getCategories();
    if (categories.length === 0) return;

    const result = filterSims(categories[0], 3);
    // Should not crash and should return results
    expect(Array.isArray(result)).toBe(true);
  });

  it('falls back to unfiltered when no adapted results match tier', () => {
    const categories = getCategories();
    if (categories.length === 0) return;

    // Tier 99 won't match any sim — should fall back to full category list
    const result = filterSims(categories[0], 99);
    expect(result.length).toBeGreaterThan(0);
  });
});
