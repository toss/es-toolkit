import { describe, expect, it } from 'vitest';
import { median } from './median';

describe('median', () => {
  it('returns the median for an odd number of elements', () => {
    expect(median([1n, 2n, 3n, 4n, 5n])).toBe(3n);
  });

  it('returns the average of the two middle elements, truncated toward zero, for an even number of elements', () => {
    expect(median([1n, 2n, 3n, 4n])).toBe(2n);
  });

  it('returns the correct median for unsorted arrays', () => {
    expect(median([5n, 2n, 1n, 4n, 3n])).toBe(3n);
  });

  it('truncates toward zero for negative even-length arrays', () => {
    expect(median([-1n, -4n])).toBe(-2n);
  });

  it('returns the single element for arrays with one element', () => {
    expect(median([42n])).toBe(42n);
  });

  it('returns undefined for an empty array', () => {
    expect(median([])).toBeUndefined();
  });
});
