import { describe, expect, it } from 'vitest';
import { union } from './union';

describe('union', () => {
  it("(non-curried) should return the union of two arrays", () => {
    expect(union([2, 1], [2, 3])).toEqual([2, 1, 3]);
  });

  it("(curried) should return the union of two arrays", () => {
    expect(union([2, 3])([2, 1])).toEqual([2, 1, 3]);
  });
});
