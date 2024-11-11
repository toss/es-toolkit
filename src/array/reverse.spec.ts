import { describe, expect, it } from 'vitest';
import { reverse } from './reverse';

describe('reverse', () => {
  it('should return null if input is null', () => {
    expect(reverse(null)).toBeNull();
  });

  it('should return undefined if input is undefined', () => {
    expect(reverse(undefined)).toBeUndefined();
  });

  it('should return an empty array if input is an empty array', () => {
    expect(reverse([])).toEqual([]);
  });

  it('should reverse an array with one element', () => {
    expect(reverse([1])).toEqual([1]);
  });

  it('should reverse an array with multiple elements', () => {
    expect(reverse([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
  });

  it('should reverse an array with even number of elements', () => {
    expect(reverse([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
  });

  it('should reverse an array with odd number of elements', () => {
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });

  it('should handle an array with duplicate elements', () => {
    expect(reverse([1, 2, 2, 3])).toEqual([3, 2, 2, 1]);
  });

  it('should modify the original array', () => {
    const array = [1, 2, 3];
    reverse(array);
    expect(array).toEqual([3, 2, 1]);
  });
});
