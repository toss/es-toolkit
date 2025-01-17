import { describe, expect, it } from 'vitest';
import { filter } from './filter';

describe('filter', () => {
  const arr = [1, 2, 3, 4, 5];
  const isEven = (value: number) => value % 2 === 0;

  describe('when called with array and predicate', () => {
    it('should filter array values by predicate', () => {
      const result = filter(arr, isEven);
      expect(result).toEqual([2, 4]);
    });

    it('should return empty array when no values match predicate', () => {
      const result = filter(arr, value => value > 10);
      expect(result).toEqual([]);
    });

    it('should return same array when all values match predicate', () => {
      const result = filter(arr, value => value > 0);
      expect(result).toEqual(arr);
    });
  });

  describe('when called with predicate only', () => {
    it('should return a function that filters array values', () => {
      const filterEven = filter(isEven);
      const result = filterEven(arr);
      expect(result).toEqual([2, 4]);
    });

    it('should maintain curried function behavior', () => {
      const greaterThan = (min: number) => filter((value: number) => value > min);
      const greaterThan3 = greaterThan(3);
      const result = greaterThan3(arr);
      expect(result).toEqual([4, 5]);
    });
  });
});
