import { describe, expect, it } from 'vitest';
import { without } from './without';

describe('without', () => {
  it('should return an empty array when the input array is empty', () => {
    expect(without([], 1, 2, 3)).toEqual([]);
  });

  it('should return the same array when no values are provided to exclude', () => {
    expect(without([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return a new array excluding the specified values', () => {
    expect(without([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 3, 5]);
    expect(without(['a', 'b', 'c', 'a'], 'a')).toEqual(['b', 'c']);
  });

  it('should handle cases where none of the specified values are in the array', () => {
    expect(without([1, 2, 3], 4, 5)).toEqual([1, 2, 3]);
  });

  it('should handle cases with different types of values', () => {
    expect(without([1, '2', 3, '4'], 2, '4')).toEqual([1, '2', 3]);
    expect(without([1, '1', 2, '2'], 1, '2')).toEqual(['1', 2]);
  });

  it('should return an empty array when input is not a valid array', () => {
    expect(without(null as any, 1, 2)).toEqual([]);
    expect(without(undefined as any, 1, 2)).toEqual([]);
    expect(without({ length: 'invalid' } as any, 1, 2)).toEqual([]);
  });

  it('should handle NaN values correctly', () => {
    expect(without([NaN, 1, 2, NaN, 3], NaN)).toEqual([1, 2, 3]);
  });

  it('should treat +0 and -0 as equal', () => {
    expect(without([0, -0, 1, 2], 0)).toEqual([1, 2]);
    expect(without([0, -0, 1, 2], -0)).toEqual([1, 2]);
  });
});
