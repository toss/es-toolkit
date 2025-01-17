import { describe, expect, it } from 'vitest';
import { includes } from './includes';

describe('includes', () => {
  it('should return true when element exists in array', () => {
    expect(includes([1, 2, 3, 4], 2)).toBe(true);
    expect(includes<number[]>(2)([1, 2, 3, 4])).toBe(true);
  });

  it('should return false when element does not exist in array', () => {
    expect(includes([1, 2, 3, 4], 5)).toBe(false);
    expect(includes<number[]>(5)([1, 2, 3, 4])).toBe(false);
  });

  it('should handle empty arrays', () => {
    expect(includes<number[]>([], 1)).toBe(false);
    expect(includes<number[]>(1)([])).toBe(false);
  });

  it('should work with different types', () => {
    expect(includes(['a', 'b', 'c'], 'b')).toBe(true);
    expect(includes<string[]>('b')(['a', 'b', 'c'])).toBe(true);
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    includes(arr, 2);
    includes<number[]>(2)(arr2);

    expect(arr).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual([1, 2, 3, 4]);
  });
});
