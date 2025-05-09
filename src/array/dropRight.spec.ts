import { describe, expect, it } from 'vitest';
import { dropRight } from './dropRight';

describe('dropRight', () => {
  it('should drop `itemsCount` elements from an array from the end', () => {
    expect(dropRight([1.2, 2.3, 3.4], 1)).toEqual([1.2, 2.3]);
    expect(dropRight(['a', 'b', 'c', 'd'], 2)).toEqual(['a', 'b']);
  });

  it('should return all elements if itemsCount < 1', () => {
    expect(dropRight([1.2, 2.3, 3.4], 0)).toEqual([1.2, 2.3, 3.4]);
    expect(dropRight([1.2, 2.3, 3.4], -1)).toEqual([1.2, 2.3, 3.4]);
  });

  it('should coerce itemsCount to an integer', () => {
    expect(dropRight([1.2, 2.3, 3.4], 1.5)).toEqual([1.2, 2.3]);
  });

  it('should return empty array if itemsCount >= arr.length', () => {
    expect(dropRight([1.2, 2.3, 3.4], 4)).toEqual([]);
  });

  it('should correctly handle edge cases with very large numbers', () => {
    expect(dropRight([1, 2, 3], Number.MAX_SAFE_INTEGER)).toEqual([]);
  });

  it('should handle NaN values as 0', () => {
    expect(dropRight([1, 2, 3], Number.NaN)).toEqual([1, 2, 3]);
  });
});
