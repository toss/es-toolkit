import { describe, expect, it } from 'vitest';
import { drop } from './drop';

describe('drop', () => {
  it('should drop `itemsCount` elements from an array from the beginning', () => {
    expect(drop([1.2, 2.3, 3.4], 1)).toEqual([2.3, 3.4]);
    expect(drop(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
  });

  it('should return all elements if n < 1', () => {
    expect(drop([1.2, 2.3, 3.4], 0)).toEqual([1.2, 2.3, 3.4]);
    expect(drop([1.2, 2.3, 3.4], -1)).toEqual([1.2, 2.3, 3.4]);
  });

  it('should coerce n to an integer', () => {
    expect(drop([1.2, 2.3, 3.4], 1.5)).toEqual([2.3, 3.4]);
  });

  it('should return empty array if n > arr.length', () => {
    expect(drop([1.2, 2.3, 3.4], 4)).toEqual([]);
  });
});
