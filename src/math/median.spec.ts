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
});
