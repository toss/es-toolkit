import { describe, expect, it } from 'vitest';
import { product } from './product';

describe('product', () => {
  it('returns the Cartesian product of two arrays', () => {
    expect(product([1, 2], ['a', 'b'])).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('returns the Cartesian product of three arrays', () => {
    expect(product([0, 1], [0, 1], [0, 1])).toEqual([
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
    ]);
  });

  it('returns single-element tuples when given a single array', () => {
    expect(product([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('returns a single empty tuple when no arrays are given', () => {
    expect(product()).toEqual([[]]);
  });

  it('returns an empty array when any input array is empty', () => {
    expect(product([1, 2, 3], [])).toEqual([]);
    expect(product([], ['a', 'b'])).toEqual([]);
    expect(product([1], [], [2])).toEqual([]);
  });

  it('emits tuples in lexicographic order with the rightmost array advancing fastest', () => {
    expect(product(['A', 'B', 'C', 'D'], ['x', 'y'])).toEqual([
      ['A', 'x'],
      ['A', 'y'],
      ['B', 'x'],
      ['B', 'y'],
      ['C', 'x'],
      ['C', 'y'],
      ['D', 'x'],
      ['D', 'y'],
    ]);
  });

  it('supports spread operators', () => {
    const inputs: number[][] = [
      [1, 2],
      [3, 4],
    ];
    expect(product(...inputs)).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);
  });
});
