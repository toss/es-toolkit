import { describe, expect, it } from 'vitest';
import { take } from './take';

describe('take', () => {
  it('returns the first n elements from the array', () => {
    expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
    expect(take(['a', 'b', 'c', 'd'], 2)).toEqual(['a', 'b']);
    expect(take([true, false, true], 1)).toEqual([true]);
  });

  it('handles cases where count is greater than array length', () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it('handles cases where count is zero', () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });

  it('handles empty arrays', () => {
    expect(take([], 3)).toEqual([]);
  });
});
