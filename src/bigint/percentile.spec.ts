import { describe, expect, it } from 'vitest';
import { percentile } from './percentile';

describe('percentile', () => {
  it('returns the value at the given percentile', () => {
    expect(percentile([1n, 2n, 3n, 4n, 5n], 50)).toBe(3n);
    expect(percentile([1n, 2n, 3n, 4n, 5n], 90)).toBe(5n);
  });

  it('returns the smallest value for the 0th percentile', () => {
    expect(percentile([5n, 1n, 3n], 0)).toBe(1n);
  });

  it('returns the largest value for the 100th percentile', () => {
    expect(percentile([5n, 1n, 3n], 100)).toBe(5n);
  });

  it('sorts the array before looking up the rank', () => {
    expect(percentile([30n, 10n, 20n], 50)).toBe(20n);
  });

  it('does not mutate the input array', () => {
    const nums = [30n, 10n, 20n];
    percentile(nums, 50);

    expect(nums).toEqual([30n, 10n, 20n]);
  });

  it('never interpolates between values', () => {
    expect(percentile([1n, 2n], 50)).toBe(1n);
  });

  it('throws for a percentile below 0', () => {
    expect(() => percentile([1n], -1)).toThrowError('Expected percentile to be >= 0 but got "-1".');
  });

  it('throws for a percentile above 100', () => {
    expect(() => percentile([1n], 101)).toThrowError('Expected percentile to be <= 100 but got "101".');
  });

  it('throws for a NaN percentile', () => {
    expect(() => percentile([1n], NaN)).toThrowError('Expected percentile to be a number but got "NaN".');
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => percentile([], 50)).toThrowError(new RangeError('Cannot compute the percentile of an empty array.'));
  });
});
