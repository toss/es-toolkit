import { describe, expect, it } from 'vitest';
import { takeRightWhile } from './takeRightWhile';

describe('takeRightWhile', () => {
  it(
    "(non-curried) returns elements from the end while the predicate returns true",
    () => {
      expect(takeRightWhile([5, 4, 3, 2, 1], n => n < 4)).toEqual([3, 2, 1]);
      expect(takeRightWhile([1, 2, 3], n => n > 3)).toEqual([]);
      expect(takeRightWhile([1, 2, 3, 4, 5], n => n > 2)).toEqual([3, 4, 5]);
      expect(takeRightWhile([1, 2, 3, 4, 5], n => n < 6)).toEqual([1, 2, 3, 4, 5]);
      expect(takeRightWhile([], n => n < 6)).toEqual([]);
    }
  );

  it("(curried) returns elements from the end while the predicate returns true", () => {
    expect(takeRightWhile<number>(n => n < 4)([5, 4, 3, 2, 1])).toEqual([3, 2, 1]);
    expect(takeRightWhile<number>(n => n > 3)([1, 2, 3])).toEqual([]);
    expect(takeRightWhile<number>(n => n > 2)([1, 2, 3, 4, 5])).toEqual([3, 4, 5]);
    expect(takeRightWhile<number>(n => n < 6)([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(takeRightWhile<number>(n => n < 6)([])).toEqual([]);
  });

  it("(non-curried) handles empty arrays", () => {
    expect(takeRightWhile([], n => n < 6)).toEqual([]);
  });

  it("(curried) handles empty arrays", () => {
    expect(takeRightWhile<number>(n => n < 6)([])).toEqual([]);
  });
});
