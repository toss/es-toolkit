import { describe, expect, it } from 'vitest';
import { remove } from './remove';

describe('remove', () => {
  it('should remove elements based on the predicate function', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = remove(numbers, value => value % 2 === 0);
    expect(result).toEqual([1, 3, 5]);
  });

  it('should handle sparse arrays correctly', () => {
    const sparseArray = [1, , 3, , 5];
    const result = remove(sparseArray, value => value === undefined);
    expect(result).toEqual([1, 3, 5]);
  });

  it('should return an empty array if all elements are removed', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = remove(numbers, () => true);
    expect(result).toEqual([]);
  });

  it('should not remove any elements if the predicate always returns false', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = remove(numbers, () => false);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should work with an empty array', () => {
    const emptyArray: number[] = [];
    const result = remove(emptyArray, () => true);
    expect(result).toEqual([]);
  });
});
