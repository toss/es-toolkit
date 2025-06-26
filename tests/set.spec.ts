import { beforeAll, describe, expect, it } from 'vitest';
import {
  difference,
  hasNativeSetMethods,
  hasWorkingSetMethods,
  intersection,
  symmetricDifference,
  union,
} from '../src/set';

describe('Set Methods', () => {
  beforeAll(() => {
    console.log(`Native Set Methods available: ${hasNativeSetMethods()}`);
    console.log(`Working Set Methods confirmed: ${hasWorkingSetMethods()}`);
  });

  describe('intersection', () => {
    it('returns correct intersection with Set inputs', () => {
      const set1 = new Set([1, 2, 3, 4]);
      const set2 = new Set([3, 4, 5, 6]);
      const result = intersection(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(2);
      expect(result.has(3)).toBe(true);
      expect(result.has(4)).toBe(true);
    });

    it('returns correct intersection with Array inputs', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5, 6];
      const result = intersection(arr1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(2);
      expect(result.has(3)).toBe(true);
      expect(result.has(4)).toBe(true);
    });

    it('returns correct intersection with mixed inputs', () => {
      const set1 = new Set([1, 2, 3, 4]);
      const arr2 = [3, 4, 5, 6];
      const result = intersection(set1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(2);
      expect(result.has(3)).toBe(true);
      expect(result.has(4)).toBe(true);
    });

    it('returns empty set when there is no intersection', () => {
      const set1 = new Set([1, 2]);
      const set2 = new Set([3, 4]);
      const result = intersection(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(0);
    });

    it('handles empty inputs correctly', () => {
      const emptySet = new Set<number>();
      const set = new Set([1, 2, 3]);

      expect(intersection(emptySet, set).size).toBe(0);
      expect(intersection(set, emptySet).size).toBe(0);
      expect(intersection(emptySet, emptySet).size).toBe(0);
    });
  });

  describe('union', () => {
    it('returns correct union with Set inputs', () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([3, 4, 5]);
      const result = union(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(5);
      for (let i = 1; i <= 5; i++) {
        expect(result.has(i)).toBe(true);
      }
    });

    it('returns correct union with Array inputs', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];
      const result = union(arr1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(5);
      for (let i = 1; i <= 5; i++) {
        expect(result.has(i)).toBe(true);
      }
    });

    it('returns correct union with mixed inputs', () => {
      const set1 = new Set([1, 2, 3]);
      const arr2 = [3, 4, 5];
      const result = union(set1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(5);
      for (let i = 1; i <= 5; i++) {
        expect(result.has(i)).toBe(true);
      }
    });

    it('handles empty inputs correctly', () => {
      const emptySet = new Set<number>();
      const set = new Set([1, 2, 3]);

      expect(union(emptySet, set).size).toBe(3);
      expect(union(set, emptySet).size).toBe(3);
      expect(union(emptySet, emptySet).size).toBe(0);
    });
  });

  describe('difference', () => {
    it('returns correct difference with Set inputs', () => {
      const set1 = new Set([1, 2, 3, 4, 5]);
      const set2 = new Set([3, 4, 5, 6, 7]);
      const result = difference(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(2);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
    });

    it('returns correct difference with Array inputs', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [3, 4, 5, 6, 7];
      const result = difference(arr1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(2);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
    });

    it('returns correct difference with mixed inputs', () => {
      const set1 = new Set([1, 2, 3, 4, 5]);
      const arr2 = [3, 4, 5, 6, 7];
      const result = difference(set1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(2);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
    });

    it('returns empty set when all elements are in second set', () => {
      const set1 = new Set([1, 2]);
      const set2 = new Set([1, 2, 3, 4]);
      const result = difference(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(0);
    });

    it('handles empty inputs correctly', () => {
      const emptySet = new Set<number>();
      const set = new Set([1, 2, 3]);

      expect(difference(emptySet, set).size).toBe(0);
      expect(difference(set, emptySet).size).toBe(3);
      expect(difference(emptySet, emptySet).size).toBe(0);
    });
  });

  describe('symmetricDifference', () => {
    it('returns correct symmetric difference with Set inputs', () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([3, 4, 5]);
      const result = symmetricDifference(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(4);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
      expect(result.has(4)).toBe(true);
      expect(result.has(5)).toBe(true);
      expect(result.has(3)).toBe(false);
    });

    it('returns correct symmetric difference with Array inputs', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];
      const result = symmetricDifference(arr1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(4);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
      expect(result.has(4)).toBe(true);
      expect(result.has(5)).toBe(true);
      expect(result.has(3)).toBe(false);
    });

    it('returns correct symmetric difference with mixed inputs', () => {
      const set1 = new Set([1, 2, 3]);
      const arr2 = [3, 4, 5];
      const result = symmetricDifference(set1, arr2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(4);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
      expect(result.has(4)).toBe(true);
      expect(result.has(5)).toBe(true);
      expect(result.has(3)).toBe(false);
    });

    it('returns all elements when no common elements', () => {
      const set1 = new Set([1, 2]);
      const set2 = new Set([3, 4]);
      const result = symmetricDifference(set1, set2);

      expect(result).toBeInstanceOf(Set);
      expect(result.size).toBe(4);
    });

    it('handles empty inputs correctly', () => {
      const emptySet = new Set<number>();
      const set = new Set([1, 2, 3]);

      expect(symmetricDifference(emptySet, set).size).toBe(3);
      expect(symmetricDifference(set, emptySet).size).toBe(3);
      expect(symmetricDifference(emptySet, emptySet).size).toBe(0);
    });
  });
});
