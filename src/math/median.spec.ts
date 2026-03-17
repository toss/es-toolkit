import { describe, expect, it } from 'vitest';
import { median } from './median';

describe('median', () => {
  it('returns the median for an odd number of elements', () => {
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
  });

  it('returns the average of two middle elements for an even number of elements', () => {
    expect(median([1, 2, 3, 4])).toEqual(2.5);
  });

  it('returns the correct median for unsorted arrays', () => {
    expect(median([5, 2, 1, 4, 3])).toEqual(3);
  });

  it('returns NaN for empty arrays', () => {
    expect(median([])).toEqual(NaN);
  });

  it('returns the single element for arrays with one element', () => {
    expect(median([42])).toEqual(42);
  });

  it('returns the median for an odd number of bigint elements', () => {
    expect(median([1n, 2n, 3n, 4n, 5n])).toEqual(3n);
  });

  it('returns the median for an even number of bigint elements (integer division)', () => {
    expect(median([1n, 2n, 3n, 4n])).toEqual(2n);
  });

  it('returns the correct median for unsorted bigint arrays', () => {
    expect(median([5n, 2n, 1n, 4n, 3n])).toEqual(3n);
  });

  it('returns the single element for bigint arrays with one element', () => {
    expect(median([42n])).toEqual(42n);
  });
});
