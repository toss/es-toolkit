import { describe, expect, it } from 'vitest';
import { last } from './last';

describe('last', () => {
  it('returns the last element of an array or undefined for empty array', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b', 'c'])).toBe('c');
    expect(last([1, 'string', true])).toBe(true);
    expect(last([])).toBeUndefined();
  });
  // Edge cases
  it('returns the only element in a single-element array', () => {
    expect(last([42])).toBe(42);
  });

  it('returns the last element of a large array', () => {
    const largeArray = Array(1000)
      .fill(0)
      .map((_, i) => i);
    expect(last(largeArray)).toBe(999);
  });

  it('returns the last element of a nested array', () => {
    const nestedArray = [
      [3, 1],
      [3, 2],
      [3, 3],
    ];
    expect(last(nestedArray)).toEqual([3, 3]);
  });
});
