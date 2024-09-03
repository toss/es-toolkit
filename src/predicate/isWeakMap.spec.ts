import { describe, expect, it } from 'vitest';
import { isWeakMap } from './isWeakMap';

describe('isWeakMap', () => {
  it('returns true if the value is WeakMap', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
  });

  it('returns false if the value is not WeakMap', () => {
    expect(isWeakMap(null)).toBe(false);
    expect(isWeakMap('')).toBe(false);
    expect(isWeakMap(123)).toBe(false);
    expect(isWeakMap({})).toBe(false);
    expect(isWeakMap([])).toBe(false);
    expect(isWeakMap(new Map())).toBe(false);
  });
});
