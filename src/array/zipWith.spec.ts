import { describe, expect, it } from 'vitest';
import { zipWith } from './zipWith';

describe('zipWith', () => {
  it('zips multiple arrays with the given combine function', () => {
    expect(zipWith([1, 2, 3], x => x)).toEqual([1, 2, 3]);

    expect(zipWith([1, 2, 3], ['a', 'b', 'c'], (x, y) => `${x}${y}`)).toEqual(['1a', '2b', '3c']);
    expect(zipWith([1, 2, 3], ['a', 'b'], (x, y) => `${x}${y}`)).toEqual(['1a', '2b', '3undefined']);

    expect(zipWith([1, 2, 3], ['a', 'b', 'c'], [true, true, false], (x, y, z) => `${x}-${y}-${z}`)).toEqual([
      `1-a-true`,
      `2-b-true`,
      `3-c-false`,
    ]);
  });

  it('should provide index parameter to combine function', () => {
    const result = zipWith([10, 20, 30], [1, 2, 3], (a, b, index) => (a ?? 0) + (b ?? 0) + index);
    expect(result).toEqual([11, 23, 35]);
  });

  it('should handle undefined values when arrays have different lengths (Type Fix Verification)', () => {
    const numbers = [1, 2, 3];
    const strings = ['a', 'b'];

    const result = zipWith(numbers, strings, (num, str) => {
      if (str === undefined) {
        return `${num}-missing`;
      }
      return `${num}-${str}`;
    });

    expect(result).toEqual(['1-a', '2-b', '3-missing']);
  });
});
