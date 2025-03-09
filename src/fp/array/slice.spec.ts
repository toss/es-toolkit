import { describe, expect, it } from 'vitest';
import { slice } from './slice';

describe('slice', () => {
  it('should return sliced array with start and end indices', () => {
    expect(slice([1, 2, 3, 4, 5], 1, 3)).toEqual([2, 3]);
    expect(slice<number[]>(1, 3)([1, 2, 3, 4, 5])).toEqual([2, 3]);
  });

  it('should handle negative indices', () => {
    expect(slice([1, 2, 3, 4, 5], -2)).toEqual([4, 5]);
    expect(slice<number[]>(-2)([1, 2, 3, 4, 5])).toEqual([4, 5]);
  });

  it('should handle omitted end index', () => {
    expect(slice([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
    expect(slice<number[]>(2)([1, 2, 3, 4, 5])).toEqual([3, 4, 5]);
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 3, 4, 5];

    slice(arr, 1, 3);
    slice<number[]>(1, 3)(arr2);

    expect(arr).toEqual([1, 2, 3, 4, 5]);
    expect(arr2).toEqual([1, 2, 3, 4, 5]);
  });
});
