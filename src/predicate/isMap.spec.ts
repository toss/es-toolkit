import { describe, expect, it } from 'vitest';
import { isMap } from './isMap';

describe('isMap', () => {
  it('returns true if the value is a Map', () => {
    expect(isMap(new Map())).toBe(true);
  });

  it('returns false if the value is not a Map', () => {
    expect(isMap(null)).toBe(false);
    expect(isMap('')).toBe(false);
    expect(isMap(123)).toBe(false);
    expect(isMap({})).toBe(false);
    expect(isMap([])).toBe(false);
    expect(isMap(new Set())).toBe(false);
    expect(isMap(new WeakMap())).toBe(false);
  });
});
