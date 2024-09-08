import { describe, expect, it } from 'vitest';
import { isWeakSet } from './isWeakSet';

describe('isWeakSet', () => {
  it('returns true if the value is WeakSet', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });

  it('returns false if the value is not WeakSet', () => {
    expect(isWeakSet(null)).toBe(false);
    expect(isWeakSet('')).toBe(false);
    expect(isWeakSet(123)).toBe(false);
    expect(isWeakSet({})).toBe(false);
    expect(isWeakSet([])).toBe(false);
    expect(isWeakSet(new Map())).toBe(false);
  });
});
