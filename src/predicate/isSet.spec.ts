import { describe, expect, it } from 'vitest';
import { isSet } from './isSet';

describe('isSet', () => {
  it('returns true if the value is a Set', () => {
    expect(isSet(new Set())).toBe(true);
  });

  it('returns false if the value is not a Set', () => {
    expect(isSet(null)).toBe(false);
    expect(isSet('')).toBe(false);
    expect(isSet(123)).toBe(false);
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet(new Map())).toBe(false);
    expect(isSet(new WeakSet())).toBe(false);
  });
});
