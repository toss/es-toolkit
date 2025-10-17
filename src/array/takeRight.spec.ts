import { describe, expect, it } from 'vitest';
import { takeRight } from './takeRight';

describe('takeRight', () => {
  it('returns the last n elements from the array', () => {
    expect(takeRight([1, 2, 3, 4, 5], 2)).toEqual([4, 5]);
    expect(takeRight(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
    expect(takeRight([true, false, true], 1)).toEqual([true]);
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
    expect(takeRight([], 3)).toEqual([]);
  });

  it('handles cases where count is greater than array length', () => {
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it('handles cases where count is zero', () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
  });

  it('handles empty arrays', () => {
    expect(takeRight([], 3)).toEqual([]);
  });

  it('handles negative counts', () => {
    expect(takeRight([1, 2, 3], -1)).toEqual([]);
    expect(takeRight([1, 2, 3], -5)).toEqual([]);
  });

  it('uses default count of 1 when count is undefined', () => {
    expect(takeRight([1, 2, 3])).toEqual([3]);
    expect(takeRight([1, 2, 3], undefined)).toEqual([3]);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(takeRight);

    expect(actual).toEqual([[3], [6], [9]]);
  });
});
