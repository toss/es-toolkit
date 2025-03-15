import { describe, expect, it } from 'vitest';
import { takeRight } from './takeRight';

describe('takeRight', () => {
  it("(non-curried) returns the last n elements from the array", () => {
    expect(takeRight([1, 2, 3, 4, 5], 2)).toEqual([4, 5]);
    expect(takeRight(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
    expect(takeRight([true, false, true], 1)).toEqual([true]);
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
    expect(takeRight([], 3)).toEqual([]);
  });

  it("(curried) returns the last n elements from the array", () => {
    expect(takeRight(2)([1, 2, 3, 4, 5])).toEqual([4, 5]);
    expect(takeRight(2)(['a', 'b', 'c', 'd'])).toEqual(['c', 'd']);
    expect(takeRight(1)([true, false, true])).toEqual([true]);
    expect(takeRight(5)([1, 2, 3])).toEqual([1, 2, 3]);
    expect(takeRight(0)([1, 2, 3])).toEqual([]);
    expect(takeRight(3)([])).toEqual([]);
  });

  it(
    "(non-curried) handles cases where count is greater than array length",
    () => {
      expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
    }
  );

  it("(curried) handles cases where count is greater than array length", () => {
    expect(takeRight(5)([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("(non-curried) handles cases where count is zero", () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
  });

  it("(curried) handles cases where count is zero", () => {
    expect(takeRight(0)([1, 2, 3])).toEqual([]);
  });

  it("(non-curried) handles empty arrays", () => {
    expect(takeRight([], 3)).toEqual([]);
  });

  it("(curried) handles empty arrays", () => {
    expect(takeRight(3)([])).toEqual([]);
  });
});
