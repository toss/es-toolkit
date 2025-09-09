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

  it('uses default count=1 when guard is truthy', () => {
    const arr = [1, 2, 3];
    expect(take(arr, 5, true)).toEqual([1]);
    expect(take(arr, 0, 123)).toEqual([1]);
  });

  it('uses count normally when guard is falsy', () => {
    const arr = [1, 2, 3];
    expect(take(arr, 2, undefined)).toEqual([1, 2]);
    expect(take(arr, 2, null)).toEqual([1, 2]);
    expect(take(arr, 2, false)).toEqual([1, 2]);
  });

  it('handles iteratee-style usage with guard (lodash-style)', () => {
    const arr = [1, 2, 3];
    const result = arr.map((v, i, array) => take(array, i, true));
    expect(result).toEqual([[1], [1], [1]]);
  });
});
