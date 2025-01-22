import { describe, expect, it } from 'vitest';
import { zipObject } from './zipObject';

describe('zipObject', () => {
  it(
    "(non-curried) creates an object from two arrays of keys and values",
    () => {
      expect(zipObject(['a', 'b', 'c'], [1, 2, 3])).toEqual({ a: 1, b: 2, c: 3 });

      expect(zipObject(['a', 'b', 'c'], [1, 2])).toEqual({ a: 1, b: 2, c: undefined });

      expect(zipObject(['a', 'b'], [1, 2, 3])).toEqual({ a: 1, b: 2 });
    }
  );

  it("(curried) creates an object from two arrays of keys and values", () => {
    expect(zipObject([1, 2, 3])(['a', 'b', 'c'])).toEqual({ a: 1, b: 2, c: 3 });

    expect(zipObject([1, 2])(['a', 'b', 'c'])).toEqual({ a: 1, b: 2, c: undefined });

    expect(zipObject([1, 2, 3])(['a', 'b'])).toEqual({ a: 1, b: 2 });
  });
});
