import { describe, expect, it } from 'vitest';
import { pullAllWith } from './pullAllWith';
import { isEqual } from '../predicate';

describe('pullAllWith', () => {
  it('should remove all occurrences of specified values from the array', () => {
    const array = [1, 2, 3, 1, 2, 3];
    pullAllWith(array, [1, 3], (a, b) => a === b);
    expect(array).toEqual([2, 2]);
  });

  it('should remove objects matching the comparator function', () => {
    const array = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 4 },
      { y: 4, x: 3 },
    ];
    pullAllWith(array, [{ x: 3, y: 4 }], isEqual);
    expect(array).toEqual([
      { x: 1, y: 2 },
      { x: 5, y: 4 },
    ]);
  });

  it('should not modify the array if no elements match', () => {
    const array = [1, 2, 3];
    pullAllWith(array, [4, 5], (a, b) => a === b);
    expect(array).toEqual([1, 2, 3]);
  });

  it('should return an empty array when all elements are removed', () => {
    const array = [1, 1, 1];
    pullAllWith(array, [1], (a, b) => a === b);
    expect(array).toEqual([]);
  });

  it('should handle an empty input array correctly', () => {
    const array: number[] = [];
    pullAllWith(array, [1, 2, 3], (a, b) => a === b);
    expect(array).toEqual([]);
  });

  it('should handle an empty values array correctly', () => {
    const array = [1, 2, 3];
    pullAllWith(array, [], (a, b) => a === b);
    expect(array).toEqual([1, 2, 3]);
  });

  it('should handle larger arrays efficiently', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => ({ x: i, y: i - 1 }));
    pullAllWith(largeArray, [{ x: 500, y: 409 }], isEqual);
    expect(largeArray.some(item => item.x === 500 && item.y === 409)).toBe(false);
  });
});
