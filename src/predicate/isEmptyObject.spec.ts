import { describe, expect, it } from 'vitest';
import { isEmptyObject } from './isEmptyObject';

describe('isEmptyObject', () => {
  it('returns true for empty plain objects', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject(new Object())).toBe(true);
    expect(isEmptyObject(Object.create(null))).toBe(true);
  });

  it('returns false for non-empty plain objects', () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject({ key: 'value' })).toBe(false);
    expect(isEmptyObject({ nested: { key: true } })).toBe(false);
  });

  it('returns false for non-plain objects', () => {
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject([1, 2, 3])).toBe(false);
    expect(isEmptyObject(new Date())).toBe(false);
    expect(isEmptyObject(new Map())).toBe(false);
    expect(isEmptyObject(new Set())).toBe(false);
  });

  it('returns false for non-objects', () => {
    expect(isEmptyObject(null)).toBe(false);
    expect(isEmptyObject(undefined)).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
    expect(isEmptyObject('')).toBe(false);
    expect(isEmptyObject(true)).toBe(false);
  });
});
