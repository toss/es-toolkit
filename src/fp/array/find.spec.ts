import { describe, expect, it } from 'vitest';
import { find } from './find';

describe('find', () => {
  it('should return the first element that passes the test', () => {
    expect(find([1, 2, 3, 4], value => value % 2 === 0)).toBe(2);
    expect(find<number[]>(value => value % 2 === 0)([1, 2, 3, 4])).toBe(2);
  });

  it('should return undefined when no element passes the test', () => {
    expect(find([1, 3, 5, 7], value => value % 2 === 0)).toBeUndefined();
    expect(find<number[]>(value => value % 2 === 0)([1, 3, 5, 7])).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    expect(find([], () => true)).toBeUndefined();
    expect(find<number[]>(() => true)([])).toBeUndefined();
  });

  it('should work with different types', () => {
    expect(find(['abc', 'def', 'ghi'], str => str.startsWith('d'))).toBe('def');
    expect(find<string[]>(str => str.startsWith('d'))(['abc', 'def', 'ghi'])).toBe('def');
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    find(arr, value => value > 2);
    find<number[]>(value => value > 2)(arr2);

    expect(arr).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual([1, 2, 3, 4]);
  });
});
