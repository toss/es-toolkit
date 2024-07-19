import { describe, expect, it } from "vitest";
import { max } from "./max";


describe('max', () => {
  it('should return the largest value from a collection', () => {
    expect(max([1, 2, 3])).toBe(3);
  });

  it('should return `undefined` for empty collections', () => {
    expect(max([])).toBe(undefined);
    expect(max()).toBe(undefined);
  });

  it('should work with non-numeric collection values', () => {
    expect(max(['a', 'b'])).toBe('b');
  });
});
