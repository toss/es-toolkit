import { describe, expect, it } from "vitest"
import { xor } from "./xor"

describe('xor', () => {
  it('computes the symmetric difference between two arrays', () => {
    expect(xor([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2, 5, 6]);
    expect(xor(['a', 'b'], ['b', 'c'])).toEqual(['a', 'c']);
    expect(xor([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(xor([1, 2, 3], [1, 2, 3])).toEqual([]);
    expect(xor([], [1, 2, 3])).toEqual([1, 2, 3]);
    expect(xor([1, 2, 3], [])).toEqual([1, 2, 3]);
  })
})
