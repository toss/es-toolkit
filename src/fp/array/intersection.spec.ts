import { describe, expect, it } from 'vitest';
import { intersection } from './intersection';

describe('intersection', () => {
  it("(non-curried) should return the intersection of two arrays", () => {
    expect(intersection([1, 2], [1, 3])).toEqual([1]);
    expect(intersection([1, 2], [3, 1])).toEqual([1]);
    expect(intersection([1, 2], [3, 4])).toEqual([]);
    expect(intersection([], [1, 2])).toEqual([]);
  });

  it("(curried) should return the intersection of two arrays", () => {
    expect(intersection([1, 3])([1, 2])).toEqual([1]);
    expect(intersection([3, 1])([1, 2])).toEqual([1]);
    expect(intersection([3, 4])([1, 2])).toEqual([]);
    expect(intersection([1, 2])([])).toEqual([]);
  });
});
