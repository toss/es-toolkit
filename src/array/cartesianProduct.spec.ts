import { describe, expect, it } from 'vitest';
import { cartesianProduct } from './cartesianProduct';

describe('cartesianProduct', () => {
  it('returns the Cartesian product of two arrays', () => {
    expect(cartesianProduct([1, 2], ['a', 'b'])).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('returns the Cartesian product of three arrays', () => {
    expect(cartesianProduct([0, 1], [0, 1], [0, 1])).toEqual([
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
    expect(cartesianProduct([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('returns a single empty tuple when no arrays are given', () => {
    expect(cartesianProduct()).toEqual([[]]);
  });

  it('returns an empty array when any input array is empty', () => {
    expect(cartesianProduct([1, 2, 3], [])).toEqual([]);
    expect(cartesianProduct([], ['a', 'b'])).toEqual([]);
    expect(cartesianProduct([1], [], [2])).toEqual([]);
  });

  it('emits tuples in lexicographic order with the rightmost array advancing fastest', () => {
    expect(cartesianProduct(['A', 'B', 'C', 'D'], ['x', 'y'])).toEqual([
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
    expect(cartesianProduct(...inputs)).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);
  });
});
