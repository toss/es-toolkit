import { describe, expect, it } from 'vitest';
import { pull } from './pull';

describe('pull', () => {
  it('should remove all occurrences of specified values from the array', () => {
    const array = [1, 2, 3, 1, 2, 3];
    pull(array, [1, 3]);
    expect(array).toEqual([2, 2]);
  });

  it('should return the modified array after removing specified values', () => {
    const array = [5, 6, 7, 8];
    const result = pull(array, [5, 8]);
    expect(result).toEqual([6, 7]);
    expect(array).toEqual([6, 7]);
  });

  it('should not modify the array if no values are specified', () => {
    const array = [1, 2, 3];
    pull(array, []);
    expect(array).toEqual([1, 2, 3]);
  });

  it('should not remove any values if none of the specified values are in the array', () => {
    const array = [4, 5, 6];
    pull(array, [1, 2, 3]);
    expect(array).toEqual([4, 5, 6]);
  });

  it('should handle removing values from an empty array', () => {
    const array: number[] = [];
    pull(array, [1, 2]);
    expect(array).toEqual([]);
  });

  it('should remove duplicate values only if they match the specified values', () => {
    const array = [1, 2, 2, 3, 4, 4];
    pull(array, [2, 4]);
    expect(array).toEqual([1, 3]);
  });

  it('should not throw an error when removing values not present in the array', () => {
    const array = [10, 20, 30];
    expect(() => pull(array, [40])).not.toThrow();
    expect(array).toEqual([10, 20, 30]);
  });
});
