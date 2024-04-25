import { describe, expect, it } from "vitest"
import { xorBy } from "./xorBy"

describe('xorBy', () => {
  it('computes the symmetric difference between two arrays using a custom mapping function', () => {
    const identity = (x: number) => x;
    const idMapper = (obj: { id: number }) => obj.id;

    expect(xorBy([1, 2, 3, 4], [3, 4, 5, 6], identity)).toEqual([1, 2, 5, 6]);
    expect(xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper)).toEqual([{ id: 1 }, { id: 3 }]);
    expect(xorBy([1, 2, 3], [4, 5, 6], identity)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(xorBy([1, 2, 3], [1, 2, 3], identity)).toEqual([]);
    expect(xorBy([], [1, 2, 3], identity)).toEqual([1, 2, 3]);
    expect(xorBy([1, 2, 3], [], identity)).toEqual([1, 2, 3]);
  });
});
