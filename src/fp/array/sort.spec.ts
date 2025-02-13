import { describe, expect, it } from 'vitest';
import { sort } from './sort';

describe('sort', () => {
  it('should sort array in ascending order', () => {
    expect(sort([3, 1, 4, 1, 5], (a, b) => a - b)).toEqual([1, 1, 3, 4, 5]);
    expect(sort<number[]>((a, b) => a - b)([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
  });

  it('should sort array in descending order', () => {
    expect(sort([3, 1, 4, 1, 5], (a, b) => b - a)).toEqual([5, 4, 3, 1, 1]);
    expect(sort<number[]>((a, b) => b - a)([3, 1, 4, 1, 5])).toEqual([5, 4, 3, 1, 1]);
  });

  it('should work with different types', () => {
    expect(sort(['c', 'a', 'b'], (a, b) => a.localeCompare(b))).toEqual(['a', 'b', 'c']);
    expect(sort<string[]>((a, b) => a.localeCompare(b))(['c', 'a', 'b'])).toEqual(['a', 'b', 'c']);
  });

  it('should not change value of original array', () => {
    const arr = [3, 1, 4, 1, 5];
    const arr2 = [3, 1, 4, 1, 5];

    sort(arr, (a, b) => a - b);
    sort<number[]>((a, b) => a - b)(arr2);

    expect(arr).toEqual([3, 1, 4, 1, 5]);
    expect(arr2).toEqual([3, 1, 4, 1, 5]);
  });
});
