import { describe, expect, it } from 'vitest';
import { difference } from './difference';

describe('difference', () => {
  it("(non-curried) should the difference of two arrays", () => {
    expect(difference([1, 2, 3], [1])).toEqual([2, 3]);
    expect(difference([], [1, 2, 3])).toEqual([]);
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  it("(curried) should the difference of two arrays", () => {
    expect(difference([1])([1, 2, 3])).toEqual([2, 3]);
    expect(difference([1, 2, 3])([])).toEqual([]);
    expect(difference([2, 4])([1, 2, 3, 4])).toEqual([1, 3]);
  });
});
