import { describe, expect, it } from 'vitest';
import { reverse } from './reverse';
import { range } from '../../math/range';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { times } from '../util/times';

describe('reverse', () => {
  const largeArray = range(LARGE_ARRAY_SIZE).concat([null as any]);
  const smallArray = [0, 1, 2, null];

  it('should reverse `array`', () => {
    const array = [1, 2, 3];
    const actual = reverse(array);

    expect(actual).toBe(array);
    expect(array).toEqual([3, 2, 1]);
  });

  it('should return the wrapped reversed `array`', () => {
    times(2, index => {
      const array = (index ? largeArray : smallArray).slice();
      const clone = array.slice();
      const actual = reverse(array);

      expect(actual).toBe(array);
      expect(actual).toEqual(clone.slice().reverse());
    });
  });

  it('should return null if input is null', () => {
    expect(reverse(null)).toBeNull();
  });

  it('should return undefined if input is undefined', () => {
    expect(reverse(undefined)).toBeUndefined();
  });

  it('should return an empty array if input is an empty array', () => {
    const array: number[] = [];
    const result = reverse(array);
    expect(result).toEqual([]);
    expect(result).toBe(array);
  });

  it('should reverse an array with one element', () => {
    const array = [42];
    const result = reverse(array);
    expect(result).toEqual([42]);
    expect(result).toBe(array);
  });

  it('should handle an array with duplicate elements', () => {
    const array = [1, 2, 2, 3];
    const result = reverse(array);
    expect(result).toEqual([3, 2, 2, 1]);
    expect(result).toBe(array);
  });

  it('should modify the original array', () => {
    const array = [1, 2, 3];
    reverse(array);
    expect(array).toEqual([3, 2, 1]);
  });

  it('should work with arrays of strings', () => {
    const array = ['a', 'b', 'c'];
    const result = reverse(array);
    expect(result).toEqual(['c', 'b', 'a']);
    expect(result).toBe(array);
  });

  it('should work with mixed types', () => {
    const array = [1, 'two', 3, 'four'];
    const result = reverse(array);
    expect(result).toEqual(['four', 3, 'two', 1]);
    expect(result).toBe(array);
  });
});
