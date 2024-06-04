import { describe, expect, it } from 'vitest';
import { xorWith } from './xorWith';

describe('xorWith', () => {
  it('computes the symmetric difference between two arrays using a custom equality function', () => {
    const areNumbersEqual = (a: number, b: number) => a === b;
    const areObjectsEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;

    expect(xorWith([1, 2, 3, 4], [3, 4, 5, 6], areNumbersEqual)).toEqual([1, 2, 5, 6]);
    expect(xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], areObjectsEqual)).toEqual([{ id: 1 }, { id: 3 }]);
    expect(xorWith([1, 2, 3], [4, 5, 6], areNumbersEqual)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(xorWith([1, 2, 3], [1, 2, 3], areNumbersEqual)).toEqual([]);
    expect(xorWith([], [1, 2, 3], areNumbersEqual)).toEqual([1, 2, 3]);
    expect(xorWith([1, 2, 3], [], areNumbersEqual)).toEqual([1, 2, 3]);
  });
});
