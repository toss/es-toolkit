import { describe, expect, it } from 'vitest';
import { combinations } from './combinations';

describe('combinations', () => {
  it('returns all 2-length combinations in lexicographic order', () => {
    expect(combinations(['A', 'B', 'C', 'D'], 2)).toEqual([
      ['A', 'B'],
      ['A', 'C'],
      ['A', 'D'],
      ['B', 'C'],
      ['B', 'D'],
      ['C', 'D'],
    ]);
  });

  it('returns all 3-length combinations of 4 elements', () => {
    expect(combinations([0, 1, 2, 3], 3)).toEqual([
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3],
    ]);
  });

  it('returns a single empty combination when r is 0', () => {
    expect(combinations([1, 2, 3], 0)).toEqual([[]]);
    expect(combinations([], 0)).toEqual([[]]);
  });

  it('returns an empty array when r is greater than the array length', () => {
    expect(combinations([1, 2], 5)).toEqual([]);
    expect(combinations([], 1)).toEqual([]);
  });

  it('returns the array itself wrapped once when r equals the array length', () => {
    expect(combinations([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('returns single-element combinations when r is 1', () => {
    expect(combinations(['a', 'b', 'c'], 1)).toEqual([['a'], ['b'], ['c']]);
  });

  it('treats duplicate values as distinct by position', () => {
    expect(combinations([1, 1, 2], 2)).toEqual([
      [1, 1],
      [1, 2],
      [1, 2],
    ]);
  });

  it('throws when r is negative', () => {
    expect(() => combinations([1, 2, 3], -1)).toThrowErrorMatchingInlineSnapshot(
      `[Error: r must be a non-negative integer.]`
    );
  });

  it('throws when r is not an integer', () => {
    expect(() => combinations([1, 2, 3], 1.5)).toThrowErrorMatchingInlineSnapshot(
      `[Error: r must be a non-negative integer.]`
    );
    expect(() => combinations([1, 2, 3], NaN)).toThrowErrorMatchingInlineSnapshot(
      `[Error: r must be a non-negative integer.]`
    );
  });
});
