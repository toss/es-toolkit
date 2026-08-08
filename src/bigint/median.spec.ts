import { describe, expect, it } from 'vitest';
import { median } from './median';

describe('median', () => {
  it('returns the middle value for an odd-length array', () => {
    expect(median([1n, 2n, 3n, 4n, 5n])).toBe(3n);
  });

  it('sorts the array before picking the middle value', () => {
    expect(median([5n, 1n, 4n, 2n, 3n])).toBe(3n);
  });

  it('does not mutate the input array', () => {
    const nums = [5n, 1n, 3n];
    median(nums);

    expect(nums).toEqual([5n, 1n, 3n]);
  });

  it('truncates the average toward zero for an even-length array', () => {
    expect(median([1n, 2n, 3n, 4n])).toBe(2n);
    expect(median([1n, 2n])).toBe(1n);
  });

  it('truncates toward zero for negative bigints', () => {
    expect(median([-3n, -2n])).toBe(-2n);
  });

  it('returns the only element of a single-element array', () => {
    expect(median([42n])).toBe(42n);
  });

  it('stays exact beyond Number.MAX_SAFE_INTEGER', () => {
    expect(median([9007199254740993n, 9007199254740995n])).toBe(9007199254740994n);
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => median([])).toThrowError(new RangeError('Cannot compute the median of an empty array.'));
  });
});
