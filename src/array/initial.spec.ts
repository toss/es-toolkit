import { describe, expect, it } from 'vitest';
import { initial } from './initial';

describe('initial', () => {
  it('returns a new array containing all elements except the last one from the input array', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
    expect(initial(['a', 'b', 'c'])).toEqual(['a', 'b']);
    expect(initial([1, true, 'string'])).toEqual([1, true]);
    expect(initial([])).toEqual([]);
  });

  // Edge cases
  it('returns an empty array for a single-element array', () => {
    expect(initial(['one'])).toEqual([]);
  });

  it('returns all elements except the last one for a large array', () => {
    const largeArray = Array(1000)
      .fill(0)
      .map((_, i) => i);
    const expectedArray = Array(999)
      .fill(0)
      .map((_, i) => i);
    expect(initial(largeArray)).toEqual(expectedArray);
  });

  it('returns all elements except the last one for a nested array', () => {
    const nestedArray = [
      [3, 1],
      [3, 2],
      [3, 3],
    ];
    expect(initial(nestedArray)).toEqual([
      [3, 1],
      [3, 2],
    ]);
  });
});
