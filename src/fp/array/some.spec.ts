import { describe, expect, it } from 'vitest';
import { some } from './some';

describe('some', () => {
  it('should return true when any element passes the test', () => {
    expect(some([1, 2, 3, 4], value => value % 2 === 0)).toBe(true);
    expect(some<number[]>(value => value % 2 === 0)([1, 2, 3, 4])).toBe(true);
  });

  it('should return false when no element passes the test', () => {
    expect(some([1, 3, 5, 7], value => value % 2 === 0)).toBe(false);
    expect(some<number[]>(value => value % 2 === 0)([1, 3, 5, 7])).toBe(false);
  });

  it('should handle empty arrays', () => {
    expect(some([], () => true)).toBe(false);
    expect(some<number[]>(() => true)([])).toBe(false);
  });

  it('should work with different types', () => {
    expect(some(['abc', 'def', 'ghi'], str => str.startsWith('d'))).toBe(true);
    expect(some<string[]>(str => str.startsWith('d'))(['abc', 'def', 'ghi'])).toBe(true);
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    some(arr, value => value > 2);
    some<number[]>(value => value > 2)(arr2);

    expect(arr).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual([1, 2, 3, 4]);
  });
});
