import { beforeAll, describe, expect, it } from 'vitest';
import { drop, filter, hasNativeIteratorHelpers, map, take } from '../src/iterator';

describe('Iterator Helpers', () => {
  beforeAll(() => {
    console.log(`Native Iterator Helpers available: ${hasNativeIteratorHelpers()}`);
  });

  describe('map', () => {
    it('correctly maps array values', () => {
      const numbers = [1, 2, 3, 4, 5];
      const doubled = map(numbers, n => (n as number) * 2);

      expect(Array.isArray(doubled)).toBe(true);
      expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    it('correctly maps Set values', () => {
      const numbers = new Set([1, 2, 3, 4, 5]);
      const doubled = map(numbers, n => (n as number) * 2);

      expect(doubled).toBeInstanceOf(Object);
      expect(doubled[Symbol.iterator]).toBeDefined();

      const result = [...doubled];
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    it('correctly handles empty inputs', () => {
      const emptyArray: number[] = [];
      const emptySet = new Set<number>();

      expect(map(emptyArray, n => (n as number) * 2)).toEqual([]);
      expect([...map(emptySet, n => (n as number) * 2)]).toEqual([]);
    });

    it('provides correct index values for arrays', () => {
      const result = map(['a', 'b', 'c'], (item, index) => `${item}-${index}`);
      expect(result).toEqual(['a-0', 'b-1', 'c-2']);
    });

    it('provides correct index values for iterables', () => {
      const set = new Set(['a', 'b', 'c']);
      const result = [...map(set, (item, index) => `${item}-${index}`)];
      expect(result).toEqual(['a-0', 'b-1', 'c-2']);
    });
  });

  describe('filter', () => {
    it('correctly filters array values', () => {
      const numbers = [1, 2, 3, 4, 5];
      const evens = filter(numbers, n => (n as number) % 2 === 0);

      expect(Array.isArray(evens)).toBe(true);
      expect(evens).toEqual([2, 4]);
    });

    it('correctly filters Set values', () => {
      const numbers = new Set([1, 2, 3, 4, 5]);
      const evens = filter(numbers, n => (n as number) % 2 === 0);

      expect(evens).toBeInstanceOf(Object);
      expect(evens[Symbol.iterator]).toBeDefined();

      const result = [...evens];
      expect(result).toEqual([2, 4]);
    });

    it('correctly handles empty inputs', () => {
      const emptyArray: number[] = [];
      const emptySet = new Set<number>();

      expect(filter(emptyArray, n => (n as number) % 2 === 0)).toEqual([]);
      expect([...filter(emptySet, n => (n as number) % 2 === 0)]).toEqual([]);
    });

    it('returns empty result when no elements match predicate', () => {
      const numbers = [1, 3, 5, 7, 9];
      const evens = filter(numbers, n => (n as number) % 2 === 0);

      expect(evens).toEqual([]);
    });

    it('provides correct index values', () => {
      const array = ['apple', 'banana', 'cherry', 'date'];
      const result = filter(array, (_, index) => index % 2 === 0);
      expect(result).toEqual(['apple', 'cherry']);
    });
  });

  describe('take', () => {
    it('correctly takes elements from array', () => {
      const numbers = [1, 2, 3, 4, 5];

      expect(take(numbers, 3)).toEqual([1, 2, 3]);
      expect(take(numbers, 0)).toEqual([]);
      expect(take(numbers, 10)).toEqual([1, 2, 3, 4, 5]);
    });

    it('correctly takes elements from Set', () => {
      const numbers = new Set([1, 2, 3, 4, 5]);

      expect([...take(numbers, 3)]).toEqual([1, 2, 3]);
      expect([...take(numbers, 0)]).toEqual([]);
      expect([...take(numbers, 10)]).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles negative count correctly', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(take(numbers, -1)).toEqual([]);

      const set = new Set(numbers);
      expect([...take(set, -1)]).toEqual([]);
    });

    it('returns empty result for empty inputs', () => {
      const emptyArray: number[] = [];
      const emptySet = new Set<number>();

      expect(take(emptyArray, 3)).toEqual([]);
      expect([...take(emptySet, 3)]).toEqual([]);
    });

    it('correctly implements lazy evaluation for iterables', () => {
      let count = 0;
      function* generator() {
        for (let i = 0; i < 10; i++) {
          count++;
          yield i;
        }
      }

      const iter = take(generator(), 3);
      expect(count).toBe(0);

      const result = [...iter];
      expect(result).toEqual([0, 1, 2]);
      expect(count).toBe(3);
    });
  });

  describe('drop', () => {
    it('correctly drops elements from array', () => {
      const numbers = [1, 2, 3, 4, 5];

      expect(drop(numbers, 2)).toEqual([3, 4, 5]);
      expect(drop(numbers, 0)).toEqual([1, 2, 3, 4, 5]);
      expect(drop(numbers, 10)).toEqual([]);
    });

    it('correctly drops elements from Set', () => {
      const numbers = new Set([1, 2, 3, 4, 5]);

      expect([...drop(numbers, 2)]).toEqual([3, 4, 5]);
      expect([...drop(numbers, 0)]).toEqual([1, 2, 3, 4, 5]);
      expect([...drop(numbers, 10)]).toEqual([]);
    });

    it('handles negative count correctly', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(drop(numbers, -1)).toEqual([1, 2, 3, 4, 5]);

      const set = new Set(numbers);
      expect([...drop(set, -1)]).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns empty result for empty inputs', () => {
      const emptyArray: number[] = [];
      const emptySet = new Set<number>();

      expect(drop(emptyArray, 3)).toEqual([]);
      expect([...drop(emptySet, 3)]).toEqual([]);
    });

    it('correctly implements lazy evaluation for iterables', () => {
      let count = 0;
      function* generator() {
        for (let i = 0; i < 10; i++) {
          count++;
          yield i;
        }
      }

      const iter = drop(generator(), 3);
      expect(count).toBe(0);

      const result = [...iter];
      expect(result).toEqual([3, 4, 5, 6, 7, 8, 9]);
      expect(count).toBe(10);
    });
  });

  describe('Performance tests', () => {
    it('map performance is reasonable for large arrays', () => {
      const size = 100000;
      const largeArray = Array.from({ length: size }, (_, i) => i);

      const startTime = performance.now();
      const result = map(largeArray, x => (x as number) * 2);
      const duration = performance.now() - startTime;

      expect(result.length).toBe(size);
      console.log(`Map on ${size} elements took ${duration}ms`);
    });

    it('filter performance is reasonable for large arrays', () => {
      const size = 100000;
      const largeArray = Array.from({ length: size }, (_, i) => i);

      const startTime = performance.now();
      const result = filter(largeArray, x => (x as number) % 2 === 0);
      const duration = performance.now() - startTime;

      expect(result.length).toBe(size / 2);
      console.log(`Filter on ${size} elements took ${duration}ms`);
    });
  });
});
