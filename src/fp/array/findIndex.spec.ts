import { describe, expect, it } from 'vitest';
import { findIndex } from './findIndex';

describe('findIndex', () => {
  it('should return the index of first element that passes the test', () => {
    expect(findIndex([1, 2, 3, 4], value => value % 2 === 0)).toBe(1);
    expect(findIndex<number[]>(value => value % 2 === 0)([1, 2, 3, 4])).toBe(1);
  });

  it('should return -1 when no element passes the test', () => {
    expect(findIndex([1, 3, 5, 7], value => value % 2 === 0)).toBe(-1);
    expect(findIndex<number[]>(value => value % 2 === 0)([1, 3, 5, 7])).toBe(-1);
  });

  it('should handle empty arrays', () => {
    expect(findIndex([], () => true)).toBe(-1);
    expect(findIndex<number[]>(() => true)([])).toBe(-1);
  });

  it('should work with different types', () => {
    expect(findIndex(['abc', 'def', 'ghi'], str => str.startsWith('d'))).toBe(1);
    expect(findIndex<string[]>(str => str.startsWith('d'))(['abc', 'def', 'ghi'])).toBe(1);
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    findIndex(arr, value => value > 2);
    findIndex<number[]>(value => value > 2)(arr2);

    expect(arr).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual([1, 2, 3, 4]);
  });
});
