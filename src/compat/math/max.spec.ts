import { describe, expect, it } from 'vitest';
import { max } from './max';

describe('max', () => {
  it('should return the largest value from a collection', () => {
    expect(max([1, 2, 3])).toBe(3);
    expect(max([1, 3, 2])).toBe(3);
  });

  it('should return `undefined` for empty collections', () => {
    expect(max([])).toBe(undefined);
    expect(max()).toBe(undefined);
  });

  it('should work with non-numeric collection values', () => {
    expect(max(['a', 'b'])).toBe('b');
  });

  it('should work with Date objects', () => {
    const curr = new Date();
    const past = new Date(0);

    expect(max([curr, past])).toBe(curr);
  });

  it('should work with extremely large arrays', () => {
    const array = Array.from({ length: 5e5 }, (_, i) => i);
    expect(max(array)).toBe(499999);
  });

  it('should work when chaining on an array with only one value', () => {
    const array = [40];
    expect(max(array)).toBe(40);
  });
});
