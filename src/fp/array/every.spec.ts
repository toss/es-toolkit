import { describe, expect, it } from 'vitest';
import { every } from './every';

describe('every', () => {
  it('should return true when all elements pass the test', () => {
    expect(every([2, 4, 6, 8], value => value % 2 === 0)).toBe(true);
    expect(every<number[]>(value => value % 2 === 0)([2, 4, 6, 8])).toBe(true);
  });

  it('should return false when any element fails the test', () => {
    expect(every([1, 2, 3, 4], value => value % 2 === 0)).toBe(false);
    expect(every<number[]>(value => value % 2 === 0)([1, 2, 3, 4])).toBe(false);
  });

  it('should handle empty arrays', () => {
    expect(every([], () => false)).toBe(true);
    expect(every<number[]>(() => false)([])).toBe(true);
  });

  it('should work with different types', () => {
    expect(every(['a', 'ab', 'abc'], str => str.length > 0)).toBe(true);
    expect(every<string[]>(str => str.length > 0)(['a', 'ab', 'abc'])).toBe(true);
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    every(arr, value => value > 0);
    every<number[]>(value => value > 0)(arr2);

    expect(arr).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual([1, 2, 3, 4]);
  });
});
