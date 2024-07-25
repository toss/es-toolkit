import { describe, expect, it } from 'vitest';
import { isMapMatch } from './isMapMatch';
import { isSetMatch } from './isSetMatch';

describe('isSetMatch', () => {
  it('can match sets', () => {
    expect(isSetMatch(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    expect(isSetMatch(new Set([1, 2, 3]), new Set([1, 2]))).toBe(true);
    expect(isSetMatch(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false);
  });

  it('returns true if source is empty', () => {
    const set = new Set();

    expect(isSetMatch(new Set([1, 2, 3]), set)).toBe(true);
    expect(isSetMatch(1, set)).toBe(true);
    expect(isSetMatch('a', set)).toBe(true);
    expect(isSetMatch(new Set(), set)).toBe(true);
    expect(isSetMatch([1, 2, 3], set)).toBe(true);
    expect(isSetMatch({ a: 1, b: 2 }, set)).toBe(true);
  });

  it('returns false if source is not empty and target is not a map', () => {
    const set = new Set([1, 2, 3]);

    expect(isSetMatch(1, set)).toBe(false);
    expect(isSetMatch('a', set)).toBe(false);
    expect(isSetMatch(new Set(), set)).toBe(false);
    expect(isSetMatch([1, 2, 3], set)).toBe(false);
    expect(isSetMatch({ a: 1, b: 2 }, set)).toBe(false);
  });
});
