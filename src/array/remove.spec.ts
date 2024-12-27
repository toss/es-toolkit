import { describe, expect, it } from 'vitest';
import { remove } from './remove';

describe('remove', () => {
  it('should remove elements based on the predicate function', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = remove(numbers, value => value % 2 === 0);
    expect(numbers).toEqual([1, 3, 5]);
    expect(removed).toEqual([2, 4]);
  });

  it('should handle sparse arrays correctly', () => {
    const sparseArray = [1, , 3, , 5];
    const removed = remove(sparseArray, value => value === undefined);
    expect(sparseArray).toEqual([1, 3, 5]);
    expect(removed).toEqual([undefined, undefined]);
  });

  it('should return all elements if all elements are removed', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = remove(numbers, () => true);
    expect(numbers).toEqual([]);
    expect(removed).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not remove any elements if the predicate always returns false', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = remove(numbers, () => false);
    expect(numbers).toEqual([1, 2, 3, 4, 5]);
    expect(removed).toEqual([]);
  });

  it('should work with an empty array', () => {
    const emptyArray: number[] = [];
    const removed = remove(emptyArray, () => true);
    expect(emptyArray).toEqual([]);
    expect(removed).toEqual([]);
  });
});
