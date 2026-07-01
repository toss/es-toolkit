import { describe, expect, it } from 'vitest';
import { partition } from './partition.ts';

describe('partition', () => {
  it('splits elements into matched and unmatched arrays', () => {
    expect(partition([1, 2, 3, 4].values(), x => x % 2 === 0)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it('preserves relative order within each group', () => {
    expect(partition([3, 1, 4, 1, 5, 9, 2].values(), x => x > 3)).toEqual([
      [4, 5, 9],
      [3, 1, 1, 2],
    ]);
  });

  it('passes the index to the predicate', () => {
    expect(partition([10, 20, 30, 40].values(), (_value, index) => index % 2 === 0)).toEqual([
      [10, 30],
      [20, 40],
    ]);
  });

  it('returns two empty arrays for an empty source', () => {
    expect(partition([].values(), () => true)).toEqual([[], []]);
  });
});
