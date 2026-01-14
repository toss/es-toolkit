import { describe, expect, it } from 'vitest';
import { zipObject } from './zipObject';

describe('zipObject', () => {
  it('creates an object from two arrays of keys and values', () => {
    expect(zipObject(['a', 'b', 'c'], [1, 2, 3])).toEqual({ a: 1, b: 2, c: 3 });

    expect(zipObject(['a', 'b', 'c'], [1, 2])).toEqual({ a: 1, b: 2, c: undefined });

    expect(zipObject(['a', 'b'], [1, 2, 3])).toEqual({ a: 1, b: 2 });
  });

  it('returns undefined for keys without a corresponding value', () => {
    const result = zipObject(['a', 'b', 'c'], [1, 2]);

    expect(result).toEqual({ a: 1, b: 2, c: undefined });
    expect(result.c).toBeUndefined();
  });
});
