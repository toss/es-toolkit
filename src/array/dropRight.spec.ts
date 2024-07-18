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
});
