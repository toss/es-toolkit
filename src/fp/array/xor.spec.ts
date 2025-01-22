import { describe, expect, it } from 'vitest';
import { xor } from './xor';

describe('xor', () => {
  it(
    "(non-curried) computes the symmetric difference between two arrays",
    () => {
      expect(xor([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2, 5, 6]);
      expect(xor(['a', 'b'], ['b', 'c'])).toEqual(['a', 'c']);
      expect(xor([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
      expect(xor([1, 2, 3], [1, 2, 3])).toEqual([]);
      expect(xor([], [1, 2, 3])).toEqual([1, 2, 3]);
      expect(xor([1, 2, 3], [])).toEqual([1, 2, 3]);
    }
  );

  it("(curried) computes the symmetric difference between two arrays", () => {
    expect(xor([3, 4, 5, 6])([1, 2, 3, 4])).toEqual([1, 2, 5, 6]);
    expect(xor(['b', 'c'])(['a', 'b'])).toEqual(['a', 'c']);
    expect(xor([4, 5, 6])([1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(xor([1, 2, 3])([1, 2, 3])).toEqual([]);
    expect(xor([1, 2, 3])([])).toEqual([1, 2, 3]);
    expect(xor<number>([])([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
