import { describe, expect, it } from 'vitest';
import { take } from './take';

describe('take', () => {
  it("(non-curried) returns the first n elements from the array", () => {
    expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
    expect(take(['a', 'b', 'c', 'd'], 2)).toEqual(['a', 'b']);
    expect(take([true, false, true], 1)).toEqual([true]);
  });

  it("(curried) returns the first n elements from the array", () => {
    expect(take(3)([1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
    expect(take(2)(['a', 'b', 'c', 'd'])).toEqual(['a', 'b']);
    expect(take(1)([true, false, true])).toEqual([true]);
  });

  it(
    "(non-curried) handles cases where count is greater than array length",
    () => {
      expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
    }
  );

  it("(curried) handles cases where count is greater than array length", () => {
    expect(take(5)([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("(non-curried) handles cases where count is zero", () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });

  it("(curried) handles cases where count is zero", () => {
    expect(take(0)([1, 2, 3])).toEqual([]);
  });

  it("(non-curried) handles empty arrays", () => {
    expect(take([], 3)).toEqual([]);
  });

  it("(curried) handles empty arrays", () => {
    expect(take(3)([])).toEqual([]);
  });
});
